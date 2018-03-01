$(document).ready(function () {

    var mzmSheetID = [];
    var mzmAmount; //目前館數
    var mzmCode = []; //博物館代碼
    //**得單一亂數**//
    function getRandom(minNum, maxNum) { //取得亂數
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }
    //**亂數不重複數列**//    
    function getRandomList(minNum, maxNum, n) { //最小、最大，產生幾個數
        var rdmList = [n]; //儲存產生的陣列
        for (var i = 0; i < n; i++) {
            var rdm = 0; //
            do {
                var exist = false; //此亂數是否已存在
                rdm = getRandom(minNum, maxNum); //取得亂數 
                //檢查亂數是否存在於陣列中，若存在則繼續回圈
                if (rdmList.indexOf(rdm) != -1) exist = true;
            } while (exist); //產生沒出現過的亂數時離開迴圈
            rdmList[i] = rdm;
        }
        return rdmList;
    }

    //**讀入各館舍基本資料**//    
    $(function () {

        var mzmName = [];
        var mzmNameDisplayFirst = [];
        var mzmNameDisplaySecond = [];
        var mzmRamdom = [];

        $.getJSON('https://spreadsheets.google.com/feeds/list/1JP89lOM6MyDogTVVhGcmoUwqQyPAo6AADbfA7kLLi0Y/1/public/values?alt=json', function (data) {
            mzmRamdom = getRandomList(0, data.feed.entry.length - 1, data.feed.entry.length);
            mzmAmount = data.feed.entry.length; //帶入目前館數
            //**建立NavList 與帶入資料**//
            for (var i = 0; i < mzmAmount; i++) {
                mzmCode[i] = data.feed.entry[i].gsx$mzmcode.$t;
                mzmName[i] = data.feed.entry[i].gsx$mzmname.$t;
                mzmNameDisplayFirst[i] = data.feed.entry[i].gsx$mzmnamedisplayfirst.$t;
                mzmNameDisplaySecond[i] = data.feed.entry[i].gsx$mzmnamedisplaysecond.$t;
                mzmSheetID[i] = data.feed.entry[i].gsx$googlesheetcode.$t;
                $("#adjNav").before("<a href='#mzm" + mzmCode[i] + "'>" + mzmNameDisplayFirst[i] + "<br/>" + mzmNameDisplaySecond[i]); //帶入標題
            }
            //**建立下方每一個館舍區塊**// 
            for (var j = 0; j < mzmAmount; j++) {
                var target = mzmRamdom[j];
                var targetOri = mzmRamdom[j + 1];
                $(".eachMzm:last").attr("id", "mzm" + mzmCode[target]);
                $(".eachMzm:last iframe").attr("id", "goPage" + mzmCode[targetOri]);
                $(".eachMzm:last iframe").attr("name", "goPage" + mzmCode[targetOri]);
                if (j != 0) $(".eachMzm:last").removeClass("firstSec");
                $(".eachMzm:last h1").append("<a href='#mzm" + mzmCode[target] + "'>" + mzmNameDisplayFirst[target] + "<br/>" + mzmNameDisplaySecond[target]);
                if (j != (data.feed.entry.length - 1)) {
                    $(".eachMzm:last").clone().insertAfter(".eachMzm:last");
                    $(".eachMzm:last h1").empty();
                }
            } //end of 帶入資料
            eachMzmFun(mzmAmount);

            $("a.sLink").each(function () {
                //var sLinkHref = $(".sLink").attr("href");
                console.log("啊啊啊啊");
            });

        }); // end of Get JSON 
    }); //end of main function
    //將JSON讀入
    function eachMzmFun(mzmA) {
        console.log(mzmA);
        for (var l = 0; l < mzmA; l++) {
            console.log(mzmSheetID[l]);
            var jsonEvent = "https://spreadsheets.google.com/feeds/list/" + mzmSheetID[l] + "/2/public/values?alt=json";
            var jsonNews = "https://spreadsheets.google.com/feeds/list/" + mzmSheetID[l] + "/2/public/values?alt=json";
            var jsonLink = "https://spreadsheets.google.com/feeds/list/" + mzmSheetID[l] + "/3/public/values?alt=json";
            //**帶入各館舍資料**//
            var codeRound = mzmCode[l];
            eachMzmGetJson(jsonLink, codeRound, mzmA);
        } // end of Getin   
    } //end of function
    //讀入資料
    function eachMzmGetJson(jLink, cRound, mzmA) {
        $.getJSON(jLink, function (dataEach) {
            var titleEach = [];
            var linkEach = [];
            var susEach = [];
            for (var k = 0; k < mzmA; k++) {
                titleEach[k] = dataEach.feed.entry[k].gsx$title.$t;
                linkEach[k] = dataEach.feed.entry[k].gsx$link.$t;
                susEach[k] = dataEach.feed.entry[k].gsx$suspend.$t;
                console.log(cRound + "," + titleEach[k] + "," + linkEach[k] + "," + susEach[k] + "end");
                if (susEach[k] == "") {
                    $("#mzm" + cRound + " .subListRight").append("<li><a class='sLink' href ='" + linkEach[k] + "' > " + titleEach[k] + " </a></li> ");
                }
                $.each($(".eachMzm .eachContainer .infoBox .sLink"), function (index, value) {
                    console.log(index + "EACH:" + $(value).text() + ">" + $(value).attr("href"));
                    var eachLinkHref = $(value).attr("href");
                    $(value).attr("class", "sLink" + cRound)
                    $(value).removeAttr("href");
                    $(value).click(function () {
                        var getWhichMzm = $(value).attr("class").substr(5);
                        $("#mzm" + getWhichMzm + " iframe").attr("src", eachLinkHref);
                        $("#mzm" + getWhichMzm + " h2").text($(value).text());
                        $("#mzm" + getWhichMzm + " .functionBox a.website").text(eachLinkHref.substr(0, 30) + "...");
                        $("#mzm" + getWhichMzm + " .functionBox a").attr("href", eachLinkHref);
                    });
                });
            }
        }); // end of Each Json
    } //end of MzmGetJsonFunction

    //**開發階段用**//
    $("link").each(function () {
        var d = new Date();
        var n = d.getTime();
        console.log($(this).attr("href"));
        $(this).attr("href", $(this).attr("href") + "?" + n);
        console.log($(this).attr("href"));
    });

    //**Navbar 滑動顯示**//
    let navbar = document.getElementsByClassName("navBar")[0];
    let action = document.getElementsByClassName("firstSec")[0];
    let offset = 0;
    window.addEventListener("scroll", () => {
        let bottom = action.getBoundingClientRect().bottom;
        if (bottom < action.offsetHeight - offset || window.innerWidth <= 768) {
            navbar.style.animationDuration = "0.5s";
            navbar.style.animationFillMode = "forwards";
            navbar.style.animationName = "backgroundFadeIn";
        } else navbar.style.animationName = "backgroundFadeOut";
    });


    $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%2028777581%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (json) {
        var w_code = weather_con[json.query.results.channel.item.condition.code.toString()];
        var w_temp = json.query.results.channel.item.condition.temp + "℃";
        console.log(w_code);
        console.log(w_temp);
    });



    weather_con = {
        "0": "龍捲風",
        "1": "熱帶風暴",
        "2": "颶風",
        "3": "強雷陣雨",
        "4": "雷陣雨",
        "5": "混合雨雪",
        "6": "混合雨雪",
        "7": "混合雨雪",
        "8": "冰凍小雨",
        "9": "細雨",
        "10": "凍雨",
        "11": "陣雨",
        "12": "陣雨",
        "13": "飄雪",
        "14": "陣雪",
        "15": "吹雪",
        "16": "下雪",
        "17": "冰雹",
        "18": "雨雪",
        "19": "多塵",
        "20": "多霧",
        "21": "陰霾",
        "22": "多煙",
        "23": "狂風大作",
        "24": "有風",
        "25": "冷",
        "26": "多雲",
        "27": "晴間多雲（夜）",
        "28": "晴間多雲（日）",
        "29": "晴間多雲（夜）",
        "30": "晴間多雲（日）",
        "31": "清晰的（夜）",
        "32": "晴朗",
        "33": "晴朗（夜）",
        "34": "晴朗（日）",
        "35": "雨和冰雹",
        "36": "炎熱",
        "37": "雷陣雨",
        "38": "零星雷陣雨",
        "39": "零星雷陣雨",
        "40": "零星雷陣雨",
        "41": "大雪",
        "42": "零星陣雪",
        "43": "大雪",
        "44": "多雲",
        "45": "雷陣雨",
        "46": "陣雪",
        "47": "雷陣雨",
        "3200": "資料錯誤"
    };

    var clickItem = {
        "1": "HK",
        "2": "HL",
        "3": "PAC",
        "4": "AL",
        "5": "MS",
        "6": "ZN",
        "7": "LC",
        "8": "SK",
        "9": "ZP",
        "10": "PZ",
        "11": "ML",
        "12": "TP",
        "13": "BC"
    }
    var clickMark = 0;

    //浮動的閃爍
    $.each(clickItem, function (mzmKey, mzmName) {
        var mzmID = "#mzm" + mzmName + " .infoBox";
        $(".mzm" + mzmName).hover(function () {
            if (clickMark == 0) {
                $("#select1").addClass("selectHover");
            } else if (clickMark == 1) {
                $("#select2").addClass("selectHover");
            } else if (clickMark == 2) {
                $("#select3").addClass("selectHover");
            }
        }, function () {
            if (clickMark == 0) {
                $("#select1").removeClass("selectHover");
            } else if (clickMark == 1) {
                $("#select2").removeClass("selectHover");
            } else if (clickMark == 2) {
                $("#select3").removeClass("selectHover");
            }
        });
        //按了的反應
        $(".mzm" + mzmName).click(function () {
            var infoBoxContent = $(mzmID).children().clone(true);
            clickMark++;
            if (clickMark == 1) {
                $("#select1").children().remove();
                $(".select1Btn").removeClass("activeDisplay");
                $(".select1Btn").removeClass("select1Btn");
                $(this).addClass("select1Btn");
                $(this).addClass("activeDisplay");
                $("#select1").append(infoBoxContent);
                getClickScrollToID(mzmName);
                $("#select1").removeClass("selectHover");

            } else if (clickMark == 2) {
                $("#select2").children().remove();
                $(".select2Btn").removeClass("activeDisplay");
                $(".select2Btn").removeClass("select2Btn");
                $(this).addClass("select2Btn");
                $(this).addClass("activeDisplay");
                $("#select2").append(infoBoxContent);
                getClickScrollToID(mzmName);
                $("#select2").removeClass("selectHover");

            } else if (clickMark == 3) {
                $("#select3").children().remove();
                $(".select3Btn").removeClass("activeDisplay");
                $(".select3Btn").removeClass("select3Btn");
                $(this).addClass("select3Btn");
                $(this).addClass("activeDisplay");
                $("#select3").append(infoBoxContent);
                getClickScrollToID(mzmName);
                $("#select3").removeClass("selectHover");
                clickMark = 0;
            }


        });
    }); //for

    function getClickScrollToID(mzmN) {
        console.log("GO!" + mzmN);
        $.each($("main a.sLink" + mzmN), function (index, value) {
            console.log(index + "SELECT:" + $(value).text());
            $(value).click(function () {
                // 讓捲軸用動畫的方式移動到 館舍 的 top 位置
                // sam 修正 Opera 問題

                var offsetOfSection = parseInt($("#mzm" + mzmN).offset().top);
                console.log(offsetOfSection);
                var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html, body");
                $body.animate({
                    scrollTop: offsetOfSection
                }, 2000);
            });
        }); /////main .sLink

        $.each($("main h1 a"), function (index, value) {
            $(value).click(function () {
                // 讓捲軸用動畫的方式移動到 館舍 的 top 位置
                // sam 修正 Opera 問題

                var offsetOfSection = parseInt($("#mzm" + mzmN).offset().top);
                console.log(offsetOfSection);
                var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html, body");
                $body.animate({
                    scrollTop: offsetOfSection
                }, 2000);
            });
        });
    }

    $("a.navLogo").click(function () {
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html, body");
        $body.animate({
            scrollTop: 0
        }, 2000);

    });

});
