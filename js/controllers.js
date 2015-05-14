/**
 * Created by Administrator on 2015/3/31.
 */
angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout,$q) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })
    .controller('PlaylistsCtrl', function ($scope, Plays) {
        $scope.getAll = function () {
            return Plays.all();
        }
    })
    .controller("PlaylistCtrl", function () {
    })
.controller("CatalogsCtrl",function($scope,$ionicActionSheet,Catalogs){
        $scope.getAll=function(){
          return  Catalogs.all();
        };

        $scope.show=
            function(e) {
                //console.log(e.srcElement);
                $ionicActionSheet.show({
                    titleText: 'ActionSheet Example',
                    buttons: [
                        { text: '<i class="icon ion-share balanced"></i> Share' },
                        { text: '<i class="icon ion-arrow-move assertive"></i> Move' },
                        {text:' <button class="button action-sheet-option ng-binding" ng-click="buttonClicked($index)" ng-repeat="b in buttons" ng-bind-html="b.text">Show Page Settings</button>'}
                    ],
                    destructiveText: 'Delete',
                    cancelText: 'Cancel',
                    cancel: function() {
                        console.log('CANCELLED');
                    },
                    buttonClicked: function(index) {
                        console.log('BUTTON CLICKED', index);
                        return true;
                    },
                    destructiveButtonClicked: function() {
                        console.log('DESTRUCT');
                        return true;
                    }
                });

            };

    })
.controller("FyListCtrl",function($scope,$q,$ionicModal,$http,$timeout,$ionicBackdrop,FyList){
        $scope.searchReg="";
        $scope.fyList=FyList.search();
        $scope.queryData = {};

        $scope.getAll=function(){
            return  FyList.all();
        };
        $scope.doSearch=function(){
            var deferred = $q.defer();
            var query= document.querySelector("#queryReg").value;
            var fyList= FyList.search(query);
            deferred.resolve(fyList);

            console.log(deferred.promise);
            deferred.promise.then(function(data){
                $scope.fyList=data;
                console.log($scope.fyList);
            });

        };
        $scope.clearSearch = function(dom) {
            console.log(dom);
            document.querySelector("#queryReg").value="";
            $scope.fyList=FyList.search();
        };


        $scope.doBackDrop=function(){
            $ionicBackdrop.retain();
            $timeout(function(){
                $ionicBackdrop.release();
            },3000);
        };

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/fy-query.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeQuery = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.openQuery = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doQuery = function () {
            console.log('Doing login', $scope.queryData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeQuery();
            }, 1000);
        };

        $scope.doScroll=function(){
            $scope.items = [1,2,3];
            $scope.doRefresh = function() {
                $scope.$broadcast('scroll.refreshComplete');
                //$http.get('/new-items')
                //    .success(function(newItems) {
                //        $scope.items = newItems;
                //    })
                //    .finally(function() {
                //        // Stop the ion-refresher from spinning
                //        $scope.$broadcast('scroll.refreshComplete');
                //    });
            };
        };

    })
.controller("FyEditCtrl",function($scope,$ionicPopup,$timeout){
        $scope.data={};
$scope.onHold=function(){

    var popup=$ionicPopup.show({
        template:"<input type='password' ng-model='data.wifi'>",
        title:"填写wifi密码",
        subTitle:"使用常用字符",
        scope:$scope,
        buttons:[
            {text:"取消00"},
            {text:"No取消"},
            {
                text:"<b>保存</b>",
                type:"button-positive",
                onTap:function(e){
                    console.log(111);
                    if(!$scope.data.wifi){
                        e.preventDefault();
                    }else{
                        return $scope.data.wifi;
                    }
                }
            }
        ]

    });

    popup.then(function(res){
        console.log(res);
    });
    $timeout(function(){
        popup.close();
    },15000);

};
    })
.controller("browseCtrl",function($scope, $ionicPopover){
        //todo 有错误
        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplate(template, {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });
    })
.controller("NewsListCtrl",function($scope,NewsSvc){
        var start=1,end= 5,isAll=false;
        $scope.newsList=[];
        $scope.display="";
        $scope.queryVal="";

        $scope.doSearch=function(){
            var query=  $scope.queryVal;
            $scope.newsList= NewsSvc.search(query);

        };
        $scope.getPageNews=function(){
            if(!isAll) {
                var tem = NewsSvc.getPageNews(start, end);
                if(!tem||tem.length==0){
                    isAll=true;
                    $scope.display="none";
                    return;
                }
                $scope.newsList=$scope.newsList.concat(tem);
                start = end;
                end += 5;
            }
        };
        $scope.getPageNews();
    })
    .controller("NewsCtrl", function($scope, $stateParams, NewsSvc) {
        var id = $stateParams.newsId;
        $scope.News=NewsSvc.getNewsById(id);
        $scope.commentList=[{cnt:"好好",time:"2015-41-2"},
            {cnt:"好好",time:"2015-41-2"},{cnt:"好好",time:"2015-41-2"},
            {cnt:"好好",time:"2015-41-2"},{cnt:"好好",time:"2015-41-2"}];
    })

;