Router.route('/user/profile/:username', {
    name: 'userProfile',
    template: 'userProfile',
    waitOn: function () {
        return [
            Meteor.subscribe('userProfile', this.params.username)
        ];
    },
    onBeforeAction: function () {
        let user = Meteor.users.findOne({
            username: this.params.username
        });

        if (user) {
            this.next();
        } else {
            this.render('notFound');
        }
    },
    data: function () {
        if (this.ready()) {
            let user = Meteor.users.findOne({
                username: this.params.username
            });

            if (user) {
                let nodes = Collection.Nodes.find({
                    createdBy: user._id
                }, {
                    sort: {
                        createdAt: -1
                    }
                });

                return {
                    user: user,
                    since: moment(user.registeredAt).format('L LT'),
                    totalNodes: nodes.count(),
                    nodes: nodes.fetch()
                };
            }
                    }
    }
});
