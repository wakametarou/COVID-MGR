class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  with_options presence: true do
    validates :name
    validates :sex
    validates :patient_or_doctor
  end
  has_one :patient_profile, dependent: :destroy
  has_many :interviews, dependent: :destroy
end
