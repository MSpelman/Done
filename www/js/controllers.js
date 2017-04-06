angular.module('starter.controllers', [])

.controller('TodoCtrl', function($scope, Schedule, $ionicActionSheet, $state, $rootScope, Calendar, Item, Day) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $rootScope.itemIndex = {};
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
            break;
          case 2:
            $state.go('item-entry', {
              'itemId': item.id});
            break;
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

.controller('ItemEntryCtrl', function($scope, $state, $stateParams, $rootScope, Item) {

  if ($stateParams.itemId == null) {
    $scope.name = "";
    $scope.date = "";
    $scope.time = "";
    $scope.duration = "";
    $scope.description = "";
    $scope.new = true;
  } else {
    var item = $rootScope.itemIndex[$stateParams.itemId];
    $scope.name = item.name;
    $scope.description = item.description;
    $scope.duration = item.duration;
    var dateTime = item.time;  // item.time stores date and time together
    var date = new Date();
    date.setTime(dateTime);
    date.setHours(0, 0, 0, 0);
    $scope.date = date;
    var time = new Date();
    time.setTime(dateTime);
    time.setFullYear(1970, 0, 1);
    $scope.time = time;
    $scope.new = false;
  }

  $scope.saveItem = function() {
    if ($scope.new) {
      var dateTime = new Date();
      dateTime.setTime($scope.time);
      var date = new Date();
      date.setTime($scope.date);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      dateTime.setFullYear(year, month, day);
      var id = $scope.getId();
      if ($scope.duration < 1) $scope.duration = null;

      item = new Item(id, $scope.name, $scope.description, dateTime, false, $scope.duration);

      $rootScope.schedule.getDay(date).addItem(item);
      $rootScope.itemIndex[item.id] = item;
    } else {

    }

    $scope.name = "";
    $scope.date = "";
    $scope.time = "";
    $scope.duration = "";
    $scope.description = "";

    $state.go('tab.todo');
  };

  $scope.cancel = function() {
    $scope.name = "";
    $scope.date = "";
    $scope.time = "";
    $scope.description = "";
    $scope.duration = "";

    $state.go('tab.todo');
  };

  // This needs to be replaced with code that gets new id assigned by Firebase
  $scope.getId = function() {
    var availableId = 1;

    while ($rootScope.itemIndex[availableId] != null) {
      availableId++;
    }

    return availableId;
  }
});
