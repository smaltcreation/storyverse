Meteor.users
    .permit(['update'])
    .ifLoggedIn()
    .ifIsCurrentUser()
    .onlyProps('profile')
    .apply();
