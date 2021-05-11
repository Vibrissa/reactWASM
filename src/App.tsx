import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { scanImageData } from "zbar.wasm";
import qrcode from "./testQRcode.png";

function App() {
  const tryWASM = React.useCallback(async () => {
    const url = qrcode;
    const img = new Image();

    img.src = url;
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const res = await scanImageData(imageData);
        console.log(res[0].typeName); // ZBAR_QRCODE
        console.log(res[0].decode()); // Hello World
      }
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button onClick={tryWASM}>666test</button>
      </header>
    </div>
  );
}

export default App;
