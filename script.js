document.addEventListener('DOMContentLoaded', () => {
    const message = "Welcome to the Music Player";
    const welcomeTextElement = document.getElementById("welcome-text");
    const musicPlayerCard = document.getElementById("music-player-card");

    // Function to display text one by one with animation
    let index = 0;
    function typeMessage() {
        if (index < message.length) {
            const span = document.createElement('span');
            span.textContent = message[index];
            welcomeTextElement.appendChild(span);
            index++;
            setTimeout(typeMessage, 100);  // Adjust the speed here (in milliseconds)
        } else {
            setTimeout(() => {
                welcomeTextElement.style.display = 'none'; // Hide the welcome message
                musicPlayerCard.style.display = 'block';   // Show the music player
                loadSong(currentSongIndex);                // Load the first song
            }, 500);  // Wait before hiding the welcome message and showing the music player
        }
    }

    // Start the welcome message typing animation
    typeMessage();

    // List of songs
    const songs = [
        { title: "Song 1", artist: "Artist 1", src: "sample-mp3-files-sample1.mp3" },
        { title: "Song 2", artist: "Artist 2", src: "path-to-your-song2.mp3" },
        { title: "Song 3", artist: "Artist 3", src: "path-to-your-song3.mp3" }
    ];

    let currentSongIndex = 0;
    let audio = new Audio(songs[currentSongIndex].src); // Initialize audio player

    // Function to load a song
    function loadSong(songIndex) {
        const song = songs[songIndex];
        audio.src = song.src;
        document.getElementById("track-name").textContent = song.title;
        document.getElementById("track-artist").textContent = song.artist;
    }

    // Initial song load
    loadSong(currentSongIndex);

    // Play/Pause button functionality
    document.getElementById("play-pause-btn").addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            document.getElementById("play-pause-btn").innerHTML = "&#10074;&#10074;";  // Pause button symbol
        } else {
            audio.pause();
            document.getElementById("play-pause-btn").innerHTML = "&#9654;";  // Play button symbol
        }
    });

    // Next button functionality
    document.getElementById("next-btn").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;  // Loop to the first song if at the end
        loadSong(currentSongIndex);
        audio.play();
    });

    // Previous button functionality
    document.getElementById("prev-btn").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;  // Loop to the last song if at the beginning
        loadSong(currentSongIndex);
        audio.play();
    });

    // Volume control
    document.getElementById("volume").addEventListener("input", (e) => {
        audio.volume = e.target.value;
    });

    // Progress bar update
    audio.ontimeupdate = () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById("progress-bar").value = progress;
    };

    // Update progress bar on click
    document.getElementById("progress-bar").addEventListener("input", (e) => {
        const seekTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });
});
