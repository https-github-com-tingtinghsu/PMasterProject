class WebrtcController < ApplicationController
  def index
    @random_number = rand(0...10_000)
  end

  def create
    head :no_content
    ActionCable.server.broadcast "webcam_channel", webrtc_params
  end

  private
    def webrtc_params
      params.require(:webrtc).permit(:type, :from, :to, :sdp, :candidate)
    end
end
