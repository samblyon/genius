class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :author_id
      t.text :body
      t.string :start_index
      t.integer :start_index
      t.integer :end_index

      t.timestamps null: false
    end
  end
end
