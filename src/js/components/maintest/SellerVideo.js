import React from "react"

import Video from "./../Video"

export default class SellerVideo extends React.Component {
    
    render() {

    	const { autoPlay, src } = this.props

        return (
            <div class="col-lg-6">
            	<h4 class="col-lg-12">Video de perfil do seller</h4>
                <Video src={src} autoPlay={autoPlay}/>
            </div>
        )
    }
}
