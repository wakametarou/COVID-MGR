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
end
