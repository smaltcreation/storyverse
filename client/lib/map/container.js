MapContainer = class MapContainer {
    constructor (map, bounds, markerClusterOptions = {}) {
        let self = this;

        self.map = map;
        self.bounds = bounds;
        self.maxLikes = null;
        self.minSize = 10;
        self.maxSize = 25;
        self.markerCluster = null;
        self.markerClusterOptions = markerClusterOptions;
        self.ready = new ReactiveVar(false);

        Meteor.call('getMaxLikes', function (error, maxLikes) {
            if (!error) {
                self.maxLikes = maxLikes === 0 ? 1 : maxLikes;
                self.ready.set(true);
                self.start();
            }
        });
    }

    start () {
        let self = this;

        // Center map
        Tracker.autorun(function (computation) {
            let location = Geolocation.latLng();

            if (!Geolocation.error() && location) {
                self.centerOnLocation(location);
                computation.stop();
            }
        });

        // Export bounds
        google.maps.event.addListener(self.map, 'idle', function () {
            let bounds = self.map.getBounds();

            let ne = bounds.getNorthEast();
            let sw = bounds.getSouthWest();

            self.bounds.set({
                ne: {
                    lat: ne.lat(),
                    lng: ne.lng()
                },
                sw: {
                    lat: sw.lat(),
                    lng: sw.lng()
                }
            });
        });

        // Plugins
        self.markerCluster = new MarkerClusterer(self.map, [], self.markerClusterOptions);
        self.oms = new OverlappingMarkerSpiderfier(self.map);

        // Open page on click
        self.oms.addListener('click', function (marker) {
            Router.go('nodeShow', {
                id: marker.doc._id
            });
        });
    }

    addedDoc (doc) {
        const COLOR = '#5c6bc0';
        let strokeWeight = doc.likes * this.maxSize / this.maxLikes;

        if (strokeWeight < this.minSize) {
            strokeWeight = this.minSize;
        }

        let marker = new google.maps.Marker({
            doc,
            position: new google.maps.LatLng(doc.location.lat, doc.location.lng),
            title: doc.title,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                strokeColor: COLOR,
                fillColor: COLOR,
                strokeWeight
            }
        });

        this.markerCluster.addMarker(marker);
        this.oms.addMarker(marker);
    }

    changedDoc (doc) {
        this.removedDoc(doc);
        this.addedDoc(doc);
    }

    removedDoc (doc) {
        let marker = this.findMarkerByDoc(doc);
        google.maps.event.clearInstanceListeners(marker);
        this.markerCluster.removeMarker(marker);
        this.oms.removeMarker(marker);
    }

    findMarkerByDoc (doc) {
        return _.find(this.markerCluster.getMarkers(), function (marker) {
            return doc._id === marker.doc._id;
        });
    }

    centerOnLocation (location, zoom = 4) {
        this.map.setCenter(location);
        this.map.setZoom(zoom);
    }
};
