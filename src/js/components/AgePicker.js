import React from "react"

export default class AgePicker extends React.Component {
    
    constructor(args){
        super(...args)
        this.state = {
            selectedOption: '0',
        }
    }


    handleOptionChange(changeEvent) {
		this.setState({
			selectedOption: changeEvent.target.value
		});
	}


    render() {

    	const { onSubmit } = this.props

        return (
            <div class="col-lg-4 col-lg-push-4" style={{marginTop: "20vh"}}>

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
					</select>
				</div>

            	<div class="form-group">
					<label for="sel1">Qual é a seu sexo?</label>
					<select class="form-control" ref="selectsex">
						<option>Masculino</option>
						<option>Feminino</option>
					</select>
				</div>

            	<div class="form-group">
					<label for="sel1">Quantas vezes efetua quantas compras através da internet por ano?</label>
		            <form>
						<input type="radio" name="gender" value="0" onChange={this.handleOptionChange.bind(this)}  checked={this.state.selectedOption === '0'} /> 0<br/>
						<input type="radio" name="gender" value="1 - 3" onChange={this.handleOptionChange.bind(this)}  checked={this.state.selectedOption === '1 - 3'}/> 1 - 3<br/>
						<input type="radio" name="gender" value="4 - 6" onChange={this.handleOptionChange.bind(this)}  checked={this.state.selectedOption === '4 - 6'}/> 4 - 6<br/>
						<input type="radio" name="gender" value="7 - 9" onChange={this.handleOptionChange.bind(this)}  checked={this.state.selectedOption === '7 - 9'}/> 7 - 9<br/>
						<input type="radio" name="gender" value="10+" onChange={this.handleOptionChange.bind(this)}  checked={this.state.selectedOption === '10+'}/> 10+<br/>
					</form>
				</div>


                <button class="btn btn-block" onClick={() => this.props.onSubmit(this.refs.select.value, this.refs.selectsex.value, this.state.selectedOption)}>Submeter</button>
            </div>
        )
    }
}
