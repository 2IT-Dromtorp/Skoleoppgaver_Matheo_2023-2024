# Table of contents
- [Introduction](#introduction)
- [Installations](#installations)
- [Key functions](#key-functions)
- [Licenses](#licenses)

## Introduction

This projects is used for playing Blackjack, and that is it's sole purpose
It's specificcaly designed for Blackjack, but could with a few tweaks be used for other card-games

To be able to use any of these packets you first need to [download and install Node.js](https://nodejs.org/en/download/).

All installations is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
    $ npm install
```

or

```sh
    $ npm i
```

In our examples we will use:
```sh
    $ npm install
```

## Installations

In this project we use:
|Packet|Link|
|---|---|
|Socket.io|(https://www.npmjs.com/package/socket.io)|
|MongoDB|(https://www.npmjs.com/package/mongodb)|

## Key functions

### findValueOfCard
findValueOfCard is used to find the value of a card
```js
    function findValueOfCard(cardInHand){ //cardInHand is one card object from the hand
        const arrayOfTypesNotNumbers = ["QUEEN", "KING", "JACK"] //Here I define all the values a card can have that is not a number, but equal to 10
        if(arrayOfTypesNotNumbers.includes(cardInHand.value)) return 10; //If the value of the card is in that array, it returns the number 10
        else if(cardInHand.value === "ACE") return 11; //If the value is ACE returns 11
        const valueIntParsed = parseInt(cardInHand.value); //If its not one of those it gets turnt into a number
        if (!valueIntParsed) return; //If its undefined its not a valid card, and the function will return nothing
        return valueIntParsed; //If it gets parsed correctly the function returns the number
    }
```

### addCardsTogether
The following function is used to add together the hand of a player, from cards to a number, using [findValueOfCard](#findvalueofcard)
```js
    function addCardsTogether(player){ //The parameter is named player, and is an array containing the card objects
        let playersHandarray = []
        let playersHandAddedTogether = 0
        for(let j = 0; j<player.cards.length; j++){
            playersHandarray.push(findValueOfCard(player.cards[j])); //It pushes the number returned from the function into an array
            playersHandAddedTogether += findValueOfCard(player.cards[j]) //And adds it to the toltal
        }

        while(true){ //After the array and total are defined, the code is checking of it can/should be set to a smaller number
            if(playersHandAddedTogether>21&&playersHandarray.includes(11)){ //If the player has busted, and the array includes a 11
                playersHandarray[playersHandarray.findIndex(x => x === 11)] = 1 //The 11 gets set to 1
                playersHandAddedTogether -= 10 //And the total gets set to 10 less
            } else { //This repeats until the condition is not true anymore, and then breaks
                break; 
            }
        }
        return playersHandAddedTogether; //The total gets returned
    }  
```
### findNextPlayerYetToLose
findNextPlayerYetToLose is used each time a player has finished it turn. It basically checks through the array, and finds the next player that is eligeble to play

```js
    function findNextPlayerThatIsYetToLose(players, thisPlayersIndex){ //The paramerters are the array with all the players, and the index of the player that took the last turn
        for(let i = thisPlayersIndex+1; i<players.length; i++){
            if(players[i].money>0) return {nextLevel:false, name:players[i].name} //It goes through the player-array, starting on the next player in the array, and if that player has more money than 0, it sends in the name of the new player, and that it should not go to next lvl
        }
        for(let i = 0; i<players.length; i++){
            if(players[i].money>0) return {nextLevel:true, name:players[i].name}//It goes through the player-array, startingat the start, and if that player has more money than 0, it sends in the name of the new player, and that it should go to next lvl
        }
    }
```

## Licenses 

### MIT LICENSE
