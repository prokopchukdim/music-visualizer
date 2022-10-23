import test from "./test.mp3"

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
    var NUM = 32;
    var ANGLE = p.TWO_PI / NUM;
    var HEIGHT = 160;
    var MAX_SCALE = 1.7;
    var MIN_SCALE = 1.1;
    var ANGLE_SCALE = 0.75;

    // var randArr = []
    // var tgtArr = []
    // for (let i = 0; i<NUM; i++){
    //     randArr.push(p.random(1,MAX_SCALE));
    //     tgtArr.push(p.random(1,MAX_SCALE));
    // }
    // console.log(randArr);
    // let randScale = p.random(1, 1.6);

    var scaleArr = [];
    for (let i = 0; i<NUM; i++){
        scaleArr.push(MIN_SCALE);
    }
    var dataArr = [];
    var analyserNode = null;
    var played = false;

    const setPlayed = () => {
        played = true;
    }

    var audio = null;

    const clickHandler = () => {
        if (!audio){
            const audioContext = new AudioContext();
            audio = new Audio();
            audio.src = require('./test.mp3');
            // audio.crossOrigin = "anonymous";
            const audioSourceNode = audioContext.createMediaElementSource(audio);
        
            analyserNode = audioContext.createAnalyser();
            analyserNode.fftSize = 64;
            const bufferLength = analyserNode.frequencyBinCount;
            dataArr = new Float32Array(bufferLength);
        
            audioSourceNode.connect(analyserNode);
            analyserNode.connect(audioContext.destination);
        }
        
        
        if (!audio.paused){
            audio.pause();
        }

        if (played === false){
            audio.play();
        }
        
        setPlayed();
        

    }

    
    document.addEventListener("click", clickHandler);


    p.setup = () => {
        let canvas = p.createCanvas(CANVAS_SIZE,CANVAS_SIZE);         
    };


    p.draw = () => {
        let c = p.color(221, 167, 123);
        p.fill(c);
        p.noStroke();
        
        c = p.color('#37123C');
        p.background(c);

        p.translate(CANVAS_SIZE/2, CANVAS_SIZE/2);
        p.rotate(p.PI);

        //draw slices;

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
        if (analyserNode){
            analyserNode.getFloatFrequencyData(dataArr);

            let max = Math.max(...dataArr);
            let min = Math.min(...dataArr);
            
            // console.log(dataArr);
            dataArr.forEach( (val, ind) => {
                let dif = scaleArr[ind] - ((val - min) * (MAX_SCALE - MIN_SCALE) / (max - min) + MIN_SCALE);
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