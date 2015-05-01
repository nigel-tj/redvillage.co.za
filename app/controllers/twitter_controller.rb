class TwitterController < ApplicationController
    before_filter :authenticate_user
end
