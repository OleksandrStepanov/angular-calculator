app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('simple', {
        url: '/',
        templateUrl: 'templates/calculator.html'
    })
});
