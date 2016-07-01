class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :song_id, null: false
      t.text :body, null: false
      t.integer :start_index, null: false
      t.integer :end_index, null: false

      t.timestamps null: false
    end
    add_reference :annotations, :author, references: :users, index: true
    add_foreign_key :annotations, :users, column: :author_id
    add_foreign_key :annotations, :songs
    add_index :annotations, [:song_id]
    add_index :annotations, [:start_index, :end_index]
  end
end
