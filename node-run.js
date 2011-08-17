var util = require('util');
_ = require('./underscore-min.js')._;
require('./ladds_object.js');
require('./graph_prototype.js');

function Graph() {
  this.node_hash = {};
  this.streets = [];
  this.out = function(txt) {console.info(txt);};
}
Graph.prototype = Graph_prototype;
var g = new Graph();
g.graph = Ladds;
g.initialize_node_data();

var p1 = g.generate_loop();
var score1 = g.score(p1);
var p2 = g.generate_loop();
var score2 = g.score(p2);

var parents = [p1,p2];
console.info('Adam and Eve:');
console.info(util.inspect(score1));
console.info('file:///Users/davemiller/Ladds/index.html#' + p1.toString());
console.info(util.inspect(score2));
console.info('file:///Users/davemiller/Ladds/index.html#' + p2.toString());
console.info('********');

var best = _.last([score1,score2].sort(g.sort_score));

while(true) {
  var children = g.breed(p1,p2);
  console.info('children:', children.length);
  for(var i=0;i<children.length;i++) {
    var score = g.score(children[i]);
    if (g.sort_score(score,best) == 1) {
      best = score;
      p1 = children[i];
      console.info(score);
      console.info('file:///Users/davemiller/Ladds/index.html#' + p1.toString());
    }
  }
  p2 = g.generate_loop();
}


// var max = _.first([score1,score2].sort(g.sort_score));
// var prodigies = [p1,p2];
// while(true) {
//   var children = g.breed(p1,p2);
//   console.info('children:', children.length);
//   var prodigy_max = max;
//   for(var i=0;i<children.length;i++){
//     var score = g.score(children[i]);
//     if (g.sort_score(children[i], prodigy_max) > 0) {
//       prodigies.push(children[i]);
//       prodigies.sort(g.sort_score);
//       if (prodigies.length > 4) prodigies.slice(0,1);
//       prodigy_max = _.first(prodigies);
//     }
//   }
//   while (prodigies.length < 4) prodigies.push(g.generate_loop());
//   var grandchildren = g.breed(prodigies[0], prodigies[1]).concat(g.breed(prodigies[2], prodigies[3]));
//   console.info('grandchildren:', grandchildren.length);
//   for(var i=0;i<grandchildren.length;i++){
//     var score = g.score(grandchildren[i]);
//     if (g.sort_score(score, max) > 0) {
//       max = score;
//       p1 = grandchildren[i];
//       console.info(util.inspect(score));
//       console.info('file:///Users/davemiller/Ladds/index.html#' + p1.toString());
//     }
//   }
//   var hot = g.hot_nodes(p1);
//   if (_.isEmpty(hot)) {
//     p2 = g.generate_loop();
//   } else {
//     console.info('*' + hot.toString());
//     p2 = g.generate_hot_loop( hot );
//   }
//   prodigies = [p1];
// }