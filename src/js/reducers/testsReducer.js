import { browserHistory } from "react-router"

export default function reducer(state={
    storing: false,
    stored: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "STORE_TEST_PENDING": {
        return {...state, storing: true, stored:false}
      }
      case "STORE_TEST_REJECTED": {
        console.log("Upload Failed! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        browserHistory.push("/thanks");
        return {...state, fetching: false, error: action.payload}
      }
      case "STORE_TEST_FULFILLED": {
        console.log("Upload Success!")
        browserHistory.push("/thanks");
        return {
          ...state,
          storing: false,
          stored: true,
        }
      }
    }

    return state
}
