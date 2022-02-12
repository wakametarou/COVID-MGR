class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    def sign_up_params
      params.permit(
        :email, :password, :password_confirmation, :name, :patient_or_doctor, :sex,
        patient_info_attributes: [:room_number, :phone_number, :emergency_address, :address, :bilding]
      )
    end
end
