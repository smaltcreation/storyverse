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
