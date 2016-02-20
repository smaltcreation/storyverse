Schema = {
    Contact: new SimpleSchema({
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
    })
};
