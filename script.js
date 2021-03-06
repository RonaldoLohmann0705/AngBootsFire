'use strict';
// Declare (or Register, Create) an Angular module.
var app = angular.module('myApp', ['ngRoute']);

// ---------- Config route(s). ----------
// Inject $routeProvider dependency for routing.
app.config([
  '$routeProvider',
  function($routeProvider) {
    // Home
    $routeProvider.when('/', {
      templateUrl: 'home.html',
      controller: 'listController',
    });
    // Food
    $routeProvider.when('/add', {
      templateUrl: 'detail.html',
      controller: 'addController',
    });
    // Drinks
    $routeProvider.when('/:index', {
      templateUrl: 'detail.html',
      controller: 'editController',
    });
    // Otherwise, redirect to Home
    $routeProvider.otherwise({ redirectTo: '/' });
  },
]);

//---------------Create Service --------------

app.factory('movieService', [
  '$rootScope',
  function($rootScope) {
    var svc = {};
    var data = [
      {
        nome: 'O Senhor do Anéis',
        desc: 'Um antigo mal acordou em Mordor e agora o feiticeiro ...',
        picUrl:'http://images6.fanpop.com/image/photos/39500000/lord-of-the-ring-fantasy-movies-and-tv-series-39570719-500-735.jpg',
      },
      {
        nome: 'Rambo',
        desc:
          'Um estranho chega na cidade e afronta a polícia local, agora ele..',
        picUrl:'http://s2.glbimg.com/EhvJoF9kRVh5JokO2mD55rPOHJk=/600x400/top/smart/e.glbimg.com/og/ed/f/original/2014/09/11/rambo.jpg',
      },
    ];
    svc.getMovies = function() {
      return data;
    };
    svc.addMovies = function(movie) {
      data.push(movie);
    };
    svc.editMovies = function(index, movie) {
      data[index] = movie ;
    };
      
    return svc;
  },
]);

// ---------- Create Controller(s). ----------
app.controller('listController', [
  '$scope',
  '$location',
  '$routeParams',
  'movieService',
  function($scope, $location, $routeParams, movieService) {
    $scope.data = movieService.getMovies();

    $scope.addMovie = function() {
      $location.path('/add');
    };

    $scope.editMovie = function(x) {
      $location.path('/' + x);
    };
  },
]);

app.controller('addController', [
  '$scope',
  '$location',
  '$routeParams',
  'movieService',
  function($scope, $location, $routeParams, movieService) {

    $scope.save = function() {
      movieService.addMovies({ nome: $scope.Item.nome, desc: $scope.Item.desc, picUrl: $scope.Item.picUrl});
      $location.path('/');
    };
    $scope.cancel = function() {
      $location.path('/');
    };
  },
]);

app.controller('editController', [
  '$scope',
  '$location',
  '$routeParams',
  'movieService',
  function($scope, $location, $routeParams, movieService) {
    $scope.Item = movieService.getMovies()[parseInt($routeParams.index)];

    $scope.save = function() {
      movieService.editMovies(parseInt($routeParams.index), { nome: $scope.Item.nome, desc: $scope.Item.desc, picUrl: $scope.Item.picUrl});
      $location.path('/');
    };
    $scope.cancel = function() {
      $location.path('/');
    };
  },
]);
