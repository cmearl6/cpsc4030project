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

    var yAccessor = d => +d.PTS
    var xAccessor = d => d.TEAM_ABBREVIATION
    var rAccessor = d => +d.REB + 1

    var teams = ["ATL", "BOS", "CLE", "NOP", "CHI", "DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MIA", "MIL", "MIN", "BKN", "NYK", "ORL", "IND", "PHI", "PHX", "POR", "SAC", "SAS", "OKC", "TOR", "UTA", "MEM", "WAS", "DET", "CHA"]


    var xScale = d3.scaleBand()
        .domain(teams)
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])


    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset,yAccessor))
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    var rScale = d3.scaleLinear()
        .domain(d3.extent(dataset, rAccessor))
        .range(3,10)

    console.log(rScale(1))

    console.log(dataset)
    let activeplayers = dataset.filter(d => d.ROSTERSTATUS == "Active" && d.TEAM_ABBREVIATION != " ")

    console.log(activeplayers)

    var dots = svg.selectAll("circle")
        .data(activeplayers)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", "black")
        .attr("opacity",0.4)
        .attr("r", rAccessor)

})