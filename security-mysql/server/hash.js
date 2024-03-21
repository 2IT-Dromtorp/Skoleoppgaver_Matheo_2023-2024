function HashString(stringToBeHashed, saltFromCompare){
    const saltLength = 15
    const rounds =  1000
    const salt = saltFromCompare||createSalt(saltLength);
    let preHashString = stringToBeHashed + salt
    for(let j = 0; j<rounds;j++){
        let addedTogetherValueString = ""
        for(let i = 0; i<preHashString.length;i++){
            const ran1 = (i%3===0) ? 1*17 : 1 
            const ran2 = (i+1%5===0) ? 2*ran1 : 2
            const ran3 = (Math.round(preHashString[i].charCodeAt(0)*3/2)%((i*i)+1)===0) ? ran1*ran2*preHashString[Math.round(preHashString.length/2)].charCodeAt(0) : preHashString[Math.round(preHashString.length/2)].charCodeAt(0)

            const value = preHashString[i].charCodeAt(0) * ran1 * ran2 *ran3
            const valueAfter = bytesToText(binaryToByte(((value>>>0).toString(2)))).join('');
            addedTogetherValueString += valueAfter
            if (addedTogetherValueString.length>(100-6-saltLength)) break;
        }
        
        preHashString = addedTogetherValueString
    }

    return `$mhj$${salt}$${preHashString}`;
}

function createSalt(numberOfLetters){
    let salt = ""
    const min = 46
    const max = 123
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
        arrayOfBytes.push(arrayOfChars.slice(i, i+8).join(""))
    }
    return arrayOfBytes
}

function bytesToText(arrayOfBytes){
    const arrayOfLetters = []
    for(let i = 0; i<arrayOfBytes.length; i++){   
        if(arrayOfBytes[i].length>5){
            let int = parseInt(arrayOfBytes[i], 2)
            while(int > 122 || int < 46||int===96||int===92){
                if(int>122) int-=86;
                if(int<46) int+=46
                if(int===96) int +=15
                if(int===92) int -=15
            }
            if(int===96) console.log(int)
            arrayOfLetters.push(String.fromCharCode(int))
        }
    }
    return arrayOfLetters;
}

function Compare(cryptated, input){
    const splitHash = cryptated.split("$");
    const salt = splitHash[2];
    const hashedString = HashString(input,salt);
    return cryptated===hashedString;
}

function a(){
    const input = "a"
    const hash = HashString(input);
    console.log(hash)
    console.log(Compare('gare', input));
}

a();

module.exports = {Compare, HashString};