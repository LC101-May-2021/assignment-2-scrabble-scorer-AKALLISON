//const scorer = require('./scrabble-scorer');

const input = require('readline-sync');
const oldPointGenerator = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
  10: ['Q', 'Z']
};

let scoringAlgorithms = [
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoreFunction: scrabbleScore
  },
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoreFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoreFunction: bonusVowels
  }
];

function initialPrompt(){
console.log(`Welcome to the Scrabble score calculator!

Which scoring algorithm would you like to use?

0 - Scrabble: The traditional scoring algorithm.
1 - Simple Score: Each letter is worth 1 point.
2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.
`);

let playerInput = Number(input.question("Enter 0, 1, or 2: "));
return playerInput;
}

function transformPointStructure (objIntake){
let newPointGenerator = {}; 

for(key in objIntake){
  for(i = 0; i < objIntake[key].length; i++){
    
   newPointGenerator[objIntake[key][i].toLowerCase()] = Number(key);
  
  }
   
}
return newPointGenerator;
}

function simpleScore(wordInput){
let score = 0; 
for(i = 0; i < wordInput.length; i++)
score += 1;

return score;
}

function bonusVowels(wordInput){
let score = 0;
let arrayVal = ['a', 'e', 'i', 'o', 'u'];

for (i = 0; i < wordInput.length; i++){
 if (arrayVal.includes(wordInput[i])){
    score += 3;        
  }else{
    score += 1;
  }
     
   }
 return score;
}


function scrabbleScore (wordInput,objIntake){

let score = 0;
for (i = 0; i < wordInput.length; i++){             
 score += objIntake[wordInput[i]]
  }
 return score;
}

function runProgram(scoringAlgorithms){
let val = initialPrompt();


let newPointStructure = transformPointStructure(oldPointGenerator)


let scorer = scoringAlgorithms[val];
  
let word = '';
  console.log(`Using algorithm: ${scorer.name}\n`);

 /*while(word.toLowerCase() !== "stop") {
     word = input.question("Enter a word to be scored, or 'Stop' to quit: ");*/
     word = input.question("Enter a word to be scored. ");
     let score = scorer.scoreFunction(word, newPointStructure);
    console.log(`Score for '${word}': ${score}\n`);
 // }

}
runProgram(scoringAlgorithms);

scorer.runProgram();