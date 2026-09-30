import { useEffect } from 'react';

const HOTEL_LINK_SCRIPT =
    'https://book.securebookings.net/js/v2/widget.all.js';

const HOTEL_LINK_CUSTOMIZE =
    'https://book.securebookings.net/widgetCustomize?lang=en&widgetType=Widget&id=6dfc3965-177b-1790682794-4a54-8af1-a5a33a0aef28&ajax=true';

export default function HotelLinkWidget() {
    useEffect(() => {
        const existingWidgetScript = document.querySelector(
            `script[src="${HOTEL_LINK_SCRIPT}"]`
        );

        if (existingWidgetScript) {
            return;
        }

        const widgetScript = document.createElement('script');

        widgetScript.type = 'text/javascript';
        widgetScript.src = HOTEL_LINK_SCRIPT;
        widgetScript.async = false;

        widgetScript.onload = () => {
            const customizeScript = document.createElement('script');

            customizeScript.type = 'text/javascript';
            customizeScript.src = HOTEL_LINK_CUSTOMIZE;
            customizeScript.async = false;

            document.body.appendChild(customizeScript);
        };

        widgetScript.onerror = () => {
            console.error(
                'Impossible de charger le moteur de réservation HotelLink.'
            );
        };

        document.body.appendChild(widgetScript);

        return () => {
            const customizeScript = document.querySelector(
                `script[src="${HOTEL_LINK_CUSTOMIZE}"]`
            );

            if (customizeScript) {
                customizeScript.remove();
            }

            if (widgetScript.parentNode) {
                widgetScript.remove();
            }
        };
    }, []);

    return (
        <div className="hbe-bws">
            <section id="hbe-bws-page">
                <div id="hbe-bws-wrapper"></div>
            </section>
        </div>
    );
}