import React from "react"

import FiveStar from "./FiveStar"
import SellerRatingDescription from "./SellerRatingDescription"

export default class SellerRating extends React.Component {
    
    render() {

    	const { nStars } = this.props

        return (
            <div class="col-lg-6" id="sellerRating">
            	<h4>Cooperação em transações passadas</h4>
                <FiveStar id="sellerRating" nStars={nStars} />

                <SellerRatingDescription />
            </div>
        )
    }
}
