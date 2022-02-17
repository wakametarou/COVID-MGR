class Api::V1::PatientProfilesController < ApplicationController
  def show
    if params[:patien_or_doctor] == true
      if patient_profile = PatientProfile.find_by(user_id: params[:user_id])
        render json: patient_profile
      else
        render json: patient_profile.errors, status: 422
      end
    else
      # フロント側でユーザーのデータを持ってない場合はここに取得する処理を書く
      render json: "user is docter"
    end
  end

  def create
    patient_profile = PatientProfile.new(patient_profile_params)
    if patient_profile.save
      render json: patient_profile
    else
      render json: patient_profile.errors, status: 422
    end
  end

  def update
    patient_profile = PatientProfile.find_by(user_id:patient_profile_params[:user_id])
    if patient_profile.update(patient_profile_params)
      render json: patient_profile
    else
      render json: patient_profile.errors, status: 422
    end
  end

  private
    def patient_profile_params
      params.require(:patient_profile).permit(
        :room_number, :phone_number, :emergency_address, :address, :bilding, :user_id
      )
    end
end
