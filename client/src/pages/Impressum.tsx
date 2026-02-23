import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Impressum() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="px-4 sm:px-6 md:px-12 py-4 sm:py-5 flex items-center justify-between border-b border-border">
        <div
          className="text-foreground/80 font-semibold tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          CXO Parents
        </div>
        <div className="flex items-center gap-6">
          <div className="lang-toggle">
            <button onClick={() => language !== "de" && toggleLanguage()} className={language === "de" ? "active" : ""}>DE</button>
            <span className="lang-toggle-divider" />
            <button onClick={() => language !== "en" && toggleLanguage()} className={language === "en" ? "active" : ""}>EN</button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-foreground/45 hover:text-foreground transition-colors duration-200 mb-8 sm:mb-12" style={{ fontFamily: "'Inter', sans-serif" }}>
          <ArrowLeft className="w-4 h-4" />
          {language === "de" ? "Zurück zur Startseite" : "Back to home"}
        </Link>

        <h1 className="mb-6 sm:mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
          Impressum
        </h1>

        <div className="space-y-8 sm:space-y-10 text-sm text-foreground/70 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>

          <section>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground/35 mb-3">
              {language === "de" ? "Angaben gemäß § 5 DDG" : "Information pursuant to § 5 DDG"}
            </p>
            <p className="text-foreground/80 font-medium">Daniel Schneider</p>
            <p>Benedicta-Spiegelstraße 50</p>
            <p>85072 Eichstätt</p>
            <p>Deutschland</p>
          </section>

          <div className="section-divider" />

          <section>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground/35 mb-3">
              Kontakt
            </p>
            <p>
              E-Mail:{" "}
              <a
                href="mailto:hello@cxoparents.com"
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 underline underline-offset-2"
              >
                hello@cxoparents.com
              </a>
            </p>
          </section>

          <div className="section-divider" />

          <section>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground/35 mb-3">
              {language === "de" ? "Verantwortlich für den Inhalt" : "Responsible for content"}
            </p>
            <p>
              {language === "de"
                ? "Daniel Schneider, Benedicta-Spiegelstraße 50, 85072 Eichstätt"
                : "Daniel Schneider, Benedicta-Spiegelstraße 50, 85072 Eichstätt, Germany"}
            </p>
          </section>

          <div className="section-divider" />

          <section>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground/35 mb-3">
              {language === "de" ? "Haftungsausschluss" : "Disclaimer"}
            </p>
            <p className="mb-4">
              {language === "de"
                ? "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen."
                : "The contents of this website have been compiled with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content."}
            </p>
            <p>
              {language === "de"
                ? "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen."
                : "As a service provider, we are responsible for our own content on these pages in accordance with § 7 para. 1 DDG. According to §§ 8 to 10 DDG, however, we are not obligated to monitor transmitted or stored third-party information."}
            </p>
          </section>

          <div className="section-divider" />

          <section>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground/35 mb-3">
              {language === "de" ? "Urheberrecht" : "Copyright"}
            </p>
            <p>
              {language === "de"
                ? "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers."
                : "The content and works created by the site operator on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator."}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
