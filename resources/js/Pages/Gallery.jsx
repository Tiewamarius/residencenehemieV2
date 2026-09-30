import { useState } from 'react';
import { Link } from '@inertiajs/react';

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

    const [activeApartment, setActiveApartment] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    const apartment = apartments.find(
        (item) => item.id === activeApartment
    );

    return (
        <main className="gallery-page">

            {/* =================================================
                HERO
            ================================================= */}

            <section className="gallery-hero">

                <div className="gallery-hero__overlay"></div>

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


            {/* =================================================
                GALERIE
            ================================================= */}

            <section className="gallery-section">

                <div className="gallery-container">


                    {/* TITRE */}

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


                    {/* =================================================
                        TABS STICKY
                    ================================================= */}

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


                    {/* INFORMATIONS */}

                    <div className="gallery-location">

                        <span>
                            {apartment.location}
                        </span>

                        <span className="gallery-photo-count">
                            {apartment.images.length} photos
                        </span>

                    </div>


                    {/* =================================================
                        GRILLE PHOTOS
                    ================================================= */}

                    <div className="gallery-grid">

                        {apartment.images.map((image, index) => (

                            <article
                                className="gallery-card"
                                key={image.src}
                            >

                                <button
                                    type="button"
                                    className="gallery-image-button"

                                    onClick={() =>
                                        setSelectedImage({
                                            ...image,
                                            title: apartment.title,
                                            location: apartment.location,
                                            index,
                                        })
                                    }

                                    aria-label={`Voir ${image.caption}`}
                                >

                                    <img
                                        src={image.src}
                                        alt={image.caption}
                                        loading="lazy"
                                    />


                                    {/* OVERLAY */}

                                    <div className="gallery-card__overlay">

                                        <div className="gallery-card__caption">

                                            <span className="gallery-card__number">
                                                0{index + 1}
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


            {/* =================================================
                LIGHTBOX
            ================================================= */}

            {selectedImage && (

                <div
                    className="gallery-lightbox"

                    onClick={() =>
                        setSelectedImage(null)
                    }
                >

                    <button
                        type="button"
                        className="gallery-lightbox__close"

                        onClick={() =>
                            setSelectedImage(null)
                        }

                        aria-label="Fermer la photo"
                    >
                        ×
                    </button>


                    <img
                        src={selectedImage.src}

                        alt={selectedImage.caption}

                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    />


                    <div className="gallery-lightbox__caption">

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