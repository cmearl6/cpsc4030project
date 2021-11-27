// Scatterplot code for teams  JavaScript source code
d3.csv("dataset/player_attributes.csv").then(function (dataset) {
    var dimensions = {
        width: 1200,
        height: 800,
        margin: {
            top: 50,
            bottom: 100,
            right: 100,
            left: 150
        }
    }

    initializeChart();

    var svg = d3.select('#scatter')
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .style("background-color", "lightgrey")



    var yAccessor = d => +d.PTS
    var yAccessorR = d => +d.REB
    var xAccessor = d => d.TEAM_ABBREVIATION
    var rAccessor = d => +d.SALARY

    var teams = ["ATL", "BOS", "CLE", "NOP", "CHI", "DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MIA", "MIL", "MIN", "BKN", "NYK", "ORL", "IND", "PHI", "PHX", "POR", "SAC", "SAS", "OKC", "TOR", "UTA", "MEM", "WAS", "DET", "CHA"]
    var team_colors = ["#C8102E", "#007A33", "#860038", "#0C2340", "#CE1141", "#00538C", "#0E2240", "#FFC72C", "#FFFFFF", "#1D428A", "#552583", "#98002E", "#00471B", "#0C2340", "#000000", "#F58426", "#C4CED4", "#FDBB30", "#006BB6", "#1D1160", "#000000", "#63727A", "#C4CED4", "#EF3B24", "#CE1141", "#002B5C", "#5D76A9", "#002B5C", "#C8102E", "#00788C"]
    var team_colors2 = ["#FFCD00", "#BA9653", "#041E42", "#C8102E", "#000000", "#002B5E", "#FEC524", "#1D428A", "#CE1141", "#C8102E", "#FDB927", "#F9A01B", "#EEE1C6", "#236192", "#FFFFFF", "#006BB6", "#0077C0", "#002D62", "#ED174C", "#E56020", "#E03A3E", "#5A2D81", "#000000", "#007AC1", "#000000", "#00471B", "#12173F", "#E31837", "#1D42BA", "#1D1160"]

    let activeplayers = dataset.filter(d => d.ROSTERSTATUS == "Active" && d.TEAM_ABBREVIATION != " ")

    var xScale = d3.scaleBand()
        .domain(teams)
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])


    var yScale = d3.scaleLinear()
        .domain(d3.extent(activeplayers, yAccessor))
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    var rScale = d3.scaleLinear()
        .domain(d3.extent(activeplayers, rAccessor))
        .range([3, 30])

    var colorScale1 = d3.scaleOrdinal()
        .domain(teams)
        .range(team_colors)

    var colorScale2 = d3.scaleOrdinal()
        .domain(teams)
        .range(team_colors2)

    console.log(rScale(1))

    console.log(dataset)


    console.log(activeplayers)



    var dots = svg.selectAll("circle")
        .data(activeplayers)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d)) + 20)
        // add 20 to get it lined up with the lines correctly
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", d => colorScale1(xAccessor(d)))
        .attr("opacity", 0.7)
        .attr("r", d => rScale(rAccessor(d)))
        .attr("stroke", d => colorScale2(xAccessor(d)))
        .attr("stroke-width", 2)
        .on('mouseover', function (e, d) {
            d3.select(this)
                .attr("stroke-width", 4)
            document.getElementById("player").innerHTML = d.DISPLAY_FIRST_LAST;
        })
        .on('click', function (e, d) {
            updatePlayer(d.DISPLAY_FIRST_LAST);
        })
        .on('mouseout', function (e, d){
            d3.select(this)
                .attr("stroke-width",2)
        });
    
    var xAxisgen = d3.axisBottom().scale(xScale)

    console.log(dataset.filter(d=> +d.REB > 20))
    
    //DEBUG filter where d.REB > 20 and find where the value is and why it's not showing up on the plot


    // adjust stat
    var stats = [{ "Label": "Points", "Value": "PTS" }, { "Label": "Rebounds", "Value": "REB" }, { "Label": "Assists", "Value": "AST" }]

    d3.select("#stat").on("change", function (d) {
        stat = d3.select(this).property("value");

        yScale
            .domain(d3.extent(activeplayers, d => +d[stat]))

        dots.transition().duration(2000)
            .attr('cy', d => yScale(+d[stat]))

        yAxis.transition().duration(2000)
            .call(d3.axisLeft(yScale))
    })



    svg.append('g')
        .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain()))
        .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".05em")
        .attr("transform", "rotate(-65)")

    var xAxisLabel = svg.append("text")
        .attr("x", (dimensions.width - dimensions.margin.right) / 2)
        .attr("y", dimensions.height - dimensions.margin.bottom + 50)
        .style("text-anchor", "middle")
        .text("Team")

    var yAxis = svg.append('g')
        .call(d3.axisLeft(yScale))
        .style("transform", `translateX(${dimensions.margin.left}px)`)

    var yAxisLabel = svg.append("text")
        .attr("transform", "translate(" + (dimensions.margin.left / 2) + "," + (dimensions.height / 2) + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text("Points")
})