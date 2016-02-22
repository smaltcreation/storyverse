Meteor.publish('userProfile', function (username) {
    let user = Meteor.users.findOne({
        username: username
    });

    if (!user) {
        return [];
    }

    return [
        Meteor.users.find({
            username: username
        }, {
            fields: {
                username: 1,
                profile: 1
            }
        }),
        Collection.Nodes.find({
            createdBy: user._id
        })
    ];
});
