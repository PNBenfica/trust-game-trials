import React from "react"

export default class Count extends React.Component {
    
    render() {

    	const { current, total } = this.props

        return (
            <p class="video-count">
            	{current + 1}/{total}
            </p>
        )
    }
}
