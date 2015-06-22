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
            {color:"test1.jpg",region:"第一步：将适量胡萝卜磨碎，将芹菜和西红柿切丁",zs:"一组",date:"2014/8/3 12:20:00"},
            {color:"test1.jpg",region:"第二步：加热煎锅，放少许花生油，加入一些葱花翻炒一会，不停翻炒防止葱花煎焦",zs:"一组1",date:"2014/8/3 12:20:00"},
            {color:"test1.jpg",region:"第三步：倒入西红柿，继续翻炒",zs:"一组2",date:"2014/8/3 12:20:00"},
            {color:"test1.jpg",region:"第四步：2分钟后，加入一些你喜欢的调味料，继续翻炒",zs:"一组3",date:"2014/8/3 12:20:00"},
            {color:"test1.jpg",region:"第五步：接下来倒入芹菜丁、胡萝卜，也可以根据自己喜好加入一些豌豆或者豆腐调味",zs:"一组4",date:"2014/8/3 12:20:00"},
            {color:"test1.jpg",region:"第六步：大火继续翻炒，一道美味、营养的小菜马上就可以享用了~~",zs:"一组2",date:"2014/8/3 12:20:00"}
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
