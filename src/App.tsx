import React from "react";

import "./App.css";
import { scanImageData } from "zbar.wasm";
import { videoStream } from "./utils/videoStream";

function App() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const drawVideo = React.useCallback(async () => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      ctx.drawImage(videoRef.current!, 0, 0, 640, 480);
      const imageData = ctx.getImageData(0, 0, 640, 480);
      ctx.arc(100, 75, 50, 0, 2 * Math.PI);
      const res = await scanImageData(imageData);
      if (res.length > 0) {
        const points = res[0].points;
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(points[1].x, points[1].y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(points[2].x, points[2].y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(points[3].x, points[3].y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = "25px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(res[0].decode(), 10, 50);
      }
    }
    requestAnimationFrame(drawVideo);
  }, []);
  React.useLayoutEffect(() => {
    if (videoRef.current && canvasRef.current) {
      videoStream(videoRef.current);

      canvasRef.current.width = 640;
      canvasRef.current.height = 480;
      requestAnimationFrame(drawVideo);
    }
  }, [drawVideo]);

  return (
    <div className="App">
      <header className="App-header">
        <video playsInline autoPlay ref={videoRef} />
        <canvas ref={canvasRef} />
      </header>
    </div>
  );
}

export default App;
