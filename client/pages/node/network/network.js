Template.nodeNetwork.onCreated(function () {
    this.subscribe('nodeNetwork', this.data.node._id);
});

Template.nodeNetwork.onRendered(function () {
    let self = this;

    Tracker.autorun(function (computation) {
        if (self.subscriptionsReady()) {
            computation.stop();

            // Generate nodes and edges
            let nodes = Collection.Nodes.find();
            let data = {
                nodes: [],
                edges: []
            };

            _.each(nodes.fetch(), function (node, id) {
                let values = {
                    id: node._id,
                    label: id + 1,
                    value: node.likes + node.totalChildrenLikes,
                    color: node.color
                };

                if (node.title) {
                    values.title = node.title;
                }

                data.nodes.push(values);

                if (node.from) {
                    data.edges.push({
                        from: node.from,
                        to: node._id
                    });
                }
            });

            // Connected nodes
            let nodesToCheck = [self.data.node._id];
            let checkedNodes = [];

            while (nodesToCheck.length) {
                let newNodesToCheck = [];

                nodesToCheck.forEach(function (nodeToCheck) {
                    checkedNodes.push(nodeToCheck);

                    _.each(data.edges, function (edge) {
                        if (edge.from === nodeToCheck && !_.contains(checkedNodes, edge.to)) {
                            newNodesToCheck.push(edge.to);
                        }
                    });
                });

                nodesToCheck = newNodesToCheck;
            }

            // Remove useless nodes
            let invalidNodes = _.difference(_.pluck(data.nodes, 'id'), checkedNodes);
            data.nodes = _.reject(data.nodes, function (node) {
                return _.contains(invalidNodes, node.id);
            });

            // Generate graph
            let container = document.getElementsByClassName('network')[0];
            let network = new vis.Network(container, data, {
                nodes: {
                    shape: 'dot',
                    size: 30,
                    font: {
                        size: 20,
                        color: '#333'
                    },
                    borderWidth: 2
                },
                edges: {
                    width: 2
                }
            });

            // Change page on click
            network.on('click', function (params) {
                if (params.nodes.length !== 0) {
                    Router.go('nodeShow', {
                        id: params.nodes[0]
                    });
                }
            });
        }
    });
});
