const crypto = require('crypto')

function HashString(stringToBeHashed, rounds, saltFromCompare){
    const saltLength = 40
    const salt = saltFromCompare||createSalt(saltLength);
    let preHashString = stringToBeHashed
    for(let j = 0; j<rounds;j++){
        preHashString += salt
        preHashString = binaryShift(preHashString);

        for(let f = 0; f<1000;f++){
            const evenArray = []
            const oddArray = []
            for(let i= 0; i<preHashString.length; i++){
                if(i%2===0) evenArray.push(preHashString[i])
                else oddArray.push(preHashString[i])
            }
            preHashString = oddArray.join("")+evenArray.join("");
        }

        preHashString = preHashString.slice(0,32);
    }

    return `${rounds}$mhj$${salt}$${preHashString}`;
}

function binaryShift(fullString){
    let binaryString = "";
    for(let i = 0; i<fullString.length;i++){
        binaryString += fullString[i].charCodeAt(0).toString(2);
    }
    return numToText(BigInt(binaryString), 62n);
}

function numToText(number, length){
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";

    let result = ''
    let newNumber = number;

    while(newNumber>0){
        const reminder = newNumber%length;
        result = characters[reminder] + result;
        newNumber = (newNumber - reminder) / length;
    }

    return result;
}

function createSalt(numberOfLetters){
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";

    let salt = ""
    for(let i=0;i<numberOfLetters; i++){
        const randomNumber = crypto.randomInt(63)

        salt += characters[randomNumber];
    }
    return salt;
}

function Compare(cryptated, input){
    const splitHash = cryptated.split("$");
    const salt = splitHash[2];
    const rounds = splitHash[0];
    const hashedString = HashString(input,rounds,salt);
    return cryptated===hashedString;
}

function a(){
    const input = "Troya Elise Huse-Fagerlid"
    const hashedPass = '12$mhj$Bu1pKM5rj1jnNSeUZbqADr477VRSXPZbcHovAh84$5ewJzN68xYKKB2WV6cwPcJIin60dW0zX'
    const hash = HashString(input,12);
    console.log(hash)
    console.log(Compare(hashedPass, input));
}

a();

module.exports = {Compare, HashString};