"use client";

import styled from "styled-components";
import { Noto_Kufi_Arabic } from "next/font/google";
import Container from "../../common/Container";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import { Car } from "./types";
import { shouldShowVClassUpsell } from "./utils";

// Loaded here only so the Arabic font file is requested by this section's page
// and never applied outside the section.
const arabicFont = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

// Arabic transliterations for the live vehicles, keyed by lowercase slug.
// Anything not listed falls back to the English title.
const ARABIC_NAMES: Record<string, string> = {
  "range-rover-sport-chauffeur-service": "رنج روفر سبورت",
  "audi-a4": "أودي A4",
  "bmw-5-series-for-hire-with-driver": "بي إم دبليو الفئة الخامسة",
  "bmw-x5-for-hire-with-driver": "بي إم دبليو X5",
  "8-seater-staria-van-with-driver": "هيونداي ستاريا",
  "mercedes-benz-e-class": "مرسيدس الفئة E",
  "mercedes-s-class-for-hire-with-driver": "مرسيدس الفئة S",
  "mercedes-v-class-private-chauffeur-service": "مرسيدس V-Class",
};

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const toArabicDigits = (n: number | string) =>
  String(n).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]);

const RANGE_ROVER_CAPACITY = "مناسبة لأربعة ركاب وحقيبتين";

function capacityBullet(car: Car) {
  const seats = car.number_of_seats;
  const luggage = car.luggage_capacity;
  if (seats === 4 && luggage === 2) return RANGE_ROVER_CAPACITY;
  if (!seats) return null;
  return luggage
    ? `عدد الركاب: ${toArabicDigits(seats)} · عدد الحقائب: ${toArabicDigits(luggage)}`
    : `عدد الركاب: ${toArabicDigits(seats)}`;
}

const Section = styled.section`
  padding: 64px 0;
  background: ${({ theme }) => theme.colors.white};
`;

const Card = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 28px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: right;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 38px;
  }
`;

const Heading = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.6rem;
  line-height: 1.5;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const Body = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 2;
`;

const Bullets = styled.ul`
  margin: 0 0 24px;
  padding: 0 20px 0 0;
  color: ${({ theme }) => theme.colors.heading};
  line-height: 2;
  font-weight: 700;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 24px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export default function ChauffeurArabicSection({ car }: { car: Car }) {
  const title = car.title || "";
  const slug = (car.slug || "").toLowerCase();
  const arabicName = ARABIC_NAMES[slug] || title;
  const capacity = capacityBullet(car);
  const upsell = shouldShowVClassUpsell(car);

  const link = buildWhatsAppLink(
    `السلام عليكم، أبغى أحجز ${arabicName} مع سائق في كيب تاون`
  );

  return (
    <Section>
      <Container>
        <Card lang="ar" dir="rtl" className={arabicFont.className}>
          <Heading>{`${arabicName} مع سائق خاص في كيب تاون`}</Heading>
          <Body>
            استمتع بتنقل خاص وفاخر في كيب تاون مع سائق محترف. نستقبلك في المطار، ونرافقك في جولاتك إلى كيب بوينت وستيلينبوش وفرانشهوك، أو طوال اليوم حسب برنامجك. الخدمة خاصة بالكامل، والوقود والمياه ومتابعة رحلتك الجوية مشمولة.
          </Body>
          <Bullets>
            {capacity && <li>{capacity}</li>}
            {upsell && <li>للعائلات والمجموعات الأكبر: مرسيدس V-Class</li>}
            <li>نرد عليك عبر واتساب خلال ٣٠ دقيقة</li>
          </Bullets>
          <Button
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "chauffeur_arabic_section",
                label: "Book on WhatsApp (Arabic)",
                vehicle: title,
                location: "arabic",
              })
            }
          >
            احجز عبر واتساب
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
