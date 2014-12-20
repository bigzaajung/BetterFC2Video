(function(){
    console.log("better_search on");
    // 各ビデオ結果をループ
    $("#video_list_1column .video_list_renew").each(function(){
        // 動画ステータス取得
        var member="none",view=-1,album=-1,rate;
        $(".video_info_upper_renew li",this).each(function(){
            if($(this).hasClass("member_icon")){
                member = $(this).html();
            }
            else if($("img",this).hasClass("icon_views")){
                //console.log($(this).html());
                view = $(this).html().match(/[0-9]+$/)[0].replace(/\"/g,"");
                // 検索数色付
                if(view > 10000){
                    $(this).css({"color":"red","background":"pink"});
                }else if(view > 5000){
                    $(this).css({"color":"orange","background":"khaki"});
                }else if(view < 1000){
                    $(this).css({"color":"black","background":"lightgray"});
                }
            }
            else if($("img",this).hasClass("icon_albums")) {
                album = $(this).html().match(/[0-9]+$/)[0].replace(/\"/g,"");
                // アルバム数色付け
                if(album > 100){
                    $(this).css({"color":"red","background":"pink"});
                }else if(album > 50){
                    $(this).css({"color":"orange","background":"khaki"});
                }else if(album < 10){
                    $(this).css({"color":"black","background":"lightgray"});
                }
            }
        });
        //console.log(album/view*100);
        // おすすめ度を計算
        rate = album/view*100;
        if(rate > 1.0){
            // しきい値以上の登録率なら
            $(".video_info_right h3 a",this).css("color","red");
        }else if(rate > 0.5){
            $(".video_info_right h3 a",this).css("color","coral");
        }

        // fc2 contents market を弱める
        if($(".video_info_right .user_name a",this).html() == 'FC2コンテンツマーケット'){
            $(this).css("background","lightgray");
        }
    });
})();