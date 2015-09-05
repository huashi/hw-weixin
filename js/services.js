/**
 * Created by Administrator on 2015/3/31.
 */
angular.module("starter.services", [])
    .factory('localStorageService', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            remove:function(key){
                $window.localStorage.removeItem(key);
            }
        }
    }])
    .factory("Plays", function () {
        var plays = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];

        return {
            all: function () {
                return plays;
            }
        }

    })
    .factory("Catalogs", function () {
        var catalogs = [
            {title: "防疫档案", url: ""},
            {title: "耳标发放采集", url: ""},
            {title: "首免录入采集", url: ""},
            {title: "集中免疫录入", url: ""},
            {title: "集中免疫计划制定", url: ""},
            {title: "养殖追溯查询", url: ""}
        ];
        return {
            all: function () {
                return catalogs;
            }
        }
    })
    .factory("FyList", function () {
        var fyList = [
            {color: "test1.jpg", region: "第一步：将适量胡萝卜磨碎，将芹菜和西红柿切丁", zs: "一组", date: "2014/8/3 12:20:00"},
            {color: "test1.jpg", region: "第二步：加热煎锅，放少许花生油，加入一些葱花翻炒一会，不停翻炒防止葱花煎焦", zs: "一组1", date: "2014/8/3 12:20:00"},
            {color: "test1.jpg", region: "第三步：倒入西红柿，继续翻炒", zs: "一组2", date: "2014/8/3 12:20:00"},
            {color: "test1.jpg", region: "第四步：2分钟后，加入一些你喜欢的调味料，继续翻炒", zs: "一组3", date: "2014/8/3 12:20:00"},
            {
                color: "test1.jpg",
                region: "第五步：接下来倒入芹菜丁、胡萝卜，也可以根据自己喜好加入一些豌豆或者豆腐调味",
                zs: "一组4",
                date: "2014/8/3 12:20:00"
            },
            {color: "test1.jpg", region: "第六步：大火继续翻炒，一道美味、营养的小菜马上就可以享用了~~", zs: "一组2", date: "2014/8/3 12:20:00"}
        ];
        return {
            all: function () {
                return fyList;
            },
            search: function (reg) {
                if (!reg) return fyList;
                var ret = [];
                for (var i = 0; i < fyList.length; i++) {
                    if (fyList[i].region.indexOf(reg) > -1) {
                        ret.push(fyList[i]);
                    }
                }
                return ret;
            }
        }
    })
    .factory("NewsSvc", function (AppData,$q,$http) {
        var serviceBase = AppData.ApiUrl;
        return {
            all: function () {
                return fyList;
            },
            search: function (reg) {
                if (!reg) return fyList;
                var ret = [];
                for (var i = 0; i < fyList.length; i++) {
                    if (fyList[i].region.indexOf(reg) > -1) {
                        ret.push(fyList[i]);
                    }
                }
                return ret;
            },
            getPageNews: function (pageIndex, pageSize,SourceId,keyWords) {
                var data = {pageIndex:pageIndex,pageSize:pageSize,SourceId:SourceId,keyWords:keyWords};

                var deferred = $q.defer();

                $http.get(serviceBase + 'api/News', {params:data}, { })
                    .success(function (response) {
                    deferred.resolve(response);

                }).error(function (err, status) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },
            getNewsById: function (id) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/News/GetById/'+id, {}, { })
                    .success(function (response) {
                        deferred.resolve(response);
                    }).error(function (err, status) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
        }
    })
    .factory("LawCaseSvc", function ($q,$http,LoadingScreenService,AppHttp,AppData) {
        var serviceBase = AppData.ApiUrl;
        return {
            voteLawCase:function(data){
            LoadingScreenService.show(false);
            var deferred = $q.defer();
            $http.post(serviceBase + 'api/Favorite/VoteLawCase', data).success(function (response) {
                LoadingScreenService.hide();
                deferred.resolve(response);
            }).error(function (err, status) {
                LoadingScreenService.hide();
                deferred.reject(err);
            });
            return deferred.promise;
        },
            getLawCaseFavorite:function(lcNo){
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/LawCase/GetLawCaseFavorite/'+lcNo, {}, { })
                    .success(function (response) {
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            getAllLawCase:function(pageIndex, pageSize,keyWords){
                var data = {pageIndex:pageIndex,pageSize:pageSize,keyWords:keyWords};
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/LawCase/GetAllLcList', {params:data}, { })
                    .success(function (response) {
                        LoadingScreenService.hide();
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        LoadingScreenService.hide();
                        deferred.reject(err);
                    });

                return deferred.promise;
        },
            getMyLawCase:function(pageIndex, pageSize,keyWords){
                var data = {pageIndex:pageIndex,pageSize:pageSize,keyWords:keyWords};
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/LawCase/GetMyLcList', {params:data}, { })
                    .success(function (response) {
                        LoadingScreenService.hide();
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        LoadingScreenService.hide();
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getLawCaseByLcNo: function (no) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/LawCase/GetByNo/'+no, {}, { })
                    .success(function (response) {
                        deferred.resolve(response);
                    }).error(function (err, status) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
        };
    })
    .factory("CommentsSvc", function () {
        var messages = [{
            id: 1,
            row: 1,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            id: 2,
            row: 2,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            id: 3,
            row: 3,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            id: 4,
            row: 4,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            id: 5,
            row: 5,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            id: 6,
            row: 6,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            id: 7,
            row: 7,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            id: 8,
            row: 8,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            id: 9,
            row: 9,
            C_Content: "还可以，说的好",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }];

        return {
            all: function () {
                return messages;
            },
            getPageMessage: function (start, end) {
                var a = [];
                messages.forEach(function (e, i) {
                    if (e.row && e.row >= start && e.row < end) {
                        a.push(e);
                    }
                });
                return a;
            }
        }
    })
    .factory("CaseLogSvc", function (AppData,$q,$http,LoadingScreenService) {
        var serviceBase = AppData.ApiUrl;
        return {
            all: function () {
                var d = new Array();
                d = data;
                return d;
            },
            getLogState: function (caseNo) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/CaseLog/GetLogState/' + caseNo)
                    .success(function (response) {
                        deferred.resolve(response);
                    }).error(function (err, status) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }, getAllLogs: function (caseNo) {
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/CaseLog/GetAllLogs/' + caseNo)
                    .success(function (response) {
                        LoadingScreenService.hide();
                        deferred.resolve(response);
                    }).error(function (err, status) {
                        LoadingScreenService.hide();
                        deferred.reject(err);
                    });
                return deferred.promise;
            }, getRecentlyLog: function (caseNo) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/CaseLog/GetRecentlyLog/' + caseNo)
                    .success(function (response) {
                        deferred.resolve(response);
                    }).error(function (err, status) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
        }
    })
    .factory("ChatSvc", function (AppData,$q,$http,LoadingScreenService) {
        var serviceBase = AppData.ApiUrl;
        return {
            getHistory: function (lcNo) {
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/LcChat/GetChatList/'+lcNo, {}, { })
                    .success(function (response) {
                        LoadingScreenService.hide();
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        LoadingScreenService.hide();
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            sendMessage:function(data){
                LoadingScreenService.show(false);
                var data = {message:data.message,lcNo:data.lcNo};
                var deferred = $q.defer();
                $http.post(serviceBase + 'api/LcChat/SendMessage', data).success(function (response) {
                    LoadingScreenService.hide();
                    deferred.resolve(response);
                }).error(function (err, status) {
                    LoadingScreenService.hide();
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        }
    })

    .factory("ApplyCertSvc", function (AppData,$q,$http,LoadingScreenService) {
        var serviceBase = AppData.ApiUrl;
        return{
            addApplyCert:function(data){
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                $http.post(serviceBase + 'api/ApplyCertificate/AddApplyCert', data).success(function (response) {
                    LoadingScreenService.hide();
                    deferred.resolve(response);
                }).error(function (err, status) {
                    LoadingScreenService.hide();
                    deferred.reject(err);
                });
                return deferred.promise;
            },
            getUserApplyState:function(){
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/ApplyCertificate/GetUserApplyState', {}).success(function (response) {
                    LoadingScreenService.hide();
                    deferred.resolve(response);
                }).error(function (err, status) {
                    LoadingScreenService.hide();
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        }
    })

    .factory("FavoriteSvc",function(AppData,$q,$http,LoadingScreenService){
        var serviceBase = AppData.ApiUrl;
        return{
            addFavorite:function(data){
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                $http.post(serviceBase + 'api/Favorite/AddFavorite', data).success(function (response) {
                    LoadingScreenService.hide();
                    deferred.resolve(response);
                }).error(function (err, status) {
                    LoadingScreenService.hide();
                    deferred.reject(err);
                });
                return deferred.promise;
            },
            getMyFavorite:function(type,keyword){
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                var key={key:keyword};
                $http.get(serviceBase + 'api/Favorite/GetByType/'+type,  {params:key}, { })
                    .success(function (response) {
                        LoadingScreenService.hide();
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        LoadingScreenService.hide();
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            deleteFavorite:function(fid){
                LoadingScreenService.show(false);
                var deferred = $q.defer();
                $http.delete(serviceBase + 'api/Favorite/'+fid, {}, { })
                    .success(function (response) {
                        LoadingScreenService.hide();
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        LoadingScreenService.hide();
                        deferred.reject(err);
                    });

                return deferred.promise;
            }
        }
    })

    .factory("SolutionSvc",function(AppData,$q,$http){
        var serviceBase = AppData.ApiUrl;
        return {
            getFocus: function (sNo) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/Solution/GetFocus/'+sNo, {}, { })
                    .success(function (response) {
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getJudgeGist: function (sNo) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/Solution/GetJudgeGist/'+sNo, {}, { })
                    .success(function (response) {
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getRelatedCase: function (sNo) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/Solution/GetRelatedCase/'+sNo, {}, { })
                    .success(function (response) {
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getMainView: function (sNo) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/Solution/GetMainView/'+sNo, {}, { })
                    .success(function (response) {
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            getLegalBasis: function (sNo) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/Solution/GetLegalBasis/'+sNo, {}, { })
                    .success(function (response) {
                        deferred.resolve(response);

                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

        }
    })

    .factory('LoadingScreenService', function ($rootScope, $document, $compile, $animate, $q, $timeout, $ionicLoading, $ionicTemplateLoader, $ionicPlatform) {
        var animation = 'custom-fade-in';
        var element, scope;
        var updateInProgress = false;
        var isShowing = false;

        //var loadingPromise = $ionicTemplateLoader.load('templates/loadingscreen.html').then(
        //    function(templateString){
        //        scope = $rootScope.$new(true);
        //        scope.data = {};
        //        scope.data.percentage = "0";
        //        element = $compile(templateString)(scope);
        //    }
        //);

        var loadingPromise = $ionicLoading;


        return {
            show: show,
            hide: hide,
            toggleLoadingBar: toggleLoadingBar,
            setPercentage: setPercentage,
            fakeIncrement: fakeIncrement
        };

//----------------------------------------------------------------------------/

        function show(showLoadingBar) {
            loadingPromise.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 100,
                showDelay: 0
            });
            isShowing = true;
            //scope.showLoadingBar = showLoadingBar;
            //
            //$ionicPlatform.onHardwareBackButton(onHardwareBackButton);
            //
            //if( !element.parent().length ) {
            //    $document[0].body.appendChild(element[0]);
            //}
            //isShowing = true;
            //
            //return $animate.addClass(element, animation);
        }

        function hide() {
            var defer = $q.defer();

            if (!isShowing) return defer.resolve();

            loadingPromise.hide();
            //loadingPromise.then(
            //    function() {
            //        if ( ionic.Platform.isWebView() ) cordova.plugins.Keyboard.close();
            //
            //        $ionicPlatform.offHardwareBackButton(onHardwareBackButton);
            //
            //        $animate.removeClass(element, animation).then(
            //            function(){ defer.resolve(); },
            //            function(){ defer.reject(); }
            //        );
            //
            //        $timeout(function(){
            //            scope.data.percentage = "0";
            //        }, 1000);
            //
            //        isShowing = false;
            //    }
            //);

            return defer.promise;
        }

        function toggleLoadingBar(show) {
            scope.showLoadingBar = show;
        }

        function setPercentage(percentage) {
            if (updateInProgress) return;

            if (percentage == 1) {
                scope.data.percentage = "100";
                updateInProgress = false;
                return;
            }

            updateInProgress = true;
            $timeout(function () {
                scope.data.percentage = Math.round(percentage * 100).toString();
                updateInProgress = false;
            }, 100);
        }

        function fakeIncrement() {
            scope.data.percentage = (parseInt(scope.percentage) + 1).toString();
            scope.$digest();
        }

//----------------------------------------------------------------------------/

        function onHardwareBackButton() {
            hide();
        }

    })

    .factory('authService', ['$http', '$q', 'localStorageService', 'AppData','LoadingScreenService', function ($http, $q, localStorageService, AppData,LoadingScreenService) {

        var serviceBase = AppData.ApiUrl;
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            userId:0,
            useRefreshTokens: false
        };

        var _externalAuthData = {
            provider: "",
            userName: "",
            externalAccessToken: ""
        };

        var _saveRegistration = function (registration) {

            _logOut();

            return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
                return response;
            });

        };

        var _login = function (loginData,sucess,error) {
            LoadingScreenService.show(false);
            var data = "grant_type="+(loginData.grant_type||"password")+"&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                LoadingScreenService.hide();
                if (loginData.useRefreshTokens) {
                    localStorageService.setObject('authorizationData', {userId:response.userid, userType:response.userType, token: response.access_token, userName: loginData.userName,realName:response.realName, refreshToken: response.refresh_token, useRefreshTokens: true });
                }
                else {
                    localStorageService.setObject('authorizationData', {userId:response.userid,userType:response.userType, token: response.access_token, userName: loginData.userName,realName:response.realName, refreshToken: "", useRefreshTokens: false });
                }
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.userid=loginData.userid;
                _authentication.useRefreshTokens = loginData.useRefreshTokennDs;

                deferred.resolve(response);
                if(typeof sucess=="function") sucess();

            }).error(function (err, status) {
                LoadingScreenService.hide();
                _logOut();
                if(typeof error=="function") error(err, status);
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.userId=0;
            _authentication.useRefreshTokens = false;

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.userId=authData.userid;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
            }

        };

        var _refreshToken = function () {
            var deferred = $q.defer();

            var authData = localStorageService.get('authorizationData');

            if (authData) {

                if (authData.useRefreshTokens) {

                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                    localStorageService.remove('authorizationData');

                    $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                        localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                        deferred.resolve(response);

                    }).error(function (err, status) {
                        _logOut();
                        deferred.reject(err);
                    });
                }
            }

            return deferred.promise;
        };

        var _obtainAccessToken = function (externalData) {

            var deferred = $q.defer();

            $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                _authentication.userId=response.userid;
                _authentication.useRefreshTokens = false;

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _registerExternal = function (registerExternalData) {

            var deferred = $q.defer();

            $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                _authentication.useRefreshTokens = false;

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

       var _changePasswordWord=function(loginData){
           LoadingScreenService.show(false);
           var data = {oldPwd:loginData.oldPwd,newPwd:loginData.newPwd};

           var deferred = $q.defer();

           $http.post(serviceBase + 'api/Account/ChangePwd', data).success(function (response) {
               LoadingScreenService.hide();
               deferred.resolve(response);
           }).error(function (err, status) {
               LoadingScreenService.hide();
               deferred.reject(err);
           });

           return deferred.promise;

       };

        authServiceFactory.changePasswordWord=_changePasswordWord;
        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.refreshToken = _refreshToken;

        authServiceFactory.obtainAccessToken = _obtainAccessToken;
        authServiceFactory.externalAuthData = _externalAuthData;
        authServiceFactory.registerExternal = _registerExternal;

        return authServiceFactory;
    }])

    .factory('authInterceptorService', ['$q', '$injector','$location', 'localStorageService', function ($q, $injector,$location, localStorageService) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.getObject('authorizationData');
            if (authData&&authData.token) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                authService.logOut();
                $location.path('app/login');
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);