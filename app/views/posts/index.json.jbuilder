json.array!(@posts) do |post|
  json.extract! post, :id, :title, :description, :body
  json.url post_url(post, format: :json)
end
