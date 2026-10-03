
import { Link } from "@inertiajs/react";

import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa6";

import "./css/Footer.css";

const QUICK_LINKS = [
    {
        label: "Réservation",
        href: "/reservation",
    },
    {
        label: "Appartements",
        href: "/rooms",
    },
    {
        label: "Restauration",
        href: "/restauration",
    },
    {
        label: "Contactez-nous",
        href: "/contact",
    },
];

const SOCIALS = [
    {
        label: "WhatsApp",
        href: "https://wa.me/2250500326868",
        Icon: FaWhatsapp,
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@residencenehemie2",
        Icon: FaTiktok,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/residencenehemie",
        Icon: FaInstagram,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/share/1BkydohdQK/?mibextid=wwXIfr",
        Icon: FaFacebookF,
    },
    {
        label: "YouTube",
        href: "#",
        Icon: FaYoutube,
    },
];

export default function Footer() {
    return (
        <footer className="knsl-footer">
            <div className="knsl-footer__inner">

                {/* Partie supérieure */}

                <div className="knsl-footer__top">

                    {/* Identité */}

                    <div className="knsl-footer__brand">

                        <Link href="/" aria-label="Accueil Résidence Néhémie">
                            <img
                                src="/img/logo.png"
                                alt="Résidence Néhémie"
                            />
                        </Link>

                        <p>
                            Un cadre confortable et chaleureux pour vos séjours,
                            vos déplacements professionnels et vos moments de
                            détente.
                        </p>

                        {/* Réseaux sociaux */}

                        <ul className="knsl-footer__socials">
                            {SOCIALS.map(({ label, href, Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation rapide */}

                    <nav
                        className="knsl-footer__cols"
                        aria-label="Navigation de pied de page"
                    >
                        {QUICK_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                </div>

                {/* Copyright */}

                <div className="knsl-footer__bottom">
                    <p>
                        © {new Date().getFullYear()} Résidence Néhémie.
                        Tous droits réservés.
                    </p>
                </div>

            </div>
        </footer>
    );
}