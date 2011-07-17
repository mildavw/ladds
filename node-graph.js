this.node_hash = {};
this.streets = new Array();
var _ = require('./underscore-min.js')._;

this.add_edge = function(p1,p2) {
  if (typeof(this.node_hash[p1]) == 'undefined') {
    this.node_hash[p1] = [p2];
  } else {
    this.node_hash[p1].push(p2);
  }
},

this.initialize_node_data = function() {  
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

this.generate_loop = function() {
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

this.breed = function(a,b) {
  // create children with common paths
  var children = [];
  var common_nodes = _.intersection(a,b);
  var possible_common_node_pairs = this.permutations(common_nodes);
  var is_ok = function(a,b,child) {
    return !_.isEqual(a,child) &&
    !_.isEqual(b,child) &&
    !_.isEqual(_.clone(a).reverse(),child) &&
    !_.isEqual(_.clone(b).reverse(),child) &&
    !_.isUndefined(child)
  }
  var includes_array = function(haystack,needle) {
    for(var i=0;i<haystack.length;i++) {
      if (_.isEqual(haystack[i],needle)) return true;
    }
    return false;
  }
  for(var i=0;i<possible_common_node_pairs.length;i++) {
    var pair = possible_common_node_pairs[i];
    var a_indices = this.indices_of_node_pair(a,pair);
    var b_indices = this.indices_of_node_pair(b,pair);
    if (_.size(a_indices)>0 && _.size(b_indices)>0) {
      for(var j=0;j<a_indices.length;j++) {
        var a_index = a_indices[j];
        for(var k=0;k<b_indices.length;k++) {
          var b_index = b_indices[k];
          var b_into_a = this.replace_segment(_.clone(a),a_index[0],a_index[1],_.clone(b),b_index[0],b_index[1]);
          var a_into_b = this.replace_segment(_.clone(b),b_index[0],b_index[1],_.clone(a),a_index[0],a_index[1]);
          if (is_ok(a,b,a_into_b) && !includes_array(children,a_into_b)) children.push(a_into_b);
          if (is_ok(a,b,b_into_a) && !includes_array(children,b_into_a)) children.push(b_into_a);
        }
      }
    }
  }
  children.push(a.concat(b));
  return children;
},

this.replace_segment = function(path1,start1,end1,path2,start2,end2) {
  // replace chunks of path1 with similar chunks of path2
  var existing = this.get_path_segment(path1, start1, end1);
  var replacements = this.get_path_segment(path2, start2, end2);
  if (existing[0] != replacements[0] || _.last(existing) != _.last(replacements)) {
    this.out('Error: illegal replace chunks! Paths must match.');
    this.out(['Trying to replace',path1,start1,end1].join(' : '));
    this.out(['with',path2,start2,end2].join(' : '));
  }
  if (!_.isEqual(existing,replacements)) {
    if (start1 < end1) {
      var index = start1;
    } else {
      var index = end1;
      replacements.reverse();
    }
    var howmany = 1+Math.abs(start1 - end1);
    path1.splice(index,howmany,replacements);
    return _.flatten(path1);
  }
},

this.get_path_segment = function(path, start, end) {
  if (start <= end) return path.slice(start,end+1);
  result = [];
  for(var i=end;i<=start;i++) result.unshift(path[i]);
  return result;
},

this.indices_of_node_pair = function(path,pair) {
  var a = this.indices_of_node(path,pair[0]);
  var b = this.indices_of_node(path,pair[1]);
  result = [];
  for(var i=0;i<a.length;i++) {
    for(var j=0;j<b.length;j++) {
      if (a[i] != b[j]) result.push([a[i],b[j]]);
    }
  }
  return result;
},

this.indices_of_node = function(path,node) {
  var result = [];
  for(var i=0;i<path.length;i++) {
    if (path[i] == node) result.push(i);
  }
  return result;
},

this.permutations = function(array) {
  result = new Array();
  for(var i=0;i<array.length;i++) {
    for(var j=0;j<array.length;j++) {
      result.push([array[i],array[j]]);
    }
  }
  return result;
},

this.random_0_to_ = function(i) {
  return Math.floor(Math.random()*(i+1));
},

this.score = function(loop) {
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