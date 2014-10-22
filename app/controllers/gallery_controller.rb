class GalleryController < ApplicationController
  def index
    @images = Dir["public/images/uploads/*.jpg"]
  end
end
