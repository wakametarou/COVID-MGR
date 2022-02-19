class CreatePatientProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :patient_profiles do |t|
      t.string :image
      t.integer :room_number
      t.string :phone_number
      t.string :emergency_address
      t.string :address
      t.string :building
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
