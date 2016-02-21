Meteor.startup(function () {
    const ROOT_NODES = 100;
    const CHILD_NODES_MIN = 10;
    const CHILD_NODES_MAX = 200;

    if (Collection.Nodes.find().count() === 0) {
        // Root nodes
        _.each(_.range(ROOT_NODES), function (rootNodeNumber) {
            console.log('Creating root node', rootNodeNumber, '/', ROOT_NODES);
            let totalChildNodes = _.random(CHILD_NODES_MIN, CHILD_NODES_MAX);
            let rootNodeId = Collection.Nodes.insert(generateRootNode(totalChildNodes));
            let ids = [rootNodeId];

            // Child nodes
            _.each(_.range(totalChildNodes), function (childNodeNumber) {
                console.log('Creating child node', childNodeNumber, '/', totalChildNodes, '- root node', rootNodeNumber, '/', ROOT_NODES);

                let fromNodeId = _.sample(ids);
                let nodeId = Collection.Nodes.insert(generateChildNode(rootNodeId, fromNodeId));
                ids.push(nodeId);
            });
        });
    }
});

function generateRootNode (totalChildNodes) {
    let lat = faker.address.latitude();

    if (lat < -80) {
        lat = -80;
    } else if (lat > 80) {
        lat = 80;
    }

    return _.extend(generateNode(), {
        totalChildNodes,
        title: faker.lorem.sentence(),
        location: {
            lat: parseFloat(lat),
            lng: parseFloat(faker.address.longitude())
        }
    });
}

function generateChildNode (root, from) {
    return _.extend(generateNode(), {
        root,
        from,
        title: faker.random.boolean() ? faker.lorem.sentence() : null
    });
}

function generateNode () {
    return {
        content: faker.lorem.paragraphs(),
        lang: faker.address.countryCode().toLowerCase(),
        likes: faker.random.number(),
        totalChildrenLikes: faker.random.number(),
        color: faker.internet.color()
    };
}
