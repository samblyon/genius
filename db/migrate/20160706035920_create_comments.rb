class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.string :commentable_type, null: false
      t.integer :commentable_id, null: false

      t.timestamps null: false
    end
    add_reference :comments, :author, references: :users, index: true
    add_index :comments, [:commentable_id, :commentable_type]
  end
end
