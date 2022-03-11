require 'rails_helper'

RSpec.describe "PatientProfiles", type: :request do
  describe 'PatientProfilesAPI' do
    context "患者様プロフィール機能" do
      it "プロフィール表示" do
        user = FactoryBot.create(:user)
        auth_tokens = sign_in(user)
        get "/api/v1//patient_profiles/show", headers: auth_tokens
        expect(response).to have_http_status(200)
      end

      it "プロフィール作成" do
        user = FactoryBot.create(:user)
        auth_tokens = sign_in(user)
        post "/api/v1/patient_profiles/create", params: {
          patient_profile: FactoryBot.attributes_for(:patient_profile)
          } ,
          headers: auth_tokens
        expect(response).to have_http_status(200)
      end

      it "プロフィール編集" do
        user = FactoryBot.create(:user)
        FactoryBot.create(:patient_profile_img, user_id: user.id)
        auth_tokens = sign_in(user)
        put "/api/v1/patient_profiles/update", params: {
          patient_profile: FactoryBot.attributes_for(:patient_profile)
          } ,
        headers: auth_tokens
        expect(response).to have_http_status(200)
      end
    end
  end
end
