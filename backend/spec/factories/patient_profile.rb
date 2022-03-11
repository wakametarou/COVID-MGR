FactoryBot.define do
  factory :patient_profile do
    room_number { "1010" }
    phone_number { "00011112222" }
    emergency_address { "00099998888" }
    address { "test1-1" }
    building { "test312" }
  end

  factory :patient_profile_img , class: 'PatientProfile' do
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/test.jpg')) }
    room_number { "1010" }
    phone_number { "00011112222" }
    emergency_address { "00099998888" }
    address { "test1-1" }
    building { "test312" }
  end
end
