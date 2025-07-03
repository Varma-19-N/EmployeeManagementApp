/**
 * Model for greeting data structure.
 * Defines the default structure for greeting information.
 */
angular.module('form2Module')
  .constant('greetingModel', {
    userName: '',
    selectedGreetingType: 'friendly',
    customMessage: '',
    showPersonalizedGreeting: false,
    favoriteColor: '#667eea',
    greetingHistory: []
  });