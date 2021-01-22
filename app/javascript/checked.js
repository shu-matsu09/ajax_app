// DOMの取得からエンドポイントへのリクエストなどはすべてこのcheck関数へ記述
function check() {
  // postをクラス名にもつ要素を取得
  const posts = document.querySelectorAll(".post");
  // forEachで複数取得した各要素に対して繰り返し処理を実行
  posts.forEach(function (post) { 
    // setIntervalによる問題を解消する記述。1回目はイベント発火が起きている要素にdata-load = "true"はまだ追加されていないためif文の処理はされない
    if (post.getAttribute("data-load") != null) {
      // 2回目はイベント発火が起きている要素data-loadにtrue属性が追加されているためreturn nullを返し処理を止める
      return null;
    }
    // data-load要素にtrue属性を追加し、上記の2回目以降の繰り返しを止める処理をさせる
    post.setAttribute("data-load", "true");
    // 要素一つずつに対して「クリック」した際に動作するイベント駆動の設定
    post.addEventListener("click", () => { 
      // getAttributeで属性値(メモのid)を取得
      const postId = post.getAttribute("data-id");
      // 変数XHRからXMLHttpRequestのメソッドを使用できるようになる
      const XHR = new XMLHttpRequest();
      // openメソッドでリクエストを初期化。opne("HTTPメソッド", `パスの指定`, 非同期通信のtrue/false )
      XHR.open("GET", `/posts/${postId}`, true);
      // responseTypeメソッドでレスポンスとして欲しい情報の形式を指定する必要あり
      XHR.responseType = "json";
      // sendメソッドではじめてリクエストを送信できる
      XHR.send();
      // onloadプロパティはレスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
      XHR.onload = () => {
        // statusメソッドによってステータスコードを確認。200(処理の成功)以外ではアラートを表示
        if (XHR.status != 200) {
          // XHR.statusTextによってエラーが生じたオブジェクトに含まれるエラーメッセージを表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 以下の記述でJavaScriptの処理から抜け、29行目以降の処理を実行しない
          return null;
        }
        // XHR.responseでレスポンスされてきたJSONにアクセスできる。checkedアクションで返却されたitemをXHR.response.postで取得
        const item = XHR.response.post;
        // 既読であればindex.html.erbに定義したdata-checkの属性値にtrueをセット
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
          // 未読であればdata-checkを属性ごと削除
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
// setIntervalメソッド一定の時間(第二引数)ごとに指定した関数(第一引数)などを実行
setInterval(check, 1000)
// window(ページ)をload(読み込み)した時にcheckを実行
// window.addEventListener("load", check);