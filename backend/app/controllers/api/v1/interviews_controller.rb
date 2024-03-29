class Api::V1::InterviewsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    interviews_user = {}
    case current_api_v1_user.patient_or_doctor
    when true
      interviews = Interview.where(user_id: current_api_v1_user.id).order(created_at: :desc)
      render json: interviews
    when false
      interviews = Interview.where(user_id: params[:id]).order(created_at: :desc)
      user = User.find(params[:id])
      interviews_user[:interviews] = interviews
      interviews_user[:user] = user
      render json: interviews_user
    else
      render json: { status: 404 }
    end
  end

  def show
    if interview ||= Interview.find(params[:id])
      answers = Answer.where(interview_id: interview.id)
      questions = Question.all
      if interview.other == true
        other = OtherSymptom.find_by(interview_id: params[:id])
        interview_info = {
          interview: interview,
          answers: answers,
          questions: questions,
          other: other
        }
      else
        interview_info = {
          interview: interview,
          answers: answers,
          questions: questions
        }
      end
      render json: interview_info
    else
      render json: { status: 404 }
    end
  end

  def new
    if questions ||= Question.all
      render json: questions
    else
      render json: { status: 404 }
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
        interview_answers[:other_symptom] = other_symptom
      end
      answers_params.each do |ans|
        ans['interview_id'] = interview.id
        answer = Answer.new(ans)
        answer.save
        answers << answer
      end
      interview_answers[:interview] = interview
      interview_answers[:answers] = answers
      render json: interview_answers
    else
      render json: { status: 400 }
    end
  end

  private

  def interview_params
    params.require(:interview).permit(
      :temperature, :oxygen_saturation, :instrumentation_time, :status, :other, :user_id
    ).merge(user_id: current_api_v1_user.id)
  end

  def other_symptom_params
    params.require(:other_symptom).permit(
      :pain_degree, :concrete
    )
  end

  def answers_params
    params.permit(answers: %i[answer question_id]).to_h[:answers]
  end
end
