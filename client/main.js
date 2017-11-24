import { Meteor } from 'meteor/meteor'
import vueApp from '/imports/startup/client/app'

Meteor.startup(function () {
  // Init Vue App
  vueApp

  // Install ServiceWorker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
})

