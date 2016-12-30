import React from "react"

import Star from "./Star"

export default class FiveStar extends React.Component {
    
    render() {

    	let { nStars } = this.props

    	const stars = [1,2,3,4,5].map((number,i) => <Star key={i} filled={i < nStars} />)

        return (
            <div class="five-star-rating">
            	{stars}
            </div>
        )
    }
}
