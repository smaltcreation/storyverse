Router.route('/node/new/:from?', {
    name: 'nodeNew',
    template: 'nodeNew',
    onBeforeAction: function () {
        if (!Meteor.loggingIn()) {
            if (Meteor.userId()) {
                this.next();
            } else {
                this.redirect('atSignIn');
            }
        }
    },
    data: function () {
        return {
            from: this.params.from
        };
    }
});

Router.route('/node/:id', {
    name: 'nodeShow',
    template: 'nodeShow',
    waitOn: function () {
        return [
            Meteor.subscribe('nodeShow', this.params.id)
        ];
    },
    data: function () {
        if (this.ready()) {
            return {
                node: Collection.Nodes.findOne(this.params.id)
            };
        }
    }
});
