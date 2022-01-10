//https://developers.facebook.com/docs/marketing-api/catalog-batch
import axios from 'axios';

//token de teste https://developers.facebook.com/tools/explorer/1266645167186180/
var token = "EAASAAc8ZCIQQBANmUmib77xxh3G0zgn4Mc6mMWf8iPvjWGACkkCAowMxiNGhV92tijuaSmjxAflZBJLOIGO9fnXwVHGG2WG0og5kdYnkLAqT8ZChwkwVSIHAHRKXhAHHkexCkh1VIHyvuTJLpRS3IVjItYl83KDF0B6FsrLAuKUdZAzqZCR3UgrZA9sKWo4Hoip1KoJBjI3vGtelhCgZBcCdONfSV93hG3uxWFNAgc9KrRhD0oGZBnW3";
var catalog_id = '3058135357788876';
//Preencher requests. Cada jsom é um produto
//UPDATE pode ser usado para criar se não existir, Maximo 5000 produtos e 100 chamadas por hr
//Padrões e valores dos campos do arquivo de exemplo
var requests= [
    {
        method: 'UPDATE',
        data:"title=Cadeira Gamer,description=Uma cadeira Gamer,condition=new,price=978.99 BRL,link=https://www.mobly.com.br/cadeira-gamer-duty-preta-e-branca-711986.html?spall_source=especiais&gclid=Cj0KCQiAoNWOBhCwARIsAAiHnEgoul7BeELxB2p72-OpXOJVBx40kKEVtvYlBmlkIad4NO7lPb2-_OgaAqdmEALw_wcB,image_link=https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Duty-Preta-e-Branca-2505-689117-1-zoom.jpg,brand=x-zone,availability=in stock"
    }
]
    


//formatos testados para data
// data:'title=Cadeira Gamer,description=Uma cadeira Gamer,condition=new,price=978.99 BRL,link=https://www.mobly.com.br/cadeira-gamer-duty-preta-e-branca-711986.html?spall_source=especiais&gclid=Cj0KCQiAoNWOBhCwARIsAAiHnEgoul7BeELxB2p72-OpXOJVBx40kKEVtvYlBmlkIad4NO7lPb2-_OgaAqdmEALw_wcB,image_link=https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Duty-Preta-e-Branca-2505-689117-1-zoom.jpg,brand=x-zone,availability=in stock'
//data:{title: "Cadeira Gamer",
// description:"Uma cadeira Gamer",
// condition:"new",
// price:"978.99 BRL",
// link:"https://www.mobly.com.br/cadeira-gamer-duty-preta-e-branca-711986.html?spall_source=especiais&gclid=Cj0KCQiAoNWOBhCwARIsAAiHnEgoul7BeELxB2p72-OpXOJVBx40kKEVtvYlBmlkIad4NO7lPb2-_OgaAqdmEALw_wcB",
// image_link:"https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Duty-Preta-e-Branca-2505-689117-1-zoom.jpg",
// brand:"x-zone",
// availability:"in stock"
//}




class CatalogoRepositories{         

    async criar() {
        //me = id do catalogo pq eu tenho o token
        //se eu não especificar a versão, usarei a mais antiga disponivel ".com/v4.0/me/"
        //https://developers.facebook.com/docs/marketing-api/catalog-batch
        console.log("11111111111111111111111111111111111111111") 
        //Sem token  let catalog = await axios.post(`https://graph.facebook.com/v12.0/${catalog_id}/items_batch?allow_upsert=true&item_type=alimento&requests=${requests}`)
        //com token e me
        try {
            let catalog = await axios.post(`https://graph.facebook.com/${catalog_id}/items_batch?access_token=${token}&allow_upsert=true&item_type=cadeirea&requests=${requests}`)
           
            console.log("22222222222222222222222222222222222222222")
            console.log(catalog)
            return catalog;
        } catch (error) {
            return error
        }
        
                
    }

}

export default new CatalogoRepositories();