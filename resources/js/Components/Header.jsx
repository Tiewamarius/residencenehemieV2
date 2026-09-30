import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="elementor-container elementor-column-gap-default header-container">

                {/* Logo */}
                <div className="elementor-column elementor-col-25 elementor-top-column header-logo-column">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="knsl-logo-frame">
                            <Link href="/">
                                <img
                                    src="/img/logo.png"
                                    className="attachment-large size-large"
                                    alt="Villa Hortensia Saly"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="elementor-column elementor-col-50 elementor-top-column header-menu-column">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-widget-container">
                            <div className="knsl-menu">
                                <nav className="top-menu-nav">
                                    <ul className="top-menu-nav-inner">

                                        <li className="menu-item">
                                            <Link href="/">
                                                Accueil
                                            </Link>
                                        </li>

                                        <li className="menu-item">
                                            <Link href="/reservation">
                                                Reservation
                                            </Link>
                                        </li>

                                        <li className="menu-item">
                                            <Link href="/galerie">
                                                Galeries
                                            </Link>
                                        </li>

                                        <li className="menu-item">
                                            <Link href="/contact">
                                                Contactez-nous
                                            </Link>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Réservation */}
                <div className="elementor-column elementor-col-25 elementor-top-column header-action-column">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-widget-container header-right">

                            <Link
                                href="/reservation"
                                className="knsl-btn"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="e-font-icon-svg e-far-bookmark"
                                    viewBox="0 0 384 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z" />
                                </svg>

                                <span>
                                    Réserver
                                </span>
                            </Link>

                            {/* Menu mobile */}
                            <button
                                type="button"
                                className="knsl-menu-btn"
                                aria-label="Ouvrir le menu"
                            >
                                <span></span>
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}