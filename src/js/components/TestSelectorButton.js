import React from "react"
import { Link } from "react-router"

export default class TestSelectorButton extends React.Component {
    
    render() {
        const { link, title } = this.props

        return (
            <div class="col-lg-4 col-lg-push-2">
                <Link to={link}>
                    <button class="btn btn-block">{title}</button>
                </Link>
            </div>
        )
    }
}
