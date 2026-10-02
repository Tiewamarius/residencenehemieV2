import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ChatWidget from "../Components/Chatwidget";
export default function MainLayout({ children }) {
    return (
        <div className="knsl-app">
            <Header />

            <main className="knsl-main">
                {/* WhatsApp */}
                <ChatWidget />
                {children}
            </main>

            <Footer />
        </div>
    );
}
