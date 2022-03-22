CarrierWave.configure do |config|
  if Rails.env.production?
    config.asset_host = 'https://api.covid-mgr.com'
  else
    config.asset_host = 'http://localhost:3001'
  end
  config.storage = :file
  config.cache_storage = :file
end
