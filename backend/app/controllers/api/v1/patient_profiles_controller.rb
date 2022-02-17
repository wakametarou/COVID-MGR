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
    user_patient_profile = {}
    user = User.find(user_params[:id])
    if user.update(image: user_params[:image])
      patient_profile = PatientProfile.new(patient_profile_params)
      if patient_profile.save
        user_patient_profile[:user]=user
        user_patient_profile[:patient_profile]=patient_profile
        render json: user_patient_profile
      else
        render json: user_patient_profile.errors, status: 422
      end
    else
      render json: user_patient_profile.errors, status: 422
    end
  end

  def update
    user_patient_profile = {}
    patient_profile ={"patient_profile"=>"user is docter"}
    user = User.find(user_params[:id])
    if user.update(image: user_params[:image])
      if user_params[:patient_or_doctor] == true
        patient_profile = PatientProfile.find_by(user_id:patient_profile_params[:user_id])
        if patient_profile.update(patient_profile_params)
          user_patient_profile[:user]=user
          user_patient_profile[:patient_profile]=patient_profile
          render json: user_patient_profile
        else
          render json: user_patient_profile.errors, status: 422
        end
      else
        user_patient_profile[:user]=user
        user_patient_profile[:patient_profile]=patient_profile
        render json: user_patient_profile
      end
    else
      render json: user_patient_profile.errors, status: 422
    end
  end

  private
    def patient_profile_params
      params.require(:patient_profile).permit(
        :room_number, :phone_number, :emergency_address, :address, :bilding, :user_id
      )
    end
    def user_params
      params.require(:user).permit(
        :id, :patient_or_doctor, :image
      )
    end
end
