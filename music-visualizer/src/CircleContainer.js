import { popoverClasses } from '@mui/material';

function CircleContainer(p){
    const angleToPoint = (angle, height) => {
        var x = (height * p.tan(angle)) / p.sqrt(1 + (p.tan(angle) * p.tan(angle)));
        var y = p.sqrt(height * height - x * x);

        return [x, y];
    };

    const drawPoint = (p, angle) => {
        // var HEIGHT = 180;
        let a,b;
        [a,b] = angleToPoint(angle, HEIGHT);
        // console.log(a,b)
        p.vertex(a,b);
    }

    const scale = (p, scale) => {
        p.scale(scale, scale);
    }
    
    
    var CANVAS_SIZE = 600;
    var NUM = 256;
    var ANGLE = p.TWO_PI / NUM;
    var HEIGHT = 160;
    var MAX_SCALE = 1.7;
    var MIN_SCALE = 1.1;
    var ANGLE_SCALE = 0.75;
    // var soundFileURL = require('./test.mp3');

    var scaleArr = [];
    for (let i = 0; i<NUM; i++){
        scaleArr.push(MIN_SCALE);
    }
    var dataArr = [];
    var analyserNode = null;
    // var played = false;

    // const setPlayed = () => {
    //     played = true;
    // }

    // var audio = null;
    var toPlay = false;
    


    p.updateWithProps = (props) => {
        if (toPlay !== props.toPlay){
            // clickHandler();
            toPlay = props.toPlay;
        }

        if (props.aNode){
            analyserNode = props.aNode;
        }

        if (props.NUM) {
            NUM = props.NUM;
        }
    }


    p.setup = () => {
        p.createCanvas(CANVAS_SIZE,CANVAS_SIZE);         
    };

    const BASE = Math.E;
    const EXP_CONST = (MIN_SCALE * (BASE ** MAX_SCALE) - MAX_SCALE * (BASE ** MIN_SCALE))/(BASE ** MAX_SCALE - BASE ** MIN_SCALE);
    const EXP_SCALE = (MIN_SCALE - EXP_CONST)/(BASE ** MIN_SCALE);

    p.draw = () => {
        let c = p.color(221, 167, 123);
        p.fill(c);
        p.noStroke();
        
        c = p.color('#37123C');
        p.background(c);

        p.translate(CANVAS_SIZE/2, CANVAS_SIZE/2);
        p.rotate(p.PI);

        //draw slices;

        if (analyserNode != null){
            const bufferLength = analyserNode.frequencyBinCount;
            dataArr = new Float32Array(bufferLength);
        }

        for (let i = 0; i < NUM; i++){
            // p.rotate(p.TWO_PI / NUM * i);
            p.rotate(p.TWO_PI / NUM);
            
            
            scale(p, scaleArr[i]);
            p.beginShape();
            p.vertex(0, 0);
            p.vertex(0, HEIGHT);
            drawPoint(p, ANGLE/4 * ANGLE_SCALE);
            drawPoint(p, ANGLE/2 * ANGLE_SCALE);
            drawPoint(p, ANGLE * 3 / 4 * ANGLE_SCALE);
            drawPoint(p, ANGLE * ANGLE_SCALE);
            p.endShape(p.CLOSE);
            scale(p, 1/scaleArr[i]);
        }
        if (analyserNode != null && toPlay){

            analyserNode.getFloatFrequencyData(dataArr);

            let max = Math.max(...dataArr);
            let min = Math.min(...dataArr);
            
            // console.log(dataArr);
            dataArr.forEach( (val, ind) => {
                

                let tgt_unscaled = ((val - min) * (MAX_SCALE - MIN_SCALE) / (max - min) + MIN_SCALE);
                let tgt = EXP_SCALE * BASE ** tgt_unscaled + EXP_CONST;
                // console.log(tgt);

                let dif = scaleArr[ind] - tgt;
                if (dif < 0){
                    scaleArr[ind] += Math.max(0, Math.min(-dif, 0.01));
                }
                else{
                    if (scaleArr[ind] > MIN_SCALE){
                        scaleArr[ind] += Math.min(0, Math.max(-dif, -0.01));
                    }
                    // console.log(Math.min(0, Math.max(-dif, -0.01)));
                    // 
                }
                
                // if (scaleArr[ind] < (val - min) * (MAX_SCALE - MIN_SCALE) / (max - min) + MIN_SCALE){
                //     scaleArr[ind] += 0.010;
                // }
                // else if (scaleArr[ind] > (val - min) * (MAX_SCALE - MIN_SCALE) / (max - min) + MIN_SCALE){
                //     scaleArr[ind] -= 0.010;
                // }
            });
    
        }
        
        // randArr.forEach( (val, ind) => {
        //     if (randArr[ind] < tgtArr[ind]){
        //         randArr[ind] += 0.005;
        //     }
        //     else if (randArr[ind] >= tgtArr[ind]){
        //         randArr[ind] -= 0.005;
        //     }
        //     if (-0.02 < (randArr[ind] - tgtArr[ind]) && (randArr[ind] - tgtArr[ind]) < 0.02){
        //         tgtArr[ind] = p.random(1, MAX_SCALE);
        //     }
        // })
        
        //Draw circles;
        p.fill(c);
        p.ellipse(0, 0, 320, 320);
        c = p.color(221, 167, 123);
        p.fill(c);
        p.ellipse(0, 0, 300, 300);

    };

    
}

export default CircleContainer;