(function(){
    console.log("better_search on");
    // 各ビデオ結果をループ
    $("#video_list_1column .video_list_renew").each(function(){
        // 動画ステータス取得
        var member="none",view=-1,album=-1;
        $(".video_info_upper_renew li",this).each(function(){
            if($(this).hasClass("member_icon")){
                member = $(this).html();
            }
            else if($("img",this).hasClass("icon_views")){
                //console.log($(this).html());
                view = $(this).html().match(/[0-9]+$/)[0].replace(/\"/g,"");
            }
            else if($("img",this).hasClass("icon_albums")) {
                album = $(this).html().match(/[0-9]+$/)[0].replace(/\"/g,"");
            }
        });
        console.log(album/view*100);
        if(album/view*100 > 0.5){
            // 1%以上の登録率なら
            $(".video_info_right h3 a",this).css("color","red");
        }

        // fc2 contents market を削除
        if($(".video_info_right .user_name a",this).html() == 'FC2コンテンツマーケット'){
            $(this).css("display","none");
        }

        // おすすめ度を計算

    });
})();