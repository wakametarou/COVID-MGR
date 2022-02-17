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
    # def make_interview_answers(interview,answers)
    #   interview_answers[:interview]=interview
    #   interview_answers[:answers]=answers
    # end
    interview = Interview.new(interview_params)
    if interview.save
      answers_params.each do |ans|
        ans["interview_id"] = interview.id
        answer = Answer.new(ans)
        answer.save
        answers << answer
      end
      interview_answers[:interview]=interview
      interview_answers[:answers]=answers
      # make_interview_answers(interview,answers)
      render json: interview_answers
    else
      interview_answers[:interview]=interview
      interview_answers[:answers]=answers
      # make_interview_answers(interview,answers)
      render json: interview_answers.errors, status: 422
    end
  end

  private
  def interview_params
    params.require(:interview).permit(
      :temperature, :oxygen_saturation, :instrumentation_time, :status, :other_symptom, :user_id
    )
  end

  def answers_params
    params.permit(answers: [:answer, :question_id]).to_h[:answers]
  end
end
