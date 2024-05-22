// Definicion del labelmap
const labelMap = {
    1:{ name:'Gorra'   , color: 'red'    },
    2:{ name:'Lentes'    , color: 'yellow' },
    3:{ name:'Cubrebocas', color: 'lime'   }
}
//----------------------------------------------------------------------
// Funcion de dibujado 
export const drawRect = ( boxes, classes, scores, threshold, imgWidth, imgHeight, ctx, trackedObject ) => {
    let objectDetected = false;

    for( let i=0; i <= boxes.length; i++ ){
        if( boxes[ i ] && classes[ i ] && scores[ i ] > threshold ){
            // Extraccion de los valores de las variables
            const [ y, x, height, width ] = boxes[ i ];
            const text = classes[ i ];
            
            if ( trackedObject === null || trackedObject === text ){
                objectDetected = true;
                // Stilo del dibujado
                ctx.strokeStyle = labelMap[ text ][ 'color' ];
                ctx.lineWidth = 2;
                ctx.fillStyle = 'white';
                ctx.font = '30px Arial' ;        
                
                // Dibujado
                ctx.beginPath()
                ctx.fillText( labelMap[ text ][ 'name' ] + ' - ' + Math.round( scores[ i ] * 100 ) / 100, x * imgWidth, y * imgHeight - 10 );
                ctx.rect( x * imgWidth, y * imgHeight, width * imgWidth / 2, height * imgHeight / 2 );
                ctx.stroke()
            }
            
        }
    }

    return objectDetected;
}
//----------------------------------------------------------------------