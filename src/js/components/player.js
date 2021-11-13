function videoPlayer() {
  const playerWrapper = document.querySelector('.player');
  const playerVideo = document.querySelector('.player__video');
  const playerPlayBtn = document.querySelector('.player__play');
  const playerMuteBtn = document.querySelector('.player__volume');
  const playerVolumeRange = document.querySelector('.player__volume-range');
  const playerFullScreen = document.querySelector('.player__full');
  const playerProgressBar = document.querySelector(
    '.player__time-progress-range'
  );
  const playerProgressPassed = document.querySelector('.player__time-passed');
  const playerProgressLeft = document.querySelector('.player__time-left');
  var playStatus = true;
  var volumeStatus = true;
  var volumeValue = 0.5;
  var fullScreenStatus = true;

  playerPlayBtn.addEventListener('click', () => {
    playStatus ? playVideo() : pauseVideo();
    playerPlayBtn.classList.toggle('btn--play-pause');
  });

  playerMuteBtn.addEventListener('click', muteVideo);

  playerVolumeRange.addEventListener('input', () => {
    volumeValue = playerVolumeRange.value / 100;
    valumeVideo();

    if (playerVolumeRange.value == 0) {
      playerMuteBtn.classList.add('btn--volume-mute');
      volumeStatus = !volumeStatus;
    } else {
      playerMuteBtn.classList.remove('btn--volume-mute');
    }
  });

  playerFullScreen.addEventListener('click', fullScreenVideo);

  playerVideo.ontimeupdate = progressUpdate;

  playerVideo.addEventListener('dblclick', fullScreenVideo);

  playerVideo.addEventListener('click', () => {
    playStatus ? playVideo() : pauseVideo();
    playerPlayBtn.classList.toggle('btn--play-pause');
  });

  playerProgressBar.addEventListener('input', videoRewind);

  document.addEventListener('DOMContentLoaded', timeSet);

  function playVideo() {
    playerVideo.play();
    playStatus = !playStatus;
    playerTimeLeft();
  }

  function pauseVideo() {
    playerVideo.pause();
    playStatus = !playStatus;
  }

  function muteVideo() {
    if (volumeStatus) {
      playerVideo.volume = 0;
      playerVolumeRange.value = 0;
      playerMuteBtn.classList.add('btn--volume-mute');
    } else {
      playerVideo.volume = 1;
      playerVolumeRange.value = volumeValue * 100;
      playerVolumeRange.value = 50;
      playerMuteBtn.classList.remove('btn--volume-mute');
    }
    volumeStatus = !volumeStatus;
  }

  function valumeVideo() {
    playerVideo.volume = volumeValue;
  }

  function fullScreenVideo() {
    fullScreenStatus
      ? playerWrapper.requestFullscreen()
      : document.exitFullscreen();
    fullScreenStatus = !fullScreenStatus;
    playerFullScreen.classList.toggle('btn--full-opposite');
  }

  function timeSet() {
    let timePass = playerVideo.currentTime;
    let playerHours = Math.floor(timePass / 60 / 60) % 24;
    let playerMinutes = Math.floor(timePass / 60) % 60;
    let playerSeconds = Math.floor(timePass) % 60;
    playerSeconds = playerSeconds < 10 ? '0' + playerSeconds : playerSeconds;
    playerMinutes = playerMinutes < 10 ? '0' + playerMinutes : playerMinutes;
    playerProgressPassed.textContent = `${playerHours}:${playerMinutes}:${playerSeconds}`;
  }

  function playerTimeLeft() {
    let timeLeft = playerVideo.duration;
    let playerHours2 = Math.floor(timeLeft / 60 / 60) % 24;
    let playerMinutes2 = Math.floor(timeLeft / 60) % 60;
    let playerSeconds2 = Math.floor(timeLeft) % 60;
    playerSeconds2 =
      playerSeconds2 < 10 ? '0' + playerSeconds2 : playerSeconds2;
    playerMinutes2 =
      playerMinutes2 < 10 ? '0' + playerMinutes2 : playerMinutes2;
    playerProgressLeft.textContent = `${playerHours2}:${playerMinutes2}:${playerSeconds2}`;
  }

  function progressUpdate() {
    let timePass = playerVideo.currentTime;
    let timeLeft = playerVideo.duration;
    playerProgressBar.setAttribute('max', timeLeft);
    playerProgressBar.value = timePass;
    console.log(playerProgressBar.value);
    timeSet();
  }

  function videoRewind() {
    playerVideo.currentTime = playerProgressBar.value;
  }
}
