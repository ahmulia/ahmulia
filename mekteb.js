const wordText = document.querySelector('.word');
const hintText = document.querySelector('.text span');
const timeText = document.querySelector('.time b');
const inputField = document.querySelector('input');
const button = document.querySelector('.hint');
const refreshBtn = document.querySelector('.refresh-word');
const checkBtn = document.querySelector('.check-word');
const clock = document.querySelector('.clock');
const lastsec = document.getElementById('lastSeconds');
let correctWord, timer;
let score = document.querySelector('.score b');
let scoreNumber = 0;
let point = 0;
let promijeniRijec = 0;
let background_sound = document.getElementById('background_sound');
let soundOn = document.querySelector('.sound_on');
let soundPause = document.querySelector ('.sound_off');
let body = document.querySelector('.main_container');

window.onload = () => {
  play_sound();
};


const initTimer = maxTime => {
  clearInterval(timer);
    timer = setInterval(() => {
      if(maxTime > 0) {
        maxTime--;
        if ( maxTime < 5 && maxTime >= 1) {
          lastsec.play();
          
          document.body.appendChild(clock);
        }
      
       return timeText.innerText = maxTime;

      }
     
      else {
      lastSeconds.pause();
      clearInterval(timer);
      clock.remove();
      document.getElementById('timesUp').play();
      alert(`Vrijeme je isteklo!! ${correctWord.toUpperCase()} je ispravan odgovor`);
      score.innerHTML= 0;
    }
      initGame();
    }, 1000);
    
}


const initGame = () => {
  if(promijeniRijec>=3){
    greyOutBtn();
  }else {
    buttonBack();
  }
  clock.remove();
  document.body.appendChild(button);
  hideHint();
  initTimer(12);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]; 

  }
  
  wordText.innerText = wordArray.join('');
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = '';
  inputField.setAttribute ('maxlength', correctWord.length);


}

initGame();




const checkWord = () => {

  let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) {
        return alert('Molimo unesite rijec');
      
    }

    if (userWord == correctWord) {

      if(promijeniRijec>=3){
        greyOutBtn();
      }   
      document.getElementById('lastSeconds').pause();
      document.getElementById('correct').play();
      alert(`Cestitamo! ${userWord.toUpperCase()} je ispravna rijec! ` );
      let point = ++scoreNumber; 
      score.innerHTML = point;     
      if (point = 10){

      }
      }

    else  {
      buttonBack(); 
      document.getElementById('lastSeconds').pause();
      document.getElementById('incorrect').play();
      alert(`Uups! ${userWord} nije ispravna rijec`);
      score.innerHTML= 0;
      promijeniRijec=0;
    
      }
      hideHint();
      initGame();
    }
    
   

    


function playInc() {
  let audio2 = new Audio('wrong_answer.mp3');
  audio2.play();
  
}
function playtimesup() {
  let audio3 = new Audio('times_up.mp3');
  audio3.play()
}
 function playCor() {
  let audio = new Audio('Rabbi_zidni.mp3');
  audio.play();
  
}

button.addEventListener('click', ()=>{
  button.remove();
});

function showHint() {
let text = document.querySelector('.text');
text.style.display= 'block' ;
}

function hideHint() {
  let text = document.querySelector('.text');
  text.style.display='none' ;
}

const greyOutBtn = () => {
  ++promijeniRijec;
  console.log(promijeniRijec);
  if (promijeniRijec>=3)  {
  refreshBtn.disabled = true;
  refreshBtn.style.background = 'gray';
  }

  }
  
function buttonBack() {
  refreshBtn.disabled = false;
  refreshBtn.style.background = 'green';
}

function play_sound() {
background_sound.volume = 0.05 ;
background_sound.play();

}
function soundOff(){
background_sound.pause();
soundOn.remove();
}

function soundGo () {
background_sound.play();
document.body.appendChild(soundOn)
}
function stopTicking () {
   lastsec.pause();
}

refreshBtn.addEventListener('click', initGame);
refreshBtn.addEventListener('click', greyOutBtn);
refreshBtn.addEventListener('click', stopTicking();
checkBtn.addEventListener('click', checkWord);



