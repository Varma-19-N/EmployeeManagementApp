/**
 * Controller for the Greeting Feature.
 * Manages personalized greetings and interactive greeting elements.
 */
angular.module('form2Module')
  .controller('form2DisplayController', function ($scope, $interval, greetingService, greetingModel) {

    // Initialize the greeting model
    $scope.greetingData = angular.copy(greetingModel);
    
    // Current greeting display
    $scope.currentGreeting = '';
    $scope.currentQuote = '';
    $scope.currentFunFact = '';
    $scope.currentDateTime = '';
    
    // UI state
    $scope.showQuote = false;
    $scope.showFunFact = false;
    $scope.includeTimeGreeting = true;
    
    // Available greeting types
    $scope.greetingTypes = greetingService.getGreetingTypes();

    /**
     * Generates and displays a new greeting
     */
    $scope.generateGreeting = function() {
      $scope.currentGreeting = greetingService.generateGreeting(
        $scope.greetingData.userName,
        $scope.greetingData.selectedGreetingType,
        $scope.includeTimeGreeting
      );
      
      $scope.greetingData.showPersonalizedGreeting = true;
      
      // Add to history
      $scope.addToHistory($scope.currentGreeting);
    };

    /**
     * Gets a new motivational quote
     */
    $scope.getNewQuote = function() {
      $scope.currentQuote = greetingService.getMotivationalQuote();
      $scope.showQuote = true;
    };

    /**
     * Gets a new fun fact
     */
    $scope.getNewFunFact = function() {
      $scope.currentFunFact = greetingService.getFunFact();
      $scope.showFunFact = true;
    };

    /**
     * Updates the current date and time
     */
    $scope.updateDateTime = function() {
      $scope.currentDateTime = greetingService.getCurrentDateTime();
    };

    /**
     * Adds greeting to history
     */
    $scope.addToHistory = function(greeting) {
      const historyEntry = {
        greeting: greeting,
        timestamp: new Date(),
        greetingType: $scope.greetingData.selectedGreetingType,
        userName: $scope.greetingData.userName
      };

      $scope.greetingData.greetingHistory.unshift(historyEntry);
      
      // Keep only last 5 entries
      if ($scope.greetingData.greetingHistory.length > 5) {
        $scope.greetingData.greetingHistory = $scope.greetingData.greetingHistory.slice(0, 5);
      }
    };

    /**
     * Clears all data and resets
     */
    $scope.clearAll = function() {
      $scope.greetingData = angular.copy(greetingModel);
      $scope.currentGreeting = '';
      $scope.currentQuote = '';
      $scope.currentFunFact = '';
      $scope.showQuote = false;
      $scope.showFunFact = false;
    };

    /**
     * Formats timestamp for display
     */
    $scope.formatTime = function(timestamp) {
      return timestamp ? timestamp.toLocaleTimeString() : '';
    };

    /**
     * Gets greeting type display name
     */
    $scope.getGreetingTypeDisplayName = function(type) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    };

    /**
     * Loads a sample greeting
     */
    $scope.loadSample = function() {
      $scope.greetingData.userName = 'Alex';
      $scope.greetingData.selectedGreetingType = 'friendly';
      $scope.generateGreeting();
      $scope.getNewQuote();
    };

    // Initialize with current date/time
    $scope.updateDateTime();
    
    // Update date/time every minute
    const timeInterval = $interval($scope.updateDateTime, 60000);
    
    // Generate initial greeting
    $scope.currentGreeting = greetingService.getGenericGreeting();

    // Cleanup interval on scope destroy
    $scope.$on('$destroy', function() {
      if (timeInterval) {
        $interval.cancel(timeInterval);
      }
    });

    // Watch for name changes to auto-generate greeting
    $scope.$watch('greetingData.userName', function(newValue, oldValue) {
      if (newValue && newValue !== oldValue && newValue.trim() !== '') {
        $scope.generateGreeting();
      }
    });
  });