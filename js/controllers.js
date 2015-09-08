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
        $scope.SourceId = 0;

        $scope.doSearch = function () {
            var query = $scope.queryVal;
            $scope.newsList = NewsSvc.search(query);

        };

        $scope.getPageNews = function () {
            if (!isAll) {
                NewsSvc.getPageNews(pageIndex, pageSize, $scope.SourceId, $scope.keyWords).then(function (tem) {
                    if (!tem || tem.length < 1) {
                        isAll = true;
                        $scope.display = false;
                        return;
                    }
                    $scope.newsList = $scope.newsList.concat(tem);
                    pageIndex++;
                });

            }
        };

        $scope.onSelectSearchNews = function () {
            pageIndex = 1, pageSize = 10, isAll = false;
            $scope.newsList = [];
            $scope.display = true;
            $scope.getPageNews();
        }
        $scope.onInputSearchNews = function (dom) {

            pageIndex = 1, pageSize = 10, isAll = false;
            $scope.newsList = [];
            $scope.display = true;
            $scope.getPageNews();

        }
        $scope.onSelectSearchNews();
    })
    .controller("NewsCtrl", function ($scope, $stateParams, NewsSvc, CommentsSvc,FavoriteSvc) {
        var id = $stateParams.newsId;
        $scope.sayWords=false;
        NewsSvc.getNewsById(id).then(function (news) {
            $scope.News = news;
        });

        $scope.addFavorite=function(){
            if($scope.News.isMyFav){
                return;
            }
          var data={};
            data.keyId= $scope.News.id;
            data.type=1;

            FavoriteSvc.addFavorite(data).then(function(res){
               if(res=="1"){
                   $scope.News.isMyFav=true;
                   $scope.News.favCount++;
               }
            });
        };

        $scope.commentList = [{cnt: "好好", time: "2015-41-2"},
            {cnt: "好好", time: "2015-1-2"}, {cnt: "好好", time: "2015-41-2"},
            {cnt: "好好", time: "2015-41-2"}, {cnt: "好好", time: "2015-41-2"}];


        $scope.Comments = [];
        $scope.display = "";
        $scope.queryVal = "";
        var isAll = false, start = 1, end = 5;
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
        $scope.keyWords = "";
        $scope.orderType = 0;

        function getMyLawCase() {
            isAll = true;
            $scope.display = false;
            LawCaseSvc.getMyLawCase(1, 1000, $scope.keyWords).then(function (tem) {
                if (!tem || tem.length < 1) {
                    return;
                }
                $scope.MyLawCase = $scope.MyLawCase.concat(tem);

            });
        }

        function getAllLawCase() {
            LawCaseSvc.getAllLawCase(pageIndex, pageSize, $scope.keyWords).then(function (tem) {
                if (!tem || tem.length < 1) {
                    isAll = true;
                    $scope.display = false;
                    return;
                }
                $scope.MyLawCase = $scope.MyLawCase.concat(tem);
                pageIndex++;
            });
        }

        $scope.loadLCPages = function () {
            ismy ? getMyLawCase() : getAllLawCase();
        }

        $scope.onInputSearchLC = function (dom) {

            pageIndex = 1, pageSize = 10, isAll = false;
            $scope.MyLawCase = [];
            $scope.display = true;
            $scope.loadLCPages();

        };

        $scope.loadLCPages();

    })
    .controller("LawCaseDetailsCtrl", function ($scope, $stateParams, LawCaseSvc, CommentsSvc,FavoriteSvc) {
        var lcId = $stateParams.lcId;
        $scope.sayWords=false;
        $scope.LawCase;
        $scope.lcId = 1;
        $scope.display = "";
        $scope.lcFav={};
        $scope.getLawCaseByLcNo = function (no) {
            LawCaseSvc.getLawCaseByLcNo(no).then(function (lc) {
                $scope.LawCase = lc;
            });
        };

     function getLcFavorite(){
         LawCaseSvc.getLawCaseFavorite(lcId).then(function(res){
             $scope.lcFav=res;
         })
     }
        $scope.addFavorite= function () {
            if($scope.lcFav.isMyFav){
                return;
            }
            var data={};
            data.keyId= lcId;
            data.type=2;

            FavoriteSvc.addFavorite(data).then(function(res){
                if(res=="1"){
                    $scope.lcFav.isMyFav=true;
                    $scope.lcFav.favCount++;
                }
            });
        };

        $scope.likeLc=function(){
            var data={};
            data.lcNo=lcId;
            data.vote=1;
            LawCaseSvc.voteLawCase(data).then(function(res){
                if(res!=0){
                    if(res==1){
                        $scope.lcFav.unlikeCount--;
                        $scope.lcFav.likeCount++;
                    }
                    else if(res==2){
                        $scope.lcFav.likeCount++;
                    }
                }
            });
        };

        $scope.unlikeLc=function(){
            var data={};
            data.lcNo=lcId;
            data.vote=0;
            LawCaseSvc.voteLawCase(data).then(function(res){
                if(res!=0){
                    if(res==1){
                        $scope.lcFav.unlikeCount++;
                        $scope.lcFav.likeCount--;
                    }
                    else if(res==2){
                        $scope.lcFav.unlikeCount++;
                    }
                }
            });
        };

        $scope.getLawCaseByLcNo(lcId);
        getLcFavorite();
    })
    .controller("CaseLogCtrl", function ($scope, $window, $stateParams, AppData, CaseLogSvc) {
        var lcNo = $stateParams.lcNo;
        var rUrl = AppData.RemoteUrl;
        $scope.LogList = "";
        $scope.loadAllLog = loadAllLog;
        $scope.isShowBtn = true;
        $scope.logStates = [];
        $scope.lcNo = lcNo;
        function loadSates() {
            CaseLogSvc.getLogState(lcNo).then(function (data) {
                $scope.logStates = data;
            });
        }

        function loadAllLog() {
            CaseLogSvc.getAllLogs(lcNo).then(function (data) {
                getList(data);
            });
            $scope.isShowBtn = false;
        }

        function getList(data) {
            for (var i = 0; i < data.length; i++) {
                var date = data[i].date;
                var append_str = '';
                append_str += '<div class="timeBox"><h1>' + date + '</h1><div class="star"><img src="/img/caselog/time_star.png"></div><div class="timeline"><div class="line"></div></div><div class="txtBox">';

                var tempData = data[i].logs;
                for (var j = 0; j < tempData.length; j++) {
                    var author = '/img/caselog/';
                    switch (parseInt(tempData[j].type)) {
                        case 2:
                            author += "lsxx.png";
                            append_str += '<div class="item0 item1"><div class="txt"><h2>' + tempData[j].text + '</h2><span class="sj sj1"></span><span class="sj sj2"></span></div><div class="pic"><img src="' + author + '"></div></div>';
                            break;
                        case 1:
                            author += "ajjz.png";
                            var piclist = tempData[j].images.split('|');
                            var piclist_str = '';
                            for (var a = 0; a < piclist.length; a++) {

                                var img = rUrl + "Files/LogImg/" + piclist[a];

                                piclist_str += '<li><a href="' + img + '" class="swipebox" title=""><img src="' + img + '" alt="image"></a></li>';
                            }
                            append_str += '<div class="item0 item5"><div class="pic"><img src="' + author + '"></div><div class="txt"><h2>' + tempData[j].text + '</h2><ul>' + piclist_str + '</ul><span class="sj sj1"></span><span class="sj sj2"></span></div></div>';
                            break;
                        default:
                            break;
                    }
                }
                append_str += '</div></div>';
                $('#maindata').empty().append(append_str);
            }
        }

        function loadPage() {
            CaseLogSvc.getRecentlyLog(lcNo).then(function (data) {
                getList(data);
            });
        }

        $(document).ready(function () {
            loadPage();
            $('.swipebox').swipebox();
            loadSates();
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
    .controller("SetupCtrl", function ($scope, $state, $ionicHistory, $window, AppTools, localStorageService) {

        $scope.User = AppTools.getCurrentUser();
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
            //$state.go('app.catalogs', null, {location: 'replace'});
            $window.location.reload(true);
        }

        function goToLogin() {
            $state.go('app.login');
        }
    })
    .controller("GetHelpCtrl", function ($scope, $state,$ionicPopup, LawCaseSvc,SalvationSvc) {
        $scope.MyLawCase = [];
        $scope.display = "";
        $scope.applyData={};
        $scope.getMyLawCase = function () {
                var tem = LawCaseSvc.getMyLawCase(1,1000,"").then(function (res) {
                    $scope.MyLawCase=res;
                    $scope.MyLawCase.error=!res.length;
                });

        };
        $scope.getMyLawCase();
        $scope.doApplyHelp=function(){
            SalvationSvc.addApplySalvation($scope.applyData).then(function(res){
                if(res==1){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '提交成功，请等待审核。'
                    });
                    alertPopup.then(function(res) {
                        $state.go('app.setup', {}, {location:'replace'});
                    });
                }
            })
        }


    })
    .controller('ChatforLCCtrl', function ($scope, $timeout, $stateParams, $ionicScrollDelegate, ChatSvc, AppTools) {
        $scope.messages = [];
        var lcNo = $stateParams.lcNo;
        $scope.showTime = true;
        var user = AppTools.getCurrentUser();
        var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        $scope.sendMessage = function () {
            if (!$scope.data.message) return;
            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

            var data = {
                message: $scope.data.message,
                lcNo: lcNo
            };

            ChatSvc.sendMessage(data).then(function (response) {
                var r = response;
                $scope.messages.push({
                    userId: user.id,
                    message: data.message,
                    createTime: d
                });
            });

            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        };
        ChatSvc.getHistory(lcNo).then(function (response) {
            $scope.messages = response;
        });
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

        function loadHistory() {
            ChatSvc.getHistory(lcNo).then(function (response) {
                $scope.messages = response;
            })
        }

        $scope.loadHistory = loadHistory;
        $scope.data = {};
        $scope.myId = user.id;
        loadHistory();

    })
    .controller("RelatedCaseCtrl", function ($scope, $ionicActionSheet, $ionicPopover, $stateParams, SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.rcList = [];
        $scope.rcSelected = {};

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
            for (var i = 0; i < $scope.rcList.length; i++) {
                if ($scope.rcList[i].id == id) {
                    $scope.rcSelected = $scope.rcList[i];
                }
            }
            $scope.closeSelectModal();
        };

        SolutionSvc.getRelatedCase(sNo).then(function (data) {
            $scope.rcList = data;
            $scope.rcSelected = data[0];
        });

    })
    .controller("MainViewCtrl", function ($scope, $ionicActionSheet, $ionicPopover, $stateParams, SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.rcList = [];
        $scope.rcSelected = {};

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
            for (var i = 0; i < $scope.rcList.length; i++) {
                if ($scope.rcList[i].id == id) {
                    $scope.rcSelected = $scope.rcList[i];
                }
            }
            $scope.closeSelectModal();
        };

        SolutionSvc.getMainView(sNo).then(function (data) {
            $scope.rcList = data;
            $scope.rcSelected = data[0];
        });

    })
    .controller("LegalBasisCtrl", function ($scope, $ionicActionSheet, $ionicPopover, $stateParams, SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.rcList = [];
        $scope.rcSelected = {};

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
            for (var i = 0; i < $scope.rcList.length; i++) {
                if ($scope.rcList[i].id == id) {
                    $scope.rcSelected = $scope.rcList[i];
                }
            }
            $scope.closeSelectModal();
        };

        SolutionSvc.getLegalBasis(sNo).then(function (data) {
            $scope.rcList = data;
            $scope.rcSelected = data[0];
        });

    })

    .controller("FavoriteCtrl",function($scope,$stateParams,FavoriteSvc){
        var type=$stateParams.type;
        $scope.keyWords="";
        $scope.favorites=[];
        FavoriteSvc.getMyFavorite(type).then(function(res){
            $scope.favorites=res;
        });

        $scope.onInputSearchNews=function(key){
            FavoriteSvc.getMyFavorite(type,key).then(function(res){
                $scope.favorites=res;
            });
        }
    })

    .controller("MessageCtrl",function($scope,MessageSvc){
        var isAll = false, pageIndex = 1, pageSize = 10;
        $scope.messageList=[];
        $scope.loadPage=function() {
          if (!isAll) {
              MessageSvc.getMyMessages(pageIndex, pageSize, $scope.keyWords).then(function (res) {
                  if (!res || res.length <10) {
                      isAll = true;
                      $scope.display = false;
                      $scope.messageList = $scope.messageList.concat(res);
                      return;
                  }
                  isAll = false;
                  $scope.display = true;
                  $scope.messageList = $scope.messageList.concat(res);
                  pageIndex++;
              });
          }
      }
        $scope.onInputSearchNews = function (dom) {

            pageIndex = 1, pageSize = 10, isAll = false;
            $scope.messageList = [];
            $scope.display = true;
            $scope.loadPage();

        };
        $scope.loadPage();
      })
    .controller("SFocusCtrl", function ($scope, $stateParams, SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.Focus = "";
        SolutionSvc.getFocus(sNo).then(function (data) {
            $scope.Focus = data;
        })

    })
    .controller("SJudgeGistCtrl", function ($scope, $stateParams, SolutionSvc) {
        var sNo = $stateParams.sNo;
        $scope.JudgeGist = "";
        SolutionSvc.getJudgeGist(sNo).then(function (data) {
            $scope.JudgeGist = data;
        })

    })

    .controller("ApplyCertificateCtrl", function ($scope,$window,$ionicPopup, $state, ApplyCertSvc,RegionSvc) {

        $scope.ApplyState=-1;
        function loadPage(){
            ApplyCertSvc.getUserApplyState().then(function(res){
                $scope.ApplyState=res;
            });

            RegionSvc.getProvinces().then(function(res){
                $scope.provinces=res;
            });
        }

        $scope.getCities=function(pid){
            RegionSvc.getCities(pid).then(function(res){
                $scope.cities=res;
            });
        }

        $scope.formModel = {
            city:0,
            address:"",
            realName:"",
            sex:1,
            contact:"",
            certificateNo:"",
            lawerType:1,
            workYears:1,
            majors:""
        };
        $scope.cities=[];
        $scope.provinces=[{id:1,name:"北京"},{id:2,name:"山西"}];
        $scope.majors=[{id:1,name:"专业一"},{id:2,name:"专业二"}];

        $scope.doApply=function(){

            var mid=[];
            $scope.majors.forEach(function(e,i){
                if(e.checked){
                    mid.push(e.id);
                }
            });
            $scope.formModel.majors=mid.join(",");
            console.log($scope.formModel);

            ApplyCertSvc.addApplyCert($scope.formModel).then(function(res){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '提交成功，请等待审核。'
                });
                alertPopup.then(function(res) {
                    $state.go('app.setup', {}, {location:'replace'});
                });
            })
        };

        loadPage();

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

    .controller("ChangePwd", function ($scope, $ionicModal, $timeout, $http, $state, $ionicHistory, $ionicPopup, AppData, LoadingScreenService, authService) {
        $scope.loginData = {};

        $scope.formModel = {};
        $scope.doChange = changePwd;


        function changePwd() {
            $scope.formModel.erro = "";
            var data = {
                oldPwd: $scope.formModel.oldpwd,
                newPwd: $scope.formModel.newpwd
            }

            if ($scope.formModel.newpwd !== $scope.formModel.newpwd2) {
                $scope.formModel.error = "两次输入密码不一致！！！";
                return;
            }

            authService.changePasswordWord(data).then(success, error);

            function success(response) {
                if (response == "0") {
                    $scope.formModel.error = "原密码输入错误！！！";
                    return;
                }
                clearForm();

                var alertPopup = $ionicPopup.alert({
                    title: '提示！',
                    template: '您需要重新登陆'
                });
                alertPopup.then(function (res) {

                    //提示重新登陆 todo
                    $ionicHistory.nextViewOptions({
                        disableAnimate: false,
                        disableBack: true
                    });
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                    $state.go('app.login', null, {location: 'replace'});
                });
            };


        }

        function error(data, status) {
            $scope.formModel.errors = {};
            clearForm();
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

        function clearForm() {
            $scope.formModel.error = "";
            $scope.formModel.oldpwd = "";
            $scope.formModel.newpwd = "";
        }


    })
;