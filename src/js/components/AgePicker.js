import React from "react"

export default class AgePicker extends React.Component {
    
    render() {

    	const { onSubmit } = this.props

        return (
            <div class="col-lg-2 col-lg-push-5" style={{marginTop: "15%"}}>

            	<div class="form-group">
					<label for="sel1">Qual é a sua idade?</label>
					<select class="form-control" ref="select">
						<option>18</option>
						<option>19</option>
						<option>20</option>
						<option>21</option>
						<option>22</option>
						<option>23</option>
						<option>24</option>
						<option>25</option>
						<option>26</option>
					</select>
				</div>

            	<div class="form-group">
					<label for="sel1">Qual é a seu sexo?</label>
					<select class="form-control" ref="selectsex">
						<option>Masculino</option>
						<option>Feminino</option>
					</select>
				</div>

                <button class="btn btn-block" onClick={() => this.props.onSubmit(this.refs.select.value, this.refs.selectsex.value)}>Submit</button>
            </div>
        )
    }
}
