const dataSet = "GAL? JEG VAR GAL EN GANG. DE STENGTE MEG I ET ROM, ET GUMMIROM, ET GUMMIROM MED ROTTER, OG ROTTER GJØR MEG GAL!"

const splitDataSet = dataSet.split(" ")

let resultsData = 0

for (let i = 0; i < splitDataSet.length; i++){
    const currentWord = splitDataSet[i];
    let currentWordValue = 0;
    for (let j = 0; j<currentWord.length; j++){
        currentWordValue += currentWord[j].charCodeAt(0);
        currentWordValue *= 7;
        currentWordValue %= 256;
    }
    resultsData+=currentWordValue;
}

console.log(resultsData);