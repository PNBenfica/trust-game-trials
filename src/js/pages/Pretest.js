import React from "react"
import { connect } from "react-redux"

import Count from "./../components/Count"
import LikertScale from "./../components/likertScale/LikertScale"
import SubmitButton from "./../components/SubmitButton"
import Video from "./../components/Video"

import { storeTest } from "../actions/testsActions"

@connect()
export default class Pretest extends React.Component {

    constructor(args){
        super(...args)
        this.state = {
            videos: [{name: "video1.mp4"}, {name: "video2.mp4"}],
            activeVideo: 0,
            selectedRating: -1
        }
    }

    storeTest() {
        this.props.dispatch(storeTest(this.state.videos, "Pretest"))
    }

    onLikertScaleClick(selectedRating){
        this.setState({selectedRating})
    }

    onSubmit(){
        let { activeVideo, videos, selectedRating } = this.state
        if (selectedRating > 0){
            videos[activeVideo].rating = selectedRating

            activeVideo = activeVideo + 1
            if (activeVideo < videos.length){
                this.setState({activeVideo, selectedRating: -1, videos})
            }
            else{
                console.log(videos)
                this.storeTest()
            }   
        }
    }

    render() {

        const { videos, activeVideo, selectedRating } = this.state
        const video = videos[activeVideo].name

        return (
            <div id="pretest" class="container">
                <div class="row">

                    <Video src={video}/>

                    <LikertScale selected={selectedRating} onClick={this.onLikertScaleClick.bind(this)} />

                    <SubmitButton title="Submit" onClick={this.onSubmit.bind(this)} />

                    <Count current={activeVideo} total={videos.length}/>
                </div>
            </div>
        )
    }
}
