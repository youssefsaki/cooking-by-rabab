#!/usr/bin/env python3
"""Invoice PDF — Taghazout Cooking Class marketing launch."""

from pathlib import Path

from fpdf import FPDF
from fpdf.enums import XPos, YPos

OUT = Path(__file__).with_name("INV-TCC-MKT-001.pdf")

ACCENT = (199, 93, 58)
INK = (45, 42, 38)
MUTED = (107, 101, 96)
LINE = (230, 224, 214)
GREEN = (45, 74, 62)


class Invoice(FPDF):
    def header(self):
        self.set_fill_color(*GREEN)
        self.rect(0, 0, 210, 26, "F")
        self.set_fill_color(*ACCENT)
        self.rect(0, 26, 210, 2.2, "F")
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 15)
        self.set_xy(16, 7)
        self.cell(90, 8, "INVOICE  /  FACTURE")
        self.set_font("Helvetica", "B", 11)
        self.set_xy(120, 7)
        self.cell(74, 8, "INV-TCC-MKT-001", align="R")
        self.set_font("Helvetica", "", 9)
        self.set_xy(16, 15)
        self.cell(90, 6, "Marketing  |  Taghazout Cooking Class")
        self.set_xy(120, 15)
        self.cell(74, 6, "20 August 2026", align="R")
        self.set_y(36)

    def footer(self):
        self.set_y(-16)
        self.set_draw_color(*LINE)
        self.line(16, self.get_y(), 194, self.get_y())
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.cell(
            0,
            5,
            "Marketing services only  |  Website development is not included  |  INV-TCC-MKT-001",
            align="C",
        )


def mad(n: int) -> str:
    return f"{n:,} MAD".replace(",", " ")


def heading(pdf: FPDF, text: str) -> None:
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 7, text.upper(), new_x=XPos.LMARGIN, new_y=YPos.NEXT)


def p(pdf: FPDF, text: str, *, bold=False, size=10, color=INK, h=5) -> None:
    pdf.set_font("Helvetica", "B" if bold else "", size)
    pdf.set_text_color(*color)
    pdf.multi_cell(178, h, text)
    pdf.set_x(16)


def main() -> None:
    pdf = Invoice(format="A4")
    pdf.set_top_margin(36)
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.set_left_margin(16)
    pdf.set_right_margin(16)
    pdf.add_page()

    heading(pdf, "From  /  Prestataire")
    p(pdf, "Youssef Saki", bold=True, size=11)
    p(pdf, "Web & marketing    igtbrasaic@gmail.com", size=9, color=MUTED)

    pdf.ln(2)
    heading(pdf, "Bill to  /  Client")
    p(pdf, "Rabab Ouhadda  -  Taghazout Cooking Class (Cooking by Rabab)", bold=True, size=11)
    p(
        pdf,
        "Taghazout, Morocco    rababouhadda5@gmail.com    +212 726 671 746\n"
        "www.taghazout-cooking-class.com",
        size=9,
        color=MUTED,
    )

    pdf.ln(3)
    pdf.set_fill_color(*LINE)
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(59, 9, "  Period: 20 Aug - 19 Sep 2026", fill=True)
    pdf.cell(59, 9, "Due: see payment plan below", fill=True)
    pdf.cell(60, 9, "Currency: MAD", fill=True, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.ln(4)
    heading(pdf, "Services  /  Prestations")

    pdf.set_fill_color(*GREEN)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 8)
    pdf.cell(24, 8, "  #", fill=True)
    pdf.cell(110, 8, "Description", fill=True)
    pdf.cell(44, 8, "Amount", fill=True, align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    items = [
        (
            "01",
            "Marketing setup (one-time)",
            [
                "Google Analytics 4  -  visits and countries",
                "Google Search Console  -  words people type in Google",
                "Conversion tracking  -  bookings and WhatsApp clicks",
                "Google Ads account structure  -  ready for the 30-day test",
            ],
            2000,
        ),
        (
            "02",
            "Month 1  -  SEO and Google Ads management",
            [
                "SEO: keep #1 for Taghazout cooking class; improve French, Agadir and Tamraght",
                "Ads management: about 70% people already in Taghazout / Agadir;",
                "about 20% France / UK / Germany / Netherlands only if they search Taghazout or Agadir;",
                "about 10% the business name. No generic cooking-class ads across Europe.",
                "Reports after 14 days and at day 30 (spend, WhatsApp, bookings).",
                "Payment: 40% advance to start, 60% when the month is finished.",
            ],
            4000,
        ),
    ]

    for num, title, bullets, amount in items:
        pdf.set_text_color(*INK)
        pdf.set_font("Helvetica", "B", 10)
        pdf.cell(24, 8, "  " + num)
        pdf.cell(110, 8, title)
        pdf.cell(44, 8, mad(amount), align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(*MUTED)
        for b in bullets:
            pdf.set_x(40)
            pdf.multi_cell(150, 4, "-  " + b)
        pdf.ln(1)
        pdf.set_draw_color(*LINE)
        y = pdf.get_y()
        pdf.line(16, y, 194, y)
        pdf.ln(3)

    pdf.set_x(100)
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(50, 7, "Setup", align="R")
    pdf.cell(44, 7, mad(2000), align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_x(100)
    pdf.cell(50, 7, "Month 1 retainer", align="R")
    pdf.cell(44, 7, mad(4000), align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_fill_color(*ACCENT)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_x(100)
    pdf.cell(50, 10, "  TOTAL", fill=True)
    pdf.cell(44, 10, mad(6000) + "  ", fill=True, align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.ln(4)
    heading(pdf, "Not included  /  Non inclus")
    p(
        pdf,
        "Google Ads media budget is paid by you directly to Google (suggested 3 000 to 5 000 MAD "
        "for the first month). It is not part of this invoice.\n"
        "Website development already delivered is not part of this invoice.",
        size=9,
        color=MUTED,
        h=4.5,
    )

    pdf.ln(2)
    heading(pdf, "Week plan included in month 1")
    p(
        pdf,
        "Week 1  -  Analytics, Search Console, measure Book + WhatsApp. No ads yet.\n"
        "Week 2  -  SEO (French, Agadir, Tamraght) and Google reviews.\n"
        "Week 3  -  Small ads test (Morocco first; Europe only with place names).\n"
        "Week 4  -  Report: spend, visits, WhatsApp, bookings. Pause any geo that costs too much.",
        size=9,
        color=MUTED,
        h=4.5,
    )

    pdf.ln(2)
    heading(pdf, "Payment  /  Paiement")
    p(
        pdf,
        "For month 1 (4 000 MAD): 40% advance now (1 600 MAD) to start the work. "
        "The remaining 60% (2 400 MAD) is paid when the month is finished. "
        "Setup (2 000 MAD) is paid at the start.",
        size=9,
        color=MUTED,
        h=4.5,
    )

    pdf.output(str(OUT))
    print(OUT)


if __name__ == "__main__":
    main()
