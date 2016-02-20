Meteor.methods({
    sendEmail: function (doc) {
        check(doc, Schema.Contact);
        this.unblock();

        Email.send({
            /** @namespace Meteor.settings.contact.sendTo */
            to: Meteor.settings.contact.sendTo,
            from: doc.email,
            subject: 'Nouveau message de Storyverse',
            text: `Message de : ${doc.name}\nMessage :\n\n${doc.message}`
        });
    }
});
