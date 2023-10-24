import video from '../VideoPlayer/s.mp4';
import React, { useRef, useState, useEffect } from 'react';

function VideoPlayer({ src }) {
  const videoRef = useRef();
  const [tapCount, setTapCount] = useState(0);
  const [tapPosition, setTapPosition] = useState(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    if (video) {
      video.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    video.playbackRate = playbackRate;
  }, [playbackRate]);

  const handleTap = (e) => {
    const { clientX } = e;
    const { offsetWidth } = e.target;
    setTapCount(prevCount => prevCount + 1);

    if (clientX > offsetWidth * 0.3 && clientX < offsetWidth * 0.7) {
      setTapPosition('middle');
    } else {
      setTapPosition(clientX > offsetWidth / 2 ? 'right' : 'left');
    }

    if (tapCount === 1) {
      if (tapPosition === 'middle') {
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      } else if (tapPosition === 'right') {
        videoRef.current.currentTime += 10;
      } else {
        videoRef.current.currentTime -= 10;
      }
      setTapCount(0);
    }

    setTimeout(() => {
      setTapCount(0);
    }, 300);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const newTime = (e.target.value / 100) * video.duration;
    video.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    setVolume(e.target.value);
    video.volume = e.target.value;
  };

  const handlePlaybackRateChange = (e) => {
    setPlaybackRate(e.target.value);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className='flex flex-col relative '>
      <video
        ref={videoRef}
        src={src}
        onClick={handleTap}
        style={{ width: '100%', height: '100vh' }}
      />
      <div className='absolute bottom-5 space-x-5 flex w-full flex-wrap '>
          <p className='chat-color'>Progress Rate</p>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className='w-[70%]'
            onChange={handleSeek}
          />
        <p className='chat-color'>VolumeChange</p>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <p className='chat-color'>playbackRate</p>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={playbackRate}
          onChange={handlePlaybackRateChange}
        />

        <button className='chat-color right-0' onClick={toggleFullscreen}>Toggle Fullscreen</button> {/* Add this line */}
      </div>
    </div>
  );
}

export default VideoPlayer;
