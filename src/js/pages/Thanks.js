import React from "react"
import { browserHistory } from "react-router"

export default class Thanks extends React.Component {
    render() {

        const candies = this.props.params.candies
        
        return (
            <div onClick={() => browserHistory.push("/")} id="thanks" class="container" style={{marginTop: "20vh"}}>
                <div class="row">
                    <img src="/img/thanks.png" />
                    <h1>Obrigado!</h1>
                    <h5>A tua partição foi registada com sucesso</h5>
                    <h3>Prémio: {candies} {candies === "1"? "rebuçado" : "rebuçados"}!</h3>
                </div>
            </div>
        )
    }
}
