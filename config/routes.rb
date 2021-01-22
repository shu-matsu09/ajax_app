Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  # メモのidを取得。queryパラメーターを使用した場合、/posts/?id=1とリクエストを送ると、
  # params[:id]にてパラメーターを取得できる。今回はpathパラメーターで、一意の情報であるidを取得する
  get 'posts/:id', to: 'posts#checked'
end
