class ElbController < ApplicationController
  def health
    render json: 'Health o-'
  end
end
