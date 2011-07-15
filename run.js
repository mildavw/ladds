
var g = new Graph(Ladds);
var d = new Display(Ladds);

// 
// function mate_concat(loop1, loop2) {
//   return loop1.concat(loop2);
// }

// while(true) {
  l = g.generate_loop();
  d.draw(l);
  s = g.score(l);
  // if (s.points > 50) {
  // d.draw(l);
  d.out(l);
  d.out(s);
    // break;
  // }
// }

// out(best.length + ' loops for mating');

// for(var i=0;i<best.length;i++) {
//   for(var j=0;j<best.length;j++) {
//     if (i!=j) {
//       var child = mate_concat(best[i],best[j]);
//       out(score(best[i]).points + ' + ' + score(best[j]).points + ' = ' + score(child).points);
//     }
//   }  
// }

