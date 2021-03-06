SyncedCron.add({
    name: 'Update total nodes and stories',
    schedule: function(parser) {
        return parser.text('every 5 minutes');
    },
    job: function() {
        // Stories
        Collection.Totals.upsert({
            name: 'stories'
        }, {
            $set: {
                value: Collection.Nodes.find( {
                    from: {
                        $exists: false
                    }
                }).count()
            }
        });

        // Nodes
        Collection.Totals.upsert({
            name: 'nodes'
        }, {
            $set: {
                value: Collection.Nodes.find().count()
            }
        });
    }
});

SyncedCron.add({
    name: 'Update nodes statistics',
    schedule: function(parser) {
        return parser.text('every 5 minutes');
    },
    job: function() {
        Collection.Statistics.insert({
            createdAt: new Date(),
            totalNodes: Collection.Nodes.find().count()
        });
    }
});
