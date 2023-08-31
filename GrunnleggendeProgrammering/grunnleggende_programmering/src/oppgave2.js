import React, { useState } from 'react';

export default function Oppgave2() {
    const [inputValue1, setInputValue1] = useState('1');
    const [inputValue2, setInputValue2] = useState('1');
    function InputComponent() {   
        const handleInputChange1 = (event) => {
            setInputValue1(event.target.value);
        };
        const handleInputChange2 = (event) => {
            setInputValue2(event.target.value);
          };
      
        return (
          <div>
            <input
              type="text"
              value={inputValue1}
              onChange={handleInputChange1}
            />
            <input
              type="text"
              value={inputValue2}
              onChange={handleInputChange2}
            />
          </div>
        );
      }
    function firkantAreal(firkantL1, firkantL2){
        firkantL1 = parseFloat(firkantL1);
        firkantL2 = parseFloat(firkantL2);
        return (
            firkantL1 * firkantL2
        );
    }

    function trekantAreal(trekantLengde, trekantHoyde){
        return (
            (trekantLengde * trekantHoyde) / 2
        );
    }
      return (
        <>
        <h1>
          Oppgave 2
        </h1>
          <p>
                a. Lengde 1 er 8, lengde 2 er 8 <br></br>
                {firkantAreal(8,8)}
          </p>
          <p>
                b. Lengde 1 er 8, lengde 2 er 8 <br></br>
                {trekantAreal(8,8)}
          </p>
          <p>
            c. <InputComponent/> <br></br>
            Arealet av firkanten er {firkantAreal(inputValue1, inputValue2)} <br></br>
            Arealet av trekanten er {trekantAreal(inputValue1, inputValue2)}
          </p>
        </>
      );
    } 