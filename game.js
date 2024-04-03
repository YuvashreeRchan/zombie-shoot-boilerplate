// Iteration 1: Declare variables required for this game

let gameBody =document.getElementById("game-body");
let $lives = document.getElementById("lives");

const images=[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
]

let timerDisplay = document.getElementById("timer");
let seconds = 60; 
let zombieId =0;

// Iteration 1.2: Add shotgun sound

const shotgunAudio= new Audio("./assets/shotgun.wav")
shotgunAudio.volume =0.3;

gameBody.onclick=()=>{
    shotgunAudio.pause();
    shotgunAudio.currentTime=0;
    shotgunAudio.play();
}
// Iteration 1.3: Add background sound
let backgroundSound =new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop=true;

// Iteration 1.4: Add lives

let lives=4;
// Iteration 2: Write a function to make a zombie
function makeZombie(zombieId){

    let zombieImg = document.createElement("img");
    let randIndex = Math.floor(Math.random()*images.length);
    zombieImg.src=`./assets/${images[randIndex]}`;
    zombieImg.classList.add("zombie-image");
    zombieImg.setAttribute("id",`zombie-${zombieId}`);
    document.body.append(zombieImg);
    
    let randLeft=generateRand(20,80);
    zombieImg.style.left=`${randLeft}vw`;
    zombieImg.onclick=()=>{
        destructZombie(zombieImg);
    };
    zombieId++;

}

// Iteration 3: Write a function to check if the player missed a zombie

function checkCollision(zombie){
    if(zombie.getBoundingClientRect().top<=0)
    {
        lives--;
        return true;
    }else{
        return false;
    }
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destructZombie(zombie){
    zombie.style.display="none";
    zombieId++;
    makeZombie(zombieId);

}
// Iteration 5: Creating timer

function updateTimer() {
    timerDisplay.textContent = seconds;
}

let timer= setInterval(function(){
    seconds--;
    updateTimer();

    let zombie = document.getElementById(`zombie-${zombieId}`);
    if(checkCollision(zombie)){
        destructZombie(zombie);
    }
    if (seconds<=0){
        clearInterval(timer);
        location.href="./win.html";
    }
    if(lives===0){
        clearInterval(timer);
        location.href="./game-over.html";
        }
    },1000);
// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie(zombieId);

// Iteration 7: Write the helper function to get random integer

function generateRand(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min)+min);
}