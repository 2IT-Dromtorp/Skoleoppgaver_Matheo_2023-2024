import '../../css/aboutus.css'
import Contact from '../components/contact';

function AboutUs() {

    return (
        <div className="aboutus-main">
            <div className="aboutus-header">
                <h1>Hos oss i VTH er kundeservice den høyeste prioriteten</h1>
                <h2>Det er derfor du kan kontakte oss døgnet rundt, uansett hva problemet ditt er</h2>
            </div>
            <div className="aboutus-contact-container">
                <div className="aboutus-inner-contact">
                    <Contact name="Åge Pettersen" text="Hei, jeg heter Åge Pettersen, er øverste sjef, og kom dit jeg er i dag på grunn av mitt hjerte for kundeservice" number="95065132" mail="agepet@vth.no" image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"/>
                    <Contact name="Åge Pettersen" text="Hei, jeg heter Åge Pettersen, er øverste sjef, og kom dit jeg er i dag på grunn av mitt hjerte for kundeservice" number="95065132" mail="agepet@vth.no" image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"/>
                    <Contact name="Åge Pettersen" text="Hei, jeg heter Åge Pettersen, er øverste sjef, og kom dit jeg er i dag på grunn av mitt hjerte for kundeservice" number="95065132" mail="agepet@vth.no" image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"/>
                    <Contact name="Åge Pettersen" text="Hei, jeg heter Åge Pettersen, er øverste sjef, og kom dit jeg er i dag på grunn av mitt hjerte for kundeservice" number="95065132" mail="agepet@vth.no" image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"/>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;