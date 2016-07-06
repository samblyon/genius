class Api::CommentsController < ApplicationController
  def show
    @comment = Comment.find(params[:id])
  end

  def create
    if comment_params[:annotation_id]
      @item = Annotation.find(comment_params[:annotation_id])
    elsif comment_params[:song_id]
      @item = Song.find(comment_params[:song_id])
    else
      render json: {'message': 'missing commentable id'}, status: 422
      return
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
    render :show
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :song_id, :annotation_id)
  end
end
