function draw() {
  const canvas2DSupported = !!window.CanvasRenderingContext2D;
  if(canvas2DSupported) {
    let canvas = document.getElementById('canv');
    let bgCanv = document.getElementById('bg');

    var worldHeight = window.innerHeight;
    var worldWidth = window.innerWidth;
    bgCanv.width = canvas.width = worldWidth;
    bgCanv.height = canvas.height = worldHeight;
    let ctx = canvas.getContext('2d');
    let bgCtx = bgCanv.getContext('2d');

    var linearGradient = ctx.createLinearGradient(worldWidth/2, 0, worldWidth/2, worldHeight);
    linearGradient.addColorStop(0.8, 'lightblue')
    linearGradient.addColorStop(1, 'orange');
    bgCtx.fillStyle = linearGradient;
    bgCtx.fillRect(0, 0, worldWidth, worldHeight);

    var linearGradient2 = ctx.createLinearGradient(worldWidth/2, 0, worldWidth/2, worldHeight);
    linearGradient2.addColorStop(0, 'white')
    linearGradient2.addColorStop(0.4, 'grey');
    ctx.fillStyle = linearGradient2;
    // ctx.beginPath(); 
    // ctx.moveTo(500, 300);   
    // ctx.lineTo(100, 300);
    // ctx.arcTo(100, 250, 150, 250, 50);
    // ctx.arcTo(150, 200, 200, 200, 50);
    // // ctx.arcTo(220, 180, 240, 200, 30);
    // ctx.arc(250, 250, Math.sqrt(50*50 + 50*50), toRadians(240), toRadians(310));
    // ctx.stroke();  

    var x = 0;
    var y = 1;
    var radius = 20;
    var baseStart = [1200, 100];
    var baseEnd = [baseStart[x] - 200, baseStart[y]];

    // ctx.moveTo(baseStart[x], baseStart[y] - radius);   
    // ctx.stroke();  
    
    function doThisOtherThing(offset) {
      var internalBaseStart = baseStart.slice();
      internalBaseStart[x] -= offset;
      var internalBaseEnd = [internalBaseStart[x] - 200, internalBaseStart[y]];

      ctx.clearRect(0, 0, worldWidth + 150, worldHeight);
      ctx.beginPath(); 
      ctx.arc(internalBaseStart[x], internalBaseStart[y] - radius, radius, toRadians(270), toRadians(90));
      ctx.lineTo(internalBaseEnd[x], internalBaseEnd[y]);
      ctx.arc(internalBaseEnd[x], internalBaseEnd[y] - radius, radius, toRadians(90), toRadians(270));
      ctx.closePath();
      ctx.fill();
      
    }
    function doTheThing(offset) {  
      ctx.clearRect(0, 0, worldWidth + 150, worldHeight);
      ctx.fillStyle = 'black';
      ctx.translate(-offset, 0);
      ctx.fillRect(worldWidth, 10, 150, 150);
    }
    function toRadians(deg) {
      return deg * 0.0174533;
    }
    function setIntervalX(callback, delay, reps) {
      var z = 0;
      var intervalID = window.setInterval(function () {
         callback();
         if (++z === reps) {
             window.clearInterval(intervalID);
         }
      }, delay);
    }
    
    var k = 0;
    setInterval(
      () => {
        doThisOtherThing(k);
        k++;
      },
      25
    )
  }
}
window.requestAnimationFrame(draw);
