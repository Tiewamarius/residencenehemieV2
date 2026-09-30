import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="knsl-footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="knsl-footer-brand">
                            <h3>Résidence Néhémie</h3>

                            <p>
                                Un cadre confortable et chaleureux pour vos
                                séjours, vos déplacements professionnels et
                                vos moments de détente.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <h5>Navigation</h5>

                        <ul className="knsl-footer-menu">
                            <li>
                                <Link href="/">Accueil</Link>
                            </li>
                            <li>
                                <Link href="/a-propos">À propos</Link>
                            </li>
                            <li>
                                <Link href="/hebergement">Nos chambres</Link>
                            </li>
                            <li>
                                <Link href="/services">Services</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-4">
                        <h5>Contact</h5>

                        <ul className="knsl-footer-contact">
                            <li>
                                <strong>Adresse</strong>
                                <br />
                                Résidence Néhémie
                            </li>

                            <li>
                                <strong>Téléphone</strong>
                                <br />
                                À compléter
                            </li>

                            <li>
                                <strong>Email</strong>
                                <br />
                                À compléter
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="knsl-footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Résidence Néhémie.
                        Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}