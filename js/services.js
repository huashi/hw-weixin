/**
 * Created by Administrator on 2015/3/31.
 */
angular.module("starter.services", [])
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
    .factory("NewsSvc", function (AppHttp) {
        var messages = [{
            id: 1,
            row: 1,
            contents: "男子银行兑换残币 被要出示“残币证明”",
            time: "2015-05-01",
            username: "张三"
        }, {
            id: 2,
            row: 2,
            contents: "河南洛阳：每天10元高温津贴拿到的并不多",
            time: "2015-02-01",
            username: "张三"
        }, {
            id: 3,
            row: 3,
            contents: "乌鲁木齐一乘客落两万险被人拿走 司机机智讨回并送还",
            time: "2015-01-01",
            username: "张三"
        }
            , {
                id: 4,
                row: 4,
                contents: "公交司机座椅后贴条：乱吐痰猪狗不如",
                time: "2015-01-01",
                username: "张三"
            }
            , {
                id: 5,
                row: 5,
                contents: "四川男子抢劫后让店员报警 警方：不作死就不会死",
                time: "2014-01-01",
                username: "张三"
            }
            , {
                id: 6,
                row: 6,
                contents: "广东一男子因“偷手机”被拘 状告公安获赔2000多元",
                time: "2013-01-01",
                username: "张三"
            }
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
            },
            getPageNews: function (start, end) {
                var a = [];
                messages.forEach(function (e, i) {
                    if (e.row && e.row >= start && e.row < end) {
                        a.push(e);
                    }
                });
                return a;
            },
            getNewsById: function (id) {
                for (var i = 0; i < messages.length; i++) {
                    if (messages[i].id == id) {
                        return messages[i];
                    }
                }
                return {};
            }
        }
    })
    .factory("LawCase", function (AppHttp) {
        var caseList = [{
            id: 1,
            LC_Name: "我的第一个案件",
            username: "张三",
            userid: 1
        }, {
            id: 2,
            LC_Name: "胡宗明与王志友医疗事故损害赔偿纠纷上诉案",
            username: "张三",
            userid: 1
        }, {
            id: 3,
            LC_Name: "交通事故损害赔偿纠纷上诉案1",
            username: "李四",
            userid: 2
        }, {
            id: 4,
            LC_Name: "交通事故损害赔偿纠纷上诉案2",
            username: "李四",
            userid: 2
        }, {
            id: 5,
            LC_Name: "交通事故损害赔偿纠纷上诉案3",
            username: "李四",
            userid: 2
        }, {
            id: 6,
            LC_Name: "交通事故损害赔偿纠纷上诉案4",
            username: "李四",
            userid: 2
        }, {
            id: 7,
            LC_Name: "交通事故损害赔偿纠纷上诉案5",
            username: "李四",
            userid: 2
        }, {
            id: 8,
            LC_Name: "交通事故损害赔偿纠纷上诉案6",
            username: "李四",
            userid: 2
        }, {
            id: 9,
            LC_Name: "交通事故损害赔偿纠纷上诉案7",
            username: "李四",
            userid: 2
        }, {
            id: 10,
            LC_Name: "交通事故损害赔偿纠纷上诉案8",
            username: "李四",
            userid: 2
        }, {
            id: 11,
            LC_Name: "交通事故损害赔偿纠纷上诉案9",
            username: "李四",
            userid: 2
        }, {
            id: 12,
            LC_Name: "交通事故损害赔偿纠纷上诉案10",
            username: "李四",
            userid: 2
        }, {
            id: 13,
            LC_Name: "交通事故损害赔偿纠纷上诉案11",
            username: "李四",
            userid: 2
        }

        ];
        return {
            getMyLawCase: function (uid, start, end) {
                var a = [];
                var s = start || 0, end = end || 9999;

                caseList.forEach(function (e, i) {
                    if ((!uid || e.userid == uid) && e.id && e.id >= s && e.id < end) {
                        a.push(e);
                    }
                });
                return a;
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
    .factory("CaseLogSvc", function () {
        var data = {
            "list": {
                "2015-06-28": [{
                    "id": "142",
                    "account_id": "26",
                    "type": "6",
                    "title": "",
                    "content": "递交的材料有...",
                    "piclist": "2015-6-28-A.jpg,2015-6-28-B.jpg,2015-6-28-C.jpg",
                    "author": "ajjz.png",
                    "link": "ajjz.jpg",
                    "date": "2015-06-26",
                    "uin": "2117428798",
                    "dateline": "1435285186"
                },
                    {
                        "id": "143",
                        "account_id": "26",
                        "type": "1",
                        "title": "",
                        "content": "我们已经接收案件，并将案件的相关材料递交法院",
                        "piclist": "2015-6-28-A.jpg,2015-6-28-B.jpg,2015-6-28-C.jpg",
                        "author": "lsxx.png",
                        "link": "",
                        "date": "2015-06-26",
                        "uin": "2117428798",
                        "dateline": "1435306940"
                    }]

            },
            "pages": {
                "page": 1,
                "total": 16
            }
        };
        return {
            all: function () {
                var d = new Array();
                d = data;
                return d;
            }
        }
    })
.factory("ChatSvc",function(){
        var messages = [{
            userId: 1,
            text: "张律师现在什么情况了？",
            time: "2015-01-01 12:01:12",
            username: "张三"
        }, {
            userId: 2,
            text: "一切正常",
            time: "2015-01-02 12:01:12",
            username: "张律师"
        }, {
            userId: 2,
            text: "不要着急",
            time: "2015-01-03 12:01:12",
            username: "张律师"
        }, {
            userId: 1,
            text: "谢谢",
            time: "2015-01-04 12:01:12",
            username: "张三"
        }
        ];

        return {
            all: function () {
                return messages;
            }
        }
    })

