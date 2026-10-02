import { Link } from '@inertiajs/react';
import './css/HomeSection.css';

export default function AboutVilla() {
    return (
        <section className="about-villa-section">

            <div className="about-villa-card">

                {/* Image */}
                <div className="about-villa-image">
                    <img
                        src="/img/Hero-Gallery/ESPACE COMMUN 2.jpg"
                        alt="Découverte de la Résidence"
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="about-villa-content">

                    <span className="about-villa-label">
                        BIENVENUE CHEZ NOUS
                    </span>

                    <h2>
                        La Résidence Néhémie
                    </h2>

                    <p>
                        La Résidence Néhémie propose un cadre agréable pour
                        vos séjours en Côte d'Ivoire.
                    </p>

                    <p>
                        Profitez d'un hébergement confortable,
                        d'un parking privé gratuit et d'un
                        environnement propice à la détente.
                    </p>

                    <div className="about-villa-details">

                        <div className="about-villa-detail">
                            <span className="about-villa-detail-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
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
                            </span>

                            <span>Abidjan, Bingerville - Féh Kessé</span>
                        </div>

                        <div className="about-villa-detail">
                            <span className="about-villa-detail-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M3 11L12 4L21 11V20H3V11Z"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9 20V13H15V20"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                    />
                                </svg>
                            </span>

                            <span>Hébergement confortable</span>
                        </div>

                    </div>

                    <Link
                        href="/reservation"
                        className="about-villa-button"
                    >
                        Découvrir nos appartements
                        <span aria-hidden="true">→</span>
                    </Link>

                </div>

            </div>

        </section>
    );
}