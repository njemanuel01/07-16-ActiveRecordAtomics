get "/photographers" do
  erb :"photographers/photographers"
end

get "/photographers/all" do
  photographers = Photographer.all
  
  json photographers
end  

get "/photographers/add" do
  json
end

get "/photographers/delete" do
  json
end

get "/photographers/update" do
  json
end

get "/photographers/:id/photos" do
  json
end