class TwitterController < ApplicationController
    before_filter :authenticate_user
    
    def generate_twitter_oauth_url
    	oauth_callback = "http://#{request.host}:#{request.port}/oauth_account"
    
    	@consumer = OAuth::Consumer.new("your-consumer-key","your-consumer-secret", :site => "https://api.twitter.com")
    
              @request_token = @consumer.get_request_token(:oauth_callback => oauth_callback)
     	session[:request_token] = @request_token
    
    	redirect_to @request_token.authorize_url(:oauth_callback => oauth_callback)
    end
end
