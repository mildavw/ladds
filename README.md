Shortly after my esteemed colleague [geeksam](https://github.com/geeksam) gave a great talk to our company showing how git repositories are like graphs ([graph-theory](http://en.wikipedia.org/wiki/Graph_theory) graphs) and what common git commands do to the repository/graph, I spotted a local bike ride event that went through Sam's neighborhood and involved graph theory. The challenge was to ride as many streets in an hour without doubling back on any. I alerted Sam and of course he went right to work coding [a solution](https://github.com/geeksam/ladds_graph/) to the problem!

See his [readme](https://github.com/geeksam/ladds_graph/blob/master/README.md) for a description of the challenge.

I thought it was an interesting problem and thought I'd try to come up with a solution that was different than Sam's brute force depth-first search for a maximum scoring path. I also thought I'd write it in javascript so that I could see some results in a browser and run the code that needed to be fast in the V8 javascript engine via node.js. (Apologies in advance for the architecture required to get the same code running in node.js, Jasmine, and the browser!)

My approach was to take randomly generated paths through the graph and "mate" them by substituting paths between common node pairs. If any of the resulting children had a higher score than the best scoring adult, then I'd mate that child with another random path.

After coding this up, I set the program running and went home. When I got back to the office that night, this was waiting for me:

51,61,74,79,84,77,71,78,82,85,84,88,89,93,92,95,96,97,90,89,85,86,80,98,99,91,72,69,66,63,54,53,33,13,24,59,83,91,99,75,80,67,64,62,75,72,53,52,42,30,23,19,26,29,36,41,40,28,12,11,20,44,81,73,45,44,20,11,1,2,3,8,9,10,5,6,23,36,21,17,14,15,16,19,18,22,25,17,18,15,9,4,5,6,7,13,24,59,58,76,69,57,35,31,58,57,56,55,43,38,35,33,30,7,6,5,4,3,2,21,28,32,34,46,45,27,20,11,32,50,70,87,94,74,70,68,46,47,65,60,48,47,37,39,49,50,51,40

You can imagine my surprise. OK, maybe you can't. This is a pretty high scoring path and has zero (penalized) backtracks!

[View it here.](http:mildavw.github.com/ladds#51,61,74,79,84,77,71,78,82,85,84,88,89,93,92,95,96,97,90,89,85,86,80,98,99,91,72,69,66,63,54,53,33,13,24,59,83,91,99,75,80,67,64,62,75,72,53,52,42,30,23,19,26,29,36,41,40,28,12,11,20,44,81,73,45,44,20,11,1,2,3,8,9,10,5,6,23,36,21,17,14,15,16,19,18,22,25,17,18,15,9,4,5,6,7,13,24,59,58,76,69,57,35,31,58,57,56,55,43,38,35,33,30,7,6,5,4,3,2,21,28,32,34,46,45,27,20,11,32,50,70,87,94,74,70,68,46,47,65,60,48,47,37,39,49,50,51,40)

If you load [that page with no hash](http:mildavw.github.com/ladds), it will generate a random solution and show its score.

I attempted a few tweaks to the breeding algorithm but never did match that first high score!

Dave