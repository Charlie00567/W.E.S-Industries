// Define our labelmap
const labelMap = {
    1: { name: 'Guantes', color: 'red' },
    2: { name: 'Lentes', color: 'yellow' },
    3: { name: 'Cubrebocas', color: 'lime' }
};

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx, trackedObject) => {

    let objectDetected = false;

    for (let i = 0; i <= boxes.length; i++) {
        if (boxes[i] && classes[i] && scores[i] > threshold) {
            const [y, x, height, width] = boxes[i];
            const text = classes[i];

            if (trackedObject === null || trackedObject === text) {
                objectDetected = true;
                ctx.strokeStyle = labelMap[text]['color'];
                ctx.lineWidth = 5;
                ctx.fillStyle = 'white';
                ctx.font = '30px Arial';

                ctx.beginPath();
                ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100) / 100, x * imgWidth, y * imgHeight - 10);
                ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth / 2, height * imgHeight / 2);
                ctx.stroke();
            }
        }
    }

    return objectDetected;
};


// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { nextFrame } from "@tensorflow/tfjs";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isFrozen, setIsFrozen] = useState(false);
  const [trackedObject, setTrackedObject] = useState(null);
  const [tracking, setTracking] = useState(false);

  const runCoco = async () => {
    const net = await tf.loadGraphModel('http://127.0.0.1:8080/model.json');
    
    setInterval(() => {
      if (!isFrozen) {
        detect(net);
      }
    }, 16.7);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [320, 320]);
      const casted = resized.cast('int32');
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);

      const boxes = await obj[6].array();
      const classes = await obj[7].array();
      const scores = await obj[0].array();

      const ctx = canvasRef.current.getContext("2d");

      let objectDetected = false;

      requestAnimationFrame(() => {
        objectDetected = drawRect(boxes[0], classes[0], scores[0], 0.7, videoWidth, videoHeight, ctx, trackedObject);
      });

      if (objectDetected) {
        setIsFrozen(true);
        setTracking(true);
      } else if (tracking) {
        setIsFrozen(false);
        setTracking(false);
        setTrackedObject(null);
      }

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
