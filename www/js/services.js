angular.module('starter.services', [])

.factory('moment', function($window) {
  return $window.moment;
})

.service('HelpersService', function(moment) {

  this.getLogFileName = function getLogFileName(offset) {
    return 'log-data-' + moment().add(offset, 'd').format('DD.MM.YY');
  }

})

.service('LogsService', function($window, HelpersService) {
  // What would happen when user added an item to the log
  this.onAddCB = null;

  this.fetch = function(offset) {

    return [-1, 0, +1].map(function(x) {
      return HelpersService.getLogFileName(offset + x);
    }).map(function(key) {
      return JSON.parse($window.localStorage.getItem(key) || '[]');
    }).map(function(data) {
      return data.length ? data : null;
    }).reduce(function(res, data, idx) {
      var key = ({ 0: 'yesterday', 1: 'today', 2: 'tomorrow' })[idx];
      res[key] = data;
      return res;
    }, {});

  };

  this.save = function(items, offset) {
    var key = HelpersService.getLogFileName(offset);
    $window.localStorage.setItem(key, JSON.stringify(items));
  };

  this.add = function(item, offset) {
    item.time = new Date().getTime();
    var items = this.fetch(offset);
    if (!items.today) {
      items.today = [];
    }
    items.today.unshift(item);
    this.save(items.today, 0);
    if (this.onAddCB) {
      this.onAddCB(items);
    }
  };

  this.onAdd = function(cb) {
    this.onAddCB = cb;
  }
});
