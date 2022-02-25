import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Grid from "../template/Grid"
import IconButton from "../template/IconButton"
import { changeDescription, search, add, clear } from "./agendaAction"

class AgendaForm extends Component {
    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }
    
    componentWillMount() {
        this.props.search()
    }
    keyHandler(e) {
        const { add, search, description, clear} = this.props
        if(e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if(e.key === 'Escape') {
            clear()
        }
    }

    render() {
        const { add, search, description} = this.props
        return (
            <div role="form" className="agendaForm">
            <Grid cols="12 9 10">
                <input id="description" className="form-control" placeholder="Adicione uma tarefa" value={this.props.description}
                    onChange={this.props.changeDescription} onKeyUp={this.keyHandler}
                />
            </Grid>
            <Grid cols="12 3 2">
                <IconButton style='primary' icon='plus' onClick={() => add(description)} />
                <IconButton style="info" icon="search" onClick={search} />
                <IconButton style="default" icon="close" onClick={this.props.clear} />
            </Grid>
            </div>
        )
    }
}

const mapStateToPros = state => ({ description: state.agenda.description })
const mapDispatchToProps = dispatch => bindActionCreators({ changeDescription, search, add, clear }, dispatch)

export default connect(mapStateToPros, mapDispatchToProps)(AgendaForm)