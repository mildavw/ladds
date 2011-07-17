describe("Graph", function() {
  var graph;
  
  beforeEach(function() {
    graph = new Graph(Ladds);
    spyOn(graph, 'out');
  });

  describe("when breeding", function() {
    
    it('should produce the right offspring', function() {
      var actual = graph.breed([0,1,2],[0,4,2]);
      expect(actual.length).toEqual(1);
      expect(actual).toContain([0,1,2,0,4,2]);

      var actual = graph.breed([0,1,2,3],[2,5,3]);
      expect(actual.length).toEqual(3);
      expect(actual).toContain([0,1,2,5,3]);
      expect(actual).toContain([0,1,2,3,2,5,3]);
      expect(actual).toContain([2,3]);
    });

    it('should be able to provide permutations of pairs of items in an array', function() {
      var actual = graph.permutations([1,3,5]);
      expect(actual.length).toEqual(9);
      expect(actual).toContain([1,1]);
      expect(actual).toContain([1,3]);
      expect(actual).toContain([1,5]);
      expect(actual).toContain([3,3]);
      expect(actual).toContain([3,1]);
      expect(actual).toContain([5,5]);
      expect(actual).toContain([3,5]);
      expect(actual).toContain([5,1]);
      expect(actual).toContain([5,3]);
    });

    it('should be able to grab an inner path segment', function() {
      var actual = graph.get_path_segment([0,1,2,3,4],1,3);
      expect(actual).toEqual([1,2,3]);
      
      var actual = graph.get_path_segment([0,1,2,3,4],4,1);
      expect(actual).toEqual([4,3,2,1]);
    });

    it('should be able to insert a path segment of one path into another', function() {
      var actual = graph.replace_segment([0,1,2,3,4,5,6],0,3,[1,2,0,9,10,11,3,4,5],2,6);
      expect(actual).toEqual([0,9,10,11,3,4,5,6]);
          
      var actual = graph.replace_segment([0,1,2,3,4,5,6],0,3,[7,3,5,4,0,9],4,1);
      expect(actual).toEqual([0,4,5,3,4,5,6]);
    
      var actual = graph.replace_segment([0,1,2,3],3,2,[2,5,3],2,0)
      expect(actual).toEqual([0,1,2,5,3]);
    
      graph.replace_segment([0,1,2],0,1,[2,3],0,1);
      expect(graph.out).toHaveBeenCalledWith('Error: illegal replace chunks! Paths must match.')
    });

    it("should be able to create an array of paths from node x to node y", function() {
       var actual = graph.indices_of_node_pair([1,2,1,4,5,1],[1,4]);
       expect(actual.length).toEqual(3);
       expect(actual).toContain([0,3])
       expect(actual).toContain([2,3]);
       expect(actual).toContain([5,3]);

       var actual = graph.indices_of_node_pair([1,2,1,4,5,1],[1,1]);
       expect(actual.length).toEqual(6);
       expect(actual).toContain([0,2])
       expect(actual).toContain([2,0])
       expect(actual).toContain([0,5]);
       expect(actual).toContain([5,0]);
       expect(actual).toContain([2,5]);
       expect(actual).toContain([5,2]);

       var actual = graph.indices_of_node_pair([1,2,1,4,5,1],[99,114]);
       expect(actual).toEqual([]);
     });

    it("should be able to find all of the indices of a node in a path", function() {
      var actual = graph.indices_of_node([1,2,1,4,5,1],1);
      expect(actual).toEqual([0,2,5]);
      
      var actual = graph.indices_of_node([1,2,1,4,5,1],10);
      expect(actual).toEqual([]);
    });

  });
});