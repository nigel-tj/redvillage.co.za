class HomeController < ApplicationController
    def index
    @images = Dir["public/images/uploads/*.jpg"]
  end

end
