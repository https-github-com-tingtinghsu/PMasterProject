class WebrtcController < ApplicationController
  def index
    @random_number = rand(0...10_000)
  end

  def create
    head :no_content
    ActionCable.server.broadcast "session_channel", session_params
  end

  private
    def session_params
      params.require(:session).permit(:type, :from, :to, :sdp, :candidate)
    end
end
