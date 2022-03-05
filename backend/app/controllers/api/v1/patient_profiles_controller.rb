class Api::V1::PatientProfilesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def show
    
      if patient_profile = PatientProfile.find_by(user_id: current_api_v1_user.id)
        if interview = Interview.find_by(user_id: current_api_v1_user.id)
        data = {
          profile:{
            image: patient_profile.image.url,
            room_number: patient_profile.room_number,
            phone_number: patient_profile.phone_number,
            emergency_address: patient_profile.emergency_address,
            address: patient_profile.address,
            building: patient_profile.building,
          },
          interview: interview.user_id
        }
        render json: data
        else
          data = {
            profile:{
              image: patient_profile.image.url,
              room_number: patient_profile.room_number,
              phone_number: patient_profile.phone_number,
              emergency_address: patient_profile.emergency_address,
              address: patient_profile.address,
              building: patient_profile.building,
            },
          }
          render json: data
        end
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
