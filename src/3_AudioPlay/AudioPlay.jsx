import "./AudioPlay.css";
import React, { Component } from 'react';



export default class AudioPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      volume: 0.4,
      prevVolume: 0.4,
      initialized: false,
      barWidth: 3,
      barGap: 1,
      bufferPercentage: 75,
      nonAudioAttributes: new Set(['title', 'bar-width', 'bar-gap', 'buffer-percentage']),
    };
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.initializeElements();
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.gainNode = this.audioCtx.createGain();
    this.analyserNode = this.audioCtx.createAnalyser();
    this.analyserNode.fftSize = 2048;
    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.initializeAudio();
  }

  initializeAudio() {
    if (this.state.initialized) return;

    this.setState({ initialized: true });

    if (this.audioRef.current) {
      this.track = this.audioCtx.createMediaElementSource(this.audioRef.current);
      this.track.connect(this.gainNode).connect(this.analyserNode).connect(this.audioCtx.destination);
      this.setState({ playing: true });
    }

    this.changeVolume();
  }

  updateFrequency() {
    if (!this.state.playing) return;

    this.analyserNode.getByteFrequencyData(this.dataArray);

    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.fillStyle = "rgba(0, 0, 0, 0)";
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const barCount = (this.canvas.width / (this.state.barWidth + this.state.barGap)) - this.state.barGap;
    const bufferSize = (this.bufferLength * this.state.bufferPercentage) / 100;
    let x = 0;

    for (let i = 0; i < barCount; i++) {
      const iPerc = Math.round((i * 100) / barCount);
      const pos = Math.round((bufferSize * iPerc) / 100);
      const frequency = this.dataArray[pos];
      const frequencyPerc = (frequency * 100) / 255;
      const barHeight = (frequencyPerc * this.canvas.height) / 100;
      const y = this.canvas.height - barHeight;

      this.canvasCtx.fillStyle = `rgba(${frequency}, 255, 255)`;
      this.canvasCtx.fillRect(x, y, this.state.barWidth, barHeight);

      x += (this.state.barWidth + this.state.barGap);
    }

    requestAnimationFrame(this.updateFrequency.bind(this));
  }

  attachEvents() {
    this.volumeBar.parentNode.addEventListener('click', (e) => {
      if (e.target === this.volumeBar.parentNode) {
        this.toggleMute();
      }
    }, false);

    this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this), false);

    this.volumeBar.addEventListener('input', this.changeVolume.bind(this), false);

    this.progressBar.addEventListener('input', (e) => this.seekTo(this.progressBar.value), false);

    this.audio.addEventListener('loadedmetadata', () => {
      this.progressBar.max = this.audio.duration;
      this.durationEl.textContent = this.getTimeString(this.audio.duration);
      this.updateAudioTime();
    });

    this.audio.addEventListener('error', (e) => {
      this.titleElement.textContent = this.audio.error.message;
      this.playPauseBtn.disabled = true;
    });

    this.audio.addEventListener('timeupdate', () => {
      this.updateAudioTime(this.audio.currentTime);
    });

    this.audio.addEventListener('ended', () => {
      this.setState({ playing: false });
      this.playPauseBtn.textContent = 'play';
      this.playPauseBtn.classList.remove('playing');
    }, false);

    this.audio.addEventListener('pause', () => {
      this.setState({ playing: false });
      this.playPauseBtn.textContent = 'play';
      this.playPauseBtn.classList.remove('playing');
    }, false);

    this.audio.addEventListener('play', () => {
      this.setState({ playing: true });
      this.playPauseBtn.textContent = 'pause';
      this.playPauseBtn.classList.add('playing');
      this.updateFrequency();
    }, false);

    this.settingButton.addEventListener("click", () => {
      document.querySelector(".right-audio-text").classList.toggle("audio-text-hide");
      document.querySelector(".add-new-song-form").classList.add("hide-song-form");
    });

    this.audioPlay.addEventListener("click", () => {
      document.querySelector(".right-slide-button").click();
      document.querySelector(".start-button").click();
    });
  }

  async togglePlay() {
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    this.audioCtx.resume()

    if (this.audioRef.current.paused) {
      this.audioRef.current.play();
      this.setState({ playing: true });
    } else {
      this.audioRef.current.pause();
      this.setState({ playing: false });
    }
  }

  getTimeString(time) {
    const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, '0');
    const min = parseInt(`${(time / 60) % 60}`, 10);

    return `${min}:${secs}`;
  }

  changeVolume() {
    const volumeValue = Number(this.volumeBar.value);

    if (!Number.isFinite(volumeValue)) {
      return;
    }

    this.setState({ volume: volumeValue });

    if (volumeValue > 1) {
      this.volumeBar.parentNode.className = 'volume-bar over';
    } else if (volumeValue > 0) {
      this.volumeBar.parentNode.className = 'volume-bar half';
    } else {
      this.volumeBar.parentNode.className = 'volume-bar';
    }

    if (this.gainNode) {
      this.gainNode.gain.value = this.state.volume;
    }
  }

  toggleMute(muted = null) {
    const volumeValue = muted || this.state.volume === 0 ? this.state.prevVolume : 0;

    if (!Number.isFinite(volumeValue)) {
      return;
    }

    this.volumeBar.value = volumeValue;
    this.changeVolume();
  }

  seekTo(value) {
    this.audioRef.current.currentTime = value;
  }

  updateAudioTime() {
    this.progressBar.value = this.audioRef.current.currentTime;
    this.currentTimeEl.textContent = this.getTimeString(this.audioRef.current.currentTime);
  }

  initializeElements() {
    this.settingButton = document.querySelector(".right-button-settings");
    this.audioPlay = document.querySelector(".right-play-button");
    this.audio = this.audioRef.current;
    this.playPauseBtn = document.querySelector('.play-btn');
    this.titleElement = document.querySelector('.audio-name');
    this.volumeBar = document.querySelector('.volume-field');
    this.progressIndicator = document.querySelector('.progress-indicator');

    this.currentTimeEl = document.querySelector(".current-time");
    this.progressBar = document.querySelector(".progress-bar");
    this.durationEl = document.querySelector(".duration");
    this.canvas = document.querySelector('canvas');

    this.canvasCtx = this.canvas.getContext("2d");
    const scale = window.devicePixelRatio;
    this.canvas.width = Math.floor(this.canvas.width * scale);
    this.canvas.height = Math.floor(this.canvas.height * scale);
    this.titleElement.textContent = this.audio.getAttribute('src')
      ? this.audio.getAttribute('title') ?? 'untitled'
      : 'No Audio Source Provided';
    this.volumeBar.value = this.state.volume;

    for (let i = 0; i < this.audio.length; i++) {
      const attr = this.audio[i];
      this.updateAudioAttributes(attr.name, attr.value);
    }

    this.attachEvents();
  }

  render() {
    return (
      <li className="right-li">
        <div className="right-audio">
          <figure className="audio-player">
            <button className="right-play-button">PLAY</button>
            <figcaption className="audio-name">Let me down slowly</figcaption>
            <audio
              ref={this.audioRef}
              className="audio"
              title="Let me down slowly"
              src={this.props.song}
              bar-width="5"
              bar-gap="2"
              preload="metadata"
              style={{ display: 'none' }}
            >
              <source src={this.props.song} type="audio/mpeg" />
              <source src={this.props.song} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <button className="play-btn" type="button">
              play
            </button>
            <div className="progress-indicator">
              <span className="current-time">0:0</span>
              <input type="range" max="100" className="progress-bar" />
              <span className="duration">0:00</span>
              <canvas
                className="visualizer"
                style={{ width: '100%', height: '20px' }}
              ></canvas>
            </div>
            <div className="volume-bar">
              <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                className="volume-field"
              />
            </div>
            <button className="right-button-settings"></button>
          </figure>
        </div>
      </li>
    );
  }
}