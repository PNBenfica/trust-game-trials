import React from "react"
import { connect } from "react-redux"

import Count from "./../components/Count"
import SellerRating from "./../components/maintest/SellerRating"
import LikertScale from "./../components/likertScale/LikertScale"
import PurchaseDecisionInput from "./../components/PurchaseDecisionInput"
import SubmitButton from "./../components/SubmitButton"
import SellerVideo from "./../components/maintest/SellerVideo"

import { storeTest } from "../actions/testsActions"

@connect()
export default class MainTest extends React.Component {

    constructor(args){
        super(...args)
        this.state = {
            videos: [{sellerRating:1, name: "tiago.mp4"}, {sellerRating:3, name: "video2.mp4"}],
            activeVideo: 0,
            selectedRating: -1
        }
    }

    storeTest() {
        this.props.dispatch(storeTest(this.state.videos, "Main_Test"))
    }

    onLikertScaleClick(selectedRating){
        this.setState({selectedRating})
    }

    onPurchaseDecision(decision){
        const videos = [...this.state.videos]
        videos[this.state.activeVideo].purchase_decision = decision == "Buy"
        this.setState({videos})
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

        const { videos, activeVideo } = this.state
        const video = videos[activeVideo]
        
        const Input = this.renderPrompt(video)


        return (
            <div id="maintest" class="container">
                <div class="row">

                    <SellerVideo src={video.name}/>

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
                <LikertScale selected={selectedRating} onClick={this.onLikertScaleClick.bind(this)} question="Indicate on a scale 1 to 7 how much you trust or distrust this seller" />
                <SubmitButton title="Submit" onClick={this.onSubmit.bind(this)} />
            </div>
        )
    }
}
