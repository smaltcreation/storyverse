Template.homeMap.onCreated(function () {
    let template = this;

    template.bounds = new ReactiveVar();
    template.container = null;
    template.cursor = null;

    let clusterStyles = _.map(_.range(1, 5), function (level) {
        return {
            textColor: 'white',
            url: `/images/cluster/m${level}.png`,
            height: 53,
            width: 53
        };
    });

    // Initialize map
    GoogleMaps.ready(template.data.name, function (map) {
        template.container = new MapContainer(map.instance, template.bounds, {styles: clusterStyles});

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
                minZoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    }
                ]
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
