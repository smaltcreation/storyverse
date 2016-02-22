Meteor.publish('nodeShow', function (nodeId) {
    let node = Collection.Nodes.findOne(nodeId);

    if (!node) {
        return [];
    }

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

    if (!node) {
        return [];
    }

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

Meteor.publish('nodeShowNextAuthor', function (fromId) {
    let from = Collection.Nodes.findOne(fromId);

    if (!from) {
        return [];
    }

    return Collection.Nodes.find({
        from: fromId,
        createdBy: from.createdBy
    }, {
        sort: {
            createdAt: -1
        },
        limit: 1
    });
});


Meteor.publish('nodeShowNextPopular', function (fromId) {
    let from = Collection.Nodes.findOne(fromId);

    if (!from) {
        return [];
    }

    let selector = {
        from: from._id,
        createdBy: {
            $ne: from.createdBy
        }
    };

    let options = {
        sort: {
            totalChildrenLikes: -1
        }
    };

    let node = Collection.Nodes.findOne(selector, options);

    if (!node) {
        return [];
    }

    return [
        Collection.Nodes.find(selector, _.extend(options, {
            limit: 1
        })),
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
