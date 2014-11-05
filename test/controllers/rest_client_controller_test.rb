require 'test_helper'

class RestClientControllerTest < ActionController::TestCase
  test "should get deezer" do
    get :deezer
    assert_response :success
  end

end
