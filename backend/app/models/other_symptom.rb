class OtherSymptom < ApplicationRecord
  belongs_to :interview

  with_options presence: true do
    validates :pain_degree, numericality: { in: 1..5 }
    validates :concrete, length: { in: 1..300 }
    validates :interview_id
  end
end
