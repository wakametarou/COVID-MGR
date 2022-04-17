class Api::V1::PatientProfilesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def show
    data = {}
    case current_api_v1_user.patient_or_doctor
    when true
      if patient_profile ||= PatientProfile.find_by(user_id: current_api_v1_user.id)
        data[:profile] = patient_profile.profile_format(patient_profile)
      end
      interview = Interview.find_by(user_id: current_api_v1_user.id)
      data[:interview] = interview.user_id if interview
      data = { status: 404 } if data.empty?
      render json: data
    when false
      render status: :unauthorized
    else
      render status: :not_found
    end
  end

  def create
    patient_profile = PatientProfile.new(patient_profile_params)
    Rails.logger.debug 'patient_profile_params'
    Rails.logger.debug patient_profile_params
    if patient_profile.save
      render json: patient_profile
    else
      render status: :bad_request
    end
  end

  def update
    patient_profile = PatientProfile.find_by(user_id: patient_profile_params[:user_id])
    if patient_profile.update(patient_profile_params)
      render json: patient_profile
    else
      render status: :bad_request
    end
  end

  private

  def patient_profile_params
    params.permit(
      :image, :room_number, :phone_number, :emergency_address, :address, :building, :user_id
    ).merge(user_id: current_api_v1_user.id)
  end
end
