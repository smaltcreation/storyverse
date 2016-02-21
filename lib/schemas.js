Schema = {};

Schema.Contact = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        max: 200
    },
    message: {
        type: String,
        label: 'Message',
        max: 1000
    }
});

Schema.Location = new SimpleSchema({
    lat: {
        type: Number,
        decimal: true
    },
    lng: {
        type: Number,
        decimal: true
    }
});

Schema.Node = new SimpleSchema({
    title: {
        type: String,
        label: 'Title',
        max: 150
    },
    content: {
        type: String,
        label: 'Write your story...',
        max: 1500,
        autoform: {
            type: 'textarea'
        }
    },
    language: {
        type: String,
        label: 'Language',
        autoform: {
            type: 'select',
            options: function () {
                return _.sortBy(Data.LANGUAGES, 'label');
            }
        }
    },
    color: {
        type: String,
        label: 'Color',
        autoform: {
            type: 'select',
            options: function () {
                return _.sortBy(Data.COLORS, 'label');
            }
        }
    },
    from: {
        type: String,
        optional: true
    },
    location: {
        type: Schema.Location,
        optional: true
    }
});
