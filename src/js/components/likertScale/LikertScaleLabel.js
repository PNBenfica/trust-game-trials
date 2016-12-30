import React from "react"

export default class LikertScaleLabel extends React.Component {
    
    render() {

    	const { name } = this.props

        return (
            <div class="likert-scale-label">
            	{name}
            </div>
        )
    }
}
