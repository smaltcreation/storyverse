Template.contact.helpers({
    options: function() {
        return {
            schema: Schema.Contact,
            id: 'form-contact',
            type: 'method',
            meteormethod: 'sendEmail'
        };
    }
});
