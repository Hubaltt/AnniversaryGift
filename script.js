let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop < lastScrollTop) {
    header.style.transform = "translateY(0)";
  } else if (scrollTop > lastScrollTop) {
    header.style.transform = "translateY(-100%)";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });
}, { threshold: 0.3 });

const Homeletter = document.querySelector('.Home-letter');
if (Homeletter) observer.observe(Homeletter);

const HomePhotos = document.querySelector('.Home-Photos');
if (HomePhotos) observer.observe(HomePhotos);

const songs = [
  { title: "If", artist: "Bread", src: "If.mp3" },
  { title: "Kingston", artist: "Faye Webster", src: "Kingston.mp3" },
  { title: "Nothing", artist: "Bruno Major", src: "Nothing.mp3" },
  { title: "Seasons", artist: "Wave to Earth", src: "Seasons.mp3" },
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(index) {
  const song = songs[index];
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  audio.src = song.src;
  progressBar.value = 0;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

function togglePlay() {
  if (audio.paused) audio.play();
  else audio.pause();
}

document.getElementById("play").addEventListener("click", togglePlay);
document.getElementById("prev").addEventListener("click", prevSong);
document.getElementById("next").addEventListener("click", nextSong);

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;

  const formatTime = t => {
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration || 0);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

loadSong(currentSongIndex);

const bookObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const flowers = entry.target.querySelectorAll('.flower');
    if (entry.isIntersecting) {
      flowers.forEach(f => f.classList.add('show'));
    } else {
      flowers.forEach(f => f.classList.remove('show'));
    }
  });
}, { threshold: 0.5 });

const bookSection = document.querySelector('#Gallery');
if (bookSection) bookObserver.observe(bookSection);
