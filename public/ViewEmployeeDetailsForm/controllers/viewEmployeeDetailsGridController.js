// This controller initializes AG Grid inside an AngularJS application
// with mock employee data, used when backend API is not available.

angular
  .module("viewEmployeeDetailsFormModule")
  .controller("ViewEmployeeDetailsGridController", function ($scope, $timeout) {

    console.log("ViewEmployeeDetailsGridController loaded");

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
      },
      {
        personalDetails: {
          firstName: "Rajesh",
          lastName: "Kumar",
          email: "rajesh.kumar@example.com",
          dob: "1990-12-25",
          gender: "Male"
        },
        address: {
          street: "789 Oak Street",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          postalCode: "400001"
        }
      },
      {
        personalDetails: {
          firstName: "Priya",
          lastName: "Sharma",
          email: "priya.sharma@example.com",
          dob: "1992-06-15",
          gender: "Female"
        },
        address: {
          street: "321 Pine Road",
          city: "Delhi",
          state: "Delhi",
          country: "India",
          postalCode: "110001"
        }
      }
    ];

    // Initialize AG Grid after DOM is ready
    $timeout(function() {
      console.log("Initializing AG Grid...");
      
      const gridDiv = document.querySelector('#employeeGrid');
      console.log("Grid div found:", !!gridDiv);
      console.log("AG Grid available:", !!window.agGrid);
      
      if (gridDiv && window.agGrid) {
        // AG Grid configuration
        const gridOptions = {
          columnDefs: [
            { headerName: "First Name", field: "personalDetails.firstName", sortable: true, filter: true, width: 120 },
            { headerName: "Last Name", field: "personalDetails.lastName", sortable: true, filter: true, width: 120 },
            { headerName: "Email", field: "personalDetails.email", sortable: true, filter: true, width: 200 },
            { headerName: "Date of Birth", field: "personalDetails.dob", sortable: true, filter: true, width: 130 },
            { headerName: "Gender", field: "personalDetails.gender", sortable: true, filter: true, width: 100 },
            { headerName: "Street", field: "address.street", sortable: true, filter: true, width: 150 },
            { headerName: "City", field: "address.city", sortable: true, filter: true, width: 120 },
            { headerName: "State", field: "address.state", sortable: true, filter: true, width: 120 },
            { headerName: "Country", field: "address.country", sortable: true, filter: true, width: 100 },
            { headerName: "Postal Code", field: "address.postalCode", sortable: true, filter: true, width: 120 }
          ],
          defaultColDef: {
            resizable: true,
            sortable: true,
            filter: true
          },
          rowData: mockEmployeeList,
          pagination: true,
          paginationPageSize: 10,
          domLayout: 'normal'
        };

        try {
          new agGrid.Grid(gridDiv, gridOptions);
          console.log("AG Grid initialized successfully");
        } catch (error) {
          console.error("Error initializing AG Grid:", error);
          $scope.errorMessageFromServer = "Failed to initialize grid: " + error.message;
          $scope.$apply();
        }
      } else {
        console.error("Grid initialization failed - missing elements");
        $scope.errorMessageFromServer = "AG Grid failed to initialize. Please refresh the page.";
        $scope.$apply();
      }
    }, 500);
  });