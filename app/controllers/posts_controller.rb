    before_action :find_item, only: [:index]
    def index
        @posts = @item.posts.all
    end

    def create
        @post = @item.posts.new(content: params[:content])
        # render json: { 
        #   success: @post.save,
        #   id: @post.id,
        #   content: @post.content
        # }
      end


    private
    def find_item
        @item = Item.find(params[:id])
    end
end
