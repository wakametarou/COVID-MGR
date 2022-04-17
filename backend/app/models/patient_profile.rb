class PatientProfile < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :user
  with_options presence: true do
    validates :room_number, numericality: { in: 1..9999 }
    validates :phone_number, numericality: { in: 9_999_999_999..99_999_999_999 }
    validates :emergency_address, numericality: { in: 9_999_999_999..99_999_999_999 }
    validates :address, length: { in: 1..100 }
    validates :building, length: { in: 1..100 }
    validates :user_id
  end

  def profile_format(patient_profile)
    {
      image: patient_profile.image.url,
      room_number: patient_profile.room_number,
      phone_number: patient_profile.phone_number,
      emergency_address: patient_profile.emergency_address,
      address: patient_profile.address,
      building: patient_profile.building
    }
  end
end
