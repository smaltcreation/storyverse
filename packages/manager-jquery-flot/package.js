Package.describe({
    name: 'storyverse:jquery-flot',
    version: '0.8.3',
    summary: 'Flot'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');

    // Dependencies
    Npm.depends({
        'jquery-flot': '0.8.3'
    });

    // Client files
    api.addFiles([
        '.npm/package/node_modules/jquery-flot/jquery.flot.js',
        '.npm/package/node_modules/jquery-flot/jquery.flot.resize.js',
        '.npm/package/node_modules/jquery-flot/jquery.flot.time.js'
    ], 'client');
});
