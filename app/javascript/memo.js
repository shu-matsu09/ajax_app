function memo() {
  // メモを「投稿する」ボタンのidを取得
  const submit = document.getElementById("submit");
  // 「投稿する」ボタンをクリックした場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // new FormData(フォームの要素);のようにフォームに入力された値を取得したオブジェクトを生成
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // openメソッドを使用してリクエストの内容を引数へ追記。HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.open("POST", "/posts", true);
    // 返却されるデータ形式をJSONに指定
    XHR.responseType = "json";
    // フォームの値を取得した情報を送信
    XHR.send(formData);

    XHR.onload = () => {
      // 既読機能と同様に200以外のHTTPステータスが返却された場合の処理を記述
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // itemは、レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // formTextを取得する理由は、この処理が終了した時に入力フォームの文字が入力されたままになってしまうため、メモの入力フォームをリセットする。リセット対象の要素であるcontentを取得している
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時:${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      // listという要素に対してinsertAdjacentHTMLでHTMLを追加。第一引数にafterendを指定して要素listの直後に挿入
      list.insertAdjacentHTML("afterend", HTML);
      // 以下のコードにより、「メモの入力フォームに入力されたままの文字」をリセット
      formText.value = "";
    };
    // preventDefault()によって標準設定されているDefaultイベント(ex:submitボタンでclickするとcreateアクションを実行、等)を阻止する(prevent)メソッド
    e.preventDefault();
  });
}
window.addEventListener("load", memo);