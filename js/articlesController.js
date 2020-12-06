myApp.controller('ArticlesController', ['$scope', '$http', function ($scope, $http) {
    $scope.articles = {};
    $http.get('http://localhost:5000/cnn').then(function(response){
        console.log(response.data);
        $scope.articles.cnn = response.data;
    });
    $http.get('http://localhost:5000/twitter').then(function(response){
        console.log(response.data);
        $scope.articles.twitter = response.data;
    });
    $http.get('http://localhost:5000/other').then(function(response){
        console.log(response.data);
        $scope.articles.other = response.data;
    });
}]);