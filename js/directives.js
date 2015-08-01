/**
 * Created by Administrator on 2015/8/1.
 */
angular.module("starter.directives", [])
.directive("selectModel",function(){

        return{
            restrict:"E",
            require: ['ngModel', 'ngData', 'ngSelectedId', 'ngSelectedValue', '?ngTitle', 'ngiItemName', 'ngItemId'],
            template:'<button ng-click="show()"  class="button button-icon icon ion-chevron-up"></button>',
            controller: function ($scope, $element, $attrs, $ionicModal, $parse) {
                $scope.modal = {};

                $scope.showSelectModal = function () {
                    var val = $parse($attrs.ngData);
                    $scope.data = val($scope);

                    $scope.modal.show();
                };

                $scope.closeSelectModal = function () {
                    $scope.modal.hide();
                };

                $scope.$on('$destroy', function (id) {
                    $scope.modal.remove();
                });

                $scope.modal = $ionicModal.fromTemplate('<ion-modal-view id="select">' + '<ion-header-bar>' + '<h1 class="title">' + $attrs.ngTitle + '</h1>' + ' <a ng-click="closeSelectModal()" class="button button-icon icon ion-close"></a>' + '</ion-header-bar>' + '<ion-content>' + '<ion-list>' + '<ion-item  ng-click="clickItem(item)" ng-repeat="item in data" ng-bind-html="item[\'' + $attrs.ngItemName + '\']"></ion-item>' + '</ion-list>' + ' </ion-content>' + '</ion-modal-view>', {
                    scope: $scope,
                    animation: 'slide-in-up'
                });

                $scope.clickItem = function (item) {
                    var index = $parse($attrs.ngSelectedId);
                    index.assign($scope.$parent, item[$attrs.ngItemId]);

                    var value = $parse($attrs.ngSelectedValue);
                    value.assign($scope.$parent, item[$attrs.ngItemName]);

                    $scope.closeSelectModal();
                };
            }
        }

        $scope.show =
            function (e) {
                $scope.modal = $ionicModal.fromTemplate('<ion-modal-view id="select">' +
                    '<ion-header-bar>' +
                    '<h1 class="title">' +
                    $attrs.ngTitle + '</h1>' +
                    ' <a ng-click="closeSelectModal()" class="button button-icon icon ion-close"></a>' +
                    '</ion-header-bar>' +
                    '<ion-content>' +
                    '<ion-list>' +
                    '<ion-item  ng-click="clickItem(item)" ng-repeat="item in data" ng-bind-html="item[\'' +
                    $attrs.ngItemName +
                    '\']"></ion-item>' +
                    '</ion-list>' +
                    ' </ion-content>' +
                    '</ion-modal-view>', {
                    scope: $scope,
                    animation: 'slide-in-up'
                });

            };
        $scope.clickItem = function (item) {
            var index = $parse($attrs.ngSelectedId);
            index.assign($scope.$parent, item[$attrs.ngItemId]);

            var value = $parse($attrs.ngSelectedValue);
            value.assign($scope.$parent, item[$attrs.ngItemName]);

            $scope.closeSelectModal();
        };
    })