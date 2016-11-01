'use strict';

const deps = {};

module.exports = deps;

deps.models = {};
deps.models.BloodPressure = {};

deps.models.BloodPressure.find = function() {
    var result = [];

    function add(userId, date, systolic, diastolic) {
        const nowISODate = (new Date()).toISOString();

        result.push({
            id: (result.length + 1).toString(),
            userId,
            date,
            systolic,
            diastolic,
            created: nowISODate,
            updated: nowISODate
        });
    }

    const nowISODate = (new Date()).toISOString();
    add(1, nowISODate, 120, 80);
    add(3, nowISODate, 140, 90);

    return Promise.resolve(result);
};
