json.array!(@uploads) do |upload|
  json.extract! upload, :id, :name, :description, :picture
  json.url upload_url(upload, format: :json)
end
