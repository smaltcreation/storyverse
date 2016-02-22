const ROOT_NODES = 500;
const USERS = 10;
const CHILD_NODES_MIN = 1;
const CHILD_NODES_MAX = 50;
const TOTAL_LIKES = 5000;

// If you want to generate fixtures, comment the hook in "server/node/hooks.js"
/*Meteor.methods({
    init: function () {
        // Users
        _.each(_.range(USERS), function (i) {
            console.log('Creating user', i, '/', USERS);

            Meteor.users.insert({
                username: faker.internet.userName()
            });
        });

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

        // Likes
        _.each(_.range(TOTAL_LIKES), function (i) {
            console.log('Creating like', i, '/', TOTAL_LIKES);

            let node = Collection.Nodes.findOne({}, {
                limit: 1,
                skip: _.random(0, Collection.Nodes.find({}).count())
            });

            if (!node) {
                return false;
            }

            Collection.Nodes.update(node._id, {
                $inc: {
                    likes: 1
                }
            });

            // Update parents
            if (node.from) {
                node = Collection.Nodes.findOne(node.from);

                while (node) {
                    Collection.Nodes.update(node._id, {
                        $inc: {
                            totalChildrenLikes: 1
                        }
                    });

                    node = node.from ? Collection.Nodes.findOne(node.from) : null;
                }
            }
        });
    }
});*/

function generateRootNode (totalChildNodes) {
    let lat = faker.address.latitude();

    if (lat < -80) {
        lat = -80;
    } else if (lat > 80) {
        lat = 80;
    }

    return _.extend(generateNode(), {
        totalChildNodes,
        location: {
            lat: parseFloat(lat),
            lng: parseFloat(faker.address.longitude())
        }
    });
}

function generateChildNode (root, from) {
    return _.extend(generateNode(), {
        root,
        from
    });
}

function generateNode () {
    let user = Meteor.users.findOne({}, {
        limit: 1,
        skip: _.random(0, Meteor.users.find({}).count())
    });

    return {
        content: faker.lorem.sentences(15, true, 4).replace(/\n+/g, ' '),
        lang: faker.address.countryCode().toLowerCase(),
        likes: 0,
        totalChildrenLikes: 0,
        color: _.sample(_.pluck(Data.COLORS, 'value')),
        title: faker.lorem.sentence(),
        createdBy: user ? user._id : 'EBx82XxTMRDo3fYgz',
        createdAt: new Date()
    };
}
