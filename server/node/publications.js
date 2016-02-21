Meteor.publish('nodeShow', function (nodeId) {
    return Collection.Nodes.find({
        _id: nodeId
    });
});

Meteor.publish('nodeNetwork', function (nodeId) {
    let node = Collection.Nodes.findOne(nodeId);
    let rootId = node.root ? node.root : nodeId;

    return Collection.Nodes.find({
        createdAt: {
            $gt: node.createdAt
        },
        $or: [
            { _id: rootId },
            { root: rootId }
        ]
    }, {
        limit: 50
    });
});
