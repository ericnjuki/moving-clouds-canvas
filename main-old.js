function draw() {
  const canvas2DSupported = !!window.CanvasRenderingContext2D;
  if(canvas2DSupported) {
    let canvas = document.getElementById('canvas-clouds');
    let bgCanv = document.getElementById('canvas-bg');

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

    
    var x = 0;
    var y = 1;
    var radius = 20;
    var cloudWidth = 200;
    var maxBaseAltitude = 60;
    var minBaseAltitude = 80;
    // var baseEnd = [baseStart[x] - cloudWidth, baseStart[y]];
    
    var linearGradient2 = ctx.createLinearGradient(worldWidth/2, 0, worldWidth/2, minBaseAltitude);
    linearGradient2.addColorStop(0, 'white')
    linearGradient2.addColorStop(0.4, 'rgb(255, 255, 255)');
    ctx.fillStyle = linearGradient2;
    
    
    var baseStartRef = [worldWidth + cloudWidth + radius, Math.floor(Math.random()*minBaseAltitude) + maxBaseAltitude];
    function generateCloud(offset) {
      var baseStart = baseStartRef.slice();
      baseStart[x] -= offset;
      var baseEnd = [baseStart[x] - 200, baseStart[y]];

      ctx.clearRect(0, 0, worldWidth + 150, worldHeight);
      ctx.beginPath(); 
      ctx.arc(baseStart[x], baseStart[y] - radius, radius, toRadians(270), toRadians(90));
      ctx.lineTo(baseEnd[x], baseEnd[y]);
      ctx.arc(baseEnd[x], baseEnd[y] - radius, radius, toRadians(90), toRadians(270));
      ctx.closePath();
      ctx.fill();
      
    }
    function toRadians(deg) {
      return deg * 0.0174533;
    }
    
    var k = 0;
    setInterval(
      () => {
        generateCloud(k);
        k+=0.3;
      },
      1
    )
  } else {
    // canvas not supported, render static content
  }
}
window.requestAnimationFrame(draw);