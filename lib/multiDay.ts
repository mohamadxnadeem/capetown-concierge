import type { TFunction } from "./i18n/messages";
export const MULTI_DAY_STEPS = (tt: TFunction) => ([
  tt("multiDay.share-your-dates-and-preferences"),
  tt("multiDay.receive-a-tailored-day-by"),
  tt("multiDay.your-chauffeur-is-assigned-for"),
  tt("multiDay.adjust-anything-on-whatsapp"),
]);

export const MULTI_DAY_INTRO =
  (tt: TFunction) => (tt("multiDay.many-of-our-clients-book"));

export const MULTI_DAY_FAQS = (tt: TFunction): { question: string; answer: string }[] => ([
  {
    question: tt("multiDay.how-many-days-can-i"),
    answer:
      tt("multiDay.as-many-as-you-like"),
  },
  {
    question: tt("multiDay.will-i-have-the-same"),
    answer:
      tt("multiDay.yes-your-chauffeur-is-assigned"),
  },
  {
    question: tt("multiDay.what-is-included"),
    answer:
      tt("multiDay.every-day-includes-a-professional"),
  },
  {
    question: tt("multiDay.how-long-is-a-full"),
    answer:
      tt("multiDay.a-full-day-is-up"),
  },
  {
    question: tt("multiDay.can-you-take-us-to"),
    answer:
      tt("multiDay.yes-multi-day-trips-can"),
  },
  {
    question: tt("multiDay.how-do-i-book"),
    answer:
      tt("multiDay.message-us-on-whatsapp-or"),
  },
]);
