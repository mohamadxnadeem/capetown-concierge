import { Noto_Naskh_Arabic } from "next/font/google";

/** Loaded only for /ar pages (RootShell imports this module dynamically). */
export const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
  preload: false, // no preload tag on English pages; fetched only when Arabic text renders
  variable: "--font-arabic",
});
