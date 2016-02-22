Meteor.publish('homeMap', function (bounds) {
    if (!bounds) {
        return [];
    }

    let selector = {
        from: {
            $exists: false
        },
        location: {
            $ne: null
        }
    };

    // Latitude
    selector['location.lat'] = {
        $gte: bounds.sw.lat,
        $lte: bounds.ne.lat
    };

    // Longitude
    let westLng = bounds.sw.lng;
    let eastLng = bounds.ne.lng;

    // If overlap, else classic
    if (eastLng < westLng) {
        selector.$or = [
            { 'location.lng': { $gte: westLng, $lte: 180 } },
            { 'location.lng': { $gte: -180, $lte: eastLng } }
        ];
    } else {
        selector['location.lng'] = {
            $gte: bounds.sw.lng,
            $lte: bounds.ne.lng
        };
    }

    return Collection.Nodes.find(selector);
});

Meteor.publish('homePopular', function () {
    return Collection.Nodes.find({}, {
        sort: {
            totalChildrenLikes: -1
        },
        limit: 1
    });
});
