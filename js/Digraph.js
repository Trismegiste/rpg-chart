/*
 * Directed Graph for d3js
 */

var Digraph = function (container, width, height, onClick) {

    // Add and remove elements on the graph object
    this.addNode = function (id) {
        nodes.push({"id": id});
        update();
    };

    this.removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) {
            if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                links.splice(i, 1);
            }
            else
                i++;
        }
        nodes.splice(findNodeIndex(id), 1);
        update();
    };

    this.removeLink = function (source, target) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].source.id == source && links[i].target.id == target) {
                links.splice(i, 1);
                break;
            }
        }
        update();
    };

    this.removeallLinks = function () {
        links.splice(0, links.length);
        update();
    };

    this.removeAllNodes = function () {
        nodes.splice(0, links.length);
        update();
    };

    this.addLink = function (source, target, value) {
        links.push({"source": findNode(source), "target": findNode(target), "value": value});
        update();
    };

    this.nodeExists = function (id) {
        return findNode(id)
    }

    var findNode = function (id) {
        for (var i in nodes) {
            if (nodes[i]["id"] === id)
                return nodes[i];
        }
        ;
    };

    var findNodeIndex = function (id) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id == id) {
                return i;
            }
        }
        ;
    };

    // set up the D3 visualisation in the specified element
    var color = d3.scale.category10();

    var vis = d3.select(container)
            .append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "svg")
            .attr("pointer-events", "all")
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("perserveAspectRatio", "xMinYMid")
            .append('svg:g');

    vis.append('defs').append('marker')
            .attr({'id': 'arrowhead',
                'viewBox': '-0 -5 10 10',
                'refX': 25,
                'refY': 0,
                'orient': 'auto',
                'markerWidth': 10,
                'markerHeight': 10,
                'xoverflow': 'visible'})
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#ccc')
            .attr('stroke', '#ccc');

    vis.append("g").attr("id", "links-layer")
    vis.append("g").attr("id", "nodes-layer")

    var force = d3.layout.force();

    var nodes = force.nodes(),
            links = force.links();

    var update = function () {
        var link = vis.select('#links-layer').selectAll("line")
                .data(links, function (d) {
                    return d.source.id + "-" + d.target.id;
                });

        link.enter().append("line")
                .attr("id", function (d) {
                    return d.source.id + "-" + d.target.id;
                })
                .attr("class", "link")
                .attr('marker-end', 'url(#arrowhead)')
                .on('click', function (d) {
                    console.log(d)
                })

        link.exit().remove();

        var edgepaths = vis.selectAll(".edgepath")
                .data(links, function (d) {
                    return 'edgepath-' + d.source.id + "-" + d.target.id;
                });

        edgepaths.enter()
                .append('path')
                .attr({'d': function (d) {
                        return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
                    },
                    'class': 'edgepath',
                    'fill-opacity': 0,
                    'stroke-opacity': 0,
                    'fill': 'blue',
                    'stroke': 'red',
                    'id': function (d, i) {
                        return 'edgepath-' + d.source.id + "-" + d.target.id;
                    }})
                .style("pointer-events", "none");
        edgepaths.exit().remove();

        var edgelabels = vis.select('#links-layer').selectAll(".edgelabel")
                .data(links, function (d) {
                    return 'edgelabel-' + d.source.id + "-" + d.target.id;
                })

        edgelabels.enter()
                .append('text')
                .style("pointer-events", "none")
                .attr({'class': 'edgelabel',
                    'id': function (d, i) {
                        return 'edgelabel-' + d.source.id + "-" + d.target.id;
                    },
                    'dx': 50,
                    'dy': 0,
                    'font-size': 10,
                    'fill': '#777'})
                .append('textPath')
                .attr('xlink:href', function (d, i) {
                    return '#edgepath-' + d.source.id + "-" + d.target.id;
                })
                .style("pointer-events", "none")
                .text(function (d) {
                    return d.value
                });
        edgelabels.exit().remove()

        var node = vis.select('#nodes-layer').selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id;
                });

        var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .on('click', onClick)
                .call(force.drag);

        nodeEnter.append("svg:circle")
                .attr("r", 15)
                .attr("id", function (d) {
                    return "Node;" + d.id;
                })
                .attr("class", "nodeStrokeClass")
                .attr("fill", function (d) {
                    return color(d.id);
                });

        nodeEnter.append("svg:text")
                .attr("class", "textClass")
                .attr("x", 0)
                .attr("y", 0)
                .text(function (d) {
                    return d.id;
                });

        node.exit().remove();

        force.on("tick", function () {

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            link.attr("x1", function (d) {
                return d.source.x;
            })
                    .attr("y1", function (d) {
                        return d.source.y;
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                    });

            edgepaths.attr('d', function (d) {
                return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            });

            edgelabels.attr('transform', function (d) {
                if (d.target.x < d.source.x) {
                    bbox = this.getBBox();
                    rx = bbox.x + bbox.width / 2;
                    ry = bbox.y + bbox.height / 2;
                    return 'rotate(180 ' + rx + ' ' + ry + ')';
                }
                else {
                    return 'rotate(0)';
                }
            });
        });

        // Restart the force layout.
        force
                .gravity(0.05)
                .charge(-500)
                .theta(0.1)
                .linkDistance(function (d) {
                    return 130
                })
                .size([width, height])
                .start();
    };

    // Make it all go
    update();
}

