const { NODE_ENV } = process.env;
const { hostname } = window.location;

const Config = {
    apiKey: "AIzaSyCiwvs6pLVSRbT2S9Sahb6cRVXZkWJq7AQ",
    authDomain: "sangamserene-india.firebaseapp.com",
    databaseURL: "https://sangamserene-india.firebaseio.com",
    projectId: "sangamserene-india",
    storageBucket: "sangamserene-india.appspot.com",
    messagingSenderId: "248823128879",
    ADMIN_EMAIL: 'sangamserene@gmail.com',
};

const UiConfig = {
    callbacks: {
        signInFailure: function(error) {
        }
    },
    // signInFlow: 'popup',
    // signInSuccessUrl: '/admin',
}

export default {
    Config,
    UiConfig
};


