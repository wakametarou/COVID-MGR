class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    if current_api_v1_user.patient_or_doctor == false
      users = User.where(patient_or_doctor: true).order(created_at: :desc)
      users_array = users.map do |user|
        {
          id: user.id,
          image: PatientProfile.find_by(user_id: user.id)&.image,
          name: user.name,
          sex: user.sex,
          room_number: PatientProfile.find_by(user_id: user.id)&.room_number,
          status: Interview.order(created_at: :desc).find_by(user_id: user.id)&.status
        }
      end
      render json: users_array
    else
      render json: {
        error: 'You are not a doctor. Only a doctor can confirm it.'
      }
    end
  end

  def show
    if current_api_v1_user.patient_or_doctor == false
      user = User.find(params[:id])
      user_info = {
        user: user,
        patient_profile: PatientProfile.find_by(user_id: user.id),
        interview: Interview.order(created_at: :desc).find_by(user_id: user.id)
      }
      render json: user_info
    else
      render json: {
        error: 'You are not a doctor. Only a doctor can confirm it.'
      }
    end
  end
end
