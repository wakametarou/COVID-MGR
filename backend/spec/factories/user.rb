FactoryBot.define do
  factory :user do
    name { '高野 晃' }
    patient_or_doctor { true }
    sex { true }
    email { 'test_user@test.com' }
    password { 'testpassword' }
    password_confirmation { 'testpassword' }
  end

  factory :user_2_same_email, class: 'User' do
    name { '高野 裕見' }
    patient_or_doctor { true }
    sex { false }
    email { 'test_user@test.com' }
    password { 'testpassword' }
    password_confirmation { 'testpassword' }
  end

  factory :user_3, class: 'User' do
    name { '高野 美智子' }
    patient_or_doctor { true }
    sex { false }
    email { 'test_user_3@test.com' }
    password { 'testpassword' }
    password_confirmation { 'testpassword' }
  end

  factory :doctor, class: 'User' do
    name { '高野 勝義' }
    patient_or_doctor { false }
    sex { true }
    email { 'test_user_3@test.com' }
    password { 'testpassword' }
    password_confirmation { 'testpassword' }
  end
end
