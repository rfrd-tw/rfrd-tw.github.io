d3.csv("data/data.csv").then(function(data) {
	const draw_scp = (vote, ...ind_vars) => {
		var div = document.getElementsByClassName("scatter")[0];

		var width = parseInt(getComputedStyle(div).width.replace(/px/g, "")),
		height = parseInt(getComputedStyle(div).height.replace(/px/g, "")),
		margins = getComputedStyle(div).margin.replace(/px/g, "").split(" "),
		margin = {
			"top": parseInt(margins[0]),
			"right": parseInt(margins[1]),
			"bottom": parseInt(margins[2]),
			"left": parseInt(margins[3])
		};

		tooltip = d3.select("body").append("div")
        .attr("class", "tooltip-scp")
        .style("opacity", 0);

        // x(vote) & z(color-mapping) are common for all plots
		x = d3.scaleLinear()
		.domain([d3.min(data, d => (Number(d[vote])-0.05)), d3.max(data, d => (Number(d[vote])+0.05))]).nice()
		.range([margin.left, width - margin.right]);

		// Add the x-axis.
		xAxis = g => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x).ticks(width / 80).tickFormat(d3.format(".0%")))
		.call(g => g.select(".domain").remove());

		z = d3.scaleThreshold()
		.range(["#e6f84d", "#9a55fc"]);

		ind_vars.forEach(function(ind_var, i) {

			var scpdiv;
			if(i===0) {
				scpdiv = d3.select("#scp0");
			} else {
				scpdiv = d3.select("#scatter-block")
				.append("div")
				.attr("id", "scp"+i)
				.attr("class", "scatter");
			}

			const svg = scpdiv.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom + 10)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// y is customized by input variables
			y = d3.scaleLinear()
			.range([height - margin.bottom, margin.top]);

			var yAxisSet1 = d3.axisLeft(y), yAxisSet2;
			if (d3.max(data, d => (Number(d[ind_var]))) < 1 ) {
				yAxisSet2 = yAxisSet1.tickFormat(d3.format(".0%"));
				y.domain([0, d3.max(data, d => (Number(d[ind_var])+0.1))]).nice();
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
				.attr("stroke", "#ccc"))
			.call(g => g.append("text")
				.attr("fill", "#000")
				.attr("x", 5)
				.attr("y", margin.top)
				.attr("dy", "0.32em")
				.attr("text-anchor", "start")
				.attr("font-weight", "bold")
				.text(ind_var))
			
			svg.append("g")
			.call(xAxis);

			svg.append("g")
			.call(yAxis);

			svg.append("g")
			.attr("stroke", "#000")
			.attr("stroke-opacity", 0.2)
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

			svg.append("line")
			.attr("x1", x(0.5))  
			.attr("y1", 0)
			.attr("x2", x(0.5))  
			.attr("y2", height - margin.top - margin.bottom)
			.style("stroke-width", 1)
			.style("stroke", "#D3D3D3")
			.style("fill", "none");
		}); // end of ind_vars.forEach()

		function mouseover(d) {
			d3.selectAll("#"+d.site_id)
			.attr("r", 6)
			.attr("fill", "#f9fe6c");

			tooltip
			.text(function () { return d.site_id;})
			.style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

			tooltip
			.transition()
			.duration(500)
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
			.duration(500)
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

		//return svg.node();
	}
	draw_scp("vote14", "college_p", "divorce_p", "median_age", "avg_age"); 
});