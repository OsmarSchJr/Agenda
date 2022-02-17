const Agenda = require('./agenda')

Agenda.methods(['get','post','put','delete'])
Agenda.updateOptions({new: true, runValidators: true})

module.exports = Agenda