"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { Anchor, Container, Section, SectionHeader, SectionText, SectionTitle, StyledLink, whatsappLink } from "./shared";
import { ActivityItem } from "./types";

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

const ActivityImage = styled.div<{ $image: string }>`
  min-height: 260px;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.04)),
    url(${({ $image }) => $image}) center/cover no-repeat;
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

type Props = {
  activities: ActivityItem[];
};

export default function ActivitiesTimeline({ activities }: Props) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Top Experiences Worth Adding to Your Itinerary</SectionTitle>
          <SectionText>
            These are some of the best activities to do in Cape Town for
            first-time visitors, couples, families, and luxury travellers. Each
            one can be enjoyed as part of a private chauffeur-driven day
            experience or a custom multi-day itinerary.
          </SectionText>
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
                  <ActivityImage $image={activity.image} />

                  <ActivityContent>
                    <MobileStep>Experience {index + 1}</MobileStep>

                    <ActivityTitle>{activity.title}</ActivityTitle>

                    <BadgeRow>
                      <Badge>{activity.bestFor}</Badge>
                    </BadgeRow>

                    <ActivityText>{activity.description}</ActivityText>

                    <Recommendation>
                      <strong>Best booked as:</strong> {activity.idealBooking}
                    </Recommendation>

                    <RowActions>
                      <Anchor
                        href={whatsappLink}
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
                        <Button as="span">Plan This Experience</Button>
                      </Anchor>

                      <StyledLink href="/private-tours">
                        <Button as="span" $variant="secondary">
                          View Private Tours
                        </Button>
                      </StyledLink>
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