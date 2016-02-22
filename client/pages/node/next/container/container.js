Template.nodeNextContainer.onCreated(function () {
    let self = this;

    self.data.nextAuthorNode = new ReactiveVar();
    self.data.nextPopularNode = new ReactiveVar();

    self.subscribe('nodeShowNextAuthor', self.data.from._id, {
        onReady: function () {
            self.data.nextAuthorNode.set(Collection.Nodes.findOne({
                from: self.data.from._id,
                createdBy: self.data.from.createdBy
            }, {
                sort: {
                    createdAt: -1
                }
            }));
        }
    });

    self.subscribe('nodeShowNextPopular', self.data.from._id, {
        onReady: function () {
            self.data.nextPopularNode.set(Collection.Nodes.findOne({
                from: self.data.from._id,
                createdBy: {
                    $ne: self.data.from.createdBy
                }
            }, {
                sort: {
                    totalChildrenLikes: -1
                }
            }));
        }
    });
});
