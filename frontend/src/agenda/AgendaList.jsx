import React from "react";
import IconButton from "../template/IconButton";

export default props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(agenda => (
            <tr key={agenda._id}>
                <td className={agenda.done ? 'MarkAsDone' : ''}>{agenda.description}</td>
                <td>
                    
                    <IconButton style="success" icon="check" onClick={() => props.handleMarkAsDone(agenda)} hide={agenda.done} />
                    <IconButton style="warning" icon="undo" onClick={() => props.handleMarkAsPeding(agenda)} hide={!agenda.done} />
                    <IconButton style="danger" icon="trash-o" onClick={() => props.handleRemove(agenda)} hide={!agenda.done}/>
                    
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