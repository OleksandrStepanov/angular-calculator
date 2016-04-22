app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('simple', {
        url: '/',
        templateUrl: 'templates/simple_mode.html'
    })
    .state('advanced', {
      url: '/advanced',
      templateUrl: 'templates/advanced_mode.html'
    })
});
