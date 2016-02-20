AutoForm.addHooks('contact', {
    onSuccess: function () {
        toastr.success('Message send!');
        Router.go('/');
    }
});
