map = new Array();

map.add_edge = function(p1,p2) {
  if (typeof(this[p1]) == 'undefined') {
    this[p1] = [p2]
  } else {
    this[p1].push(p2)
  }
}

borders = new Array();

function b(p1,p2) {
  map.add_edge(p1,p2);
  map.add_edge(p2,p1);
}

streets = new Array();

function s(p1,p2) {
  map.add_edge(p1,p2);
  map.add_edge(p2,p1); 
  streets.push([p1,p2].sort().toString());
}

// border edges
b(  1,  2);     b( 11, 20);     b( 87, 94);
b(  1, 11);     b( 13, 24);     b( 91, 99);
b(  2,  3);     b( 20, 44);     b( 94, 95);
b(  3,  4);     b( 24, 59);     b( 95, 96);
b(  4,  5);     b( 44, 81);     b( 96, 97);
b(  5,  6);     b( 59, 83);     b( 97, 98);
b(  6,  7);     b( 81, 87);     b( 98, 99);
b(  7, 13);     b( 83, 91);

// street edges
s(  1, 12);     s( 25, 29);     s( 46, 68);     s( 69, 72);
s(  2, 21);     s( 26, 29);     s( 47, 48);     s( 69, 76);
s(  3,  8);     s( 27, 34);     s( 47, 65);     s( 70, 74);
s(  4,  9);     s( 27, 45);     s( 48, 60);     s( 70, 87);
s(  5, 10);     s( 28, 32);     s( 49, 50);     s( 71, 77);
s(  6, 23);     s( 28, 40);     s( 49, 60);     s( 71, 78);
s(  7, 30);     s( 29, 36);     s( 50, 51);     s( 72, 75);
s(  8,  9);     s( 30, 34);     s( 50, 70);     s( 72, 91);
s(  8, 14);     s( 30, 42);     s( 51, 61);     s( 73, 81);
s(  9, 10);     s( 31, 35);     s( 52, 53);     s( 74, 79);
s(  9, 15);     s( 31, 58);     s( 52, 62);     s( 74, 94);
s( 10, 16);     s( 32, 34);     s( 53, 54);     s( 75, 80);
s( 11, 12);     s( 32, 50);     s( 53, 72);     s( 75, 99);
s( 11, 32);     s( 33, 35);     s( 54, 63);     s( 76, 83);
s( 12, 28);     s( 33, 53);     s( 55, 56);     s( 77, 82);
s( 13, 33);     s( 34, 37);     s( 55, 63);     s( 77, 84);
s( 14, 15);     s( 34, 46);     s( 56, 57);     s( 78, 82);
s( 14, 17);     s( 35, 38);     s( 56, 66);     s( 78, 86);
s( 15, 16);     s( 35, 57);     s( 57, 58);     s( 79, 84);
s( 15, 18);     s( 36, 41);     s( 57, 69);     s( 80, 86);
s( 16, 19);     s( 37, 39);     s( 58, 59);     s( 80, 98);
s( 17, 18);     s( 37, 47);     s( 58, 76);     s( 82, 85);
s( 17, 21);     s( 38, 43);     s( 60, 65);     s( 84, 85);
s( 17, 25);     s( 38, 56);     s( 61, 64);     s( 84, 88);
s( 18, 19);     s( 39, 48);     s( 61, 74);     s( 85, 86);
s( 18, 22);     s( 39, 49);     s( 62, 64);     s( 85, 89);
s( 19, 23);     s( 40, 41);     s( 62, 75);     s( 86, 90);
s( 19, 26);     s( 40, 51);     s( 63, 66);     s( 88, 89);
s( 20, 27);     s( 41, 42);     s( 64, 67);     s( 88, 92);
s( 21, 28);     s( 42, 52);     s( 65, 68);     s( 89, 90);
s( 21, 36);     s( 43, 54);     s( 66, 69);     s( 89, 93);
s( 22, 25);     s( 43, 55);     s( 67, 71);     s( 90, 97);
s( 22, 26);     s( 44, 45);     s( 67, 79);     s( 92, 93);
s( 23, 30);     s( 45, 46);     s( 67, 80);     s( 92, 95);
s( 23, 36);     s( 45, 73);     s( 68, 70);     s( 93, 96);
s( 24, 31);     s( 46, 47);     s( 68, 73);

starting_and_ending_nodes = [40, 41, 42, 51, 52, 61, 62, 64]

function loop() {
  var start_idx = random_0_to_(starting_and_ending_nodes.length-1)
  var path = [ starting_and_ending_nodes[start_idx] ];
  while (true) {
    var last_step = path[path.length-1];
    var next_idx = random_0_to_(map[last_step].length-1);
    var next_step = map[last_step][next_idx];
    if (next_step != path[path.length-2]) path.push( next_step );
    if (starting_and_ending_nodes.indexOf(path[path.length-1])>-1) break;
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
  
  var score = {points:0, length:loop.length-1, streets:edges.length, backtracks:0};
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

function mate(loop1, loop2) {
  var child = new Array();
  for(var i=0;i<loop1.length;i++) {
    for(var j=0;j<loop2.length;j++) {
      
    }
  }
}

l = loop();
console.info(l);
console.info(score(l));