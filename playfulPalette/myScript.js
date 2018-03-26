(function(){

  var can_ = DOM('<canvas></canvas>');
  DOM(document.body).append(can_);

  can_.css({"border":"solid 1px #000"});
  var can = can_.getDom(),
      ctx = can.getContext('2d'),
      width = can.width = 400,
      height = can.height = 400,
      pp = new Palette();
      
  pp.addPaint([244,67,54]).move(100, 100).ray(200);
  pp.addPaint([33,150,243]).move(200, 100).ray(200);
  pp.addPaint([0,150,136]).move(220, 220).ray(200);
  pp.addPaint([255,193,7]).move(110, 180).ray(200);

  function render(){
    var imageData = ctx.getImageData(0, 0, width, height), d = imageData.data, y = -1;
    for (var i = 0; i < d.length; i += 4){
      var x = (i/4) % width;
      y = x == 0 ? y+1 : y;
      var c = pp.getPick(x, y);
      d[i] = c[0]; d[i+1] = c[1]; d[i+2] = c[2]; d[i+3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    //window.requestAnimationFrame(render);
  }

  render();

  var myBoll = pp.addPaint().move(0, 0).ray(100);
  can_.on('mousemove', function(a){
    myBoll.move(a.offsetX, a.offsetY);
    render();
  });
}());