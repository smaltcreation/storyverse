Template.homePopular.onCreated(function () {
    this.subscribe('homePopular');
});

Template.homePopular.helpers({
    node: function () {
        return Collection.Nodes.findOne({}, {
            sort: {
                totalChildrenLikes: -1
            }
        });
    },
    author: function () {
        let node = Collection.Nodes.findOne({}, {
            sort: {
                totalChildrenLikes: -1
            }
        });

        return Meteor.users.findOne(node.createdBy);
    }
});
