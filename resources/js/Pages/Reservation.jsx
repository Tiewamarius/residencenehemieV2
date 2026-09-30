import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import HotelLinkWidget from '../Components/HotelLinkWidget';

export default function Reservation() {
    return (
        <MainLayout>
            <Head title="Réservation" />

            <section className="knsl-section knsl-reservation-page">
                <div className="container">
                    <div className="knsl-section-title text-center">
                        <span>Résidence Néhémie</span>

                        <h1>Réservez votre séjour</h1>

                        <p>
                            Consultez les disponibilités et choisissez les
                            conditions de votre séjour.
                        </p>
                    </div>

                    <HotelLinkWidget />
                </div>
            </section>
        </MainLayout>
    );
}