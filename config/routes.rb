Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    devise_for :users
    resources :songs, only: [:create, :index, :show]
    resources :annotations, except: [:new]
  end
  root to: "static_pages#root"
end
