export const environment = {
  production: true,
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
