angular.module('starter.services', [])

.factory('moment', function($window) {
  return $window.moment;
})

.service('HelpersService', function(moment) {

  this.getLogFileName = function getLogFileName(offset) {
    return 'log-data-' + moment().add(offset, 'd').format('DD.MM.YY');
  }

})

.service('Storage', function($q, $window) {
  this.set = function(key, val) {
    $window.localStorage.setItem(key, JSON.stringify(val));
    return $q.when(val);
  };
  this.get = function(key) {
    return $q.when(JSON.parse($window.localStorage.getItem(key) || '[]'));
  };
})

.service('LogsService', function($q, Storage, HelpersService) {
  // What would happen when user added an item to the log
  this.onAddCB = null;

  this.isLogsDataAvailable = function(offset) {
    return Storage
      .get(HelpersService.getLogFileName(offset))
      .then(function(data) { return data.length > 0; });
  };

  this.fetch = function(offset) {
    return Storage.get(HelpersService.getLogFileName(offset))
  };

  this.save = function(items, offset) {
    return Storage.set(HelpersService.getLogFileName(offset), items);
  };

  this.add = function(item, offset) {
    return this.fetch(offset)
    .then(function(items) {
      item.time = new Date().getTime();
      items.unshift(item);
      return this.save(items, 0);
    }.bind(this))
    .then(function(items) {
      return !!this.onAddCB && this.onAddCB(items);
    }.bind(this));
  };

  this.onAdd = function(cb) {
    this.onAddCB = cb;
  }
});
