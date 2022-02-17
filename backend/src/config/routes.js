const express = require('express')

module.exports = function(server) {
    const router = express.Router()
    server.use('/api', router)

    const agendaService = require('../api/agenda/agendaService')
    agendaService.register(router, '/agendas')
}