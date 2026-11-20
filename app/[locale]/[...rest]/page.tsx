import { notFound } from "next/navigation";

// Every unknown URL (including English-only paths under a language prefix) lands here
// so the proper 404 page renders inside the locale layout.
export default function CatchAll() {
  notFound();
}
