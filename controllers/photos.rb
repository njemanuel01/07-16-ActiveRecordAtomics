get "/photos" do
  erb :"photos/photos"
end

get "/photos/all" do
  photos = Photo.all
  
  json photos
end  

get "/photos/add" do
  photo = Photo.new({"name" => params["name"], "url" => params["url"]})
  photo.save
  json photographer
end

get "/photos/delete/:id" do
  photo = Photo.find(params["id"])
  photo.delete
  json photo
end

get "/photos/update" do
  photo = Photo.find(params["id"])
  if params["name"] != ""
    photo.update_attribute("name", params["name"])
  end
  if params["url"] != ""
    photo.update_attribute("url", params["url"])
  end
  json photo
end