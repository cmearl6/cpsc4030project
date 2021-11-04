
d3.csv("dataset/player_attributes.csv").then(function(dataset) {
    var width = 1000
    var height = 500

    var svg = d3.select("#chart")
                .style("width", width)
                .style("height", height)

    console.log(dataset)

    var team = 'BKN'

    let activeplayers = dataset.filter(d => d.ROSTERSTATUS == "Active" && d.TEAM_ABBREVIATION == team)

    console.log(activeplayers)

    var layout = d3.forceSimulation(activeplayers)
                   .force('center', d3.forceCenter(width/2, height/2))
                   .force('collisions', d3.forceCollide(15))
                   .force('manybody', d3.manyBody())
                   .on('tick', ticked)

    let node = svg.append("g")
                  .selectAll("circle")
                  .data(activeplayers).enter()
                  .append("circle")
                  .attr('cx', d => d.x)
                  .attr('cy', d => d.y)
                  .attr("fill", "black")
                  .attr("opacity", 0.4)
                  .attr("r", d => d.PTS)

    var label = svg.append("g")
                  .data(activeplayers)
                  .enter()
                  .append("text")
                  .text(function (d) { return d.LAST_NAME; })
                  .style("text-anchor", "middle")
                  .style("fill", "#555")
                  .style("font-family", "Arial")
                  .style("font-size", 12);

    function ticked(){
        node
           .attr('cx', d => d.x)
           .attr('cy', d => d.y)       
    }


})