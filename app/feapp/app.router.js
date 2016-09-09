NixFont.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/404');
  $urlRouterProvider.when('', '/');

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      controller: 'LayoutController',
      templateUrl: './feapp/components/layout/layout.html'
    })
    .state('app.home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: './feapp/components/home/home.html'
    });
});
