// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, Calendar, Day, Item, $ionicHistory) {
  $ionicHistory.clearCache();
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

  .state('tab.week-metrics', {
    url: '/week-metrics',
    views: {
      'tab-metrics': {
        templateUrl: 'templates/tab-week-metrics.html',
        controller: 'WeekMetricsCtrl'
      }
    }
  })

  .state('tab.month-metrics', {
    url: '/month-metrics',
    views: {
      'tab-metrics': {
        templateUrl: 'templates/tab-month-metrics.html',
        controller: 'MonthMetricsCtrl'
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
    },
    params: {'refresh': -1},
  })

  .state('tab.userSettings', {
    url: '/userSettings',
    views: {
      'tab-userSettings': {
        templateUrl: 'templates/tab-userSettings.html',
        controller: 'UserSettingsCtrl'
      }
    }
  })

  .state('login',{
    url:'/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
    .state('start-task',{
    url:'/startTask',
      templateUrl:'templates/startTask.html',
      controller:'startCtrl',
      params: {
        'countdown': 0,
        'countdownsec' :0,
        'itemID' :null,
      }
  })

  .state('item-entry', {
    url: '/item-entry',
    templateUrl: 'templates/item-entry.html',
    controller: 'ItemEntryCtrl',
    params: {
      'itemId': null,
      'copy': null
    }
  })

  .state('photo', {
    url: '/photo',
    templateUrl: 'templates/photo.html',
    controller: 'PhotoCtrl',
    params: {
      'itemId': null
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
