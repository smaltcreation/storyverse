Router.route('/', {
    name: 'home',
    template: 'home',
    onBeforeAction: function () {
        GoogleMaps.load();
        GoogleMaps.loadUtilityLibrary(GOOGLE_MAPS_OMS_PATH);
        this.next();
    }
});
