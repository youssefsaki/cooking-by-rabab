#!/usr/bin/env python3
"""Client PDF — progress report for Rabab (site + search + analytics)."""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).with_name("Taghazout-Cooking-Class-SEO-Work-Done.pdf")
FONT = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
FONT_B = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

GREEN = (6, 26, 28)
ACCENT = (199, 93, 58)
INK = (32, 36, 34)
MUTED = (90, 96, 94)
LINE = (222, 226, 220)
SOFT = (247, 244, 239)
WHITE = (255, 255, 255)


class Report(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_fill_color(*GREEN)
        self.rect(0, 0, 210, 14, "F")
        self.set_fill_color(*ACCENT)
        self.rect(0, 14, 210, 1.4, "F")
        self.set_font("Arial", "B", 8)
        self.set_text_color(*WHITE)
        self.set_xy(14, 4)
        self.cell(120, 6, "Taghazout Cooking Class  ·  Progress report")
        self.set_xy(130, 4)
        self.cell(66, 6, "14 September 2026", align="R")
        self.set_y(22)

    def footer(self):
        self.set_y(-14)
        self.set_draw_color(*LINE)
        self.line(14, self.get_y(), 196, self.get_y())
        self.set_font("Arial", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 8, f"Page {self.page_no()}  ·  For Rabab  ·  Website, search & analytics", align="C")

    def h1(self, text):
        self.set_x(14)
        self.set_font("Arial", "B", 15)
        self.set_text_color(*GREEN)
        self.multi_cell(182, 8, text)
        self.ln(2)

    def h2(self, text):
        self.ln(2)
        self.set_x(14)
        self.set_font("Arial", "B", 11)
        self.set_text_color(*ACCENT)
        self.cell(182, 7, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body(self, text):
        self.set_x(14)
        self.set_font("Arial", "", 9.5)
        self.set_text_color(*INK)
        self.multi_cell(182, 5.2, text)
        self.ln(2)

    def note(self, text):
        self.set_fill_color(*SOFT)
        self.set_draw_color(*LINE)
        x, y = 14, self.get_y()
        self.set_xy(x + 3, y + 2)
        self.set_font("Arial", "", 8.5)
        self.set_text_color(*INK)
        self.multi_cell(176, 4.6, text)
        h = self.get_y() - y + 2
        self.rect(x, y, 182, h, "D")
        self.set_xy(14, y + h + 3)

    def table(self, headers, rows, col_w):
        self.set_font("Arial", "B", 8)
        self.set_fill_color(*GREEN)
        self.set_text_color(*WHITE)
        for i, h in enumerate(headers):
            self.cell(col_w[i], 7, h, border=0, fill=True)
        self.ln()
        self.set_font("Arial", "", 8)
        for r_i, row in enumerate(rows):
            self.set_fill_color(*(SOFT if r_i % 2 == 0 else WHITE))
            self.set_text_color(*INK)
            for i, cell in enumerate(row):
                self.cell(col_w[i], 6.6, str(cell), border=0, fill=True)
            self.ln()
        self.ln(3)

    def item(self, title, text):
        self.set_x(14)
        self.set_font("Arial", "B", 9.5)
        self.set_text_color(*GREEN)
        self.cell(0, 5.5, title, new_x="LMARGIN", new_y="NEXT")
        self.set_x(14)
        self.set_font("Arial", "", 9)
        self.set_text_color(*INK)
        self.multi_cell(182, 5, text)
        self.ln(1.6)


def main():
    pdf = Report(format="A4")
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_font("Arial", "", FONT)
    pdf.add_font("Arial", "B", FONT_B)

    # Cover
    pdf.add_page()
    pdf.set_fill_color(*GREEN)
    pdf.rect(0, 0, 210, 297, "F")
    pdf.set_fill_color(*ACCENT)
    pdf.rect(0, 0, 8, 297, "F")
    pdf.set_text_color(*ACCENT)
    pdf.set_font("Arial", "B", 11)
    pdf.set_xy(24, 42)
    pdf.cell(0, 8, "PROGRESS REPORT  ·  SEPTEMBER 2026")
    pdf.set_text_color(*WHITE)
    pdf.set_font("Arial", "B", 28)
    pdf.set_xy(24, 58)
    pdf.multi_cell(160, 12, "What was done on\nyour website so more\nguests can find you")
    pdf.set_font("Arial", "", 12)
    pdf.set_xy(24, 118)
    pdf.multi_cell(
        160,
        6.8,
        "Prepared for Rabab — Taghazout Cooking Class.\n"
        "Website, Google Search, and Google Analytics are run together\n"
        "so you can focus on the class, the village, and your guests.",
    )
    pdf.set_font("Arial", "", 10)
    pdf.set_xy(24, 162)
    pdf.set_text_color(210, 214, 210)
    pdf.multi_cell(
        160,
        6,
        "Date: 14 September 2026\n"
        "Website: www.taghazout-cooking-class.com\n"
        "English: /     French: /fr",
    )
    pdf.set_xy(24, 248)
    pdf.set_font("Arial", "B", 10)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 6, "For Rabab  ·  Please keep this with your business papers")

    # 1. Roles + one sentence
    pdf.add_page()
    pdf.h1("1. How this is run")
    pdf.body(
        "Your cooking class is the product. The website, Google Search Console, "
        "and Google Analytics are handled for you — including what people type in Google, "
        "which pages they open, and which visits become bookings."
    )
    pdf.table(
        ["You (Rabab)", "Handled for you"],
        [
            ["Host the class and the village", "Build and update the website"],
            ["Answer WhatsApp the same day", "Google Search Console"],
            ["Ask happy guests for a Google review", "Google Analytics"],
            ["Keep Maps photos and reviews fresh", "Search titles, French pages, tracking"],
        ],
        [91, 91],
    )
    pdf.note(
        "This report is what is already done. It is not a promise that Google will put you on page 1 this week. "
        "Google needs time to recrawl. Paid ads are a later step — we do not turn them on until tracking is proven."
    )

    pdf.h1("2. In one sentence")
    pdf.body(
        "Guests can now book in English or French. Google has two real pages for each main screen: "
        "English at the normal address, French at /fr, each with its own title and description. "
        "The sitemap Google uses to crawl the site was broken; it now works. "
        "When someone finishes a booking, Analytics can record it."
    )

    pdf.h1("3. French is now a real part of the site")
    pdf.body(
        "Before, English and French shared one address. Google almost always showed English. "
        "The language button now opens a French address, so a French search can show a French description."
    )
    pdf.table(
        ["Page", "English", "French"],
        [
            ["Home", "/", "/fr"],
            ["Packages", "/packages", "/fr/packages"],
            ["Book", "/book", "/fr/book"],
            ["Experiences", "/experiences", "/fr/experiences"],
            ["Location", "/ourstory/location", "/fr/ourstory/location"],
            ["Events", "/events", "/fr/events"],
            ["FAQ", "/faq-contact", "/fr/faq-contact"],
        ],
        [50, 66, 66],
    )
    pdf.body("Full French home:  https://www.taghazout-cooking-class.com/fr")

    # Titles
    pdf.add_page()
    pdf.h1("4. New search titles (live)")
    pdf.body(
        "These are the titles on the live pages. Google may still show an older title for a while. "
        "Search Console is used to ask Google to recrawl — you do not need to do that yourself."
    )
    pdf.h2("English")
    for line in [
        "Home: Cooking Class Taghazout, Tamraght & Agadir",
        "Packages: Cooking Class Packages — Taghazout from €65",
        "Book: Book a Cooking Class near Taghazout",
        "Location: Cooking Class near Taghazout, Tamraght & Agadir",
        "Experiences: Tajine, Rfissa & Bread Class in Taghazout",
    ]:
        pdf.set_x(14)
        pdf.set_font("Arial", "", 9.5)
        pdf.set_text_color(*INK)
        pdf.multi_cell(182, 5.4, "-  " + line)
    pdf.ln(2)
    pdf.h2("French")
    for line in [
        "Home: Cours de cuisine Taghazout, Tamraght et Agadir",
        "Packages: Formules cours de cuisine à Taghazout dès 65 €",
        "Book: Réserver un cours de cuisine près de Taghazout",
        "Location: Cours de cuisine près de Taghazout, Tamraght et Agadir",
        "Experiences: Cours tajine, rfissa et pain à Taghazout",
    ]:
        pdf.set_x(14)
        pdf.set_font("Arial", "", 9.5)
        pdf.set_text_color(*INK)
        pdf.multi_cell(182, 5.4, "-  " + line)
    pdf.ln(3)
    pdf.body(
        "Taghazout, Tamraght, and Agadir sit in the same home title, so people searching any of those towns can see you."
    )

    pdf.h1("5. Other work already on the live site")
    pdf.item(
        "Sitemap fixed",
        "Google’s map of the site (sitemap.xml) returned an error. It now works and lists English and French pages.",
    )
    pdf.item(
        "Share photos",
        "Each main page has its own photo when a guest shares the link on WhatsApp, Instagram, or Facebook.",
    )
    pdf.item(
        "Saturday event for Google",
        "The weekly Amazigh music evening (Saturday, 15:00–19:30, 80 €) is written in a format Google can read.",
    )
    pdf.item(
        "Packages for Google",
        "The four offers (from 65 €, weekly event, private, Rabab at your villa) include prices Google can understand.",
    )
    pdf.item(
        "Breadcrumb trail",
        "Inner pages tell Google the path (Home → Packages). This can show as a small trail under the search result.",
    )
    pdf.item(
        "Language tags",
        "Each page tells Google: English lives here, French lives on /fr. That is how French descriptions can appear for French searches.",
    )
    pdf.item(
        "Honest review numbers",
        "A fake “500 reviews” mark was removed from hidden code. The page still shows 69 Google reviews. Fake review counts can hurt a site.",
    )

    # Analytics + keywords
    pdf.add_page()
    pdf.h1("6. Google Analytics and Search Console")
    pdf.item(
        "Google Analytics (GA4)",
        "The public site is connected. When a guest finishes a booking, the site can send that booking to Analytics "
        "(no names, emails, or phone numbers). WhatsApp button taps can be counted too.",
    )
    pdf.item(
        "Where a guest came from",
        "Bookings can store a source (Google, Instagram, WhatsApp, and so on). "
        "Ad links will use a small tag on the URL so we can see if a guest came from an ad.",
    )
    pdf.item(
        "Google Search Console",
        "This is the tool that shows the real words people type. It is already connected and is used to watch queries, "
        "countries, and to ask Google to recrawl the new French pages. You do not need a login for this report.",
    )
    pdf.note(
        "What we watch: “cooking class taghazout”, “cooking class tamraght”, "
        "“cours de cuisine taghazout”, and “expérience berbère avec cours de cuisine”. "
        "Clicks are still low. That is why this work came before ads."
    )

    pdf.h1("7. Keywords from the research")
    pdf.body(
        "A separate PDF lists every phrase. Those English phrases are on English pages. "
        "Those French phrases are on /fr pages. Google ranks from titles, descriptions, and text guests can read — "
        "not from a hidden list alone. The list is still useful: it keeps English and French searches from mixing."
    )
    pdf.h2("English (included)")
    pdf.body(
        "cooking class taghazout · taghazout cooking class · cooking class tamraght · tamraght cooking class · "
        "cooking class agadir · cooking class near agadir · moroccan / berber / amazigh cooking class taghazout · "
        "tajine taghazout · rfissa taghazout · couscous cooking class taghazout · food in taghazout · "
        "things to do in taghazout besides surfing · berber experience with cooking class · private cooking class taghazout."
    )
    pdf.h2("French (included)")
    pdf.body(
        "cours de cuisine taghazout / tamraght / agadir · atelier cuisine · cours de cuisine marocaine / berbère / amazigh · "
        "tajine, rfissa, msemen, couscous, amlou, pain berbère · expérience berbère avec cours de cuisine · "
        "activité taghazout hors surf · que faire à taghazout / tamraght · visite village berbère · excursion atlas."
    )
    pdf.body(
        "Not used on purpose: “pick it cook it” (another business), “date night cooking classes”, and “bbq class near me” "
        "(not Taghazout)."
    )

    # Next / not ads yet
    pdf.add_page()
    pdf.h1("8. What this will not do")
    pdf.body(
        "It will not put you on page 1 overnight. Google can keep showing old English text until it recrawls /fr. "
        "Larger French sites with years of pages can still sit above you."
    )
    pdf.body(
        "It does not replace Google Maps. Guests already in Taghazout often type “near me” and tap the map. "
        "Fresh photos and new reviews on your Google listing still matter more for those people than any website title."
    )
    pdf.body(
        "It is not Google Ads. Ads are rent: when you stop paying, the visits stop. "
        "This work is the shop you own. Ads come later, in a small test around Taghazout / Tamraght / Agadir, "
        "only after Analytics shows that bookings are counted correctly."
    )

    pdf.h1("9. What happens next (handled for you)")
    pdf.body(
        "1. Keep watching Search Console while Google recrawls English and /fr pages.\n"
        "2. Confirm that a finished booking appears in Analytics.\n"
        "3. After that, a small ads test can be designed — people already on the coast, "
        "words that include Taghazout or Tamraght, landing on the Book page. "
        "No Europe-wide ads for the generic words “cooking class”.\n"
        "4. Review numbers again in about four weeks: which words showed the site, which countries, how many bookings."
    )

    pdf.h1("10. What helps on your side")
    pdf.body(
        "Answer WhatsApp the same day. Ads and Google cannot fix a silent phone.\n"
        "Ask every happy guest for a Google review (the 69 reviews you already have are a real strength).\n"
        "If you send new kitchen or village photos, they can go on the site and on Maps."
    )
    pdf.note(
        "Questions? Send a voice note. Keep this PDF with the keyword research PDF. "
        "One lists the phrases. This one lists the work already live on www.taghazout-cooking-class.com."
    )

    pdf.output(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
