(function() {
//  debugger;
  var app = angular.module("githubViewer", []);

  var MainController = function($scope, $http, $interval,$log) {

    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url).then(onRepos,onError);
    };

  var onError = function(reason) {
      $scope.error = "Could not fetch the user";
    };


    var onRepos = function(response) {
      $scope.repos = response.data;
    };

    $scope.search = function(username) {
        $log.info("searching for " + username)
    $http.get("https://api.github.com/users/"+ username)
      .then(onUserComplete, onError);
    };
    
    
    var decrementCountdown = function () {
      $scope.countdown -=1;
      if ($scope.countdown<1 )
      {
         startCountdown();
         if ($scope.username == "angular")
         {
           $scope.username="afarnham";
         }
         else
         $scope.username="angular";
       
        $scope.search($scope.username);
        $scope.countdown = 5;
        
      } 
    };
    
    
    var startCountdown = function () {
      $interval(decrementCountdown,1000, $scope.countdown);
    };
    $scope.username="angular";
    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder ="-stargazers_count";
    $scope.countdown = 5;
    startCountdown();

  };
  
  app.controller("MainController",["$scope", "$http","$interval","$log" , MainController]);

}());
  
  
