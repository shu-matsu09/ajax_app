class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content
      # trueまたはfalseの真理値を判断する型。「既読か未読か」を管理する
      t.boolean :checked
      t.timestamps
    end
  end
end
