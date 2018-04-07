function draw() {
  const canvas2DSupported = !!window.CanvasRenderingContext2D;
  if(canvas2DSupported) {
    let canvas = document.getElementById('canv');
    var worldHeight = window.innerHeight;
    var worldWidth = window.innerWidth;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
    let ctx = canvas.getContext('2d');
    ctx.g
    
    function doTheThing(offset) {  
      ctx.clearRect(0, 0, worldWidth + 150, worldHeight);
      ctx.translate(-offset, 0);
      ctx.fillRect(worldWidth, 10, 150, 150);
    }
    
    var x = 0;
    setInterval(
      () => {
        doTheThing(x);
        x=10;
      },
      150
    )
  }
}
draw();
