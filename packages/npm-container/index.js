Meteor.npmRequire = function(moduleName) {
    return Npm.require(moduleName);
};

Meteor.require = function(moduleName) {
    console.warn('Meteor.require is deprecated. Please use Meteor.npmRequire instead!');
    return Meteor.npmRequire(moduleName);
};
