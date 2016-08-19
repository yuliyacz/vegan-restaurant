/**
 * Created by yuliya on 12.11.15.
 */
angular.module('veganapp.public')
    .controller('menuCtrlP', ['$scope', '$http', 'menuPublic', 'drinkMenu', function($scope, $http, menuPublic, drinkMenu) {
        $scope.today = new Date().getDay();
        //console.log('Today is: ', $scope.today);
        if ($scope.today === 0 || $scope.today === 6) {
            $scope.vikend = true;
        }
        else {
            $scope.vikend = false;
        }
        $scope.tridaVar = [];
        $scope.poledni = [];
        $scope.vikend = 'Pro dnešní den není žádné polední menu.';
        switch($scope.today) {
            case 1: {
                $scope.todayStr = 'pondeli';
                break;
            }
            case 2: {
                $scope.todayStr = 'utery';
                break;
            }
            case 3: {
                $scope.todayStr = 'streda';
                break;
            }
            case 4: {
                $scope.todayStr = 'ctvrtek';
                break;
            }
            case 5: {
                $scope.todayStr = 'patek';
                break;
            }
        }
        $scope.tridaDaily = [
            {
                name: 'polevka',
                text: 'Polévka'
            },
            {
                name: 'hlavni',
                text: 'Hlavní chody'
            }];
        menuPublic.getMenu().success(function (data, status) {
            $scope.data = data;
            //console.log('data: ', status);
        });
        menuPublic.getDailyMenu().success(function (data, status) {
            $scope.celePoledni = data;
            for (var i=0; i<data.length; i++) {
                if (data[i].day === $scope.todayStr) {
                    console.log('Cislo: ', i, ' object: ', data[i]);
                    $scope.poledni.push(data[i]);
                }
            }
            if ($scope.poledni.length < 1) {
                console.log($scope.vikend);
            }
        });
        menuPublic.getSort().success(function (data, status) {
            $scope.trida = data;
            //console.log($scope.trida);
            $scope.amount = $scope.trida.length;
            if ($scope.trida) {
                for (var i = 0; i < $scope.trida.length; i++) {
                    //console.log(i);
                    if ($scope.trida[i] == 'predkrm') {
                        $scope.tridaVar.push({
                            name: 'predkrm',
                            text: 'Předkrmy'
                        });
                    }
                    else if ($scope.trida[i] == 'hlavni') {
                        $scope.tridaVar.push({
                            name: 'hlavni',
                            text: 'Hlavní chody'
                        });
                    }
                    else if ($scope.trida[i] == 'salat') {
                        $scope.tridaVar.push({
                            name: 'salat',
                            text: 'Saláty'
                        });

                    }
                    else if ($scope.trida[i] == 'dezert') {
                        $scope.tridaVar.push({
                            name: 'dezert',
                            text: 'Dezerty'
                        });
                    }
                }
            }
        });
        drinkMenu.getDrinks().success(function (data) {
            $scope.napojovy = data;
        });
        drinkMenu.getSort().success(function (data) {
            $scope.sortD = data;
        });
        $scope.tabs = [{
            title: 'Polední menu',
            template: 'poledni'
        },
        {
            title: 'Jídelní lístek',
            template: 'jidelni'
        },
        {
            title: 'Nápojový lístek',
            template: 'napojovy'
        }];
        $scope.activeTab = 'jidelni';

        $scope.setTab = function(tabTmp) {
            $scope.activeTab = tabTmp;
        };
    }]);