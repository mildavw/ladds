describe("Graph", function() {
  var graph;
  
  beforeEach(function() {
    graph = new Graph(Ladds);
    // spyOn(graph.d, 'out');
  });

  describe("when breeding", function() {

    it('should be able to grab an inner path segment', function() {
      var actual = graph.get_path_segment([0,1,2,3,4],1,3);
      expect(actual).toEqual([1,2,3]);
      
      var actual = graph.get_path_segment([0,1,2,3,4],4,1);
      expect(actual).toEqual([4,3,2,1]);
    });

    it('should be able to insert a path segment of one path into another', function() {
      var actual = graph.replace_chunks([0,1,2,3,4,5,6],0,3,[1,2,0,9,10,11,3,4,5],2,6);
      expect(actual).toEqual([0,9,10,11,3,4,5,6]);

      var actual = graph.replace_chunks([0,1,2,3,4,5,6],0,3,[7,3,5,4,0,9],4,1);
      expect(actual).toEqual([0,4,5,3,4,5,6]);

      // graph.replace_chunks([0,1,2],0,1,[2,3],0,1);
      // expect('graph.d.out').toHaveBeenCalledWith('Error: illegal replace chunks!')
    });

    it("should be able to create an array of paths from node x to node y", function() {
       var actual = graph.indices_of_node_pair([1,2,1,4,5,1],[1,4]);
       expect(actual.length).toEqual(3);
       expect(actual).toContain([0,3])
       expect(actual).toContain([2,3]);
       expect(actual).toContain([5,3]);

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

  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });
  // 
  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();
  // 
  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });
  // 
  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });
  // 
  // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');
  // 
  //   player.play(song);
  //   player.makeFavorite();
  // 
  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);
  // 
  //     expect(function() {
  //       player.resume();
  //     }).toThrow("song is already playing");
  //   });
  // });
});