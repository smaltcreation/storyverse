Package.describe({
    name: 'storyverse:marker-spider',
    version: '0.1.0',
    summary: 'marker-spider 0.1.0'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');

    Npm.depends({
        'marker-spider': '0.1.0'
    });

    api.use([
        'ecmascript'
    ]);

    api.addAssets([
        '.npm/package/node_modules/marker-spider/dist/oms.min.js'
    ], 'client');

    api.addFiles([
        'client/path.js'
    ], 'client');

    api.export([
        'GOOGLE_MAPS_OMS_PATH'
    ], 'client');
});
