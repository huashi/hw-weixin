/**
 * Created by Administrator on 2015/3/31.
 */
angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $q) {
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
    .controller("CatalogsCtrl", function ($scope, $ionicActionSheet, $ionicHistory, Catalogs) {

        //  $ionicHistory.clearHistory();
        $scope.getAll = function () {
            return Catalogs.all();
        };

        $scope.show =
            function (e) {
                //console.log(e.srcElement);
                $ionicActionSheet.show({
                    titleText: 'ActionSheet Example',
                    buttons: [
                        {text: '<i class="icon ion-share balanced"></i> Share'},
                        {text: '<i class="icon ion-arrow-move assertive"></i> Move'},
                        {text: ' <button class="button action-sheet-option ng-binding" ng-click="buttonClicked($index)" ng-repeat="b in buttons" ng-bind-html="b.text">Show Page Settings</button>'}
                    ],
                    destructiveText: 'Delete',
                    cancelText: 'Cancel',
                    cancel: function () {
                        console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        console.log('BUTTON CLICKED', index);
                        return true;
                    },
                    destructiveButtonClicked: function () {
                        console.log('DESTRUCT');
                        return true;
                    }
                });

            };

    })
    .controller("FyListCtrl", function ($scope, $q, $ionicModal, $http, $timeout, $ionicBackdrop, FyList) {
        $scope.searchReg = "";
        $scope.fyList = FyList.search();
        $scope.queryData = {};

        $scope.getAll = function () {
            return FyList.all();
        };
        $scope.doSearch = function () {
            var deferred = $q.defer();
            var query = document.querySelector("#queryReg").value;
            var fyList = FyList.search(query);
            deferred.resolve(fyList);

            console.log(deferred.promise);
            deferred.promise.then(function (data) {
                $scope.fyList = data;
                console.log($scope.fyList);
            });

        };
        $scope.clearSearch = function (dom) {
            console.log(dom);
            document.querySelector("#queryReg").value = "";
            $scope.fyList = FyList.search();
        };


        $scope.doBackDrop = function () {
            $ionicBackdrop.retain();
            $timeout(function () {
                $ionicBackdrop.release();
            }, 3000);
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

        $scope.doScroll = function () {
            $scope.items = [1, 2, 3];
            $scope.doRefresh = function () {
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
    .controller("FyEditCtrl", function ($scope, $ionicPopup, $timeout) {
        $scope.data = {};
        $scope.onHold = function () {

            var popup = $ionicPopup.show({
                template: "<input type='password' ng-model='data.wifi'>",
                title: "填写wifi密码",
                subTitle: "使用常用字符",
                scope: $scope,
                buttons: [
                    {text: "取消00"},
                    {text: "No取消"},
                    {
                        text: "<b>保存</b>",
                        type: "button-positive",
                        onTap: function (e) {
                            console.log(111);
                            if (!$scope.data.wifi) {
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }
                ]

            });

            popup.then(function (res) {
                console.log(res);
            });
            $timeout(function () {
                popup.close();
            }, 15000);

        };
    })
    .controller("browseCtrl", function ($scope, $ionicPopover) {
        //todo 有错误
        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplate(template, {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };

        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function () {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function () {
            // Execute action
        });
    })
    .controller("NewsListCtrl", function ($scope, NewsSvc) {
        var pageIndex = 1, pageSize = 10, isAll = false;
        $scope.newsList = [];
        $scope.display = true;
        $scope.keyWords = "";
        $scope.SourceId=0;

        $scope.doSearch = function () {
            var query = $scope.queryVal;
            $scope.newsList = NewsSvc.search(query);

        };

        $scope.getPageNews = function () {
            if (!isAll) {
                 NewsSvc.getPageNews(pageIndex, pageSize,$scope.SourceId,$scope.keyWords).then(function(tem){
                     if (!tem || tem.length < 1) {
                         isAll = true;
                         $scope.display=false;
                         return;
                     }
                     $scope.newsList = $scope.newsList.concat(tem);
                     pageIndex++;
                 });

            }
        };

        $scope.onSelectSearchNews=function(){
            pageIndex = 1, pageSize = 10, isAll = false;
            $scope.newsList = [];
            $scope.display = true;
            $scope.getPageNews();
        }
        $scope.onInputSearchNews=function(dom){

                pageIndex = 1, pageSize = 10, isAll = false;
                $scope.newsList = [];
                $scope.display = true;
                $scope.getPageNews();

        }
        $scope.onSelectSearchNews();
    })
    .controller("NewsCtrl", function ($scope, $stateParams, NewsSvc, CommentsSvc) {
        var id = $stateParams.newsId;
         NewsSvc.getNewsById(id).then(function(news){
             $scope.News=news;
        });

        $scope.commentList = [{cnt: "好好", time: "2015-41-2"},
            {cnt: "好好", time: "2015-1-2"}, {cnt: "好好", time: "2015-41-2"},
            {cnt: "好好", time: "2015-41-2"}, {cnt: "好好", time: "2015-41-2"}];



        $scope.Comments = [];
        $scope.display = "";
        $scope.queryVal = "";
       var isAll=false,start= 1,end=5;
        $scope.getMessages = function () {
            if (!isAll) {
                var tem = CommentsSvc.getPageMessage(start, end);
                if (!tem || tem.length == 0) {
                    isAll = true;
                    $scope.display = "none";
                    return;
                }
                $scope.Comments = $scope.Comments.concat(tem);
                start = end;
                end += 5;
            }
        };
        $scope.getMessages();
    })
    .controller("LawCaseCtrl", function ($scope, $stateParams, LawCaseSvc, AppData) {

        var pageIndex = 1, pageSize = 10, isAll = false, ismy = ($stateParams.sign == "my");
        $scope.MyLawCase = [];
        $scope.display = true;
        $scope.navTitle = ismy ? "我的案件" : "所有案件";
        $scope.keyWords="";
        $scope.orderType=0;

        function getMyLawCase() {
            var uid = ismy ? AppData.User.ID : 0;
            isAll = true;
            $scope.display=false;
            LawCaseSvc.getMyLawCase(1, 1000,$scope.keyWords).then(function(tem){
                if (!tem || tem.length < 1) {
                    return;
                }
                $scope.MyLawCase = $scope.MyLawCase.concat(tem);

            });
        }

        function getAllLawCase(){
            LawCaseSvc.getAllLawCase(pageIndex, pageSize,$scope.keyWords).then(function(tem){
                if (!tem || tem.length < 1) {
                    isAll = true;
                    $scope.display=false;
                    return;
                }
                $scope.MyLawCase = $scope.MyLawCase.concat(tem);
                pageIndex++;
            });
        }

        $scope.loadLCPages=function(){
            ismy?getMyLawCase():getAllLawCase();
        }

        $scope.onInputSearchLC=function(dom){

                pageIndex = 1, pageSize = 10, isAll = false;
                $scope.MyLawCase = [];
                $scope.display = true;
                $scope.loadLCPages();

        };

        $scope.loadLCPages();

    })
    .controller("LawCaseDetailsCtrl", function ($scope, $stateParams,LawCaseSvc, CommentsSvc) {
        var lcId = $stateParams.lcId;
        $scope.LawCase;
        $scope.lcId = 1;
        $scope.display = "";
        $scope.getLawCaseByLcNo = function (no) {
            LawCaseSvc.getLawCaseByLcNo(no).then(function(lc){
                $scope.LawCase=lc;
            });
        };
        $scope.getLawCaseByLcNo(lcId);
    })
    .controller("CaseLogCtrl", function ($scope, $window, CaseLogSvc) {

        $scope.LogList = "";
        $scope.loadPage = loadPage;

        var page = 1, total = 0;

        function getList(data) {
            if (!data) {
                $('.more').html('数据已经全部加载完').show();
                return false;
            }
            for (var date in data) {

                var append_str = '';
                append_str += '<div class="timeBox"><h1>' + date + '</h1><div class="star"><img src="http://mat1.gtimg.com/cd/2015/xckb/time_star.png"></div><div class="timeline"><div class="line"></div></div><div class="txtBox">';

                var tempData = data[date];
                for (var j = 0; j < tempData.length; j++) {


                    var author = '/img/caselog/' + tempData[j].author;

                    switch (parseInt(tempData[j].type)) {
                        case 1:
                            append_str += '<div class="item0 item1"><div class="txt"><h2>' + tempData[j].content + '</h2><span class="sj sj1"></span><span class="sj sj2"></span></div><div class="pic"><img src="' + author + '"></div></div>';
                            break;
                        case 2:
                            var piclist = tempData[j].piclist.split(',');
                            var piclist_str = '';
                            for (var a = 0; a < piclist.length; a++) {
                                piclist_str += '<li><a href="' + piclist[a] + '" class="swipebox" title=""><img src="' + piclist[a] + '" alt="image"></a></li>';
                            }
                            append_str += '<div class="item0 item1"><div class="txt"><h2>' + tempData[j].content + '</h2><ul>' + piclist_str + '</ul><span class="sj sj1"></span><span class="sj sj2"></span></div><div class="pic"><img src="' + author + '"></div></div>';
                            break;
                        case 3:
                            append_str += '<div class="item0 item2"><div class="pic"><img src="' + author + '"></div><div class="txt"><h2>' + tempData[j].content + '</h2><span class="sj sj1"></span><span class="sj sj2"></span></div></div>';
                            break;
                        case 4:
                            append_str += '<div class="item0 item3"><div class="pic"><img src="' + author + '"></div><div class="txt"><div class="tp"><img src="' + tempData[j].pic + '"></div><h2>' + tempData[j].title + '</h2><p>' + tempData[j].content + '</p><span class="sj sj1"></span><span class="sj sj2"></span><div class="link"><a href="' + tempData[j].link + '">全文</a></div></div></div>';
                            break;
                        case 5:
                            append_str += '<div class="item0 item4"><div class="pic"><img src="' + author + '"></div><div class="txt"><h2>' + tempData[j].title + '</h2><div class="tp"><img src="' + tempData[j].pic + '"></div><p>' + tempData[j].content + '</p><div class="link"><a href="' + tempData[j].link + '">全文</a></div><span class="sj sj1"></span><span class="sj sj2"></span></div></div>';
                            break;
                        case 6:
                            var piclist = tempData[j].piclist.split(',');
                            var piclist_str = '';
                            for (var a = 0; a < piclist.length; a++) {

                                piclist[a] = "/img/caselog/content/" + piclist[a];

                                piclist_str += '<li><a href="' + piclist[a] + '" class="swipebox" title=""><img src="' + piclist[a] + '" alt="image"></a></li>';
                            }
                            append_str += '<div class="item0 item5"><div class="pic"><img src="' + author + '"></div><div class="txt"><h2>' + tempData[j].content + '</h2><ul>' + piclist_str + '</ul><span class="sj sj1"></span><span class="sj sj2"></span></div></div>';
                            break;
                        default:
                            break;
                    }
                }
                append_str += '</div></div>';
                $('#maindata').append(append_str);
            }
        }

        function loadPage() {
            if (total > 0 && page > total) {
                $('.more').html('数据已经全部加载完').show();
                return false;
            }

            var R = CaseLogSvc.all();
            if (total == 0) {
                total = R.pages.total;
            }
            if (R.list && R.pages.page <= R.pages.total) {
                getList(R.list);
                page++;
            }
        }

        $(document).ready(function () {
            loadPage();
            $('.swipebox').swipebox();
        });

    })
    .controller("Q2LawerCtrl", function ($scope, $ionicModal) {
        $ionicModal.fromTemplateUrl('templates/comment-area.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.closeCommentArea = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.opencommentArea = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doSendComment = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })
    .controller("Calculator01Ctrl", function ($scope, $ionicScrollDelegate) {
        $scope.scrollTop = function () {
            $ionicScrollDelegate.scrollTop(true);
        };

        $scope.getScrollPosition = function () {
            //monitor the scroll
            $scope.moveData = $ionicScrollDelegate.getScrollPosition().top;
            console.log($scope.moveData);
            if ($scope.moveData >= 50) {
                $('.back-top').fadeIn();
            } else if ($scope.moveData < 50) {
                $('.back-top').hide();
            }

        };
    })
    .controller("SetupCtrl", function ($scope, $state,$ionicHistory, AppTools,localStorageService) {

        $scope.loginData = {};

        $scope.isLogined = AppTools.IsAuthenticatedUser();

        $scope.goToSignout = goToSignout;
        $scope.goToLogin = goToLogin;

//----------------------------------------------------------------------------/

        //if ( localStorage.isAuthenticated == "true" ) {
        //    $state.go('UserAppsView');
        //} else {
        //    ionic.Platform.ready(function(){
        //        if ( ionic.Platform.isWebView() ) navigator.splashscreen.hide();
        //    });
        //}

//----------------------------------------------------------------------------/

        function goToSignout() {
            //$http.get(HOST_NAME + '/logout');
            localStorageService.remove("authorizationData");
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            $state.go('app.catalogs', null, {location: 'replace'});
        }

        function goToLogin() {
            $state.go('app.login');
        }
    })
    .controller("GetHelpCtrl", function ($scope, $stateParams, LawCase) {
        var userid = $stateParams.uid;
        var start = 1, end = 10, isAll = false;
        $scope.MyLawCase = [];
        $scope.display = "";
        $scope.getMyLawCase = function () {
            if (!isAll) {
                var tem = LawCase.getMyLawCase(1);
                if (!tem || tem.length == 0) {
                    isAll = true;
                    $scope.display = "none";
                    return;
                }
                $scope.MyLawCase = $scope.MyLawCase.concat(tem);
                start = end;
                end *= 2;
            }
        };
        $scope.getMyLawCase();

    })
    .controller('ChatforLCCtrl', function ($scope, $timeout, $ionicScrollDelegate, ChatSvc, AppData) {

        $scope.showTime = true;

        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        $scope.sendMessage = function () {

            if (!$scope.data.message) return;

            alternate = !alternate;

            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

            $scope.messages.push({
                userId: alternate ? '12345' : '54321',
                text: $scope.data.message,
                time: d
            });

            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        };

        $scope.inputKeydown = function () {
            var evt = window.event;
            if (evt.which == 13 || evt.keyCode == 13) {
                $scope.sendMessage();
                $scope.closeKeyboard();
            }
        }

        $scope.inputUp = function () {
            if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function () {
                $ionicScrollDelegate.scrollBottom(true);
            }, 300);

        };

        $scope.inputDown = function () {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
        };

        $scope.closeKeyboard = function () {
            // cordova.plugins.Keyboard.close();
        };


        $scope.data = {};
        $scope.myId = AppData.User.ID;
        $scope.messages = ChatSvc.all();

    })
    .controller("RelatedCaseCtrl", function ($scope, $ionicActionSheet, $ionicPopover,$stateParams,SolutionSvc) {
        var sNo = $stateParams.sNo;
         $scope.rcList=[];
         $scope.rcSelected={};

        $ionicPopover.fromTemplateUrl('modallist.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.modal = popover;
        });

        $scope.show = function (e) {
            $scope.modal.show();
        };

        $scope.closeSelectModal = function () {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function (id) {
            $scope.modal.remove();
        });

        $scope.clickItem = function (id) {
            for(var i=0;i<$scope.rcList.length;i++){
                if($scope.rcList[i].id==id){
                    $scope.rcSelected=$scope.rcList[i];
                }
            }
            $scope.closeSelectModal();
        };

        SolutionSvc.getRelatedCase(sNo).then(function(data){
            $scope.rcList=data;
            $scope.rcSelected=data[0];
        });

    })
    .controller("MainViewCtrl", function ($scope, $ionicActionSheet, $ionicPopover,$stateParams,SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.rcList=[];
        $scope.rcSelected={};

        $ionicPopover.fromTemplateUrl('modallist.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.modal = popover;
        });

        $scope.show = function (e) {
            $scope.modal.show();
        };

        $scope.closeSelectModal = function () {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function (id) {
            $scope.modal.remove();
        });

        $scope.clickItem = function (id) {
            for(var i=0;i<$scope.rcList.length;i++){
                if($scope.rcList[i].id==id){
                    $scope.rcSelected=$scope.rcList[i];
                }
            }
            $scope.closeSelectModal();
        };

        SolutionSvc.getMainView(sNo).then(function(data){
            $scope.rcList=data;
            $scope.rcSelected=data[0];
        });

    })
    .controller("LegalBasisCtrl", function ($scope, $ionicActionSheet, $ionicPopover,$stateParams,SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.rcList=[];
        $scope.rcSelected={};

        $ionicPopover.fromTemplateUrl('modallist.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.modal = popover;
        });

        $scope.show = function (e) {
            $scope.modal.show();
        };

        $scope.closeSelectModal = function () {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function (id) {
            $scope.modal.remove();
        });

        $scope.clickItem = function (id) {
            for(var i=0;i<$scope.rcList.length;i++){
                if($scope.rcList[i].id==id){
                    $scope.rcSelected=$scope.rcList[i];
                }
            }
            $scope.closeSelectModal();
        };

        SolutionSvc.getLegalBasis(sNo).then(function(data){
            $scope.rcList=data;
            $scope.rcSelected=data[0];
        });

    })


    .controller("SFocusCtrl", function ($scope,$stateParams, SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.Focus="";
        SolutionSvc.getFocus(sNo).then(function(data){
            $scope.Focus=data;
        })

    })
    .controller("SJudgeGistCtrl", function ($scope,$stateParams, SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.JudgeGist="";
        SolutionSvc.getJudgeGist(sNo).then(function(data){
            $scope.JudgeGist=data;
        })

    })

    .controller("LoginCtrl", function ($scope, $ionicModal, $timeout, $http, $state, $ionicHistory, AppData, LoadingScreenService, authService) {

        $scope.loginData = {};

//----------------------------------------------------------------------------///
        $scope.formModel = {};
        $scope.doLogin = login;


        function login() {

            var data = {
                grant_type: "password",
                userName: $scope.formModel.uname,
                password: $scope.formModel.pass
            }
            authService.login(data, success, error);

            function success() {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
                $state.go('app.catalogs', null, {location: 'replace'});

            }

            function error(data, status) {
                $scope.formModel.errors = {};

                //$ionicHistory.clearHistory()
                // $ionicHistory.clearCache();

                if (status == 401 || status == 400) {
                    $scope.formModel.error = "用户名或者密码错误!!!";
                } else if (status === 0 || status === 404) {
                    $scope.formModel.error = "连接错误!!!";
                } else {
                    $scope.formModel.error = "意外错误!!!错误码：" + status;
                }
            }
        }

    })
;