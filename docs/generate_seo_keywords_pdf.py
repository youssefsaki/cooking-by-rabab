#!/usr/bin/env python3
"""Client PDF — SEO keyword research for Taghazout Cooking Class."""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).with_name("Taghazout-Cooking-Class-SEO-Keywords.pdf")
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
        self.cell(120, 6, "Taghazout Cooking Class  ·  SEO keyword brief")
        self.set_xy(130, 4)
        self.cell(66, 6, "Confidential  ·  September 2026", align="R")
        self.set_y(22)

    def footer(self):
        self.set_y(-14)
        self.set_draw_color(*LINE)
        self.line(14, self.get_y(), 196, self.get_y())
        self.set_font("Arial", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 8, f"Page {self.page_no()}  ·  Prepared for Rabab  ·  Not for ads copy-paste", align="C")

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
            for i, cell in enumerate(row):
                self.cell(col_w[i], 6.4, str(cell), border=0, fill=True)
            self.ln()
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
    pdf.cell(0, 8, "SEO  ·  KEYWORD RESEARCH")
    pdf.set_text_color(*WHITE)
    pdf.set_font("Arial", "B", 28)
    pdf.set_xy(24, 56)
    pdf.multi_cell(160, 12, "What people search\nto find a cooking class\nin Taghazout")
    pdf.set_font("Arial", "", 12)
    pdf.set_xy(24, 108)
    pdf.multi_cell(
        160,
        6.5,
        "A client brief for Rabab — Taghazout Cooking Class.\n"
        "English and French keywords from Google Search Console\n"
        "plus French phrases already used by competing pages that rank.",
    )
    pdf.set_font("Arial", "", 10)
    pdf.set_xy(24, 150)
    pdf.set_text_color(210, 214, 210)
    pdf.multi_cell(
        160,
        6,
        "Prepared 13 September 2026\n"
        "Property: www.taghazout-cooking-class.com\n"
        "Languages: English + French (google.fr / French-speaking travellers)",
    )
    pdf.set_xy(24, 250)
    pdf.set_font("Arial", "B", 10)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 6, "For Rabab  ·  Internal use")

    # Page 2 — how to read + GSC
    pdf.add_page()
    pdf.h1("1. How to read this brief")
    pdf.body(
        "Google already shows who typed what to reach (or almost reach) the website. "
        "Those queries are in section 2 — they are real, not guesses. "
        "Section 3 lists French keywords competitors use to win on Google. "
        "A keyword in this PDF is a target for titles and page text. It is not a promise of page-1 ranking."
    )
    pdf.note(
        "French visitors do not type “cooking class”. They type “cours de cuisine”. "
        "Until the site has real French titles (or a /fr page), French sites with French URLs will keep ranking above Rabab."
    )

    pdf.h1("2. What Google already recorded (Search Console)")
    pdf.body(
        "These are the top queries on the live property. Clicks and impressions are low because the site is still around position 9–10. "
        "Impressions mean Google showed the site. Clicks mean someone opened it."
    )

    pdf.h2("Queries that matter")
    pdf.table(
        ["Query people typed", "Clicks", "Impressions", "Language", "Action"],
        [
            ["taghazout cooking class", "2", "11", "EN", "Keep — brand + city"],
            ["cooking class taghazout", "0", "19", "EN", "Priority — most views, 0 clicks"],
            ["cours de cuisine taghazout", "0", "9", "FR", "Priority — main French query"],
            ["expérience berbère avec cours de cuisine", "0", "8", "FR", "Priority — experience wording"],
            ["rfissa", "1", "1", "EN/FR", "Keep — dish name"],
            ["tamraght cooking class", "0", "4", "EN", "Target Tamraght"],
            ["cooking class tamraght", "0", "2", "EN", "Target Tamraght"],
            ["berber experience with cooking class", "0", "3", "EN", "Use in descriptions"],
            ["tajine taghazout", "0", "2", "EN/FR", "Keep — dish + city"],
            ["food in taghazout", "0", "1", "EN", "Low priority"],
        ],
        [72, 22, 28, 22, 38],
    )

    pdf.h2("Queries that appeared — do not target")
    pdf.table(
        ["Query", "Clicks", "Impressions", "Why we skip it"],
        [
            ["pick it cook it", "0", "1", "Another brand. Do not copy their name."],
            ["date night cooking classes", "0", "1", "Too generic — not Taghazout."],
            ["bbq class near me", "0", "1", "“Near me” is local to the searcher, not Morocco."],
        ],
        [52, 22, 28, 80],
    )
    pdf.body(
        "“pick it cook it” is someone else’s business. Ranking for their name would confuse guests and waste effort."
    )

    # Page 3 — English targets
    pdf.add_page()
    pdf.h1("3. English keywords to keep using")
    pdf.body(
        "These match how English-speaking guests search. The homepage title now leads with “Cooking Class Taghazout, Tamraght & Agadir” so the three towns sit in the same snippet."
    )
    en = [
        "cooking class taghazout",
        "taghazout cooking class",
        "cooking class tamraght",
        "tamraght cooking class",
        "cooking class agadir",
        "moroccan cooking class taghazout",
        "berber cooking class taghazout",
        "amazigh cooking class taghazout",
        "tajine taghazout",
        "rfissa taghazout",
        "couscous cooking class taghazout",
        "food in taghazout",
        "things to do in taghazout besides surfing",
        "berber experience with cooking class",
        "private cooking class taghazout",
        "cooking class near agadir",
    ]
    pdf.set_font("Arial", "", 9.5)
    pdf.set_text_color(*INK)
    for i, kw in enumerate(en, 1):
        pdf.cell(8, 5.4, f"{i}.")
        pdf.cell(0, 5.4, kw, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)

    pdf.h1("4. French keywords — primary (city + cours de cuisine)")
    pdf.body(
        "This is how French sites that already rank write their titles (Tayyu Hiking, Targant, Airbnb.fr, Amazigh Hike, Agadir Escapade, Immersi). "
        "Start here. One homepage French title can cover Taghazout, Tamraght and Agadir together."
    )
    fr_primary = [
        "cours de cuisine taghazout",
        "cours de cuisine à taghazout",
        "cours de cuisine tamraght",
        "cours de cuisine à tamraght",
        "cours de cuisine agadir",
        "cours de cuisine à agadir",
        "cours de cuisine près d'agadir",
        "cours de cuisine taghazout tamraght",
        "cours de cuisine taghazout bay",
        "atelier cuisine taghazout",
        "atelier culinaire taghazout",
        "atelier cuisine tamraght",
        "cours de cuisine marocaine authentique à tamraght",
    ]
    for i, kw in enumerate(fr_primary, 1):
        pdf.cell(8, 5.4, f"{i}.")
        pdf.cell(0, 5.4, kw, new_x="LMARGIN", new_y="NEXT")

    # Page 4
    pdf.add_page()
    pdf.h1("5. French keywords — dishes and culture")
    pdf.body(
        "French listings almost always add tajine or berbère after the city. Rabab already appeared for rfissa and tajine taghazout in Search Console."
    )
    fr_dishes = [
        "cours de cuisine tajine taghazout",
        "cours de cuisine tajine agadir",
        "apprendre à faire un tajine taghazout",
        "cours de cuisine couscous taghazout",
        "cours de cuisine marocaine taghazout",
        "cours de cuisine marocaine agadir",
        "cours de cuisine berbère taghazout",
        "cours de cuisine berbère agadir",
        "cours de cuisine amazigh taghazout",
        "tajine taghazout",
        "rfissa taghazout",
        "msemen taghazout",
        "couscous taghazout",
        "thé à la menthe taghazout",
        "pain berbère taghazout",
        "pain four à bois taghazout",
        "amlou taghazout",
    ]
    for i, kw in enumerate(fr_dishes, 1):
        pdf.cell(8, 5.4, f"{i}.")
        pdf.cell(0, 5.4, kw, new_x="LMARGIN", new_y="NEXT")

    pdf.ln(2)
    pdf.h1("6. French keywords — “what to do” (village experience)")
    pdf.body(
        "These fit Rabab’s offer: a village house above Taghazout, not a botanical garden or Argan museum. "
        "Do not target jardin botanique, musée de l’argan / Targant, or Kasbah Agadir — those are other businesses."
    )
    fr_exp = [
        "expérience berbère avec cours de cuisine",
        "expérience culinaire taghazout",
        "expérience culinaire avec cours de cuisine",
        "expérience berbère taghazout",
        "activité taghazout",
        "activité à taghazout",
        "activité taghazout hors surf",
        "que faire à taghazout",
        "que faire à tamraght",
        "visite village berbère taghazout",
        "village amazigh taghazout",
        "excursion atlas taghazout",
        "cours de cuisine village berbère",
        "atelier cuisine chez l'habitant taghazout",
    ]
    for i, kw in enumerate(fr_exp, 1):
        pdf.cell(8, 5.4, f"{i}.")
        pdf.cell(0, 5.4, kw, new_x="LMARGIN", new_y="NEXT")

    # Page 5 — recommended titles
    pdf.add_page()
    pdf.h1("7. Suggested titles for the client")
    pdf.body("These are the phrases we recommend putting in Google titles once French meta (or a /fr page) exists.")

    pdf.h2("English (already live on the website)")
    pdf.set_font("Arial", "", 9.5)
    pdf.set_text_color(*INK)
    for line in [
        "Home: Cooking Class Taghazout, Tamraght & Agadir",
        "Packages: Cooking Class Packages — Taghazout from €65",
        "Book: Book a Cooking Class near Taghazout",
        "Location: Location — Cooking Class near Taghazout, Tamraght & Agadir",
        "Experiences: Tajine, Rfissa & Bread Class in Taghazout",
    ]:
        pdf.set_x(14)
        pdf.multi_cell(182, 5.4, "-  " + line)
    pdf.ln(2)

    pdf.h2("French (not live yet — next step)")
    for line in [
        "Home: Cours de cuisine Taghazout, Tamraght et Agadir",
        "Description: Réservez un cours de cuisine marocaine près de Taghazout, Tamraght et Agadir. Tajine, couscous ou rfissa dans un village amazigh. Transfert inclus.",
        "Packages: Formules cours de cuisine à Taghazout dès 65 €",
        "Book: Réserver un cours de cuisine près de Taghazout",
        "Location: Cours de cuisine près de Taghazout, Tamraght et Agadir",
    ]:
        pdf.set_x(14)
        pdf.multi_cell(182, 5.4, "-  " + line)

    pdf.ln(3)
    pdf.h1("8. What this will not do")
    pdf.body(
        "Putting keywords in a PDF or in a hidden keywords tag does not rank the site. "
        "Google needs French text on the page (or a French URL), then weeks to recrawl. "
        "The sitemap on the live site must also work (it returned an error on 13 September 2026). "
        "Google Business Profile and listings on GetYourGuide / Viator still matter more for Maps than any keyword list."
    )
    pdf.note(
        "Next decisions for Rabab: 1) Approve French titles. 2) Fix sitemap.xml. "
        "3) Request indexing in Search Console for Home, Packages, Book, Experiences, Location. "
        "4) Review this report again after 4 weeks in Search Console → Performance → Queries + Countries (France)."
    )

    pdf.output(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
