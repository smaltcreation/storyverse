Meteor.startup(function () {
    /** @namespace Meteor.settings.mail */
    var s = Meteor.settings.mail;

    s.username = encodeURIComponent(s.username);
    s.password = encodeURIComponent(s.password);

    /** @namespace process.env */
    process.env.MAIL_URL = s.protocol + '://' + s.username + ':' + s.password + '@' + s.server + ':' + s.port;
});
