require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'サインアップ機能' do
    context 'サインインする' do
      it '正しく登録出来る事 名前:髙野晃 性別:true 種類:true メール:test@test.com パスワード:testpassword 確認パスワード:testpassword'do
        user = User.new(
          name: "高野 晃",
          patient_or_doctor: true,
          sex: true,
          email: "test_user@test.com",
          password: "testpassword",
          password_confirmation: "testpassword",
        )
        expect(user).to be_valid
        user.save
        answered_user = User.find_by(email: "test_user@test.com");
        expect(answered_user.name).to eq("高野 晃")
        expect(answered_user.patient_or_doctor).to eq(true)
        expect(answered_user.sex).to eq(true)
        expect(answered_user.email).to eq("test_user@test.com")
      end
    end
  end

  describe '入力項目の有無' do
    context '必須入力であること' do
      it '名前が必須であること' do
        new_user = User.new
        expect(new_user).not_to be_valid
        expect(new_user.errors[:name]).to include(I18n.t('errors.messages.blank'))
      end

      it '性別が必須であること' do
        new_user = User.new
        expect(new_user).not_to be_valid
        expect(new_user.errors[:sex]).to include(I18n.t('errors.messages.blank'))
      end

      it 'ユーザーの種類が必須であること' do
        new_user = User.new
        expect(new_user).not_to be_valid
        expect(new_user.errors[:patient_or_doctor]).to include(I18n.t('errors.messages.blank'))
      end

      it 'メールアドレスが必須であること' do
        new_user = User.new
        expect(new_user).not_to be_valid
        expect(new_user.errors[:email]).to include(I18n.t('errors.messages.blank'))
      end

      it 'パスワードが必須であること' do
        new_user = User.new
        expect(new_user).not_to be_valid
        expect(new_user.errors[:password]).to include(I18n.t('errors.messages.blank'))
      end

      it '登録できないこと' do
        new_user = User.new
        expect(new_user.save).to be_falsey
      end
    end
  end
end
