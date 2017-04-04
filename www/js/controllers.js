angular.module('starter.controllers', [])

.controller('TodoCtrl', function($scope, Schedule, $ionicActionSheet, $state, $rootScope, Calendar, Item, Day) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $rootScope.itemIndex = {}
  $rootScope.schedule = loadData();
  $rootScope.timeZone = new Date().getTimezoneOffset();

  $scope.today = $rootScope.schedule.getToday();
  $scope.tomorrow = $rootScope.schedule.getTomorrow();

  $scope.getColor = function (item) {
    if (item.completed == true) return "gray";
    if (item.duration > 0) return "hotpink";
    return "blue";
  };

  /* $scope.getColor2 = function (item) {
    if (item.completed == true) return "item-stable";
    if (item.event == true) return "item-calm";
    return "item-positive";
  }; */

  $scope.displayTime = function(item) {
    return item.displayTime();
  };

  $scope.completeTask = function(item) {
    item.completed = true;
    event.preventDefault();
  };

  $scope.addItem = function() {
    $state.go('item-entry');
  };

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

  function loadData() {
    // Create schedule
    var schedule = new Calendar();

    // Create Day for today
    var todayDate = new Date();
    todayDate.setHours(0,0,0,0);
    var today = new Day(todayDate);
    var item;
    var time;
    var intTime;
    // Items for today
    time = new Date();
    time.setHours(11, 30, 0, 0);
    //intTime = time.getTime();
    item = new Item(1, "CS 354 HW 4", "HW4 for CS 354", time, false, null);
    today.addItem(item);
    $rootScope.itemIndex[item.id] = item;
    time = new Date();
    time = time.setHours(12, 0, 0, 0);
    //intTime = time.getTime();
    item = new Item(2, "Walk Dog", "Take dog to dog park", time, true, null);
    today.addItem(item);
    $rootScope.itemIndex[item.id] = item;
    time = new Date();
    time.setHours(15, 0, 0, 0);
    //intTime = time.getTime();
    item = new Item(3, "Group Meeting", "Meet with CS 407 group", time, false, 60);
    today.addItem(item);
    $rootScope.itemIndex[item.id] = item;

    // Create Day for tomorrow
    var tomorrowDate = new Date();
    tomorrowDate.setHours(0,0,0,0);
    var tomorrowTime = tomorrowDate.getTime();
    tomorrowDate.setTime(tomorrowTime + 86400000);
    var tomorrow = new Day(tomorrowDate);
    // Items for tomorrow
    time = new Date();
    time.setTime(tomorrowDate.getTime());
    time.setHours(23, 0, 0, 0);
    //intTime = time.getTime();
    item = new Item(4, "CS 367 HW 3", "HW3 for CS 367", time, false, null);
    tomorrow.addItem(item);
    $rootScope.itemIndex[item.id] = item;
    time = new Date();
    time.setTime(tomorrowDate.getTime());
    time = time.setHours(12, 0, 0, 0);
    //intTime = time.getTime();
    item = new Item(5, "Walk Dog", "Take dog to dog park", time, true, null);
    tomorrow.addItem(item);
    $rootScope.itemIndex[item.id] = item;
    time = new Date();
    time.setTime(tomorrowDate.getTime());
    time.setHours(17, 0, 0, 0);
    //intTime = time.getTime();
    item = new Item(6, "Group Meeting", "Meet with CS 506 group", time, false, 120);
    tomorrow.addItem(item);
    $rootScope.itemIndex[item.id] = item;

    // Add days to schedule
    schedule.addDay(today);
    schedule.addDay(tomorrow);

    return schedule;
  }
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
  $scope.formattedDate = $scope.date.toDateString();
  $scope.events = [ ];

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.nextDate = function () {
    var dateTime = $scope.date.getTime();
    dateTime = dateTime + 86400000;
    $scope.date.setTime(dateTime);
    $scope.formattedDate = $scope.date.toDateString();
  };

  $scope.prevDate = function () {
    var dateTime = $scope.date.getTime();
    dateTime = dateTime - 86400000;
    $scope.date.setTime(dateTime);
    $scope.formattedDate = $scope.date.toDateString();
  }
})

.controller('TodoDetailCtrl', function($scope, $stateParams, $rootScope) {
  $scope.item = $rootScope.itemIndex[$stateParams.itemId];

  $scope.completedText = function() {
    if ($scope.item.completed) {
      return " (Completed)";
    } else {
      return "";
    }
  };

  $scope.displayTime = function() {
    return $scope.item.displayTime();
  };

  /*$scope.timeText = function() {
    if ($scope.item.time != "") {
      return " @" + item.time;
    } else {
      return "-";
    }
  } */
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

  var date1 = new Date();
  $scope.test1 = date1;
  var date2 = new Date();
  date2.setHours(0, 0, 0, 0);
  $scope.test2 = date2;
  var date3 = new Date();
  date3.setUTCHours(0, 0, 0, 0);
  $scope.test3 = date3;

  $scope.saveItem = function() {
    $state.go('tab.todo');
  };

  $scope.cancel = function() {
    $state.go('tab.todo');
  };

  $scope.dateTest = function() {


  }
});
