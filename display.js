function Display(graph) {
  this.canvas =  $('#map_canvas')[0];
  this.graph = graph;
  this.radius = 10;
  
  if (this.canvas.getContext) {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#f00";
  }

  this.out = function(txt) {
    if (typeof(txt) == 'object' && !$.isArray(txt)) {
        var new_txt = '';
        for(var i in txt) new_txt =+ i + ': ' + txt[i] + '\t';
        txt = new_txt;
      }
    cur = $('#c').html();
    $('#c').html(cur + '\n' + txt)
  },
  
  this.draw = function(path) {
    var points = new Array();
    for(var i=0;i<path.length;i++) {
      points.push([this.graph.coords[path[i]][0], this.graph.coords[path[i]][1]])
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
      points.splice(i,1,corners[i][0],corners[i][1])
    }

    this.ctx.moveTo(points[0][0],points[0][1]);
    for(var i=1;i<points.length;i++) {
      this.ctx.lineTo(points[i][0],points[i][1]);
    }
    this.ctx.stroke();
  },

  this.shorten_edge = function(a,b,r) {
    var c = [b[0],b[1]];
    if (a[0] == b[0]) {
      c[1] = b[1] + (1-2*(a[1]<b[1]))*r;
    } else if (a[1] == b[1]) {
      c[0] = b[0] + (1-2*(a[0]<b[0]))*r;
    } else {
      var m = (b[1]-a[1])/(b[0]-a[0]);
      var mx = Math.round(r*Math.sqrt(1/(1+m*m)));
      var my = Math.round(r*Math.sqrt(1/(1+1/(m*m))));
      c[0] = b[0] + (1-2*(a[0]<b[0]))*mx;
      c[1] = b[1] + (1-2*(m<0))*(1-2*(a[0]<b[0]))*my;
    }
    return c;
  }
}