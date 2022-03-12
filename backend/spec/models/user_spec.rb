require 'rails_helper'

RSpec.describe User, type: :model do
  # describe '共通メソッド' do
  #   it_behaves_like '患者様情報'
  # end
  describe 'サインアップ機能' do
    context 'サインインする' do
      it '正しく登録出来る事' do
        user = FactoryBot.build(:user)
        expect(user).to be_valid
        user.save
        answered_user = User.find_by(email: 'test_user@test.com')
        expect(answered_user.name).to eq('高野 晃')
        expect(answered_user.patient_or_doctor).to eq(true)
        expect(answered_user.sex).to eq(true)
        expect(answered_user.email).to eq('test_user@test.com')
      end
    end
  end

  describe '入力項目の有無' do
    let(:new_user) { User.new }
    context 'db保存時に必須入力であること' do
      it '名前が必須であること' do
        expect(new_user).not_to be_valid
        expect(new_user.errors[:name]).to include(I18n.t('errors.messages.blank'))
      end

      it 'メールアドレスが必須であること' do
        expect(new_user).not_to be_valid
        expect(new_user.errors[:email]).to include(I18n.t('errors.messages.blank'))
      end

      it 'パスワードが必須であること' do
        expect(new_user).not_to be_valid
        expect(new_user.errors[:password]).to include(I18n.t('errors.messages.blank'))
      end

      it '登録できないこと' do
        expect(new_user.save).to be_falsey
      end
    end
  end

  describe 'サインアップ時の条件' do
    context 'メールアドレスを確認すること' do
      before do
        user = FactoryBot.create(:user)
      end
      it '同じメールアドレスで再びサインアップできないこと' do
        re_user = FactoryBot.build(:user_2_same_email)
        expect(re_user).not_to be_valid
        expect(re_user.errors[:email]).to include(I18n.t('errors.messages.taken'))
        expect(re_user.save).to be_falsey
        expect(User.all.size).to eq 1
      end

      it '異なるメールアドレスでサインアップできること' do
        re_user = FactoryBot.build(:user_3)
        expect(re_user).to be_valid
        re_user.save
        expect(User.all.size).to eq 2
      end
    end
  end

  describe 'メールアドレスの形式' do
    context '不正な形式のメールアドレスの場合' do
      it 'エラーになること' do
        new_user = User.new
        new_user.email = 'bad.email'
        expect(new_user).not_to be_valid
        expect(new_user.errors[:email]).to include('is not an email')
      end
    end
  end
end
