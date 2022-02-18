class Answer < ApplicationRecord
  belongs_to :interview
  belongs_to :question

  with_options presence: true do
    validates :question_id
    validates :interview_id
  end
  validates :answer, inclusion: { in: [true, false] }
end
