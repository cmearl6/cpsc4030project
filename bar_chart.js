// Cole Earl

d3.csv("name-data.csv").then(function(dataset) {

    var dimensions = {
        width: 1350,
        height: 600,
        margin: {
            top: 10,
            bottom: 50,
            right: 100,
            left: 100
        }
    }

    var name = "Amanda"

    var namedata = Array.from(d3.group(dataset, d => d.year))

    // use map to get array of objects
    var years = namedata.map(d => d[0])
    var array = namedata.map(d => d[1])
    var objectarray = array.map(d => d[0])


    var svg = d3.select("#barchart")
                .style("width", dimensions.width)
                .style("height", dimensions.height)
    

    const xScale = d3.scaleBand()
                   .domain(years)
                   .range([dimensions.margin.left,dimensions.width - dimensions.margin.right])

    // parse strings to int to get max value
    objectarray.forEach(d => d[name] = parseInt(d[name]))

    const yScale = d3.scaleLinear()
                   .domain([0, d3.max(objectarray, d => d[name])])
                   .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    svg.append('g')
         .call(d3.axisLeft(yScale))
         .style("transform", `translateX(${dimensions.margin.left}px)`)
         
    // create x axis with a tick every 5 years and 65 degree rotation
    svg.append('g')
         .call(d3.axisBottom(xScale)
         .tickValues(xScale.domain().filter(function(d,i){return ! (i%5)})))
         .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
         .selectAll("text")
         .style("text-anchor", "end")
         .attr("dx", "-.8em")
         .attr("dy", ".15em")
         .attr("transform", "rotate(-65)")

    svg.append("text")
       .attr("x", (dimensions.width - dimensions.margin.right) / 2)
       .attr("y", dimensions.height)
       .style("text-anchor", "middle")
       .text("Year")

    svg.append("text")
       .attr("transform", "translate(" + (dimensions.margin.left / 2) + "," + (dimensions.height / 2) + ")rotate(-90)")
       .style("text-anchor", "middle")
       .text("Count")
         

    var bars = svg.selectAll("rect")
         .data(objectarray)
         .enter()
         .append("rect")
         .attr("x", d => xScale(d.year))
         .attr("y", d => yScale(d[name]))
         .attr("width", xScale.bandwidth())
         .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d[name]))
         .attr("fill", "red")

})