class Api::SessionsController < Devise::SessionsController
# before_action :configure_sign_in_params, only: [:create]
  protect_from_forgery except: :destroy

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # def destroy # Assumes only JSON requests
  #   # signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
