Template.nodeShow.helpers({
    score: function () {
        return numeral(this.node.likes + this.node.totalChildrenLikes).format('0a');
    }
});