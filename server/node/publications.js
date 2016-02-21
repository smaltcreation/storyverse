Meteor.publish('nodeShow', function (nodeId) {
    let node = Collection.Nodes.findOne(nodeId);

    return [
        Collection.Nodes.find({
            _id: nodeId
        }),
        Meteor.users.find({
            _id: node.createdBy
        }, {
            fields: {
                username: 1,
                profile: 1
            }
        })
    ];
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
