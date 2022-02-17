class CreateOtherSymptoms < ActiveRecord::Migration[6.1]
  def change
    create_table :other_symptoms do |t|
      t.integer :pain_degree
      t.string :concrete
      t.references :interview, foreign_key: true
      t.timestamps
    end
  end
end
