Template.contact.helpers({
    options: function() {
        return {
            schema: Schema.Contact,
            id: 'contact',
            type: 'method',
            meteormethod: 'sendEmail'
        };
    }
});
