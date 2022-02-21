require 'test_helper'

class Api::V1::PatientProfilesControllerTest < ActionDispatch::IntegrationTest
  test 'should get show' do
    get api_v1_patient_profiles_show_url
    assert_response :success
  end

  test 'should get create' do
    get api_v1_patient_profiles_create_url
    assert_response :success
  end

  test 'should get update' do
    get api_v1_patient_profiles_update_url
    assert_response :success
  end
end
