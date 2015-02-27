class Upload < ActiveRecord::Base
  has_many :attachment
   accepts_nested_attributes_for :attachment
end
