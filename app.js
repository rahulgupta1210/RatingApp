(function(){
	'use strict';

var app = angular.module('myApp', []);
app.controller('userController', function ($scope, $http) {

    // method to get data on load
    $scope.getData = function () {
        $http.get('people.json').then(function (response) {
           
            $scope.peopleData = response.data.People;
            $scope.result = $scope.peopleData[0];
            $scope.showLikesAndDislikes($scope.result);
        }, function (error) {
            console.log('error');
        })
    }
    
    // method to get data for selected item
    $scope.getPeopleDetails = function (c) {
        $scope.result = $scope.peopleData.filter(function (item) {
            return item.name == c.name;
        })[0];
        $scope.showLikesAndDislikes($scope.result);
    }

     // method to create object for likes and dislikes
    $scope.showLikesAndDislikes = detail => {
        $scope.likesAndDislikes = [];
        if (detail.Likes.length > detail.Dislikes.length) {

            for (var i = 0; i < detail.Likes.length; i++) {
                var obj = {};
                obj.likes = detail.Likes[i];
                if (detail.Dislikes[i] != undefined) {
                    obj.dislikes = detail.Dislikes[i];
                } else {
                    obj.dislikes = ''
                }
                $scope.likesAndDislikes.push(obj);
            }
        } else {
            for (var i = 0; i < detail.Dislikes.length; i++) {
                var obj = {};
                if (detail.Dislikes[i] != undefined) {
                    obj.likes = detail.Likes[i];
                } else {
                    obj.likes = '';
                }
                obj.dislikes = detail.Dislikes[i];
                $scope.likesAndDislikes.push(obj);
            }
        }
    }
    //function to get rating for the selected people
    $scope.getRating = num => new Array(num);
});

})();
