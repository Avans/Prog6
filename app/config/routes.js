module.exports = function($stateProvider, $urlRouterProvider) {
    
    //Default route
    $urlRouterProvider.otherwise('home');
    
    //Register all the routes
    $stateProvider
        
        //Default pages
        .state('home', { url: '/home',  templateUrl:'default/home.html' })
        .state('leaderboards', { url: '/leaderboards',  templateUrl:'default/leaderboards.html' })
        .state('profile', { url: '/profile',  templateUrl:'default/profile.html' })
        
        //Content
        .state('week1onderwerp1', { url: '/week1/onderwerp1', templateUrl:'week1/onderwerp1.html' } )
        .state('week1onderwerp2', { url: '/week1/onderwerp2', templateUrl:'week1/onderwerp2.html' } )
        .state('week2onderwerp1', { url: '/week2/onderwerp1', templateUrl:'week2/onderwerp1.html' } )
        .state('week2onderwerp2', { url: '/week2/onderwerp2', templateUrl:'week2/onderwerp2.html' } )
};