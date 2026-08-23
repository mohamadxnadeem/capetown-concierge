"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import {
  Anchor,
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionText,
  SectionTitle,
} from "../cape-town-itinerary/shared";

const RESERVE_WA_MESSAGE =
  "Hi, I'd like to know more about the game reserve options on the Garden Route";

const Grid = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  padding: 26px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardTitle = styled.h3`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.25rem;
`;

const CardLocation = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  margin-bottom: 14px;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const FactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

const Fact = styled.div`
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
`;

const options = [
  {
    name: "Gondwana Private Game Reserve",
    location: "Near Mossel Bay",
    body: "A malaria-free Big Five reserve on the Fynbos coast, about 400km east of Cape Town. Lodges, tented camps and family villas.",
    facts: ["Big Five", "Malaria-free", "Lodges + tents"],
  },
  {
    name: "Botlierskop Private Game Reserve",
    location: "Near Mossel Bay",
    body: "A Big Five reserve set among the Outeniqua foothills, also close to Mossel Bay. Tented suites, family cottages, and horse-back safaris on offer.",
    facts: ["Big Five", "Malaria-free", "Horseback safaris"],
  },
];

export default function ReserveOptions() {
  const waLink = buildWhatsAppLink(RESERVE_WA_MESSAGE);

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Days 1 and 2</SectionEyebrow>
          <SectionTitle>Two Reserve Options, Both Booked at Cost</SectionTitle>
          <SectionText>
            Both reserves sit near Mossel Bay and both work equally well at this point in the route. We book whichever you prefer. If you want a recommendation for your dates and group, tell us and we&apos;ll walk you through the differences.
          </SectionText>
        </SectionHeader>

        <Grid>
          {options.map((o) => (
            <Card key={o.name}>
              <CardTitle>{o.name}</CardTitle>
              <CardLocation>{o.location}</CardLocation>
              <CardText>{o.body}</CardText>
              <FactRow>
                {o.facts.map((f) => (
                  <Fact key={f}>{f}</Fact>
                ))}
              </FactRow>
            </Card>
          ))}
        </Grid>

        <CtaRow>
          <Anchor
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "garden_route_reserve_section",
                label: "Ask About Reserve Options",
                tour: "7 Day Garden Route Itinerary",
              })
            }
          >
            <Button as="span">Ask About Both Options</Button>
          </Anchor>
        </CtaRow>
      </Container>
    </Section>
  );
}
