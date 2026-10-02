import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import './css/Hero.css';

const SLIDE_DURATION = 7000;
const SWIPE_THRESHOLD = 50;

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

    const touchStartX = useRef(null);

    const today = new Date().toISOString().split('T')[0];

    const nextSlide = useCallback(() => {
        setCurrentSlide((current) => (current + 1) % slides.length);
    }, []);

    const previousSlide = useCallback(() => {
        setCurrentSlide(
            (current) => (current - 1 + slides.length) % slides.length
        );
    }, []);

    /* Défilement automatique (relancé après chaque changement de slide,
       désactivé si l'utilisateur préfère moins d'animations) */
    useEffect(() => {
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (reduceMotion) return;

        const timeout = setTimeout(nextSlide, SLIDE_DURATION);

        return () => clearTimeout(timeout);
    }, [currentSlide, nextSlide]);

    /* Swipe tactile (les flèches sont masquées sur mobile / tablette) */
    const handleTouchStart = (event) => {
        if (event.target.closest('.hero__booking')) {
            touchStartX.current = null;
            return;
        }

        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        if (touchStartX.current === null) return;

        const distance = event.changedTouches[0].clientX - touchStartX.current;

        touchStartX.current = null;

        if (Math.abs(distance) < SWIPE_THRESHOLD) return;

        if (distance < 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    };

    const handleArrivalChange = (event) => {
        const value = event.target.value;

        setArrival(value);

        /* Évite un départ antérieur à l'arrivée */
        if (departure && departure < value) {
            setDeparture('');
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();

        router.get('/reservation', {
            arrival,
            departure,
            adults,
            children,
        });
    };

    return (
        <section
            className="hero"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

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
                        aria-hidden={index !== currentSlide}
                    />
                ))}
            </div>

            {/* Overlay */}
            <div className="hero__overlay" />

            {/* Hero content */}
            <div className="hero__content">

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
                                min={today}
                                onChange={handleArrivalChange}
                                required
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
                                min={arrival || today}
                                onChange={(event) =>
                                    setDeparture(event.target.value)
                                }
                                required
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
                            aria-hidden="true"
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

                        <span className="hero__booking-submit-text">
                            Rechercher les disponibilités
                        </span>
                    </button>

                </form>

            </div>

            {/* Slider previous (desktop uniquement) */}
            <button
                type="button"
                className="hero__slider-button hero__slider-button--prev"
                onClick={previousSlide}
                aria-label="Image précédente"
            >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Slider next (desktop uniquement) */}
            <button
                type="button"
                className="hero__slider-button hero__slider-button--next"
                onClick={nextSlide}
                aria-label="Image suivante"
            >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
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
                        aria-current={index === currentSlide}
                    />
                ))}
            </div>

        </section>
    );
}