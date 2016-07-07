class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :user_id, null: false
      t.integer :vote, null: false
      t.integer :upvotable_id, null: false
      t.string :upvotable_type, null: false

      t.timestamps null: false
    end
    add_foreign_key :votes, :users, index: true
    add_index :votes, [:upvotable_id, :upvotable_type]
    add_index :votes, [:user_id, :upvotable_id, :upvotable_type], unique: true

  end
end
