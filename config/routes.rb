Rails.application.routes.draw do
  resources :messages
  resources :rooms do
    member do
      get :messages
    end
  end

  root to: "home#index" 
  get "dashboard", to: "home#dashboard"
  get "mytask" ,to:"home#mytask"

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  resources :workspaces, except: [:new, :edit, :show] do
    get "add_member"
    resources :boards, shallow: true do
      resources :groups, shallow: true do
        get :charts, on: :member

        resources :items, shallow: true do
          member do
            get :posts
          end
          resources :posts, shallow: true do
            member do
              post :likes
              get :replies
            end
            resources :replies, only: [:create, :destroy]
          end
        end
      end
    end
  end
  # Github redirect
  get "/oauth/redirect", to: "githubs#index"

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
  
  patch "/item/statusupdate", to: "items#update_status"
  patch "/item/nameupdate", to: "items#update_name"
  patch "/item/descriptionupdate", to: "items#update_description"
  patch "/item/groupupdate", to: "items#update_status"
  resources :webrtc, only: [:index, :create]
  mount ActionCable.server, at: "/cable"
end
