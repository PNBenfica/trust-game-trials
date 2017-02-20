import React from "react"

import FiveStar from "./FiveStar"

export default class StarDescription extends React.Component {
    
    render() {

        const { stars, min, max } = this.props 

        return (
            <div class="star-description">
                <FiveStar nStars={stars}/>
                <span> : Enviou {min}-{max}%</span>
            </div>
        )
    }
}
