import { notFound } from "next/navigation";

// Any path inside a locale that no other route matches renders the localised 404.
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export default function CatchAll() {
  notFound();
}
