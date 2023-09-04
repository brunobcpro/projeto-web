
import http from "./http"

const getUsers = async function(){
    try{
        const {data} = await http.get("/api/users")

        console.log(data)
        console.logo(response)
     }  catch(error){
        console.log(error)
    }
}

export default getUsers