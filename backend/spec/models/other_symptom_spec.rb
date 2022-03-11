require 'rails_helper'

RSpec.describe OtherSymptom, type: :model do
  describe '問診作成機能' do
    context 'その他症状作成' do
      it '正しく作成出来る事'do
        user = FactoryBot.create(:user)
        interview = FactoryBot.create(:interview, user_id: user.id)
        other = OtherSymptom.new(pain_degree: 1, concrete: "痛い", interview_id: interview.id)
        expect(other).to be_valid
        other.save
        answered_other = OtherSymptom.find_by(interview_id: interview.id)
        expect(answered_other.pain_degree).to eq(1)
        expect(answered_other.concrete).to eq("痛い")
        expect(answered_other.interview_id).to eq(interview.id)
      end
    end
  end

  describe '入力項目の有無' do
    let(:new_other){OtherSymptom.new}
    context 'db保存時に必須入力であること' do
      it '痛みの程度が必須であること' do
        expect(new_other).not_to be_valid
        expect(new_other.errors[:pain_degree]).to include(I18n.t('errors.messages.blank'))
      end

      it '症状の詳細が必須であること' do
        expect(new_other).not_to be_valid
        expect(new_other.errors[:concrete]).to include(I18n.t('errors.messages.blank'))
      end

      it '問診idが必須であること' do
        expect(new_other).not_to be_valid
        expect(new_other.errors[:interview_id]).to include(I18n.t('errors.messages.blank'))
      end

      it '保存できないこと' do
        expect(new_other.save).to be_falsey
      end
    end
  end
end
