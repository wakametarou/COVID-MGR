class CreatePatientInfos < ActiveRecord::Migration[6.1]
  def change
    create_table :patient_infos do |t|
      t.integer :room_number
      t.string :phone_number
      t.string :emergency_address
      t.string :address
      t.string :bilding
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
