Package.describe({
    name: 'storyverse:vis',
    version: '4.14.0',
    summary: 'vis.js 4.14.0'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');

    Npm.depends({
        hammerjs: '2.0.6',
        vis: '4.14.0'
    });

    api.addFiles([
        '.npm/package/node_modules/hammerjs/hammer.min.js',
        '.npm/package/node_modules/vis/dist/vis.min.css',
        '.npm/package/node_modules/vis/dist/vis.min.js'
    ], 'client');
});
