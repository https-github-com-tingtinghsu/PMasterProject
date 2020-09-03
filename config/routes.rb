Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index" 
  # get"/test" ,to:"pages#index"

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  resources :workspaces do
    resources :boards, shallow: true do
      resources :groups, shallow: true
    end
  end



  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  resources :pages, only:[:index]
end
