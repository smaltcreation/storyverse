Template.nodeNextContainer.onCreated(function () {
    this.data.nextAuthorNode = null;
    this.data.nextPopularNode = null;

    this.subscribe('nodeShowNextAuthor', this.data.from._id);
    this.subscribe('nodeShowNextPopular', this.data.from._id);
});

Template.nodeNextContainer.helpers({
    nextAuthorNode: function () {
        return Collection.Nodes.findOne({
            from: this.from._id,
            createdBy: this.from.createdBy
        }, {
            sort: {
                createdAt: -1
            }
        });
    },
    nextPopularNode: function () {
        return Collection.Nodes.findOne({
            from: this.from._id,
            createdBy: {
                $ne: this.from.createdBy
            }
        }, {
            sort: {
                totalChildrenLikes: -1
            }
        });
    }
});
