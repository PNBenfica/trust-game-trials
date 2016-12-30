import React from "react"

import TestSelectorButton from "./../components/TestSelectorButton"

export default class Layout extends React.Component {
    render() {

        return (
            <div class="container">
                <div class="row" id="home-buttons-container">
                    <TestSelectorButton title="Pretest" link="/pretest" />
                    <TestSelectorButton title="Main Test" link="/maintest" />
                </div>
            </div>
        )
    }
}
