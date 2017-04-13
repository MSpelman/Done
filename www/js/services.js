angular.module('starter.services', [])

/* Note: there is no factory for User, as we will be using the currentUser object provided
 * by Firebase.
 */

// Test data: do not use in new code
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

// Test Data: Do not use in new code
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
})

/* A Calendar holds all the Days and Item in the user's schedule
 *
 * Note: Only the basic data fields and methods have been added; more will need to
 * be added as we add more functionality.  Please see the project proposal (and possibly the
 * old AndDone project) for the complete list of members.
 */
.factory('Calendar', function(Day) {
  return function() {
    this.days = {};
    //this.itemIndex = {};

    this.addDay = function(newDay) {
      var date = newDay.getDate();
      var dateKey = date.getTime();
      this.days[dateKey] = newDay;
    };

    // getDay() creates a new Day record and adds it to the schedule
    // if there is not already a Day record for that date
    this.getDay = function(date) {
      var day = this.days[date.getTime()];
      if (day != null) {
        return day;
      } else {
        day = new Day(date);
        this.addDay(day);
        return day;
      }
    };

    this.getToday = function() {
      var todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      return this.getDay(todayDate);
    };

    this.getTomorrow = function() {
      var todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      var todayTime = todayDate.getTime();
      var tomorrowTime = todayTime + 86400000;
      var tomorrowDate = new Date();
      tomorrowDate.setTime(tomorrowTime);
      return this.getDay(tomorrowDate);
    };

    /*this.get = function(itemId) {
      var today = getToday();
      var tomorrow = getTomorrow();

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
    }; */
  };
})

/* A Day corresponds to a date in the user's schedule
 *
 * Note: Only the basic data fields and methods have been added; more will need to
 * be added as we add more functionality.  Please see the project proposal (and possibly the
 * old AndDone project) for the complete list of members.
 */
.factory('Day', function() {
  return function(date) {
    this.date = date;
    this.items = [];

    this.getDate = function() {
      return this.date;
    };

    this.addItem = function(newItem) {
      this.items.push(newItem);
      // Sort array of items in time order
      this.items.sort(function(a, b) {
        return (a.getTime() - b.getTime());
      });
    };

    this.removeItem = function(item) {
      var newItems = [];
      for (var i = 0; i < this.items.length; i++) {
        if (item.id != this.items[i].id){
          newItems.push(this.items[i]);
        }
      }
      this.items = newItems;
    };

    this.getItems = function() {
      return this.items;
    }
  };
})

/* An Item is a schedule item, which can be either an Event (i.e. appointment) or a Task
 * (i.e. something that needs to be done, usually with a due date)
 *
 * Note: Only the basic data fields and methods have been added; more will need to
 * be added as we add more functionality.  Please see the project proposal (and possibly the
 * old AndDone project) for the complete list of members.
 */
.factory('Item', function() {
  return function(id, name, description, time, timeless, duration) {
    this.id = id;
    this.name = name;
    this.description = description;
    // this.date = date;
    this.time = time;  // this should also include the date
    this.timeless = timeless;
    this.completed = false;
    this.duration = duration;
    //this.beforeTasks = [];
    //this.duringTasks = [];

    this.completeTask = function() {
      this.completed = true;
    };

    this.isCompleted = function() {
      return this.completed;
    };

    this.displayTime = function() {
      if (this.timeless) return "-";
      var time = new Date();
      time.setTime(this.time);
      return time.toLocaleTimeString();
    };

    this.isEvent = function() {
      if (this.duration != null) return true;
      return false;
    };

    // The time field stores the date and time together
    // this splits out the date portion and returns it
    this.getDate = function() {
      var dateTime = this.time;  // item.time stores date and time together
      var date = new Date();
      date.setTime(dateTime);
      date.setHours(0, 0, 0, 0);
      return date;
    };

    // The time field stores the date and time together
    // this splits out the time portion and returns it
    this.getTime = function() {
      var dateTime = this.time;  // item.time stores date and time together
      var time = new Date();
      time.setTime(dateTime);
      time.setFullYear(1970, 0, 1);
      return time;
    };

    /* this.addBeforeTask = function(newTask) {
      this.beforeTasks.push(newTask);
    };

    this.addDuringTask = function(newTask) {
      this.duringTasks.push(newTask);
    };

    this.getBeforeTasks = function() {
      return this.beforeTasks;
    };

    this.getDuringTasks = function() {
      return this.duringTasks;
    }; */
  };
});
