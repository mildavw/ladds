var g = new Graph(Ladds);
var d = new Display(Ladds);

var hash = window.location.hash;
if (hash) {
  var loop = hash.slice(1).split(',');
  d.draw(loop);
  d.out(loop);
  d.out(g.score(loop));
} else {
  var p1 = g.generate_loop();
  var p2 = g.generate_loop();
  var parents = [p1,p2];
  var max = Math.max([g.score(p1).points,g.score(p1).points]);
  d.out(g.score(p1));
  // while(true) {
  //   var children = g.breed(p1,p2);
  //   for(var i=0;i<children.length;i++){
  //     if (g.score(children[i]).points > max) {
  //       max = g.score(children[i]).points;
  //       var fittest = i;
  //       p1 = children[i];
  //     }
  //   }
  //   p2 = g.generate_loop();
  //   d.draw(p1);
  //   d.out(max);
  // }
}