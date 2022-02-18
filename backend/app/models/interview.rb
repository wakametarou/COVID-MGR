class Interview < ApplicationRecord
  has_one :other_symptom, dependent: :destroy
  has_many :answers, dependent: :destroy
  belongs_to :user

  with_options presence: true do
    validates :temperature, numericality: { in: 30..45 }
    validates :oxygen_saturation, numericality: { in: 1..100 }
    validates :instrumentation_time
    validates :status, numericality: { in: 1..10 }
    validates :user_id
  end
  validates :other, inclusion: { in: [true, false] }
end
