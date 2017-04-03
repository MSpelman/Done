// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, Calendar, Day, Item) {

  function loadData() {
    // Create schedule
    var schedule = new Calendar();

    // Create Day for today
    var todayDate = new Date();
    todayDate.setHours(0,0,0,0);
    var today = new Day(todayDate);
    var item;
    var time;
    // Items for today
    time = new Date();
    time.setHours(11, 30, 0, 0);
    item = new Item(1, "CS 354 HW 4", "HW4 for CS 354", time, false, null);
    today.addItem(item);
    time = new Date();
    time = time.setHours(12, 0, 0, 0);
    item = new Item(2, "Walk Dog", "Take dog to dog park", time, true, null);
    today.addItem(item);
    time = new Date();
    time.setHours(15, 0, 0, 0);
    item = new Item(3, "Group Meeting", "Meet with CS 407 group", time, false, 60);
    today.addItem(item);

    // Create Day for tomorrow
    var tomorrowDate = new Date();
    tomorrowDate.setHours(0,0,0,0);
    var tomorrow = new Day(tomorrowDate);
    // Items for tomorrow
    time = new Date();
    time.setHours(23, 0, 0, 0);
    item = new Item(4, "CS 367 HW 3", "HW3 for CS 367", time, false, null);
    tomorrow.addItem(item);
    time = new Date();
    time = time.setHours(12, 0, 0, 0);
    item = new Item(5, "Walk Dog", "Take dog to dog park", time, true, null);
    tomorrow.addItem(item);
    time = new Date();
    time.setHours(17, 0, 0, 0);
    item = new Item(6, "Group Meeting", "Meet with CS 506 group", time, false, 120);
    tomorrow.addItem(item);

    // Add days to schedule
    schedule.addDay(today);
    schedule.addDay(tomorrow);

    return schedule;
  }

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //$rootScope.schedule = loadData();
    $rootScope.timeZone = new Date().getTimezoneOffset();

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.todo', {
    url: '/todo',
    views: {
      'tab-todo': {
        templateUrl: 'templates/tab-todo.html',
        controller: 'TodoCtrl'
      }
    }
  })

  .state('tab.calendar', {
    url: '/calendar',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/tab-calendar.html',
        controller: 'CalendarCtrl'
      }
    }
  })

  .state('tab.todo-detail', {
    url: '/todo/:itemId',
    views: {
      'tab-todo': {
        templateUrl: 'templates/todo-detail.html',
        controller: 'TodoDetailCtrl'
      }
    },
    params: {
      'itemId': null
    }
  })

  .state('tab.calendar-detail', {
    url: '/calendar/:chatId',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/calendar-detail.html',
        controller: 'CalendarDetailCtrl'
      }
    }
  })

  .state('tab.metrics', {
    url: '/metrics',
    views: {
      'tab-metrics': {
        templateUrl: 'templates/tab-metrics.html',
        controller: 'MetricsCtrl'
      }
    }
  })

  .state('tab.contacts', {
    url: '/contacts',
    views: {
      'tab-contacts': {
        templateUrl: 'templates/tab-contacts.html',
        controller: 'ContactsCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('item-entry', {
    url: '/item-entry',
    templateUrl: 'templates/item-entry.html',
    controller: 'ItemEntryCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/todo');

});
