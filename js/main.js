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

        document.querySelector('#player1Card').innerText = ''
        document.querySelector('#player2Card').innerText = ''
        document.querySelector('#drawCard').innerText = ''

        if(player1Val > player2Val){
          document.querySelector('#player1Card').innerText = 'Player 1 wins! '

        }else if(player1Val < player2Val){
          document.querySelector('#player2Card').innerText = 'Player 2 wins! '

        }else{
          document.querySelector('#drawCard').innerText = 'Time for War! '
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


//Just practicing some Javascript with this case below:
let warIn = document.querySelector('.war').addEventListener('mouseover', warHover);
let warOut = document.querySelector('.war').addEventListener('mouseout', warExit);

function warHover(){
  document.querySelector('.war').style.color = "red";

}

function warExit() {
  document.querySelector('.war').style.color = 'black';
}