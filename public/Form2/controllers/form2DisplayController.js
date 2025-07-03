/**
 * Controller for the Text Analytics Dashboard.
 * Manages real-time text analysis and display of analytics results.
 */
angular.module('form2Module')
  .controller('form2DisplayController', function ($scope, $timeout, textAnalyticsService, textAnalyticsModel) {

    // Initialize the text analytics model
    $scope.textData = angular.copy(textAnalyticsModel);
    
    // UI state management
    $scope.isAnalyzing = false;
    $scope.showDetailedView = false;
    $scope.analyticsHistory = [];

    // Debounce timer for real-time analysis
    let analysisTimer;

    /**
     * Performs text analysis with debouncing for performance
     */
    $scope.analyzeText = function() {
      if (analysisTimer) {
        $timeout.cancel(analysisTimer);
      }

      $scope.isAnalyzing = true;

      analysisTimer = $timeout(function() {
        $scope.textData.analytics = textAnalyticsService.analyzeText($scope.textData.inputText);
        $scope.textData.lastAnalyzedAt = new Date();
        $scope.isAnalyzing = false;
        
        // Add to history if text is substantial
        if ($scope.textData.analytics.wordCount > 10) {
          $scope.addToHistory();
        }
      }, 500); // 500ms debounce
    };

    /**
     * Adds current analysis to history
     */
    $scope.addToHistory = function() {
      const historyEntry = {
        timestamp: new Date(),
        wordCount: $scope.textData.analytics.wordCount,
        sentiment: $scope.textData.analytics.sentiment.label,
        complexity: $scope.textData.analytics.complexity.level,
        preview: $scope.textData.inputText.substring(0, 50) + '...'
      };

      $scope.analyticsHistory.unshift(historyEntry);
      
      // Keep only last 5 entries
      if ($scope.analyticsHistory.length > 5) {
        $scope.analyticsHistory = $scope.analyticsHistory.slice(0, 5);
      }
    };

    /**
     * Clears all data and resets the form
     */
    $scope.clearAll = function() {
      $scope.textData = angular.copy(textAnalyticsModel);
      $scope.analyticsHistory = [];
      $scope.showDetailedView = false;
      
      if (analysisTimer) {
        $timeout.cancel(analysisTimer);
      }
    };

    /**
     * Toggles between simple and detailed analytics view
     */
    $scope.toggleDetailedView = function() {
      $scope.showDetailedView = !$scope.showDetailedView;
    };

    /**
     * Gets the appropriate CSS class for sentiment display
     */
    $scope.getSentimentClass = function(sentiment) {
      switch(sentiment.label.toLowerCase()) {
        case 'positive': return 'text-success';
        case 'negative': return 'text-danger';
        default: return 'text-secondary';
      }
    };

    /**
     * Gets the appropriate CSS class for complexity display
     */
    $scope.getComplexityClass = function(complexity) {
      switch(complexity.level.toLowerCase()) {
        case 'simple': return 'text-success';
        case 'moderate': return 'text-warning';
        case 'complex': return 'text-danger';
        default: return 'text-secondary';
      }
    };

    /**
     * Formats the timestamp for display
     */
    $scope.formatTime = function(timestamp) {
      return timestamp ? timestamp.toLocaleTimeString() : '';
    };

    /**
     * Sample text for demonstration
     */
    $scope.loadSampleText = function() {
      $scope.textData.inputText = "Welcome to our innovative text analytics dashboard! This amazing tool provides comprehensive analysis of your text content. It calculates various metrics including word count, reading time, sentiment analysis, and complexity assessment. The real-time analysis feature makes it incredibly user-friendly and efficient. You can use this tool to improve your writing, analyze customer feedback, or simply explore the characteristics of any text content. The dashboard presents beautiful visualizations and detailed insights that help you understand your text better.";
      $scope.analyzeText();
    };

    // Watch for text changes to trigger analysis
    $scope.$watch('textData.inputText', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.analyzeText();
      }
    });
  });