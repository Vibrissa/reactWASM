import React from "react";

import "./App.css";
import { scanImageData } from "zbar.wasm";
import { videoStream } from "./utils/videoStream";

function App() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const drawVideo = React.useCallback(async () => {
    if (canvasRef.current && videoRef.current) {
      const canvasLayer = canvasRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const layerCtx = canvasLayer.getContext("2d");
      const canvasWidth = videoRef.current.offsetWidth;
      const canvasHeight = videoRef.current.offsetHeight;
      canvasLayer.width = canvasWidth;
      canvasLayer.height = canvasHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      if (ctx && layerCtx) {
        ctx.drawImage(videoRef.current!, 0, 0, canvasWidth, canvasHeight);
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const res = await scanImageData(imageData);
        if (res.length > 0) {
          layerCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          const points = res[0].points;
          layerCtx.beginPath();
          layerCtx.arc(points[0].x, points[0].y, 10, 0, 2 * Math.PI);
          layerCtx.stroke();
          layerCtx.beginPath();
          layerCtx.arc(points[1].x, points[1].y, 10, 0, 2 * Math.PI);
          layerCtx.stroke();
          layerCtx.beginPath();
          layerCtx.arc(points[2].x, points[2].y, 10, 0, 2 * Math.PI);
          layerCtx.stroke();
          layerCtx.beginPath();
          layerCtx.arc(points[3].x, points[3].y, 10, 0, 2 * Math.PI);
          layerCtx.stroke();
          layerCtx.font = "25px Arial";
          layerCtx.fillStyle = "#FFFFFF";
          layerCtx.fillText(res[0].decode(), 10, 50);
        } else {
          layerCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        }
      }
    }
  }, []);
  React.useLayoutEffect(() => {
    let interval: NodeJS.Timeout;
    if (videoRef.current && canvasRef.current) {
      videoStream(videoRef.current, canvasRef.current);
      interval = setInterval(drawVideo, 16);
    }
    return () => {
      clearInterval(interval);
    };
  }, [drawVideo]);

  return (
    <div className="App">
      <div className="scanner-wrapper">
        <video className="video-box" playsInline autoPlay muted controls={false} ref={videoRef} />
        <canvas className="canvas-layer" ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
