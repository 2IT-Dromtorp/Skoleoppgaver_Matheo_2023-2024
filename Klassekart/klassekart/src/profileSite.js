import React, { PureComponent, useState } from 'react';
import {Pupils} from './pupilsJSON'
export default function Profil({person, update}) {
    let studentIndex;

    const handleClick = () => {
        update();
    };



    for (let index = 0; index < Pupils.length; index++) {
        if(Pupils[index].firstname==person){
            studentIndex = index
        }
        
    }

        return(
            <>
            <button onClick={handleClick}>Gå Tilbake</button>
                <h1>
                    {Pupils[studentIndex].firstname + " " + Pupils[studentIndex].lastname}
                </h1>
                <p>
                    {Pupils[studentIndex].email}
                </p>
                <p>
                    Klasse: {Pupils[studentIndex].klasse} <br></br> Fellesfag(Norsk og Gym): {Pupils[studentIndex].fellesfagng} <br></br> Fellesfag(Samfunnsfag): {Pupils[studentIndex].fellesfags}
                </p>
            </>
        );
        
    } 