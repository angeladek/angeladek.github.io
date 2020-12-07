var paddingCircle = 120

var rowConverter = function (d, i) {
    return {
        name: d.name,
        spokenwords: +d.spokenwords,
        appearances: +d.appearances
    };
};

var colors = d3.scaleQuantile()
    .domain([45, 170])
    .range(["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"]);

var svgContainer = d3.select('svg#raj_circles')
    .attr('height', 500);

var circle = svgContainer.append('circle')
    .attr('cy', paddingCircle)
    .attr('class', 'circle1');
var circle = svgContainer.append('circle')
    .attr('cy', paddingCircle)
    .attr('class', 'circle2');
var circle = svgContainer.append('circle')
    .attr('cy', paddingCircle)
    .attr('class', 'circle3');
var circle = svgContainer.append('circle')
    .attr('cy', paddingCircle)
    .attr('class', 'circle4');
var circle = svgContainer.append('circle')
    .attr('cy', paddingCircle)
    .attr('class', 'circle5');
var circle = svgContainer.append('circle')
    .attr('cy', paddingCircle)
    .attr('class', 'circle6');
var circle = svgContainer.append('circle')
    .attr('cy', paddingCircle)
    .attr('class', 'circle7');
var circle = svgContainer.append('circle')
    .attr('cy', paddingCircle)
    .attr('class', 'circle8');

d3.select('ol')
    .style('font-family', 'sans-serif');

d3.csv('romeoandjuliet.csv', rowConverter)
    .then(function (data) {
        //console.log(data);
        //console.log(data[0]);
        d3.select("#div_placeholder")
            .append("ol")
            .style('font-family', 'sans-serif')
        d3.select("ol")
            .selectAll("li")
            .data(data)
            .enter()
            .append("li")
            .text(function (d) {
                //console.log(d);
                return d.name + " has " + d.appearances + " appearances and spoke " + d.spokenwords + " words.";
            })

        d3.selectAll("circle")
            .attr('fill-opacity', '0.9')
            .data(data)
            .attr('r',
                function (d) {
                    //console.log(d);
                    return d.spokenwords / 40;
                })
            .attr("fill", function (d, i) {
                console.log(d.appearances);
                return colors(d.appearances);
            })
            .attr('cx', function (d, i) {
                console.log(i);
                console.log(d.appearances);
                return 120 + (i * (100));
            })
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
    })
    .catch(function (error) {
        alert(error);
    });

function handleMouseOver(d, i) { // Add interactivity
    // Use D3 to select element, change color and size
    var selected_x = parseInt(d3.select(this).attr("cx"));
    var selected_y = parseInt(d3.select(this).attr("cy"));
    var selected_r = parseInt(d3.select(this).attr("r"));
    d3.selectAll('circle')
        .transition()
        .duration(500)
        .attr('opacity', '0.2')
    d3.select(this)
        //.attr('fill', "orange")
        .transition()
        .duration(500)
        .attr('opacity', '0.9')
        .attr('stroke', 'black')
        .attr('stroke-width', '3')
    d3.select("svg")
        .append("line")
        .attr("x1", selected_x)
        .attr("y1", function (d) {
            return selected_y + selected_r;
        })
        .attr("x2", selected_x)
        .attr("y2", 300)
        .transition()
        .duration(500)
        .attr("stroke", "black")
        .attr('stroke-width', '3')
    d3.select('svg')
        .append("text")
        .attr("x", selected_x + 5)
        .attr("y", 280)
        .text(d.name + ", " + d.appearances + " appearances, " + d.spokenwords + " words.")
        .attr("fill", "black")
        .style('font-family', 'sans-serif')
};

function handleMouseOut(d, i) { // Add interactivity
    // Use D3 to select element, change color and size
    d3.selectAll('circle')
        .transition()
        .duration(500)
        .attr('opacity', '0.9')
        .attr('stroke-width', '0')
    d3.select(this)
        .attr("fill", function (d, i) {
            console.log(d.appearances);
            return colors(d.appearances);
        })
        .attr('stroke-width', '0')
    d3.select("svg").selectAll("line")
        .remove();
    d3.select('text')
        .remove()
};
