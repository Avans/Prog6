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



};