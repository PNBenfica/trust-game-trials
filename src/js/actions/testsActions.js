import axios from "axios"

export function storeTest(videos, type) {
    
    console.log(videos)

    const data = {
        data : videos,
        type: type
    }

    return {
        type: "STORE_TEST",
        payload: axios.post("http://localhost:3000/api/v1/tests", data)
    }
}
