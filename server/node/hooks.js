let stripTags = Meteor.npmRequire('striptags');

Collection.Nodes.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.createdBy = userId;
    doc.content = stripTags(doc.content);
});
