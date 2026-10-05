import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './css/HotelLinkWidget.css';

const HOTEL_LINK_SCRIPT = 'https://book.securebookings.net/js/v2/widget.all.js';
const WIDGET_ID = '6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28';

const customizeUrl = (lang) =>
    `https://book.securebookings.net/widgetCustomize?lang=${lang}&widgetType=Widget&id=${WIDGET_ID}&ajax=true`;

const Icon = ({ d }) => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d={d} fill="currentColor" />
    </svg>
);

const TRUST = [
    ['booking.trust.secure', 'M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z'],
    ['booking.trust.rate', 'M3 12 12 3h9v9l-9 9z'],
    ['booking.trust.cancel', 'M6 10V8a6 6 0 1 1 12 0v2h2v12H4V10z'],
];

function Hero() {
    const { t } = useTranslation();

    return (
        <section className="booking-hero">
            <div className="booking-hero__content">
                <p className="booking-hero__eyebrow">{t('booking.eyebrow')}</p>
                <h1>{t('booking.title')}</h1>
                <p className="booking-hero__sub">{t('booking.subtitle')}</p>
                <ul className="booking-trust">
                    {TRUST.map(([key, d]) => (
                        <li key={key}>
                            <Icon d={d} />
                            {t(key)}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

const STICKY_TOP = 108; // distance du haut de l'écran, en px (hauteur de votre Header fixe)
// Si la barre n'est pas détectée automatiquement, indiquez ici son sélecteur (via l'inspecteur)
const SEARCH_BAR_SELECTOR = null; // ex. '#hbe-bws-wrapper .search-bar'
const STICKY_DEBUG = false; // mettre true pour voir les messages [sticky] dans la console

const SEARCH_LABEL = /^\s*(rechercher?|search|buscar)\s*$/i;

/** Fixe la barre de dates à STICKY_TOP px du haut au défilement (desktop uniquement). */
function useStickySearchBar(top = STICKY_TOP) {
    useEffect(() => {
        const wrapper = document.getElementById('hbe-bws-wrapper');
        if (!wrapper) return undefined;

        const log = (...a) => STICKY_DEBUG && console.log('[sticky]', ...a);

        let bar = null;
        let stuck = false;
        let offset = 0; // position de la barre dans son parent, pour savoir quand la relâcher
        let frame = 0;

        const findBar = () => {
            if (SEARCH_BAR_SELECTOR) return wrapper.querySelector(SEARCH_BAR_SELECTOR);
            const label = [...wrapper.querySelectorAll('*')].find(
                (el) =>
                    (el.children.length === 0 && SEARCH_LABEL.test(el.textContent)) ||
                    (el.tagName === 'INPUT' && SEARCH_LABEL.test(el.value))
            );
            if (!label) return null;
            let el = label;
            while (el.parentElement && el.parentElement !== wrapper && el.parentElement.offsetHeight <= 200) {
                el = el.parentElement;
            }
            return el;
        };

        const release = () => {
            if (!bar) return;
            bar.classList.remove('is-stuck');
            ['position', 'top', 'left', 'width', 'zIndex'].forEach((p) => (bar.style[p] = ''));
            if (bar.parentElement) bar.parentElement.style.minHeight = '';
            stuck = false;
        };

        const update = () => {
            frame = 0;
            if (window.innerWidth < 768) return release();
            if (!bar || !bar.isConnected) {
                stuck = false;
                bar = findBar();
                if (bar) log('barre détectée :', bar, `hauteur ${bar.offsetHeight}px`);
                else log('barre introuvable pour le moment');
            }
            if (!bar || !bar.parentElement) return;

            const parent = bar.parentElement;

            if (!stuck) {
                const r = bar.getBoundingClientRect();
                if (r.top <= top && r.height > 0) {
                    offset = r.top - parent.getBoundingClientRect().top;
                    parent.style.minHeight = `${parent.offsetHeight}px`;
                    Object.assign(bar.style, {
                        position: 'fixed',
                        left: `${r.left}px`,
                        width: `${r.width}px`,
                        zIndex: 50,
                    });
                    bar.classList.add('is-stuck');
                    stuck = true;
                    log('barre fixée');
                }
            } else if (parent.getBoundingClientRect().top + offset > top) {
                release();
                log('barre relâchée');
                return;
            }

            if (stuck) {
                // la barre s'arrête à la fin du widget au lieu de recouvrir le footer
                const end = wrapper.getBoundingClientRect().bottom - bar.offsetHeight;
                bar.style.top = `${Math.min(top, end)}px`;
            }
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        const onMutate = () => {
            if (!stuck) bar = null; // le widget se redessine : on cherche la barre à nouveau
            schedule();
        };
        const onResize = () => {
            release();
            bar = null;
            schedule();
        };

        const observer = new MutationObserver(onMutate);
        observer.observe(wrapper, { childList: true, subtree: true });
        // capture: true => détecte aussi le défilement d'un conteneur interne, pas seulement de la fenêtre
        window.addEventListener('scroll', schedule, { passive: true, capture: true });
        window.addEventListener('resize', onResize);
        schedule();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', schedule, { capture: true });
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(frame);
            release();
        };
    }, [top]);
}

function HotelLinkWidget() {
    const { i18n } = useTranslation();
    const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

    /* Langue au moment où la page a été chargée */
    const initialLang = useRef(lang);

    /* Le widget est une appli AngularJS qui ne démarre qu'une fois par chargement :
       au changement de langue, on recharge la page (la langue est déjà sauvegardée) */
    useEffect(() => {
        if (initialLang.current !== lang) window.location.reload();
    }, [lang]);

    useStickySearchBar();

    useEffect(() => {
        if (lang !== initialLang.current) return undefined;

        let cancelled = false;
        const added = [];

        const load = (src, onload) => {
            const s = document.createElement('script');
            s.src = src;
            s.async = false;
            s.onload = () => !cancelled && onload?.();
            s.onerror = () => console.error(`Chargement impossible : ${src}`);
            document.body.appendChild(s);
            added.push(s);
        };

        load(HOTEL_LINK_SCRIPT, () => load(customizeUrl(lang)));

        return () => {
            cancelled = true;
            added.forEach((s) => s.remove());
        };
    }, [lang]);

    return (
        <div className="hotel-link-widget-container">
            <div className="hbe-bws">
                <section id="hbe-bws-page">
                    <div id="hbe-bws-wrapper"></div>
                </section>
            </div>
        </div>
    );
}

export default function BookingPage() {
    const { t } = useTranslation();

    return (
        <div className="booking-page">
            <Head title={t('booking.pageTitle')} />
            <Hero />
            <main>
                <HotelLinkWidget />
            </main>
        </div>
    );
}