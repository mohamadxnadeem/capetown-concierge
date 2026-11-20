import { Experience, FaqItem } from "./types";
import { enT } from "../../../lib/i18n/messages";
import type { TFunction } from "../../../lib/i18n/messages";
export { buildWhatsAppLink } from "../../../lib/whatsapp";

export function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function getPrimaryImage(experience: Experience) {
  const imageArray = experience.cover_photos || experience.images || [];
  const sorted = [...imageArray].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    sorted.find((photo) => photo.is_featured)?.cover_photos ||
    sorted[0]?.cover_photos ||
    ""
  );
}

export function formatCurrency(amount: number) {
  if (!amount || Number.isNaN(amount)) return "";
  return `$${Math.round(amount)}`;
}

export function formatPrice(price?: string | number, tt: TFunction = enT) {
  if (price === undefined || price === null || price === "") return "";
  const num = Number(String(price).replace(/[^0-9.]/g, ""));
  return isNaN(num) || num === 0 ? "" : tt("utils.from-per-day", { num: Math.round(num) });
}

export function normalizeUsdPrice(price?: string) {
  if (!price) return "";

  return price
    .replace(/^From\s+R/i, "From $")
    .replace(/^R/i, "$")
    .replace(/\s+R(?=\d)/gi, " $");
}

export function buildTourFaqs(tourTitle: string, tt: TFunction): FaqItem[] {
  return [
    {
      question: tt("utils.what-is-included-in-the", { tourTitle }),
      answer:
        tt("utils.each-private-tour-includes-a"),
    },
    {
      question: tt("utils.can-i-customise-the", { tourTitle }),
      answer:
        tt("utils.yes-private-tours-can-usually"),
    },
    {
      question: tt("utils.is-the-private", { tourTitle }),
      answer:
        tt("utils.yes-this-is-designed-as"),
    },
    {
      question: tt("utils.how-do-i-book-the-2", { tourTitle }),
      answer:
        tt("utils.the-easiest-way-to-book"),
    },
  ];
}
