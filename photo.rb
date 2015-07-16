class Photo < ActiveRecord::Base
  has_and_belongs_to_many :albums
  validates :name, :photographer_id, presence: true
  validates :photogrpaher_id, numericality: true
  
  def top_photo?
    self.albums.length > 2
  end
end

