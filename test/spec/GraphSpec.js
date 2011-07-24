describe("Graph", function() {
  var graph;

  beforeEach(function() {
    graph = new Graph();
    graph.graph = Ladds;
    graph.initialize_node_data();
    spyOn(graph, 'out');
  });

  describe("when scoring", function() {
    
    it('should produce a score given a loop', function() {

    });

    describe('should sort score objects properly:', function() {
      it('higher points win', function() {
        var s1 = {'points':51, 'length':90, 'streets':73, 'backtracks':16}
        var s2 = {'points':49, 'length':90, 'streets':73, 'backtracks':16}
        var actual = [s1,s2].sort(graph.sort_score);
        expect(actual[0]).toEqual(s2);
      });
      
      it('when points match, lower length wins', function() {
        var s1 = {'points':49, 'length':89, 'streets':73, 'backtracks':16}
        var s2 = {'points':49, 'length':90, 'streets':73, 'backtracks':16}
        var actual = [s1,s2].sort(graph.sort_score);
        expect(actual[0]).toEqual(s2);
      });
      
      it('when points and length, match, higher streets wins', function() {
        var s1 = {'points':49, 'length':90, 'streets':74, 'backtracks':16}
        var s2 = {'points':49, 'length':90, 'streets':73, 'backtracks':16}
        var actual = [s1,s2].sort(graph.sort_score);
        expect(actual[0]).toEqual(s2);
      });
      
      it('when points, length, and streets, match, lower backtracks wins', function() {
        var s1 = {'points':49, 'length':90, 'streets':73, 'backtracks':15}
        var s2 = {'points':49, 'length':90, 'streets':73, 'backtracks':16}
        var actual = [s1,s2].sort(graph.sort_score);
        expect(actual[0]).toEqual(s2);
      });
      
      it('if all is equal, no change.', function() {
        var s1 = {'points':49, 'length':90, 'streets':73, 'backtracks':16}
        var s2 = {'points':49, 'length':90, 'streets':73, 'backtracks':16}
        var actual = [s1,s2].sort(graph.sort_score);
        expect(actual[0]).toEqual(s2);
      });
    });
    
  });
  
  describe("when breeding", function() {
    
    it('should provide "hot" nodes to build a random mate around', function() {
      // This is a list of nodes of interest that we want to focus changes on
      // They include unused nodes, nodes with 2 or more unused street edges,
      // and nodes with backtracked edges that are not border edges.
      var actual = graph.hot_nodes([3,2,1,12,28,21,17,25,22,18,17,14,8,9,4,5,10,9,4,5,6,5]);
      expect(actual).toContain(3); // has two available edges
      expect(actual).toContain(16); // not used
      expect(actual).toContain(28); // two of four edges used
      expect(actual).toContain(9); // 9-4 is backtracked
      expect(actual).toContain(4); // 9-4 is backtracked

      expect(actual).not.toContain(1); // one available edge
      expect(actual).not.toContain(2); // no available edges
      expect(actual).not.toContain(17); // all four edges used
      expect(actual).not.toContain(6); // backtracked, but only on a border
    });
    
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