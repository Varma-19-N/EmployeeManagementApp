// This service handles fetching employee data from the backend server.
// It uses AngularJS $http to make GET requests and returns a promise with the result.

angular.module('viewEmployeeDetailsFormModule')
  .service('viewEmployeeDataFetchService', function($http) {

    /**
     * Fetches the employee records from the backend API.
     * @returns {Promise} A promise resolving with the list of employee data.
     */
    this.fetchAllEmployeeDetailsFromBackend = function() {
      // Replace the URL below with your actual backend API endpoint
      const backendApiUrl = 'https://your-api-url.com/api/employees';

      return $http.get(backendApiUrl)
        .then(function(response) {
          return response.data;  // Return just the employee data array
        })
        .catch(function(error) {
          console.error('Error while fetching employee data:', error);
          throw error;  // Re-throw to allow controller to handle
        });
    };
  });