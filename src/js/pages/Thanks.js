import React from "react"
import { browserHistory } from "react-router"

export default class Thanks extends React.Component {
    render() {

        
        return (
            <div onClick={() => browserHistory.push("/")} id="thanks" class="container" style={{marginTop: "15%"}}>
                <div class="row">
                    <img src="img/check.png" />
                    <h1>Thanks</h1>
                    <h5>Your submission has been received</h5>
                </div>
            </div>
        )
    }
}
