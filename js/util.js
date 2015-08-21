/**
 * Created by Administrator on 2015/5/12.
 */
angular.module("starter.common", [])
    .factory("AppData", function () {
        return {
            User: {
                ID: 1,
                Name: "Î´µÇÂ¼",
                Photo: "",
                Type: 0,
                RealName: "ÄäÃû"
            },
            ApiUrl:"http://localhost:8633/"

        }
    }
) .factory("AppTools", function (AppData) {
        return {
            IsAuthenticatedUser:function(){
            return AppData.User.ID>0&&localStorage.isAuthenticated == "true";
            }
        }
    }
).factory("AppHttp", function ($http,AppData) {
        return {
            ajax_post: function (data,sucessCb,failedCb) {
                var config = {
                    url: AppData.ApiUrl,
                    method: "post",
                    data: data,
                    cache:false
                };
                $http(config).sucess(function(data,status,headers,config){
                    sucessCb(data,status,headers,config);
                })
                    .error(function(data,status,headers,config){
                        failedCb(data,status,headers,config);
                    });

            },
            ajax_get: function (data,sucessCb,failedCb) {
                var config = {
                    url: AppData.ApiUrl,
                    method: "get",
                    data: data,
                    cache:false
                };
                $http(config).sucess(function(data,status,headers,config){
                    sucessCb(data,status,headers,config);
                })
                    .error(function(data,status,headers,config){
                        failedCb(data,status,headers,config);
                    });

            }
        }
    }).factory('$localstorage', ['$window', function($window) {
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
            }
        }
    }])
;

