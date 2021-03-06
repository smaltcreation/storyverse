let stripTags = Meteor.npmRequire('striptags');

Collection.Nodes.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.createdBy = userId;
    doc.content = stripTags(doc.content);
    doc.likes = 0;
    doc.totalChildrenLikes = 0;

    if (doc.from) {
        let node = Collection.Nodes.findOne(doc.from);
        doc.root = node.root ? node.root : node._id;
    }

    // Update user profile
    Meteor.users.update(userId, {
        $set: {
            'profile.language': doc.language,
            'profile.color': doc.color
        }
    });
});
