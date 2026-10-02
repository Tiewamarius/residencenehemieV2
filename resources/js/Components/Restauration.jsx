import { Head, Link } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Header from "../Components/Header"; // ajuste le chemin si besoin
import "./css/Restauration.css";

const SLIDES = [
    {
        image: "./img/Gallery/Restauration/img1.jpeg",
        title: "La table de la Résidence Néhémie",
        text: "Une cuisine préparée sur place, à savourer en toute simplicité.",
    },
    {
        image: "./img/Gallery/Restauration/img1.jpeg",
        title: "Des saveurs d'ici et d'ailleurs",
        text: "Plats ivoiriens, grillades et recettes du monde.",
    },
    {
        image: "./img/Gallery/Restauration/img1.jpeg",
        title: "Un repas, où vous le souhaitez",
        text: "En salle, en terrasse ou directement dans votre appartement.",
    },
];

const OFFERS = [
    {
        title: "Petit-déjeuner",
        text: "Pain frais, viennoiseries, fruits de saison, œufs au choix, café et jus pressés pour bien démarrer la journée.",
    },
    {
        title: "Déjeuner et dîner",
        text: "Une carte courte qui change régulièrement : poissons et viandes grillés, attiéké, alloco, riz sauce et plats du jour.",
    },
    {
        title: "Service en appartement",
        text: "Commandez à la réception ou sur WhatsApp, nous vous apportons votre repas chez vous.",
    },
];

const HOURS = [
    { label: "Petit-déjeuner", time: "07h00 – 10h30" },
    { label: "Déjeuner", time: "12h00 – 15h00" },
    { label: "Dîner", time: "18h30 – 22h30" },
];

const AUTOPLAY_MS = 6000;

export default function Restauration() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((index) => {
        setCurrent((index + SLIDES.length) % SLIDES.length);
    }, []);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (paused || reduced) return;

        const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [paused]);

    return (
        <>
            <Head title="Restauration - Résidence Néhémie" />
            <Header />

            <main className="resto-page">
                {/* Hero slider (le header transparent se superpose) */}
                <section
                    className="resto-hero"
                    aria-roledescription="carrousel"
                    aria-label="Notre restauration"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                >
                    {SLIDES.map((slide, i) => (
                        <div
                            key={slide.title}
                            className={`resto-slide ${i === current ? "active" : ""}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                            aria-hidden={i !== current}
                        >
                            <div className="resto-slide-content">
                                <h1 className="resto-slide-title">{slide.title}</h1>
                                <p>{slide.text}</p>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="resto-arrow prev"
                        aria-label="Diapositive précédente"
                        onClick={() => goTo(current - 1)}
                    >
                        <FaChevronLeft aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className="resto-arrow next"
                        aria-label="Diapositive suivante"
                        onClick={() => goTo(current + 1)}
                    >
                        <FaChevronRight aria-hidden="true" />
                    </button>

                    <div className="resto-dots">
                        {SLIDES.map((slide, i) => (
                            <button
                                key={slide.title}
                                type="button"
                                className={i === current ? "active" : ""}
                                aria-label={`Aller à la diapositive ${i + 1}`}
                                aria-current={i === current}
                                onClick={() => goTo(i)}
                            />
                        ))}
                    </div>
                </section>

                {/* Introduction */}
                <section className="resto-section resto-intro">
                    <h2>Manger bien, sans quitter la résidence</h2>
                    <p>
                        À la Résidence Néhémie, la restauration fait partie du séjour. Nos cuisiniers
                        travaillent des produits frais et locaux pour vous proposer des repas
                        simples, généreux et préparés à la commande, que vous soyez en voyage
                        d'affaires, en famille ou entre amis.
                    </p>
                </section>

                {/* Offres */}
                <section className="resto-section resto-offers">
                    {OFFERS.map((offer) => (
                        <article key={offer.title} className="resto-offer">
                            <h3>{offer.title}</h3>
                            <p>{offer.text}</p>
                        </article>
                    ))}
                </section>

                {/* Horaires + contact */}
                <section className="resto-section resto-hours">
                    <div>
                        <h2>Horaires de service</h2>
                        <dl>
                            {HOURS.map((h) => (
                                <div key={h.label} className="resto-hours-row">
                                    <dt>{h.label}</dt>
                                    <dd>{h.time}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="resto-cta">
                        <h2>Une envie, une question ?</h2>
                        <p>
                            Régimes particuliers, repas de groupe, anniversaire : prévenez-nous à
                            l'avance et nous nous occupons du reste.
                        </p>
                        <div className="resto-cta-actions">
                            <a
                                href="https://wa.me/+2250500326868"
                                className="resto-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Écrire sur WhatsApp
                            </a>
                            <Link href="/reservation" className="resto-btn outline">
                                Réserver un appartement
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}