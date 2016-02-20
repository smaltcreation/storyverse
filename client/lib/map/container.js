MapContainer = class MapContainer {
    constructor (map, bounds, markerClusterOptions = {}) {
        this.map = map;
        this.bounds = bounds;
        this.markerCluster = null;
        this.markerClusterOptions = markerClusterOptions;

        this.start();
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

        // Marker cluster
        self.markerCluster = new MarkerClusterer(self.map, [], self.markerClusterOptions);
    }

    addedDoc (doc) {
        let marker = new google.maps.Marker({
            doc: doc,
            position: new google.maps.LatLng(doc.location.lat, doc.location.lng),
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5
            }
        });

        this.markerCluster.addMarker(marker);
    }

    changedDoc (doc) {
        this.removedDoc(doc);
        this.addedDoc(doc);
    }

    removedDoc (doc) {
        let marker = this.findMarkerByDoc(doc);
        this.markerCluster.removeMarker(marker);
    }

    findMarkerByDoc (doc) {
        let result = null;

        _.some(this.markerCluster.getMarkers(), function (marker) {
            let found = doc._id === marker.doc._id;

            if (found) {
                result = marker;
            }

            return found;
        });

        return result;
    }

    centerOnLocation (location, zoom = 4) {
        this.map.setCenter(location);
        this.map.setZoom(zoom);
    }
};
