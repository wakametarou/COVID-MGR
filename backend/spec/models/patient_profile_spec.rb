require 'rails_helper'

RSpec.describe PatientProfile, type: :model do
  # describe '患者様プロフィール作成機能' do
  #   context 'プロフィール作成' do
  #     before do
  #       user = FactoryBot.create(:user)
  #     end
  #     it '正しく作成出来る事'do
  #     patient_profile = FactoryBot.build(:patient_profile, user_id: user.id)
  #       expect(patient_profile).to be_valid
  #       patient_profile.save
  #       answered_patient_profile = User.find_by(user_id: user.id)
  #       expect(answered_patient_profile.room_number).to eq("1010")
  #       expect(answered_patient_profile.phone_number).to eq("00011112222")
  #       expect(answered_patient_profile.emergency_address).to eq("00099998888")
  #       expect(answered_patient_profile.address).to eq("test1-1")
  #       expect(answered_patient_profile.building).to eq("test312")
  #       expect(answered_patient_profile.user_id).to eq(user.id)
  #     end
  #   end
  # end
end
