require 'rails_helper'

RSpec.describe "Interviews", type: :request do
  describe 'InterviewsAPI' do
    context "問診作成機能" do
      it "患者様本人の問診一覧表示" do
        user = FactoryBot.create(:user)
        FactoryBot.create(:interview, user_id: user.id)
        auth_tokens = sign_in(user)
        get "/api/v1/interviews/index", headers: auth_tokens
        expect(response).to have_http_status(200)
      end

      it "指定した患者様の問診表示" do
        user = FactoryBot.create(:user)
        FactoryBot.create(:interview_not_other, user_id: user.id)
        doctor = FactoryBot.create(:doctor)
        auth_tokens = sign_in(doctor)
        get "/api/v1/interviews/index?id=#{user.id}", headers: auth_tokens
        expect(response).to have_http_status(200)
      end

      it "問診詳細" do
        user = FactoryBot.create(:user)
        interview = FactoryBot.create(:interview_not_other, user_id: user.id)
        auth_tokens = sign_in(user)
        get "/api/v1/interviews/show?id=#{interview.id}", headers: auth_tokens
        expect(response).to have_http_status(200)
      end

      it "問診作成必要情報取得" do
        user = FactoryBot.create(:user)
        auth_tokens = sign_in(user)
        get "/api/v1/interviews/new", headers: auth_tokens
        expect(response).to have_http_status(200)
      end

      it "問診作成必要情報取得" do
        user = FactoryBot.create(:user)
        auth_tokens = sign_in(user)
        params = {
          interview: FactoryBot.attributes_for(:interview),
          answers: [FactoryBot.attributes_for(:answer)],
          otherSymptom: FactoryBot.attributes_for(:other_symptom)
        }
        post "/api/v1/interviews/create", params: params, headers: auth_tokens
        expect(response).to have_http_status(200)
      end
    end
  end
end
