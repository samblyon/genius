class Api::AnnotationsController < ApplicationController
  before_action :must_be_author, except: [:index, :show, :create]

  def index
    @annotations = Annotation
      .where(song_id: params[:song_id])
      .includes(:author)
      .order(:start_index)
  end

  def show
    @annotation = Annotation
        .includes(:author, :comments, comments: [:author])
        .find(params[:id])
  end

  def create
    @annotation = current_api_user.annotations.create!(annotation_params)
    render :show
  end

  def update
    @annotation = Annotation.find(params[:id])
    @annotation.update!(annotation_params)
    render :show
  end

  def destroy
    @annotation = Annotation.find(params[:id])
    @annotation.destroy!
    render :show
  end

  private
  def annotation_params
    params.require(:annotation).permit(
      :song_id,
      :body,
      :start_index,
      :end_index
    )
  end

  def must_be_author
    @annotation = Annotation.find(params[:id])
    current_api_user.id == @annotation.author_id
  end
end
