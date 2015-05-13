/**
 * Created by Administrator on 2015/3/31.
 */
angular.module("starter.services",[])
.factory("Plays",function(){
        var plays=[
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];

        return {
            all:function(){
                return plays;
            }
        }

    })
.factory("Catalogs",function(){
        var catalogs=[
            {title:"防疫档案",url:""},
            {title:"耳标发放采集",url:""},
            {title:"首免录入采集",url:""},
            {title:"集中免疫录入",url:""},
            {title:"集中免疫计划制定",url:""},
            {title:"养殖追溯查询",url:""}
        ];
        return{
            all:function(){
                return catalogs;
            }
        }
    })
.factory("FyList",function(){
        var fyList=[
            {color:"test1.jpg",region:"四川省成都市武侯区红牌楼街道",zs:"一组",date:"2014/8/3 12:20:00"},
            {color:"test1.jpg",region:"四川省成都市武侯区红牌楼街道1",zs:"一组1",date:"2014/8/3 12:20:00"},
            {color:"test2.jpg",region:"四川省成都市武侯区红牌楼街道2",zs:"一组2",date:"2014/8/3 12:20:00"},
            {color:"test2.jpg",region:"四川省成都市武侯区红牌楼街道3",zs:"一组3",date:"2014/8/3 12:20:00"},
            {color:"test2.jpg",region:"四川省成都市武侯区红牌楼街道4",zs:"一组4",date:"2014/8/3 12:20:00"},
            {color:"test2.jpg",region:"四川省成都市武侯区红牌楼街道5",zs:"一组5",date:"2014/8/3 12:20:00"},
            {color:"test2.jpg",region:"四川省成都市武侯区红牌楼街道6",zs:"一组6",date:"2014/8/3 12:20:00"}
        ];
        return{
            all:function(){
                return fyList;
            },
            search:function(reg){
                if(!reg) return fyList;
                var ret=[];
                for(var i=0;i<fyList.length;i++){
                    if(fyList[i].region.indexOf(reg)>-1){
                        ret.push(fyList[i]);
                    }
                }
                return ret;
            }
        }
    })
    .factory("NewsSvc",function(AppHttp){
        var messages = [{
            id: 1,
            row: 1,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        },{
            id: 2,
            row: 2,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        },{
            id: 3,
            row: 3,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        },{
            id: 4,
            row: 4,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        },{
            id: 5,
            row: 5,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        },{
            id: 6,
            row: 6,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        },{
            id: 7,
            row: 7,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        },{
            id: 8,
            row: 8,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        },{
            id: 9,
            row: 9,
            contents: "还可以，凑合吧",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }];
        return{
            all:function(){
                return fyList;
            },
            search:function(reg){
                if(!reg) return fyList;
                var ret=[];
                for(var i=0;i<fyList.length;i++){
                    if(fyList[i].region.indexOf(reg)>-1){
                        ret.push(fyList[i]);
                    }
                }
                return ret;
            },
            getPageNews: function (start,end) {
                var a=[];
                messages.forEach(function(e,i){
                    if(e.row&& e.row>=start&& e.row<end){
                        a.push(e);
                    }
                });
                return a;
            },
            getNewsById:function(id){
                for(var i=0;i<messages.length;i++) {
                    if (messages[i].id == id) {
                        return messages[i];
                    }
                }
                return {};
            }
        }
    })
