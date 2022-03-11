require 'rails_helper'

RSpec.describe Answer, type: :model do
  before(:each) do
    load Rails.root.join("db/seeds.rb")
  end

  describe '問診作成機能' do
    context '回答作成' do
      it '正しく作成出来る事'do
        user = FactoryBot.create(:user)
        question = Question.last
        interview = FactoryBot.create(:interview, user_id: user.id)
        answer = Answer.new(answer: true, question_id: question.id, interview_id: interview.id)
        expect(answer).to be_valid
        answer.save
        answered_answer = Answer.find_by(interview_id: interview.id)
        expect(answered_answer.answer).to eq(true)
        expect(answered_answer.question_id).to eq(question.id)
        expect(answered_answer.interview_id).to eq(interview.id)
      end
    end
  end
end
