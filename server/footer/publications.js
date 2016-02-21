Meteor.publish('footerTotals', function () {
    return Collection.Totals.find();
});
