
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import Amenities from '../Components/Amenities';
import AboutResidence from '../Components/AboutResidence';
import Footer from '../Components/Footer';


export default function Home() {
    return (
        <>
            <Header />

            <main>
                <Hero />

                <div id="content">
                    <Amenities />

                    <AboutResidence />
                </div>

                {/* Les prochaines sections viendront ici */}
            </main>
            <Footer/>
        </>
    );
}