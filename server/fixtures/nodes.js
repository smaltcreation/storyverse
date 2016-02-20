Meteor.startup(function () {
    const ROOT_NODES = 100;
    const CHILD_NODES_MIN = 10;
    const CHILD_NODES_MAX = 100;
    
    let generateNode = function (root = null, from = null) {
        return {
            root,
            from,
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
            location: {
                lat: faker.address.latitude(),
                lng: faker.address.longitude()
            },
            lang: faker.address.countryCode().toLowerCase()
        };
    };

    if (Collection.Nodes.find().count() === 0) {
        // Root nodes
        _.each(_.range(ROOT_NODES), function (rootNodeNumber) {
            console.log('Creating root node', rootNodeNumber, '/', ROOT_NODES);

            let rootNodeId = Collection.Nodes.insert(generateNode());
            let ids = [rootNodeId];

            // Child nodes
            let totalChildNodes = _.random(CHILD_NODES_MIN, CHILD_NODES_MAX);
            
            _.each(_.range(totalChildNodes), function (childNodeNumber) {
                console.log('Creating child node', childNodeNumber, '/', totalChildNodes, '- root node', rootNodeNumber, '/', ROOT_NODES);

                let fromNodeId = _.sample(ids);
                let nodeId = Collection.Nodes.insert(generateNode(rootNodeId, fromNodeId));
                ids.push(nodeId);
            });
        });
    }
});
