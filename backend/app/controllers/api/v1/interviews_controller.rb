class Api::V1::InterviewsController < ApplicationController
  def index
    if params[:patient_or_doctor] = true
      interviews = Interview.where(user_id: params[:user_id]).order(created_at: :desc)
      render json: interviews
    elsif params[:patient_or_doctor] = false
      interviews = Interview.all.order(created_at: :desc)
      render json: interviews
    else
      render json: interviews.errors, status: 422
    end
  end

  def show
    if interview = Interview.find(params[:id])
      render json: interview
    else
      render json: interview.errors, status: 422
    end
  end

  def new
    if questions = Question.all
      render json: questions
    else
      render json: questions.errors, status: 422
    end
  end

  def create
    interview_answers = {}
    answers = []
    interview = Interview.new(interview_params)
    if interview.save
      if interview_params[:other] == true
        other_symptom = OtherSymptom.new(**other_symptom_params, interview_id: interview.id)
        other_symptom.save
        interview_answers[:other_symptom]=other_symptom
      end
      answers_params.each do |ans|
        ans["interview_id"] = interview.id
        answer = Answer.new(ans)
        answer.save
        answers << answer
      end
      interview_answers[:interview]=interview
      interview_answers[:answers]=answers
      render json: interview_answers
    else
      interview_answers[:status]=420
      render json: interview_answers
    end
  end

  private
  def interview_params
    params.require(:interview).permit(
      :temperature, :oxygen_saturation, :instrumentation_time, :status, :other, :user_id
    )
  end

  def other_symptom_params
    params.require(:other_symptom).permit(
      :pain_degree, :concrete
    )
  end

  def answers_params
    params.permit(answers: [:answer, :question_id]).to_h[:answers]
  end
end
