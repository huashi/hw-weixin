/**
 * Created by Administrator on 2015/3/31.
 */
angular.module('starter', ['ionic', 'starter.controllers', "starter.services", "starter.common","starter.filter"])

    .run(function ($ionicPlatform, $ionicPopup, $rootScope, $location) {
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
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,$provide) {

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
            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: 'LoginCtrl'
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
            .state("app.newsList", {
                url: "/newslist",
                views: {
                    "menuContent": {
                        templateUrl: "templates/newslist.html",
                        controller: "NewsListCtrl"
                    }
                }

            })
            .state("app.news", {
                url: "/newslist/:newsId",
                views: {
                    "menuContent": {
                        templateUrl: "templates/news.html",
                        controller: "NewsCtrl"
                    }
                }
            })
            .state("app.lawcaselist", {
                url: "/lawcaselist/:sign",
                views: {
                    "menuContent": {
                        templateUrl: "templates/lawcaselist.html",
                        controller: "LawCaseCtrl"
                    }
                }
            })
            .state("app.mylawlist", {
                url: "/mylawlist/:sign",
                views: {
                    "menuContent": {
                        templateUrl: "templates/mylawlist.html",
                        controller: "LawCaseCtrl"
                    }
                }
            })
            .state("app.lawcase-details", {
                url: "/lawcase-details/:lcId",
                views: {
                    "menuContent": {
                        templateUrl: "templates/lawcase-details.html",
                        controller: "LawCaseDetailsCtrl"
                    }
                }
            })
            .state("app.caselog", {
                url: "/caselog/:lcNo",
                views: {
                    "menuContent": {
                        templateUrl: "templates/caselog.html",
                        controller: "CaseLogCtrl"
                    }
                }
            })
            .state("app.q2lawer", {
                url: "/q2lawer",
                views: {
                    "menuContent": {
                        templateUrl: "templates/Q2Lawer.html",
                        controller: "Q2LawerCtrl"
                    }
                }
            })
            .state("app.calculator01", {
                url: "/calculator01",
                views: {
                    "menuContent": {
                        templateUrl: "templates/calculator-01.html",
                        controller: "Calculator01Ctrl"
                    }
                }
            })
            .state("app.setup", {
                url: "/setup",
                views: {
                    "menuContent": {
                        templateUrl: "templates/setup.html",
                        controller: "SetupCtrl"
                    }
                }
            })
            .state("app.help-note", {
                url: "/help-note",
                views: {
                    "menuContent": {
                        templateUrl: "templates/gethelp-note.html",
                        controller: ""
                    }
                }
            })
            .state("app.message", {
                cache: false,
                url: "/message",
                views: {
                    "menuContent": {
                        templateUrl: "templates/myMessage.html",
                        controller: "MessageCtrl"
                    }
                }
            })
            .state("app.gethelp", {
                cache: false,
                url: "/gethelp",
                views: {
                    "menuContent": {
                        templateUrl: "templates/gethelp.html",
                        controller: "GetHelpCtrl"
                    }
                }
            })

            .state("app.chatforLC", {
                url: "/chatforLC/:lcNo",
                views: {
                    "menuContent": {
                        templateUrl: "templates/chatforLC.html",
                        controller: "ChatforLCCtrl"
                    }
                }
            })


            .state("app.websites", {
                url: "/websites",
                views: {
                    "menuContent": {
                        templateUrl: "templates/websites.html",
                        controller: ""
                    }
                }
            })
            .state("app.lcRelatedCase", {
                url: "/lcRelatedCase/:sNo",
                views: {
                    "menuContent": {
                        templateUrl: "templates/lcRelatedCase.html",
                        controller: "RelatedCaseCtrl"
                    }
                }
            })
            .state("app.lcMainView", {
                url: "/lcMainView/:sNo",
                views: {
                    "menuContent": {
                        templateUrl: "templates/lcMainView.html",
                        controller: "MainViewCtrl"
                    }
                }
            })
            .state("app.lcLegalBasis", {
                url: "/lcLegalBasis/:sNo",
                views: {
                    "menuContent": {
                        templateUrl: "templates/lcLegalBasis.html",
                        controller: "LegalBasisCtrl"
                    }
                }
            })
            .state("app.lcFoucs", {
                url: "/lcFoucs/:sNo",
                views: {
                    "menuContent": {
                        templateUrl: "templates/lcFoucs.html",
                        controller: "SFocusCtrl"
                    }
                }
            })
            .state("app.lcJudgeGist", {
                url: "/lcJudgeGist/:sNo",
                views: {
                    "menuContent": {
                        templateUrl: "templates/lcJudgeGist.html",
                        controller: "SJudgeGistCtrl"
                    }
                }
            }) .state("app.changePassword", {
                url: "/changePassword",
                views: {
                    "menuContent": {
                        templateUrl: "templates/changePassword.html",
                        controller: "ChangePwd"
                    }
                }
            }).state("app.apply-certificate", {
               // cache: false,
                url: "/apply-certificate",
                views: {
                    "menuContent": {
                        templateUrl: "templates/apply-certificate.html",
                        controller: "ApplyCertificateCtrl"
                    }
                }
            })
            .state("app.upload-lawcase", {
                cache: false,
                url: "/upload-lawcase",
                views: {
                    "menuContent": {
                        templateUrl: "templates/upload-lawcase.html",
                        controller: "UploadLcCtrl"
                    }
                }
            })
            .state("app.favorites",{
                url: "/favorites/:type",
                views: {
                    "menuContent": {
                        templateUrl: "templates/MyFavorites.html",
                        controller: "FavoriteCtrl"
                    }
                }
            })
            .state("app.contact",{
                url: "/contact",
                views: {
                    "menuContent": {
                        templateUrl: "templates/contact.html",
                        controller: ""
                    }
                }
            })
            .state("app.focus",{
                url: "/focus/:type",
                views: {
                    "menuContent": {
                        templateUrl: "templates/myFocus.html",
                        controller: "FavoriteCtrl"
                    }
                }
            })
            .state("app.lawermajors",{
                url: "/lawerMajors",
                views: {
                    "menuContent": {
                        templateUrl: "templates/lawerMajors.html",
                        controller: "ApplyCertificateCtrl"
                    }
                }
            })
            .state("app.legalKnowledge",{
                url: "/legalKnowledge",
                views: {
                    "menuContent": {
                        templateUrl: "templates/legalKnowledge.html",
                        controller: "lkListCtrl"
                    }
                }
            })
            .state("app.undowork", {
                url: "/undowork",
                views: {
                    "menuContent": {
                        templateUrl: "templates/undowork.html",
                        controller: ""
                    }
                }
            })
        ;


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/catalogs');

        $provide.decorator('$ionicLoading', function($delegate, $timeout) {
            var show = $delegate.show;
            var hide = $delegate.hide;
            var hidePromise;

            $delegate.show = function() {
                if ( arguments[0] && arguments[0].duration !== undefined ) {
                    $timeout.cancel(hidePromise);
                    hidePromise = $timeout( $delegate.hide, arguments[0].duration );
                    delete arguments[0].duration;
                }
                document.body.classList.add('loading-open');
                return show.apply($delegate, arguments);
            };
            $delegate.hide = function() {
                document.body.classList.remove('loading-open');
                return hide.apply($delegate, arguments);
            };
            return $delegate;
        });

    })
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})

