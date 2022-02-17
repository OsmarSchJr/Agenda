import React,{Component} from "react";
import axios from 'axios'

import PageHeader from "../template/PageHeader";
import AgendaForm from "./AgendaForm";
import AgendaList from "./AgendaList";

const URL = "http://localhost:3003/api/agendas"
export default class Agenda extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPeding = this.handleMarkAsPeding.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.refresh()
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/`: ''
        axios.get(`${URL}?sort=-createAt${search}`)
            .then(resp => this.setState({ ...this.state, description, list: resp.data}))
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleRemove(agenda) {
        axios.delete(`${URL}/${agenda._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(agenda) {
        axios.put(`${URL}/${agenda._id}`, { ...agenda, done: true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPeding(agenda) {
        axios.put(`${URL}/${agenda._id}`, { ...agenda, done: false})
            .then(resp => this.refresh(this.state.description))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleClear(){
        this.refresh()
    }
    
    render(){
        return(
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <AgendaForm handleAdd={this.handleAdd} description={this.state.description}
                    handleChange={this.handleChange} handleSearch={this.handleSearch} handleClear={this.handleClear}
                />
                <AgendaList list={this.state.list} handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone} handleMarkAsPeding={this.handleMarkAsPeding}    
                />
            </div>
        )
    }
}