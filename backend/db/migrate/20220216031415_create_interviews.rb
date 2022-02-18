class CreateInterviews < ActiveRecord::Migration[6.1]
  def change
    create_table :interviews do |t|
      t.integer :temperature
      t.integer :oxygen_saturation
      t.time :instrumentation_time
      t.integer :status
      t.boolean :other
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
