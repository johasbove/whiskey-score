require 'test_helper'

class Api::V1::WhiskeyBrandControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_whiskey_brand_index_url
    assert_response :success
  end

end
