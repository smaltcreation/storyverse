Template.nodeShow.events({
    'click .chip i': function (event) {
        event.stopPropagation();
    }
});

Template.nodeShow.onRendered(function () {
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
});
