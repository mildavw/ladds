function Graph(graph) {
  this.graph = graph;
  this.node_hash = {};
  this.streets = new Array();
  this.initialize_node_data();
}

Graph.prototype = {
  add_edge: function(p1,p2) {
    if (typeof(this.node_hash[p1]) == 'undefined') {
      this.node_hash[p1] = [p2];
    } else {
      this.node_hash[p1].push(p2);
    }
  },
  
  initialize_node_data: function() {  
    for(var i=0;i<this.graph.borders.length;i++) {
      var p = this.graph.borders[i];
      this.add_edge(p[0],p[1]); this.add_edge(p[1],p[0]);
    }
    for(var i=0;i<this.graph.streets.length;i++) {
      var p = this.graph.streets[i];
      this.add_edge(p[0],p[1]); this.add_edge(p[1],p[0]);
      this.streets.push([p[0],p[1]].sort().toString());
    }
  },

  generate_loop: function() {
    var center = this.graph.starting_and_ending_nodes;
    var start_idx = this.random_0_to_(_.size(center));
    var path = [ center[start_idx] ];
    while (true) {
      var last_step = _.last(path);
      var next_options = this.node_hash[last_step];
      var next_idx = this.random_0_to_(next_options.length-1);
      var next_step = next_options[next_idx];
      if (next_step != path[path.length-2]) path.push( next_step );
      if ((center.indexOf(path[path.length-1])>-1) && (path.length > 8)) break;
    }
    return path;
  },

  random_0_to_: function(i) {
    return Math.floor(Math.random()*(i+1));
  },

  score: function(loop) {
    var edges = new Array();
    for(var i=0;i<_.size(loop);i++) {
      var edge = [ loop[i], loop[i+1] ].sort().toString();
      if (this.streets.indexOf(edge) > -1) edges.push(edge);
    }
    edges.sort();

    var tally = {};
    for(i=0;i<edges.length;i++) {
      if (tally[edges[i]] == undefined) {
        tally[edges[i]] = 1;
      } else {
        tally[edges[i]]++;
      }
    }

    var score = {'points':0, 'length':loop.length-1, 'streets':edges.length, 'backtracks':0};
    for(i in tally) {
      if (tally[i] > 1) {
        score.points--;
        score.backtracks += tally[i];
      } else {
        score.points++;
      }
    }
    return score;
  }
}