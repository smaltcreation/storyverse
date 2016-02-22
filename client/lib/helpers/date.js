Template.registerHelper('date', function (date) {
    return moment(date).format('L LT');
});
