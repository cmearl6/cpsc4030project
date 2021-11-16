// Scatterplot code for teams  JavaScript source code
d3.csv("dataset/player_attributes.csv").then(function (dataset) {
    var dimensions = {
        width: 1000,
        height: 500,
        margin: {
            top: 10,
            bottom: 50,
            right: 100,
            left: 150
        }
    }
    var svg = d3.select('#scatter')
        .style("width", dimensions.width)
        .style("height", dimensions.height)

    var yAccessor = d => d.REB
    var xAccessor = d => d.TEAM_ABBREVIATION

    var xScale = d3.scaleBand()
        .domain(d3.map(dataset, xAccessor))
        .range([dimensions.margin.left, dimensions.width-dimensions.margin.right])
    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset,yAccessor))
        .range([dimensions.height-dimensions.margin.bottom,dimensions.margin.top])

    console.log(dataset)
    let activeplayers = dataset.filter(d => d.ROSTERSTATUS == "Active")

    console.log(activeplayers)

    var dots = svg.selectAll("circle")
        .data(activeplayers)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", "black")
        .attr("r", 3)

})