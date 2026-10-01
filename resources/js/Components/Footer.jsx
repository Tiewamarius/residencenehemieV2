import { Link } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa6';

import './css/Footer.css';

const COLUMNS = [
    {
        title: 'Navigation',
        links: [
            { label: 'Accueil', href: '/' },
            { label: 'À propos', href: '/a-propos' },
            { label: 'Nos chambres', href: '/hebergement' },
        ],
    },
    {
        title: 'Séjour',
        links: [
            { label: 'Services', href: '/services' },
            { label: 'Contact', href: '/contact' },
        ],
    },
];

// À remplacer par vos vrais liens
const SOCIALS = [
    { label: 'Facebook', href: '#', Icon: FaFacebookF },
    { label: 'Instagram', href: '#', Icon: FaInstagram },
    { label: 'TikTok', href: '#', Icon: FaTiktok },
    { label: 'YouTube', href: '#', Icon: FaYoutube },
    { label: 'WhatsApp', href: '#', Icon: FaWhatsapp },
];

export default function Footer() {
    return (
        <footer className="knsl-footer">
            <div className="knsl-footer__inner">
                <div className="knsl-footer__top">
                    <div className="knsl-footer__brand">
                        <img src="/img/logo.png" alt="Résidence Néhémie" />
                        <p>
                            Un cadre confortable et chaleureux pour vos séjours, vos déplacements
                            professionnels et vos moments de détente.
                        </p>
                        <ul className="knsl-footer__socials">
                            {SOCIALS.map(({ label, href, Icon }) => (
                                <li key={label}>
                                    <a href={href} aria-label={label} target="_blank" rel="noreferrer">
                                        <Icon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav className="knsl-footer__cols" aria-label="Pied de page">
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
                        <div>
                            <h5>Connectez-vous</h5>
                            <ul>
                                <li>
                                    <a href="#" target="_blank" rel="noreferrer" className="knsl-footer__wa">
                                        <FaWhatsapp aria-hidden="true" /> WhatsApp
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="knsl-footer__bottom">
                    <p>© {new Date().getFullYear()} Résidence Néhémie. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}