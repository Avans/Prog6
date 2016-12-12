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
    addState('mvcValidatie');



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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybC5qcyIsImFwcC9jb250cm9sbGVycy90b3dlckN0cmwuanMiLCJhcHAvZGlyZWN0aXZlcy9zYkxvYWQuanMiLCJhcHAvZmlsdGVycy9lbWFpbHNob3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBGRkI5MDEgKi9cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDEgLSBNYWtpbmcgb3VyIG93biBtb2R1bGVcclxuICogRGVwZW5kZW5jaWVzIGluIHRoaXMgRGVtb1xyXG4gKiAgUG9pbnR5UG9ueSA6IFRoZSBhbmd1bGFyIG1vZHVsZSBmcm9tIEFkdmFucy4gSXQgY29udGFpbnMgZWxlbWVudHMgdGhhdCB3ZSBjYW4gcmV1c2UuXHJcbiAqIFJlYWQgdGhlIGRvY3MgdG8gbGVhcm4gbW9yZS4gaHR0cDovL2FkdmFucy5oZXJva3VhcHAuY29tLyMvZG9jc1xyXG4gKiAgdWkucm91dGVyICA6IFRoZSBhbmd1bGFyIG1vZG9sZSB0byBoZWxwIG5hdmlnYXRlIGZyb20gcGFnZSB0byBwYWdlLiBcclxuICogbGVhcm4gbW9yZSBvbiBodHRwOi8vYW5ndWxhci11aS5naXRodWIuaW8vdWktcm91dGVyL3NpdGUvIy9hcGkvdWkucm91dGVyXHJcbiAqICBuZ01hdGVyaWFsIDogQW4gQW5ndWxhciBiYXNlZCBmcmFtZXdvcmsgZm9yIHJlbmRlcmluZyBtYXRlcmlhbCBzdHlsZWQgZWxlbWVudHNcclxuICogcmVhZCBtb3JlIG9uICBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvbGF0ZXN0L1xyXG4gKiAgbmdNZEljb25zIDogQW4gQW5ndWxhciBiYXNlZCBmcmFtZXdvcmsgZm9yIHNob3dpbmcgaWNvbnNcclxuKi9cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdQcm9nNicsIFtcIlBvaW50eVBvbnlcIiwgXCJuZ01kSWNvbnNcIiwgXCJ1aS5yb3V0ZXJcIiwgIFwibmdNYXRlcmlhbFwiXSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFN0ZXAgMiAtIFJlZmVyZW5jaW5nIG91ciBvbmxpbmUgY291cnNlXHJcbiAqIFlvdSBjYW4gZmluZCB5b3VyIGNvdXJzZSB0b2tlbiBvbiBhZHZhbnMuaGVyb2t1YXBwLmNvbVxyXG4gKi9cclxuYXBwLmNvbnN0YW50KCdhcHBDb25maWcnLCB7XHJcblx0Ly9SZXBsYWNlIHRoaXMgdG9rZW4gd2l0aCB5b3VyIHRva2VuIGZyb20gdGhlIGNvdXJzZVxyXG5cdGNvdXJzZVRva2VuOiBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5JbEJ5YjJjMklnLjdnVXUzb0NWUGVlUEFHZG9UaTQ1bzV0Skh3dGEtNm9QRlk4ZWM2T1lKNVVcIixcclxufSk7XHJcblxyXG4vL01ha2UgeW91ciBvd24gZWxlbWVudHMsIGluIG91ciBjYXNlIGEgcm91dGluZyBjb25maWcgYW5kIGEgYXBwIGNvbnRyb2xsZXJcclxudmFyIHJvdXRlc0NvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL3JvdXRlcycpO1xyXG52YXIgYXBwQ3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL2FwcEN0cmxcIik7XHJcbnZhciB0b3dlckN0cmwgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3Rvd2VyQ3RybCcpO1xyXG52YXIgYXNzaWdubWVudEN0cmwgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2Fzc2lnbm1lbnRDdHJsJyk7XHJcbnZhciBzYkxvYWQgPSByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvc2JMb2FkJyk7XHJcblxyXG4vL0FkZCB0aGUgY29udHJvbGxlciBhbmQgY29uZmlnIHRvIHRoZSBtb2R1bGVcclxuYXBwLmNvbnRyb2xsZXIoJ2FwcEN0cmwnLCBhcHBDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3Rvd2VyQ3RybCcsIHRvd2VyQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCdhc3NpZ25tZW50Q3RybCcsIGFzc2lnbm1lbnRDdHJsKTtcclxuYXBwLmRpcmVjdGl2ZSgnc2JMb2FkJywgc2JMb2FkKTtcclxuYXBwLmNvbmZpZyhyb3V0ZXNDb25maWcpO1xyXG5cclxudmFyIGVtYWlsU2hvcnQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvZW1haWxzaG9ydCcpO1xyXG5hcHAuZmlsdGVyKCdlbWFpbFNob3J0JywgIGVtYWlsU2hvcnQpO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnYW1hemluZ1BhbGV0dGVOYW1lJywge1xyXG4gICAgJzUwJzogJzAxQTRFRicsXHJcbiAgICAnMTAwJzogJzAxQTRFRicsXHJcbiAgICAnMjAwJzogJzAxQTRFRicsXHJcbiAgICAnMzAwJzogJzAxQTRFRicsXHJcbiAgICAnNDAwJzogJzAxQTRFRicsXHJcbiAgICAnNTAwJzogJzAxQTRFRicsXHJcbiAgICAnNjAwJzogJzAxQTRFRicsXHJcbiAgICAnNzAwJzogJzAxQTRFRicsXHJcbiAgICAnODAwJzogJzAxQTRFRicsXHJcbiAgICAnOTAwJzogJzAxQTRFRicsXHJcbiAgICAnQTEwMCc6ICdGRkI5MDEnLCAvL1llbGxvd1xyXG4gICAgJ0EyMDAnOiAnMjU5YjI0JywgLy9HcmVlblxyXG4gICAgJ0E0MDAnOiAnZmYxNzQ0JyxcclxuICAgICdBNzAwJzogJ2Q1MDAwMCcsXHJcbiAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgICAvLyB3aGV0aGVyLCBieSBkZWZhdWx0LCB0ZXh0IChjb250cmFzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgcGFsZXR0ZSBzaG91bGQgYmUgZGFyayBvciBsaWdodFxyXG4gICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgLy9odWVzIHdoaWNoIGNvbnRyYXN0IHNob3VsZCBiZSAnZGFyaycgYnkgZGVmYXVsdFxyXG4gICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCAgICAvLyBjb3VsZCBhbHNvIHNwZWNpZnkgdGhpcyBpZiBkZWZhdWx0IHdhcyAnZGFyaydcclxuICB9KTtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gICAgLnByaW1hcnlQYWxldHRlKCdhbWF6aW5nUGFsZXR0ZU5hbWUnKVxyXG59KTtcclxuXHJcblxyXG4gIFxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG5cclxuICAgIC8vRGVmYXVsdCByb3V0ZVxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnaG9tZScpO1xyXG5cclxuICAgIC8vTWV0aG9kZSB2b29yIHRvZXZvZWdlbiBzdGF0ZSwgXHJcbiAgICAvL1N0YXRlIGlzIGluIGNhbWVsQ2FzZVxyXG4gICAgZnVuY3Rpb24gYWRkU3RhdGUoc3RhdGUpIHtcclxuICAgICAgICB2YXIgdXJsID0gc3RhdGUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLyQyJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShzdGF0ZSwgeyB1cmw6ICcvJyArIHVybCwgdGVtcGxhdGVVcmw6ICdvbmRlcndlcnAvJyArIHVybCArICcuaHRtbCcgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9SZWdpc3RlciBhbGwgdGhlIHJvdXRlc1xyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuXHJcbiAgICAgICAgLy9EZWZhdWx0IHBhZ2VzXHJcbiAgICAgICAgLnN0YXRlKCdob21lJywgeyB1cmw6ICcvaG9tZScsIHRlbXBsYXRlVXJsOiAnZGVmYXVsdC9ob21lLmh0bWwnIH0pXHJcbiAgICAgICAgLnN0YXRlKCdsZWFkZXJib2FyZHMnLCB7IHVybDogJy9sZWFkZXJib2FyZHMnLCB0ZW1wbGF0ZVVybDogJ2RlZmF1bHQvbGVhZGVyYm9hcmRzLmh0bWwnIH0pXHJcbiAgICAgICAgLnN0YXRlKCdwcm9maWxlJywgeyB1cmw6ICcvcHJvZmlsZScsIHRlbXBsYXRlVXJsOiAnZGVmYXVsdC9wcm9maWxlLmh0bWwnIH0pXHJcblxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjEnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsxJywgdGVtcGxhdGVVcmw6ICdvcGRyYWNodGVuL3dlZWsxLmh0bWwnIH0pXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazInLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vd2VlazIuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4zJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMycsIHRlbXBsYXRlVXJsOiAnb3BkcmFjaHRlbi93ZWVrMy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjQnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs0JywgdGVtcGxhdGVVcmw6ICdvcGRyYWNodGVuL3dlZWs0Lmh0bWwnIH0pXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNScsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazUnLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vd2VlazUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW42JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNicsIHRlbXBsYXRlVXJsOiAnb3BkcmFjaHRlbi93ZWVrNi5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbk92ZXJ2aWV3JywgeyB1cmw6ICcvb3BkcmFjaHRlbi9vdmVydmlldycsIHRlbXBsYXRlVXJsOiAnb3BkcmFjaHRlbi9vdmVydmlldy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgndWl0d2Vya2luZ2VuJywgeyB1cmw6ICcvb3BkcmFjaHRlbi91aXR3ZXJraW5nZW4nLCB0ZW1wbGF0ZVVybDogJ29wZHJhY2h0ZW4vdWl0d2Vya2luZ2VuLmh0bWwnIH0pO1xyXG5cclxuICAgIC8vQ29udGVudFxyXG4gICAgLy9UZXN0aW5nXHJcbiAgICBhZGRTdGF0ZSgndGVzdGluZ0ludHJvZHVjdGllJyk7XHJcbiAgICBhZGRTdGF0ZSgndGVzdGluZ0Jhc2ljcycpO1xyXG4gICAgYWRkU3RhdGUoJ3Rlc3RpbmdBZHZhbmNlZCcpO1xyXG4gICAgLy9wYXR0ZXJuc1xyXG4gICAgYWRkU3RhdGUoJ3BhdHRlcm5zSW50cm9kdWN0aWUnKTtcclxuICAgIGFkZFN0YXRlKCdwYXR0ZXJuc0RlcGVuZGVuY3knKTtcclxuICAgIGFkZFN0YXRlKCdwYXR0ZXJuc1JlcG9zaXRvcnknKTtcclxuICAgIGFkZFN0YXRlKCdwYXR0ZXJuc0lvYycpO1xyXG4gICAgLy9XY2ZcclxuICAgIGFkZFN0YXRlKCd3Y2ZJbnRyb2R1Y3RpZScpO1xyXG4gICAgYWRkU3RhdGUoJ3djZldDRicpO1xyXG4gICAgYWRkU3RhdGUoJ3djZkF6dXJlJyk7XHJcbiAgICBhZGRTdGF0ZSgnd2NmQ29uc3VtZScpO1xyXG4gICAgLy9NdmNcclxuICAgIGFkZFN0YXRlKCdtdmNJbnRyb2R1Y3RpZScpO1xyXG4gICAgYWRkU3RhdGUoJ212Y0NvbnRyb2xsZXJzJyk7XHJcbiAgICBhZGRTdGF0ZSgnbXZjVmlldycpO1xyXG4gICAgYWRkU3RhdGUoJ212Y0Zvcm1zJyk7XHJcbiAgICBhZGRTdGF0ZSgnbXZjVmFsaWRhdGllJyk7XHJcblxyXG5cclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkYW5jaG9yU2Nyb2xsKSB7XHJcbiAgICBcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihlLCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICRzY29wZS5jbG9zZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgJHNjb3BlLnNjcm9sbFRvID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB2YXIgb2xkID0gJGxvY2F0aW9uLmhhc2goKTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaChpZCk7XHJcbiAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICRsb2NhdGlvbi5oYXNoKG9sZCk7XHJcbiAgIH1cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzY29wZSwgJG1kRGlhbG9nLCAkbWRUb2FzdCwgcHBBc3NpZ25tZW50U2VydmljZSwgcHBSZXZpZXdTZXJ2aWNlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5hc3NpZ25tZW50cyA9IFtdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcHBBc3NpZ25tZW50U2VydmljZS5nZXRBc3NpZ25tZW50cyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmFzc2lnbm1lbnRzID0gcHBBc3NpZ25tZW50U2VydmljZS5hc3NpZ25tZW50cztcclxuICAgICAgICAgICAgfSlcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRyb290U2NvcGUpIHtcclxuICAgIFxyXG5cdHZhciByYXRpbyA9IDEuNzQzO1xyXG5cdFxyXG5cdHZhciBjYW52YXNXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5vZmZzZXRXaWR0aDtcclxuXHR2YXIgY2FudmFzSGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLm9mZnNldEhlaWdodDtcclxuXHRcclxuXHQkc2NvcGUucmVhZHkgPSBmYWxzZTtcclxuXHQkc2NvcGUucmVhbEhlaWdodCA9IChjYW52YXNXaWR0aCAqIHJhdGlvIC0gY2FudmFzSGVpZ2h0KTtcclxuXHJcblx0JHNjb3BlLmxvYWRpbmdDb21wbGV0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcjbG9hZGVyJykuaGVpZ2h0KDApO1xyXG5cdFx0JHNjb3BlLnJlYWR5ID0gdHJ1ZTtcclxuXHRcdCRzY29wZS50b0xldmVsKDEwMCk7XHJcblx0fVxyXG5cdFxyXG5cclxuXHQkc2NvcGUudG9MZXZlbCA9IGZ1bmN0aW9uKG5ld0xldmVsKXtcclxuXHRcdCRzY29wZS5sZXZlbCA9ICRzY29wZS5yZWFsSGVpZ2h0IC8gMTAwICogbmV3TGV2ZWw7XHJcblx0fVxyXG5cdFxyXG5cdCRzY29wZS5pc05lYXIgPSBmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHRpZighJHNjb3BlLnJlYWR5KVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFxyXG5cdFx0dmFsdWUgPSAgJHNjb3BlLnJlYWxIZWlnaHQgLyAxMDAgKiB2YWx1ZTtcclxuXHRcdHJldHVybiAkc2NvcGUubGV2ZWwgPCAodmFsdWUgKyAxMDApICYmICRzY29wZS5sZXZlbCA+ICh2YWx1ZSAtIDEwMCk7XHJcblx0fTtcclxuXHRcclxuXHQkc2NvcGUuZ2V0U3Jjc2V0ID0gZnVuY3Rpb24oaW1nKXtcclxuXHRcdFxyXG5cdFx0dmFyIHJvb3QgPSBcImRlZmF1bHQvaW1nL1wiO1xyXG5cdFx0cmV0dXJuIHJvb3QgKyBpbWcgKyBcIl9zbWFsbC5wbmcgNjAwdywgXCIgKyByb290ICsgaW1nICsgXCJfbWVkaXVtLnBuZyA5MDB3LCBcIiArIHJvb3QgKyBpbWcgKyBcIl9sYXJnZS5wbmcgMTIwMHdcIjtcclxuXHR9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBbJyRwYXJzZScsIGZ1bmN0aW9uICgkcGFyc2UpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgb25zb3J0OiAnPSdcclxuICAgICAgfSxcclxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtLCBhdHRycykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc3Vic2NyaWJlXHJcbiAgICAgICAgaWYoIXNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQpe1xyXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCA9IDA7XHJcbiAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCsrO1xyXG5cclxuICAgICAgICBlbGVtLm9uKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQrKztcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCA9PSBzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKXtcclxuICAgICAgICAgICAgICAgIGlmKHNjb3BlLiRwYXJlbnQubG9hZGluZ0NvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRwYXJlbnQubG9hZGluZ0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID8gaW5wdXQuc3BsaXQoJ0AnKVswXSA6IFwiXCI7XHJcbiAgfVxyXG59Il19
