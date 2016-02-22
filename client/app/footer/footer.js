Template.footer.onCreated(function () {
    let self = this;

    if (self.data.stats) {
        self.subscribe('footerTotals', {
            onReady: function () {
                let names = ['stories', 'nodes', 'users'];

                _.each(names, function (name) {
                    let doc = Collection.Totals.findOne({
                        name: name
                    });
                    
                    if (doc) {
                        self.data[name] = doc.value;
                    }
                });
            }
        });
    }
});
