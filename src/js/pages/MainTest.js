import React from "react"
import { connect } from "react-redux"
import { browserHistory } from "react-router"


import AgePicker from "./../components/AgePicker"
import Count from "./../components/Count"
import SellerRating from "./../components/maintest/SellerRating"
import LikertScale from "./../components/likertScale/LikertScale"
import PurchaseDecisionInput from "./../components/PurchaseDecisionInput"
import SubmitButton from "./../components/SubmitButton"
import SellerVideo from "./../components/maintest/SellerVideo"

import { storeTest } from "../actions/testsActions"


let trustWorthyVideos = ["margarida.mp4", "rui.mp4", "paula.mp4"]
let untrustWorthyVideos = ["pedro.mp4", "alexandre.mp4", "rafa.mp4"]
let noVideos = ["", "", ""]
let fillerVideos = ["lameiras.mp4","castilho.mp4","canina.mp4", "carlos.mp4", "bernardo.mp4", "marco.mp4", "ceia.mp4"]


@connect()
export default class MainTest extends React.Component {

    constructor(args){
        super(...args)
        //let videos = ["alexandre.mp4","bernardo.mp4","canina.mp4","carlos.mp4","castilho.mp4","ceia.mp4","fernando.mp4","joao.mp4","lameiras.mp4","marco.mp4","margarida.mp4","nuno.mp4","paula.mp4","pedro.mp4","peres.mp4","rafa.mp4","ruben.mp4","rui.mp4","silvia.mp4","tiago.mp4","torres.mp4"]
         let videos = [{sellerRating:1, name: "tiago.mp4"}, {sellerRating:3, name: "castilho.mp4"}]


        const reputationScores = [0,3,4]
        const fillerReputationScores = this.generateFillerReputationScores(fillerVideos.length)

        trustWorthyVideos = this.assignReputation(trustWorthyVideos, reputationScores)
        untrustWorthyVideos = this.assignReputation(untrustWorthyVideos, reputationScores)
        noVideos = this.assignReputation(noVideos, reputationScores)
        fillerVideos = this.assignReputation(fillerVideos, fillerReputationScores).concat(this.assignReputation(["peres.mp4","tiago.mp4"], [4,5]));


        videos = this.mixVideos(trustWorthyVideos, untrustWorthyVideos, noVideos, fillerVideos)
        
        console.log(JSON.stringify(videos))

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


    assignReputation(videos, reputations){
        reputations = this.shuffle(reputations)
        videos = this.shuffle(videos)

        videos = videos.map((video, i) => {return {sellerRating:reputations[i], name: video}})
        return videos
    }

    generateFillerReputationScores(n){
        let reputations = [5,4,2,1,5,4,2,1,5,4,2,1]
        return reputations.slice(0, n)
    }

    mixVideos(trustWorthy, untrustWorthy, no, filler){
        let videos = [].concat(trustWorthy, untrustWorthy, no)
        videos = this.shuffle(videos)

        this.insertFillers(videos, filler)
        return videos
    }

    insertFillers(videos, fillers){
        const fillerIndexes = [0,1,2,5,8,11,14,16,17]
        fillers.forEach((fillerVideo, i) => this.insertFiller(videos, fillerVideo, fillerIndexes[i]))
    }

    insertFiller(videos, fillerVideo, index){
        videos.splice(index, 0, fillerVideo);
    }

    storeTest(age, gender, internetUsage) {
        this.props.dispatch(storeTest(this.state.videos, "Main_Test", age, gender, internetUsage))
        browserHistory.push("/thanks");
    }

    onLikertScaleClick(selectedRating){
        this.setState({selectedRating})
    }

    onPurchaseDecision(decision){
        const videos = [...this.state.videos]
        videos[this.state.activeVideo].purchase_decision = decision == "Comprar"
        this.setState({videos})
    }


    onSubmit(){
        let { activeVideo, videos, selectedRating } = this.state
        if (selectedRating > 0){
            videos[activeVideo].rating = selectedRating

            activeVideo = activeVideo + 1
            this.setState({activeVideo, selectedRating: -1, videos})
        }
    }

    setAge(age, gender, internetUsage){
        this.storeTest(age, gender, internetUsage)
    }

    render() {

        const { videos, activeVideo, selectedRating } = this.state

        if (activeVideo == videos.length)
        // if (true)
            return <AgePicker onSubmit={this.setAge.bind(this)}/>
        
        const video = videos[activeVideo]

        const Input = this.renderPrompt(video)


        return (
            <div id="maintest" class="container">
                <div class="row">

                    <SellerVideo src={video.name} autoPlay={activeVideo != 0} />

                    <SellerRating nStars={video.sellerRating} />

                    {Input}

                    <Count current={activeVideo} total={videos.length}/>
                </div>
            </div>
        )
    }

    /* renders the current prompt: the purchase decision or the liker scale*/
    renderPrompt(video){
        if (typeof video.purchase_decision === 'undefined')
            return this.renderPurchaseDecisionInput()
        else
            return this.renderLikertScaleInput()
    }

    renderPurchaseDecisionInput = () => <PurchaseDecisionInput onClick={this.onPurchaseDecision.bind(this)}/>

    renderLikertScaleInput(){
        const { selectedRating } = this.state
        return (
            <div class="col-lg-12">
                <LikertScale selected={selectedRating} onClick={this.onLikertScaleClick.bind(this)} question="Indica numa escala de 1 a 7 quanto confias ou desconfias deste seller" />
                <SubmitButton title="Próximo" onClick={this.onSubmit.bind(this)} />
            </div>
        )
    }
}
