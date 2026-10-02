import { Link } from '@inertiajs/react';
import './css/AppartSection.css';

const residences = [
    {
        id: 1,
        name: 'Appartement Signature',
        category: 'Appartement 2 pièces',
        //  // location: 'Bingerville',
        address: 'Rue Lambert Feh-Kesse, Bingerville',
        price: 35000,
        image: '/img/Hero-Gallery/RN8_Salon.jpg',
        features: [
            'Appartement entièrement meublé',
            'Climatisation et Wi-Fi',
            'Confort et tranquillité',
        ],
        description:
            'Un espace élégant et chaleureux, pensé pour vous offrir un séjour confortable, que vous soyez en déplacement professionnel ou en escapade.',
        booking: '/reservation',
        details: '/residences/1',
    },
    {
        id: 2,
        name: 'Résidence Élégance',
        category: 'Appartement 3 pièces',
         // location: 'Bingerville',
        address: 'Résidence Néhémie, Bingerville',
        price: 45000,
        image: '/img/Hero-Gallery/RN8_Salon.jpg',
        features: [
            'Deux chambres confortables',
            'Espaces de vie aménagés',
            'Parking et Wi-Fi',
        ],
        description:
            'Un appartement spacieux et soigneusement aménagé, idéal pour les familles, les séjours professionnels et les moments de détente.',
        booking: '/reservation',
        details: '/residences/2',
    },
    {
        id: 3,
        name: 'Résidence Prestige',
        category: 'Appartement 3 pièces',
         // location: 'Bingerville',
        address: 'Rue Lambert Feh-Kesse, Bingerville',
        price: 55000,
        image: '/img/Hero-Gallery/RN8_Salon.jpg',
        features: [
            'Aménagement haut de gamme',
            'Confort pour vos séjours',
            'Environnement paisible',
        ],
        description:
            'Profitez d’un cadre accueillant associant espace, confort et sérénité pour une expérience résidentielle agréable.',
        booking: '/reservation',
        details: '/residences/3',
    },
];

/* Icônes SVG : les symboles ⌖ et ✓ s'affichent mal sur certains téléphones */

const PinIcon = () => (
    <svg
        className="appart-pin"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
    >
        <path
            d="M12 21S19 14.5 19 9.5A7 7 0 1 0 5 9.5C5 14.5 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.7"
        />
        <circle
            cx="12"
            cy="9.5"
            r="2.3"
            stroke="currentColor"
            strokeWidth="1.7"
        />
    </svg>
);

const CheckIcon = () => (
    <span className="appart-check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
            <path
                d="M5 12.5L10 17.5L19 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

export default function AppartSection() {
    return (
        <section className="appart-section" id="locations">

            <div className="appart-container">

                {/* En-tête de section */}

                <div className="appart-header">

                    <span className="appart-subtitle">
                        Nos résidences
                    </span>

                    <h2 className="appart-title">
                        Des espaces de vie.
                        <br />
                        <span>Une expérience d'exception.</span>
                    </h2>
{/* 
                    <p className="appart-lead">
                        Découvrez les appartements meublés de la Résidence
                        Néhémie, conçus pour allier confort, élégance et
                        tranquillité. Que ce soit pour une nuit ou un
                        séjour prolongé, profitez d'un cadre où vous
                        vous sentirez véritablement chez vous.
                    </p> */}

                </div>

                {/* Grille des appartements */}

                <div className="appart-grid">

                    {residences.map((residence, index) => (

                        <article
                            className="appart-card"
                            key={residence.id}
                            style={{ '--card-index': index }}
                        >

                            {/* Image de fond + voile */}

                            <div
                                className="appart-card-bg"
                                style={{
                                    backgroundImage: `url("${residence.image}")`,
                                }}
                                aria-hidden="true"
                            />

                            <div className="appart-card-overlay" aria-hidden="true" />

                            {/* Quartier + prix */}

                            <div className="appart-card-top">

                                <span className="appart-tag">
                                    {residence.location}
                                </span>

                                <div className="appart-price">

                                    <span className="appart-price-from">
                                        {/* À partir de */}
                                    </span>

                                    <strong>
                                        {`${residence.price.toLocaleString('fr-FR')}\u00A0FCFA`}
                                    </strong>

                                    <small>/ nuit</small>

                                </div>

                            </div>

                            {/* Contenu de la carte */}

                            <div className="appart-card-content">

                                <div className="appart-card-heading">

                                    <span className="appart-category">
                                        {residence.category}
                                    </span>

                                    <h3>
                                        {residence.name}
                                    </h3>

                                    <p className="appart-address">
                                        <PinIcon />
                                        <span>{residence.address}</span>
                                    </p>

                                </div>

                                {/* Détails : au survol sur desktop, toujours visibles ailleurs */}

                                <div className="appart-hover-content">

                                    <div className="appart-hover-inner">

                                        <ul className="appart-features">
                                            {residence.features.map((feature) => (
                                                <li
                                                    className="appart-feature"
                                                    key={feature}
                                                >
                                                    <CheckIcon />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <p className="appart-description">
                                            {residence.description}
                                        </p>

                                        <div className="appart-actions">

                                            <Link
                                                href={residence.booking}
                                                className="appart-btn appart-btn-primary"
                                            >
                                                Réserver
                                                <span aria-hidden="true">↗</span>
                                            </Link>

                                            <Link
                                                href={residence.details}
                                                className="appart-btn appart-btn-ghost"
                                            >
                                                Découvrir
                                                <span aria-hidden="true">→</span>
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

                {/* Appel à l'action */}

                <div className="appart-bottom">

                    <p>
                        Votre confort mérite un cadre exceptionnel.
                    </p>

                    <Link
                        href="/reservation"
                        className="appart-discover-link"
                    >
                        Découvrir nos appartements
                        <span aria-hidden="true">→</span>
                    </Link>

                </div>

            </div>

        </section>
    );
}