﻿/// <reference path="../App.js" />
/// <reference path="../../angular.js" />
PlannerApp.controller('departmentController', ['$scope', '$http', function ($scope, $http) {
    var me = this;

    $scope.departments = [];
    $scope.publications = [];
    $scope.ScientificPublishing = {};
    $scope.years = [(new Date()).getFullYear() - 1, (new Date()).getFullYear(), (new Date()).getFullYear() + 1,
					(new Date()).getFullYear() + 2, (new Date()).getFullYear() + 3];
    $scope.fromDate = null;
    $scope.toDate = null;
    me.init = function () {
        $('input[name="daterange"]').daterangepicker({
            locale: {
                format: 'YYYY-MM-DD'
            }
        },
            function (start, end, label) {
                $scope.fromDate = start;
                $scope.toDate = end;

            });
        $http.get('/Department/Get').then(
            function (response) {
                $scope.departments = response.data;
            }, function (response) {

            });
    };

    $scope.$watch('departmentForPub', function (newVal) {
        if (newVal) {
            $http.get('/Department/DepartmentPublicationsReport?depId=' + newVal.Id).then(
				function (response) {
				    $scope.publications = response.data;
				    console.log(response.data);
				}, function (response) {

				});
            //$scope.departments = [].filter.call($scope.faculties, function (element, index, array) {
            //	return element.Id == newVal;
            //})[0].Departments;
        }
        else {
            //$scope.departments = null;
        }
    });

    $scope.showHalfYear = function () {
        $http.get(`/Department/HalfYearDepartmentReport?depId=${$scope.departmentForHalfYear.Id}&year=${$scope.year}&half=${$scope.half}`).then(
				function (response) {
				    $scope.ScientificPublishing = response.data;
				}, function (response) {

				});
    }
    $scope.showByDateRange = function () {
        var start = new Date($scope.fromDate).toISOString();
        var end = new Date($scope.toDate).toISOString();
        $http.get(`/Department/DateRangeDepartmentReport?depId=${$scope.departmentForPub.Id}&start=${start}&end=${end}`).then(
				function (response) {
				    $scope.ScientificPublishing = response.data;
				}, function (response) {

				});
    }
    //$scope.$watch('departmentForHalfYear', function (newVal) {
    //	if (newVal) {
    //		$http.get('/Department/HalfYearDepartmentReport?depId=' + newVal.Id).then(
    //			function (response) {
    //				$scope.ScientificPublishing = response.data;
    //				console.log($scope.ScientificPublishing);
    //			}, function (response) {

    //			});
    //		//$scope.departments = [].filter.call($scope.faculties, function (element, index, array) {
    //		//	return element.Id == newVal;
    //		//})[0].Departments;
    //	}
    //	else {
    //		//$scope.departments = null;
    //	}
    //});
}]);