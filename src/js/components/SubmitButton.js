import React from "react"

export default class SubmitButton extends React.Component {
    
    render() {
        const { onClick, title } = this.props

        return (
            <div class="col-lg-2 col-lg-push-5">
                <button class="btn btn-block" onClick={() => onClick()}>{title}</button>
            </div>
        )
    }
}
