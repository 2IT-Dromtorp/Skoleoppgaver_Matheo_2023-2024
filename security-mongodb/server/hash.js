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

        console.log(preHashString)

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
    const input = "PappaErKul"
    console.log(changeBinary(input))
    // const hashedPass = '12$mhj$fdiUhQfMyrMuPV99UTqnx74NGNJvWT4Y876sEPAW$VNBFDowJ0fcRITNTDK3n13UWLirdUbkR'
    // const hash = HashString(input,12);
    // console.log(hash)
    // console.log(Compare(hashedPass, input));
}

function changeBinary(fullString){
    const bitsLong = 512;
    let binaryString = "";
    for(let i = 0; i<fullString.length;i++){
        binaryString += fullString[i].charCodeAt(0).toString(2);
    }
    let arrayOfBitBoxes = [];
    for(let i = 0; i<binaryString.length; i+=bitsLong){
        arrayOfBitBoxes.push(binaryString.substring(i, i+bitsLong));
    }

    if(arrayOfBitBoxes[arrayOfBitBoxes.length-1].length<bitsLong){
        const lengthToGet = bitsLong-arrayOfBitBoxes[arrayOfBitBoxes.length-1].length;
        for(let i = 0; i<lengthToGet;i++){
            arrayOfBitBoxes[arrayOfBitBoxes.length-1]+="0";
        }
    }

    let bitStringAfterXor = "";
    for(let i = 0; i<arrayOfBitBoxes.length;i++){
        if(i===0){
            bitStringAfterXor=BigInt(parseInt(arrayOfBitBoxes[i], 2));
            continue;
        }
        bitStringAfterXor = bitStringAfterXor ^ BigInt(parseInt(arrayOfBitBoxes[i], 2));

    }
    
    return numToText(bitStringAfterXor, 62n);
}

a();

module.exports = {Compare, HashString};