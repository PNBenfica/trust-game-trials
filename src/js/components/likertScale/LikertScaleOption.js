import React from "react"

import className from "classnames"

export default class LikertScaleOption extends React.Component {
    
    render() {

    	const { active, option, onClick } = this.props

        return (
            <div class="likert-scale-option">
            	{option}
            	<div class={className("outer", {active: active})} onClick={() => onClick(option)} >
            		<div class="inner">
            		</div>
            	</div>
            </div>
        )
    }
}
