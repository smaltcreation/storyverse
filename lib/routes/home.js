Router.route('/', {
    name: 'home',
    template: 'home',
    onBeforeAction: function () {
        GoogleMaps.load();
        this.next();
    }
});
