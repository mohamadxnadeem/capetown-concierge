"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { endpoints } from "../../lib/api";
import type { Booking } from "../../lib/bookings";

const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 22px 22px 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 18px 18px 20px;
    border-radius: 18px;
  }
`;

const AmountLine = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 6px;
`;

const AmountValue = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  margin-bottom: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.7rem;
  }
`;

const PayButton = styled.a<{ $busy?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 58px;
  padding: 0 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 800;
  font-size: 1.02rem;
  letter-spacing: 0.03em;
  text-decoration: none;
  box-shadow: 0 10px 28px rgba(11, 91, 51, 0.28);
  transition: background 0.2s ease, transform 0.2s ease;
  pointer-events: ${({ $busy }) => ($busy ? "none" : "auto")};
  opacity: ${({ $busy }) => ($busy ? 0.7 : 1)};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const FinePrint = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  line-height: 1.6;
`;

const PaidPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  background: #e6f4ec;
  border: 1px solid #bcdfc8;
  color: #0b5b33;
  font-weight: 800;
  font-size: 0.98rem;
`;

const HelperCard = styled.div`
  padding: 14px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.94rem;
  line-height: 1.6;
`;

const Toast = styled.div<{ $tone: "success" | "warn" | "info" }>`
  margin: 0 0 14px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
  border: 1px solid;
  background: ${({ $tone }) =>
    $tone === "success" ? "#e6f4ec" : $tone === "warn" ? "#fbe9e9" : "#eef0f3"};
  border-color: ${({ $tone }) =>
    $tone === "success" ? "#bcdfc8" : $tone === "warn" ? "#eec3c3" : "#d4dae0"};
  color: ${({ $tone }) =>
    $tone === "success" ? "#0b5b33" : $tone === "warn" ? "#9a1f1f" : "#34414c"};
`;

function formatZar(value: string | null | undefined): string {
  if (!value) return "";
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0
    ? `R${Math.round(n).toLocaleString()}`
    : "";
}

const POLL_INTERVAL_MS = 5000;
const POLL_MAX_MS = 30000;

interface Props {
  booking: Booking;
}

export default function BookingPayNow({ booking }: Props) {
  const router = useRouter();
  const search = useSearchParams();
  const paidQuery = search?.get("paid") === "1";
  const cancelledQuery = search?.get("cancelled") === "1";

  const [isPaid, setIsPaid] = useState<boolean>(booking.is_paid === true);
  const [polling, setPolling] = useState<boolean>(false);
  const [toast, setToast] = useState<
    { tone: "success" | "warn" | "info"; text: string } | null
  >(null);

  // Set the toast on first mount based on the query param.
  useEffect(() => {
    if (paidQuery) {
      setToast({
        tone: "success",
        text: "Payment received! Your booking is confirmed.",
      });
    } else if (cancelledQuery) {
      setToast({
        tone: "warn",
        text: "Payment cancelled. You can try again any time.",
      });
    }
    // Only run once on mount — subsequent effects shouldn't retrigger toasts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If we returned from Yoco with ?paid=1 and the server-rendered booking
  // is still unpaid (webhook hasn't landed yet), poll the public booking
  // endpoint for up to 30s. Once we see is_paid=true, refresh the route so
  // downstream sections (e.g. upsells) recompute from the fresh booking.
  useEffect(() => {
    if (!paidQuery) return;
    if (isPaid) return;
    let cancelled = false;
    setPolling(true);
    const start = Date.now();
    const tick = async () => {
      if (cancelled) return;
      try {
        const url = endpoints.bookings.publicDetail(booking.booking_reference);
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok) {
          const data: Booking = await res.json();
          if (data.is_paid === true) {
            if (!cancelled) {
              setIsPaid(true);
              setPolling(false);
              router.refresh();
            }
            return;
          }
        }
      } catch {
        // network hiccup — keep trying until timeout
      }
      if (Date.now() - start >= POLL_MAX_MS) {
        if (!cancelled) {
          setPolling(false);
          setToast({
            tone: "info",
            text: "Still processing… if payment has gone through, this will update shortly.",
          });
        }
        return;
      }
      window.setTimeout(tick, POLL_INTERVAL_MS);
    };
    // First poll fires immediately, then repeats.
    tick();
    return () => {
      cancelled = true;
      setPolling(false);
    };
  }, [paidQuery, isPaid, booking.booking_reference, router]);

  const amount = formatZar(booking.total_client_amount);

  const body = (() => {
    if (isPaid) {
      return (
        <PaidPill>
          ✓ Paid{amount ? ` — ${amount}` : ""}
        </PaidPill>
      );
    }
    if (booking.payment_link) {
      return (
        <>
          <AmountLine>Amount due</AmountLine>
          <AmountValue>{amount || "—"}</AmountValue>
          <PayButton href={booking.payment_link} $busy={polling}>
            {polling ? "Confirming payment…" : "Pay Now"}
          </PayButton>
          <FinePrint>
            Secured by Yoco. You&apos;ll receive confirmation once payment
            goes through.
          </FinePrint>
        </>
      );
    }
    return (
      <HelperCard>Payment link will be sent to you shortly.</HelperCard>
    );
  })();

  return (
    <Wrapper>
      {toast ? <Toast $tone={toast.tone}>{toast.text}</Toast> : null}
      {body}
    </Wrapper>
  );
}
