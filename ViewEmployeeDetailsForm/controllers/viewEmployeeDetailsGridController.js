
// This controller initializes AG Grid inside an AngularJS application
// with mock employee data, used when backend API is not available.

angular
  .module("viewEmployeeDetailsFormModule")
  .controller("ViewEmployeeDetailsGridController", function ($scope) {

    // Optional error message placeholder
    $scope.errorMessageFromServer = "";

    // Mock employee data (for testing)
    const mockEmployeeList = [
      {
        personalDetails: {
          firstName: "Varma",
          lastName: "N",
          email: "varma.n@example.com",
          dob: "1998-02-14",
          gender: "Male"
        },
        address: {
          street: "123 Main St",
          city: "Hyderabad",
          state: "Telangana",
          country: "India",
          postalCode: "500001"
        }
      },
      {
        personalDetails: {
          firstName: "Aarthi",
          lastName: "K",
          email: "aarthi.k@example.com",
          dob: "1995-08-10",
          gender: "Female"
        },
        address: {
          street: "456 Park Avenue",
          city: "Bangalore",
          state: "Karnataka",
          country: "India",
          postalCode: "560002"
        }
      }
    ];

    // AG Grid configuration
    $scope.gridConfigurationOptions = {
      columnDefs: [
        { headerName: "First Name", field: "personalDetails.firstName", sortable: true, filter: true },
        { headerName: "Last Name", field: "personalDetails.lastName", sortable: true, filter: true },
        { headerName: "Email", field: "personalDetails.email", sortable: true, filter: true },
        { headerName: "Date of Birth", field: "personalDetails.dob", sortable: true, filter: true },
        { headerName: "Gender", field: "personalDetails.gender", sortable: true, filter: true },
        { headerName: "Street", field: "address.street", sortable: true, filter: true },
        { headerName: "City", field: "address.city", sortable: true, filter: true },
        { headerName: "State", field: "address.state", sortable: true, filter: true },
        { headerName: "Country", field: "address.country", sortable: true, filter: true },
        { headerName: "Postal Code", field: "address.postalCode", sortable: true, filter: true }
      ],
      defaultColDef: {
        resizable: true,
        flex: 1
      },
      rowData: [], // We will populate this on grid ready
      pagination: true,
      paginationPageSize: 10
    };

    // AG Grid lifecycle hook
    $scope.onGridReady = function (params) {
      // Store API reference for future use
      $scope.gridConfigurationOptions.api = params.api;
      $scope.gridConfigurationOptions.api.setRowData(mockEmployeeList);
    };
  });
