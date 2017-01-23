require 'rest-client'
require 'json'
require 'yaml'
require 'sinatra'
require 'open-uri'

# loads esri's credentials
esri_config = YAML::load_file("config/esri.yml")

client_id = esri_config["client_id"]
client_secret = esri_config["client_secret"]
token = esri_config["token"]

# converts city name to lat long
get '/' do
        return "Hello, you shouldn't be here."
end

get '/req/?' do
        address = params[:city_name]
        address_url = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=#{address}&forStorage=true&token=#{token}&f=pjson"
        raw = open(address_url)
        raw_status = raw.status

        return raw
end
