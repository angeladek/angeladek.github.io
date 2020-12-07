$(document).ready(function () {
    
    var selectedjaar = 'aantal2019';
    
    //slider
    d3.select(".selected-slidervalue").text("2019");

    $("#slider").on('input', function () {
        $(".slidercurvalue").text($("#slider").val());
    });

    d3.select(".slidervalue")
        .on("input", function (d) {
            selectedjaar = "aantal" + d3.select(".slidervalue").node().value;
            //            console.log(selectedjaar);

            d3.select(".selected-slidervalue").text(selectedjaar);

            layerProvincies.selectAll('path').attr("fill", function (d) {
                console.log(d.properties[selectedjaar]);
                return colors(d.properties[selectedjaar]);
            });
        })

    //variabelen voor svg
    var width = 500;
    var height = 580;

    //variabelen voor kaart
    var centerLat = 5.3;
    var centerLong = 52.2;
    var scale = 7000;
    var projection = d3.geoMercator()
        .scale(scale)
        .translate([width / 2, height / 2])
        .center([centerLat, centerLong]);

    var svg = d3.select("#div_placeholder")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var layerProvincies = svg.append('g');

    var colors = d3.scaleQuantile()
        .domain([29000, 336355])
        .range(["#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"]);

    var tekstAantal = svg.append('g');

    d3.json("provincies_bedrijven_jaren.geojson", function (data) {

        //console.log(data);

        layerProvincies.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath()
                .projection(projection))
            .attr("fill", function (d) {
                console.log(d.properties.aantal2019);
                return colors(d.properties.aantal2019);
            })
            .attr("class", function (d) {
                return "province"
            })
            .style("stroke", "#ffffff")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        tekstAantal.append("text")
            .attr("x", 5)
            .attr("y", 20)
            .attr("width", 60)
            .attr("height", 50)
            .attr("class", "tekstAantal")
            .style('font-family', 'Futura PT, Arial')
            .text('Aantal bedrijven:')
            .style("fill", ("#707070"))
            .style("font-size", "14px")

    });

    function handleMouseOver(d, i) {
        d3.selectAll('.province')
            .transition()
            .duration(500)
            .style("opacity", "0.3")
        d3.select(this)
            .transition()
            .duration(500)
            .style("opacity", "1")
        d3.select('.tekstAantal')
            .html('Aantal bedrijven in ' + d.properties.provincie + ': ' + d.properties[selectedjaar])
    };

    function handleMouseOut(d, i) {
        d3.selectAll('.province')
            .transition()
            .duration(500)
            .style("opacity", "1")
        d3.select(this)
            .transition()
            .duration(500)
            .style("opacity", "1")
        d3.select('.tekstAantal')
            .html('Aantal bedrijven: ')
    };

    d3.select(".slidervalue")
        .on("input", function (d) {
            selectedjaar = "aantal" + d3.select(".slidervalue").node().value;
            //            console.log(selectedjaar);

            d3.select(".selected-slidervalue").text(selectedjaar);

            layerProvincies.selectAll('path').attr("fill", function (d) {
                console.log(d.properties[selectedjaar]);
                return colors(d.properties[selectedjaar]);
            });
        })
});
