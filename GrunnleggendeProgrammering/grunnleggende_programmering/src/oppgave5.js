import React, { useState } from 'react';

export default function Oppgave3() {
    let answer;
    let n1 = 10000000
    let n2 = 0

    function nextQ(){
        let number = ((n1-n2)/2)+n2
        number = Math.ceil(number)
        answer = prompt(`Is ${number} the number?`);
        if(answer==="h"){
            n2 = number+1
        }
        else if(answer==="l"){
            n1 = number-1
        }
        else if(answer==="y"){
            alert("Jeg vant! Du er dum!")
        }
        else{
            alert("Stupid pupuu")
        }
        console.log(n1+" "+n2)
    }

      return (
        <>
        <h1>
          Oppgave 5
        </h1>
        <button onClick={nextQ}>Click me</button>
        </>
      );
} 