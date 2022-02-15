class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken
        before_action :configure_permitted_parameters, if: :devise_controller?

        skip_before_action :verify_authenticity_token
        helper_method :current_user, :user_signed_in?

        def configure_permitted_parameters
                devise_parameter_sanitizer.permit(:sign_up, keys: [
                        :email, :password, :password_confirmation, :name, :patient_or_doctor, :sex,
                        patient_profiles_attributes:[:room_number, :phone_number, :emergency_address, :address, :bilding, :user_id]
                        ])
        end
end
