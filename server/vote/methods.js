Meteor.methods({
    toggleVote: function (nodeId) {
        let node = Collection.Nodes.findOne(nodeId);
        
        if (!node) {
            return false;
        }

        let userId = Meteor.userId();
        let vote = Collection.Votes.findOne({
            node: nodeId,
            createdBy: userId
        });

        // Save or remove vote
        if (vote) {
            Collection.Votes.remove(vote._id);
        } else {
            Collection.Votes.insert({
                node: nodeId
            });
        }

        // Direction
        let inc = vote ? -1 : 1;

        // Update node
        Collection.Nodes.update(node._id, {
            $inc: {
                likes: inc
            }
        });

        // Update parents
        if (node.from) {
            node = Collection.Nodes.findOne(node.from);

            while (node) {
                Collection.Nodes.update(node._id, {
                    $inc: {
                        totalChildrenLikes: inc
                    }
                });

                node = node.from ? Collection.Nodes.findOne(node.from) : null;
            }
        }

        return true;
    }
});
