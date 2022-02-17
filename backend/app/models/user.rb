class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  mount_uploader :image, ImageUploader

  has_one :patient_profile, dependent: :destroy
  has_many :interviews, dependent: :destroy
end
