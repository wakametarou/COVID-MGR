FactoryBot.define do
  factory :interview do
    temperature { 36 }
    oxygen_saturation { 100 }
    instrumentation_time { "2000-01-01 06:58:19.000000000 +0900" }
    status { 9 }
    other { true }
  end
end
