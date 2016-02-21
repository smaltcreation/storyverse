Meteor.startup(function () {
    const ROOT_NODES = 100;
    const CHILD_NODES_MIN = 10;
    const CHILD_NODES_MAX = 100;
    
    let generateNode = function (root = null, from = null) {
        let lat = faker.address.latitude();

        if (lat < -80) {
            lat = -80;
        } else if (lat > 80) {
            lat = 80;
        }

        return {
            root,
            from,
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
            location: {
                lat: parseFloat(lat),
                lng: parseFloat(faker.address.longitude())
            },
            lang: faker.address.countryCode().toLowerCase(),
            likes: faker.random.number()
        };
    };

    if (Collection.Nodes.find().count() === 0) {
        // Root nodes
        _.each(_.range(ROOT_NODES), function (rootNodeNumber) {
            console.log('Creating root node', rootNodeNumber, '/', ROOT_NODES);
            let totalChildNodes = _.random(CHILD_NODES_MIN, CHILD_NODES_MAX);

            let rootNodeId = Collection.Nodes.insert(_.extend(generateNode(), {
                totalChildren: totalChildNodes
            }));

            let ids = [rootNodeId];

            // Child nodes
            _.each(_.range(totalChildNodes), function (childNodeNumber) {
                console.log('Creating child node', childNodeNumber, '/', totalChildNodes, '- root node', rootNodeNumber, '/', ROOT_NODES);

                let fromNodeId = _.sample(ids);
                let nodeId = Collection.Nodes.insert(generateNode(rootNodeId, fromNodeId));
                ids.push(nodeId);
            });
        });
    }
});
