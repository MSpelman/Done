angular.module('starter.controllers', [])

.controller('TodoCtrl', function($scope, Schedule, $ionicActionSheet, $state) {
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

  $scope.addItem = function() {
    $state.go('item-entry');
  }

  $scope.showMenu = function(item) {
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
        switch (index) {
          case 0:
            $scope.completeTask(item);
            break
          default:
            return true;
        }
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
  $scope.date = new Date();

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.nextDate = function () {
    var dateTime = $scope.date.getTime();
    dateTime = dateTime + 86400000;
    $scope.date.setTime(dateTime);
  }

  $scope.prevDate = function () {
    var dateTime = $scope.date.getTime();
    dateTime = dateTime - 86400000;
    $scope.date.setTime(dateTime);
  }
})

.controller('TodoDetailCtrl', function($scope, $stateParams, Schedule) {
  $scope.item = Schedule.get($stateParams.itemId);

  $scope.completedText = function() {
    if ($scope.item.completed) {
      return " (Completed)";
    } else {
      return "";
    }
  }

  $scope.timeText = function() {
    if ($scope.item.time != "") {
      return " @" + item.time;
    } else {
      return "-";
    }
  }
})

.controller('CalendarDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MetricsCtrl', function($scope) {

})

.controller('ContactsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: null
  }
})

.controller('ItemEntryCtrl', function($scope, $state) {
  $scope.name = "";
  $scope.date = "";
  $scope.time = "";
  $scope.description = "";

  $scope.now = new Date();

  $scope.saveItem = function() {
    $state.go('tab.todo');
  }

  $scope.cancel = function() {
    $state.go('tab.todo');
  }

  $scope.dateTest = function() {

  }
});
