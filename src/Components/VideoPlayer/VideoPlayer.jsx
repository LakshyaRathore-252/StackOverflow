import React, { useRef } from 'react';
import video from '../VideoPlayer/v.mp4';
import LeftSIdebar from '../LeftSIdebar/LeftSidebar';
const App = ({slideIn , handleSlideIn}) => {

  const videoRef = useRef(null);

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const minSwipeDistance = 100; // Set minimum swipe distance as per your requirement
    const videoElementWidth = videoRef.current.offsetWidth;

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
    const videoElementWidth = videoRef.current.offsetWidth;

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
      <LeftSIdebar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
      <video
        className='w-full h-[100vh] '
        ref={videoRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        src={video}
      />
    </div>
  );
};

export default App;
