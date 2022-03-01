class Api::V1::PatientProfilesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def show
    if profile = PatientProfile.find_by(user_id: current_api_v1_user.id)
      patient_profile = {
        image: profile.image.url,
        room_number: profile.room_number,
        phone_number: profile.phone_number,
        emergency_address: profile.emergency_address,
        address: profile.address,
        building: profile.building,
      }
      render json: patient_profile
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
