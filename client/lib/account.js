T9n.setLanguage('en');

AccountsTemplates.configure({
    defaultLayout: 'layout'
});

let preSignUp = function (password, info) {
    info.profile.tips = true;
    info.profile.color = _.sample(_.pluck(Data.COLORS, 'value'));
    info.profile.registeredAt = moment().format();
};

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showForgotPasswordLink: true,
    showLabels: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    termsUrl: 'terms',

    // Redirects
    //homeRoutePath: '/',
    //redirectTimeout: 4000,
    preSignUpHook: preSignUp,

    // Override
    texts: {
        inputIcons: {
            isValidating: "fa fa-spinner fa-spin",
            hasSuccess: "fa fa-check",
            hasError: "fa fa-times"
        }
    }
});

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    showValidating: true,
    placeholder: {
        signUp: "wjames"
    },
    func: function(value){
        if (Meteor.isClient) {
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    }
});

// Routes declaration
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');
