"use client";

import React, { useState, useRef, useEffect } from "react";

const HeroVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const attemptPlay = async () => {
        try {
          video.load();
          await video.play();
          setIsLoaded(true);
        } catch (error) {
          console.log("Autoplay prevented or video failed:", error);
          setIsLoaded(true);
        }
      };

      const timer = setTimeout(attemptPlay, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const handleVideoError = () => {
    console.log("Video failed to load");
    setHasError(true);
    setIsLoaded(true);
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Final play attempt failed");
      });
    }
  };

  return (
    <div className="relative group">
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl animate-pulse flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl blur-md opacity-40 transition-opacity duration-300" />

      {/* Main Video Container */}
      <div className="relative bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50 shadow-2xl">
        {!hasError ? (
          <video
            ref={videoRef}
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            preload="auto"
            className={`2xl:max-w-[800px] max-w-[500px] w-full h-auto rounded-lg object-cover shadow-lg 
                       transition-all duration-500 ease-out
                       [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-panel]:hidden 
                       [&::-webkit-media-controls-play-button]:hidden [&::-webkit-media-controls-start-playback-button]:hidden
                       ${
                         isLoaded
                           ? "opacity-100 hover:scale-[1.02]"
                           : "opacity-0"
                       }`}
            style={{
              pointerEvents: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              msUserSelect: "none",
            }}
            onLoadedData={handleVideoLoad}
            onCanPlay={handleCanPlay}
            onCanPlayThrough={handleVideoLoad}
            onError={handleVideoError}
            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
            onDoubleClick={(e: React.MouseEvent) => e.preventDefault()}
          />
        ) : (
          // Fallback إذا فشل تحميل الفيديو
          <div className="max-w-[400px] w-full h-[300px] rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-foreground font-semibold">Hero Content</p>
              <p className="text-sm text-muted-foreground">Video placeholder</p>
            </div>
          </div>
        )}

        {/* Overlay to prevent interactions */}
        <div className="absolute inset-3 rounded-lg pointer-events-none select-none" />
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-60 animate-pulse" />
      <div
        className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full opacity-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
};

export default HeroVideo;
