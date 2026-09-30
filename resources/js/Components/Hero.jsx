import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

const slides = [
    {
        image: '/img/RN8_Salon.jpg',
        alt: 'Bienvenue à la Residence Nehemie ,Un Havre de paix pour le confort.',
    },
    {
        image: '/img/ESPACE COMMUN 2.jpg',
        alt: 'Douglas Luxury Apartments',
    },
    {
        image: '/img/ESPACE COMMUN 2.jpg',
        alt: 'Luxury apartment',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

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
            nextSlide();
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">

            {/* Background slides */}
            <div className="hero__background">
                {slides.map((slide, index) => (
                    <div
                        key={slide.image}
                        className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''
                            }`}
                        style={{
                            backgroundImage: `url("${slide.image}")`,
                        }}
                        aria-label={slide.alt}
                    />
                ))}
            </div>

            {/* Dark overlay */}
            <div className="hero__overlay" />


            {/* Hero content */}
            <div className="hero__content">

                <div className="hero__title">
                    <span className="hero__title-main">
                        Bienvenue à la Résidence Néhémie
                    </span>


                    <span className="hero__title-subtitle">
                        Un Havre de paix pour le confort.
                    </span>
                </div>

                <div className="hero__search">
                    <input
                        type="text"
                        className="hero__search-input"
                        placeholder="Rechercher un appartement..."
                    />

                    <button
                        type="button"
                        className="hero__search-button"
                    >
                        Rechercher
                    </button>
                </div>

            </div>

            {/* Slider previous */}
            <button
                type="button"
                className="hero__slider-button hero__slider-button--prev"
                onClick={previousSlide}
                aria-label="Previous slide"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
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
                aria-label="Next slide"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
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
                aria-label="Scroll down"
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
                aria-label="Contact us on WhatsApp"
            >
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
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
                        className={`hero__indicator ${index === currentSlide
                                ? 'hero__indicator--active'
                                : ''
                            }`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

        </section>
    );
}