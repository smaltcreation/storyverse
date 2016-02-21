Template.footer.onCreated(function () {
    let self = this;

    if (self.data.stats) {
        self.subscribe('footerTotals', {
            onReady: function () {
                self.data.stories = Collection.Totals.findOne({
                    name: 'stories'
                }).value;

                self.data.nodes = Collection.Totals.findOne({
                    name: 'nodes'
                }).value;

                self.data.users = Collection.Totals.findOne({
                    name: 'users'
                }).value;
            }
        });
    }
});
