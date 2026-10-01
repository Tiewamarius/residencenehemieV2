import { Link } from '@inertiajs/react';

import './css/HomeSection.css';
export default function Amenities() {
    const amenities = [
        {
            id: 1,
            title: 'Restauration',
    icon: (
        <svg viewBox="0 0 64 64" fill="none">
            <circle
                cx="32"
                cy="34"
                r="21"
                stroke="currentColor"
                strokeWidth="2"
            />

            <circle
                cx="32"
                cy="34"
                r="14"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            {/* Fourchette */}
            <path
                d="M17 12V26M13 12V20M21 12V20M17 26V52"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Couteau */}
            <path
                d="M47 12C43 16 43 22 43 28H48V52"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
},
        {
            id: 2,
            title: 'Sécurité',
            icon: (
                <svg viewBox="0 0 64 64" fill="none">
                    <path
                        d="M12 12H51V29H12V12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M19 17H38V24H19V17Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M43 17L52 13V27L43 24V17Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M27 29V39L15 46V53L22 50V45L32 39V29"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                    <circle
                        cx="32"
                        cy="40"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M32 44V51M28 54H36"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            ),
        },
        {
            id: 3,
            title: 'Connexion Internet',
            icon: (
                <svg viewBox="0 0 64 64" fill="none">
                    <path
                        d="M9 23C22 11 42 11 55 23"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M16 31C25 23 39 23 48 31"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M23 39C28 35 36 35 41 39"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                    <circle cx="32" cy="47" r="3.5" fill="currentColor" />
                </svg>
            ),
        },
        {
            id: 4,
            title: 'Non fumeur',
            icon: (
                <svg viewBox="0 0 64 64" fill="none">
                    <circle
                        cx="32"
                        cy="32"
                        r="25"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle
                        cx="32"
                        cy="32"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M16 37H43V43H16V37Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M43 37H48V43H43"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M19 19L45 45"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            ),
        },
        
        {
            id: 5,
            title: 'Climatisation',
            icon: (
                <svg viewBox="0 0 64 64" fill="none">
                    <rect
                        x="7"
                        y="12"
                        width="50"
                        height="23"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M12 18H39M44 18H49M12 24H17M22 24H27M32 24H37M42 24H47"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M20 41C20 44 17 44 17 47M28 41C28 44 25 44 25 47M36 41C36 44 33 44 33 47M44 41C44 44 41 44 41 47"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            ),
        },
    ];

    return (
        <section className="amenities-section">
            <div className="amenities-container">
                {amenities.map((amenity) => (
                    <div className="amenity-card" key={amenity.id}>
                        <div className="amenity-icon">
                            {amenity.icon}
                        </div>

                        <h3>{amenity.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}