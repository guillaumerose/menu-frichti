require 'sinatra'
set :bind, '0.0.0.0'
get '/' do
  `curl https://api-gateway.frichti.co/menu/epd-group/cart/896ba256-dadf-4a8b-9b85-b23ea799d08b | jq -r '.collections | ."entrees-soupes", ."entrees-salades", ."plats-pates", ."plats-poisson", ."plats-veggie", ."plats-viande", ."desserts-collaboration", ."desserts-fruits", ."desserts-patisseries", ."desserts-yaourts" | .label + " - " + .items[].product.title'`.gsub("\n", "<br>")
end
