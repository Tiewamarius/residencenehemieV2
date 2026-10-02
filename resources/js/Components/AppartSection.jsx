
import './css/AppartSection.css';

const residences = [
    {
        id: 1,
        name: 'Appartement Signature',
        category: 'Appartement 2 pièces',
        location: 'Bingerville',
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
        location: 'Bingerville',
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
        location: 'Bingerville',
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

                    <p className="appart-lead">
                        Découvrez les appartements meublés de la Résidence
                        Néhémie, conçus pour allier confort, élégance et
                        tranquillité. Que ce soit pour une nuit ou un
                        séjour prolongé, profitez d'un cadre où vous
                        vous sentirez véritablement chez vous.
                    </p>

                </div>

                {/* Grille des appartements */}

                <div className="appart-grid">

                    {residences.map((residence, index) => (

                        <article
                            className="appart-card"
                            key={residence.id}
                            style={{
                                '--card-index': index,
                            }}
                        >

                            {/* Image de fond */}

                            <div
                                className="appart-card-bg"
                                style={{
                                    backgroundImage: `url("${residence.image}")`,
                                }}
                            />

                            {/* Voile photographique */}

                            <div className="appart-card-overlay" />

                            {/* Informations supérieures */}

                            <div className="appart-card-top">

                                <span className="appart-tag">
                                    {residence.location}
                                </span>

                                <div className="appart-price">

                                    <span>À partir de</span>

                                    <strong>
                                        {residence.price.toLocaleString('fr-FR')}
                                        {' '}FCFA
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

                                        <span className="appart-pin">
                                            ⌖
                                        </span>

                                        {residence.address}

                                    </p>

                                </div>

                                {/* Informations complémentaires */}

                                <div className="appart-hover-content">

                                    <div className="appart-features">

                                        {residence.features.map((feature) => (

                                            <div
                                                className="appart-feature"
                                                key={feature}
                                            >

                                                <span className="appart-check">
                                                    ✓
                                                </span>

                                                <span>
                                                    {feature}
                                                </span>

                                            </div>

                                        ))}

                                    </div>

                                    <p className="appart-description">
                                        {residence.description}
                                    </p>

                                    {/* Actions */}

                                    <div className="appart-actions">

                                        <a
                                            href={residence.booking}
                                            className="appart-btn appart-btn-primary"
                                        >
                                            Réserver
                                            <span>↗</span>
                                        </a>

                                        <a
                                            href={residence.details}
                                            className="appart-btn appart-btn-ghost"
                                        >
                                            Découvrir
                                            <span>→</span>
                                        </a>

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

                    <a
                        href="/reservation"
                        className="appart-discover-link"
                    >
                        Découvrir nos appartements
                        <span>→</span>
                    </a>

                </div>

            </div>

        </section>
    );
}