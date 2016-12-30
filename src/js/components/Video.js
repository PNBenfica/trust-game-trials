import React from "react"

export default class Video extends React.Component {
    
    render() {

    	const { src } = this.props

        return (
            <div class="col-lg-12">
                <video width="480" height="360" controls src={"./video/pretests/" + src} type="video/mp4"/>
            </div>
        )
    }
}
