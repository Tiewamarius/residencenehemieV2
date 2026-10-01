import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import './css/Gallery.css';

/*
|--------------------------------------------------------------------------
| HERO MEDIA
|--------------------------------------------------------------------------
| Les médias peuvent être des images OU des vidéos.
| Un média sera choisi aléatoirement à chaque chargement.
*/

const heroMedia = [
    {
        type: 'image',
        src: '/img/gallery-hero/hero-1.jpg',
        alt: 'Résidence Néhémie',
    },
    {
        type: 'image',
        src: '/img/Hero-Gallery/ESPACE COMMUN 2.jpg',
        alt: 'Appartement Résidence Néhémie',
    },
    {
        type: 'image',
        src: '/img/Hero-Gallery/ESPACE COMMUN 2.jpg',
        alt: 'Espace extérieur Résidence Néhémie',
    },
    {
        type: 'video',
        src: '/videos/gallery-hero/hero-1.mp4',
    },
    {
        type: 'video',
        src: '/videos/gallery-hero/hero-2.mp4',
    },
];


/*
|--------------------------------------------------------------------------
| APARTMENTS
|--------------------------------------------------------------------------
*/

const apartments = [
    {
        id: 1,
        title: 'Appartement 1',
        location: 'Saly, Sénégal',

        images: [
            {
                src: '/img/apartments/appartement-1.jpg',
                caption: 'Salon lumineux et espace de vie',
            },
            {
                src: '/img/apartments/appartement-1-2.jpg',
                caption: 'Chambre principale',
            },
            {
                src: '/img/apartments/appartement-1-3.jpg',
                caption: 'Terrasse avec vue sur le jardin',
            },
        ],
    },

    {
        id: 2,
        title: 'Appartement 2',
        location: 'Saly, Sénégal',

        images: [
            {
                src: '/img/apartments/appartement-2.jpg',
                caption: 'Salon moderne et confortable',
            },
            {
                src: '/img/apartments/appartement-2-2.jpg',
                caption: 'Chambre avec literie premium',
            },
            {
                src: '/img/apartments/appartement-2-3.jpg',
                caption: 'Espace extérieur privé',
            },
        ],
    },

    {
        id: 3,
        title: 'Appartement 3',
        location: 'Saly, Sénégal',

        images: [
            {
                src: '/img/apartments/appartement-3.jpg',
                caption: 'Espace de séjour',
            },
            {
                src: '/img/apartments/appartement-3-2.jpg',
                caption: 'Chambre principale',
            },
            {
                src: '/img/apartments/appartement-3-3.jpg',
                caption: 'Terrasse de l’appartement',
            },
        ],
    },
];


export default function Gallery() {

    /*
    |--------------------------------------------------------------------------
    | STATES
    |--------------------------------------------------------------------------
    */

    const [activeApartment, setActiveApartment] = useState(1);

    const [selectedImage, setSelectedImage] = useState(null);

    const [heroMediaItem, setHeroMediaItem] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | RANDOM HERO MEDIA
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const randomIndex = Math.floor(
            Math.random() * heroMedia.length
        );

        setHeroMediaItem(heroMedia[randomIndex]);

    }, []);


    /*
    |--------------------------------------------------------------------------
    | ACTIVE APARTMENT
    |--------------------------------------------------------------------------
    */

    const apartment = apartments.find(
        (item) => item.id === activeApartment
    );


    /*
    |--------------------------------------------------------------------------
    | LIGHTBOX
    |--------------------------------------------------------------------------
    */

    const closeLightbox = () => {
        setSelectedImage(null);
    };


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <main className="gallery-page">


            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="gallery-hero">


                {/* MEDIA */}

                {heroMediaItem?.type === 'video' && (

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


                {heroMediaItem?.type === 'image' && (

                    <img
                        className="gallery-hero__media"
                        src={heroMediaItem.src}
                        alt={heroMediaItem.alt}
                    />

                )}


                {/* OVERLAY */}

                <div className="gallery-hero__overlay"></div>


                {/* CONTENT */}

                <div className="gallery-hero__content">

                    <span className="gallery-hero__subtitle">
                        DÉCOUVREZ NOS ESPACES
                    </span>

                    <h1>
                        Galerie des appartements
                    </h1>

                    <p>
                        Découvrez nos appartements en images
                        et choisissez celui qui vous correspond.
                    </p>

                </div>

            </section>


            {/* =========================================================
                GALERIE
            ========================================================= */}

            <section className="gallery-section">

                <div className="gallery-container">


                    {/* =====================================================
                        HEADING
                    ===================================================== */}

                    <div className="gallery-heading">

                        <div>

                            <span className="gallery-label">
                                NOS APPARTEMENTS
                            </span>

                            <h2>
                                {apartment.title}
                            </h2>

                        </div>


                        <Link
                            href="/reservation"
                            className="gallery-reservation-btn"
                        >
                            Réserver
                        </Link>

                    </div>


                    {/* =====================================================
                        TABS
                    ===================================================== */}

                    <div className="gallery-tabs-wrapper">

                        <div
                            className="gallery-tabs"
                            role="tablist"
                            aria-label="Choisir un appartement"
                        >

                            {apartments.map((item) => (

                                <button
                                    key={item.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={
                                        activeApartment === item.id
                                    }
                                    className={
                                        activeApartment === item.id
                                            ? 'gallery-tab active'
                                            : 'gallery-tab'
                                    }
                                    onClick={() => {

                                        setActiveApartment(item.id);

                                        setSelectedImage(null);

                                    }}
                                >
                                    {item.title}
                                </button>

                            ))}

                        </div>

                    </div>


                    {/* =====================================================
                        INFORMATIONS
                    ===================================================== */}

                    <div className="gallery-location">

                        <span>
                            {apartment.location}
                        </span>

                        <span className="gallery-photo-count">
                            {apartment.images.length} photos
                        </span>

                    </div>


                    {/* =====================================================
                        PHOTO GRID
                    ===================================================== */}

                    <div className="gallery-grid">

                        {apartment.images.map((image, index) => (

                            <article
                                className="gallery-card"
                                key={image.src}
                            >

                                <button
                                    type="button"
                                    className="gallery-image-button"

                                    onClick={() => {

                                        setSelectedImage({
                                            ...image,
                                            title: apartment.title,
                                            location: apartment.location,
                                            index,
                                        });

                                    }}

                                    aria-label={`Voir ${image.caption}`}
                                >

                                    <img
                                        src={image.src}
                                        alt={image.caption}
                                        loading="lazy"
                                    />


                                    {/* IMAGE OVERLAY */}

                                    <div className="gallery-card__overlay">

                                        <div className="gallery-card__caption">

                                            <span className="gallery-card__number">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>

                                            <span className="gallery-card__line"></span>

                                            <p>
                                                {image.caption}
                                            </p>

                                        </div>

                                    </div>

                                </button>

                            </article>

                        ))}

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
                    aria-label="Aperçu de la photo"
                >


                    {/* CLOSE */}

                    <button
                        type="button"
                        className="gallery-lightbox__close"
                        onClick={closeLightbox}
                        aria-label="Fermer la photo"
                    >
                        ×
                    </button>


                    {/* IMAGE */}

                    <img
                        src={selectedImage.src}
                        alt={selectedImage.caption}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    />


                    {/* CAPTION */}

                    <div
                        className="gallery-lightbox__caption"
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >

                        <span>
                            {selectedImage.title}
                        </span>

                        <h3>
                            {selectedImage.caption}
                        </h3>

                        <small>
                            Photo {selectedImage.index + 1}
                        </small>

                    </div>

                </div>

            )}

        </main>
    );
}