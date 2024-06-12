import './tournament.css';

import Leader from "../leader/leader"

export default function TournamentComponent({ name, place, date, sport, responsible }) {

    return (
        <div className='tournament-component-main'>
            <div className='tournament-component-main-info'>
                <h1>{name}</h1>
                <h2>{sport}</h2>
                <p>{date}</p>
                <p>{place}</p>
            </div>

            <p>Spørsmål eller kommentarer? Kontakt:</p>
            <Leader name={responsible.name} phone={responsible.phone} email={responsible.email}/>

        </div>
    )
}