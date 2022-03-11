require 'rails_helper'

RSpec.describe "Interviews", type: :request do
  describe "GET /interviews" do
    it "works! (now write some real specs)" do
      get interviews_path
      expect(response).to have_http_status(200)
    end
  end

  describe 'InterviewsAPI' do
    context "問診作成機能" do
      it "患者様本人の問診一覧表示" do
        user = FactoryBot.create(:user)
        auth_tokens = sign_in(user)
        get "/api/v1//patient_profiles/show", headers: auth_tokens
        expect(response).to have_http_status(200)
      end

      # it "指定した患者様の問診表示" do
      #   user = FactoryBot.create(:user)
      #   auth_tokens = sign_in(user)
      #   post "/api/v1/patient_profiles/create", params: {
      #     patient_profile: FactoryBot.attributes_for(:patient_profile)
      #     } ,
      #     headers: auth_tokens
      #   expect(response).to have_http_status(200)
      # end

      # it "問診詳細" do
      #   user = FactoryBot.create(:user)
      #   FactoryBot.create(:patient_profile_img, user_id: user.id)
      #   auth_tokens = sign_in(user)
      #   put "/api/v1/patient_profiles/update", params: {
      #     patient_profile: FactoryBot.attributes_for(:patient_profile)
      #     } ,
      #   headers: auth_tokens
      #   expect(response).to have_http_status(200)
      # end
    end
  end
end
