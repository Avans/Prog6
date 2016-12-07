(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global FFB901 */

/**
 * Step 1 - Making our own module
 * Dependencies in this Demo
 *  PointyPony : The angular module from Advans. It contains elements that we can reuse.
 * Read the docs to learn more. http://advans.herokuapp.com/#/docs
 *  ui.router  : The angular modole to help navigate from page to page. 
 * learn more on http://angular-ui.github.io/ui-router/site/#/api/ui.router
 *  ngMaterial : An Angular based framework for rendering material styled elements
 * read more on  https://material.angularjs.org/latest/
 *  ngMdIcons : An Angular based framework for showing icons
*/
var app = angular.module('Prog6', ["PointyPony", "ngMdIcons", "ui.router",  "ngMaterial"]);


/**
 * Step 2 - Referencing our online course
 * You can find your course token on advans.herokuapp.com
 */
app.constant('appConfig', {
	//Replace this token with your token from the course
	courseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IlByb2c2Ig.7gUu3oCVPeePAGdoTi45o5tJHwta-6oPFY8ec6OYJ5U",
});

//Make your own elements, in our case a routing config and a app controller
var routesConfig = require('./config/routes');
var appCtrl = require("./controllers/appCtrl");
var towerCtrl = require('./controllers/towerCtrl');
var assignmentCtrl = require('./controllers/assignmentCtrl');
var sbLoad = require('./directives/sbLoad');

//Add the controller and config to the module
app.controller('appCtrl', appCtrl);
app.controller('towerCtrl', towerCtrl);
app.controller('assignmentCtrl', assignmentCtrl);
app.directive('sbLoad', sbLoad);
app.config(routesConfig);

var emailShort = require('./filters/emailshort');
app.filter('emailShort',  emailShort);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': '01A4EF',
    '100': '01A4EF',
    '200': '01A4EF',
    '300': '01A4EF',
    '400': '01A4EF',
    '500': '01A4EF',
    '600': '01A4EF',
    '700': '01A4EF',
    '800': '01A4EF',
    '900': '01A4EF',
    'A100': 'FFB901', //Yellow
    'A200': '259b24', //Green
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('default')
    .primaryPalette('amazingPaletteName')
});


  


},{"./config/routes":2,"./controllers/appCtrl":3,"./controllers/assignmentCtrl":4,"./controllers/towerCtrl":5,"./directives/sbLoad":6,"./filters/emailshort":7}],2:[function(require,module,exports){
module.exports = function ($stateProvider, $urlRouterProvider) {

    //Default route
    $urlRouterProvider.otherwise('home');

    //Methode voor toevoegen state, 
    //State is in camelCase
    function addState(state) {
        var url = state.replace(/([a-z])([A-Z])/g, '$1/$2').toLowerCase();
        $stateProvider.state(state, { url: '/' + url, templateUrl: 'onderwerp/' + url + '.html' });
    }

    //Register all the routes
    $stateProvider

        //Default pages
        .state('home', { url: '/home', templateUrl: 'default/home.html' })
        .state('leaderboards', { url: '/leaderboards', templateUrl: 'default/leaderboards.html' })
        .state('profile', { url: '/profile', templateUrl: 'default/profile.html' })

        .state('opdrachten1', { url: '/opdrachten/week1', templateUrl: 'opdrachten/week1.html' })
        .state('opdrachten2', { url: '/opdrachten/week2', templateUrl: 'opdrachten/week2.html' })
        .state('opdrachten3', { url: '/opdrachten/week3', templateUrl: 'opdrachten/week3.html' })
        .state('opdrachten4', { url: '/opdrachten/week4', templateUrl: 'opdrachten/week4.html' })
        .state('opdrachten5', { url: '/opdrachten/week5', templateUrl: 'opdrachten/week5.html' })
        .state('opdrachten6', { url: '/opdrachten/week6', templateUrl: 'opdrachten/week6.html' })
        .state('opdrachtenOverview', { url: '/opdrachten/overview', templateUrl: 'opdrachten/overview.html' })
        .state('uitwerkingen', { url: '/opdrachten/uitwerkingen', templateUrl: 'opdrachten/uitwerkingen.html' });

    //Content
    //Testing
    addState('testingIntroductie');
    addState('testingBasics');
    addState('testingAdvanced');
    //patterns
    addState('patternsIntroductie');
    addState('patternsDependency');
    addState('patternsRepository');
    addState('patternsIoc');
    //Wcf
    addState('wcfIntroductie');
    addState('wcfWCF');
    addState('wcfAzure');
    addState('wcfConsume');
    //Mvc
    addState('mvcIntroductie');
    addState('mvcControllers');
    addState('mvcView');
    addState('mvcForms');



};
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports = function($scope, $mdDialog, $mdToast, ppAssignmentService, ppReviewService){
            
            $scope.assignments = [];
            
            ppAssignmentService.getAssignments(function(){
                $scope.assignments = ppAssignmentService.assignments;
            })
}
},{}],5:[function(require,module,exports){
module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope) {
    
	var ratio = 1.743;
	
	var canvasWidth = document.getElementById('canvas').offsetWidth;
	var canvasHeight = document.getElementById('canvas').offsetHeight;
	
	$scope.ready = false;
	$scope.realHeight = (canvasWidth * ratio - canvasHeight);

	$scope.loadingComplete = function(){
		$('#loader').height(0);
		$scope.ready = true;
		$scope.toLevel(100);
	}
	

	$scope.toLevel = function(newLevel){
		$scope.level = $scope.realHeight / 100 * newLevel;
	}
	
	$scope.isNear = function(value){
		if(!$scope.ready)
			return false;
			
		value =  $scope.realHeight / 100 * value;
		return $scope.level < (value + 100) && $scope.level > (value - 100);
	};
	
	$scope.getSrcset = function(img){
		
		var root = "default/img/";
		return root + img + "_small.png 600w, " + root + img + "_medium.png 900w, " + root + img + "_large.png 1200w";
	}
};
},{}],6:[function(require,module,exports){
module.exports = ['$parse', function ($parse) {
    return {
      restrict: 'A',
      scope: {
        onsort: '='
      },
      link: function (scope, elem, attrs) {
        
        //subscribe
        if(!scope.$parent.elementsToLoad){
          scope.$parent.elementsToLoad = 0;
          scope.$parent.elementsLoaded = 0;
        }
        
        scope.$parent.elementsToLoad++;

        elem.on('load', function (event) {
            scope.$parent.elementsLoaded++;
           
            if(scope.$parent.elementsLoaded == scope.$parent.elementsToLoad){
                if(scope.$parent.loadingComplete)
                    scope.$parent.loadingComplete();
            }
        });
      }
    };
  }];
},{}],7:[function(require,module,exports){
module.exports = function() {
    return function(input) {
        return input ? input.split('@')[0] : "";
  }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybC5qcyIsImFwcC9jb250cm9sbGVycy90b3dlckN0cmwuanMiLCJhcHAvZGlyZWN0aXZlcy9zYkxvYWQuanMiLCJhcHAvZmlsdGVycy9lbWFpbHNob3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgRkZCOTAxICovXHJcblxyXG4vKipcclxuICogU3RlcCAxIC0gTWFraW5nIG91ciBvd24gbW9kdWxlXHJcbiAqIERlcGVuZGVuY2llcyBpbiB0aGlzIERlbW9cclxuICogIFBvaW50eVBvbnkgOiBUaGUgYW5ndWxhciBtb2R1bGUgZnJvbSBBZHZhbnMuIEl0IGNvbnRhaW5zIGVsZW1lbnRzIHRoYXQgd2UgY2FuIHJldXNlLlxyXG4gKiBSZWFkIHRoZSBkb2NzIHRvIGxlYXJuIG1vcmUuIGh0dHA6Ly9hZHZhbnMuaGVyb2t1YXBwLmNvbS8jL2RvY3NcclxuICogIHVpLnJvdXRlciAgOiBUaGUgYW5ndWxhciBtb2RvbGUgdG8gaGVscCBuYXZpZ2F0ZSBmcm9tIHBhZ2UgdG8gcGFnZS4gXHJcbiAqIGxlYXJuIG1vcmUgb24gaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL3VpLXJvdXRlci9zaXRlLyMvYXBpL3VpLnJvdXRlclxyXG4gKiAgbmdNYXRlcmlhbCA6IEFuIEFuZ3VsYXIgYmFzZWQgZnJhbWV3b3JrIGZvciByZW5kZXJpbmcgbWF0ZXJpYWwgc3R5bGVkIGVsZW1lbnRzXHJcbiAqIHJlYWQgbW9yZSBvbiAgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnL2xhdGVzdC9cclxuICogIG5nTWRJY29ucyA6IEFuIEFuZ3VsYXIgYmFzZWQgZnJhbWV3b3JrIGZvciBzaG93aW5nIGljb25zXHJcbiovXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUHJvZzYnLCBbXCJQb2ludHlQb255XCIsIFwibmdNZEljb25zXCIsIFwidWkucm91dGVyXCIsICBcIm5nTWF0ZXJpYWxcIl0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDIgLSBSZWZlcmVuY2luZyBvdXIgb25saW5lIGNvdXJzZVxyXG4gKiBZb3UgY2FuIGZpbmQgeW91ciBjb3Vyc2UgdG9rZW4gb24gYWR2YW5zLmhlcm9rdWFwcC5jb21cclxuICovXHJcbmFwcC5jb25zdGFudCgnYXBwQ29uZmlnJywge1xyXG5cdC8vUmVwbGFjZSB0aGlzIHRva2VuIHdpdGggeW91ciB0b2tlbiBmcm9tIHRoZSBjb3Vyc2VcclxuXHRjb3Vyc2VUb2tlbjogXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuSWxCeWIyYzJJZy43Z1V1M29DVlBlZVBBR2RvVGk0NW81dEpId3RhLTZvUEZZOGVjNk9ZSjVVXCIsXHJcbn0pO1xyXG5cclxuLy9NYWtlIHlvdXIgb3duIGVsZW1lbnRzLCBpbiBvdXIgY2FzZSBhIHJvdXRpbmcgY29uZmlnIGFuZCBhIGFwcCBjb250cm9sbGVyXHJcbnZhciByb3V0ZXNDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9yb3V0ZXMnKTtcclxudmFyIGFwcEN0cmwgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hcHBDdHJsXCIpO1xyXG52YXIgdG93ZXJDdHJsID0gcmVxdWlyZSgnLi9jb250cm9sbGVycy90b3dlckN0cmwnKTtcclxudmFyIGFzc2lnbm1lbnRDdHJsID0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybCcpO1xyXG52YXIgc2JMb2FkID0gcmVxdWlyZSgnLi9kaXJlY3RpdmVzL3NiTG9hZCcpO1xyXG5cclxuLy9BZGQgdGhlIGNvbnRyb2xsZXIgYW5kIGNvbmZpZyB0byB0aGUgbW9kdWxlXHJcbmFwcC5jb250cm9sbGVyKCdhcHBDdHJsJywgYXBwQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCd0b3dlckN0cmwnLCB0b3dlckN0cmwpO1xyXG5hcHAuY29udHJvbGxlcignYXNzaWdubWVudEN0cmwnLCBhc3NpZ25tZW50Q3RybCk7XHJcbmFwcC5kaXJlY3RpdmUoJ3NiTG9hZCcsIHNiTG9hZCk7XHJcbmFwcC5jb25maWcocm91dGVzQ29uZmlnKTtcclxuXHJcbnZhciBlbWFpbFNob3J0ID0gcmVxdWlyZSgnLi9maWx0ZXJzL2VtYWlsc2hvcnQnKTtcclxuYXBwLmZpbHRlcignZW1haWxTaG9ydCcsICBlbWFpbFNob3J0KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2FtYXppbmdQYWxldHRlTmFtZScsIHtcclxuICAgICc1MCc6ICcwMUE0RUYnLFxyXG4gICAgJzEwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzIwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzMwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzQwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzUwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzYwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzcwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzgwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzkwMCc6ICcwMUE0RUYnLFxyXG4gICAgJ0ExMDAnOiAnRkZCOTAxJywgLy9ZZWxsb3dcclxuICAgICdBMjAwJzogJzI1OWIyNCcsIC8vR3JlZW5cclxuICAgICdBNDAwJzogJ2ZmMTc0NCcsXHJcbiAgICAnQTcwMCc6ICdkNTAwMDAnLFxyXG4gICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICAgLy8gd2hldGhlciwgYnkgZGVmYXVsdCwgdGV4dCAoY29udHJhc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiB0aGlzIHBhbGV0dGUgc2hvdWxkIGJlIGRhcmsgb3IgbGlnaHRcclxuICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbJzUwJywgJzEwMCcsIC8vaHVlcyB3aGljaCBjb250cmFzdCBzaG91bGQgYmUgJ2RhcmsnIGJ5IGRlZmF1bHRcclxuICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgICAgLy8gY291bGQgYWxzbyBzcGVjaWZ5IHRoaXMgaWYgZGVmYXVsdCB3YXMgJ2RhcmsnXHJcbiAgfSk7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgIC5wcmltYXJ5UGFsZXR0ZSgnYW1hemluZ1BhbGV0dGVOYW1lJylcclxufSk7XHJcblxyXG5cclxuICBcclxuXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuXHJcbiAgICAvL0RlZmF1bHQgcm91dGVcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJ2hvbWUnKTtcclxuXHJcbiAgICAvL01ldGhvZGUgdm9vciB0b2V2b2VnZW4gc3RhdGUsIFxyXG4gICAgLy9TdGF0ZSBpcyBpbiBjYW1lbENhc2VcclxuICAgIGZ1bmN0aW9uIGFkZFN0YXRlKHN0YXRlKSB7XHJcbiAgICAgICAgdmFyIHVybCA9IHN0YXRlLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS8kMicpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoc3RhdGUsIHsgdXJsOiAnLycgKyB1cmwsIHRlbXBsYXRlVXJsOiAnb25kZXJ3ZXJwLycgKyB1cmwgKyAnLmh0bWwnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vUmVnaXN0ZXIgYWxsIHRoZSByb3V0ZXNcclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcblxyXG4gICAgICAgIC8vRGVmYXVsdCBwYWdlc1xyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHsgdXJsOiAnL2hvbWUnLCB0ZW1wbGF0ZVVybDogJ2RlZmF1bHQvaG9tZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGVhZGVyYm9hcmRzJywgeyB1cmw6ICcvbGVhZGVyYm9hcmRzJywgdGVtcGxhdGVVcmw6ICdkZWZhdWx0L2xlYWRlcmJvYXJkcy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHsgdXJsOiAnL3Byb2ZpbGUnLCB0ZW1wbGF0ZVVybDogJ2RlZmF1bHQvcHJvZmlsZS5odG1sJyB9KVxyXG5cclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4xJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMScsIHRlbXBsYXRlVXJsOiAnb3BkcmFjaHRlbi93ZWVrMS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjInLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsyJywgdGVtcGxhdGVVcmw6ICdvcGRyYWNodGVuL3dlZWsyLmh0bWwnIH0pXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMycsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazMnLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vd2VlazMuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW40JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNCcsIHRlbXBsYXRlVXJsOiAnb3BkcmFjaHRlbi93ZWVrNC5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjUnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs1JywgdGVtcGxhdGVVcmw6ICdvcGRyYWNodGVuL3dlZWs1Lmh0bWwnIH0pXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazYnLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vd2VlazYuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW5PdmVydmlldycsIHsgdXJsOiAnL29wZHJhY2h0ZW4vb3ZlcnZpZXcnLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vb3ZlcnZpZXcuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3VpdHdlcmtpbmdlbicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vdWl0d2Vya2luZ2VuJywgdGVtcGxhdGVVcmw6ICdvcGRyYWNodGVuL3VpdHdlcmtpbmdlbi5odG1sJyB9KTtcclxuXHJcbiAgICAvL0NvbnRlbnRcclxuICAgIC8vVGVzdGluZ1xyXG4gICAgYWRkU3RhdGUoJ3Rlc3RpbmdJbnRyb2R1Y3RpZScpO1xyXG4gICAgYWRkU3RhdGUoJ3Rlc3RpbmdCYXNpY3MnKTtcclxuICAgIGFkZFN0YXRlKCd0ZXN0aW5nQWR2YW5jZWQnKTtcclxuICAgIC8vcGF0dGVybnNcclxuICAgIGFkZFN0YXRlKCdwYXR0ZXJuc0ludHJvZHVjdGllJyk7XHJcbiAgICBhZGRTdGF0ZSgncGF0dGVybnNEZXBlbmRlbmN5Jyk7XHJcbiAgICBhZGRTdGF0ZSgncGF0dGVybnNSZXBvc2l0b3J5Jyk7XHJcbiAgICBhZGRTdGF0ZSgncGF0dGVybnNJb2MnKTtcclxuICAgIC8vV2NmXHJcbiAgICBhZGRTdGF0ZSgnd2NmSW50cm9kdWN0aWUnKTtcclxuICAgIGFkZFN0YXRlKCd3Y2ZXQ0YnKTtcclxuICAgIGFkZFN0YXRlKCd3Y2ZBenVyZScpO1xyXG4gICAgYWRkU3RhdGUoJ3djZkNvbnN1bWUnKTtcclxuICAgIC8vTXZjXHJcbiAgICBhZGRTdGF0ZSgnbXZjSW50cm9kdWN0aWUnKTtcclxuICAgIGFkZFN0YXRlKCdtdmNDb250cm9sbGVycycpO1xyXG4gICAgYWRkU3RhdGUoJ212Y1ZpZXcnKTtcclxuICAgIGFkZFN0YXRlKCdtdmNGb3JtcycpO1xyXG5cclxuXHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRyb290U2NvcGUsICRsb2NhdGlvbiwgJGFuY2hvclNjcm9sbCkge1xyXG4gICAgXHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICRzY29wZS50b2dnbGVMZWZ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkc2NvcGUuY2xvc2VMZWZ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICBcclxuICAgICRzY29wZS5zY3JvbGxUbyA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgdmFyIG9sZCA9ICRsb2NhdGlvbi5oYXNoKCk7XHJcbiAgICAgICAgJGxvY2F0aW9uLmhhc2goaWQpO1xyXG4gICAgICAgICRhbmNob3JTY3JvbGwoKTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaChvbGQpO1xyXG4gICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc2NvcGUsICRtZERpYWxvZywgJG1kVG9hc3QsIHBwQXNzaWdubWVudFNlcnZpY2UsIHBwUmV2aWV3U2VydmljZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkc2NvcGUuYXNzaWdubWVudHMgPSBbXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBwQXNzaWdubWVudFNlcnZpY2UuZ2V0QXNzaWdubWVudHMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hc3NpZ25tZW50cyA9IHBwQXNzaWdubWVudFNlcnZpY2UuYXNzaWdubWVudHM7XHJcbiAgICAgICAgICAgIH0pXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkcm9vdFNjb3BlKSB7XHJcbiAgICBcclxuXHR2YXIgcmF0aW8gPSAxLjc0MztcclxuXHRcclxuXHR2YXIgY2FudmFzV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0V2lkdGg7XHJcblx0dmFyIGNhbnZhc0hlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5vZmZzZXRIZWlnaHQ7XHJcblx0XHJcblx0JHNjb3BlLnJlYWR5ID0gZmFsc2U7XHJcblx0JHNjb3BlLnJlYWxIZWlnaHQgPSAoY2FudmFzV2lkdGggKiByYXRpbyAtIGNhbnZhc0hlaWdodCk7XHJcblxyXG5cdCRzY29wZS5sb2FkaW5nQ29tcGxldGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0JCgnI2xvYWRlcicpLmhlaWdodCgwKTtcclxuXHRcdCRzY29wZS5yZWFkeSA9IHRydWU7XHJcblx0XHQkc2NvcGUudG9MZXZlbCgxMDApO1xyXG5cdH1cclxuXHRcclxuXHJcblx0JHNjb3BlLnRvTGV2ZWwgPSBmdW5jdGlvbihuZXdMZXZlbCl7XHJcblx0XHQkc2NvcGUubGV2ZWwgPSAkc2NvcGUucmVhbEhlaWdodCAvIDEwMCAqIG5ld0xldmVsO1xyXG5cdH1cclxuXHRcclxuXHQkc2NvcGUuaXNOZWFyID0gZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0aWYoISRzY29wZS5yZWFkeSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcclxuXHRcdHZhbHVlID0gICRzY29wZS5yZWFsSGVpZ2h0IC8gMTAwICogdmFsdWU7XHJcblx0XHRyZXR1cm4gJHNjb3BlLmxldmVsIDwgKHZhbHVlICsgMTAwKSAmJiAkc2NvcGUubGV2ZWwgPiAodmFsdWUgLSAxMDApO1xyXG5cdH07XHJcblx0XHJcblx0JHNjb3BlLmdldFNyY3NldCA9IGZ1bmN0aW9uKGltZyl7XHJcblx0XHRcclxuXHRcdHZhciByb290ID0gXCJkZWZhdWx0L2ltZy9cIjtcclxuXHRcdHJldHVybiByb290ICsgaW1nICsgXCJfc21hbGwucG5nIDYwMHcsIFwiICsgcm9vdCArIGltZyArIFwiX21lZGl1bS5wbmcgOTAwdywgXCIgKyByb290ICsgaW1nICsgXCJfbGFyZ2UucG5nIDEyMDB3XCI7XHJcblx0fVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICBzY29wZToge1xyXG4gICAgICAgIG9uc29ydDogJz0nXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMpIHtcclxuICAgICAgICBcclxuICAgICAgICAvL3N1YnNjcmliZVxyXG4gICAgICAgIGlmKCFzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKXtcclxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQgPSAwO1xyXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQrKztcclxuXHJcbiAgICAgICAgZWxlbS5vbignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkKys7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQgPT0gc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCl7XHJcbiAgICAgICAgICAgICAgICBpZihzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA/IGlucHV0LnNwbGl0KCdAJylbMF0gOiBcIlwiO1xyXG4gIH1cclxufSJdfQ==
