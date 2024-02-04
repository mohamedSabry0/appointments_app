class Consultation < ApplicationRecord
  belongs_to :user
  belongs_to :engineer

  validates :date, presence: true
  validates :city, presence: true
  validates :user_id, presence: true
  validates :engineer_id, presence: true
end
