# Multilingual launch checklist (for King Mo)

The website now has Arabic (/ar/), Brazilian Portuguese (/pt-br/) and Russian (/ru/) pages, and prices that follow the visitor's location. Work through these steps in order. Nothing here needs code.

## 1. Domains
- [ ] In Vercel, open the project, go to Settings, then Domains.
- [ ] Add each old domain you own. They already redirect to www.capetown-concierge.co.za, they just need to be attached to the project.
- [ ] Check each old domain in a browser and confirm it lands on the main site.

## 2. Yandex Webmaster (for Russian search)
- [ ] Go to webmaster.yandex.com and add https://www.capetown-concierge.co.za.
- [ ] Choose the "Meta tag" verification method. Yandex shows a tag like `<meta name="yandex-verification" content="abc123" />`.
- [ ] Copy only the content value (abc123).
- [ ] In Vercel, go to Settings, then Environment Variables, and add `NEXT_PUBLIC_YANDEX_VERIFICATION` with that value (Production).
- [ ] Redeploy the site, then press Verify in Yandex Webmaster.

## 3. Submit the sitemap
- [ ] Google Search Console: Sitemaps, add `https://www.capetown-concierge.co.za/sitemap.xml`.
- [ ] Yandex Webmaster: Indexing, then Sitemap files, add the same address.
- [ ] The sitemap lists every language version. Search engines read the language links on each page.

## 4. Google Analytics 4: language report
- [ ] In GA4 go to Admin, then Custom definitions, then Create custom dimension.
- [ ] Name: Page locale. Parameter name: `page_locale`. Create it twice: once with scope Event and once with scope User.
- [ ] Reports will start filling in from the day you create it, not before.

## 5. Review and publish translations
New translations start as drafts. Draft pages show a notice to visitors.

Tours and vehicles (managed in the Django admin):
- [ ] Open the Django admin, then the tour or vehicle.
- [ ] Find the translation status for the language (Arabic, Portuguese or Russian).
- [ ] Read the translated text. Ask a native speaker if you can.
- [ ] Change the status from draft to reviewed and save.

All other pages (home, contact, policies, guides and so on):
- [ ] Open `messages/status.json` in the website repository.
- [ ] Find the page path and the language, and change `"draft"` to `"reviewed"`.
- [ ] Commit the change, merge it, and Vercel publishes it.

## 6. Telegram
- [ ] In Vercel, add `NEXT_PUBLIC_TELEGRAM_LINK` (Production) with your Telegram link, then redeploy. The Telegram button is hidden while this is empty.
- [ ] Test the link from a phone that does NOT have your number saved. It should open a chat with you without showing the number on the page.

## 7. Test enquiries
- [ ] Send one test enquiry from each version of the site: English, /ar/, /pt-br/ and /ru/.
- [ ] Confirm each arrives on WhatsApp or by email in the right language, and that the quote and booking stay in South African Rand.

## 8. Prices check
- [ ] Open the site from a phone using a VPN set to the UAE, Russia and Brazil (or ask a friend there). Prices should show a converted amount with the rand price in brackets, for example "about AED 2,450 (R9,850)".
- [ ] Pick a different currency from the selector at the top and reload. Your choice should stay.
