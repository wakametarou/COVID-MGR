require "test_helper"

class Api::V1::InterviewsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_interviews_index_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_interviews_show_url
    assert_response :success
  end

  test "should get new" do
    get api_v1_interviews_new_url
    assert_response :success
  end

  test "should get confirm" do
    get api_v1_interviews_confirm_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_interviews_create_url
    assert_response :success
  end
end
