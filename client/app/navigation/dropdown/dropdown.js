Template.navigationDropdown.events({
    'click #logout': function () {
        Meteor.logout(function (error) {
            if (error) {
                toastr.error(error.reason, 'Error');
            } else {
                toastr.success('You have been disconnected.');
            }
        });
    }
});
