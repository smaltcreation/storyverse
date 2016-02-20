T9n.setLanguage('en');

AccountsTemplates.configure({
    defaultLayout: 'layout'
});

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
    termsUrl: 'terms'

    // Redirects
    //homeRoutePath: '/',
    //redirectTimeout: 4000,
});

// Routes declaration
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');
