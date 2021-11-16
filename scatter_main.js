// Scatterplot code for teams  JavaScript source code
d3.csv("dataset/player_attributes.csv").then(function (dataset) {
    var dimensions = {
        width: 1500,
        height: 1200,
        margin: {
            top: 50,
            bottom: 250,
            right: 100,
            left: 150
        }
    }
    var svg = d3.select('#scatter')
        .style("width", dimensions.width)
        .style("height", dimensions.height)

    var yAccessor = d => +d.PTS
    var xAccessor = d => d.TEAM_ABBREVIATION
    var rAccessor = d => +d.SALARY

    var teams = ["ATL", "BOS", "CLE", "NOP", "CHI", "DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MIA", "MIL", "MIN", "BKN", "NYK", "ORL", "IND", "PHI", "PHX", "POR", "SAC", "SAS", "OKC", "TOR", "UTA", "MEM", "WAS", "DET", "CHA"]
    var team_colors = ["#C8102E", "#007A33", "#860038", "#0C2340", "#CE1141", "#00538C", "#0E2240", "#FFC72C","#FFFFFF","#1D428A","#552583","#98002E","#00471B","#0C2340","#000000","#F58426","#0077C0","#FDBB30","#006BB6","#1D1160","#000000","#63727A","#C4CED4","#EF3B24","#CE1141","#002B5C","#5D76A9","#002B5C","#C8102E","#00788C"]
    var team_colors2 = ["#FFCD00", "#BA9653", "#041E42", "#C8102E", "#000000", "#002B5E", "#FEC524", "#1D428A", "#CE1141", "#C8102E", "#FDB927", "#F9A01B", "#EEE1C6", "#236192", "#000000", "#006BB6", "#C4CED4", "#002D62", "#ED174C", "#E56020", "#E03A3E", "#5A2D81", "#000000", "#007AC1", "#000000", "#00471B", "#12173F", "#E31837", "#1D42BA","#1D1160"]

    var xScale = d3.scaleBand()
        .domain(teams)
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])


    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset,yAccessor))
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    var rScale = d3.scaleLinear()
        .domain(d3.extent(dataset, rAccessor))
        .range([3, 30])

    var colorScale1 = d3.scaleOrdinal()
        .domain(teams)
        .range(team_colors)

    var colorScale2 = d3.scaleOrdinal()
        .domain(teams)
        .range(team_colors2)

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
        .attr("fill", d => colorScale1(xAccessor(d)))
        .attr("opacity",0.7)
        .attr("r", d => rScale(rAccessor(d)))
        .attr("stroke", d => colorScale2(xAccessor(d)))
        .attr("stroke-width",3)

    var xAxisgen = d3.axisBottom().scale(xScale)

    svg.append('g')
        .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain()))
        .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".05em")
        .attr("transform", "rotate(-65)")
})