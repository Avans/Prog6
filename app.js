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
module.exports = function($stateProvider, $urlRouterProvider) {
    
    //Default route
    $urlRouterProvider.otherwise('home');
    
    //Methode voor toevoegen state, 
    //State is in camelCase
    function addState(state){
         var url = state.replace(/([a-z])([A-Z])/g, '$1/$2').toLowerCase();
         $stateProvider.state(state, {url: '/' + url, templateUrl : 'onderwerp/' + url + '.html' });
    }
    
    //Register all the routes
    $stateProvider
        
        //Default pages
        .state('home', { url: '/home',  templateUrl:'default/home.html' })
        .state('leaderboards', { url: '/leaderboards',  templateUrl:'default/leaderboards.html' })
        .state('profile', { url: '/profile',  templateUrl:'default/profile.html' })
        
        .state('opdrachten1', { url: '/opdrachten/week1', templateUrl:'opdrachten/week1.html' } )
        .state('opdrachten2', { url: '/opdrachten/week2', templateUrl:'opdrachten/week2.html' } )
        .state('opdrachten3', { url: '/opdrachten/week3', templateUrl:'opdrachten/week3.html' } )
        .state('opdrachten4', { url: '/opdrachten/week4', templateUrl:'opdrachten/week4.html' } )
        .state('opdrachten5', { url: '/opdrachten/week5', templateUrl:'opdrachten/week5.html' } )
        .state('opdrachten6', { url: '/opdrachten/week6', templateUrl:'opdrachten/week6.html' } );
        
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
	}
	
	$('#firstToLoad').on('load', function(){
		$scope.ready = true;
		$scope.toLevel(100);
	});

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9jb250cm9sbGVycy90b3dlckN0cmwuanMiLCJhcHAvZGlyZWN0aXZlcy9zYkxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgRkZCOTAxICovXHJcblxyXG4vKipcclxuICogU3RlcCAxIC0gTWFraW5nIG91ciBvd24gbW9kdWxlXHJcbiAqIERlcGVuZGVuY2llcyBpbiB0aGlzIERlbW9cclxuICogIFBvaW50eVBvbnkgOiBUaGUgYW5ndWxhciBtb2R1bGUgZnJvbSBBZHZhbnMuIEl0IGNvbnRhaW5zIGVsZW1lbnRzIHRoYXQgd2UgY2FuIHJldXNlLlxyXG4gKiBSZWFkIHRoZSBkb2NzIHRvIGxlYXJuIG1vcmUuIGh0dHA6Ly9hZHZhbnMuaGVyb2t1YXBwLmNvbS8jL2RvY3NcclxuICogIHVpLnJvdXRlciAgOiBUaGUgYW5ndWxhciBtb2RvbGUgdG8gaGVscCBuYXZpZ2F0ZSBmcm9tIHBhZ2UgdG8gcGFnZS4gXHJcbiAqIGxlYXJuIG1vcmUgb24gaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL3VpLXJvdXRlci9zaXRlLyMvYXBpL3VpLnJvdXRlclxyXG4gKiAgbmdNYXRlcmlhbCA6IEFuIEFuZ3VsYXIgYmFzZWQgZnJhbWV3b3JrIGZvciByZW5kZXJpbmcgbWF0ZXJpYWwgc3R5bGVkIGVsZW1lbnRzXHJcbiAqIHJlYWQgbW9yZSBvbiAgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnL2xhdGVzdC9cclxuICogIG5nTWRJY29ucyA6IEFuIEFuZ3VsYXIgYmFzZWQgZnJhbWV3b3JrIGZvciBzaG93aW5nIGljb25zXHJcbiovXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUHJvZzYnLCBbXCJQb2ludHlQb255XCIsIFwibmdNZEljb25zXCIsIFwidWkucm91dGVyXCIsICBcIm5nTWF0ZXJpYWxcIl0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDIgLSBSZWZlcmVuY2luZyBvdXIgb25saW5lIGNvdXJzZVxyXG4gKiBZb3UgY2FuIGZpbmQgeW91ciBjb3Vyc2UgdG9rZW4gb24gYWR2YW5zLmhlcm9rdWFwcC5jb21cclxuICovXHJcbmFwcC5jb25zdGFudCgnYXBwQ29uZmlnJywge1xyXG5cdC8vUmVwbGFjZSB0aGlzIHRva2VuIHdpdGggeW91ciB0b2tlbiBmcm9tIHRoZSBjb3Vyc2VcclxuXHRjb3Vyc2VUb2tlbjogXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuSWxCeWIyYzJJZy43Z1V1M29DVlBlZVBBR2RvVGk0NW81dEpId3RhLTZvUEZZOGVjNk9ZSjVVXCIsXHJcbn0pO1xyXG5cclxuLy9NYWtlIHlvdXIgb3duIGVsZW1lbnRzLCBpbiBvdXIgY2FzZSBhIHJvdXRpbmcgY29uZmlnIGFuZCBhIGFwcCBjb250cm9sbGVyXHJcbnZhciByb3V0ZXNDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9yb3V0ZXMnKTtcclxudmFyIGFwcEN0cmwgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hcHBDdHJsXCIpO1xyXG52YXIgdG93ZXJDdHJsID0gcmVxdWlyZSgnLi9jb250cm9sbGVycy90b3dlckN0cmwnKTtcclxudmFyIHNiTG9hZCA9IHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9zYkxvYWQnKTtcclxuXHJcbi8vQWRkIHRoZSBjb250cm9sbGVyIGFuZCBjb25maWcgdG8gdGhlIG1vZHVsZVxyXG5hcHAuY29udHJvbGxlcignYXBwQ3RybCcsIGFwcEN0cmwpO1xyXG5hcHAuY29udHJvbGxlcigndG93ZXJDdHJsJywgdG93ZXJDdHJsKTtcclxuYXBwLmRpcmVjdGl2ZSgnc2JMb2FkJywgc2JMb2FkKTtcclxuYXBwLmNvbmZpZyhyb3V0ZXNDb25maWcpO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnYW1hemluZ1BhbGV0dGVOYW1lJywge1xyXG4gICAgJzUwJzogJzAxQTRFRicsXHJcbiAgICAnMTAwJzogJzAxQTRFRicsXHJcbiAgICAnMjAwJzogJzAxQTRFRicsXHJcbiAgICAnMzAwJzogJzAxQTRFRicsXHJcbiAgICAnNDAwJzogJzAxQTRFRicsXHJcbiAgICAnNTAwJzogJzAxQTRFRicsXHJcbiAgICAnNjAwJzogJzAxQTRFRicsXHJcbiAgICAnNzAwJzogJzAxQTRFRicsXHJcbiAgICAnODAwJzogJzAxQTRFRicsXHJcbiAgICAnOTAwJzogJzAxQTRFRicsXHJcbiAgICAnQTEwMCc6ICdGRkI5MDEnLCAvL1llbGxvd1xyXG4gICAgJ0EyMDAnOiAnMjU5YjI0JywgLy9HcmVlblxyXG4gICAgJ0E0MDAnOiAnZmYxNzQ0JyxcclxuICAgICdBNzAwJzogJ2Q1MDAwMCcsXHJcbiAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgICAvLyB3aGV0aGVyLCBieSBkZWZhdWx0LCB0ZXh0IChjb250cmFzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgcGFsZXR0ZSBzaG91bGQgYmUgZGFyayBvciBsaWdodFxyXG4gICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgLy9odWVzIHdoaWNoIGNvbnRyYXN0IHNob3VsZCBiZSAnZGFyaycgYnkgZGVmYXVsdFxyXG4gICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCAgICAvLyBjb3VsZCBhbHNvIHNwZWNpZnkgdGhpcyBpZiBkZWZhdWx0IHdhcyAnZGFyaydcclxuICB9KTtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gICAgLnByaW1hcnlQYWxldHRlKCdhbWF6aW5nUGFsZXR0ZU5hbWUnKVxyXG59KTtcclxuXHJcblxyXG4gIFxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICBcclxuICAgIC8vRGVmYXVsdCByb3V0ZVxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnaG9tZScpO1xyXG4gICAgXHJcbiAgICAvL01ldGhvZGUgdm9vciB0b2V2b2VnZW4gc3RhdGUsIFxyXG4gICAgLy9TdGF0ZSBpcyBpbiBjYW1lbENhc2VcclxuICAgIGZ1bmN0aW9uIGFkZFN0YXRlKHN0YXRlKXtcclxuICAgICAgICAgdmFyIHVybCA9IHN0YXRlLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS8kMicpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKHN0YXRlLCB7dXJsOiAnLycgKyB1cmwsIHRlbXBsYXRlVXJsIDogJ29uZGVyd2VycC8nICsgdXJsICsgJy5odG1sJyB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9SZWdpc3RlciBhbGwgdGhlIHJvdXRlc1xyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICBcclxuICAgICAgICAvL0RlZmF1bHQgcGFnZXNcclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7IHVybDogJy9ob21lJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2hvbWUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ2xlYWRlcmJvYXJkcycsIHsgdXJsOiAnL2xlYWRlcmJvYXJkcycsICB0ZW1wbGF0ZVVybDonZGVmYXVsdC9sZWFkZXJib2FyZHMuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2ZpbGUnLCB7IHVybDogJy9wcm9maWxlJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L3Byb2ZpbGUuaHRtbCcgfSlcclxuICAgICAgICBcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4xJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMScsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWsxLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjInLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsyJywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazIuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMycsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazMnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrMy5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW40JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNCcsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWs0Lmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjUnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs1JywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazUuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazYnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrNi5odG1sJyB9ICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Db250ZW50XHJcbiAgICAgICAgLy9UZXN0aW5nXHJcbiAgICAgICAgYWRkU3RhdGUoJ3Rlc3RpbmdJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd0ZXN0aW5nQmFzaWNzJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3Rlc3RpbmdBZHZhbmNlZCcpO1xyXG4gICAgICAgIC8vcGF0dGVybnNcclxuICAgICAgICBhZGRTdGF0ZSgncGF0dGVybnNJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdwYXR0ZXJuc0RlcGVuZGVuY3knKTtcclxuICAgICAgICBhZGRTdGF0ZSgncGF0dGVybnNSZXBvc2l0b3J5Jyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3BhdHRlcm5zSW9jJyk7XHJcbiAgICAgICAgLy9XY2ZcclxuICAgICAgICBhZGRTdGF0ZSgnd2NmSW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnd2NmV0NGJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3djZkF6dXJlJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3djZkNvbnN1bWUnKTtcclxuICAgICAgICAvL012Y1xyXG4gICAgICAgIGFkZFN0YXRlKCdtdmNJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdtdmNDb250cm9sbGVycycpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdtdmNWaWV3Jyk7XHJcblxyXG4gICAgIFxyXG4gICAgICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRhbmNob3JTY3JvbGwpIHtcclxuICAgIFxyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGUsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkc2NvcGUudG9nZ2xlTGVmdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS50b2dnbGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLmNsb3NlTGVmdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcclxuICAgIH1cclxuICAgXHJcbiAgICAkc2NvcGUuc2Nyb2xsVG8gPSBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIHZhciBvbGQgPSAkbG9jYXRpb24uaGFzaCgpO1xyXG4gICAgICAgICRsb2NhdGlvbi5oYXNoKGlkKTtcclxuICAgICAgICAkYW5jaG9yU2Nyb2xsKCk7XHJcbiAgICAgICAgJGxvY2F0aW9uLmhhc2gob2xkKTtcclxuICAgfVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRyb290U2NvcGUpIHtcclxuICAgIFxyXG5cdHZhciByYXRpbyA9IDEuNzQzO1xyXG5cdFxyXG5cdHZhciBjYW52YXNXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5vZmZzZXRXaWR0aDtcclxuXHR2YXIgY2FudmFzSGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLm9mZnNldEhlaWdodDtcclxuXHRcclxuXHQkc2NvcGUucmVhZHkgPSBmYWxzZTtcclxuXHQkc2NvcGUucmVhbEhlaWdodCA9IChjYW52YXNXaWR0aCAqIHJhdGlvIC0gY2FudmFzSGVpZ2h0KTtcclxuXHJcblx0JHNjb3BlLmxvYWRpbmdDb21wbGV0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcjbG9hZGVyJykuaGVpZ2h0KDApO1xyXG5cdH1cclxuXHRcclxuXHQkKCcjZmlyc3RUb0xvYWQnKS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUucmVhZHkgPSB0cnVlO1xyXG5cdFx0JHNjb3BlLnRvTGV2ZWwoMTAwKTtcclxuXHR9KTtcclxuXHJcblx0JHNjb3BlLnRvTGV2ZWwgPSBmdW5jdGlvbihuZXdMZXZlbCl7XHJcblx0XHQkc2NvcGUubGV2ZWwgPSAkc2NvcGUucmVhbEhlaWdodCAvIDEwMCAqIG5ld0xldmVsO1xyXG5cdH1cclxuXHRcclxuXHQkc2NvcGUuaXNOZWFyID0gZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0aWYoISRzY29wZS5yZWFkeSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcclxuXHRcdHZhbHVlID0gICRzY29wZS5yZWFsSGVpZ2h0IC8gMTAwICogdmFsdWU7XHJcblx0XHRyZXR1cm4gJHNjb3BlLmxldmVsIDwgKHZhbHVlICsgMTAwKSAmJiAkc2NvcGUubGV2ZWwgPiAodmFsdWUgLSAxMDApO1xyXG5cdH07XHJcblx0XHJcblx0JHNjb3BlLmdldFNyY3NldCA9IGZ1bmN0aW9uKGltZyl7XHJcblx0XHRcclxuXHRcdHZhciByb290ID0gXCJkZWZhdWx0L2ltZy9cIjtcclxuXHRcdHJldHVybiByb290ICsgaW1nICsgXCJfc21hbGwucG5nIDYwMHcsIFwiICsgcm9vdCArIGltZyArIFwiX21lZGl1bS5wbmcgOTAwdywgXCIgKyByb290ICsgaW1nICsgXCJfbGFyZ2UucG5nIDEyMDB3XCI7XHJcblx0fVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICBzY29wZToge1xyXG4gICAgICAgIG9uc29ydDogJz0nXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMpIHtcclxuICAgICAgICBcclxuICAgICAgICAvL3N1YnNjcmliZVxyXG4gICAgICAgIGlmKCFzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKXtcclxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQgPSAwO1xyXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQrKztcclxuXHJcbiAgICAgICAgZWxlbS5vbignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkKys7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQgPT0gc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCl7XHJcbiAgICAgICAgICAgICAgICBpZihzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV07Il19
