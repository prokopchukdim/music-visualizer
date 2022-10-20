
function CircleContainer(p){
    const angleToPoint = (angle, height) => {
        var x = (height * p.tan(angle)) / p.sqrt(1 + (p.tan(angle) * p.tan(angle)));
        var y = p.sqrt(height * height - x * x);

        return [x, y];
    };

    const drawPoint = (p, angle) => {
        var HEIGHT = 180;
        let a,b;
        [a,b] = angleToPoint(angle, HEIGHT);
        // console.log(a,b)
        p.vertex(a,b);
    }

    const scale = (p, scale) => {
        p.scale(scale, scale);
    }
    
    
    var CANVAS_SIZE = 600;
    var NUM = 16;
    var ANGLE = p.TWO_PI / NUM;
    var HEIGHT = 180;
    var ANGLE_SCALE = 0.75;

    var randArr = []
    var tgtArr = []
    for (let i = 0; i<NUM; i++){
        randArr.push(p.random(1,1.6));
        tgtArr.push(p.random(1,1.6));
    }
    console.log(randArr);
    // let randScale = p.random(1, 1.6);

    p.setup = () => {
        
        p.createCanvas(CANVAS_SIZE,CANVAS_SIZE); 
    };


    p.draw = () => {

        let c = p.color(221, 167, 123);
        p.fill(c);
        p.noStroke();
        
        c = p.color('#37123C');
        p.background(c);

        p.translate(CANVAS_SIZE/2, CANVAS_SIZE/2);

        //draw slices;

        for (let i = 0; i < NUM; i++){
            p.rotate(p.TWO_PI / NUM * i)
            
            
            scale(p, randArr[i]);
            p.beginShape();
            p.vertex(0, 0);
            p.vertex(0, HEIGHT);
            drawPoint(p, ANGLE/4 * ANGLE_SCALE);
            drawPoint(p, ANGLE/2 * ANGLE_SCALE);
            drawPoint(p, ANGLE * 3 / 4 * ANGLE_SCALE);
            drawPoint(p, ANGLE * ANGLE_SCALE);
            p.endShape(p.CLOSE);
            scale(p, 1/randArr[i]);
            randArr.forEach( (val, ind) => {
                if (randArr[ind] < tgtArr[ind]){
                    randArr[ind] += 0.0004;
                }
                else if (randArr[ind] >= tgtArr[ind]){
                    randArr[ind] -= 0.0004;
                }
                if (-0.02 < (randArr[ind] - tgtArr[ind]) && (randArr[ind] - tgtArr[ind]) < 0.02){
                    tgtArr[ind] = p.random(1, 1.6);
                }
            })
            // randArr = n;
        }
        
        //Draw circles;
        p.fill(c);
        p.ellipse(0, 0, 320, 320);
        c = p.color(221, 167, 123);
        p.fill(c);
        p.ellipse(0, 0, 300, 300);

    };
}

export default CircleContainer;