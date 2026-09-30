import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="knsl-app">
            <Header />

            <main className="knsl-main">
                {children}
            </main>

            <Footer />
        </div>
    );
}