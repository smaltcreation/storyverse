Template.nodeShowNextPopular.helpers({
    author: function () {
        return Meteor.users.findOne(this.node.createdBy);
    }
});
