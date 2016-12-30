import React from "react"

import StarDescription from "./StarDescription"

export default class SellerRatingDescription extends React.Component {
    
    render() {

        const description = [{stars:1, min:0, max:20}, {stars:2, min:21, max:40}, {stars:3, min:41, max:60}, {stars:4, min:61, max:80}, {stars:5, min:81, max:100}]

        return (
            <div class="seller-rating-description">
                {description.map((description,i) => <StarDescription key={i} {...description} />)}
            </div>
        )
    }
}
