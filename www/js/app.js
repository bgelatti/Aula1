(function() {

var app = angular.module('bloconotas', ['ionic', 'bloconotas.banconota']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('lista', {
    url: '/lista',
    templateUrl: 'templates/list.html'
  });

  $stateProvider.state('novo', {
    url: '/novo',
    templateUrl: 'templates/edit.html',
    controller: 'novoControle'
  });

  $stateProvider.state('editar', {
    url: '/editar/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'editarControle'
  });

  $urlRouterProvider.otherwise('/lista');
});

app.controller('listaControle', function($scope, BancoNota) {

  $scope.reordering = false;
  $scope.notes = BancoNota.list();

  $scope.remove = function(noteId) {
    BancoNota.remove(noteId);
  };

  $scope.move = function(note, fromIndex, toIndex) {
    BancoNota.move(note, fromIndex, toIndex);
  };

  $scope.toggleReordering = function() {
    $scope.reordering = !$scope.reordering;
  };

});

app.controller('novoControle', function($scope, $state, BancoNota) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    BancoNota.create($scope.note);
    $state.go('lista');
  };
});

app.controller('editarControle', function($scope, $state, BancoNota) {

  $scope.note = angular.copy(BancoNota.get($state.params.noteId));

  $scope.save = function() {
    BancoNota.update($scope.note);
    $state.go('list');
  };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());