function getRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

var __count = 0;
var __maxCount = 9999;

var __getUsersCount = 0;
var __maxGetUsersCount = 999;
var __getUsersEmptyCount = 0;

var __$allMembers = [];
var passMemberIds = ['95820422','42758446','94780978','95843750','89940205','99825922','47200398','98528436'];

var __si;
var __si2;

var __addIFrame = function() {
    $('<iframe id="myIframe" style="overflow: auto" frameborder="0" width="1320" height="620" marginheight="0" marginwidth="0" scrolling="yes" src=""></iframe>').prependTo($("body"));
}

var myGetUsers = function() {
    __getUsersCount++;

    var stopAndSendMsg = false;
    if (__getUsersCount > __maxGetUsersCount) {
        console.log("超过限定getUsers次数, 退出getUsers!");
        stopAndSendMsg = true;
    }  else if ($("#imgLoading").html().trim() === "已经到最后了") {
        console.log("已经到最后了, 退出getUsers!");
        stopAndSendMsg = true;
    } else {
        var $members = $("[class='pin_area frameW masonry']:first").find("[data-memberid]");
        if ($members.size() == 0) {
            __getUsersEmptyCount++;
            if (__getUsersEmptyCount <= 20) {
                console.log("getUsers为空! continue");
                return;
            } else {
                console.log("超过限定getUsers为空次数, 退出getUsers!");
                stopAndSendMsg = true;
            }
        }
    }
    
    if (stopAndSendMsg) {
        __addIFrame();
        sendMsg();
//        clearTimeout(__si);
        return;
    }
    
    __$allMembers = __$allMembers.concat($members.toArray());

    $("[class='pin_area frameW masonry']:first").html("");

    console.log("users count: " + __$allMembers.length);
    console.log("do getUsers; " + new Date().getTime() / 1000);

    setTimeout(function() {
        window.scrollTo(100, $(document).height() + 10); 
    }, 200);
    
    setTimeout(function() {
        window.scrollTo(100, 400); 
    }, 1000);
    
//    m1.getUsers();
    
    __si = setTimeout('myGetUsers()', getRandomNum(3000, 5000));
};

function sendMsg() {
    __count++;
    
    if (__count > __maxCount) {
        console.log("超过限定发送次数, 退出sendMsg!")
        return;
    }

    if (__$allMembers.length == 0) {
        console.log("__$allMembers为空, 无可发信");
        return;
    }
    
    var m = __$allMembers.shift();
    var memberid = $(m).attr("data-memberid");
    
    if ($.inArray(memberid, passMemberIds) == -1) {
        var myIframe = document.all.myIframe;
        $(myIframe).attr("src", "http://album.zhenai.com/v2/mail/readPage.do?memberId=" + memberid + "&folder=1");
        myIframe.onload = function() {
            setTimeout(function() {
                var idoc = myIframe.contentWindow.document;
                if ($("#mailcontent", idoc).size() != 0) {
                    console.log("do 发送邮件");
                    $("#mailcontent", idoc).html("hi");
                    $("#freesendmail2", idoc)[0].click();
                    console.log("剩余member个数: " + __$allMembers.length);
                    __si2 = setTimeout('sendMsg()', getRandomNum(6000, 12000));
                } else {
                    console.log("onload2...");
                }
            }, 2000);
        }
    } else {
        console.log("pass for sendMsg: " + memberid);
        __si2 = setTimeout('sendMsg()', getRandomNum(6000, 12000));
    }
}

myGetUsers();

//clearTimeout(__si);
//clearTimeout(__si2);