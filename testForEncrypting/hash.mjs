function HashString(stringToBeHashed, rounds, saltFromCompare){
    const salt = saltFromCompare||createSalt(7);
    let preHashString = stringToBeHashed + salt
    for(let j = 0; j<rounds;j++){
        let addedTogetherValueString = ""
        for(let i = 0; i<preHashString.length;i++){
            const ran1 = (i%3===0) ? 1*17 : 1 
            const ran2 = (i+1%5===0) ? 2*ran1 : 2
            const ran3 = (Math.round(preHashString[i].charCodeAt(0)*3/2)%((i*i)+1)===0) ? ran1*ran2*preHashString[Math.round(preHashString.length/2)].charCodeAt(0) : preHashString[Math.round(preHashString.length/2)].charCodeAt(0)

            const value = preHashString[i].charCodeAt(0) * ran1 * ran2 *ran3
            addedTogetherValueString += ((value>>>0).toString(2));
        }
        preHashString = addedTogetherValueString
    }
    const arrayOfLetters = bytesToText(binaryToByte(preHashString));
    return {hash:arrayOfLetters.join(''),salt:salt};
}

function createSalt(numberOfLetters){
    let salt = ""
    const min = 33
    const max = 127
    for(let i=0;i<numberOfLetters; i++){
        const randomNumber = Math.random() * (max-min) + min
        salt += String.fromCharCode(randomNumber)
    }
    return salt;
}

function binaryToByte(fullBinaryText){
    const arrayOfChars = Array.from(fullBinaryText);
    const arrayOfBytes = []
    for(let i = 0; i<arrayOfChars.length;i+=8){
        arrayOfBytes.push(arrayOfChars.slice(i, i+7).join(""))
    }
    return arrayOfBytes
}

function bytesToText(arrayOfBytes){
    const arrayOfLetters = []
    for(let i = 0; i<arrayOfBytes.length; i++){
        if(parseInt(arrayOfBytes[i], 2)<33){
            arrayOfLetters.push(String.fromCharCode(parseInt(arrayOfBytes[i], 2)+33))
            continue
        }else if(parseInt(arrayOfBytes[i], 2)>126){
            arrayOfLetters.push(String.fromCharCode(parseInt(arrayOfBytes[i], 2)-94))
            continue
        }
        arrayOfLetters.push(String.fromCharCode(parseInt(arrayOfBytes[i], 2)))
    }
    return arrayOfLetters;
}

export function Compare(cryptatedStringDB, input, rounds, salt){
    const saltFromFront = salt || 0 
    return cryptatedStringDB===HashString(input,rounds,saltFromFront).hash;
}

function a(){
    const rounds = 1
    const input = "falk"
    console.log(HashString(input, rounds).hash);
    console.log(Compare('hash', input, rounds, 0));
}

a();