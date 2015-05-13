/**
 * Created by Administrator on 2015/5/12.
 */
angular.module("starter.common", [])
    .factory("AppData", function () {
        return {
            User: {
                ID: 0,
                Name: "Î´µÇÂ¼",
                Photo: "",
                Type: 0,
                RealName: "ÄäÃû"
            },
            Ajax:{
                Url:""
            }
        }
    }
).factory("AppHttp", function ($http,AppData) {
        return {
            ajax_post: function (data,sucessCb,failedCb) {
                var config = {
                    url: AppData.Ajax.Url,
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
                    url: AppData.Ajax.Url,
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
    })

;