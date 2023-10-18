import React, { useRef } from 'react';
import video from '../VideoPlayer/s.mp4';
import './video.css'
import LeftSIdebar from '../LeftSIdebar/LeftSidebar';
const App = ({ slideIn, handleSlideIn }) => {

  const videoRef = useRef(null);

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    console.log(e);
    touchStartX = e.changedTouches[0].clientX;
    console.log(touchStartX)
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  };

  const handleclick = (e) => {
    e.preventDefault();
}

  const handleSwipeGesture = () => {
    const minSwipeDistance = 100; // Set minimum swipe distance as per your 
    console.log("videoRef", videoRef)
    const videoElementWidth = videoRef.current.offsetWidth;
    console.log(videoElementWidth)

    if (Math.abs(touchEndX - touchStartX) > minSwipeDistance) {
      if (touchEndX < touchStartX && touchStartX > videoElementWidth / 2) {
        // Swipe Left detected on the right side of the screen
        videoRef.current.currentTime += 10; // Forward the video by 10 seconds
      }

      if (touchEndX > touchStartX && touchStartX < videoElementWidth / 2) {
        // Swipe Right detected on the left side of the screen
        videoRef.current.currentTime -= 10; // Rewind the video by 10 seconds
      }
    }
  };

  const handleDoubleClick = (e) => {

    const clickX = e.clientX;
    console.log(clickX)
    const videoElementWidth = videoRef.current.offsetWidth;
    console.log(videoElementWidth)

    if (clickX < videoElementWidth / 3) {
      // Double click on the left side of the screen
      videoRef.current.currentTime -= 10; // Rewind the video by 10 seconds
    } else if (clickX > (videoElementWidth / 3) * 2) {
      // Double click on the right side of the screen
      videoRef.current.currentTime += 10; // Forward the video by 10 seconds
    } else {
      // Double click in the middle of the screen
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className='flex '>
      <LeftSIdebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <video
        className='video w-full h-[100vh] '
        ref={videoRef}
        onTouchStart={handleTouchStart}
        onClick={handleclick}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        autoplay
        controls
        src={video}
      />
    </div>
  );
};

export default App;
