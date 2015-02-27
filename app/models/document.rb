class Document < ActiveRecord::Base
  belongs_to :document, polymorphic: true    
  mount_uploader :file, FileUploader

  def to_jq_upload
    {
      "name" => read_attribute(:file),
      "size" => file.size,
      "url" => file.url,
      "delete_url" => "/documents/#{id}",
      "delete_type" => "DELETE"
    }
  end
end
