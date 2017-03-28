angular.module('starter.controllers', [])

.controller('TodoCtrl', function($scope, Schedule, $ionicActionSheet) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.today = Schedule.getToday();
  $scope.tomorrow = Schedule.getTomorrow();

  $scope.getColor = function (item) {
    if (item.completed == true) return "gray";
    if (item.event == true) return "hotpink";
    return "blue";
  }

  $scope.getColor2 = function (item) {
    if (item.completed == true) return "item-stable";
    if (item.event == true) return "item-calm";
    return "item-positive";
  }

  $scope.completeTask = function(item) {
    item.completed = true;
    event.preventDefault();
  }

  $scope.completedText = function(item) {
    if (item.completed) {
      return " (Completed)";
    } else {
      return "-";
    }
  }

  $scope.timeText = function(item) {
    if (item.time != "") {
      return " @" + item.time;
    } else {
      return "-";
    }
  }

  $scope.showMenu = function() {
    event.preventDefault();
    var menu = $ionicActionSheet.show({
      buttons: [
        {text: 'Complete Task'},
        {text: 'Start Task'},
        {text: 'Edit'},
        {text: 'Copy'}
      ],
      destructiveText: 'Delete',
      titleText: 'Menu',
      cancelText: 'Cancel',
      cancel: function () {

      },
      buttonClicked: function(index) {
        return true;
      }
    });
  };
})

.controller('CalendarCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('TodoDetailCtrl', function($scope, $stateParams, Schedule) {
  $scope.item = Schedule.get($stateParams.itemId);
})

.controller('CalendarDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MetricsCtrl', function($scope) {

})

.controller('ContactsCtrl', function($scope) {

})

.controller('SettingsCtrl', function($scope) {

});
