// This controller manages the Form 2 view.
// Responsibilities:
// 1. Captures input from a textbox
// 2. Displays a popup with the entered value in JSON format
// 3. Handles popup visibility toggling

angular.module('form2Module')
  .controller('form2DisplayController', function ($scope) {

    // Holds the value typed by the user into the textbox
    $scope.userTypedMessage = '';

    // Controls whether the popup is shown or hidden
    $scope.popupVisible = false;

    // Triggers the popup to show with current value
    $scope.displayPopupWithInputValue = function () {
      if ($scope.userTypedMessage && $scope.userTypedMessage.trim() !== '') {
        $scope.popupVisible = true;
      }
    };

    // Closes the popup manually
    $scope.closePopup = function () {
      $scope.popupVisible = false;
    };
  });