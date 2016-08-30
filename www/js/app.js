(function() {

var app = angular.module('bloconotas', ['ionic', 'bloconotas.banconota', 'ionic-datepicker']);

app.config(function($stateProvider, $urlRouterProvider, ionicDatePickerProvider) {

  var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

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

app.controller('novoControle', function($scope, $state, BancoNota, ionicDatePicker) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    BancoNota.create($scope.note);
    $state.go('lista');
  };

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
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