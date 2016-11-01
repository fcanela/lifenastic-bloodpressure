'use strict';

const command = {};
module.exports = command;

command.pattern = { cmd: 'list' };
command.handler = function listBloodPressureMeasures(msg, deps, respond) {
    const models = deps.models;
    models.BloodPressure.find().then(function processData(measures) {
        const errors = [];
        respond(null, { errors, measures });
    }).catch(respond);
};
