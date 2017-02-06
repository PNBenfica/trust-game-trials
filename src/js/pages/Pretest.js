import React from "react"
import { connect } from "react-redux"
import { browserHistory } from "react-router"


import AgePicker from "./../components/AgePicker"
import Count from "./../components/Count"
import LikertScale from "./../components/likertScale/LikertScale"
import SubmitButton from "./../components/SubmitButton"
import Video from "./../components/Video"

import { storeTest } from "../actions/testsActions"

@connect()
export default class Pretest extends React.Component {

    constructor(args){
        super(...args)
        let videos = ["alexandre.mp4","bernardo.mp4","canina.mp4","carlos.mp4","castilho.mp4","ceia.mp4","fernando.mp4","joao.mp4","lameiras.mp4","marco.mp4","margarida.mp4","nuno.mp4","paula.mp4","pedro.mp4","peres.mp4","rafa.mp4","ruben.mp4","rui.mp4","silvia.mp4","tiago.mp4","torres.mp4"]
        // let videos = ["aelxandre.mp4","bernardo.mp4"]
        this.shuffle(videos)
        videos = videos.map(video => {return {name: video} })
        this.state = {
            videos: videos,
            activeVideo: 0,
            selectedRating: -1,
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

    storeTest(age, gender) {
        this.props.dispatch(storeTest(this.state.videos, "Pretest", age, gender))
        browserHistory.push("/thanks");
    }

    onLikertScaleClick(selectedRating){
        this.setState({selectedRating})
    }

    onSubmit(){
        let { activeVideo, videos, selectedRating } = this.state
        if (selectedRating > 0){
            videos[activeVideo].rating = selectedRating

            activeVideo = activeVideo + 1
            this.setState({activeVideo, selectedRating: -1, videos})
        }
    }

    setAge(age, gender){
        this.storeTest(age, gender)
    }

    render() {

        const { videos, activeVideo, selectedRating } = this.state

        if (activeVideo == videos.length)
            return <AgePicker onSubmit={this.setAge.bind(this)}/>
        
        const video = videos[activeVideo].name

        return (
            <div id="pretest" class="container">
                <div class="row">

                    <Video src={video} autoPlay={activeVideo != 0} />

                    <LikertScale selected={selectedRating} onClick={this.onLikertScaleClick.bind(this)} question="Indicate on a scale 1 to 7 how much you trust or distrust this person" />

                    <SubmitButton title={"Next"} onClick={this.onSubmit.bind(this)} />

                    <Count current={activeVideo} total={videos.length}/>
                </div>
            </div>
        )
    }
}
