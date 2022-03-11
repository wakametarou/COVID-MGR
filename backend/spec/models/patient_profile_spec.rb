require 'rails_helper'

RSpec.describe PatientProfile, type: :model do
  describe '患者様プロフィール作成機能' do
    context 'プロフィール作成' do
      it '正しく作成出来る事'do
        user = FactoryBot.create(:user)
        patient_profile = FactoryBot.build(:patient_profile, user_id: user.id)
        expect(patient_profile).to be_valid
        patient_profile.save
        answered_patient_profile = PatientProfile.find_by(user_id: user.id)
        expect(answered_patient_profile.room_number).to eq("1010")
        expect(answered_patient_profile.phone_number).to eq("00011112222")
        expect(answered_patient_profile.emergency_address).to eq("00099998888")
        expect(answered_patient_profile.address).to eq("test1-1")
        expect(answered_patient_profile.building).to eq("test312")
        expect(answered_patient_profile.user_id).to eq(user.id)
      end

      it '画像付きで正しく作成出来る事'do
        user = FactoryBot.create(:user)
        patient_profile = FactoryBot.build(:patient_profile_img, user_id: user.id)
        expect(patient_profile).to be_valid
        patient_profile.save
        answered_patient_profile = PatientProfile.find_by(user_id: user.id)
        expect(answered_patient_profile.room_number).to eq("1010")
        expect(answered_patient_profile.phone_number).to eq("00011112222")
        expect(answered_patient_profile.emergency_address).to eq("00099998888")
        expect(answered_patient_profile.address).to eq("test1-1")
        expect(answered_patient_profile.building).to eq("test312")
        expect(answered_patient_profile.user_id).to eq(user.id)
      end
    end
  end

  describe '入力項目の有無' do
    let(:new_patient_profile){PatientProfile.new}
    context 'db保存時に必須入力であること' do
      it '部屋番号が必須であること' do
        expect(new_patient_profile).not_to be_valid
        expect(new_patient_profile.errors[:room_number]).to include(I18n.t('errors.messages.blank'))
      end

      it '電話番号が必須であること' do
        expect(new_patient_profile).not_to be_valid
        expect(new_patient_profile.errors[:phone_number]).to include(I18n.t('errors.messages.blank'))
      end

      it '緊急連絡先が必須であること' do
        expect(new_patient_profile).not_to be_valid
        expect(new_patient_profile.errors[:emergency_address]).to include(I18n.t('errors.messages.blank'))
      end

      it '住所が必須であること' do
        expect(new_patient_profile).not_to be_valid
        expect(new_patient_profile.errors[:address]).to include(I18n.t('errors.messages.blank'))
      end

      it '地区、建物名が必須であること' do
        expect(new_patient_profile).not_to be_valid
        expect(new_patient_profile.errors[:building]).to include(I18n.t('errors.messages.blank'))
      end

      it '保存できないこと' do
        expect(new_patient_profile.save).to be_falsey
      end
    end
  end
end
