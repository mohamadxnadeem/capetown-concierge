// Generated list of message group files. Add a line here when a new messages/<locale>/<group>.json is created.
import en_activities from "../../messages/en/activities.json";
import en_chauffeur_hire from "../../messages/en/chauffeur-hire.json";
import en_home from "../../messages/en/home.json";
import en_itinerary from "../../messages/en/itinerary.json";
import en_pages from "../../messages/en/pages.json";
import en_tour_detail from "../../messages/en/tour-detail.json";
import en_tours_hub from "../../messages/en/tours-hub.json";
import en_wine_farms from "../../messages/en/wine-farms.json";
import en_extra from "../../messages/en/extra.json";
import ar_activities from "../../messages/ar/activities.json";
import ar_chauffeur_hire from "../../messages/ar/chauffeur-hire.json";
import ar_home from "../../messages/ar/home.json";
import ar_itinerary from "../../messages/ar/itinerary.json";
import ar_pages from "../../messages/ar/pages.json";
import ar_tour_detail from "../../messages/ar/tour-detail.json";
import ar_tours_hub from "../../messages/ar/tours-hub.json";
import ar_wine_farms from "../../messages/ar/wine-farms.json";
import ar_extra from "../../messages/ar/extra.json";
import ptBR_activities from "../../messages/pt-BR/activities.json";
import ptBR_chauffeur_hire from "../../messages/pt-BR/chauffeur-hire.json";
import ptBR_home from "../../messages/pt-BR/home.json";
import ptBR_itinerary from "../../messages/pt-BR/itinerary.json";
import ptBR_pages from "../../messages/pt-BR/pages.json";
import ptBR_tour_detail from "../../messages/pt-BR/tour-detail.json";
import ptBR_tours_hub from "../../messages/pt-BR/tours-hub.json";
import ptBR_wine_farms from "../../messages/pt-BR/wine-farms.json";
import ptBR_extra from "../../messages/pt-BR/extra.json";
import ru_activities from "../../messages/ru/activities.json";
import ru_chauffeur_hire from "../../messages/ru/chauffeur-hire.json";
import ru_home from "../../messages/ru/home.json";
import ru_itinerary from "../../messages/ru/itinerary.json";
import ru_pages from "../../messages/ru/pages.json";
import ru_tour_detail from "../../messages/ru/tour-detail.json";
import ru_tours_hub from "../../messages/ru/tours-hub.json";
import ru_wine_farms from "../../messages/ru/wine-farms.json";
import ru_extra from "../../messages/ru/extra.json";

type Dict = Record<string, string>;

function merge(...parts: unknown[]): Dict {
  return Object.assign({}, ...(parts as Dict[]));
}

export const BODY: Record<"en" | "ar" | "pt-BR" | "ru", Dict> = {
  "en": merge(en_activities, en_chauffeur_hire, en_home, en_itinerary, en_pages, en_tour_detail, en_tours_hub, en_wine_farms, en_extra),
  "ar": merge(ar_activities, ar_chauffeur_hire, ar_home, ar_itinerary, ar_pages, ar_tour_detail, ar_tours_hub, ar_wine_farms, ar_extra),
  "pt-BR": merge(ptBR_activities, ptBR_chauffeur_hire, ptBR_home, ptBR_itinerary, ptBR_pages, ptBR_tour_detail, ptBR_tours_hub, ptBR_wine_farms, ptBR_extra),
  "ru": merge(ru_activities, ru_chauffeur_hire, ru_home, ru_itinerary, ru_pages, ru_tour_detail, ru_tours_hub, ru_wine_farms, ru_extra),
};
