//https://developers.facebook.com/docs/marketing-api/catalog-batch
import axios from 'axios';

//thttps://developers.facebook.com/tools/explorer/1062138014329859/?method=POST&path=644469043373877
var access_token = "EAAPGAkcL7AMBAGEJCYCQg0A0WU06lKPuB6IKgNFmKaYmQBuf6Yc0r9BVICh7xYgZBkMXBYnvLKu22H9jHovCdgY46r2bt3tVEiJLyCgGjZAvG52YuOZBXgZBJ83MrhCVcCdK6RtmkBFaS5TJy2MSPWXKvZCaZAJOpToK5hCZC95hgnYu56c0C2ItajR60WnhLSvZBc8dX2jvlmSdwCdXYU6UrDaV979CKhHvdKsvGm0RUVhya1ZCFvc3aORNt3Epy6ccZD"
// var catalog_id = '644469043373877';
// var requests= [
//             {
//                 method: "UPDATE",
//                 retailer_id: "123",
//                 data:{
//                     name: "Cadeira Gamer",
//                     description:"Uma cadeira Gamer",
//                     condition:"new",
//                     price: 78090,
//                     currency: "BRL",
//                     url:"https://www.mobly.com.br/cadeira-gamer-duty-preta-e-branca-711986.html?spall_source=especiais&gclid=Cj0KCQiAoNWOBhCwARIsAAiHnEgoul7BeELxB2p72-OpXOJVBx40kKEVtvYlBmlkIad4NO7lPb2-_OgaAqdmEALw_wcB",
//                     image_url:"https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Duty-Preta-e-Branca-2505-689117-1-zoom.jpg",
//                     brand:"x-zone",
//                     availability:"in stock"
//                 }
//             }
//]


// applinks : Links to mobile apps
// type: object<>

class CatalogoRepositories{         

    async atulaizar(requests: Array<object>, catalog_id: string) {
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