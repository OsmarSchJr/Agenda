import React from "react";

import PageHeader from "../template/PageHeader";
import AgendaForm from "./AgendaForm";
import AgendaList from "./AgendaList";


export default props => (
    <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <AgendaForm />
        <AgendaList />
    </div>
)
    