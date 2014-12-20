/**
 * Created by Nick on 2014/12/20.
 */
(function(){
    // localstorage読み込みと設定
    $("input").each(function(){
        //console.log(localStorage.getItem($(this).attr("id")));
        var value = localStorage.getItem($(this).attr("id"));
        $(this).val(value);
        $(this).next().html(value);
    });

    // 適用ボタン押下時の動作
    $("#button_confirm").on("click",function(){
        console.log("confirm");
        $(".Setting_item input").each(function(){
            //console.log($(this).val(),$(this).attr("type"));
            localStorage.setItem($(this).attr("id"),$(this).val());
        });

        alert("変更を保存しました");
    });

    // input値変更時の処理
    $("input").on("change input",function(){
        $(this).next().html($(this).val());
    });
})();