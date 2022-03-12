class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    if current_api_v1_user.patient_or_doctor == false
      users = User.where(patient_or_doctor: true).order(created_at: :desc)
      users_array = users.map do |user|
        {
          id: user.id,
          image: PatientProfile.find_by(user_id: user.id)&.image&.url,
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
      patient_profile = PatientProfile.find_by(user_id: user.id)
      interview = Interview.order(created_at: :desc).find_by(user_id: user.id)
      user_info = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          sex: user.sex
        },
        patient_profile: {
          id: patient_profile&.id,
          image: patient_profile&.image&.url,
          room_number: patient_profile&.room_number,
          phone_number: patient_profile&.phone_number,
          emergency_address: patient_profile&.emergency_address,
          address: patient_profile&.address,
          building: patient_profile&.building,
          user_id: patient_profile&.user_id
        },
        interview: {
          id: interview&.id,
          temperature: interview&.temperature,
          oxygen_saturation: interview&.oxygen_saturation,
          instrumentation_time: interview&.instrumentation_time,
          status: interview&.status,
          other: interview&.other,
          user_id: interview&.user_id
        },
        other_symptom: OtherSymptom.find_by(interview_id: interview&.id),
        answers: Answer.where(interview_id: interview&.id),
        questions: Question.all
      }
      render json: user_info
    else
      render json: {
        error: 'You are not a doctor. Only a doctor can confirm it.'
      }
    end
  end
end
