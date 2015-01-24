(function(){
    console.log("better_search on");
    // 設定をロード、設定されていなければデフォルト値
    var TSD_TITLE_HIGH      = localStorage.getItem("input_threshold_title_high")    || 1.0;
    var TSD_TITLE_MIDDLE    = localStorage.getItem("input_threshold_title_middle")  || 0.5;
    var TSD_VIEW_HIGH       = localStorage.getItem("input_threshold_view_high")     || 10000;
    var TSD_VIEW_MIDDLE     = localStorage.getItem("input_threshold_view_middle")   || 5000;
    var TSD_VIEW_LOW        = localStorage.getItem("input_threshold_view_low")      || 1000;
    var TSD_ALBUM_HIGH      = localStorage.getItem("input_threshold_album_high")    || 100;
    var TSD_ALBUM_MIDDLE    = localStorage.getItem("input_threshold_album_middle")  || 50;
    var TSD_ALBUM_LOW       = localStorage.getItem("input_threshold_album_low")     || 10;

    // console.log(TSD_TITLE_HIGH);

    // 新着順の場合、時間分割ラベルを入れる
    var isOrderLatest = false;
    if ($("#sort_list-header option[selected]").first().html() == "新着"){
        isOrderLatest = true;
    }

    var nowday = '0';
    // 各ビデオ結果をループ
    $("#video_list_1column .video_list_renew").each(function(){
        // 動画ステータス取得
        var member="none",view=-1,album=-1,rate;
        $(".video_info_upper_renew li",this).each(function(){
            if ($(this).hasClass("member_icon")){
                member = $(this).html();
            }
            else if ($("img",this).hasClass("icon_views")){
                //console.log($(this).html());
                view = $(this).html().match(/[0-9]+$/)[0].replace(/\"/g,"");
                // 検索数色付
                if (view > TSD_VIEW_HIGH){
                    $(this).css({"color":"red","background":"pink"});
                } else if (view > TSD_VIEW_MIDDLE){
                    $(this).css({"color":"orange","background":"khaki"});
                } else if (view < TSD_VIEW_LOW){
                    $(this).css({"color":"black","background":"lightgray"});
                }
            }
            else if ($("img",this).hasClass("icon_albums")) {
                album = $(this).html().match(/[0-9]+$/)[0].replace(/\"/g,"");
                // アルバム数色付け
                if (album > TSD_ALBUM_HIGH){
                    $(this).css({"color":"red","background":"pink"});
                } else if (album > TSD_ALBUM_MIDDLE){
                    $(this).css({"color":"orange","background":"khaki"});
                } else if (album < TSD_ALBUM_LOW){
                    $(this).css({"color":"black","background":"lightgray"});
                }
            }
        });
        //console.log(album/view*100);
        // おすすめ度を計算
        rate = album/view*100;
        if (rate > TSD_TITLE_HIGH){
            // しきい値以上の登録率なら
            $(".video_info_right h3 a",this).css("color","red");
        } else if (rate > TSD_TITLE_MIDDLE){
            $(".video_info_right h3 a",this).css("color","coral");
        }

        // fc2 contents market を弱める
        if ($(".video_info_right .user_name a",this).html() == 'FC2コンテンツマーケット'){
            $(this).css("background","lightgray");
        }

        // 時間分割ラベルの挿入
        if (isOrderLatest){
            // サムネイルのdivにupidが入っている（URLの末尾のやつ）
            var upid = $(".video_thumb_small[upid]").attr("upid");
            if (typeof upid == "string") {
                // 数値部分を抜き出す
                var day = upid.substr(0, 8);
                if (nowday != day){
                    // TODO : 必ずupidが日付順に並んでいればよいが、データの並びは必ずしも正しくない
                    // 日付の変わり目に、分割ラベルを挿入
                    console.log(day);
                    $(this).before(
                        '<div style="border-bottom: 1px dotted #cdcdcd;margin: 15px 0;'+
                        'background-color: lightblue;font-size: 16px;font-weight: bold;">'+
                        day.substr(0,4)+'/'+day.substr(4,2)+'/'+day.substr(6,2)+'</div>');
                    nowday = day;
                }
            }
        }
    });
})();