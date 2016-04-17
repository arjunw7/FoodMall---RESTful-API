var app = angular.module('foodmall', ['ngRoute', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = true;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/signup', {
			templateUrl: 'signup.html',
			controller: 'authController'
		})

    .when('/menu', {
      templateUrl: 'order.html',
      controller: 'mainController'
    })

    .when('/reload', {
      templateUrl: 'reload.html',
      controller: 'mainController'
    });
});


app.controller('mainController', function($scope, postService){
  $scope.menu= postService.query();
  // $scope.newItem = {category: '', item_name: '', item_price: '', image_location: ''};
  console.log($scope.menu)

  // $scope.post = function(){
  //   $scope.menu.push($scope.newItem);
  //   $scope.newItem = {category: '', item_name: '', item_price: '', image_location: ''};
  // };

  //script for ripple efect
  var parent, ink, d, x, y;
    $("button div, .tag, .circle").click(function(e){
      parent = $(this).parent();
      //create .ink element if it doesn't exist
      if(parent.find(".ink").length == 0)
        parent.prepend("<span class='ink'></span>");
        
      ink = parent.find(".ink");
      //incase of quick double clicks stop the previous animation
      ink.removeClass("animate");
      
      //set size of .ink
      if(!ink.height() && !ink.width())
      {
        //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({height: d, width: d});
      }
      
      //get click coordinates
      //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
      x = e.pageX - parent.offset().left - ink.width()/2;
      y = e.pageY - parent.offset().top - ink.height()/2;
      
      //set the position and add class .animate
      ink.css({top: y+'px', left: x+'px'}).addClass("animate");
      console.log('run');
    });
    
});

app.factory('postService', function($resource){
  return $resource('/api/menu');
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/menu');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        alert("Registration Successful!!")
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  //script for ripple effect
  var parent, ink, d, x, y;
    $("button div, .tag, .circle").click(function(e){
      parent = $(this).parent();
      //create .ink element if it doesn't exist
      if(parent.find(".ink").length == 0)
        parent.prepend("<span class='ink'></span>");
        
      ink = parent.find(".ink");
      //incase of quick double clicks stop the previous animation
      ink.removeClass("animate");
      
      //set size of .ink
      if(!ink.height() && !ink.width())
      {
        //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({height: d, width: d});
      }
      
      //get click coordinates
      //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
      x = e.pageX - parent.offset().left - ink.width()/2;
      y = e.pageY - parent.offset().top - ink.height()/2;
      
      //set the position and add class .animate
      ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    });
});