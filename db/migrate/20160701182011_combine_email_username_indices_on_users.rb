class CombineEmailUsernameIndicesOnUsers < ActiveRecord::Migration
  def change
    remove_index :users, :email
    add_index :users, [:username, :email], unique: true
  end
end
