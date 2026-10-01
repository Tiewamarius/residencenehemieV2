import { useEffect } from 'react';
import './css/HotelLinkWidget.css';

const HOTEL_LINK_SCRIPT = 'https://book.securebookings.net/js/v2/widget.all.js';
const HOTEL_LINK_CUSTOMIZE =
    'https://book.securebookings.net/widgetCustomize?lang=en&widgetType=Widget&id=6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28&ajax=true';

const Icon = ({ d }) => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d={d} fill="currentColor" />
    </svg>
);

const TRUST = [
    ['Réservation sécurisée', 'M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z'],
    ['Meilleure garantie de taux', 'M3 12 12 3h9v9l-9 9z'],
    ['Annulation flexible disponible', 'M6 10V8a6 6 0 1 1 12 0v2h2v12H4V10z'],
];

function Hero() {
    return (
        <section className="booking-hero">
            <div className="booking-hero__content">
                <p className="booking-hero__eyebrow">Les appartements signatures · East Legon, Accra</p>
                <h1>Réservez votre suite</h1>
                <p className="booking-hero__sub">
                    Les meilleurs tarifs sont garantis lorsque vous réservez directement. Pas de frais cachés.
                </p>
                <ul className="booking-trust">
                    {TRUST.map(([label, d]) => (
                        <li key={label}>
                            <Icon d={d} />
                            {label}
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
const STICKY_DEBUG = true; // affiche des messages [sticky] dans la console ; mettre false ensuite

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
    useStickySearchBar();

    useEffect(() => {
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

        load(HOTEL_LINK_SCRIPT, () => load(HOTEL_LINK_CUSTOMIZE));

        return () => {
            cancelled = true;
            added.forEach((s) => s.remove());
        };
    }, []);

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
    return (
        <div className="booking-page">
            <Hero />
            <main>
                <HotelLinkWidget />
            </main>
        </div>
    );
}