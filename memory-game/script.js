const cards = document.querySelectorAll(".memory-card")
let flippedCard = false; // setting it to false since no one has clicked anything when we first start
let card1,card2;
let lockBoard = false // add a variable to lock the board  when we click on 2 cards that are not a match

function cardFlip(){
  if(lockBoard) return;  
  if(this === card1) return;  // to make sure we cant double click a card and keep it unflipped

   this.classList.add('flip')   // had to use this because if event.target was used it would of added class flip to the front class not the whole memory-card class
  
   if(!flippedCard){
    flippedCard = true; // Update the state to indicate one card has been flipped
    card1 = this;  // storing what the first card clicked was 
   }
   else{
  card2 = this;  // storing second card
  
    checkForMatch();   // moved the whole if else to a function alone called checkforMatch
   } 
}

function checkForMatch(){
  if(card1.dataset.frame === card2.dataset.frame){
    disableCards();
  }
  else{
    unFlip()
  } 

}

function disableCards(){
  card1.removeEventListener('click',cardFlip);
  card2.removeEventListener('click',cardFlip);
  resetBoard();  // reset the board if both cards have the same image
}

function unFlip(){
  lockBoard = true;
 
  setTimeout(function(){
    card1.classList.remove('flip');
    card2.classList.remove('flip');
    resetBoard();   // reseting the board after 2 cards clicked are not equal
  },1000);
}

function resetBoard(){  // adding a reset board function
  flippedCard = false;
  lockBoard = false;
  card1 =null;
  card2 = null;
  

    }

    (function shuffle(){   // Shuffle function from Code Sketch 
 cards.forEach(card => {
  let randomPos = Math.floor(Math.random()*12)  // random number between 1 and 12
   card.style.order = randomPos;   // card.style.order is where the image is ordered in the div so we use
 });
    })();    // IIFE is wrapping a function in (  and )() meaning the function will be executed right after its definition so we can reset the shuffle everytime we start
cards.forEach(card => card.addEventListener('click',cardFlip))

document.querySelector('.restart-btn').addEventListener('click', function(){
  location.reload()
});

