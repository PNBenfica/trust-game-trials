import React from "react"

export default class PurchaseDecisionButton extends React.Component {
    
    render() {
        const { onClick, title } = this.props

        return (
            <div class="col-lg-2 col-lg-push-4">
                <button class="btn btn-block" onClick={() => onClick(title)}>{title}</button>
            </div>
        )
    }
}
