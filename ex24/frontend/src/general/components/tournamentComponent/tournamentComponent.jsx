import './tournament.css';

import Leader from "../leader/leader"

export default function TournamentComponent({ name, place, date, sport, responsible }) {

    return (
        <div className='tournament-component-main'>
            <div className='tournament-component-main-info'>
                <h1>{sport}</h1>
                <h2>{name}</h2>
                <p>{date}</p>
                <p>{place}</p>
            </div>

            <p className='tournament-component-leader-info'>Spørsmål eller kommentarer? Kontakt:</p>
            <Leader name={responsible.name} phone={responsible.phone} email={responsible.email}/>

        </div>
    )
}