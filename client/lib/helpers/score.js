Template.registerHelper('nodeScore', function (node) {
    return numeral(node.likes + node.totalChildrenLikes).format('0a');
});
