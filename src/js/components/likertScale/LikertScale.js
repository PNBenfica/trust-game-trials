import React from "react"

import LikertScaleLabel from "./LikertScaleLabel"
import LikertScaleOption from "./LikertScaleOption"

export default class LikertScale extends React.Component {
    
    render() {

    	const { selected, onClick, question } = this.props

    	const options = [1,2,3,4,5,6,7].map((option,i) => <LikertScaleOption key={i} option={option} onClick={onClick} active={selected==option} />)

        return (
            <div class="likert-scale col-lg-11 col-lg-push-3">

                <h5 class="likert-scale-question">{question}</h5>

            	<LikertScaleLabel name="High Distrust"/>
            	{options}
            	<LikertScaleLabel name="High Trust"/>
            </div>
        )
    }
}
