angular.module('starter.controllers', [])

.controller('LogCtrl', function($scope, LogsService) {
  $scope.logData = LogsService.fetch();

  LogsService.onAdd(function(items) {
    $scope.logData = items;
  });
})

.controller('InsertCtrl', function($scope, LogsService, $ionicPopup) {

  $scope.dialogs = {
    poop: {
      comments: ''
    },
    formula: {
      amount: 0
    }
  }

  this.addPoop = function() {
    $ionicPopup.show({
      template: '<input type="text" ng-model="dialogs.poop.comments">',
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
    }).then(function(res) {
      LogsService.add({
        type: 'poop',
        comments: res
      });
    });
  };

  this.addPee = function() {
    LogsService.add({
      type: 'pee'
    });
  };

  this.addBreastFeeding = function() {
    LogsService.add({
      type: 'breastFeeding'
    });
  };

  this.addFormula = function() {
    $ionicPopup.show({
      template: '<input type="number" step="10" ng-model="dialogs.formula.amount">',
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
    }).then(function(res) {
      LogsService.add({
        type: 'formula',
        amount: res
      });
    });
  };

});
