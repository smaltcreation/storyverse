let template = null;

Template.nodeNew.onCreated(function () {
    this.data.location = null;
    template = this;
});

Template.nodeNew.helpers({
    options: function () {
        return {
            schema: Schema.Node,
            id: 'form-node-new',
            type: 'insert',
            collection: Collection.Nodes,
            omitFields: [
                'from',
                'location'
            ],
            doc: {
                language: Meteor.user().profile.language,
                color: Meteor.user().profile.color
            }
        };
    }
});

Template.nodeNew.onRendered(function () {
    let self = this;

    // Char counters
    $('[maxlength]').each(function () {
        let input = $(this);
        let max = input.attr('maxlength');

        input.attr('length', max).characterCounter();
    });

    // Geolocation
    Tracker.autorun(function (computation) {
        let location = Geolocation.latLng();
        let error = Geolocation.error();

        if (location) {
            self.data.location = location;
            computation.stop();
        } else if (error) {
            if (error.code === error.PERMISSION_DENIED) {
                $('#geolocation-modal').openModal();
            } else {
                toastr.warning('Your location is unavailable. You can still write your story, but it will not appear on the map.');
            }
        }
    });
});

AutoForm.addHooks('form-node-new', {
    before: {
        insert: function (doc) {
            doc.from = template.data.from;
            doc.location = template.data.location;

            return doc;
        }
    },
    onSuccess: function (formType, result) {
        Router.go('nodeShow', {
            id: result
        });
    }
});

