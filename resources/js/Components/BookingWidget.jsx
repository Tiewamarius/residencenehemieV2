
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './css/BookingWidget.css';

const HOST = 'https://book.securebookings.net';
const WIDGET_ID = '6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28';

const CSS_ID = 'hbe-search-wdg-css';
const SECTION_ID = 'hbe-bws-wrapper-widget-code';

export default function BookingWidget() {
    const { t, i18n } = useTranslation();

    const lang = i18n.language?.startsWith('en')
        ? 'en'
        : 'fr';

    /*
     * Le widget SecureBookings / AngularJS doit être
     * initialisé avec la langue présente au chargement.
     */
    const initialLang = useRef(lang);

    /*
     * Si l'utilisateur change de langue,
     * on recharge la page afin que SecureBookings
     * soit réinitialisé avec la bonne langue.
     */
    useEffect(() => {
        if (initialLang.current !== lang) {
            window.location.reload();
        }
    }, [lang]);

    /*
     * Chargement du widget SecureBookings.
     */
    useEffect(() => {
        if (lang !== initialLang.current) {
            return;
        }

        let cancelled = false;
        const addedScripts = [];

        /*
         * CSS officiel SecureBookings.
         *
         * Il est chargé une seule fois.
         */
        if (!document.getElementById(CSS_ID)) {
            const link = document.createElement('link');

            link.id = CSS_ID;
            link.rel = 'stylesheet';
            link.href = `${HOST}/css/search-wdg.css`;

            document.head.appendChild(link);
        }

        /*
         * Chargement dynamique des scripts.
         */
        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement('script');

                script.src = src;
                script.async = false;

                script.onload = resolve;
                script.onerror = resolve;

                document.body.appendChild(script);

                addedScripts.push(script);
            });
        };

        /*
         * Initialisation du widget.
         */
        (async () => {
            await loadScript(`${HOST}/js/widget.search.js`);

            if (cancelled) {
                return;
            }

            await loadScript(
                `${HOST}/searchWidgetCustomize?lang=${lang}&id=${WIDGET_ID}&ajax=true`
            );
        })();

        /*
         * Nettoyage lorsque le composant est démonté.
         */
        return () => {
            cancelled = true;

            addedScripts.forEach((script) => {
                script.remove();
            });

            const section = document.getElementById(SECTION_ID);

            if (section) {
                section.innerHTML = '';
            }
        };
    }, [lang]);

    return (
        <div className="booking-widget">
            <section
                id={SECTION_ID}
                aria-label={t('hero.bookingLabel')}
            />
        </div>
    );
} 