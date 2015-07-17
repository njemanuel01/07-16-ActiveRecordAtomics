require "rubygems"
require "bundler/setup"

require "pry"
require "active_record"
require "sinatra"
require "sinatra/reloader"
require "sinatra/json"

configure :development do
  require "sqlite3"
  ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: "photo_storage.db")
end

configure :production do
  require "pg"  
  db = URI.parse(ENV['DATABASE_URL'])

  ActiveRecord::Base.establish_connection(
    :adapter => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
    :host     => db.host,
    :username => db.user,
    :password => db.password,
    :database => db.path[1..-1],
    :encoding => 'utf8'
  )
end

ActiveRecord::Base.logger = ActiveSupport::Logger.new(STDOUT)

# Models
require_relative "models/photographer"
require_relative "models/photo"
require_relative "models/album"

# Controllers
require_relative "controllers/main"
require_relative "controllers/albums"
require_relative "controllers/photographers"
require_relative "controllers/photos"

# Database setup
unless ActiveRecord::Base.connection.table_exists?(:photographers)
  ActiveRecord::Base.connection.create_table :photographers do |t|
    t.text :name
  end  
end

unless ActiveRecord::Base.connection.table_exists?(:photos)
  ActiveRecord::Base.connection.create_table :photos do |t|
    t.text :name
    t.text :url
    t.integer :photographer_id
  end  
end

unless ActiveRecord::Base.connection.table_exists?(:albums)
  ActiveRecord::Base.connection.create_table :albums do |t|
    t.text :name
  end  
end

unless ActiveRecord::Base.connection.table_exists?(:albums_photos)
  ActiveRecord::Base.connection.create_table :albums_photos do |t|
    t.integer :album_id
    t.integer :photo_id
  end  
end
