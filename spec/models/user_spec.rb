require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:consultations) }
  it { should have_many(:engineers).through(:consultations) }

  it { should validate_presence_of(:username) }
end
