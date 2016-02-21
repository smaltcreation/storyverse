Meteor.methods({
    getMaxLikes: function () {
        let node = Collection.Nodes.findOne({}, {
            sort: {
                likes: -1
            }
        });

        return node ? node.likes : 0;
    }
});
