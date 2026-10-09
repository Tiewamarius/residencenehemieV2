import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./css/Gallery.css";

/* ============================================================================
   HERO
   Image ou vidéo choisie aléatoirement à chaque chargement
============================================================================ */

const heroMedia = [
    { type: "image", src: "/img/EspaceCommun/Appart 8/3.jpg", altKey: "heroMedia.residence" },
    { type: "image", src: "/img/EspaceCommun/Appart 8/3.jpg", altKey: "heroMedia.residence" },
    { type: "image", src: "/img/EspaceCommun/Appart 8/3.jpg", altKey: "heroMedia.residence" },
];

/* ============================================================================
   APPARTEMENTS
   Les filtres (Chambre, Salon, Cuisine…) sont générés automatiquement
   à partir des captionKey de chaque appartement.
============================================================================ */

const apartments = [
    {
        id: 1,
        key: "signature",
        locationKey: "bingerville",
        images: [
            // Chambres
            { src: "/img/Gallery/Chambre (1).jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Appart3/Chambre/Chambre 2.jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Chambre (4).jpg", captionKey: "Chambre" },
            { src: "/img/BANNIERE/Bannière 5.jpg", captionKey: "Espace commun" },
            { src: "/img/Gallery/Appart3/Chambre/Chambre 3.jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Appart1/Chambre 02.jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Chambre (22).jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Chambre (18).jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Chambre (27).jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Appart1/Chambre 06.jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Chambre (28).jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Chambre (29).jpg", captionKey: "Chambre" },
        ],
    },

    {
        id: 2,
        key: "elegance",
        locationKey: "bingerville",
        images: [
            // Salon
            { src: "/img/Gallery/Appart2/Bureau.jpg", captionKey: "Salon" },
            { src: "/img/Gallery/Appart1/Salon 02.jpg", captionKey: "Salon" },
            { src: "/img/Gallery/Appart1/RN2_Salon 2.jpg", captionKey: "Salon" },
            { src: "/img/Gallery/Appart1/Salon 04.jpg", captionKey: "Salon" },
            { src: "/img/Gallery/Appart2/Salon 03.jpg", captionKey: "Salon" },
            { src: "/img/Gallery/Chambre (29).jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Appart2/Salon 02.jpg", captionKey: "Salon" },

            // Cuisine
            { src: "/img/Gallery/Appart2/Cuisine.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart2/Cuisine 02.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart2/Cuisine lavabo.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart1/Cuisine.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart1/Cuisine 03.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart1/Cuisine 04.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart1/Cuisine 05.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart1/Chauffe eau.jpg", captionKey: "Chauffe-eau" },
            { src: "/img/Gallery/Appart1/Planch_repasser.jpg", captionKey: "Planche à repasser" },

            // Salle de bain
            { src: "/img/Gallery/Appart1/Salle e bain.jpg", captionKey: "Salle de bain" },
            { src: "/img/Gallery/Appart1/Toilette.jpg", captionKey: "Salle de bain" },
            { src: "/img/Gallery/Appart1/Shattaf.jpg", captionKey: "Salle de bain" },
            { src: "/img/Gallery/Appart2/Salle de bain.jpg", captionKey: "Salle de bain" },
            { src: "/img/Gallery/Appart3/Chambre/Chambre 2.jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Appart2/Salle bain.jpg", captionKey: "Salle de bain" },

            // Balcon
            { src: "/img/Gallery/Appart2/Balcon.jpg", captionKey: "Balcon" },

            // Espace commun
            { src: "/img/BANNIERE/Bannière 3.jpg", captionKey: "Espace commun" },
            { src: "/img/BANNIERE/Bannière 4.jpg", captionKey: "Espace commun" },
        ],
    },

    {
        id: 3,
        key: "prestige",
        locationKey: "bingerville",
        images: [
            // Salon
            { src: "/img/Gallery/Appart3/Salon/SALON.jpg", captionKey: "SALON" },
            { src: "/img/Gallery/Appart3/Chambre/2Ch-Salon (2).jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Appart3/Salon/SALON 1.jpg", captionKey: "SALON" },
            { src: "/img/Gallery/Appart3/Salon/SALON 2.jpg", captionKey: "SALON" },
            { src: "/img/Gallery/Appart3/Salon/SALON 3.jpg", captionKey: "SALON" },
            { src: "/img/Gallery/Appart3/Salon/SALON 4.jpg", captionKey: "SALON" },
            { src: "/img/Gallery/Appart3/Salon/SALON 6.jpg", captionKey: "SALON" },

            // Chambres
            { src: "/img/Gallery/Appart3/Chambre/Chambre 3.jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Appart3/Chambre/Chambre 1.jpg", captionKey: "Chambre" },
            { src: "/img/Gallery/Appart3/Chambre/Chambre 5.jpg", captionKey: "Chambre" },

            // Cuisine
            { src: "/img/Gallery/Appart3/Cuisine/CUISINE.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart3/Cuisine/CUISINE 3.jpg", captionKey: "Cuisine" },
            { src: "/img/Gallery/Appart3/Cuisine/CUISINE 5.jpg", captionKey: "Cuisine" },

            // Salle de bain
            { src: "/img/Gallery/Appart3/Salle de bain/Salle_bain.jpg", captionKey: "Salle de bain" },
            { src: "/img/Gallery/Appart2/Salon 03.jpg", captionKey: "Salon" },
            { src: "/img/Gallery/Appart3/Salle de bain/Salle de bain 1.jpg", captionKey: "Salle de bain" },
            { src: "/img/Gallery/Appart3/Salle de bain/Salle de bain.jpg", captionKey: "Salle de bain" },

            // Espace commun
            { src: "/img/BANNIERE/Bannière 3.jpg", captionKey: "Espace commun" },
            { src: "/img/BANNIERE/Bannière 4.jpg", captionKey: "Espace commun" },
        ],
    },
];

/* ============================================================================
   OUTILS
============================================================================ */

/** Clé de traduction du nom de l'appartement */
const nameKey = (apartment) => `appart.items.${apartment.key}.name`;

/** Regroupement insensible à la casse ("SALON" et "Salon" = même filtre) */
const groupOf = (captionKey) => captionKey.trim().toLowerCase();

/** "SALON" -> "Salon" (les autres libellés restent inchangés) */
const formatLabel = (label) =>
    label === label.toUpperCase() && label.length > 1
        ? label.charAt(0) + label.slice(1).toLowerCase()
        : label;

/** Appartement initial depuis ?apartment= */
const getInitialApartment = () => {
    if (typeof window === "undefined") return "signature";

    const params = new URLSearchParams(window.location.search);
    const apartmentKey = params.get("apartment");

    return apartments.some((item) => item.key === apartmentKey)
        ? apartmentKey
        : "signature";
};

/* ============================================================================
   COMPOSANT
============================================================================ */

export default function Gallery() {
    const { t } = useTranslation();

    const [activeApartment, setActiveApartment] = useState(getInitialApartment);
    const [activeFilter, setActiveFilter] = useState("all");
    const [lightboxIndex, setLightboxIndex] = useState(null); // index dans `visible`
    const [heroMediaItem, setHeroMediaItem] = useState(null);

    /* ------------------------------------------------------------------------
       APPARTEMENT ACTIF + PHOTOS + FILTRES
    ------------------------------------------------------------------------ */

    const apartment =
        apartments.find((item) => item.key === activeApartment) || apartments[0];

    const apartmentTitle = t(nameKey(apartment));
    const apartmentLocation = t(`gallery.locations.${apartment.locationKey}`);

    const items = useMemo(
        () =>
            apartment.images.map((image, index) => ({
                ...image,
                id: `${image.src}-${index}`,
                group: groupOf(image.captionKey),
            })),
        [apartment]
    );

    const filters = useMemo(() => {
        const seen = new Map();
        items.forEach((item) => {
            if (!seen.has(item.group)) seen.set(item.group, item.captionKey);
        });
        return [...seen].map(([group, captionKey]) => ({ group, captionKey }));
    }, [items]);

    const visible = useMemo(
        () =>
            activeFilter === "all"
                ? items
                : items.filter((item) => item.group === activeFilter),
        [items, activeFilter]
    );

    const current = lightboxIndex !== null ? visible[lightboxIndex] : null;

    /* =========================================================================
       HERO ALÉATOIRE
    ========================================================================= */

    useEffect(() => {
        setHeroMediaItem(heroMedia[Math.floor(Math.random() * heroMedia.length)]);
    }, []);

    /* =========================================================================
       LIGHTBOX : NAVIGATION
    ========================================================================= */

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    const showPrevious = useCallback(
        () =>
            setLightboxIndex((i) =>
                i === null ? null : i <= 0 ? visible.length - 1 : i - 1
            ),
        [visible.length]
    );

    const showNext = useCallback(
        () =>
            setLightboxIndex((i) =>
                i === null ? null : i >= visible.length - 1 ? 0 : i + 1
            ),
        [visible.length]
    );

    /* Clavier : Échap / ← / → */
    useEffect(() => {
        if (lightboxIndex === null) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeLightbox();
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPrevious();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                showNext();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightboxIndex, closeLightbox, showPrevious, showNext]);

    /* =========================================================================
       ACTIONS
    ========================================================================= */

    const changeApartment = (apartmentKey) => {
        setActiveApartment(apartmentKey);
        setActiveFilter("all");
        setLightboxIndex(null);

        const url = new URL(window.location.href);
        url.searchParams.set("apartment", apartmentKey);
        window.history.replaceState({}, "", url);
    };

    const changeFilter = (group) => {
        setActiveFilter(group);
        setLightboxIndex(null);
    };

    /* =========================================================================
       RENDER
    ========================================================================= */

    return (
        <main className="gallery-page">
            {/* =================================================================
                HERO
            ================================================================= */}

            <section className="gallery-hero">
                {heroMediaItem?.type === "video" && (
                    <video
                        className="gallery-hero__media"
                        src={heroMediaItem.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden="true"
                    />
                )}

                {heroMediaItem?.type === "image" && (
                    <img
                        className="gallery-hero__media"
                        src={heroMediaItem.src}
                        alt={t(`gallery.${heroMediaItem.altKey}`)}
                    />
                )}

                <div className="gallery-hero__overlay" aria-hidden="true" />

                <div className="gallery-hero__content">
                    <span className="gallery-hero__subtitle">
                        {t("gallery.hero.subtitle")}
                    </span>

                    <h1>{t("gallery.hero.title")}</h1>

                    <p>{t("gallery.hero.description")}</p>
                </div>
            </section>

            {/* =================================================================
                GALERIE
            ================================================================= */}

            <section className="gallery-section">
                <div className="gallery-container">
                    {/* TITRE + RÉSERVATION */}
                    <div className="gallery-heading">
                        <div>
                            <h2>{apartmentTitle}</h2>
                        </div>

                        {/* <Link href="/reservation" className="gallery-reservation-btn">
                            {t("gallery.book")}
                        </Link> */}
                    </div>

                    {/* ONGLETS APPARTEMENTS */}
                    <div className="gallery-tabs-wrapper">
                        <div
                            className="gallery-tabs"
                            role="tablist"
                            aria-label={t("gallery.chooseApartment")}
                        >
                            {apartments.map((item) => {
                                const isActive = activeApartment === item.key;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        className={isActive ? "gallery-tab active" : "gallery-tab"}
                                        onClick={() => changeApartment(item.key)}
                                    >
                                        {t(nameKey(item))}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* FILTRES PAR PIÈCE */}
                    {filters.length > 1 && (
                        <div
                            className="gallery-filters"
                            role="group"
                            aria-label={t("gallery.filterLabel", { defaultValue: "Filtrer les photos" })}
                        >
                            {[{ group: "all" }, ...filters].map((filter) => {
                                const isActive = activeFilter === filter.group;

                                return (
                                    <button
                                        key={filter.group}
                                        type="button"
                                        aria-pressed={isActive}
                                        className={isActive ? "gallery-filter active" : "gallery-filter"}
                                        onClick={() => changeFilter(filter.group)}
                                    >
                                        {filter.group === "all"
                                            ? t("gallery.filters.all", { defaultValue: "Tout" })
                                            : formatLabel(t(filter.captionKey))}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* INFORMATIONS */}
                    <div className="gallery-location">
                        <span>{apartmentLocation}</span>

                        <span className="gallery-photo-count">
                            {visible.length} {t("gallery.photos")}
                        </span>
                    </div>

                    {/* GRILLE PHOTOS (masonry) : seulement le titre de l'image */}
                    <div className="gallery-grid">
                        {visible.map((image, index) => {
                            const caption = formatLabel(t(image.captionKey));

                            return (
                                <article className="gallery-card" key={image.id}>
                                    <button
                                        type="button"
                                        className="gallery-image-button"
                                        onClick={() => setLightboxIndex(index)}
                                        aria-label={t("gallery.viewPhoto", { caption })}
                                    >
                                        <img src={image.src} alt={caption} loading="lazy" />

                                        <div className="gallery-card__overlay">
                                            <div className="gallery-card__caption">
                                                <span className="gallery-card__line" />
                                                <p>{caption}</p>
                                            </div>
                                        </div>
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =================================================================
                LIGHTBOX
            ================================================================= */}

            {current && (
                <div
                    className="gallery-lightbox"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={t("gallery.lightbox.preview")}
                >
                    <button
                        type="button"
                        className="gallery-lightbox__close"
                        onClick={closeLightbox}
                        aria-label={t("gallery.lightbox.close")}
                    >
                        ×
                    </button>

                    <button
                        type="button"
                        className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                        onClick={(event) => {
                            event.stopPropagation();
                            showPrevious();
                        }}
                        aria-label={t("gallery.lightbox.previous", { defaultValue: "Photo précédente" })}
                    >
                        ‹
                    </button>

                    <img
                        src={current.src}
                        alt={formatLabel(t(current.captionKey))}
                        className="gallery-lightbox__image"
                        onClick={(event) => event.stopPropagation()}
                    />

                    <button
                        type="button"
                        className="gallery-lightbox__nav gallery-lightbox__nav--next"
                        onClick={(event) => {
                            event.stopPropagation();
                            showNext();
                        }}
                        aria-label={t("gallery.lightbox.next", { defaultValue: "Photo suivante" })}
                    >
                        ›
                    </button>

                    <div
                        className="gallery-lightbox__caption"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <span>{apartmentTitle}</span>
                        <h3>{formatLabel(t(current.captionKey))}</h3>
                    </div>
                </div>
            )}
        </main>
    );
}