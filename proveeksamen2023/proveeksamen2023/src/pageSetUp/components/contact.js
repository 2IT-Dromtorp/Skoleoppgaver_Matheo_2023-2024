import '../../css/contact.css'

function Contact({name, text, number, mail, image}) {

    return (
        <div className="contact-main">
            <div className="contact-picture">
                <div className="contact-picture-upper">
                    <img src={image} alt=""/>
                </div>
            </div>
            <div className="contact-info">
                <div className="contact-picture-lower">
                    <p>{name}</p>
                </div>
                <div className="contact-info-text">
                    <p>{text}</p>
                </div>
                <div className="contact-mail-phone">
                    <p>Send en mail til <a href={`mailto:${1+1}`}>{mail}</a></p>
                    <p>Send meg en melding, eller ring, på <a href={`tel:${number}`}>{number}</a></p>
                </div>
            </div>
        </div>
    );
}

export default Contact;