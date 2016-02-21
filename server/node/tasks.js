SyncedCron.add({
    name: 'Update total nodes and stories',
    schedule: function(parser) {
        return parser.text('every 15 minutes');
    },
    job: function() {
        let value;

        // Stories
        value = Collection.Nodes.find( {
            from: {
                $exists: false
            }
        }).count();

        Collection.Totals.upsert({
            name: 'stories'
        }, {
            $set: {
                value: value
            }
        });

        // Nodes
        value = Collection.Nodes.find().count();

        Collection.Totals.upsert({
            name: 'nodes'
        }, {
            $set: {
                value: value
            }
        });
    }
});
