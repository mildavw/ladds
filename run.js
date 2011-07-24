function Graph() {
  this.node_hash = {};
  this.streets = new Array();
  this.out = function(txt) {d = new Display(); d.out(txt);}
};
Graph.prototype = Graph_prototype;
var g = new Graph();
g.graph = Ladds;
g.initialize_node_data();

var d = new Display(Ladds);

var hash = window.location.hash;

if (hash) {
  var loop = hash.slice(1).split(',');
} else {
  var loop = g.generate_loop(); // random loop
}

d.draw(loop);
d.out(loop);
d.out(g.score(loop));