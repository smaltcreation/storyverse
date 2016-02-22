Meteor.publish('nodeVote', function (nodeId) {
    if (!this.userId) {
        return [];
    }

    return Collection.Votes.find({
        createdBy: this.userId,
        node: nodeId
    });
});
