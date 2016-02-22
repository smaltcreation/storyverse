Collection.Votes.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.createdBy = userId;
});
