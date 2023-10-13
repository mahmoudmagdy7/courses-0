import React, { useEffect } from "react";

const YouTubePlayer = ({ videoId }) => {
  useEffect(() => {
    // Load the YouTube API with your API key
    const apiKey = "AIzaSyDvr2VYyMStxJzYo98x7CAmCILR7NphO2E"; // Replace with your YouTube API key
    const tag = document.createElement("script");
    tag.src = `https://www.youtube.com/iframe_api?api_key=${apiKey}`;
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Define callbacks for when the API is ready
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("player", {
        videoId: videoId,
        playerVars: {
          origin: "https://example.com", // Replace with your website's domain
        },
        events: {
          // You can add event handlers here
        },
      });
    };
  }, [videoId]);

  return <div id="player"></div>;
};

export default YouTubePlayer;
