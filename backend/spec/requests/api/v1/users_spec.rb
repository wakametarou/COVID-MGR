require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe 'UsersAPI' do
    context "患者様情報の表示" do
      it "患者様一覧の表示" do
        user = FactoryBot.create(:user)
        doctor = FactoryBot.create(:doctor)
        auth_tokens = sign_in(doctor)
        get "/api/v1/users/index", headers: auth_tokens
        expect(response).to have_http_status(200)
      end

      it "患者様詳細の表示" do
        user = FactoryBot.create(:user)
        doctor = FactoryBot.create(:doctor)
        auth_tokens = sign_in(doctor)
        get "/api/v1/users/show/?id=#{user.id}", headers: auth_tokens
        expect(response).to have_http_status(200)
      end
    end
  end
end
