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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9jb250cm9sbGVycy90b3dlckN0cmwuanMiLCJhcHAvZGlyZWN0aXZlcy9zYkxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBGRkI5MDEgKi9cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDEgLSBNYWtpbmcgb3VyIG93biBtb2R1bGVcclxuICogRGVwZW5kZW5jaWVzIGluIHRoaXMgRGVtb1xyXG4gKiAgUG9pbnR5UG9ueSA6IFRoZSBhbmd1bGFyIG1vZHVsZSBmcm9tIEFkdmFucy4gSXQgY29udGFpbnMgZWxlbWVudHMgdGhhdCB3ZSBjYW4gcmV1c2UuXHJcbiAqIFJlYWQgdGhlIGRvY3MgdG8gbGVhcm4gbW9yZS4gaHR0cDovL2FkdmFucy5oZXJva3VhcHAuY29tLyMvZG9jc1xyXG4gKiAgdWkucm91dGVyICA6IFRoZSBhbmd1bGFyIG1vZG9sZSB0byBoZWxwIG5hdmlnYXRlIGZyb20gcGFnZSB0byBwYWdlLiBcclxuICogbGVhcm4gbW9yZSBvbiBodHRwOi8vYW5ndWxhci11aS5naXRodWIuaW8vdWktcm91dGVyL3NpdGUvIy9hcGkvdWkucm91dGVyXHJcbiAqICBuZ01hdGVyaWFsIDogQW4gQW5ndWxhciBiYXNlZCBmcmFtZXdvcmsgZm9yIHJlbmRlcmluZyBtYXRlcmlhbCBzdHlsZWQgZWxlbWVudHNcclxuICogcmVhZCBtb3JlIG9uICBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvbGF0ZXN0L1xyXG4gKiAgbmdNZEljb25zIDogQW4gQW5ndWxhciBiYXNlZCBmcmFtZXdvcmsgZm9yIHNob3dpbmcgaWNvbnNcclxuKi9cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdQcm9nNicsIFtcIlBvaW50eVBvbnlcIiwgXCJuZ01kSWNvbnNcIiwgXCJ1aS5yb3V0ZXJcIiwgIFwibmdNYXRlcmlhbFwiXSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFN0ZXAgMiAtIFJlZmVyZW5jaW5nIG91ciBvbmxpbmUgY291cnNlXHJcbiAqIFlvdSBjYW4gZmluZCB5b3VyIGNvdXJzZSB0b2tlbiBvbiBhZHZhbnMuaGVyb2t1YXBwLmNvbVxyXG4gKi9cclxuYXBwLmNvbnN0YW50KCdhcHBDb25maWcnLCB7XHJcblx0Ly9SZXBsYWNlIHRoaXMgdG9rZW4gd2l0aCB5b3VyIHRva2VuIGZyb20gdGhlIGNvdXJzZVxyXG5cdGNvdXJzZVRva2VuOiBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5JbEJ5YjJjMklnLjdnVXUzb0NWUGVlUEFHZG9UaTQ1bzV0Skh3dGEtNm9QRlk4ZWM2T1lKNVVcIixcclxufSk7XHJcblxyXG4vL01ha2UgeW91ciBvd24gZWxlbWVudHMsIGluIG91ciBjYXNlIGEgcm91dGluZyBjb25maWcgYW5kIGEgYXBwIGNvbnRyb2xsZXJcclxudmFyIHJvdXRlc0NvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL3JvdXRlcycpO1xyXG52YXIgYXBwQ3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL2FwcEN0cmxcIik7XHJcbnZhciB0b3dlckN0cmwgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3Rvd2VyQ3RybCcpO1xyXG52YXIgc2JMb2FkID0gcmVxdWlyZSgnLi9kaXJlY3RpdmVzL3NiTG9hZCcpO1xyXG5cclxuLy9BZGQgdGhlIGNvbnRyb2xsZXIgYW5kIGNvbmZpZyB0byB0aGUgbW9kdWxlXHJcbmFwcC5jb250cm9sbGVyKCdhcHBDdHJsJywgYXBwQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCd0b3dlckN0cmwnLCB0b3dlckN0cmwpO1xyXG5hcHAuZGlyZWN0aXZlKCdzYkxvYWQnLCBzYkxvYWQpO1xyXG5hcHAuY29uZmlnKHJvdXRlc0NvbmZpZyk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdhbWF6aW5nUGFsZXR0ZU5hbWUnLCB7XHJcbiAgICAnNTAnOiAnMDFBNEVGJyxcclxuICAgICcxMDAnOiAnMDFBNEVGJyxcclxuICAgICcyMDAnOiAnMDFBNEVGJyxcclxuICAgICczMDAnOiAnMDFBNEVGJyxcclxuICAgICc0MDAnOiAnMDFBNEVGJyxcclxuICAgICc1MDAnOiAnMDFBNEVGJyxcclxuICAgICc2MDAnOiAnMDFBNEVGJyxcclxuICAgICc3MDAnOiAnMDFBNEVGJyxcclxuICAgICc4MDAnOiAnMDFBNEVGJyxcclxuICAgICc5MDAnOiAnMDFBNEVGJyxcclxuICAgICdBMTAwJzogJ0ZGQjkwMScsIC8vWWVsbG93XHJcbiAgICAnQTIwMCc6ICcyNTliMjQnLCAvL0dyZWVuXHJcbiAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgJzIwMCcsICczMDAnLCAnNDAwJywgJ0ExMDAnXSxcclxuICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogdW5kZWZpbmVkICAgIC8vIGNvdWxkIGFsc28gc3BlY2lmeSB0aGlzIGlmIGRlZmF1bHQgd2FzICdkYXJrJ1xyXG4gIH0pO1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAucHJpbWFyeVBhbGV0dGUoJ2FtYXppbmdQYWxldHRlTmFtZScpXHJcbn0pO1xyXG5cclxuXHJcbiAgXHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIFxyXG4gICAgLy9EZWZhdWx0IHJvdXRlXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdob21lJyk7XHJcbiAgICBcclxuICAgIC8vTWV0aG9kZSB2b29yIHRvZXZvZWdlbiBzdGF0ZSwgXHJcbiAgICAvL1N0YXRlIGlzIGluIGNhbWVsQ2FzZVxyXG4gICAgZnVuY3Rpb24gYWRkU3RhdGUoc3RhdGUpe1xyXG4gICAgICAgICB2YXIgdXJsID0gc3RhdGUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLyQyJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoc3RhdGUsIHt1cmw6ICcvJyArIHVybCwgdGVtcGxhdGVVcmwgOiAnb25kZXJ3ZXJwLycgKyB1cmwgKyAnLmh0bWwnIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1JlZ2lzdGVyIGFsbCB0aGUgcm91dGVzXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vRGVmYXVsdCBwYWdlc1xyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHsgdXJsOiAnL2hvbWUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvaG9tZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGVhZGVyYm9hcmRzJywgeyB1cmw6ICcvbGVhZGVyYm9hcmRzJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2xlYWRlcmJvYXJkcy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHsgdXJsOiAnL3Byb2ZpbGUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvcHJvZmlsZS5odG1sJyB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjEnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsxJywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazEuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazInLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrMi5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4zJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMycsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWszLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjQnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs0JywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazQuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNScsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazUnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrNS5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW42JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNicsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWs2Lmh0bWwnIH0gKTtcclxuICAgICAgICBcclxuICAgICAgICAvL0NvbnRlbnRcclxuICAgICAgICAvL1Rlc3RpbmdcclxuICAgICAgICBhZGRTdGF0ZSgndGVzdGluZ0ludHJvZHVjdGllJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3Rlc3RpbmdCYXNpY3MnKTtcclxuICAgICAgICBhZGRTdGF0ZSgndGVzdGluZ0FkdmFuY2VkJyk7XHJcbiAgICAgICAgLy9wYXR0ZXJuc1xyXG4gICAgICAgIGFkZFN0YXRlKCdwYXR0ZXJuc0ludHJvZHVjdGllJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3BhdHRlcm5zRGVwZW5kZW5jeScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdwYXR0ZXJuc1JlcG9zaXRvcnknKTtcclxuICAgICAgICBhZGRTdGF0ZSgncGF0dGVybnNJb2MnKTtcclxuICAgICAgICAvL1djZlxyXG4gICAgICAgIGFkZFN0YXRlKCd3Y2ZJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3Y2ZXQ0YnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnd2NmQXp1cmUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnd2NmQ29uc3VtZScpO1xyXG4gICAgICAgIC8vTXZjXHJcbiAgICAgICAgYWRkU3RhdGUoJ212Y0ludHJvZHVjdGllJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ212Y0NvbnRyb2xsZXJzJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ212Y1ZpZXcnKTtcclxuXHJcbiAgICAgXHJcbiAgICAgIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRyb290U2NvcGUsICRsb2NhdGlvbiwgJGFuY2hvclNjcm9sbCkge1xyXG4gICAgXHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICRzY29wZS50b2dnbGVMZWZ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkc2NvcGUuY2xvc2VMZWZ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICBcclxuICAgICRzY29wZS5zY3JvbGxUbyA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgdmFyIG9sZCA9ICRsb2NhdGlvbi5oYXNoKCk7XHJcbiAgICAgICAgJGxvY2F0aW9uLmhhc2goaWQpO1xyXG4gICAgICAgICRhbmNob3JTY3JvbGwoKTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaChvbGQpO1xyXG4gICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJHJvb3RTY29wZSkge1xyXG4gICAgXHJcblx0dmFyIHJhdGlvID0gMS43NDM7XHJcblx0XHJcblx0dmFyIGNhbnZhc1dpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLm9mZnNldFdpZHRoO1xyXG5cdHZhciBjYW52YXNIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0SGVpZ2h0O1xyXG5cdFxyXG5cdCRzY29wZS5yZWFkeSA9IGZhbHNlO1xyXG5cdCRzY29wZS5yZWFsSGVpZ2h0ID0gKGNhbnZhc1dpZHRoICogcmF0aW8gLSBjYW52YXNIZWlnaHQpO1xyXG5cclxuXHQkc2NvcGUubG9hZGluZ0NvbXBsZXRlID0gZnVuY3Rpb24oKXtcclxuXHRcdCQoJyNsb2FkZXInKS5oZWlnaHQoMCk7XHJcblx0XHQkc2NvcGUucmVhZHkgPSB0cnVlO1xyXG5cdFx0JHNjb3BlLnRvTGV2ZWwoMTAwKTtcclxuXHR9XHJcblx0XHJcblxyXG5cdCRzY29wZS50b0xldmVsID0gZnVuY3Rpb24obmV3TGV2ZWwpe1xyXG5cdFx0JHNjb3BlLmxldmVsID0gJHNjb3BlLnJlYWxIZWlnaHQgLyAxMDAgKiBuZXdMZXZlbDtcclxuXHR9XHJcblx0XHJcblx0JHNjb3BlLmlzTmVhciA9IGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdGlmKCEkc2NvcGUucmVhZHkpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHJcblx0XHR2YWx1ZSA9ICAkc2NvcGUucmVhbEhlaWdodCAvIDEwMCAqIHZhbHVlO1xyXG5cdFx0cmV0dXJuICRzY29wZS5sZXZlbCA8ICh2YWx1ZSArIDEwMCkgJiYgJHNjb3BlLmxldmVsID4gKHZhbHVlIC0gMTAwKTtcclxuXHR9O1xyXG5cdFxyXG5cdCRzY29wZS5nZXRTcmNzZXQgPSBmdW5jdGlvbihpbWcpe1xyXG5cdFx0XHJcblx0XHR2YXIgcm9vdCA9IFwiZGVmYXVsdC9pbWcvXCI7XHJcblx0XHRyZXR1cm4gcm9vdCArIGltZyArIFwiX3NtYWxsLnBuZyA2MDB3LCBcIiArIHJvb3QgKyBpbWcgKyBcIl9tZWRpdW0ucG5nIDkwMHcsIFwiICsgcm9vdCArIGltZyArIFwiX2xhcmdlLnBuZyAxMjAwd1wiO1xyXG5cdH1cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHBhcnNlJywgZnVuY3Rpb24gKCRwYXJzZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgc2NvcGU6IHtcclxuICAgICAgICBvbnNvcnQ6ICc9J1xyXG4gICAgICB9LFxyXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zdWJzY3JpYmVcclxuICAgICAgICBpZighc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCl7XHJcbiAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkID0gMDtcclxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKys7XHJcblxyXG4gICAgICAgIGVsZW0ub24oJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCsrO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkID09IHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuJHBhcmVudC5sb2FkaW5nQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudC5sb2FkaW5nQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1dOyJdfQ==
