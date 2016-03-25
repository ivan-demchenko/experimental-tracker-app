angular.module('starter.services', [])

.service('HelpersService', function() {
  this.getLogFileName = function getLogFileName() {
    var date = new Date();
    return 'log-data' + date.getTime();
  }
})

.service('LogsService', function($window, HelpersService) {
  // What would happen when user added an item to the log
  this.onAddCB = null;

  this.fetch = function(date) {
    var data = $window.localStorage.getItem('logData') || '[]';
    return JSON.parse(data);
  };

  this.save = function(items) {
    $window.localStorage.setItem('logData', JSON.stringify(items));
  };

  this.add = function(item) {
    item.time = new Date().getTime();
    var items = this.fetch();
    items.unshift(item);
    this.save(items);
    if (this.onAddCB) {
      this.onAddCB(items);
    }
  };

  this.onAdd = function(cb) {
    this.onAddCB = cb;
  }
});
