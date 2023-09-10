new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        // {
        //   name: "Minecraft - Beginning",
        //   artist: "C418",
        //   cover: "covers/minecraft.jpeg",
        //   source: "mp3/minecraft-beginning.mp3",
        //   favorited: false
        // },
        {
          name: "Devil Eyes",
          artist: "ZODIVK",
          cover: "covers/Devil_Eyes.jpeg",
          source: "mp3/Devil Eyes.mp3",
          favorited: false
        },
        {
          name: "Murder In My Mind",
          artist: "Kord Hell",
          cover: "covers/murder_in_mind.png",
          source: "mp3/Kordhell_Murder_In_My_Mind.mp3",
          favorited: false
        },
        {
          name: "Infinity",
          artist: "Jaymes Young",
          cover: "covers/infinity.jpg",
          source: "mp3/Jaymes Young - Infinity.mp3",
          favorited: false
        },
        {
          name: "After Dark",
          artist: "Mr. Kitty ",
          cover: "covers/afterdark.png",
          source: "mp3/Mr_Kitty_After_Dark.mp3",
          favorited: false
        },
        {
          name: "Little Dark Age",
          artist: "MGMT",
          cover: "covers/little_dark.jpg",
          source: "mp3/MGMT_Little_Dark_Age.mp3",
          favorited: false
        },
        {
          name: "Spider-Man 2099 (Miguel O_'Hara)",
          artist: "Daniel Pemberton",
          cover: "covers/across_the_spiderverse.jpg",
          source: "mp3/Spider-Man 2099 (Miguel O_'Hara).mp3",
          favorited: false
        },
        {
          name: "Mystic Tunnel",
          artist: "DJ Faded",
          cover: "covers/dj_faded.jpg",
          source: "mp3/Mystic Tunnel - DJ Faded.mp3",
          favorited: false
        },
        {
          name: "Let Her Go",
          artist: "Passenger",
          cover: "covers/let_her_go.jpg",
          source: "mp3/Passenger - Let Her Go.mp3",
          favorited: false
        },
        {
          name: "I'm about to cuuuuuu",
          artist: "some guy",
          cover: "covers/about_to_cuuuuuuuuuuuuuuu.png",
          source: "mp3/im about to cuuuuuuuuu.mp3",
          favorited: false
        },
        {
          name: "Never Gonna Give You Up",
          artist: "Rick Astley",
          cover: "covers/NGGYU.png",
          source: "mp3/Never Gonna Give You Up.mp3",
          favorited: false
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.getBoundingClientRect().left;
      let percentage = (100 * position) / progress.offsetWidth;
      percentage = Math.min(100, Math.max(0, percentage)); // Ensure it's within 0-100
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    },

    playSong(id) {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      this.currentTrackIndex = id;
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
      this.play()
    },
  },

  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
