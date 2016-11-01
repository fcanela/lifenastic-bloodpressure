'use strict';

const deps = {};

module.exports = deps;

deps.models = {};
deps.models.BloodPressure = {};

deps.models.BloodPressure.validateNew = function(newMeasure) {
    const missings = [];
    if (!newMeasure.userId) missings.push('userId');
    if (!newMeasure.date) missings.push('date');
    if (!newMeasure.systolic) missings.push('systolic');
    if (!newMeasure.diastolic) missings.push('diastolic');

    if (!missings.length )
        return Promise.resolve();
    else
        return Promise.reject({ missings });
};

deps.models.BloodPressure.create = function(newMeasure) {
    const result = {
        id: 3
    };
    return Promise.resolve(result);
};
