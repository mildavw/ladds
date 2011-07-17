var util = require('util');
require('./ladds.js');
var g = require('./node-graph.js');
var _ = require('./underscore-min.js')._;

g.graph = Ladds;
g.initialize_node_data();

var p1 = g.generate_loop();
var p2 = g.generate_loop();

var parents = [p1,p2];
var max = _.max([g.score(p1).points,g.score(p2).points]);
console.info(max);
while(true) {
  var children = g.breed(p1,p2);
  console.info('children:', children.length);
  for(var i=0;i<children.length;i++){
    if (g.score(children[i]).points > max) {
      max = g.score(children[i]).points;
      var fittest = i;
      p1 = children[i];
    }
  }
  p2 = g.generate_loop();
  console.info('max:',max);
}