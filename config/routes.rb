Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index" 
  # 開發期間需要常常測試預覽寄出的Email內容，但是實際寄送出去又很沒效率。使用letter_opener
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

end
