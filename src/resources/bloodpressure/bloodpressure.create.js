'use strict';

const command = {};
module.exports = command;

command.pattern = { cmd: 'create' };

command.handler = function createBloodPressureMeasure(msg, deps, respond) {
    const models = deps.models;
    const newMeasure = msg;

    models.BloodPressure.validateNew(newMeasure)
    .then(function validFields() {
        return models.BloodPressure.create(newMeasure);
    })
    .then(function measureCreated(measure) {
        const errors = [];
        respond(null, { errors, measure });
    })
    .catch(function(err) {
        if (err instanceof Error) return respond(err);

        const errors = [];

        // Missing fields
        if (err.missings) {
            err.missings.forEach((field) => {
                const capitalized = capitalize(field);
                errors.push({
                    code: `${capitalized}Required`,
                    message: `${capitalized} field is mandatory`
                });
            });
        }

        respond(null, { errors });

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    });
};

