Template.navbar.onRendered(function () {
    $('.button-collapse').sideNav();

    // Dropdown
    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false,
            hover: false,
            gutter: 0,
            belowOrigin: true,
            alignment: 'right'
        }
    );
});
