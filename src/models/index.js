'use strict';

module.exports = function loadModels(db) {
    const models = {};

    const BloodPressure = require('./bloodpressure.model');
    models.BloodPressure = new BloodPressure(db);

    return models;
};
