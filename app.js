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
var sbLoad = require('./directives/sbLoad');

//Add the controller and config to the module
app.controller('appCtrl', appCtrl);
app.controller('towerCtrl', towerCtrl);
app.directive('sbLoad', sbLoad);
app.config(routesConfig);

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


  


},{"./config/routes":2,"./controllers/appCtrl":3,"./controllers/towerCtrl":4,"./directives/sbLoad":5}],2:[function(require,module,exports){
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
        .state('opdrachtenOverview', { url: '/opdrachten/overview', templateUrl: 'opdrachten/overview.html' });

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
},{}],5:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9jb250cm9sbGVycy90b3dlckN0cmwuanMiLCJhcHAvZGlyZWN0aXZlcy9zYkxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsIEZGQjkwMSAqL1xyXG5cclxuLyoqXHJcbiAqIFN0ZXAgMSAtIE1ha2luZyBvdXIgb3duIG1vZHVsZVxyXG4gKiBEZXBlbmRlbmNpZXMgaW4gdGhpcyBEZW1vXHJcbiAqICBQb2ludHlQb255IDogVGhlIGFuZ3VsYXIgbW9kdWxlIGZyb20gQWR2YW5zLiBJdCBjb250YWlucyBlbGVtZW50cyB0aGF0IHdlIGNhbiByZXVzZS5cclxuICogUmVhZCB0aGUgZG9jcyB0byBsZWFybiBtb3JlLiBodHRwOi8vYWR2YW5zLmhlcm9rdWFwcC5jb20vIy9kb2NzXHJcbiAqICB1aS5yb3V0ZXIgIDogVGhlIGFuZ3VsYXIgbW9kb2xlIHRvIGhlbHAgbmF2aWdhdGUgZnJvbSBwYWdlIHRvIHBhZ2UuIFxyXG4gKiBsZWFybiBtb3JlIG9uIGh0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby91aS1yb3V0ZXIvc2l0ZS8jL2FwaS91aS5yb3V0ZXJcclxuICogIG5nTWF0ZXJpYWwgOiBBbiBBbmd1bGFyIGJhc2VkIGZyYW1ld29yayBmb3IgcmVuZGVyaW5nIG1hdGVyaWFsIHN0eWxlZCBlbGVtZW50c1xyXG4gKiByZWFkIG1vcmUgb24gIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhcmpzLm9yZy9sYXRlc3QvXHJcbiAqICBuZ01kSWNvbnMgOiBBbiBBbmd1bGFyIGJhc2VkIGZyYW1ld29yayBmb3Igc2hvd2luZyBpY29uc1xyXG4qL1xyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ1Byb2c2JywgW1wiUG9pbnR5UG9ueVwiLCBcIm5nTWRJY29uc1wiLCBcInVpLnJvdXRlclwiLCAgXCJuZ01hdGVyaWFsXCJdKTtcclxuXHJcblxyXG4vKipcclxuICogU3RlcCAyIC0gUmVmZXJlbmNpbmcgb3VyIG9ubGluZSBjb3Vyc2VcclxuICogWW91IGNhbiBmaW5kIHlvdXIgY291cnNlIHRva2VuIG9uIGFkdmFucy5oZXJva3VhcHAuY29tXHJcbiAqL1xyXG5hcHAuY29uc3RhbnQoJ2FwcENvbmZpZycsIHtcclxuXHQvL1JlcGxhY2UgdGhpcyB0b2tlbiB3aXRoIHlvdXIgdG9rZW4gZnJvbSB0aGUgY291cnNlXHJcblx0Y291cnNlVG9rZW46IFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LklsQnliMmMySWcuN2dVdTNvQ1ZQZWVQQUdkb1RpNDVvNXRKSHd0YS02b1BGWThlYzZPWUo1VVwiLFxyXG59KTtcclxuXHJcbi8vTWFrZSB5b3VyIG93biBlbGVtZW50cywgaW4gb3VyIGNhc2UgYSByb3V0aW5nIGNvbmZpZyBhbmQgYSBhcHAgY29udHJvbGxlclxyXG52YXIgcm91dGVzQ29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcvcm91dGVzJyk7XHJcbnZhciBhcHBDdHJsID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvYXBwQ3RybFwiKTtcclxudmFyIHRvd2VyQ3RybCA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvdG93ZXJDdHJsJyk7XHJcbnZhciBzYkxvYWQgPSByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvc2JMb2FkJyk7XHJcblxyXG4vL0FkZCB0aGUgY29udHJvbGxlciBhbmQgY29uZmlnIHRvIHRoZSBtb2R1bGVcclxuYXBwLmNvbnRyb2xsZXIoJ2FwcEN0cmwnLCBhcHBDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3Rvd2VyQ3RybCcsIHRvd2VyQ3RybCk7XHJcbmFwcC5kaXJlY3RpdmUoJ3NiTG9hZCcsIHNiTG9hZCk7XHJcbmFwcC5jb25maWcocm91dGVzQ29uZmlnKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2FtYXppbmdQYWxldHRlTmFtZScsIHtcclxuICAgICc1MCc6ICcwMUE0RUYnLFxyXG4gICAgJzEwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzIwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzMwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzQwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzUwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzYwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzcwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzgwMCc6ICcwMUE0RUYnLFxyXG4gICAgJzkwMCc6ICcwMUE0RUYnLFxyXG4gICAgJ0ExMDAnOiAnRkZCOTAxJywgLy9ZZWxsb3dcclxuICAgICdBMjAwJzogJzI1OWIyNCcsIC8vR3JlZW5cclxuICAgICdBNDAwJzogJ2ZmMTc0NCcsXHJcbiAgICAnQTcwMCc6ICdkNTAwMDAnLFxyXG4gICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICAgLy8gd2hldGhlciwgYnkgZGVmYXVsdCwgdGV4dCAoY29udHJhc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiB0aGlzIHBhbGV0dGUgc2hvdWxkIGJlIGRhcmsgb3IgbGlnaHRcclxuICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbJzUwJywgJzEwMCcsIC8vaHVlcyB3aGljaCBjb250cmFzdCBzaG91bGQgYmUgJ2RhcmsnIGJ5IGRlZmF1bHRcclxuICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgICAgLy8gY291bGQgYWxzbyBzcGVjaWZ5IHRoaXMgaWYgZGVmYXVsdCB3YXMgJ2RhcmsnXHJcbiAgfSk7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgIC5wcmltYXJ5UGFsZXR0ZSgnYW1hemluZ1BhbGV0dGVOYW1lJylcclxufSk7XHJcblxyXG5cclxuICBcclxuXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuXHJcbiAgICAvL0RlZmF1bHQgcm91dGVcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJ2hvbWUnKTtcclxuXHJcbiAgICAvL01ldGhvZGUgdm9vciB0b2V2b2VnZW4gc3RhdGUsIFxyXG4gICAgLy9TdGF0ZSBpcyBpbiBjYW1lbENhc2VcclxuICAgIGZ1bmN0aW9uIGFkZFN0YXRlKHN0YXRlKSB7XHJcbiAgICAgICAgdmFyIHVybCA9IHN0YXRlLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS8kMicpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoc3RhdGUsIHsgdXJsOiAnLycgKyB1cmwsIHRlbXBsYXRlVXJsOiAnb25kZXJ3ZXJwLycgKyB1cmwgKyAnLmh0bWwnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vUmVnaXN0ZXIgYWxsIHRoZSByb3V0ZXNcclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcblxyXG4gICAgICAgIC8vRGVmYXVsdCBwYWdlc1xyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHsgdXJsOiAnL2hvbWUnLCB0ZW1wbGF0ZVVybDogJ2RlZmF1bHQvaG9tZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGVhZGVyYm9hcmRzJywgeyB1cmw6ICcvbGVhZGVyYm9hcmRzJywgdGVtcGxhdGVVcmw6ICdkZWZhdWx0L2xlYWRlcmJvYXJkcy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHsgdXJsOiAnL3Byb2ZpbGUnLCB0ZW1wbGF0ZVVybDogJ2RlZmF1bHQvcHJvZmlsZS5odG1sJyB9KVxyXG5cclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4xJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMScsIHRlbXBsYXRlVXJsOiAnb3BkcmFjaHRlbi93ZWVrMS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjInLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsyJywgdGVtcGxhdGVVcmw6ICdvcGRyYWNodGVuL3dlZWsyLmh0bWwnIH0pXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMycsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazMnLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vd2VlazMuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW40JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNCcsIHRlbXBsYXRlVXJsOiAnb3BkcmFjaHRlbi93ZWVrNC5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjUnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs1JywgdGVtcGxhdGVVcmw6ICdvcGRyYWNodGVuL3dlZWs1Lmh0bWwnIH0pXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazYnLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vd2VlazYuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW5PdmVydmlldycsIHsgdXJsOiAnL29wZHJhY2h0ZW4vb3ZlcnZpZXcnLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vb3ZlcnZpZXcuaHRtbCcgfSk7XHJcblxyXG4gICAgLy9Db250ZW50XHJcbiAgICAvL1Rlc3RpbmdcclxuICAgIGFkZFN0YXRlKCd0ZXN0aW5nSW50cm9kdWN0aWUnKTtcclxuICAgIGFkZFN0YXRlKCd0ZXN0aW5nQmFzaWNzJyk7XHJcbiAgICBhZGRTdGF0ZSgndGVzdGluZ0FkdmFuY2VkJyk7XHJcbiAgICAvL3BhdHRlcm5zXHJcbiAgICBhZGRTdGF0ZSgncGF0dGVybnNJbnRyb2R1Y3RpZScpO1xyXG4gICAgYWRkU3RhdGUoJ3BhdHRlcm5zRGVwZW5kZW5jeScpO1xyXG4gICAgYWRkU3RhdGUoJ3BhdHRlcm5zUmVwb3NpdG9yeScpO1xyXG4gICAgYWRkU3RhdGUoJ3BhdHRlcm5zSW9jJyk7XHJcbiAgICAvL1djZlxyXG4gICAgYWRkU3RhdGUoJ3djZkludHJvZHVjdGllJyk7XHJcbiAgICBhZGRTdGF0ZSgnd2NmV0NGJyk7XHJcbiAgICBhZGRTdGF0ZSgnd2NmQXp1cmUnKTtcclxuICAgIGFkZFN0YXRlKCd3Y2ZDb25zdW1lJyk7XHJcbiAgICAvL012Y1xyXG4gICAgYWRkU3RhdGUoJ212Y0ludHJvZHVjdGllJyk7XHJcbiAgICBhZGRTdGF0ZSgnbXZjQ29udHJvbGxlcnMnKTtcclxuICAgIGFkZFN0YXRlKCdtdmNWaWV3Jyk7XHJcblxyXG5cclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkYW5jaG9yU2Nyb2xsKSB7XHJcbiAgICBcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihlLCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICRzY29wZS5jbG9zZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgJHNjb3BlLnNjcm9sbFRvID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB2YXIgb2xkID0gJGxvY2F0aW9uLmhhc2goKTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaChpZCk7XHJcbiAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICRsb2NhdGlvbi5oYXNoKG9sZCk7XHJcbiAgIH1cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkcm9vdFNjb3BlKSB7XHJcbiAgICBcclxuXHR2YXIgcmF0aW8gPSAxLjc0MztcclxuXHRcclxuXHR2YXIgY2FudmFzV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0V2lkdGg7XHJcblx0dmFyIGNhbnZhc0hlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5vZmZzZXRIZWlnaHQ7XHJcblx0XHJcblx0JHNjb3BlLnJlYWR5ID0gZmFsc2U7XHJcblx0JHNjb3BlLnJlYWxIZWlnaHQgPSAoY2FudmFzV2lkdGggKiByYXRpbyAtIGNhbnZhc0hlaWdodCk7XHJcblxyXG5cdCRzY29wZS5sb2FkaW5nQ29tcGxldGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0JCgnI2xvYWRlcicpLmhlaWdodCgwKTtcclxuXHRcdCRzY29wZS5yZWFkeSA9IHRydWU7XHJcblx0XHQkc2NvcGUudG9MZXZlbCgxMDApO1xyXG5cdH1cclxuXHRcclxuXHJcblx0JHNjb3BlLnRvTGV2ZWwgPSBmdW5jdGlvbihuZXdMZXZlbCl7XHJcblx0XHQkc2NvcGUubGV2ZWwgPSAkc2NvcGUucmVhbEhlaWdodCAvIDEwMCAqIG5ld0xldmVsO1xyXG5cdH1cclxuXHRcclxuXHQkc2NvcGUuaXNOZWFyID0gZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0aWYoISRzY29wZS5yZWFkeSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcclxuXHRcdHZhbHVlID0gICRzY29wZS5yZWFsSGVpZ2h0IC8gMTAwICogdmFsdWU7XHJcblx0XHRyZXR1cm4gJHNjb3BlLmxldmVsIDwgKHZhbHVlICsgMTAwKSAmJiAkc2NvcGUubGV2ZWwgPiAodmFsdWUgLSAxMDApO1xyXG5cdH07XHJcblx0XHJcblx0JHNjb3BlLmdldFNyY3NldCA9IGZ1bmN0aW9uKGltZyl7XHJcblx0XHRcclxuXHRcdHZhciByb290ID0gXCJkZWZhdWx0L2ltZy9cIjtcclxuXHRcdHJldHVybiByb290ICsgaW1nICsgXCJfc21hbGwucG5nIDYwMHcsIFwiICsgcm9vdCArIGltZyArIFwiX21lZGl1bS5wbmcgOTAwdywgXCIgKyByb290ICsgaW1nICsgXCJfbGFyZ2UucG5nIDEyMDB3XCI7XHJcblx0fVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICBzY29wZToge1xyXG4gICAgICAgIG9uc29ydDogJz0nXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMpIHtcclxuICAgICAgICBcclxuICAgICAgICAvL3N1YnNjcmliZVxyXG4gICAgICAgIGlmKCFzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKXtcclxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQgPSAwO1xyXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQrKztcclxuXHJcbiAgICAgICAgZWxlbS5vbignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkKys7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQgPT0gc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCl7XHJcbiAgICAgICAgICAgICAgICBpZihzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV07Il19
