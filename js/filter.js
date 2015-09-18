/**
 * Created by Administrator on 2015/9/18.
 */
angular.module('starter.filter', []).
    filter('antialias', function($sce) {
        return function(input) {
            if( input==null ||( typeof input!=="string")|| input.length === 0 ){
                return "";
            }else{
                return $sce.trustAsHtml(input.replace(/ /g,"&nbsp;").split("\n").join("<br />"));
            }
        }
    });