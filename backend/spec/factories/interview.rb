FactoryBot.define do
  factory :interview do
    temperature {36}
    oxygen_saturation {100}
    instrumentation_time {'1993-02-24T12:30:45'}
    status { 9 }
    other { true }
  end
end
