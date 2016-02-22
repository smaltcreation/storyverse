Template.nodeShowNextPopular.helpers({
    author: function () {
        return Meteor.users.findOne(this.createdBy);
    }
});

Template.nodeShowNextPopular.onRendered(function () {
    $('.tooltipped').tooltip();
});
