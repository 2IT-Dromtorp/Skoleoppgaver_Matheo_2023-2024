const dataSet = "234,34,876,1,999,435,234,874,126,645\n[213-3-22,888-110-745,3-200-175]\n[1-500-200,723-115-1,998-2-900]\n[511-278-677,1-15-2,782-102-324]"

// const dataSet = "10,2,5\n[5-2-7,2-1-9]\n[1-6-2,7-4-1]"

const splitDataSet = dataSet.split("\n");

const resultData = [];

let dataToBeDecrypted = splitDataSet[0].split(",");
for (let i = 0; i < dataToBeDecrypted.length; i++) {
    let currentData = parseInt(dataToBeDecrypted[i]);
    if (currentData===undefined) continue;
    for (let j = 1; j < splitDataSet.length; j++) {
        const currentRow = splitDataSet[j];
        const currentRowWithoutBrackets = currentRow.replace("[", "").replace("]","");
        const currentRowSplit =  currentRowWithoutBrackets.split(",");
        for(let k = 0; k<currentRowSplit.length; k++){
            const cryptData = currentRowSplit[k].split("-");
            const startNumber = parseInt(cryptData[0]);
            const range = parseInt(cryptData[1]);
            const transit =  parseInt(cryptData[2]);
            if (startNumber===undefined||range===undefined||transit===undefined) continue;
            if(currentData>=startNumber&&currentData<startNumber+range){
                currentData = transit+(currentData-startNumber);
                break;
            }
        }
    }
    resultData.push(currentData);
}

let result = 0;

for(let i = 0; i<resultData.length;i++){
    result+=resultData[i];
}

console.log(result * 10);