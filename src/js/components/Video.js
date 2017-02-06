import React from "react"

export default class Video extends React.Component {
    
    render() {

    	const { src, autoPlay } = this.props

        return (
            <div class="col-lg-12">
            	{autoPlay ? 
            		<video width="480" height="360" controls autoPlay src={"./video/pretests/" + src} type="video/mp4"/> :
            		<video width="480" height="360" controls src={"./video/pretests/" + src} type="video/mp4"/>
            	}
            </div>
        )
    }
}
