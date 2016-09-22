var app = angular.module('foodmall', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
   $http.get('auth/confirm-login')
          .success(function (user) {
              if (user) {
                  $rootScope.current_user_name = user.fullName;
                  $rootScope.authenticated = true;
                  $rootScope.current_user = user.username;
                  $rootScope.current_user_email = user.email;
              }
  });
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  $rootScope.current_user_name = '';
  $rootScope.total= 0;
  
});

app.config(function($routeProvider, $locationProvider, $httpProvider){
    //================================================
  // Check if the user is connected
  //================================================
var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('auth/isAuthenticated').success(function(user){
      // Authenticated
      if (user !== '0')
        /*$timeout(deferred.resolve, 0);*/
        deferred.resolve();

      // Not Authenticated
      else {
        deferred.reject();
        $location.url('/login');
      }
    });

    return deferred.promise;
  };
var checkAdminLoggedin = function($q, $timeout, $http, $location, $rootScope){
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('auth/isAuthenticated').success(function(user){
      // Authenticated
      if (user !== '0' && user.username =='admin' )
        /*$timeout(deferred.resolve, 0);*/
        deferred.resolve();

      // Not Authenticated
      else {
        deferred.reject();
        $location.url('/main');
      }
    });

    return deferred.promise;
  };
    var checkLoggedout = function($q, $timeout, $http, $location, $rootScope){
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('auth/isAuthenticated').success(function(user){
      // Authenticated
      if (user == '0')
        /*$timeout(deferred.resolve, 0);*/
        deferred.resolve();

      // Not Authenticated
      else {
        deferred.reject();
        $location.url('/menu');
      }
    });

    return deferred.promise;
  };
  //================================================
  
  //================================================
  // Add an interceptor for AJAX errors
  //================================================
  $httpProvider.interceptors.push(function($q, $location) {
    return {
      response: function(response) {
        // do something on success
        return response;
      },
      responseError: function(response) {
        if (response.status === 401)
          $location.url('/login');
        return $q.reject(response);
      }
    };
  });
  //================================================

  //================================================
  // Define all the routes
  //================================================

  $routeProvider
    .when('/', {
      templateUrl: 'main.ejs',
      controller: 'mainController',
      resolve: {
        loggedin: checkLoggedout
      }
    })

    .when('/main', {
      templateUrl: 'main.ejs',
      controller: 'mainController',
      resolve: {
        loggedin: checkLoggedout
      }
    })

    //the login display
    .when('/login', {
      templateUrl: 'login.ejs',
      controller: 'authController',
      resolve: {
        loggedin: checkLoggedout
      }
    })
    //the signup display
    .when('/signup', {
      templateUrl: 'signup.ejs',
      controller: 'authController',
      resolve: {
        loggedin: checkLoggedout
      }
    })
     //the forgot password display
    .when('/forgotPassword', {
      templateUrl: 'forgotPassword.ejs',
      controller: 'authController',
      resolve: {
        loggedin: checkLoggedout
      }
    })
    //the forgot password display
    .when('/reset/:token', {
      templateUrl: 'reset.ejs',
      controller: 'authController',
      resolve: {
        loggedin: checkLoggedout
      }
    })

    .when('/menu', {
      templateUrl: 'order.ejs',
      controller: 'mainController',
      resolve: {
        loggedin: checkLoggedin
      }
    })

    .when('/admin', {
      templateUrl: 'admin.ejs',
      controller: 'authController'
    })

    .when('/dashboard', {
      templateUrl: 'dashboard.ejs',
      controller: 'mainController'
    })

    .when('/addItem', {
      templateUrl: 'addItem.ejs',
      controller: 'mainController'
    })

    .when('/removeItem', {
      templateUrl: 'removeItems.ejs',
      controller: 'mainController'
    })

    .when('/users', {
      templateUrl: 'users.ejs',
      controller: 'mainController'
    })

    .when('/orderHistory', {
      templateUrl: 'orderHistory.ejs',
      controller: 'mainController'
    })

    .when('/reload', {
      templateUrl: 'reload.ejs',
      controller: 'mainController',
      resolve: {
        loggedin: checkLoggedin
      }
    });
});


app.controller('mainController', function($scope, $rootScope, $http, postService, userService, orderService, historyService){
  $scope.menu= postService.query();
  $scope.users=userService.query();
  $scope.orderHistory=historyService.query();

  $scope.createOrder = function(name, price){
    $scope.newOrder={item_name: name, item_price: price};
    $rootScope.total= $rootScope.total + price;
    $http.post('api/order', $scope.newOrder).success(function(data){
     $scope.refreshOrder();
    });
  };

  $scope.refreshOrder = function(){
    $scope.order=orderService.query();
  };

  $scope.refreshMenu = function(){
    $scope.menu=postService.query();
  };

  $scope.refreshUsers = function(){
    $scope.users=userService.query();
  }
  $scope.refreshOrder();
  
  // console.log($rootScope.current_user);
  // $scope.details = {name: $scope.c_name, total: $scope.total};
  // console.log($scope.details);
  $scope.proceed = function(current_user, total){
  $scope.orderHistory = {order_by: current_user, amount: total};
  $http.post('api/orderHistory', $scope.orderHistory).success(function(data){
    console.log("done");
  });
  $http.delete('api/order', {});
  $rootScope.total=0;
  };

  $scope.removeOrder = function(id, price){
    $http.delete('/api/order/' + id).success(function(response){
        $scope.refreshOrder();
      });
    $rootScope.total = $rootScope.total-price;
  }

  $scope.removeItem = function(id){
    $http.delete('/api/menu/' + id).success(function(response){
        $scope.refreshMenu();
      });
  }

  $scope.removeUser = function(id){
    if(confirm("User will be permanently deleted. Are you sure?")==true){
      $http.delete('/api/users/' + id).success(function(response){
          $scope.refreshUsers();
      });  
    }
    
  }

   $scope.addItem = function(){
    $scope.newItem={item_name: '', item_price: '', category: '', image_location: ''};
    $http.post('api/menu', $scope.newItem).success(function(data){
     console.log("done");
    });
  };

  $scope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      $rootScope.current_user = '';
  };

  // $scope.randomString = function(length, chars) {
  //   var result = '';
  //   for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  //   return result;
  // }
  // $scope.generateCaptcha = function(){
  // var rString = $scope.randomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  // document.getElementById("captcha").innerHTML = rString;
  // };
  // $scope.generateCaptcha();


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
    });
    
});

app.factory('postService', function($resource){
  return $resource('/api/menu');
});

app.factory('userService', function($resource){
  return $resource('/api/users')
});

app.factory('orderService', function($resource){
  return $resource('api/order')
});

app.factory('historyService', function($resource){
  return $resource('api/orderHistory')
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
app.controller('authController', function($scope, $http, $rootScope, $location, $routeParams){
  $scope.user = {fullName: '', contact: '', username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    var x = document.getElementById('captcha').innerHTML;
    var y = document.getElementById('captchaText').value;
    if (x == y) {
        $http.post('/auth/login', $scope.user).success(function(data){
          if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $rootScope.current_user_name = data.user.fullName;
        $location.path('/menu');
        }
        else{
          $scope.error_message = data.message;
        }
    });

    }
    else{
      alert("Verification code does not match!");
      return false;
    }

    
  };
  $scope.adminLogin = function(){
    var x = document.getElementById('captcha').innerHTML;
    var y = document.getElementById('captchaText').value;
    if (x == y) {
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $rootScope.current_user_name = data.user.fullName;
        $location.path('/dashboard');
      }
      else{
        $scope.error_message = data.message;
      }
    });
    }
    else{
      alert("Verification code does not match!");
      return false;
    }
  };
  $scope.register = function(){
    var x = document.getElementById('captcha').innerHTML;
    var y = document.getElementById('captchaText').value;
    if (x == y) {
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $rootScope.current_user_name = data.user.fullName;
        alert("Registration Successful!!")
        $location.path('/login');
      }
      else{
        $scope.error_message = data.message;
      }
    });
    }
    else{
      alert("Verification code does not match!");
      return false;
    }
  };
  
   $scope.forgot = function(){
    var x = document.getElementById('captcha').innerHTML;
    var y = document.getElementById('captchaText').value;
    if (x == y) {
      $http.post('/api/forgot', $scope.user);
      alert('An e-mail has been sent to your email with further instructions');
      $location.path('/login');
    }
    else{
      alert("Verification code does not match!");
      return false;
    }
  };
  $scope.resetPassword = function(){
    var x = document.getElementById('captcha').innerHTML;
    var y = document.getElementById('captchaText').value;
    if (x == y) {
      $http.post('/api/reset/' + $routeParams.token, $scope.user, $routeParams.token).success(function(){
        alert('Password reset succesful');
        $location.path('/login');
      });
      
    }
    else{
      alert("Verification code does not match!");
      return false;
    }
  };
  
  $('#upper').keyup(function() {
        this.value = this.value.toUpperCase();
    });

  $scope.randomString = function(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  $scope.generateCaptcha = function(){
  var rString = $scope.randomString(6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  document.getElementById("captcha").innerHTML = rString;
  };
  $scope.generateCaptcha();

  // $scope.generateCaptcha = function(){
  // var x = Math.floor((Math.random() * 500000) + 200000);
  // document.getElementById("captcha").innerHTML = x;
  // };
  // $scope.generateCaptcha();
  // //script for ripple effect


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