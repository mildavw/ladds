function loop() {
  var start_idx = random_0_to_(starting_and_ending_nodes.length-1)
  var path = [ starting_and_ending_nodes[start_idx] ];
  while (true) {
    var last_step = path[path.length-1];
    var next_idx = random_0_to_(map[last_step].length-1);
    var next_step = map[last_step][next_idx];
    if (next_step != path[path.length-2]) path.push( next_step );
    if ((starting_and_ending_nodes.indexOf(path[path.length-1])>-1) && (path.length > 8)) break;
  }
  return path;
}

function random_0_to_(i) {
  return Math.floor(Math.random()*(i+1));
}

function score(loop) {
  var edges = new Array();
  for(var i=0;i<loop.length-1;i++) {
    var edge = [ loop[i], loop[i+1] ].sort().toString();
    if (streets.indexOf(edge) > -1) edges.push(edge);
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

function mate_concat(loop1, loop2) {
  return loop1.concat(loop2);
}

while(true) {
  l = loop();
  s = score(l);
  if (s.points > 50) {
    drawPath(l);
    out(l);
    out(s);
    break;
  }
}

// out(best.length + ' loops for mating');

// for(var i=0;i<best.length;i++) {
//   for(var j=0;j<best.length;j++) {
//     if (i!=j) {
//       var child = mate_concat(best[i],best[j]);
//       out(score(best[i]).points + ' + ' + score(best[j]).points + ' = ' + score(child).points);
//     }
//   }  
// }

function out(txt) {
  if (typeof(txt) == 'object' && !$.isArray(txt)) {
      var new_txt = '';
      for(var i in txt) new_txt =+ i + ': ' + txt[i] + '\t';
      txt = new_txt;
    }
  cur = $('#c').html();
  $('#c').html(cur + '\n' + txt)
}