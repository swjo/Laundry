
// getting started with p5js
function setup(){
  // once


  // get the data
d3.json("https://gist.githubusercontent.com/swjo/fb8143d4383c2d07892a/raw/f04eda466ac6052a286508934fe2b22c3e45b8b6/data.json", function(error, links) {
  var nodes = {};

  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
      link.source = nodes[link.source] ||
          (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] ||
          (nodes[link.target] = {name: link.target});
      link.value = +link.value;
  });

  var width = 960,
      height = 700;

  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(60)
      .charge(-300)
      .on("tick", tick)
      .start();

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  // build the arrow.
  svg.append("svg:defs").selectAll("marker")
      .data(["end"])
    .enter().append("svg:marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");
      

  // add the links and the arrows
  var path = svg.append("svg:g").selectAll("path")
      .data(force.links())
    .enter().append("svg:path")
      .attr("class", "link")
      .attr("marker-end", "url(#end)");

  // define the nodes
  var node = svg.selectAll(".node")
      .data(force.nodes())
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  // add the nodes
  node.append("circle")
      .attr("r", 5);

  // add the text
  node.append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  // add the curvy lines
  function tick() {
      path.attr("d", function(d) {
          var dx = d.target.x - d.source.x,
              dy = d.target.y - d.source.y,
              dr = Math.sqrt(dx * dx + dy * dy);
              // dr = 0 square lines
          return "M" +
              d.source.x + "," +
              d.source.y + "A" +
              dr + "," + dr + " 0 0,1 " +
              d.target.x + "," +
              d.target.y;
      });

      node
          .attr("transform", function(d) {
              return "translate(" + d.x + "," + d.y + ")"; });
  }

  });


}
function draw(){



}

setup();
