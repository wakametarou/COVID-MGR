class Interview < ApplicationRecord
  has_one :other_symptom, dependent: :destroy
  has_many :answers, dependent: :destroy
  belongs_to :user
end
