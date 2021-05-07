// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAdeT0MeEke_ARCcS19YyIs9D4FmTmKqqM',
    authDomain: 'ng-trello-c4f4d.firebaseapp.com',
    projectId: 'ng-trello-c4f4d',
    storageBucket: 'ng-trello-c4f4d.appspot.com',
    messagingSenderId: '904467297110',
    appId: '1:904467297110:web:baa09d3c34d90851bc5cf7'
  },
  vk: {
    oauth: {
      apiUrl: 'https://oauth.vk.com/authorize',
      redirectUri: 'http://localhost:4200/auth/vk',
      responceType: 'token'
    },
    api: {
      apiUrl: 'https://api.vk.com/method',
      usersGetEndpoint: '/users.get',
    },
    clientId: '7847226',
    apiVersion: ''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
