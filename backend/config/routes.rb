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
    end
  end
end
