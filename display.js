function Display(graph) {

  this.canvas =  $('#map_canvas')[0];
  this.graph = graph;
  this.radius = 10;

  if (this.canvas.getContext) {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#f00';
  }

  this.out = function(txt) {
    if (typeof(txt) == 'object' && !$.isArray(txt)) {
      var new_txt = [];
      for(var i in txt) {
        new_txt.push(i + ': ' + txt[i]);
      }
      txt = new_txt.join(', ');
    }
    cur = $('#c').html();
    $('#c').html(cur + '\n' + txt);
  };

  this.draw = function(path) {
    var points = new Array();
    for(var i=0;i<path.length;i++) {
      points.push([this.graph.coords[path[i]][0], this.graph.coords[path[i]][1]]);
    }

    var corners = new Array;
    for(i=points.length-2;i>0;i--) {
      var a = points[i-1];
      var b = points[i];
      var c = points[i+1];
      var b1 = this.shorten_edge(a,b,this.radius);
      var b2 = this.shorten_edge(c,b,this.radius);
      corners[i] = [b1,b2];
    }

    for(i=points.length-2;i>0;i--) {
      points.splice(i,1,corners[i][0],corners[i][1]);
    }

    this.ctx.moveTo(points[0][0],points[0][1]);
    for(i=1;i<points.length;i++) {
      this.ctx.lineTo(points[i][0],points[i][1]);
    }
    this.ctx.stroke();
  };

  this.shorten_edge = function(p1,p2,length) {
    var p3 = [p2[0],p2[1]];
    if (p1[0] == p2[0]) {
      p3[1] = p2[1] + (1-2*(p1[1]<p2[1]))*length;
    } else if (p1[1] == p2[1]) {
      p3[0] = p2[0] + (1-2*(p1[0]<p2[0]))*length;
    } else {
      var m = (p2[1]-p1[1])/(p2[0]-p1[0]);
      var mx = Math.round(length*Math.sqrt(1/(1+m*m)));
      var my = Math.round(length*Math.sqrt(1/(1+1/(m*m))));
      p3[0] = p2[0] + (1-2*(p1[0]<p2[0]))*mx;
      p3[1] = p2[1] + (1-2*(m<0))*(1-2*(p1[0]<p2[0]))*my;
    }
    return p3;
  };
}