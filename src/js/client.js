import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import { Provider } from "react-redux"


import Intro from "./pages/Intro"
import Layout from "./pages/Layout"
import MainTest from "./pages/MainTest"
import Pretest from "./pages/Pretest"
import Thanks from "./pages/Thanks"

import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Intro}></Route>
			<Route path="maintest" name="maintest" component={MainTest}></Route>
			<Route path="pretest" name="pretest" component={Pretest}></Route>
			<Route path="thanks" name="thanks" component={Thanks}></Route>
		</Router>
	</Provider>,
app)
