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
      var next_options = _.without(this.node_hash[last_step], path[path.length-2]);  //don't backtrack immediately
      var next_idx = this.random_0_to_(next_options.length-1);
      var next_step = next_options[next_idx];
      path.push( next_step );
      if ((center.indexOf(path[path.length-1])>-1) && (path.length > 8)) break;
    }
    return path;
  },

  breed: function(a,b) {
    // create children with common loops
    var children = [];
    var common_nodes = _.intersection(a,b);
    var possible_common_node_pairs = this.permutations(common_nodes);
    for(var i=0;i<possible_common_node_pairs.length;i++) {
      var pair = possible_common_node_pairs[i];
      var a_indices = this.indices_of_node_pair(a,pair);
      var b_indices = this.indices_of_node_pair(b,pair);
      if (_.size(a_indices)>0 && _.size(b_indices)>0) {
        for(var j=0;j<a_indices.length;j++) {
          var a_index = a_indices[j];
          for(var k=0;k<b_indices.length;k++) {
            var b_index = b_indices[k];
            children.push(this.replace_chunks(a,a_index[0],a_index[1],b,b_index[0],b_index[1]));
            children.push(this.replace_chunks(b,b_index[0],b_index[1],a,a_index[0],a_index[1]));
          }
        }
      }
    }
    return children;
  },

  replace_chunks: function(path1,start1,end1,path2,start2,end2) {
    // replace chunks of path1 with similar chunks of path2
    var existing = path1.slice(start1, end1);
    var replacements = path2.slice(start2, end2);
    if (!_.isEqual(existing,replacements)) {
      var index = (start1 < end1) ? start1 : end1;
      var howmany = Math.abs(start1 - end1);
      path1.splice(index,howmany,replacements);
      return _.flatten(path1);
    }
  },

  indices_of_node_pair: function(path,pair) {
    var a = this.indices_of_node(path,pair[0]);
    var b = this.indices_of_node(path,pair[1]);
    result = [];
    for(var i=0;i<a.length;i++) {
      for(var j=0;j<b.length;j++) {
          result.push([a[i],b[j]]);
      }
    }
    return result;
  },

  indices_of_node: function(path,node) {
    var result = [];
    for(var i=0;i<path.length;i++) {
      if (path[i] == node) result.push(i);
    }
    return result;
  },
  
  permutations: function(array) {
    result = new Array();
    for(var i=0;i<array.length;i++) {
      for(var j=0;j<array.length;j++) {
        if (i!=j) {
          result.push([array[i],array[j]]);
        }
      }
    }
    return result;
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