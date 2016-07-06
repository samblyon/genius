class CommentsController < ApplicationController
  # def index
  #   if params[:parent] == "annotation"
  #     @comments = Annotation
  #                   .find(params[:annotation_id])
  #                   .comments
  #                   .order(:created_at)
  #   else
  #     @comments = Song
  #       .find(params[:song_id])
  #       .comments
  #       .order(:created_at)
  #   end
  # end

  def show
    @comment = Comment.find(params[:id])
  end

  def create
    if params[:annotation_id]
      @item = Annotation.find(params[:annotation_id])
    else
      @item = Song.find(params[:song_id])
    end

    @comment = @item.comments.create(
      author_id: current_api_user.id,
      body: comment_params[:body]
    )

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end
