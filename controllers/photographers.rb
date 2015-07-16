get "/photographers" do
  erb :"photographers/photographers"
end

get "/photographers/all" do
  photographers = Photographer.all
  
  json photographers
end  

get "/photographers/add" do
  photographer = Photographer.new({"name" => params["name"]})
  photographer.save
  json photographer
end

get "/photographers/delete/:id" do
  photographer = Photographer.find(params["id"])
  photographer.delete
  json photographer
end

get "/photographers/update" do
  photographer = Photographer.find(params["id"])
  photographer.update_attribute("name", params["name"])
  json photographer
end

get "/photographers/:id/photos" do
  json
end