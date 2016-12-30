import React from "react"

import PurchaseDecisionButton from "./PurchaseDecisionButton"

export default class PurchaseDecisionInput extends React.Component {
    
    render() {

    	const { onClick } = this.props

        return (
            <div id="purchase-buttons-container" class="col-lg-12">
                <PurchaseDecisionButton title="Buy" onClick={onClick} />
                <PurchaseDecisionButton title="Don't Buy" onClick={onClick} />
            </div>
        )
    }
}
