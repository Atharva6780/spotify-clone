console.log("hello world!");

let songindex=0;
let audioElement = new Audio('1.mp3');
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitem=Array.from(document.getElementsByClassName('songitem'));

let songs=[
    {songname:"rolex",filepath:"songs/1.mp3",coverpath:"1.jpg"},
    {songname:"let",filepath:"songs/2.mp3",coverpath:"2.jpg"},
    {songname:"me",filepath:"songs/3.mp3",coverpath:"3.jpg"},
    {songname:"love",filepath:"songs/4.mp3",coverpath:"4.jpg"},
    {songname:"you",filepath:"songs/5.mp3",coverpath:"5.jpg"},
    {songname:"baby",filepath:"songs/7.mp3",coverpath:"6.jpg"},
];

songitem.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname; 
})

masterplay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', ()=>{
    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressbar.value=progress;
})

myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressbar.value * audioElement.duration/100;
})

const makeallplays=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallplays();
        songindex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songindex+1}.mp3`;
        masterSongName.innerText = songs[songindex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=6){
        songindex = 0
    }
    else{
        songindex += 1;
    }
    audioElement.src = `${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex = 0
    }
    else{
        songindex -= 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})