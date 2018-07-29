class CreateStories < ActiveRecord::Migration[5.2]
  def change
    create_table :stories do |t|
      t.string :title
      t.text :content
      t.datetime :datetime_field
      t.time :time_field
      t.date :datefield
      t.timestamp :timestamp_field

      t.timestamps
    end
  end
end
