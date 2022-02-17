Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      
      namespace :auth do
        resource :sessions, only: %i[index]
      end
      get 'patient_profiles/show'
      post 'patient_profiles/create'
      put 'patient_profiles/update'
      # resources :patient_profiles, only: [:show, :create, :update]
      # patient_profilesをresourcesでまとめたいがidがついてくるので考え直す

      get 'interviews/index'
      get 'interviews/show'
      get 'interviews/new'
      # post 'interviews/confirm'
      post 'interviews/create'
      # resources :interviews, only: [ :index, :show, :new, :create] do
      #   collection do
      #     post :confirm
      #   end
      # end
    end
  end
end
