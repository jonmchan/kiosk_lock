class TestWorkFlowController < ApplicationController
  def pseudo_kiosk_start_action
    if params[:url_whitelist].is_a? Array
      params[:url_whitelist].map! do |url|
        if regex = url.match(/^\/(.*)\/$/)&.[](1)
          /#{regex}/
        else
          url
        end
      end
    end
    pseudo_kiosk_start(params[:url_whitelist], params[:unauthorized_endpoint_redirect_url])
    render json: "OK"
  end

  def pseudo_kiosk_exit_action
    pseudo_kiosk_exit(params[:unlock_redirect_url])
  end

  def clear_pseudo_kiosk_session_action
    clear_pseudo_kiosk_session
    render json: "OK"
  end


  # test/example workflow
  def start_step1_privilege
  end

  def complete_step1_privilege
  end

  def start_step2_unprivilege
  end

  def complete_step2_unprivilege
  end

  def start_step3_privilege
  end

  def complete_step3_privilege
  end
end
