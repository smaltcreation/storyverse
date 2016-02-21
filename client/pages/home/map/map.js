Template.homeMap.onCreated(function () {
    let template = this;

    template.bounds = new ReactiveVar();
    template.container = null;
    template.cursor = null;

    let clusterStyles = [
        {
            textColor: 'white',
            url: '/images/cluster/m1.png',
            height: 53,
            width: 53
        },
        {
            textColor: 'white',
            url: '/images/cluster/m2.png'
        },
        {
            textColor: 'white',
            url: '/images/cluster/m3.png',
            height: 53,
            width: 53
        },
        {
            textColor: 'white',
            url: '/images/cluster/m4.png',
            height: 53,
            width: 53
        },
        {
            textColor: 'white',
            url: '/images/cluster/m5.png',
            height: 53,
            width: 53
        }
    ];

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
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e9e9e9"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
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
                                "color": "#ffffff"
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
                                "color": "#ffffff"
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
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dedede"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#333333"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefefe"
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
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
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
