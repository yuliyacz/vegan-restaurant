angular.module('veganapp.admin')
    .controller('meCtrl', ['$scope', '$state', 'authProvider', 'userFactory', function ($scope, $state, authProvider, userFactory) {
        $scope.dis = true;
        $scope.myInfo = function () {
            authProvider.isLoggedIn()
                .then(function (data) {
                    userFactory.getUserById(data.data)
                        .success(function (data) {
                            $scope.me = {
                                id: data._id,
                                uzivJm: data.username,
                                jm: data.name,
                                prijm: data.surname,
                                role: data.role,
                                email: data.email,
                                phone: data.phone,
                                phoneM: data.phoneMessage,
                                emailM: data.emailMessage
                            };
                            console.log(data);
                        });
                });
        };
        $scope.myInfo();
        $scope.send = function (id, me) {
            if (!$scope.dis) {
                userFactory.updateUser(id, me).success(function (err, data) {
                    //$scope.myInfo();
                    $scope.dis = true;
                    console.log(err);
                    console.log('data ' , data);
                });
            }
        };
    }]);