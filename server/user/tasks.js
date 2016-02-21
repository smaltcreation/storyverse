SyncedCron.add({
    name: 'Update total users',
    schedule: function(parser) {
        return parser.text('every 15 minutes');
    },
    job: function() {
        let value = Meteor.users.find().count();

        Collection.Totals.upsert({
            name: 'users'
        }, {
            $set: {
                value: value
            }
        });
    }
});
