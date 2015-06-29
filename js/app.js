/**
 * Created by Administrator on 2015/3/31.
 */
angular.module('starter', ['ionic', 'starter.controllers', "starter.services","starter.common"])

    .run( function ($ionicPlatform, $ionicPopup, $rootScope, $location) {
//todo 暂时不起作用
        //主页面显示退出提示框
        $ionicPlatform.registerBackButtonAction(function (e) {

            e.preventDefault();

            function showConfirm() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    } else {
                        // Don't close
                    }
                });
            }

            // Is there a page to go back to?
            if ($location.path() == '/app') {
                showConfirm();
            } else if ($rootScope.$viewHistory.backView) {
                console.log('currentView:', $rootScope.$viewHistory.currentView);
                // Go back in history
                $rootScope.$viewHistory.backView.go();
            } else {
                // This is the last page: Show confirmation popup
                showConfirm();
            }

            return false;
        }, 101);

    })
    .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        $stateProvider.state("app", {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: "AppCtrl"
        })
            .state("app.search", {
                url: "/search",
                views: {
                    "menuContent": {
                        templateUrl: "templates/search.html"
                    }
                }
            })
            .state("app.browse", {
                url: "/browse",
                views: {
                    "menuContent": {
                        templateUrl: "templates/browse.html",
                        controller: "browseCtrl"
                    }
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state("app.catalogs", {
                url: "/catalogs",
                views: {
                    "menuContent": {
                        templateUrl: "templates/catalogs.html",
                        controller: "CatalogsCtrl"
                    }
                }
            })
            .state("app.fySearch", {
                url: "/fy-search",
                views: {
                    "menuContent": {
                        templateUrl: "templates/fy-search.html",
                        controller: "FyListCtrl"
                    }
                }
            })
            .state("app.fyEdit", {
                url: "/fysearch/:fyid",
                views: {
                    "menuContent": {
                        templateUrl: "templates/fy-edit.html",
                        controller: "FyEditCtrl"
                    }
                }
            })
            .state("app.newsList",{
                url:"/newslist",
                views:{
                    "menuContent":{
                        templateUrl:"templates/newslist.html",
                        controller:"NewsListCtrl"
                    }
                }

            })
            .state("app.news",{
                url:"/newslist/:newsId",
                views:{
                    "menuContent":{
                        templateUrl:"templates/news.html",
                        controller:"NewsCtrl"
                    }
                }
            })
            .state("app.lawcaselist",{
                url:"/lawcaselist",
                views:{
                    "menuContent":{
                        templateUrl:"templates/lawcaselist.html",
                        controller:"LawCaseCtrl"
                    }
                }
            })
            .state("app.lawcase-details",{
                url:"/lawcase-details/:lcId",
                views:{
                    "menuContent":{
                        templateUrl:"templates/lawcase-details.html",
                        controller:"LawCaseDetailsCtrl"
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/catalogs');
    })
