var app = angular.module('tableApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/table.html',
        controller: 'tableCtrl',
    }).
    when('/about', {
        templateUrl: 'partials/about.html',
    }).
    when('/contact', {
        templateUrl: 'partials/contact.html',
    }).
    otherwise({
        redirectTo: '/',
    });

}]);

var ref = new Firebase('https://elemental.firebaseio.com/');
var currentElement;
var x = {};

app.controller('tableCtrl', function ($scope) {
    $scope.id = "";

    $scope.clickFunc = function () {
        currentElement = ref.child($scope.id);
        currentElement.on('value', function (snapshot) {
            x = snapshot.val();
            $scope.display();
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    };

    $scope.backFunc = function (x) {
        $('#element-info').slideUp(300);
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        x = {};
        return false;
    };

    $scope.display = function () {
        $('#element-info h1').text(x.name);
        $('#num').text('Atomic Number: ' + x.number);
        $('#weight').text('Atomic Weight: ' + x.weight);
        $('#electrons').text('Electrons: ' + x.e);
        $('#protons').text('Protons: ' + x.p);
        $('#boil').text('Boiling Point: ' + x.boil);
        $('#melt').text('Melting Point: ' + x.melt);
        $('#iso').text('Isotopes: ' + x.iso);
        $('#group').text('Group: ' + x.group);
        $('#info').text(x.info);
        $('#dying').text(x.dying);
        $('#uses').text(x.uses);
        $('#location').text(x.here);
    };

    $('.element').click(function () {
        $scope.id = $(this).attr('id');
        $scope.clickFunc();
        $('#element-info').slideDown(300);
        return false;
    });

    $('i.fa').click(function () {
        $scope.backFunc();
    });
});
