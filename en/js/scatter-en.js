var vote_num = 7,
chooseScatter,
width = parseInt($('.scatter-plot').width()),
height = parseInt($('.scatter-plot').height()),
margin = {
	"top": parseInt($('.scatter-plot').css('margin-top').replace(/px/g, "")),
	"right": parseInt($('.scatter-plot').css('margin-right').replace(/px/g, "")),
	"bottom": parseInt($('.scatter-plot').css('margin-bottom').replace(/px/g, "")),
	"left": parseInt($('.scatter-plot').css('margin-left').replace(/px/g, ""))
};

d3.csv("data/data_zh.csv").then(function(data) {

	draw_scp = function draw_scp(vote, ...ind_vars) {

		tooltip = d3.select("body").append("div")
        .attr("class", "tooltip-scp")
        .style("opacity", 0);

        // x(vote) & z(color-mapping) are common for all plots
		x = d3.scaleLinear()
		.domain([d3.min(data, d => (Number(d[vote])-0.02)), d3.max(data, d => (Number(d[vote])+0.02))]).nice()
		.range([margin.left, width - margin.right]);

		// Add the x-axis.
		xAxis = g => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x).ticks(width / 80).tickFormat(d3.format(".0%")))
		.call(g => g.select(".domain").remove());

		z = d3.scaleThreshold()
		.domain(0.5)
		.range(["#e83e8c", "#9a55fc"]);

		var yAxisSet1, yAxisSet2;

		ind_vars.forEach(function(ind_var, i) {

			var scpDiv, titleDiv;
			if(i===0) {
				scpDiv = d3.select("#scp0-plot");
				titleDiv = d3.select("#scp0-title").text(ind_var);
			} else {
				scatterDiv = d3.select("#scatter-block")
				.append("div")
				.attr("id", "scp"+i)
				.attr("class", "scatter");

				titleDiv = scatterDiv
				.append("div")
				.attr("id", "scp"+i+"-title")
				.attr("class", "scatter-title")
				.text(ind_var);

				scpDiv = scatterDiv
				.append("div")
				.attr("id", "scp"+i+"-plot")
				.attr("class", "scatter");
			}

			const svg = scpDiv.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.attr("class", "plot-g");

			// y is customized by input variables
			y = d3.scaleLinear()
			.range([height - margin.bottom, margin.top]);

			yAxisSet1 = d3.axisLeft(y);
			if (d3.max(data, d => (Number(d[ind_var]))) < 1 ) {
				yAxisSet2 = yAxisSet1.tickFormat(d3.format(".0%"));
				y.domain([d3.min(data, d => (Number(d[ind_var])-0.02)), d3.max(data, d => (Number(d[ind_var])+0.001))]).nice();
			} else {
				yAxisSet2 = yAxisSet1;
				y.domain([d3.min(data, d => (Number(d[ind_var])-0.02)), d3.max(data, d => (Number(d[ind_var])+0.1))]).nice();
			};

			// Add the y-axis.
			yAxis = g => g
			.attr("transform", `translate(${margin.left},0)`)
			.call(yAxisSet2) 
			.call(g => g.select(".domain").remove())
			.call(g => g.selectAll(".tick line")
				.filter(d => d === 0)
				.clone()
				.attr("x2", width - margin.right - margin.left)
				.attr("stroke-opacity", 0))
			.call(g => g.append("text")
				.attr("fill", "#000")
				.attr("x", 5)
				.attr("y", margin.top)
				.attr("dy", "0.32em")
				.attr("text-anchor", "start")
				.attr("font-weight", "bold"));

			svg.append("g")
			.attr("class", "xAxis")
			.call(xAxis);

			svg.append("g")
			.call(yAxis);

			circle = svg.append("g")
			.attr("class", "circles")
			.selectAll("circle")
			.data(data)
			.enter().append("circle")
			.attr("cx", d => x(d[vote]))
			.attr("cy", d => y(d[ind_var]))
			.attr("fill", d => z(d[vote]))
			.attr("r", 2.5)
			.attr("id", d => d.site_id)
			.on("mouseover", mouseover)
			.on("click", click)
			.on("mouseout", mouseout);

			// hide null
			circle.style("display", function(d) { return d[vote] == "NA" ? "none" : null; });

		}); // end of ind_vars.forEach()

		d3.selection.prototype.moveToFront = function() {
			return this.each(function(){
				this.parentNode.appendChild(this);
			});
		};

		function mouseover(d) {
			d3.selectAll("#"+d.site_id)
			.attr("r", 6)
			.attr("fill", "#f9fe6c")
			.moveToFront();

			tooltip
			.text(function () { return d.site_id;})
			.style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

			tooltip
			.transition()
			.duration(300)
			.style("opacity", 1);
		}

		function click(d) {
			d3.selectAll("#"+d.site_id)
			.attr("r", 6)
			.attr("fill", "#f9fe6c");

			tooltip
			.text(function () { return d.site_id;})
			.style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

			tooltip
			.transition()
			.duration(300)
			.style("opacity", 1);
		}

		function mouseout(d) {
			d3.selectAll("#"+d.site_id)
			.attr("r", 2.5)
			.attr("fill", d => z(d[vote]));

            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
		}

		chooseScatter = function chooseScatter(num) {
			
			console.log(num);
			vote_num = num;
			vote = "vote"+vote_num;

			x.domain([d3.min(data, d => (Number(d[vote])-0.02)), d3.max(data, d => (Number(d[vote])+0.02))]).nice();

			ind_vars.forEach(function(ind_var, i) {

				if (d3.max(data, d => (Number(d[ind_var]))) < 1 ) {
					yAxisSet2 = yAxisSet1.tickFormat(d3.format(".0%"));
					y.domain([d3.min(data, d => (Number(d[ind_var])-0.02)), d3.max(data, d => (Number(d[ind_var])+0.001))]).nice();
				} else {
					yAxisSet2 = yAxisSet1;
					y.domain([d3.min(data, d => (Number(d[ind_var])-0.02)), d3.max(data, d => (Number(d[ind_var])+0.1))]).nice();
				};

				var curPlot = d3.select("#scp"+i+"-plot").select("svg");

				curPlot.select(".xAxis")
				.transition()
				.duration(500)
				.call(xAxis);

				curPlot.select(".circles").remove(); //remove unneeded circles

				newCircle = curPlot.append("g")
				.attr("class", "circles")
				.selectAll("circle")
				.data(data)
				.enter().append("circle")
				.attr("class", ind_var)
				.attr("cx", d => x(d[vote]))
				.attr("cy", d => y(d[ind_var]))
				.attr("fill", "#e83e8c")
				.attr("r", 0)
				.attr("id", d => d.site_id)
				.on("mouseover", mouseover)
				.on("click", click)
				.on("mouseout", mouseout);

				newCircle.transition()
				.duration(800)
				.attr("r", 2.5);

			// hide null
			newCircle.style("display", function(d) { return d[vote] == "NA" ? "none" : null; });

		}); // end of update -> ind_vars.forEach()

		}

		//return svg.node();
	}

	draw_scp("vote"+vote_num, "College (%)", "Ever Married (%)", "Median Age", "Median Income (10k NTD)"); 
});