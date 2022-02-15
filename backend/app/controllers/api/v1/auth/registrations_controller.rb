class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  
  def create
    super
    # @params = parameters
    # puts "hollow"
    # puts params
    # puts params[:name]
    # puts "hollow"

    # puts params[:patient_profile][:room_number]
    # @patient_profile = PatientProfile.new()
    # @user = User.new(
    #   name: params[:name],
    #   email: params[:email],
    #   password: params[:password],
    #   password_confirmation: params[:password_confirmation],
    #   patient_or_doctor: params[:patient_or_doctor],
    #   sex: params[:sex]
    # )
    
    
    patient_profile = PatientProfile.new(
      room_number: params[:patient_profile][:room_number],
      phone_number: params[:patient_profile][:phone_number],
      emergency_address: params[:patient_profile][:emergency_address],
      address: params[:patient_profile][:address],
      bilding: params[:patient_profile][:bilding],
      user_id: resource.id
    )
    patient_profile.save!

    # @user.save!
    # @patient_profile = PatientProfile.new(room_number: params[:room_number],phone_number: params[:phone_number],emergency_address: params[:emergency_address],address: params[:address],bilding: params[:bilding])
    # puts @patient_profile
    # @patient_profile.save!
    # render json: { 
    #   is_login: true,
    #   headers: { 
    #     uid: @user.email,
    #     client:
    #     access_token:
    #   }
    #   data: {
    #     id: @user.id,
    #     uid: @user.email,
    #     provider: "email",
    #     email: @user.email,
    #     name: @user.name,
    #     image: @user.image,
    #     allowPasswordChange: false,
    #     created_at: @user.created_at,
    #     updated_at: @user.updated_at
    #   },
    #       name: @user.name,
    #       email: @user.email,
    #       password: @user.password,
    #       password_confirmation: @user.password_confirmation,
    #       patient_or_doctor: @user.patient_or_doctor,
    #       sex: @user.sex,
    #       patient_profile: {
    #         room_number: @user.patient_profile.room_number,
    #         phone_number: @user.patient_profile.phone_number,
    #         emergency_address: @user.patient_profile.emergency_address,
    #         address: @user.patient_profile.address,
    #         bilding: @user.patient_profile.bilding
    #       }
    # }


  end

  # private

    # def sign_up_params
    #   params.require(:registration).permit(
    #     :email, :password, :password_confirmation, :name, :patient_or_doctor, :sex,
    #     profileinfo:[:room_number, :phone_number, :emergency_address, :address, :bilding, :user_id]
    #   )
    #   # .merge(user_id: current_api_v1_user.id)
    # end
end
