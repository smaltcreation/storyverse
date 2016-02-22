Template.nodeShow.helpers({
    score: function () {
        return numeral(this.node.likes + this.node.totalChildrenLikes).format('0a');
    }
});

Template.nodeShow.onRendered(function () {
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
});

Template.nodeShow.events({
    'click .chip i': function (event) {
        event.stopPropagation();
    }
});
