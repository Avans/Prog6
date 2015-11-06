module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope, $location, $anchorScroll) {
    

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $mdSidenav('left').close();
    });
    
    $scope.toggleLeft = function(){
         $mdSidenav('left').toggle();
    }
    
    $scope.closeLeft = function(){
          $mdSidenav('left').close();
    }
   
    $scope.scrollTo = function(id) {
        debugger;
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
   }
};