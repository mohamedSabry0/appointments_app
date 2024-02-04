require 'rails_helper'

RSpec.describe Consultation, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:engineer) }

  it { should validate_presence_of(:date) }
  it { should validate_presence_of(:city) }
  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:engineer_id) }
end
