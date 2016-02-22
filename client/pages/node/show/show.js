Template.nodeShow.onRendered(function () {
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
});

Template.nodeShow.events({
    'click .chip i': function (event) {
        event.stopPropagation();
    }
});
