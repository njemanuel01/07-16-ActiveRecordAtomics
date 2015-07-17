get "/photos" do
  erb :"photos/photos"
end

get "/photos/all" do
  photos = Photo.all
  
  json photos
end  

get "/photos/add" do
  photo = Photo.new({"name" => params["name"], "url" => params["url"], "photographer_id" => params["photographer_id"]})
  binding.pry
  photo.save
  json photo
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
  if params["photographer_id"] != ""
    photo.update_attribute("photographer_id", params["photographer_id"])
  end
    
  json photo
end

get "/photos/photoalbum" do
  album = Album.find(params["album_id"])
  photo = Photo.find(params["photo_id"])
  album.photos<<(photo)
  
  json photo
end