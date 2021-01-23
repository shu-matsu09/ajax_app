class PostsController < ApplicationController
  def index 
    @posts = Post.all.order(id: "DESC")
  end

  def create
    # 既読や未読の情報を追加したため、メモ作成時に未読の情報を保存するようにしたこと
    post = Post.create(content: params[:content], checked: false)
    # Ajaxを実現するため、レスポンスをJSONに変更したこと
    render json: { post: post }
  end

  def checked
    # URLパラメーターから、既読したメモのidが渡され、そのidを使用して該当するレコードを取得
    post = Post.find(params[:id])
    # if文で、post.checkedという既読であるか否かを判定するプロパティを指定
    if post.checked
      # 既読であれば「既読を解除するためにfalseへ変更」
      post.update(checked: false)
    else
      # 既読でなければ「既読にするためにtrueへ変更」
      # updateはActiveRecordのメソッド
      post.update(checked: true)
    end
    
    # 更新したレコードをitemに取得し直す
    item = Post.find(params[:id])
    # JSON形式(データ)としてchecked.jsに返却
    render json: { post: item }
  end
end
