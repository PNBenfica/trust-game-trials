import axios from "axios"

export function storeTest(videos, type, age, gender, internetUsage) {
    
    console.log("AGE: " + age )
    console.log("GENDER: " + gender )
    console.log("Internet Usage: " + internetUsage )

    console.log(JSON.stringify(videos))

    const data = {
        data : videos,
        type: type,
        age: age,
        gender: gender,
        internetUsage: internetUsage
    }

    return {
        type: "STORE_TEST",
        payload: axios.post("http://localhost:3000/api/v1/tests", data)
    }
}
