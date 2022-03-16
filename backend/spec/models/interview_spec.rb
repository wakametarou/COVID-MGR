require 'rails_helper'

RSpec.describe Interview, type: :model do
  describe '問診作成機能' do
    context 'その他症状作成' do
      it '正しく作成出来る事' do
        user = FactoryBot.create(:user)
        interview = FactoryBot.build(:interview, user_id: user.id)
        expect(interview).to be_valid
        interview.save
        answered_interview = Interview.find_by(user_id: user.id)
        expect(answered_interview.temperature).to eq(36)
        expect(answered_interview.oxygen_saturation).to eq(100)
        # expect(answered_interview.instrumentation_time).to eq('2000-01-01 06:58:19.000000000 +0900')
        expect(answered_interview.status).to eq(9)
        expect(answered_interview.other).to eq(true)
        expect(answered_interview.user_id).to eq(user.id)
      end
    end
  end

  describe '入力項目の有無' do
    let(:new_interview) { Interview.new }
    context 'db保存時に必須入力であること' do
      it '体温が必須であること' do
        expect(new_interview).not_to be_valid
        expect(new_interview.errors[:temperature]).to include(I18n.t('errors.messages.blank'))
      end

      it '酸素飽和度が必須であること' do
        expect(new_interview).not_to be_valid
        expect(new_interview.errors[:oxygen_saturation]).to include(I18n.t('errors.messages.blank'))
      end

      it '計測時間が必須であること' do
        expect(new_interview).not_to be_valid
        expect(new_interview.errors[:instrumentation_time]).to include(I18n.t('errors.messages.blank'))
      end

      it '状態が必須であること' do
        expect(new_interview).not_to be_valid
        expect(new_interview.errors[:status]).to include(I18n.t('errors.messages.blank'))
      end

      it '患者様idが必須であること' do
        expect(new_interview).not_to be_valid
        expect(new_interview.errors[:user_id]).to include(I18n.t('errors.messages.blank'))
      end

      it '保存できないこと' do
        expect(new_interview.save).to be_falsey
      end
    end
  end
end
