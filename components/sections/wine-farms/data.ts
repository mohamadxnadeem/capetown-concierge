export type WineRegionKey = "stellenbosch" | "franschhoek" | "constantia";

export interface WineFarmItem {
  title: string;
  image: string;
  region: WineRegionKey;
  description: string;
  bestFor: string;
  ideal: string;
  tags?: string[];
}

export const wineFarms: WineFarmItem[] = [
  // ── Stellenbosch ──────────────────────────────────────────────────────────
  {
    title: "Delaire Graff Estate",
    image: "/images/wine/graff.jpg",
    region: "stellenbosch",
    description:
      "Perched on the Helshoogte Pass between Stellenbosch and Franschhoek, Delaire Graff Estate is consistently ranked among South Africa's finest wine estates. Owned by jewellery magnate Laurence Graff, the property weaves world-class sculpture, celebrated fine dining at the Graff Restaurant, and exceptional wines into a setting of genuine luxury. The vineyard views stretch across the Simonsberg mountains and on a clear day reach all the way to False Bay. Every detail — from the art-lined tasting room to the curated wine list — reflects the passion of an owner who chose this hillside because he fell in love with it.",
    bestFor: "Luxury couples, anniversary celebrations, art and food lovers",
    ideal:
      "Best experienced as a first or second estate on a private Stellenbosch wine tour with a lunch reservation at the Graff Restaurant.",
    tags: ["Most romantic", "Luxury", "Scenic views"],
  },
  {
    title: "Tokara Wine Estate",
    image: "/images/wine/tokara.jpg",
    region: "stellenbosch",
    description:
      "Tokara sits at the summit of the Helshoogte Pass and the view from its tasting room is one of the finest of any wine estate in South Africa — the entire Stellenbosch valley unfolds below, with Table Mountain and False Bay visible on a clear day. The wines are excellent, particularly the Director's Reserve range of reds, and the estate also produces outstanding olive oils and a beautifully executed restaurant menu. It's a premium experience that balances serious wine quality with genuinely breathtaking scenery, working equally well for a morning tasting or a long vineyard lunch.",
    bestFor: "Wine lovers, couples, view-seekers",
    ideal:
      "Best combined with Delaire Graff on a private Helshoogte wine route — book a table at Tokara Restaurant and let the afternoon take care of itself.",
    tags: ["Food lovers", "Scenic views", "Premium tasting"],
  },
  {
    title: "Waterford Estate",
    image: "/images/wine/waterfords.png",
    region: "stellenbosch",
    description:
      "Waterford Estate sits in the Blaauwklippen valley on the eastern edge of Stellenbosch and is best known for producing some of the Cape's most critically acclaimed Bordeaux-style blends. The estate is equally celebrated for its pioneering chocolate and wine pairing experience — a tasting that matches six wines with six specially chosen chocolates in a way that genuinely reframes how you think about both. The setting is intimate and Tuscan-inspired, the team is passionate, and the overall experience feels carefully crafted from the first pour to the final piece of chocolate.",
    bestFor: "Luxury travellers, couples, chocolate and wine enthusiasts",
    ideal:
      "Best visited as an afternoon estate on a private Stellenbosch wine tour, ending with the signature chocolate pairing experience.",
    tags: ["Most romantic", "Luxury", "Chocolate pairing"],
  },
  {
    title: "Lanzerac Wine Estate",
    image: "/images/wine/lanzarac.jpg",
    region: "stellenbosch",
    description:
      "Founded in 1692, Lanzerac is one of Stellenbosch's most storied wine estates. The five-star property sits at the end of a tree-lined avenue on the edge of the town, its Cape Dutch homestead surrounded by heritage gardens and rolling vineyards. The tasting room is housed in a beautifully restored historic building and the service is polished without ever feeling cold. The wines — particularly the Pinotage and the Lady Anne Barnard range — are among the finest produced in Stellenbosch. A long lunch on the estate terrace with a glass of the flagship Pinotage is one of the Cape Winelands' enduring pleasures.",
    bestFor: "Luxury travellers, couples, heritage wine enthusiasts",
    ideal:
      "Best for a refined morning tasting or long lunch on a private Stellenbosch wine day. Pairs exceptionally well with Delaire Graff or Waterford.",
    tags: ["Historic", "Luxury", "Most romantic"],
  },
  {
    title: "Spier Wine Farm",
    image: "/images/wine/spier.jpg",
    region: "stellenbosch",
    description:
      "Spier is one of the most accessible and visitor-friendly wine estates in Stellenbosch, making it an ideal opening stop on a Cape Winelands day — particularly for families and groups who want variety alongside quality wine. Spanning over 1,000 hectares, the estate includes multiple restaurants, a deli, craft spaces, and generous picnic areas. The wines are consistently good across the range; the Chenin Blanc is one of the Cape's most popular whites. The atmosphere is welcoming and relaxed, and the farm never feels pretentious — it's a genuinely great all-rounder.",
    bestFor: "Families, groups, casual wine lovers, first visits to the Winelands",
    ideal:
      "Best as an opening stop on a private Stellenbosch wine day, setting a relaxed tone before heading to more boutique estates.",
    tags: ["Family friendly", "Easy going", "Great all-rounder"],
  },
  {
    title: "Postcard Café",
    image: "/images/wine/postcard.jpg",
    region: "stellenbosch",
    description:
      "If there is one stop on a Cape Winelands day that travellers keep returning to for the view alone, it is Postcard Café. Tucked into the Jonkershoek Valley on the outskirts of Stellenbosch, the café overlooks one of the most photographed vineyard panoramas in the Cape — vine-covered slopes, a glittering river, and the Jonkershoek mountains forming a natural amphitheatre behind the property. The food is relaxed and well-priced, the wine selection carefully chosen from nearby estates, and the setting is the kind of place where a planned 45-minute lunch turns into three unhurried hours.",
    bestFor: "Couples, scenic lovers, lunch stops, photographers",
    ideal:
      "Best as a midday lunch stop on a private Stellenbosch wine tour — arrive around noon and allow time to linger over the view.",
    tags: ["Most scenic", "Lunch stop", "Romantic views"],
  },
  {
    title: "Vredenheim Wild Cat Experience",
    image: "/images/wine/wildcat.jpg",
    region: "stellenbosch",
    description:
      "Vredenheim is one of those rare stops that elevates a Cape Winelands day from pleasant to genuinely memorable. Located on the southern slopes of Stellenbosch, the estate combines quality wine production with a remarkable big cat sanctuary where cheetahs, caracals, and wild cats roam in spacious natural enclosures. The wines are well above average for the price, and it is the combination — good wine, beautiful mountain views over the Helderberg, and an unexpected encounter with the big cats — that makes Vredenheim such a distinctive highlight on any wine route.",
    bestFor: "Families, returning visitors, unique experiences, animal lovers",
    ideal:
      "Best as an afternoon addition to a private Stellenbosch wine tour, especially for groups travelling with children or visitors wanting something beyond the standard wine route.",
    tags: ["Family friendly", "Unique experience", "Something different"],
  },

  // ── Franschhoek ───────────────────────────────────────────────────────────
  {
    title: "Babylonstoren",
    image: "/images/wine/babylonstoren.jpg",
    region: "franschhoek",
    description:
      "Babylonstoren is unlike any other wine estate in South Africa. Built around a historic Cape Dutch farm in the Franschhoek Valley, the estate centres on an extraordinary walled garden with over 300 edible plant species that supply its two celebrated restaurants. The wines are distinctive, the olive oils exceptional, and the setting — whitewashed Cape Dutch architecture, lavender-lined paths, vineyard views towards the Hawequas mountains — is impossibly beautiful. It rewards slow exploration: walk the garden trail, taste the wines, then settle in for a long farm lunch. This is what a perfect Cape Winelands day looks like.",
    bestFor: "Families, lifestyle travellers, garden and food lovers",
    ideal:
      "Best visited as the centrepiece of a private Franschhoek day with a garden walk and a table booked at Babel or The Greenhouse.",
    tags: ["Family friendly", "Most scenic", "Lifestyle"],
  },
  {
    title: "Boschendal",
    image: "/images/wine/boschendal.JPG",
    region: "franschhoek",
    description:
      "One of the oldest wine estates in the Cape, Boschendal sits in the Franschhoek Valley beneath the dramatic peaks of the Franschhoek and Groot Drakenstein mountains. Dating to 1685, the Cape Dutch homestead is a national monument and one of the most photographed heritage buildings in South Africa. Tastings are relaxed and unhurried, and the estate is known for its exceptional deli picnic baskets — a favourite for families and groups wanting a beautiful outdoor lunch in vineyard surroundings. The grounds are vast, the atmosphere consistently warm, and the combination of history and scenery is hard to match.",
    bestFor: "Groups, families, heritage lovers, outdoor dining",
    ideal:
      "Best for a midday picnic visit on the estate lawn. Pairs beautifully with Babylonstoren for a full Franschhoek valley private wine day.",
    tags: ["Family friendly", "Picnics", "Relaxed atmosphere"],
  },

  // ── Constantia ────────────────────────────────────────────────────────────
  {
    title: "Groot Constantia",
    image: "/images/wine/groot.jpg",
    region: "constantia",
    description:
      "South Africa's oldest wine estate, Groot Constantia has been producing wine continuously since 1685 and sits just 20 minutes from Cape Town's city bowl in the leafy Constantia valley. The Cape Dutch manor house is a UNESCO-recognised cultural landmark, the museum chronicles 340 years of Cape winemaking history, and the wines — particularly the celebrated Gouverneurs Reserve — are consistently excellent. For first-time visitors, history lovers, or travellers wanting a meaningful wine experience close to the city, Groot Constantia is the natural choice. It also pairs effortlessly with a broader Cape Town day.",
    bestFor: "First-time visitors, history lovers, short itineraries, families",
    ideal:
      "Ideal as the main stop on a private Constantia wine experience, or combined with Cape Town sightseeing on a full-day private chauffeur tour.",
    tags: ["Historic", "Closest to Cape Town", "Great for short trips"],
  },
];

export interface WineRegionGroup {
  key: WineRegionKey;
  headline: string;
  intro: string;
  items: WineFarmItem[];
}

export const wineFarmRegions: WineRegionGroup[] = [
  {
    key: "stellenbosch",
    headline: "Best Wine Farms in Stellenbosch",
    intro:
      "Stellenbosch is the heart of South African wine country — a university town ringed by mountain ranges, historic estates, and some of the world's great vineyards. The wine route runs in every direction from the town centre, covering dozens of estates across the Helshoogte Pass, the Blaauwklippen valley, and the slopes of the Simonsberg. Whether you want a luxury tasting at a five-star estate, a scenic lunch with panoramic views, or a unique experience that goes beyond the glass, Stellenbosch offers more variety than any other wine region in the Cape.",
    items: wineFarms.filter((f) => f.region === "stellenbosch"),
  },
  {
    key: "franschhoek",
    headline: "Best Wine Farms in Franschhoek",
    intro:
      "Franschhoek — literally 'French Corner' — was settled by Huguenot refugees in the late 17th century and the French influence on its food, wine, and architecture is still felt today. The valley is smaller and more intimate than Stellenbosch, but the quality is equal and the atmosphere decidedly more refined. Franschhoek is known for exceptional food and wine pairings, elegant estate restaurants, and a slower, more romantic pace that makes it the natural choice for couples and luxury travellers who want to go deep rather than wide on a Cape Winelands day.",
    items: wineFarms.filter((f) => f.region === "franschhoek"),
  },
  {
    key: "constantia",
    headline: "Best Wine Farms in Constantia",
    intro:
      "The Constantia valley is Cape Town's home wine region — the closest estates to the city, nestled in a leafy green basin between the slopes of Table Mountain and the Constantiaberg. It is where South African wine history began in 1685, and the estates here carry that heritage with quiet confidence. Constantia wine farms are ideal for shorter outings, half-day experiences, or pairing a wine tasting with other Cape Town highlights on the same day. The atmosphere is relaxed, the wines are excellent, and the 20-minute drive from the city bowl makes it unusually easy to reach.",
    items: wineFarms.filter((f) => f.region === "constantia"),
  },
];

export const wineFaqItems = [
  {
    question: "What are the best wine farms to visit near Cape Town?",
    answer:
      "The top wine farms near Cape Town include Delaire Graff, Babylonstoren, Boschendal, Tokara, Groot Constantia, Waterford Estate, Vredenheim, Spier, Postcard Café, and Lanzerac. Each offers a different kind of experience — from luxury fine dining and panoramic views to relaxed picnics and family-friendly estates.",
  },
  {
    question: "Which wine farms are most romantic for couples?",
    answer:
      "Delaire Graff, Waterford Estate, Lanzerac, and Postcard Café are especially popular with couples. Delaire Graff and Lanzerac offer a luxury, polished atmosphere with exceptional food. Waterford is known for its intimate chocolate and wine pairing. Postcard Café delivers one of the most scenic vineyard lunches in the Cape.",
  },
  {
    question: "Which wine farms are best for families?",
    answer:
      "Babylonstoren, Boschendal, Spier, and Vredenheim are the best family-friendly wine farms near Cape Town. Babylonstoren has a celebrated walled garden and two restaurants. Boschendal offers picnics on vast estate grounds. Spier has multiple dining options and wide open spaces. Vredenheim adds a big cat sanctuary for something genuinely different.",
  },
  {
    question: "Is Stellenbosch or Franschhoek better for wine tasting?",
    answer:
      "Stellenbosch offers the widest variety of estates across different styles, price points, and settings, making it the better choice for a first Winelands visit or a full-day wine route. Franschhoek is more intimate and refined, with exceptional food and a slower pace — ideal for couples and luxury travellers who want quality over quantity. The best approach is to combine both on a private chauffeur-driven tour.",
  },
  {
    question: "How far are the wine farms from Cape Town?",
    answer:
      "Groot Constantia in Constantia is only 20 minutes from Cape Town's city bowl. Stellenbosch estates are typically 45 to 50 minutes from the city centre. Franschhoek estates are around 60 to 75 minutes away. With a private chauffeur, all three regions are easily accessible on a full-day tour from Cape Town.",
  },
  {
    question: "How many wine farms can you visit in one day?",
    answer:
      "Most private wine tours comfortably include 3 to 4 wine farms in one day, depending on the pace, tasting duration, and whether a longer lunch stop is included. If you want to visit both Stellenbosch and Franschhoek in one day, a private chauffeur allows you to cover both without rushing.",
  },
  {
    question: "Do I need a chauffeur for a wine tour in Cape Town?",
    answer:
      "A private chauffeur is strongly recommended for any Cape Winelands day. It allows you to fully enjoy wine tastings at every estate without worrying about driving, finding parking, or navigating mountain passes. The experience is far more relaxed, more flexible, and genuinely more enjoyable when someone else takes care of the logistics.",
  },
  {
    question: "Can I customise my wine tour itinerary?",
    answer:
      "Yes, all our private wine tours are fully customisable. You choose the estates, the pace, the lunch stop, and the return time. If you want to linger at Babylonstoren's garden for an extra hour or add a spontaneous stop at a boutique cellar, a private chauffeur makes that completely possible without affecting anyone else's plans.",
  },
  {
    question: "What is the best time of year to visit Cape Town wine farms?",
    answer:
      "October through April is the peak season for the Cape Winelands, with warm weather, lush green vineyards, and harvest activity from February to March. Winter months (May to September) offer fewer crowds, lower prices at estate restaurants, and a more atmospheric setting — particularly in Franschhoek where estate fireplaces and hearty food pairings come into their own.",
  },
  {
    question: "Which wine farms are best for scenic views and photography?",
    answer:
      "Delaire Graff, Tokara, Babylonstoren, and Postcard Café offer the most spectacular vineyard photography opportunities. Delaire Graff and Tokara both sit on mountain passes with sweeping valley views. Babylonstoren's walled garden and Cape Dutch buildings are iconic in their own right. Postcard Café has one of the most photographed vineyard panoramas in the entire Cape.",
  },
];
