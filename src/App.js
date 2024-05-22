// Importar dependencias
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities"; 

// Funcion principal de la app
//----------------------------------------------------------------------
function App() {
  // Declaracion de variables
  const webcamRef = useRef( null );
  const canvasRef = useRef( null );

  // Definicion de variables para el tracking y freezing
  const [ isFrozen, setIsFrozen ] = useState( false );
  const [ trackedObject, setTrackedObject ] = useState( null );
  const [ tracking, setTracking ] = useState( false );
//----------------------------------------------------------------------
  // Main function.- Se carga del modelo y ajusta el intervalo del mismo 
  const runCoco = async () => {
    // 3. TODO - Load network 
    const net = await tf.loadGraphModel( 'http://127.0.0.1:8080/model.json' );
    
    // Loop para la deteccion de objetos
    setInterval( () => {
        detect( net );
      // Tasa de refresco de los fps
    }, 16 );
  };
// Funcion de detectar, en esta se cargan las variables del video y canvas 
//----------------------------------------------------------------------
  const detect = async ( net ) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video       = webcamRef.current.video             ;
      const videoWidth  = webcamRef.current.video.videoWidth  ;
      const videoHeight = webcamRef.current.video.videoHeight ;

      // Set video width
      webcamRef.current.video.width  = videoWidth  ;
      webcamRef.current.video.height = videoHeight ;

      // Set canvas height and width
      canvasRef.current.width  = videoWidth  ;
      canvasRef.current.height = videoHeight ;

      // 4. TODO - Make Detections
  
      const img      = tf.browser.fromPixels( video );
      const resized  = tf.image.resizeBilinear( img, [ 640,640 ] );
      const casted   = resized.cast( 'int32' );
      const expanded = casted.expandDims( 0 );
      const obj      = await net.executeAsync( expanded );
    


      // Modelo Carlos 4 -> clases: 6 | boxes: 7 | scores: 0
      // Modelo Adrian -> clases: 7 | boxes: 4 | scores: 2
      const boxes   = await obj[ 4 ].array()
      const classes = await obj[ 7 ].array()
      const scores  = await obj[ 2 ].array()

      // Recopilacion de informacion de tensores
      const info = await obj;

      const t0 = await info[ 0 ].array();
      const t1 = await info[ 1 ].array();
      const t2 = await info[ 2 ].array();
      const t3 = await info[ 3 ].array();
      const t4 = await info[ 4 ].array();
      const t5 = await info[ 5 ].array();
      const t6 = await info[ 6 ].array();
      const t7 = await info[ 7 ].array();

      // Mostar informacion de los tensores
      
      console.log( 't0: ', t0 );
      console.log( 't1: ', t1 );
      console.log( 't2: ', t2 );
      console.log( 't3: ', t3 );
      console.log( 't4: ', t4 );
      console.log( 't5: ', t5 );
      console.log( 't6: ', t6 );
      console.log( 't7: ', t7 );
    
      // Draw mesh
      const ctx = canvasRef.current.getContext( "2d" );

      let objectDetected = false;

      requestAnimationFrame( () => { 
        objectDetected = drawRect( boxes[ 0 ], classes[ 0 ], scores[ 0 ], 0.7, videoWidth, videoHeight, ctx, trackedObject ) 
      } ); 

      if ( objectDetected ){
        setIsFrozen( true );
        setTracking( true );
      } else if ( tracking ){
        setIsFrozen( false );
        setTracking( false );
        setTrackedObject( null );
      }

      tf.dispose( img      );
      tf.dispose( resized  );
      tf.dispose( casted   );
      tf.dispose( expanded );
      tf.dispose( obj      );

    }
  };
//Se manda a llamar el metodo que contiene el modelo de IA
//----------------------------------------------------------------------
  useEffect( () => { runCoco() }, [] );

//Estructura de la pagina web
//----------------------------------------------------------------------
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
            width: 1280,
            height: 720,
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
            width: 1280,
            height: 720,
          }}
        />
      </header>
    </div>
  );
}

export default App;
