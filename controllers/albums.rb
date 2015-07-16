get "/albums" do
  erb :"albums/albums"
end

get "/albums/all" do
  albums = Album.all
  
  json albums
end

get "/albums/add" do
  album = Album.new({"name" => params["name"]})
  album.save
  json album
end

get "/albums/delete/:id" do
  album = Album.find(params["id"])
  photographer.delete
  json photographer
end

get "/albums/update" do
  album = Album.find(params["id"])
  album.update_attribute("name", params["name"])
  json album
end

get "/albums/:id/photos" do
  album = Album.find(params["id"])
  photos = album.photos
  json photos
end