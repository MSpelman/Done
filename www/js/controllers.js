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

.controller('SettingsCtrl', function($scope,$state,$ionicLoading,$stateParams) {

  $scope.settings = {
    enableFriends: null
  }
  // if ($stateParams.refresh ==1 ) {
  //   location.reload();
  //   $stateParams.refresh = 0;
  // }
    if(firebase.auth().currentUser){
      $scope.todisplay="Logout: "+firebase.auth().currentUser.email;
    }
    else {
      $scope.todisplay="Login";
    }


    $scope.onClick = function () {
      if(firebase.auth().currentUser){
        firebase.auth().signOut().then(function () {
          console.log('Signed Out Firebase user');
          $ionicLoading.show({template: 'Logout successful!', noBackdrop: true, duration: 1000});
         location.reload();
        }).catch(function (error) {
          console.error('Sign Out Error', error);
          $ionicLoading.show({template: 'Logout Unsuccessful!', noBackdrop: true, duration: 1000});
        })         ;
      }
      else {
        $state.go('login');
      }


    }


})
  .controller('UserSettingsCtrl', function($scope,$state,$ionicLoading) {
    console.log("usersetting");

$scope.currentUser=firebase.auth().currentUser.email;
    $scope.logoutFirebaseUser = function () {
      firebase.auth().signOut().then(function () {
        console.log('Signed Out Firebase user');
        $ionicLoading.show({template: 'Logout successful!', noBackdrop: true, duration: 1000});
        $state.go('tabs.settings');
      }).catch(function (error) {
        console.error('Sign Out Error', error);
        $ionicLoading.show({template: 'Logout Unsuccessful!', noBackdrop: true, duration: 1000});
      })         ;
    }

  })

  .controller('LoginCtrl', function($scope,$state,$ionicLoading) {

    $scope.username = "";
    $scope.password = "";
    $scope.loginFirebaseUser = function () {
      return firebase.auth().signInWithEmailAndPassword($scope.username, $scope.password).then(function () {
        $ionicLoading.show({template: 'Login Successfully!', noBackdrop: true, duration: 1000});
        $state.go('tab.settings', {refresh: 1});
      })

        .catch(function (error) {

          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/wrong-password') {
            $ionicLoading.show({template: 'Wrong password! Try again!', noBackdrop: true, duration: 1000})

          }


        })
    }

    $scope.createFirebaseUser = function () {
      return firebase.auth().createUserWithEmailAndPassword($scope.username, $scope.password).then(function () {
        $ionicLoading.show({template: 'Created Firebase User!', noBackdrop: true, duration: 1000});
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          $ionicLoading.show({template: 'Email already in use! Try again!', noBackdrop: true, duration: 1000})
        }
        else if (errorCode == 'auth/weak-password') {
          $ionicLoading.show({template: 'Password is weak! Try again!', noBackdrop: true, duration: 1000})
        }
        ;
      });
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
