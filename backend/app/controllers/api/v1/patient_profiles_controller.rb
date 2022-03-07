class Api::V1::PatientProfilesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def show
    data = {}
    case current_api_v1_user.patient_or_doctor
    when true then
      if patient_profile = PatientProfile.find_by(user_id: current_api_v1_user.id)
        profile = {
          image: patient_profile.image.url,
          room_number: patient_profile.room_number,
          phone_number: patient_profile.phone_number,
          emergency_address: patient_profile.emergency_address,
          address: patient_profile.address,
          building: patient_profile.building,
        }
        data[:profile]= profile
      end
      if interview = Interview.find_by(user_id: current_api_v1_user.id)
        data[:interview]=interview.user_id
      end
      if data.empty?
        data={status:404}
      end
      render json: data
    when false then
      render json: data = { status: 401 }
    else
      render json: { status: 404 }
    end
  end

  def create
    patient_profile = PatientProfile.new(patient_profile_params)
    if patient_profile.save
      render json: patient_profile
    else
      render json: { status: 400 }
    end
  end

  def update
    patient_profile = PatientProfile.find_by(user_id: patient_profile_params[:user_id])
    if patient_profile.update(patient_profile_params)
      render json: patient_profile
    else
      render json: { status: 400 }
    end
  end

  private

  def patient_profile_params
    params.require(:patient_profile).permit(
      :image, :room_number, :phone_number, :emergency_address, :address, :building, :user_id
    ).merge(user_id: current_api_v1_user.id)
  end
end
