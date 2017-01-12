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
        let videos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4"]
        this.shuffle(videos)
        videos = videos.map(video => {return {name: video} })
        this.state = {
            videos: videos,
            activeVideo: 0,
            selectedRating: -1
        }
    }

    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
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

                    <LikertScale selected={selectedRating} onClick={this.onLikertScaleClick.bind(this)} question="Indicate on a scale 1 to 7 how much you trust or distrust this person" />

                    <SubmitButton title="Submit" onClick={this.onSubmit.bind(this)} />

                    <Count current={activeVideo} total={videos.length}/>
                </div>
            </div>
        )
    }
}
