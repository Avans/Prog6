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

//Add the controller and config to the module
app.controller('appCtrl', appCtrl);
app.controller('towerCtrl', towerCtrl);
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


  


},{"./config/routes":2,"./controllers/appCtrl":3,"./controllers/towerCtrl":4}],2:[function(require,module,exports){
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
        //Wcf
        addState('testingwcfIntroductieBasics');
        //Mvc
        addState('mvcIntroductie');

     
      
};
},{}],3:[function(require,module,exports){
module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope) {
    

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $mdSidenav('left').close();
    });
    
    $scope.toggleLeft = function(){
         $mdSidenav('left').toggle();
    }
    
    $scope.closeLeft = function(){
          $mdSidenav('left').close();
    }
   
    
};
},{}],4:[function(require,module,exports){
module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope) {
    

	$scope.level = 0;
	

};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9jb250cm9sbGVycy90b3dlckN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsIEZGQjkwMSAqL1xyXG5cclxuLyoqXHJcbiAqIFN0ZXAgMSAtIE1ha2luZyBvdXIgb3duIG1vZHVsZVxyXG4gKiBEZXBlbmRlbmNpZXMgaW4gdGhpcyBEZW1vXHJcbiAqICBQb2ludHlQb255IDogVGhlIGFuZ3VsYXIgbW9kdWxlIGZyb20gQWR2YW5zLiBJdCBjb250YWlucyBlbGVtZW50cyB0aGF0IHdlIGNhbiByZXVzZS5cclxuICogUmVhZCB0aGUgZG9jcyB0byBsZWFybiBtb3JlLiBodHRwOi8vYWR2YW5zLmhlcm9rdWFwcC5jb20vIy9kb2NzXHJcbiAqICB1aS5yb3V0ZXIgIDogVGhlIGFuZ3VsYXIgbW9kb2xlIHRvIGhlbHAgbmF2aWdhdGUgZnJvbSBwYWdlIHRvIHBhZ2UuIFxyXG4gKiBsZWFybiBtb3JlIG9uIGh0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby91aS1yb3V0ZXIvc2l0ZS8jL2FwaS91aS5yb3V0ZXJcclxuICogIG5nTWF0ZXJpYWwgOiBBbiBBbmd1bGFyIGJhc2VkIGZyYW1ld29yayBmb3IgcmVuZGVyaW5nIG1hdGVyaWFsIHN0eWxlZCBlbGVtZW50c1xyXG4gKiByZWFkIG1vcmUgb24gIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhcmpzLm9yZy9sYXRlc3QvXHJcbiAqICBuZ01kSWNvbnMgOiBBbiBBbmd1bGFyIGJhc2VkIGZyYW1ld29yayBmb3Igc2hvd2luZyBpY29uc1xyXG4qL1xyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ1Byb2c2JywgW1wiUG9pbnR5UG9ueVwiLCBcIm5nTWRJY29uc1wiLCBcInVpLnJvdXRlclwiLCAgXCJuZ01hdGVyaWFsXCJdKTtcclxuXHJcblxyXG4vKipcclxuICogU3RlcCAyIC0gUmVmZXJlbmNpbmcgb3VyIG9ubGluZSBjb3Vyc2VcclxuICogWW91IGNhbiBmaW5kIHlvdXIgY291cnNlIHRva2VuIG9uIGFkdmFucy5oZXJva3VhcHAuY29tXHJcbiAqL1xyXG5hcHAuY29uc3RhbnQoJ2FwcENvbmZpZycsIHtcclxuXHQvL1JlcGxhY2UgdGhpcyB0b2tlbiB3aXRoIHlvdXIgdG9rZW4gZnJvbSB0aGUgY291cnNlXHJcblx0Y291cnNlVG9rZW46IFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LklsQnliMmMySWcuN2dVdTNvQ1ZQZWVQQUdkb1RpNDVvNXRKSHd0YS02b1BGWThlYzZPWUo1VVwiLFxyXG59KTtcclxuXHJcbi8vTWFrZSB5b3VyIG93biBlbGVtZW50cywgaW4gb3VyIGNhc2UgYSByb3V0aW5nIGNvbmZpZyBhbmQgYSBhcHAgY29udHJvbGxlclxyXG52YXIgcm91dGVzQ29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcvcm91dGVzJyk7XHJcbnZhciBhcHBDdHJsID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvYXBwQ3RybFwiKTtcclxudmFyIHRvd2VyQ3RybCA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvdG93ZXJDdHJsJyk7XHJcblxyXG4vL0FkZCB0aGUgY29udHJvbGxlciBhbmQgY29uZmlnIHRvIHRoZSBtb2R1bGVcclxuYXBwLmNvbnRyb2xsZXIoJ2FwcEN0cmwnLCBhcHBDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3Rvd2VyQ3RybCcsIHRvd2VyQ3RybCk7XHJcbmFwcC5jb25maWcocm91dGVzQ29uZmlnKTtcclxuXHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdhbWF6aW5nUGFsZXR0ZU5hbWUnLCB7XHJcbiAgICAnNTAnOiAnMDFBNEVGJyxcclxuICAgICcxMDAnOiAnMDFBNEVGJyxcclxuICAgICcyMDAnOiAnMDFBNEVGJyxcclxuICAgICczMDAnOiAnMDFBNEVGJyxcclxuICAgICc0MDAnOiAnMDFBNEVGJyxcclxuICAgICc1MDAnOiAnMDFBNEVGJyxcclxuICAgICc2MDAnOiAnMDFBNEVGJyxcclxuICAgICc3MDAnOiAnMDFBNEVGJyxcclxuICAgICc4MDAnOiAnMDFBNEVGJyxcclxuICAgICc5MDAnOiAnMDFBNEVGJyxcclxuICAgICdBMTAwJzogJ0ZGQjkwMScsIC8vWWVsbG93XHJcbiAgICAnQTIwMCc6ICcyNTliMjQnLCAvL0dyZWVuXHJcbiAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgJzIwMCcsICczMDAnLCAnNDAwJywgJ0ExMDAnXSxcclxuICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogdW5kZWZpbmVkICAgIC8vIGNvdWxkIGFsc28gc3BlY2lmeSB0aGlzIGlmIGRlZmF1bHQgd2FzICdkYXJrJ1xyXG4gIH0pO1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAucHJpbWFyeVBhbGV0dGUoJ2FtYXppbmdQYWxldHRlTmFtZScpXHJcbn0pO1xyXG5cclxuXHJcbiAgXHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIFxyXG4gICAgLy9EZWZhdWx0IHJvdXRlXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdob21lJyk7XHJcbiAgICBcclxuICAgIC8vTWV0aG9kZSB2b29yIHRvZXZvZWdlbiBzdGF0ZSwgXHJcbiAgICAvL1N0YXRlIGlzIGluIGNhbWVsQ2FzZVxyXG4gICAgZnVuY3Rpb24gYWRkU3RhdGUoc3RhdGUpe1xyXG4gICAgICAgICB2YXIgdXJsID0gc3RhdGUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLyQyJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoc3RhdGUsIHt1cmw6ICcvJyArIHVybCwgdGVtcGxhdGVVcmwgOiAnb25kZXJ3ZXJwLycgKyB1cmwgKyAnLmh0bWwnIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1JlZ2lzdGVyIGFsbCB0aGUgcm91dGVzXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vRGVmYXVsdCBwYWdlc1xyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHsgdXJsOiAnL2hvbWUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvaG9tZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGVhZGVyYm9hcmRzJywgeyB1cmw6ICcvbGVhZGVyYm9hcmRzJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2xlYWRlcmJvYXJkcy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHsgdXJsOiAnL3Byb2ZpbGUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvcHJvZmlsZS5odG1sJyB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4xJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMScsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWsxLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjInLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsyJywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazIuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMycsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazMnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrMy5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW40JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNCcsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWs0Lmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjUnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs1JywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazUuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazYnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrNi5odG1sJyB9ICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Db250ZW50XHJcbiAgICAgICAgLy9UZXN0aW5nXHJcbiAgICAgICAgYWRkU3RhdGUoJ3Rlc3RpbmdJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd0ZXN0aW5nQmFzaWNzJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3Rlc3RpbmdBZHZhbmNlZCcpO1xyXG4gICAgICAgIC8vcGF0dGVybnNcclxuICAgICAgICBhZGRTdGF0ZSgncGF0dGVybnNJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIC8vV2NmXHJcbiAgICAgICAgYWRkU3RhdGUoJ3Rlc3Rpbmd3Y2ZJbnRyb2R1Y3RpZUJhc2ljcycpO1xyXG4gICAgICAgIC8vTXZjXHJcbiAgICAgICAgYWRkU3RhdGUoJ212Y0ludHJvZHVjdGllJyk7XHJcblxyXG4gICAgIFxyXG4gICAgICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkbG9nLCAkcm9vdFNjb3BlKSB7XHJcbiAgICBcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihlLCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICRzY29wZS5jbG9zZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJHJvb3RTY29wZSkge1xyXG4gICAgXHJcblxyXG5cdCRzY29wZS5sZXZlbCA9IDA7XHJcblx0XHJcblxyXG59OyJdfQ==
