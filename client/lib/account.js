T9n.setLanguage('en');

AccountsTemplates.configure({
    defaultLayout: 'layout'
});

let preSignUp = function (password, info) {
    let colors = [
        'F44336',
        'F44336',
        '9C27B0',
        '673AB7',
        '3F51B5',
        '2196F3',
        '03A9F4',
        '00BCD4',
        '009688',
        '4CAF50',
        '8BC34A',
        'CDDC39',
        'FFC107',
        'FF9800',
        'FF5722',
        '795548',
        '9E9E9E',
        '607D8B'
    ];
    console.log(info);

    info.profile.tips = true;
    info.profile.color = '#' + _.sample(colors);
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
    preSignUpHook: preSignUp
});

// Routes declaration
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');
