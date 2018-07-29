class RemoveColumns < ActiveRecord::Migration[5.2]
  def self.up
    remove_column :stories, :time_field
    remove_column :stories, :datefield
    remove_column :stories, :timestamp_field
  end
  def self.down
    add_column :stories, :time_field
    add_column :stories, :datefield
    add_column :stories, :timestamp_field
  end
end
