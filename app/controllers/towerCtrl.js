module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope) {
    
	var ratio = 1.743;
	
	var canvasWidth = document.getElementById('canvas').offsetWidth;
	var canvasHeight = document.getElementById('canvas').offsetHeight;
	
	$scope.realHeight = (canvasWidth * ratio - canvasHeight);
	$scope.level = 0;

	$scope.toLevel = function(newLevel){
		$scope.level = $scope.realHeight / 100 * newLevel;
	}
	
	$scope.isNear = function(value){
		value =  $scope.realHeight / 100 * value;
		return $scope.level < (value + 20) && $scope.level > (value - 20);
	}
};