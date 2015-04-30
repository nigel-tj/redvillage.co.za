Rails.application.routes.draw do

  resources :documents
  devise_for :users

  namespace :admins do
  get 'admins/index'
  end

  devise_for :admins


  resources :events
  resources :admins, only: :index

  get 'rest_client/deezer'
  get '/token' => 'home#token', as: :token
  get 'users/new'
  get 'gallery/index'
  get 'home/index'
  get 'home/about_us'
  get 'home/calendar'
  get 'user/index'
  get 'home/lifestyle'
  get 'home/videos'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  match '/index' => 'home#index', :as => 'index', :via => :get
  match '/about' => 'home#about_us', :as => 'about', :via => :get
  match 'gallery' => 'gallery#index', :as => 'gallery', :via => :get
  match '/calendar'   => 'home#calendar', :via => :get
  match 'admins' => 'admins#index', :via => :get
  match 'uploads' => 'uploads#new', :via => :get
  match 'user' => 'user#index', :via => :get
  match '/store' => 'home#store', :via => :get
  match '/trends' => 'home#trends', :via => :get
  match '/music' => 'home#music', :via => :get
  match '/lifestyle' => 'home#lifestyle', :via => :get
  match '/contact' => 'home#contact', :via => :get
  match '/videos' => 'home#videos', :via => :get
  # You can have the root of your site routed with "root"
  root 'home#index'
  #root to: 'documents#new'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
