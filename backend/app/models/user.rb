class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  with_options presence: true do
    validates :name
  end
  validates :sex, inclusion: { in: [true, false] }
  validates :patient_or_doctor, inclusion: { in: [true, false] }
  has_one :patient_profile, dependent: :destroy
  has_many :interviews, dependent: :destroy

  def users_format(user)
    {
      id: user.id,
      image: PatientProfile.find_by(user_id: user.id)&.image&.url,
      name: user.name,
      sex: user.sex,
      room_number: PatientProfile.find_by(user_id: user.id)&.room_number,
      status: Interview.order(created_at: :desc).find_by(user_id: user.id)&.status
    }
  end

  def user_format(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      sex: user.sex
    }
  end

  # リファクタリングで使いたいインスタンスメソッド
  # def patient_profile_format(patient_profile)
  #   {
  #     id: patient_profile&.id,
  #     image: patient_profile&.image&.url,
  #     room_number: patient_profile&.room_number,
  #     phone_number: patient_profile&.phone_number,
  #     emergency_address: patient_profile&.emergency_address,
  #     address: patient_profile&.address,
  #     building: patient_profile&.building,
  #     user_id: patient_profile&.user_id
  #   }
  # end
  # def interview_format(interview)
  #   {
  #     id: interview&.id,
  #     temperature: interview&.temperature,
  #     oxygen_saturation: interview&.oxygen_saturation,
  #     instrumentation_time: interview&.instrumentation_time,
  #     status: interview&.status,
  #     other: interview&.other,
  #     user_id: interview&.user_id
  #   }
  # end
end
