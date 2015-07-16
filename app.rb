require "pry"
require "active_record"
require "sqlite3"

ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: "photo_storage.db")

ActiveRecord::Base.logger = ActiveSupport::Logger.new(STDOUT)

require_relative "photographer"
require_relative "photo"
require_relative "album"

binding.pry