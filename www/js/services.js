angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Schedule', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var days = {};

  var today = {
    date: '3/19/2017',
    items: [
      {
        id: 1,
        name: "CS 354 HW 4",
        description: "HW4 for CS 354",
        time: '11:30 am',
        completed: false,
        event: false
      },
      {
        id: 2,
        name: "Walk Dog",
        description: "Take dog to dog park",
        completed: true,
        event: false
      },
      {
        id: 3,
        name: "Group Meeting",
        description: "Meet with CS 407 group",
        time: '3:00 pm',
        completed: false,
        event: true
      }
    ]
  };

  var tomorrow = {
    date: "3/20/2017",
    items: [
      {
        id: 4,
        name: "CS 367 HW 3",
        description: "HW3 for CS 367",
        time: '11:00 pm',
        completed: true,
        event: false
      },
      {
        id: 5,
        name: "Walk Dog",
        description: "Take dog to dog park",
        completed: false,
        event: false
      },
      {
        id: 6,
        name: "Group Meeting",
        description: "Meet with CS 506 group",
        time: '5:00 pm',
        completed: false,
        event: true
      }
    ]
  };

  days["3/19/2017"] = today;
  days["3/20/2017"] = tomorrow;

  return {
    getToday: function() {
      return days["3/19/2017"];
    },
    getTomorrow: function() {
      return days["3/20/2017"];
    },
    get: function(itemId) {
      for (var i = 0; i < today.items.length; i++) {
        if (today.items[i].id === parseInt(itemId)) {
          return today.items[i];
        }
      }
      for (var i = 0; i < tomorrow.items.length; i++) {
        if (tomorrow.items[i].id === parseInt(itemId)) {
          return tomorrow.items[i];
        }
      }
      return null;
    }
  };
});

