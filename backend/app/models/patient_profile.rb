class PatientProfile < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :user
  with_options presence: true do
    validates :room_number, numericality: { in: 1..9999 }
    validates :phone_number, numericality: { in: 9999999999..99999999999 }
    validates :emergency_address, numericality: { in: 9999999999..99999999999 }
    validates :address, length: { in: 1..100 }
    validates :building, length: { in: 1..100 }
    validates :user_id
  end
end
