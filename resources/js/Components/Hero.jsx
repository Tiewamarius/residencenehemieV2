
import { useEffect, useState } from 'react';
import './css/Hero.css';
// import HotelLinkWidget from '../Components/HotelLinkWidget';
import { Link } from '@inertiajs/react';

const slides = [
    {
        image: '/img/Hero-Gallery/RN8_Salon.jpg',
        alt: 'Bienvenue à la Résidence Néhémie',
    },
    {
        image: '/img/Hero-Gallery/ESPACE COMMUN 2.jpg',
        alt: 'Espace commun de la résidence',
    },
    {
        image: '/img/Hero-Gallery/RN8_Salon.jpg',
        alt: 'Salon de la résidence',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const [arrival, setArrival] = useState('');
    const [departure, setDeparture] = useState('');
    const [adults, setAdults] = useState('1');
    const [children, setChildren] = useState('0');

    const nextSlide = () => {
        setCurrentSlide((current) => (current + 1) % slides.length);
    };

    const previousSlide = () => {
        setCurrentSlide(
            (current) => (current - 1 + slides.length) % slides.length
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((current) => (current + 1) % slides.length);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();

        const params = new URLSearchParams({
            arrival,
            departure,
            adults,
            children,
        });

        window.location.href = `/reservation?${params.toString()}`;
    };

    return (
        <section className="hero">

            {/* Background slides */}
            <div className="hero__background">
                {slides.map((slide, index) => (
                    <div
                        key={`${slide.image}-${index}`}
                        className={`hero__slide ${
                            index === currentSlide
                                ? 'hero__slide--active'
                                : ''
                        }`}
                        style={{
                            backgroundImage: `url("${slide.image}")`,
                        }}
                        role="img"
                        aria-label={slide.alt}
                    />
                ))}
            </div>

            {/* Overlay */}
            <div className="hero__overlay" />

            {/* Hero content */}
            <div className="hero__content">

                {/* Rating */}
                {/* <div className="hero__rating" aria-label="5 étoiles">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>★</span>
                    ))}
                </div> */}

                {/* Title */}
                <div className="hero__title">
                    <h1 className="hero__title-main">
                        Bienvenue à la Residence Néhemie
                    </h1>

                    <p className="hero__title-subtitle">
                        Un Havre de paix pour le confort.
                    </p>
                </div>

                {/* Reservation search */}
                <form
                    className="hero__booking"
                    onSubmit={handleSearch}
                >

                    {/* Arrival */}
                    <div className="hero__booking-field">
                        <label htmlFor="hero-arrival">
                            Arrivée
                        </label>

                        <div className="hero__booking-input">
                            <input
                                id="hero-arrival"
                                type="date"
                                value={arrival}
                                onChange={(event) =>
                                    setArrival(event.target.value)
                                }
                                required
                                aria-label="Date d'arrivée"
                            />
                        </div>
                    </div>

                    {/* Departure */}
                    <div className="hero__booking-field">
                        <label htmlFor="hero-departure">
                            Départ
                        </label>

                        <div className="hero__booking-input">
                            <input
                                id="hero-departure"
                                type="date"
                                value={departure}
                                min={arrival || undefined}
                                onChange={(event) =>
                                    setDeparture(event.target.value)
                                }
                                required
                                aria-label="Date de départ"
                            />
                        </div>
                    </div>

                    {/* Adults */}
                    <div className="hero__booking-field">
                        <label htmlFor="hero-adults">
                            Adultes
                        </label>

                        <div className="hero__booking-input">
                            <select
                                id="hero-adults"
                                value={adults}
                                onChange={(event) =>
                                    setAdults(event.target.value)
                                }
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                                    <option key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Children */}
                    <div className="hero__booking-field">
                        <label htmlFor="hero-children">
                            Enfants
                        </label>

                        <div className="hero__booking-input">
                            <select
                                id="hero-children"
                                value={children}
                                onChange={(event) =>
                                    setChildren(event.target.value)
                                }
                            >
                                {[0, 1, 2, 3, 4, 5, 6].map((number) => (
                                    <option key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Search button */}
                    <button
                        type="submit"
                        className="hero__booking-submit"
                        aria-label="Rechercher une disponibilité"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="10.8"
                                cy="10.8"
                                r="6.8"
                                stroke="currentColor"
                                strokeWidth="2"
                            />

                            <path
                                d="M16 16L21 21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                </form>

            </div>

            {/* Slider previous */}
            <button
                type="button"
                className="hero__slider-button hero__slider-button--prev"
                onClick={previousSlide}
                aria-label="Image précédente"
            >
                <svg viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Slider next */}
            <button
                type="button"
                className="hero__slider-button hero__slider-button--next"
                onClick={nextSlide}
                aria-label="Image suivante"
            >
                <svg viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Scroll indicator */}
            <a
                href="#content"
                className="hero__scroll"
                aria-label="Défiler vers le contenu"
            >
                <span className="hero__mouse">
                    <span className="hero__mouse-wheel" />
                </span>

                <span className="hero__scroll-text">
                    SCROLL
                </span>
            </a>

            {/* WhatsApp */}
            <a
                href="https://wa.me/2250000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__whatsapp"
                aria-label="Contacter sur WhatsApp"
            >
                <svg viewBox="0 0 32 32" fill="none">
                    <path
                        d="M16 3.5C9.096 3.5 3.5 9.096 3.5 16C3.5 18.206 4.074 20.278 5.078 22.064L3.5 28.5L10.09 26.96C11.836 27.936 13.842 28.5 16 28.5C22.904 28.5 28.5 22.904 28.5 16C28.5 9.096 22.904 3.5 16 3.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />

                    <path
                        d="M11.5 10.5C11.9 10.2 12.4 10.25 12.7 10.7L14 12.7C14.3 13.15 14.25 13.7 13.85 14.05L12.75 15C13.55 16.55 14.7 17.7 16.25 18.5L17.2 17.4C17.55 17 18.1 16.95 18.55 17.25L20.55 18.55C21 18.85 21.05 19.35 20.75 19.75L19.9 20.9C19.55 21.4 18.9 21.65 18.3 21.5C13.95 20.4 10.6 17.05 9.5 12.7C9.35 12.1 9.6 11.45 10.1 11.1L11.5 10.5Z"
                        fill="currentColor"
                    />
                </svg>
            </a>

            {/* Slide indicators */}
            <div className="hero__indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`hero__indicator ${
                            index === currentSlide
                                ? 'hero__indicator--active'
                                : ''
                        }`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Afficher l'image ${index + 1}`}
                    />
                ))}
            </div>

        </section>
    );
}