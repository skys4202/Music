const play = document.querySelector('#play-button');
const next = document.querySelector('#next-button');
const last = document.querySelector('#last-button');
const trackImage = document.querySelector('.music-cover');
const trackTitle = document.querySelector('.music-h2');
const trackArtlist = document.querySelector('.music-p');
const audio = new Audio();

const volumeSlider = document.querySelector('#volume-slider');
const progressBar = document.querySelector('#progress-bar');
const currentTimeDisplay = document.querySelector('#current-time');
const durationDisplay = document.querySelector('#duration');


const playlist = [
    { title: "안녕 나의 슬픔", artlist: "QWER", src: "music/안녕나의슬픔.mp3", image:"image/qwer.jpg"},
    { title: "고민중독", artlist: "QWER", src: "music/고민중독.mp3", image:"image/고민중독.jpg"},
    { title: "청춘만화", artlist: "이무진", src: "music/청춘만화.mp3", image:"image/청춘만화.jpg"},
    { title: "에피소드", artlist: "이무진", src: "music/에피소드.mp3", image:"image/에피소드.jpg"},
    { title: "한 페이지가 될 수 있게", artlist: "DAY6", src: "music/한페이지가될수있게.mp3", image:"image/한페이지가될수있게.jpg"}
    ];
 


// 트랙로드
function loadTrack(index) {
    audio.src = playlist[index].src;
    audio.load();
    durationDisplay.textContent = formatTime(audio.duration);
    trackTitle.textContent = playlist[index].title;
    trackImage.src = playlist[index].image; 
    trackArtlist.textContent = playlist[index].artlist;
    
}

let currentTrackIndex = 0;   
loadTrack(currentTrackIndex);


play.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        play.querySelector('i').classList.remove('fa-play');
        play.querySelector('i').classList.add('fa-pause');
    } else {
        audio.pause();
        play.querySelector('i').classList.remove('fa-pause');
        play.querySelector('i').classList.add('fa-play');
    }
});



next.addEventListener('click', function() {
    if(currentTrackIndex < 4){
        currentTrackIndex++;
    }else{
        currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
    audio.play(); 
});


last.addEventListener('click', function() {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
    audio.play(); 
});



// 소리볼륨
audio.volume = volumeSlider.value;

volumeSlider.addEventListener('input', function() {
    audio.volume = volumeSlider.value;
});



audio.addEventListener('loadedmetadata', function() {
    durationDisplay.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
});

// 오디오의 현재 시간 업데이트
audio.addEventListener('timeupdate', function() {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    progressBar.value = audio.currentTime;
});

// 진행 바 클릭 시 오디오 시간 조절
progressBar.addEventListener('input', function() {
    audio.currentTime = progressBar.value;
});

// 시간 포맷팅 함수
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}



