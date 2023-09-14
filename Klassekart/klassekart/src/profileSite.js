import './App.css';
import {Pupils} from './pupilsJSON'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function Profil() {
    const navigate = useNavigate();
    let { elevNavn } = useParams()

    let studentIndex;

 
    for (let index = 0; index < Pupils.length; index++) {
        if(Pupils[index].firstname==elevNavn){
            studentIndex = index
        }
        
    }

        return(
            <div className="App">
                <header className="App-header">
                    <button button onClick={() => navigate(-1)}>Gå Tilbake</button>

                    <h1>
                        {Pupils[studentIndex].firstname + " " + Pupils[studentIndex].lastname}
                    </h1>
                    <p>
                        {Pupils[studentIndex].email}
                    </p>
                    <p>
                        Klasse: {Pupils[studentIndex].klasse} <br></br> Fellesfag(Norsk og Gym): {Pupils[studentIndex].fellesfagng} <br></br> Fellesfag(Samfunnsfag): {Pupils[studentIndex].fellesfags}
                    </p>
                </header>
            </div>
        );
        
    } 