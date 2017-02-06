import axios from "axios"

export function storeTest(videos, type, age, gender) {
    
    console.log("AGE: " + age )
    console.log("GENDER: " + gender )
    console.log(videos)

    const data = {
        data : videos,
        type: type,
        age: age,
        gender: gender
    }

    return {
        type: "STORE_TEST",
        payload: axios.post("http://localhost:3000/api/v1/tests", data)
    }
}
