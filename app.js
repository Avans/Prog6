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
	
	$scope.toLevel = function(newLevel){
		$scope.level = newLevel;
	}
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9jb250cm9sbGVycy90b3dlckN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBGRkI5MDEgKi9cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDEgLSBNYWtpbmcgb3VyIG93biBtb2R1bGVcclxuICogRGVwZW5kZW5jaWVzIGluIHRoaXMgRGVtb1xyXG4gKiAgUG9pbnR5UG9ueSA6IFRoZSBhbmd1bGFyIG1vZHVsZSBmcm9tIEFkdmFucy4gSXQgY29udGFpbnMgZWxlbWVudHMgdGhhdCB3ZSBjYW4gcmV1c2UuXHJcbiAqIFJlYWQgdGhlIGRvY3MgdG8gbGVhcm4gbW9yZS4gaHR0cDovL2FkdmFucy5oZXJva3VhcHAuY29tLyMvZG9jc1xyXG4gKiAgdWkucm91dGVyICA6IFRoZSBhbmd1bGFyIG1vZG9sZSB0byBoZWxwIG5hdmlnYXRlIGZyb20gcGFnZSB0byBwYWdlLiBcclxuICogbGVhcm4gbW9yZSBvbiBodHRwOi8vYW5ndWxhci11aS5naXRodWIuaW8vdWktcm91dGVyL3NpdGUvIy9hcGkvdWkucm91dGVyXHJcbiAqICBuZ01hdGVyaWFsIDogQW4gQW5ndWxhciBiYXNlZCBmcmFtZXdvcmsgZm9yIHJlbmRlcmluZyBtYXRlcmlhbCBzdHlsZWQgZWxlbWVudHNcclxuICogcmVhZCBtb3JlIG9uICBodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvbGF0ZXN0L1xyXG4gKiAgbmdNZEljb25zIDogQW4gQW5ndWxhciBiYXNlZCBmcmFtZXdvcmsgZm9yIHNob3dpbmcgaWNvbnNcclxuKi9cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdQcm9nNicsIFtcIlBvaW50eVBvbnlcIiwgXCJuZ01kSWNvbnNcIiwgXCJ1aS5yb3V0ZXJcIiwgIFwibmdNYXRlcmlhbFwiXSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFN0ZXAgMiAtIFJlZmVyZW5jaW5nIG91ciBvbmxpbmUgY291cnNlXHJcbiAqIFlvdSBjYW4gZmluZCB5b3VyIGNvdXJzZSB0b2tlbiBvbiBhZHZhbnMuaGVyb2t1YXBwLmNvbVxyXG4gKi9cclxuYXBwLmNvbnN0YW50KCdhcHBDb25maWcnLCB7XHJcblx0Ly9SZXBsYWNlIHRoaXMgdG9rZW4gd2l0aCB5b3VyIHRva2VuIGZyb20gdGhlIGNvdXJzZVxyXG5cdGNvdXJzZVRva2VuOiBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5JbEJ5YjJjMklnLjdnVXUzb0NWUGVlUEFHZG9UaTQ1bzV0Skh3dGEtNm9QRlk4ZWM2T1lKNVVcIixcclxufSk7XHJcblxyXG4vL01ha2UgeW91ciBvd24gZWxlbWVudHMsIGluIG91ciBjYXNlIGEgcm91dGluZyBjb25maWcgYW5kIGEgYXBwIGNvbnRyb2xsZXJcclxudmFyIHJvdXRlc0NvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL3JvdXRlcycpO1xyXG52YXIgYXBwQ3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL2FwcEN0cmxcIik7XHJcbnZhciB0b3dlckN0cmwgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3Rvd2VyQ3RybCcpO1xyXG5cclxuLy9BZGQgdGhlIGNvbnRyb2xsZXIgYW5kIGNvbmZpZyB0byB0aGUgbW9kdWxlXHJcbmFwcC5jb250cm9sbGVyKCdhcHBDdHJsJywgYXBwQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCd0b3dlckN0cmwnLCB0b3dlckN0cmwpO1xyXG5hcHAuY29uZmlnKHJvdXRlc0NvbmZpZyk7XHJcblxyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnYW1hemluZ1BhbGV0dGVOYW1lJywge1xyXG4gICAgJzUwJzogJzAxQTRFRicsXHJcbiAgICAnMTAwJzogJzAxQTRFRicsXHJcbiAgICAnMjAwJzogJzAxQTRFRicsXHJcbiAgICAnMzAwJzogJzAxQTRFRicsXHJcbiAgICAnNDAwJzogJzAxQTRFRicsXHJcbiAgICAnNTAwJzogJzAxQTRFRicsXHJcbiAgICAnNjAwJzogJzAxQTRFRicsXHJcbiAgICAnNzAwJzogJzAxQTRFRicsXHJcbiAgICAnODAwJzogJzAxQTRFRicsXHJcbiAgICAnOTAwJzogJzAxQTRFRicsXHJcbiAgICAnQTEwMCc6ICdGRkI5MDEnLCAvL1llbGxvd1xyXG4gICAgJ0EyMDAnOiAnMjU5YjI0JywgLy9HcmVlblxyXG4gICAgJ0E0MDAnOiAnZmYxNzQ0JyxcclxuICAgICdBNzAwJzogJ2Q1MDAwMCcsXHJcbiAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgICAvLyB3aGV0aGVyLCBieSBkZWZhdWx0LCB0ZXh0IChjb250cmFzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgcGFsZXR0ZSBzaG91bGQgYmUgZGFyayBvciBsaWdodFxyXG4gICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgLy9odWVzIHdoaWNoIGNvbnRyYXN0IHNob3VsZCBiZSAnZGFyaycgYnkgZGVmYXVsdFxyXG4gICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCAgICAvLyBjb3VsZCBhbHNvIHNwZWNpZnkgdGhpcyBpZiBkZWZhdWx0IHdhcyAnZGFyaydcclxuICB9KTtcclxuICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gICAgLnByaW1hcnlQYWxldHRlKCdhbWF6aW5nUGFsZXR0ZU5hbWUnKVxyXG59KTtcclxuXHJcblxyXG4gIFxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICBcclxuICAgIC8vRGVmYXVsdCByb3V0ZVxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnaG9tZScpO1xyXG4gICAgXHJcbiAgICAvL01ldGhvZGUgdm9vciB0b2V2b2VnZW4gc3RhdGUsIFxyXG4gICAgLy9TdGF0ZSBpcyBpbiBjYW1lbENhc2VcclxuICAgIGZ1bmN0aW9uIGFkZFN0YXRlKHN0YXRlKXtcclxuICAgICAgICAgdmFyIHVybCA9IHN0YXRlLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS8kMicpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKHN0YXRlLCB7dXJsOiAnLycgKyB1cmwsIHRlbXBsYXRlVXJsIDogJ29uZGVyd2VycC8nICsgdXJsICsgJy5odG1sJyB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9SZWdpc3RlciBhbGwgdGhlIHJvdXRlc1xyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICBcclxuICAgICAgICAvL0RlZmF1bHQgcGFnZXNcclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7IHVybDogJy9ob21lJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2hvbWUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ2xlYWRlcmJvYXJkcycsIHsgdXJsOiAnL2xlYWRlcmJvYXJkcycsICB0ZW1wbGF0ZVVybDonZGVmYXVsdC9sZWFkZXJib2FyZHMuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2ZpbGUnLCB7IHVybDogJy9wcm9maWxlJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L3Byb2ZpbGUuaHRtbCcgfSlcclxuICAgICAgICBcclxuICAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMScsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazEnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrMS5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4yJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMicsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWsyLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjMnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWszJywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazMuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNCcsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazQnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrNC5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW41JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNScsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWs1Lmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjYnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs2JywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazYuaHRtbCcgfSApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vQ29udGVudFxyXG4gICAgICAgIC8vVGVzdGluZ1xyXG4gICAgICAgIGFkZFN0YXRlKCd0ZXN0aW5nSW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgndGVzdGluZ0Jhc2ljcycpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd0ZXN0aW5nQWR2YW5jZWQnKTtcclxuICAgICAgICAvL3BhdHRlcm5zXHJcbiAgICAgICAgYWRkU3RhdGUoJ3BhdHRlcm5zSW50cm9kdWN0aWUnKTtcclxuICAgICAgICAvL1djZlxyXG4gICAgICAgIGFkZFN0YXRlKCd0ZXN0aW5nd2NmSW50cm9kdWN0aWVCYXNpY3MnKTtcclxuICAgICAgICAvL012Y1xyXG4gICAgICAgIGFkZFN0YXRlKCdtdmNJbnRyb2R1Y3RpZScpO1xyXG5cclxuICAgICBcclxuICAgICAgXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJHJvb3RTY29wZSkge1xyXG4gICAgXHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICRzY29wZS50b2dnbGVMZWZ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkc2NvcGUuY2xvc2VMZWZ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRyb290U2NvcGUpIHtcclxuICAgIFxyXG5cclxuXHQkc2NvcGUubGV2ZWwgPSAwO1xyXG5cdFxyXG5cdCRzY29wZS50b0xldmVsID0gZnVuY3Rpb24obmV3TGV2ZWwpe1xyXG5cdFx0JHNjb3BlLmxldmVsID0gbmV3TGV2ZWw7XHJcblx0fVxyXG59OyJdfQ==
