"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import SmartImage from "../../common/SmartImage";
import { trackWhatsAppClick } from "../../../lib/tracking";
import {
  buildActivityWhatsAppMessage,
  buildWhatsAppLink,
} from "../../../lib/whatsapp";
import {
  Anchor,
  Container,
  Section,
  SectionHeader,
  SectionText,
  SectionTitle,
} from "./shared";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
type ActivityItem = {
  title: string;
  image: string;
  description: string;
  bestFor: string;
  idealBooking: string;
};

type Props = {
  activities: ActivityItem[];
};

const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ActivityRow = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 18px;
    align-items: stretch;
  }
`;

const ProgressColumn = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    justify-content: center;
    position: relative;
  }
`;

const ProgressRail = styled.div`
  position: absolute;
  top: 0;
  bottom: -22px;
  width: 2px;
  background: linear-gradient(
    180deg,
    rgba(11, 91, 51, 0.24) 0%,
    rgba(11, 91, 51, 0.08) 100%
  );
`;

const ProgressDot = styled.div`
  position: relative;
  z-index: 2;
  margin-top: 26px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 6px rgba(11, 91, 51, 0.12);
`;

const ActivityCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
`;

const ActivityInner = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 360px minmax(0, 1fr);
  }
`;

const ActivityImageWrap = styled.div`
  position: relative;
  min-height: 260px;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.12), rgba(6, 62, 35, 0.06));
`;

const ActivityContent = styled.div`
  padding: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 28px;
  }
`;

const MobileStep = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.76rem;
  font-weight: 700;
  margin-bottom: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const ActivityTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.35rem;
  line-height: 1.2;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
`;

const Badge = styled.div`
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 700;
`;

const ActivityText = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

const Recommendation = styled.div`
  margin-bottom: 18px;
  padding: 16px 18px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.95rem;
`;

const RowActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

function getActivityAltText(title: string, tt: TFunction) {
  const key = title.toLowerCase();

  if (key.includes("table mountain")) {
    return tt("ActivitiesTimeline.table-mountain-in-cape-town");
  }
  if (key.includes("cape peninsula")) {
    return tt("ActivitiesTimeline.cape-peninsula-scenic-coastal-drive");
  }
  if (key.includes("boulders")) {
    return tt("ActivitiesTimeline.african-penguins-at-boulders-beach");
  }
  if (key.includes("good hope") || key.includes("cape point")) {
    return tt("ActivitiesTimeline.cape-point-and-cape-of");
  }
  if (key.includes("winelands") || key.includes("stellenbosch") || key.includes("franschhoek")) {
    return tt("ActivitiesTimeline.cape-winelands-vineyards-near-stellenbosch");
  }
  if (key.includes("chapman")) {
    return tt("ActivitiesTimeline.chapmans-peak-scenic-coastal-drive");
  }
  if (key.includes("helicopter")) {
    return tt("ActivitiesTimeline.helicopter-experience-over-cape-town");
  }
  if (key.includes("yacht")) {
    return tt("ActivitiesTimeline.private-yacht-charter-experience-in");
  }
  if (key.includes("safari")) {
    return tt("ActivitiesTimeline.safari-day-trip-experience-near");
  }
  if (key.includes("camps bay") || key.includes("clifton")) {
    return tt("ActivitiesTimeline.camps-bay-and-clifton-beach");
  }
  if (key.includes("kirstenbosch")) {
    return tt("ActivitiesTimeline.kirstenbosch-botanical-gardens-in-cape");
  }
  if (key.includes("fine dining") || key.includes("restaurant")) {
    return tt("ActivitiesTimeline.fine-dining-experience-in-cape");
  }

  return tt("ActivitiesTimeline.private-experience-in-cape-town", { title });
}

export default function ActivitiesTimeline({ activities }: Props) {
  const tt = useT();
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>{tt("ActivitiesTimeline.top-experiences-worth-adding-to")}</SectionTitle>
          <SectionText>
            {tt("ActivitiesTimeline.these-are-some-of-the")}</SectionText>
        </SectionHeader>

        <ActivitiesList>
          {activities.map((activity, index) => (
            <ActivityRow key={activity.title}>
              <ProgressColumn>
                <ProgressRail />
                <ProgressDot />
              </ProgressColumn>

              <ActivityCard>
                <ActivityInner>
                  <ActivityImageWrap>
                    <SmartImage
                      src={activity.image}
                      alt={getActivityAltText(activity.title, tt)}
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </ActivityImageWrap>

                  <ActivityContent>
                    <MobileStep>{tt("ActivitiesTimeline.experience")}{" "}{index + 1}</MobileStep>

                    <ActivityTitle>{activity.title}</ActivityTitle>

                    <BadgeRow>
                      <Badge>{activity.bestFor}</Badge>
                    </BadgeRow>

                    <ActivityText>{activity.description}</ActivityText>

                    <Recommendation>
                      <strong>{tt("ActivitiesTimeline.best-booked-as")}</strong> {activity.idealBooking}
                    </Recommendation>

                    <RowActions>
                      <Anchor
                        href={buildWhatsAppLink(
                          buildActivityWhatsAppMessage(
                            activity.title,
                            activity.idealBooking
                          )
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick({
                            source: "best_activities_list",
                            label: `Plan ${activity.title}`,
                            tour: activity.title,
                          })
                        }
                      >
                        <Button as="span">{tt("ActivitiesTimeline.plan-this-experience")}</Button>
                      </Anchor>
                    </RowActions>
                  </ActivityContent>
                </ActivityInner>
              </ActivityCard>
            </ActivityRow>
          ))}
        </ActivitiesList>
      </Container>
    </Section>
  );
}