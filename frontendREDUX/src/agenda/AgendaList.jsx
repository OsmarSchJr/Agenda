import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import IconButton from "../template/IconButton";
import { markAsDone, markAsPending, remove } from "./agendaAction";

const AgendaList = props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(agenda => (
            <tr key={agenda._id}>
                <td className={agenda.done ? 'MarkAsDone' : ''}>{agenda.description}</td>
                <td>
                    
                    <IconButton style="success" icon="check" onClick={() => props.markAsDone(agenda)} hide={agenda.done} />
                    <IconButton style="warning" icon="undo" onClick={() => props.markAsPending(agenda)} hide={!agenda.done} />
                    <IconButton style="danger" icon="trash-o" onClick={() => props.remove(agenda)} hide={!agenda.done}/>
                    
                </td>
            </tr>
        ))
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({ list: state.agenda.list})
const mapDispatchToProps = dispatch => bindActionCreators({markAsDone, markAsPending, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AgendaList)