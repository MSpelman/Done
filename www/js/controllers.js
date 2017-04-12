angular.module('starter.controllers', [])

.controller('TodoCtrl', function($scope, Schedule, $ionicActionSheet, $state, $rootScope, Calendar, Item, Day, $ionicPopup, $ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  if (firebase.auth().currentUser == null) {
    // Require user to login
    $ionicLoading.show({
      template: 'Please log in',
      noBackdrop: true,
      duration: 1000
    });
    $state.go('login');
  } else {
    // Logged in, get schedule for today and tomorrow
    $scope.today = $rootScope.schedule.getToday();
    $scope.tomorrow = $rootScope.schedule.getTomorrow();
  }

  // Color coordinates the items
  // gray means completed
  // blue means task
  // pink means event
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

  // Displays the time in human readable format
  $scope.displayTime = function(item) {
    return item.displayTime();
  };

  // Marks a task as completed
  $scope.completeTask = function(item) {
    item.completed = true;
    event.preventDefault();
  };

  // Launches item-entry so user can add an item to the schedule
  $scope.addItem = function() {
    $state.go('item-entry');
  };

  // Code that deletes an item from the schedule
  // showMenu calls it as part of the destructiveButtonClicked event
  $scope.deleteItem = function(item) {
    var dateTime = item.time;  // item.time stores date and time together
    var date = new Date();
    date.setTime(dateTime);
    date.setHours(0, 0, 0, 0);
    $rootScope.schedule.getDay(date).removeItem(item);
    delete $rootScope.itemIndex[item.id];
  };

  // Displays the slide over menu with options associated with schedule items
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
      },
      destructiveButtonClicked: function() {
        var deletePopup = $ionicPopup.confirm({
          title: 'Delete Schedule Item?',
          template: 'Are you sure you want to delete this entry?',
          okType: 'button-default',
          cancelType: 'button-calm'
        });

        deletePopup.then(function(res) {
          if (res) {
            $scope.deleteItem(item);
            var key = item.id;
            var itemRef = firebase.database().ref('schedules/' + $rootScope.user.uid + '/' + key);
            itemRef.remove();
            $state.go('tab.todo');
          }
        });

        return true;
      }
    });
  };

  /* No longer used
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
  } */
})

.controller('CalendarCtrl', function($scope, $rootScope, Chats, Schedule) {
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
  $scope.events = Schedule.getToday();



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

  // Used to add conditional text to the details screen if an item is completed
  $scope.completedText = function() {
    if ($scope.item.completed) {
      return " (Completed)";
    } else {
      return "";
    }
  };

  // Formats time in human readable form
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

.controller('SettingsCtrl', function($scope,$state,$ionicLoading,$stateParams) {
  $scope.settings = {
    enableFriends: null
  };
  // if ($stateParams.refresh ==1 ) {
  //   location.reload();
  //   $stateParams.refresh = 0;
  // }
  if(firebase.auth().currentUser){
    $scope.todisplay="Logout: "+firebase.auth().currentUser.email;
  } else {
    $state.go('login');
  }

  $scope.onClick = function () {
    if(firebase.auth().currentUser){
      firebase.auth().signOut().then(function () {
        console.log('Signed Out Firebase user');
        $ionicLoading.show({template: 'Logout successful!', noBackdrop: true, duration: 1000});
        location.reload();
        $state.go('login');
      }).catch(function (error) {
        console.error('Sign Out Error', error);
        $ionicLoading.show({template: 'Logout Unsuccessful!', noBackdrop: true, duration: 1000});
      })         ;
    } else {
      $state.go('login');
    }
  }
})



.controller('LoginCtrl', function($scope,$state,$ionicLoading, $rootScope, Calendar, Item) {
  $rootScope.itemIndex = {};
  $rootScope.timeZone = new Date().getTimezoneOffset();

  $scope.username = "";
  $scope.password = "";

  $scope.loginFirebaseUser = function () {
    return firebase.auth().signInWithEmailAndPassword($scope.username, $scope.password).then(function () {
      $rootScope.user = firebase.auth().currentUser;
      $rootScope.schedule = getSchedule();
      $ionicLoading.show({template: 'Login Successfully!', noBackdrop: true, duration: 1000});
      $state.go('tab.settings', {refresh: 1});
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/wrong-password') {
        $ionicLoading.show({template: 'Wrong password! Try again!', noBackdrop: true, duration: 1000})
      }
    })
  };

  $scope.createFirebaseUser = function () {
    return firebase.auth().createUserWithEmailAndPassword($scope.username, $scope.password).then(function () {
      $ionicLoading.show({template: 'Created Firebase User!', noBackdrop: true, duration: 1000});
      firebase.auth().signInWithEmailAndPassword($scope.username, $scope.password);

      $rootScope.user = firebase.auth().currentUser;
      $rootScope.schedule = new Calendar();
      firebase.database().ref('schedules/ + user.id').set($rootScope.schedule);
      $state.go('tab.settings', {refresh: 1});

    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/email-already-in-use') {
        $ionicLoading.show({template: 'Email already in use! Try again!', noBackdrop: true, duration: 1000})
      } else if (errorCode == 'auth/weak-password') {
        $ionicLoading.show({template: 'Password is weak! Try again!', noBackdrop: true, duration: 1000})
      }
    });
  };

  // Loads user's schedule from Firebase
  function getSchedule() {
    var schedule = new Calendar();
    firebase.database().ref('schedules/' + $rootScope.user.uid).once('value').then(function(snapshot) {
      snapshot.forEach(function(itemSnapshot) {
        //var itemKey = itemSnapshot.key;
        var itemData = itemSnapshot.val();
        var time = new Date();
        time.setTime(itemData.time);  // itemData.time is a long int, need to convert to Date object
        var item = new Item(itemData.id, itemData.name, itemData.description, time, itemData.timeless, itemData.duration);
        var date = item.getDate();
        var day = schedule.getDay(date);  // getDay will create day and adds to schedule if does not exist
        day.addItem(item);
        $rootScope.itemIndex[item.id] = item;
      });
    });
    return schedule;
  }
})

.controller('ItemEntryCtrl', function($scope, $state, $stateParams, $rootScope, Item) {

  if ($stateParams.itemId == null) {
    // Case where adding a new item
    $scope.name = "";
    $scope.date = "";
    $scope.time = "";
    $scope.duration = "";
    $scope.description = "";
    $scope.new = true;
    $scope.oldItem = null;
  } else {
    // Case where editing an existing item
    var item = $rootScope.itemIndex[$stateParams.itemId];
    $scope.name = item.name;
    $scope.description = item.description;
    $scope.duration = item.duration;
    // This block of code replaced by item.getDate()
    // var dateTime = item.time;  // item.time stores date and time together
    // var date = new Date();
    // date.setTime(dateTime);
    // date.setHours(0, 0, 0, 0);
    $scope.date = item.getDate();
    // This block of code replaced by item.getTime()
    // var time = new Date();
    // time.setTime(dateTime);
    // time.setFullYear(1970, 0, 1);
    $scope.time = item.getTime();
    $scope.new = false;
    $scope.oldItem = item;
  }

  // Code called when save button pressed
  $scope.saveItem = function() {
    var dateTime = new Date();
    dateTime.setTime($scope.time);
    var date = new Date();
    date.setTime($scope.date);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    dateTime.setFullYear(year, month, day);
    if ($scope.duration < 1) $scope.duration = null;

    var id;
    var item;
    if ($scope.new) {
      // Saving new item
      var newItemRef = firebase.database().ref('schedules/' + $rootScope.user.uid).push();
      id = newItemRef.key;
      item = new Item(id, $scope.name, $scope.description, dateTime, false, $scope.duration);
      newItemRef.set({
        id: item.id,
        name: item.name,
        description: item.description,
        time: item.time.getTime(),
        timeless: item.timeless,
        completed: item.completed,
        duration: item.duration
      });
    } else {
      // Updating existing item
      id = $scope.oldItem.id;
      var itemRef = firebase.database().ref('schedules/' + $rootScope.user.uid + '/' + id);
      var oldDateTime = $scope.oldItem.time;  // item.time stores date and time together
      var oldDate = new Date();
      oldDate.setTime(oldDateTime);
      oldDate.setHours(0, 0, 0, 0);
      item = new Item(id, $scope.name, $scope.description, dateTime, false, $scope.duration);
      $rootScope.schedule.getDay(oldDate).removeItem($scope.oldItem);
      delete $rootScope.itemIndex[item.id];
      itemRef.set({
        id: item.id,
        name: item.name,
        description: item.description,
        time: item.time.getTime(),
        timeless: item.timeless,
        completed: item.completed,
        duration: item.duration
      });
    }

    $rootScope.schedule.getDay(date).addItem(item);
    $rootScope.itemIndex[item.id] = item;

    // Clear out fields so old data does not display when return to form
    $scope.name = "";
    $scope.date = "";
    $scope.time = "";
    $scope.duration = "";
    $scope.description = "";

    $state.go('tab.todo');
  };

  // Called if cancel off of the item entry form
  $scope.cancel = function() {
    $scope.name = "";
    $scope.date = "";
    $scope.time = "";
    $scope.description = "";
    $scope.duration = "";

    $state.go('tab.todo');
  };

  /*
  // This needs to be replaced with code that gets new id assigned by Firebase
  $scope.getId = function() {
    var availableId = 1;

    while ($rootScope.itemIndex[availableId] != null) {
      availableId++;
    }

    return availableId;
  } */
});
