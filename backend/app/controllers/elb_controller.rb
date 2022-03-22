class ElbController < ApplicationController
  def health
    render json: 'Health k'
  end
end
