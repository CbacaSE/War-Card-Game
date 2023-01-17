let deckId = ''

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

const playerOne = document.querySelector('#player1Card')
const playerTwo = document.querySelector('#player2Card')
const draw = document.querySelector('#drawCard')
// const winnerResults = document.querySelectorAll('.result')
// Array.from(winnerResults).forEach(element => element.addEventListener('click', defineResult))

// function defineResult(click){
//   if(click.target.classList.contains('hidden')){
//     document.querySelector('#player1Card').classList.toggle('hidden')
//   }else if(click.target.classList.contains('hidden')){
//     document.querySelector('#player2Card').classList.toggle('hidden')
//   }else{
//     document.querySelector('#drawCard').classList.toggle('hidden')
//   }
// }

document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image 
        document.querySelector('#player2').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if(player1Val > player2Val){
          document.querySelector('#player1Card').innerText = 'PLAYER 1 WINS '
          document.querySelector('#player1Card').classList.toggle('hidden')
          document.querySelector('#player2Card').classList.add('hidden')
          document.querySelector('#drawCard').classList.add('hidden')
          
        }else if(player1Val < player2Val){
          document.querySelector('#player2Card').innerText = 'PLAYER 2 WINS '
          document.querySelector('#player2Card').classList.toggle('hidden')
          document.querySelector('#player1Card').classList.add('hidden')
          document.querySelector('#drawCard').classList.add('hidden')

        }else{
          document.querySelector('#drawCard').innerText = 'Time for War!'
          document.querySelector('#drawCard').classList.toggle('hidden')
          document.querySelector('#player2Card').classList.add('hidden')
          document.querySelector('#player1Card').classList.add('hidden')
        }

        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}

let warIn = document.querySelector('.war').addEventListener('mouseover', warHover);
let warOut = document.querySelector('.war').addEventListener('mouseout', warExit);

function warHover(){
  document.querySelector('.war').style.color = "red";

}

function warExit() {
  document.querySelector('.war').style.color = 'black';
}