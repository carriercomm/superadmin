;
(function (root, factory) {
    if (typeof exports === 'object' && typeof require === 'function') {
        return module.exports = factory(require('jquery'), require('underscore'), require('backbone'));
    } else if (typeof define === 'function' && define.amd) {
        return define(['jquery', 'underscore', 'backbone', 'config'], function ($, _, Backbone) {
            return factory($ || root.$, _ || root._, Backbone || root.Backbone);
        });
    } else {
        return factory($, _, Backbone, config);
    }
}(this, function ($, _, Backbone) {
    // Parse hash helper method used for parsing location.hash.
    var parseHash = function (hash) {
        var params = {},
            queryString = hash.substring(1),
            regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    }

    // Add a public method so that anything else can also create the header
    Backbone.Auth = {
        login: function (options) {
            // Override any default option with the options passed to the constructor.
            _.extend(this, options);

            var params = {}
                , that = this
                , url = this.authUrl
                    + '?client_id=' + this.clientId
                    + '&redirect_uri=' + this.redirectUrl
                    + '&response_type=token'
                , left = (screen.width / 2) - (this.width / 2) || 0
                , top = (screen.height / 2) - (this.height / 2) || 0;

            if (this.scope) url += '&scope=' + this.scope;
            if (this.state) url += '&state=' + this.state;

            if (!Backbone.Auth.getAccessToken()) {
                console.log('NO TOKEN!!!');
                var popup = window.open(url, '_blank', 'resizable=no,location=no,toolbar=no,width=' + (this.width || 800) + ',height=' + (this.height || 600) + ',left=' + left + ',top=' + top);

                /*$(popup).on('load', function (event) {
                 console.log('popup loaded');
                 var url = event.url || event.target.URL;
                 console.log('popup loaded with url:', url);
                 if (url.indexOf('access_token=') > 0) {
                 params[that.tokenName] = that.extractToken(url);
                 that.onSuccess(params);
                 this.close();
                 } else {
                 that.onError(params);
                 }
                 });*/
            } else {
                console.log('Token is already here!');
            }
        },
        // Application-level logout: we simply discard the token.
        logout: function () {
            window.localStorage.removeItem('session');
        },
        // Headers for Bearer Authorization
        headers: function () {
            return {
                'Authorization': 'Bearer ' + Backbone.Auth.getAccessToken(),
                'Accept': 'application/json'
            };
        },
        active: function () {
            // try loading the session
            var localSession = Backbone.Auth.getAccessToken();
            return !_.isNull(localSession) ? localSession : null;
        },
        getAccessToken: function () {
            var data = JSON.parse(window.localStorage.getItem('session'));
            return (data ? (data.shift()).token : null);
        },
        // Detect if we have a successful auth and save it to localStorage.
        authSuccess: function (params) {
            return params['access_token'];
        },
        onRedirect: function (hash) {
            var params = parseHash(hash);
            if (Backbone.Auth.authSuccess(params)) {
                Backbone.Auth.success(params);
            } else {
                Backbone.Auth.error(params);
            }
        },
        // Fires onSuccess
        success: function (params) {
            console.log('OAuth2 onSuccess', params);

            if (typeof(window.localStorage) != 'undefined') {
                window.localStorage.setItem('session', JSON.stringify([
                    {id: null, token: params['access_token']}
                ]));

                Backbone.history.navigate('', {trigger: true});
            } else {
                throw "window.localStorage, not defined";
            }
        },

        // Fires onError
        error: function (params) {
            console.log('OAuth2 onError', params);
        }
    };

    // Make the onRedirect function publicy available.
    window.OAuth2Redirect = Backbone.Auth.onRedirect;

    // Store a copy of the original Backbone.sync
    var originalSync = Backbone.sync;

    // Override Backbone.sync
    Backbone.sync = function (method, model, options) {
        options = options || {};
        options.headers = options.headers || {};

        // Extending headers
        _.extend(options.headers, Backbone.Auth.headers());

        // Perform the sync
        return originalSync.call(model, method, model, options);
    };

    return Backbone.OAuth2;
}));