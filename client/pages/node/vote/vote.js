Template.nodeVote.onCreated(function () {
    this.subscribe('nodeVote', this.data.id);
});

Template.nodeVote.helpers({
    like: function () {
        let user = Meteor.user();

        if (!user) {
            return false;
        }

        return !!Collection.Votes.findOne({
            node: this.id,
            createdBy: user._id
        });
    }
});

Template.nodeVote.events({
    'click .like': function (event) {
        event.preventDefault();

        if (Meteor.user()) {
            Meteor.call('toggleVote', this.id, function (error) {
                if (error) {
                    toastr.error('An error occurred.');
                }
            });
        } else {
            Router.go('atSignIn');
        }
    }
});
