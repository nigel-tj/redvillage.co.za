class HomeController < ApplicationController
  def index
    @images = Dir["public/images/uploads/*.jpg"]
  end
  def about_us
  end
  
  def contact
  end
  def style
  end
  

end
