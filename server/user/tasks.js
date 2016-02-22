SyncedCron.add({
    name: 'Update total users',
    schedule: function(parser) {
        return parser.text('every 5 minutes');
    },
    job: function() {
        Collection.Totals.upsert({
            name: 'users'
        }, {
            $set: {
                value: Meteor.users.find().count()
            }
        });
    }
});
