
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const [currentIndex,setCurrentIndex]=useState(1);
  const [hasClicked,setHasClicked]=useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos=4;
  const nextVideoRef = useRef(null);//usually used to target a specific dom element

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);


  const handleMiniVdClick=()=>{
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos ) + 1);
    
  }
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  /*The provided code snippet utilizes the GSAP animation library to create a smooth transition effect between two HTML elements with IDs `#current-video` and `#next-video`. Here's a breakdown of what the code does:

**1. Importing GSAP:**

- It's assumed that GSAP is already imported and available in your project. You'll need to include the GSAP library in your HTML file before using this code.

**2. Animating `#next-video`:**

   - `gsap.to('#next-video', { ... })`: This line initiates a GSAP animation targeting the element with the ID `#next-video`. The curly braces `{}` contain the animation properties:
      - `transformOrigin: 'center center'`: Sets the origin point for the transformation effects to be the center of the element.
      - `scale: 1`: Animates the scale of the element to 1 (full size).
      - `width: "100%"`: Animates the width of the element to 100%.
      - `height: "100%"`: Animates the height of the element to 100%.
      - `duration: 1`: Sets the animation duration to 1 second.
      - `ease: 'power1.inOut'`: Applies a "power1.inOut" easing function for a smooth transition effect.
      - `onStart: () => nextVideoRef.current.play()`: This callback function is executed at the start of the animation. It plays the video element referenced by `nextVideoRef.current` (assuming it's a video element with a `play` method).

**3. Animating `#current-video`:**

   - `gsap.from("#current-video", { ... })`: This line animates the element with the ID `#current-video`. The curly braces contain the animation properties:
      - `transformOrigin: "center center"` (same as `#next-video`).
      - `scale: 0`: Animates the scale of the element to 0 (shrinking it).
      - `duration: 1.5`: Sets the animation duration to 1.5 seconds (slightly longer than `#next-video`).
      - `ease: "power1.inOut"` (same easing function as `#next-video`).

**Overall Effect:**

This code creates a visually appealing transition between two videos. As `#next-video` scales up and takes over the screen, `#current-video` shrinks and fades out simultaneously. The `onStart` callback ensures that the new video starts playing immediately, creating a seamless playback experience.

**Additional Notes:**

- Make sure `nextVideoRef` is a valid reference to your next video element (e.g., using `useRef` in React).
- You can adjust the animation properties (duration, easing, etc.) to customize the transition behavior.
- GSAP offers a wide range of animation capabilities. Explore the GSAP documentation for more advanced effects and functionalities.
 */
  useGSAP(()=>{
    if(hasClicked)
    {
        gsap.set("#next-video",{visibility:'visible'});
        gsap.to('#next-video',{
            transformOrigin:'center center',
            scale:1,
            width:"100%",
            height:"100%",
            duration:1,
            ease:'power1.inOut',
            onStart: () => nextVideoRef.current.play()
        });
        gsap.from("#current-video", {
            transformOrigin: "center center",
            scale: 0,
            duration: 1.5,
            ease: "power1.inOut",
        });
    }

  }, {
    dependencies: [currentIndex],
    revertOnUpdate: true,
  });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
        {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
            <div>
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div onClick={()=>{handleMiniVdClick()}} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-105 hover:opacity-100">
                        <video
                            ref={nextVideoRef}
                            src={getVideoSrc((currentIndex % totalVideos) + 1)}
                            loop
                            muted
                            id="current-video"
                            className="size-64 origin-center scale-150 object-cover object-center"
                            onLoadedData={handleVideoLoad}
                        />
                    </div>
                </div>
                
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">G<b>A</b>MING</h1>
            <div className="absolute left-0 top-0 z-40 size-full">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className="special-font hero-heading text-blue-100">
                        redefi<b>n</b>e
                    </h1>

                    <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                        Enter the Metagame Layer <br /> Unleash the Play Economy
                    </p>

                    <Button
                    id="watch-trailer"
                    title="Watch trailer"
                    leftIcon={<TiLocationArrow />}
                    containerClass="bg-yellow-300 flex-center gap-1"
                    />
                </div>
            </div>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  )
}

export default Hero