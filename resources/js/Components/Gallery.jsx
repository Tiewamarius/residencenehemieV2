
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./css/Gallery.css";

/* ---------------------------------------------------------------------------
   HERO
   Image OU vidéo, choisie aléatoirement à chaque chargement
--------------------------------------------------------------------------- */

const heroMedia = [
    {
        type: "image",
        src: "/img/Hero-gallery/RN8_Salon.jpg",
        altKey: "heroMedia.residence",
    },
    {
        type: "image",
        src: "/img/Hero-gallery/RN8_Salon.jpg",
        altKey: "heroMedia.apartment",
    },
    {
        type: "image",
        src: "/img/Hero-gallery/RN8_Salon.jpg",
        altKey: "heroMedia.outdoor",
    },
    {
        type: "video",
        src: "/videos/gallery-hero/hero-1.mp4",
    },
    {
        type: "video",
        src: "/videos/gallery-hero/hero-2.mp4",
    },
];

const apartments = [
    {
        id: 1,
        key: "signature",
        locationKey: "bingerville",

        images: [
            {
                src: "/img/Gallery/Appart1/RN2_Salon 2.jpg",
                captionKey: "livingRoom",
            },
            {
                src: "/img/Gallery/Appart1/RN2_Chambre.jpg",
                captionKey: "masterBedroom",
            },
            {
                src: "/img/Gallery/Appart1/RN2_Terrasse.jpg",
                captionKey: "terrace",
            },
        ],
    },

    {
        id: 2,
        key: "elegance",
        locationKey: "bingerville",

        images: [
            {
                src: "/img/Gallery/Appart2/RN4-Salon.jpg",
                captionKey: "modernLivingRoom",
            },
            {
                src: "/img/Gallery/Appart2/RN4-Chambre.jpg",
                captionKey: "premiumBedroom",
            },
            {
                src: "/img/Gallery/Appart2/RN4-Terrasse.jpg",
                captionKey: "privateOutdoor",
            },
        ],
    },

    {
        id: 3,
        key: "prestige",
        locationKey: "bingerville",

        images: [
            {
                src: "/img/Gallery/Appart3/RN8_Salon.jpg",
                captionKey: "livingSpace",
            },
            {
                src: "/img/Gallery/Appart3/RN8_Chambre.jpg",
                captionKey: "masterBedroom",
            },
            {
                src: "/img/Gallery/Appart3/RN8_Terrasse.jpg",
                captionKey: "terrace",
            },
        ],
    },
];

/* ---------------------------------------------------------------------------
   NOM DE L'APPARTEMENT

   Les noms viennent des traductions :

   appart.items.signature.name
   appart.items.elegance.name
   appart.items.prestige.name
--------------------------------------------------------------------------- */

const nameKey = (apartment) =>
    `appart.items.${apartment.key}.name`;


const getInitialApartment = () => {
    const params = new URLSearchParams(
        window.location.search
    );

    const apartmentKey = params.get("apartment");

    const apartmentExists = apartments.some(
        (item) => item.key === apartmentKey
    );

    return apartmentExists
        ? apartmentKey
        : "signature";
};

/* ---------------------------------------------------------------------------
   COMPOSANT
--------------------------------------------------------------------------- */

export default function Gallery() {
    const { t } = useTranslation();

    /* Appartement actuellement sélectionné */
    const [activeApartment, setActiveApartment] =
        useState(getInitialApartment);

    /* Image actuellement ouverte dans la lightbox */
    const [selectedImage, setSelectedImage] =
        useState(null);

    /* Média hero */
    const [heroMediaItem, setHeroMediaItem] =
        useState(null);

    /* ================================================================
       HERO ALÉATOIRE
    ================================================================ */

    useEffect(() => {
        const randomIndex = Math.floor(
            Math.random() * heroMedia.length
        );

        setHeroMediaItem(heroMedia[randomIndex]);
    }, []);

    /* ================================================================
       FERMETURE LIGHTBOX AVEC ESC
    ================================================================ */

    useEffect(() => {
        if (!selectedImage) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedImage(null);
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [selectedImage]);

    /* ================================================================
       APPARTEMENT ACTIF
    ================================================================ */

    const apartment =
        apartments.find(
            (item) => item.key === activeApartment
        ) || apartments[0];

    /* Nom traduit */
    const apartmentTitle = t(
        nameKey(apartment)
    );

    /* Localisation traduite */
    const apartmentLocation = t(
        `gallery.locations.${apartment.locationKey}`
    );

    /* ================================================================
       FERMER LIGHTBOX
    ================================================================ */

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    /* ================================================================
       CHANGER D'APPARTEMENT
    ================================================================ */

    const changeApartment = (apartmentKey) => {
        setActiveApartment(apartmentKey);

        setSelectedImage(null);
    };

    /* ================================================================
       RENDER
    ================================================================ */

    return (
        <main className="gallery-page">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="gallery-hero">

                {/* HERO VIDÉO */}
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

                {/* HERO IMAGE */}
                {heroMediaItem?.type === "image" && (
                    <img
                        className="gallery-hero__media"
                        src={heroMediaItem.src}
                        alt={t(
                            `gallery.${heroMediaItem.altKey}`
                        )}
                    />
                )}

                {/* OVERLAY */}
                <div
                    className="gallery-hero__overlay"
                    aria-hidden="true"
                />

                {/* CONTENU HERO */}
                <div className="gallery-hero__content">
                    <span className="gallery-hero__subtitle">
                        {t("gallery.hero.subtitle")}
                    </span>

                    <h1>
                        {t("gallery.hero.title")}
                    </h1>

                    <p>
                        {t("gallery.hero.description")}
                    </p>
                </div>
            </section>

            {/* =========================================================
                GALERIE
            ========================================================= */}

            <section className="gallery-section">
                <div className="gallery-container">

                    {/* =================================================
                        TITRE + RÉSERVATION
                    ================================================= */}

                    <div className="gallery-heading">
                        <div>
                            <h2>
                                {apartmentTitle}
                            </h2>
                        </div>

                        <Link
                            href="/reservation"
                            className="gallery-reservation-btn"
                        >
                            {t("gallery.book")}
                        </Link>
                    </div>

                    {/* =================================================
                        ONGLETS
                    ================================================= */}

                    <div className="gallery-tabs-wrapper">
                        <div
                            className="gallery-tabs"
                            role="tablist"
                            aria-label={t(
                                "gallery.chooseApartment"
                            )}
                        >
                            {apartments.map((item) => {
                                const isActive =
                                    activeApartment ===
                                    item.key;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={
                                            isActive
                                        }
                                        className={
                                            isActive
                                                ? "gallery-tab active"
                                                : "gallery-tab"
                                        }
                                        onClick={() =>
                                            changeApartment(
                                                item.key
                                            )
                                        }
                                    >
                                        {t(
                                            nameKey(item)
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* =================================================
                        INFORMATIONS
                    ================================================= */}

                    <div className="gallery-location">
                        <span>
                            {apartmentLocation}
                        </span>

                        <span className="gallery-photo-count">
                            {apartment.images.length}{" "}
                            {t("gallery.photos")}
                        </span>
                    </div>

                    {/* =================================================
                        PHOTOS DE L'APPARTEMENT ACTIF
                    ================================================= */}

                    <div className="gallery-grid">
                        {apartment.images.map(
                            (image, index) => {

                                /*
                                 * La traduction dépend :
                                 *
                                 * appartement actif
                                 *      +
                                 * clé de légende
                                 */
                                const caption = t(
                                    `gallery.apartments.${apartment.key}.images.${image.captionKey}`
                                );

                                return (
                                    <article
                                        className="gallery-card"
                                        key={image.src}
                                    >
                                        <button
                                            type="button"
                                            className="gallery-image-button"
                                            onClick={() =>
                                                setSelectedImage(
                                                    {
                                                        ...image,
                                                        title:
                                                            apartmentTitle,
                                                        location:
                                                            apartmentLocation,
                                                        caption,
                                                        index,
                                                    }
                                                )
                                            }
                                            aria-label={t(
                                                "gallery.viewPhoto",
                                                {
                                                    caption,
                                                }
                                            )}
                                        >

                                            {/* IMAGE */}
                                            <img
                                                src={image.src}
                                                alt={caption}
                                                loading="lazy"
                                            />

                                            {/* OVERLAY */}
                                            <div className="gallery-card__overlay">
                                                <div className="gallery-card__caption">

                                                    <span className="gallery-card__number">
                                                        {String(
                                                            index +
                                                                1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>

                                                    <span className="gallery-card__line"></span>

                                                    <p>
                                                        {
                                                            caption
                                                        }
                                                    </p>

                                                </div>
                                            </div>
                                        </button>
                                    </article>
                                );
                            }
                        )}
                    </div>
                </div>
            </section>

            {/* =========================================================
                LIGHTBOX
            ========================================================= */}

            {selectedImage && (
                <div
                    className="gallery-lightbox"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={t(
                        "gallery.lightbox.preview"
                    )}
                >

                    {/* FERMER */}
                    <button
                        type="button"
                        className="gallery-lightbox__close"
                        onClick={closeLightbox}
                        aria-label={t(
                            "gallery.lightbox.close"
                        )}
                    >
                        ×
                    </button>

                    {/* IMAGE */}
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.caption}
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    />

                    {/* LÉGENDE */}
                    <div
                        className="gallery-lightbox__caption"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <span>
                            {selectedImage.title}
                        </span>

                        <h3>
                            {selectedImage.caption}
                        </h3>

                        <small>
                            {t(
                                "gallery.lightbox.photo",
                                {
                                    number:
                                        selectedImage.index +
                                        1,
                                }
                            )}
                        </small>
                    </div>
                </div>
            )}
        </main>
    );
}
 