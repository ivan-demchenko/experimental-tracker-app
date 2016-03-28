angular.module('starter.controllers', [])

.controller('LogCtrl', function($scope, LogsService, moment) {
  $scope.viewTitle = '-/-';
  $scope.offset = 0;
  $scope.logData = [];
  $scope.isPrevDayAvailable = false;
  $scope.isNextDayAvailable = false;

  this.showDay = function(offset) {
    if ((offset < 0 && !$scope.isPrevDayAvailable) || (offset > 0 && !$scope.isNextDayAvailable)) {
      return;
    }
    if (offset === 0) {
      $scope.offset = 0;
    } else {
      $scope.offset += offset;
    }
    LogsService.getDaysLogsData(offset).then(function(res) {
      $scope.viewTitle = 'Log: ' + moment().add($scope.offset, 'd').format('DD.MM.YY');
      $scope.logData = res.logs;
      $scope.isPrevDayAvailable = res.prevDayAvailable;
      $scope.isNextDayAvailable = res.nextDayAvailable;
    });
  };

  this.showDay($scope.offset);

  this.logTabSelected = function() {
    $scope.offset = 0;
    this.showDay($scope.offset);
  };

  LogsService.onAdd(function(items) {
    $scope.logData = items;
  });

})

.controller('InsertCtrl', function($scope, $state, LogsService, $ionicPopup) {

  $scope.dialogs = {
    poop: {
      comments: ''
    },
    formula: {
      amount: ''
    }
  }

  this.addPoop = function() {
    $ionicPopup.show({
      template: '<input type="text" autofocus ng-model="dialogs.poop.comments">',
      title: 'Any comments?',
      subTitle: 'Colour, consistency, etc.',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.dialogs.poop.comments;
          }
        }
      ]
    })
    .then(function(res) {
      return LogsService.add({ type: 'poop', comments: res }, 0);
    })
    .then(function() {
      $scope.dialogs.poop.comments = '';
      $state.go('tab.log');
    });
  };

  this.addPee = function() {
    LogsService.add({ type: 'pee' }, 0)
    .then(function() {
      $scope.dialogs.poop.comments = '';
      $state.go('tab.log');
    });
  };

  this.addBreastFeeding = function() {
    LogsService.add({ type: 'breastFeeding' }, 0)
    .then(function() {
      $scope.dialogs.poop.comments = '';
      $state.go('tab.log');
    });
  };

  this.addFormula = function() {
    $ionicPopup.show({
      template: '<input type="number" autofocus step="10" ng-model="dialogs.formula.amount">',
      title: 'Enter amount on formula',
      subTitle: 'In milliliters',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.dialogs.formula.amount) {
              //don't allow the user to close unless he enters amount
              e.preventDefault();
            } else {
              return $scope.dialogs.formula.amount;
            }
          }
        }
      ]
    })
    .then(function(res) {
      return LogsService.add({ type: 'formula', amount: res }, 0);
    })
    .then(function() {
      $scope.dialogs.formula.amount = '';
      $state.go('tab.log');
    });;
  };

});
