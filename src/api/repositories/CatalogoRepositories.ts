//https://developers.facebook.com/docs/marketing-api/catalog-batch
import axios from 'axios';

//thttps://developers.facebook.com/tools/explorer/1062138014329859/?method=POST&path=644469043373877
var access_token = "EAAPGAkcL7AMBAK41aFHlj2JcUhZC6Sarg8bgzfLJEDh7gJ0uJhlYW125WtmhqP7E20ll8ardHHZB8xtZBZA4i0bvNgdP9e7f8r4jbAM8ANb0LFRv3KgIjHLKZAh3Mw9U3J1AXnFMnlE6u7id7grnqxHZC8lMc2lOjZCi7zigYIZBZBoH3p15fLGaNq3jBs1z6oJZCYHZCrUza2DFKZAHf5vncgrCjXn8AllOvZAIZD"
var catalog_id = '644469043373877';

//no corpo no postman
// {
//     "requests": [
//             {
//                 "method": "UPDATE",
//                 "retailer_id": "123",
//                 "data":{
//                     "name": "Cadeira Gamer",
//                     "description":"Uma cadeira Gamer",
//                     "condition":"new",
//                     "price": 159990,
//                     "currency": "BRL",
//                     "url":"https://www.mobly.com.br/cadeira-gamer-duty-preta-e-branca-711986.html?spall_source=especiais&gclid=Cj0KCQiAoNWOBhCwARIsAAiHnEgoul7BeELxB2p72-OpXOJVBx40kKEVtvYlBmlkIad4NO7lPb2-_OgaAqdmEALw_wcB",
//                     "image_url":"https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Duty-Preta-e-Branca-2505-689117-1-zoom.jpg",
//                     "brand":"x-zone",
//                     "availability":"in stock"
//                 }
//             }
//         ]
// }


// applinks : Links to mobile apps
// type: object<>

class CatalogoRepositories{         

    async atulaizar(requests: Array<object>) {
        try {
            await axios.post(`https://graph.facebook.com/v12.0/${catalog_id}/batch?allow_upsert=true`,{
                access_token,
                requests
            })

            console.log("Atualização realizada")
        } catch (error) {
            return error
        }
        
                
    }

}

export default new CatalogoRepositories();