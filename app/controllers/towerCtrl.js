module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope) {
    

	$scope.level = 0;
	
	$scope.toLevel = function(newLevel){
		$scope.level = newLevel;
	}
};