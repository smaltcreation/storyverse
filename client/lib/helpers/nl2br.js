Template.registerHelper('nl2br', function (input) {
    return input.replace(/\r\n|\n\r|\r|\n/g, '<br>')
});
