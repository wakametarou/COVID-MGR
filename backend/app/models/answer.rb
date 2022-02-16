class Answer < ApplicationRecord
  belongs_to :interview
  belongs_to :question
end
