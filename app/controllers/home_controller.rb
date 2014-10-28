class HomeController < ApplicationController
  def index
    @images = Dir["public/images/uploads/site-size/*.jpg"]
  end


end
