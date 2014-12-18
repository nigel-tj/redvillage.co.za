class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string :name
      t.text :description
      t.string :picture

      t.timestamps
    end
  end
end
