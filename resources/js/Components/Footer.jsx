import { Link } from "@inertiajs/react";
import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa6";

import "./css/Footer.css";

const COLUMNS = [
    {
        title: "Navigation",
        links: [
            { label: "Accueil", href: "/" },
            { label: "À propos", href: "/a-propos" },
            { label: "Nos chambres", href: "/hebergement" },
        ],
    },
    {
        title: "Séjour",
        links: [
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
        ],
    },
];

// À remplacer par vos vrais liens
const SOCIALS = [
    {
        label: "WhatsApp",
        href: "https://wa.me/+2250500326868",
        Icon: FaWhatsapp,
        external: true,
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@residencenehemie2",
        Icon: FaTiktok,
        external: true,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/residencenehemie",
        Icon: FaInstagram,
        external: true,
    },
    {
        label: "Facebook Messenger",
        href: "https://www.facebook.com/share/1BkydohdQK/?mibextid=wwXIfr",
        Icon: FaFacebookF,
        external: true,
    },
    // Si vous souhaitez garder YouTube (laissez un lien valide ou '#' en attendant) :
    {
        label: "YouTube",
        href: "#",
        Icon: FaYoutube,
        external: true,
    },
];

export default function Footer() {
    return (
        <footer className="knsl-footer">
            <div className="knsl-footer__inner">
                <div className="knsl-footer__top">
                    <div className="knsl-footer__brand">
                        <img src="/img/logo.png" alt="Résidence Néhémie" />
                        <p>
                            Un cadre confortable et chaleureux pour vos séjours,
                            vos déplacements professionnels et vos moments de
                            détente.
                        </p>
                        <ul className="knsl-footer__socials">
                            {SOCIALS.map(({ label, href, Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Icon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* <nav className="knsl-footer__cols" aria-label="Pied de page">
                        {COLUMNS.map((col) => (
                            <div key={col.title}>
                                <h5>{col.title}</h5>
                                <ul>
                                    {col.links.map((l) => (
                                        <li key={l.href}>
                                            <Link href={l.href}>{l.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        
                    </nav> */}
                </div>

                <div className="knsl-footer__bottom">
                    <p>
                        © {new Date().getFullYear()} Résidence Néhémie. Tous
                        droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}
