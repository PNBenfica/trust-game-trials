import React from "react"

export default class Star extends React.Component {
    
    render() {

    	const { filled } = this.props

        const className = filled ? "fa fa-star" : "fa fa-star-o" 

        return (
        	<i class={className} aria-hidden="true"></i>
        )
    }
}
