Template.homeMap.onCreated(function () {
    let template = this;

    template.bounds = new ReactiveVar();
    template.container = null;
    template.cursor = null;

    // Initialize map
    GoogleMaps.ready(template.data.name, function (map) {
        template.container = new MapContainer(map.instance, template.bounds);

        // Update markers
        template.autorun(function () {
            template.subscribe('homeMap', template.bounds.get());
        });

        // Find nodes
        let docs = Collection.Nodes.find();

        template.cursor = docs.observe({
            added: function (doc) {
                template.container.addedDoc(doc);
            },
            changed: function (doc) {
                template.container.changedDoc(doc);
            },
            removed: function (doc) {
                template.container.removedDoc(doc);
            }
        });
    });
});

Template.homeMap.helpers({
    options: function () {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(48.5, 2.2),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
        }
    }
});

Template.homeMap.events({
    'click #geolocate-me': function (event, template) {
        let location = Geolocation.latLng();

        if (!Geolocation.error() && location) {
            template.container.centerOnLocation(new google.maps.LatLng(location.lat, location.lng));
        }
    }
});

Template.homeMap.onDestroyed(function () {
    if (this.cursor) {
        this.cursor.stop();
    }
});
