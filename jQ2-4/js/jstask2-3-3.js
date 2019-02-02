//提取数据
var playerArray = JSON.parse(sessionStorage.getItem("player")); //提取牌组
console.log(playerArray)
var math = sessionStorage.getItem("numble");
var choseplay = JSON.parse(sessionStorage.getItem("chosingplayers")); //被杀手杀死的玩家数组
console.log(choseplay)
var days = +sessionStorage.getItem('days');
console.log(days)
//获取节点
var choose = document.getElementsByClassName('item');
console.log(choose)
var choosing = document.getElementById('choosing');
//设置变量
var choice; //选中的对象
var choosedplayers;
var choseplayer;
var chooseplayer;
var killed;
//加载数据
$(function () {
    //克隆
    for (let i = 0; i < playerArray.length - 1; i++) {
        $(".item").eq(0).clone(true).appendTo(".container").eq(0);
    }
    //修改玩家名字
    for (let i = 0; i < playerArray.length; i++) {
        if (playerArray[i] == "杀手") {
            $(".name").eq(i).text("杀手");
        }
        $(".figure").eq(i).text(i + 1 + "号");
    }

    for (let k = 0; k < choseplay.length; k++) {
        $('.name').eq(choseplay[k]).css ('background-color','#1A99B7');
    }
    //点击杀人事件
    for (let i = 0; i < math; i++) {
        choose[i].index = i; //这里index相当于形参
        choose[i].onclick = function () { //玩家盒子点击事件
            for (let i = 0; i < math; i++) {
                choose[i].getElementsByTagName('img')[0].style.display = "none"; //每次点击时所有的匕首隐藏
            }
            choice = choose[i].index; //获取被选择的玩家
            console.log(choice)
            //被点击的盒子显示匕首
            choose[i].getElementsByClassName('life')[0].style.display = "inline-block"; //被点击的盒子显示匕首
        }
    }
    //显示已死亡颜色不同
    choseplayer = JSON.parse(sessionStorage.getItem("chosingplayers")); //提取杀手杀人数组
    console.log(choseplayer)
    chooseplayer = JSON.parse(sessionStorage.getItem("chosedplayers")); //提取投票死的玩家数组
    killed = chooseplayer.concat(choseplayer);
    for (let k = 0; k < killed.length; k++) {
        $('.name').eq(killed[k]).css ('background-color','#1A99B7');
    }
})

//选择投票对象
var killnumber = +sessionStorage.getItem('kill'); //杀手总人数
var lifenumber = +sessionStorage.getItem('life'); //平民总人数
var killlife; //剩余杀手数
var lifelife; //剩余平民数
var kil = +sessionStorage.getItem('kils'); //被杀死的杀手数
choosing.onclick = function () {
    if (choseplay.includes(choice) || choice == undefined || killed.includes(choice)) {
        alert("未选中合适对象，请点击得票数最多的玩家");
    } else {
        //存储被投死的玩家数组
        chooseplayer.push(choice);
        console.log(chooseplayer)
        sessionStorage.setItem("chosedplayers", JSON.stringify(chooseplayer));
        //存储天数
        days += 1;
        sessionStorage.setItem('days', days);
        //判断游戏是否结束
        var votedead = JSON.parse(sessionStorage.getItem("chosedplayers")); //提取投票死的玩家数组
        for (let h = 0; h < votedead.length; h++) {
            if (playerArray[votedead[h]] == '杀手') {
                kil += 1
            }
        }
        console.log(kil)
        killlife = killnumber - kil; //杀手剩余人数
        console.log(killlife)
        lifelife = lifenumber - choseplayer.length - votedead.length + kil; //平民剩余人数
        console.log(lifelife)
        sessionStorage.setItem('kilslife', killlife); //保存杀手剩余人数
        sessionStorage.setItem('lifslife', lifelife); //保存平民剩余人数
        if (lifelife > killlife && killlife != 0) {
            location = 'jstask2-3-1.html';
        } else {
            location = 'jstask2-3-4.html';
        }
    }
}

//返回选人页面
function back() {
    sessionStorage.clear();
    location = "../jstask2-1/jstask2-1-2.html";
}
//返回主页面
function home() {
    sessionStorage.clear();
    location = "../jstask2-1/jstask2-1-1.html";
}