import React, { PureComponent, useState } from 'react';

export default function Profil({person, oppdater}) {
    const pupils = [
        { firstname: 'Ahmad', lastname: "Murtaza Zahid", email: "ahmadza@viken.no"},
        { firstname: 'Elias', lastname: "Høgran Godager", email: "eliasgod@viken.no"},
        { firstname: 'Vetle', lastname: "Fongen", email: "vetlefon@viken.no"},
        { firstname: 'Kristoffer', lastname: "Bekkevold", email: "kristofbek@viken.no"},
        { firstname: 'Johannes', lastname: "Herman Rebård Evensen", email: "johanneeve@viken.no"},
        { firstname: 'Matheo', lastname: "Kant Pangopoulos", email: "matheop@viken.no"},
        { firstname: 'Axel', lastname: "Sequeida Sandbakken", email: "axelsan@viken.no"},
        { firstname: 'Gabriel', lastname: "Karisari Ueland", email: "gabrielu@viken.no"},
        { firstname: 'Philip', lastname: "Beyer", email: "philipbey@viken.no"},
        { firstname: 'Andreas', lastname: "Murtaza Zahid", email: "ahmadza@viken.no"},
        { firstname: 'Mattis', lastname: "Høgran Godager", email: "eliasgod@viken.no"},
        { firstname: 'Theodor', lastname: "Fongen", email: "vetlefon@viken.no"},
        { firstname: 'Silas', lastname: "Høgran Godager", email: "eliasgod@viken.no"},
        { firstname: 'Alva', lastname: "Fongen", email: "vetlefon@viken.no"},
    ];

    const handleClick = () => {
        oppdater();
    };

    for (let index = 0; index < pupils.length; index++) {
        console.log(index)
        if (person===pupils[index].firstname) {
            return(
                <>
                <button onClick={handleClick}>Gå Tilbake</button>
                    <h1>
                        {pupils[index].firstname + " " + pupils[index].lastname}
                    </h1>
                    <p>
                        {pupils[index].email}
                    </p>
                </>
            );
        };
    };
    } 