require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe 'UsersAPI' do
    context "一覧の表示" do
      it "患者様の一覧の表示" do
        FactoryBot.create(:user)
        doctor = FactoryBot.create(:doctor)
        auth_tokens = sign_in(doctor)
        get "/api/v1/users/index", headers: auth_tokens
        expect(response).to have_http_status(200)
      end
    end
  end
end
