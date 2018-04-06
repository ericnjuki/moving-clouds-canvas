function draw() {
  const canvas2DSupported = !!window.CanvasRenderingContext2D;
  if(canvas2DSupported) {
    let canvas = document.getElementById('canv');
    canvas.width = 500;
    canvas.height = 500;
    let ctx = canvas.getContext('2d');
    
    function doTheThing(offset) {
      ctx.clearRect(0, 0, 500, 500);
      var lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
      lineargradient.addColorStop(0, 'black');
      lineargradient.addColorStop(0.3, 'white');
      lineargradient.addColorStop(0.35, 'red');
      lineargradient.addColorStop(0.65, 'white');
      lineargradient.addColorStop(1, 'green');
      ctx.fillStyle = lineargradient;
      ctx.fillRect(0, 0, 150, 150);
      ctx.save();
      
      ctx.fillStyle = 'rgba(0, 0, 200, 0.99)';
      ctx.fillRect(160, 0, 150, 150);
      ctx.save();
  
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(320, 0, 150, 150);
  
      ctx.restore();
      ctx.fillRect(480, 0, 150, 150);
  
      ctx.restore();
      ctx.fillRect(0, 160, 150, 150);
  
      ctx.save();
      ctx.translate(offset, offset);
      ctx.fillRect(0, 0, 150, 150);
      // ctx.fillStyle = 'rgb(0, 200, 0)';
      ctx.restore();
    }
    
    var x = 0;
    setInterval(
      () => {
        doTheThing(x%500);
        x++;
      },
      100
    )
  }
}
draw();
