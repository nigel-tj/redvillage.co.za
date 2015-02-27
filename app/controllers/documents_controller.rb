class DocumentsController < ApplicationController
  # GET /documents
  # GET /documents.json
  def index
    @documents = Document.all

    respond_to do |format|
      format.html # index.html.erb
      # format.json { render json: @documents }
      format.json { render json: @documents.map{|document| document.to_jq_upload } }
    end
  end

  # GET /documents/1
  # GET /documents/1.json
  def show
    @document = Document.find(document_params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @document }
    end
  end

  # GET /documents/new
  # GET /documents/new.json
  def new
    @document = Document.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @document }
    end
  end

  # GET /documents/1/edit
  def edit
    @document = Document.find(document_params[:id])
  end

  # POST /documents
  # POST /documents.json
  def create
    @document = Document.new(document_params.permit(:file))

    # respond_to do |format|
    #   if @document.save
    #     format.html { redirect_to @document, notice: 'Document was successfully created.' }
    #     format.json { render json: @document, status: :created, location: @document }
    #   else
    #     format.html { render action: "new" }
    #     format.json { render json: @document.errors, status: :unprocessable_entity }
    #   end
    # end

    respond_to do |format|
      if @document.save
        format.html {
          render :json => [@document.to_jq_upload].to_json,
          :content_type => 'text/html',
          :layout => false
        }
        format.json { render json: {files: [@document.to_jq_upload]}, status: :created, location: @document }
      else
        format.html { render action: "new" }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end    
  end

  # PUT /documents/1
  # PUT /documents/1.json
  def update
    @document = Document.find(document_params[:id])

    respond_to do |format|
      if @document.update_attributes(document_params[:document])
        format.html { redirect_to @document, notice: 'Document was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /documents/1
  # DELETE /documents/1.json
  def destroy
    @document = Document.find(document_params[:id])
    @document.destroy

    respond_to do |format|
      format.html { redirect_to documents_url }
      format.json { head :no_content }
    end
  end
  private
  def document_params
    params.permit(:file, :id)
  end
end

