#!/usr/bin/env python3
"""Client PDF — SEO work completed for Taghazout Cooking Class."""

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
        self.cell(120, 6, "Taghazout Cooking Class  ·  SEO work completed")
        self.set_xy(130, 4)
        self.cell(66, 6, "Confidential  ·  September 2026", align="R")
        self.set_y(22)

    def footer(self):
        self.set_y(-14)
        self.set_draw_color(*LINE)
        self.line(14, self.get_y(), 196, self.get_y())
        self.set_font("Arial", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 8, f"Page {self.page_no()}  ·  Prepared for Rabab  ·  Website work report", align="C")

    def h1(self, text):
        self.set_font("Arial", "B", 15)
        self.set_text_color(*GREEN)
        self.multi_cell(0, 8, text)
        self.ln(2)

    def h2(self, text):
        self.ln(2)
        self.set_font("Arial", "B", 11)
        self.set_text_color(*ACCENT)
        self.cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body(self, text):
        self.set_font("Arial", "", 9.5)
        self.set_text_color(*INK)
        self.multi_cell(0, 5.2, text)
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
            heights = []
            x0 = self.get_x()
            y0 = self.get_y()
            for i, cell in enumerate(row):
                # Single-line cells — wrap long titles
                if col_w[i] >= 70:
                    self.set_xy(x0 + sum(col_w[:i]), y0)
                    self.multi_cell(col_w[i], 5.2, str(cell), border=0, fill=True)
                    heights.append(self.get_y() - y0)
                    self.set_xy(x0 + sum(col_w[: i + 1]), y0)
                else:
                    self.cell(col_w[i], 10.4, str(cell), border=0, fill=True)
            self.ln(max(heights) if heights else 10.4)
        self.ln(3)


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
    pdf.cell(0, 8, "SEO  ·  WORK COMPLETED")
    pdf.set_text_color(*WHITE)
    pdf.set_font("Arial", "B", 28)
    pdf.set_xy(24, 56)
    pdf.multi_cell(160, 12, "What we built on\nthe website so Google\ncan find you better")
    pdf.set_font("Arial", "", 12)
    pdf.set_xy(24, 112)
    pdf.multi_cell(
        160,
        6.5,
        "A short report for Rabab — Taghazout Cooking Class.\n"
        "English and French pages, search titles, sitemap, and tracking.\n"
        "Written in plain language. No ads copy-paste.",
    )
    pdf.set_font("Arial", "", 10)
    pdf.set_xy(24, 154)
    pdf.set_text_color(210, 214, 210)
    pdf.multi_cell(
        160,
        6,
        "Prepared 13 September 2026\n"
        "Website: www.taghazout-cooking-class.com\n"
        "Languages now: English (/) and French (/fr)",
    )
    pdf.set_xy(24, 250)
    pdf.set_font("Arial", "B", 10)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 6, "For Rabab  ·  Internal use")

    # Page 2 — what is live
    pdf.add_page()
    pdf.h1("1. In one sentence")
    pdf.body(
        "Guests can now book in English or French, and Google has two real pages: "
        "an English page and a French /fr page, each with its own title and description. "
        "We also fixed the sitemap so Google can crawl the site, and we connected bookings to Google Analytics."
    )
    pdf.note(
        "This report is about work on the website. It is not a promise of page-1 ranking. "
        "Google still needs days or weeks to recrawl. You still need to request indexing in Search Console."
    )

    pdf.h1("2. What is live on the website today")
    pdf.h2("French pages")
    pdf.body(
        "The language switch now opens real French URLs. French searchers can get a French title and description. "
        "Before, English and French shared one URL, so Google almost always showed English."
    )
    pdf.table(
        ["Page", "English URL", "French URL"],
        [
            ["Home", "/", "/fr"],
            ["Packages", "/packages", "/fr/packages"],
            ["Book", "/book", "/fr/book"],
            ["Experiences", "/experiences", "/fr/experiences"],
            ["Location", "/ourstory/location", "/fr/ourstory/location"],
            ["Events", "/events", "/fr/events"],
            ["FAQ", "/faq-contact", "/fr/faq-contact"],
        ],
        [42, 62, 78],
    )

    pdf.h2("Search titles Google should use")
    pdf.body("These titles are already on the live pages. Google may still show the old ones until it recrawls.")
    pdf.table(
        ["Page", "English title", "French title"],
        [
            ["Home", "Cooking Class Taghazout, Tamraght & Agadir", "Cours de cuisine Taghazout, Tamraght et Agadir"],
            ["Packages", "Cooking Class Packages — Taghazout from €65", "Formules cours de cuisine à Taghazout dès 65 €"],
            ["Book", "Book a Cooking Class near Taghazout", "Réserver un cours de cuisine près de Taghazout"],
            ["Location", "Location — Cooking Class near Taghazout, Tamraght & Agadir", "Cours de cuisine près de Taghazout, Tamraght et Agadir"],
            ["Experiences", "Tajine, Rfissa & Bread Class in Taghazout", "Cours tajine, rfissa et pain à Taghazout"],
        ],
        [32, 75, 75],
    )

    # Page 3 — more work
    pdf.add_page()
    pdf.h1("3. Other website work (already live)")

    items = [
        (
            "Sitemap fixed",
            "Google’s map of the site (sitemap.xml) was broken and returned an error. "
            "It now works and lists both English and French pages.",
        ),
        (
            "Three towns in the title",
            "Home and location titles name Taghazout, Tamraght, and Agadir together, "
            "so people searching any of those towns can see you.",
        ),
        (
            "Share images (Open Graph)",
            "Each main page now has its own photo when someone shares the link on WhatsApp, Instagram, or Facebook.",
        ),
        (
            "Saturday event marked for Google",
            "The weekly Amazigh music evening (Saturday, 15:00–19:30, 80 €) is described in a format Google can read.",
        ),
        (
            "Packages marked for Google",
            "The four offers (from 65 €, weekly event, private, Rabab at your villa) are described so Google can understand prices.",
        ),
        (
            "Breadcrumb trail",
            "Inner pages tell Google the path (Home → Packages, and so on). This can show as a small trail under the search result.",
        ),
        (
            "Language tags (hreflang)",
            "Each page tells Google: English lives here, French lives on /fr. That is how French descriptions can appear for French searches.",
        ),
        (
            "Honest review markup",
            "We removed a fake “500 reviews” mark that was only in the hidden code. The site still shows 69 Google reviews on the page. "
            "Fake review numbers can get a site penalised.",
        ),
        (
            "Google Analytics on bookings",
            "When someone finishes a booking, the website can send that booking to Google Analytics (GA4), so you can see which visits turn into guests.",
        ),
        (
            "Search Console",
            "The site is connected to Google Search Console so we can see the real words people type.",
        ),
    ]
    for title, text in items:
        pdf.set_font("Arial", "B", 9.5)
        pdf.set_text_color(*GREEN)
        pdf.cell(0, 5.5, title, new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Arial", "", 9)
        pdf.set_text_color(*INK)
        pdf.multi_cell(0, 5, text)
        pdf.ln(1.5)

    # Page 4 — keywords + your action
    pdf.add_page()
    pdf.h1("4. Keywords from the research PDF")
    pdf.body(
        "The separate file Taghazout-Cooking-Class-SEO-Keywords.pdf lists the English and French phrases people type. "
        "Those phrases are now written into the website code: English phrases on English pages, French phrases on /fr pages."
    )
    pdf.note(
        "Putting keywords in a hidden list does not rank the site by itself. "
        "Google ranks from the title, the description, and the text guests can read. "
        "The keyword list is ready on the computer. It goes live with the next website publish."
    )

    pdf.h2("English phrases included")
    pdf.body(
        "cooking class taghazout · taghazout cooking class · cooking class tamraght · tamraght cooking class · "
        "cooking class agadir · cooking class near agadir · moroccan / berber / amazigh cooking class taghazout · "
        "tajine taghazout · rfissa taghazout · couscous cooking class taghazout · food in taghazout · "
        "things to do in taghazout besides surfing · berber experience with cooking class · private cooking class taghazout."
    )

    pdf.h2("French phrases included")
    pdf.body(
        "cours de cuisine taghazout / tamraght / agadir · atelier cuisine · cours de cuisine marocaine / berbère / amazigh · "
        "tajine, rfissa, msemen, couscous, amlou, pain berbère · expérience berbère avec cours de cuisine · "
        "activité taghazout hors surf · que faire à taghazout / tamraght · visite village berbère · excursion atlas."
    )
    pdf.body(
        "We did not add “pick it cook it”, “date night cooking classes”, or “bbq class near me”. "
        "Those are another brand or searches that are not about Taghazout."
    )

    pdf.h1("5. What you need to do (5 minutes)")
    pdf.body(
        "Open Google Search Console. For each URL below, paste it and click Request indexing. "
        "This asks Google to recrawl sooner. It does not guarantee a new snippet the same day."
    )
    pdf.set_font("Arial", "", 9)
    pdf.set_text_color(*INK)
    for url in [
        "https://www.taghazout-cooking-class.com/",
        "https://www.taghazout-cooking-class.com/fr",
        "https://www.taghazout-cooking-class.com/packages",
        "https://www.taghazout-cooking-class.com/fr/packages",
        "https://www.taghazout-cooking-class.com/book",
        "https://www.taghazout-cooking-class.com/fr/book",
        "https://www.taghazout-cooking-class.com/experiences",
        "https://www.taghazout-cooking-class.com/fr/experiences",
        "https://www.taghazout-cooking-class.com/ourstory/location",
        "https://www.taghazout-cooking-class.com/fr/ourstory/location",
    ]:
        pdf.cell(8, 5.2, "·")
        pdf.cell(0, 5.2, url, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)
    pdf.body(
        "Also add this sitemap if it is not already in Search Console: "
        "https://www.taghazout-cooking-class.com/sitemap.xml"
    )

    # Page 5 — what this will not do
    pdf.add_page()
    pdf.h1("6. What this work will not do")
    pdf.body(
        "It will not put you on page 1 overnight. French results will keep showing older English snippets "
        "until Google recrawls /fr. Bigger sites with years of French pages can still sit above you."
    )
    pdf.body(
        "It does not replace Google Business Profile (Maps), reviews, or WhatsApp reply speed. "
        "Those still bring guests who search “near me” or browse the map."
    )
    pdf.body(
        "It is not Google Ads. Ads are rent. This work is the shop you own. "
        "We should not turn on ads until Search Console and Analytics show the new pages being crawled."
    )

    pdf.h1("7. How to check in 4 weeks")
    pdf.body(
        "In Search Console → Performance: look at Queries and Countries. "
        "We want more impressions for “cooking class taghazout”, “cooking class tamraght”, "
        "“cours de cuisine taghazout”, and “expérience berbère avec cours de cuisine”, "
        "and a few clicks from France or French-language searches."
    )
    pdf.note(
        "If you have questions, reply with a voice note. The keyword research PDF is a sister document — "
        "it lists the phrases. This PDF lists the work already done on the site."
    )

    pdf.output(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
