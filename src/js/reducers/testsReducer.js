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
        return {...state, fetching: false, error: action.payload}
      }
      case "STORE_TEST_FULFILLED": {
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
