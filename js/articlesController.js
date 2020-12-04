myApp.controller('ArticlesController', ['$scope', '$http', function ($scope, $http) {
    $http.get('http://localhost:5000/cnn').then(function(response){
        console.log(response);
        $scope.articles = response.data;
    });
}]);