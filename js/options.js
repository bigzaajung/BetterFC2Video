/**
 * Created by Nick on 2014/12/20.
 */
(function(){

    // 読み込む値の一覧
    var vals = [];
    // chrome localstorage読み込みと設定
    $(".Setting_item input").each(function(){
        //console.log(localStorage.getItem($(this).attr("id")));
        // 読み込む値の一覧を作成
        vals.push($(this).attr("id"));
    });
    // 非同期の読み込み
    chrome.storage.sync.get(vals,function(items) {
        console.log(items);
        $("input").each(function () {
            $(this).val(items[$(this).attr("id")]);
            $(this).next().html(items[$(this).attr("id")]);
        })
    });

    // 適用ボタン押下時の動作
    $("#button_confirm").on("click",function(){
        console.log("confirm");
        // keyvalueの配列を作る
        var setvals = {};
        $(".Setting_item input").each(function(){
            setvals[$(this).attr("id")] = $(this).val();
        });
        console.log(setvals);

        // chromeのstorageへ保存
        chrome.storage.sync.set(setvals,function(){
            alert("変更を保存しました");
        });
    });

    // input値変更時の処理
    $(".Setting_item input").on("change input",function(){
        $(this).next().html($(this).val());
    });
})();