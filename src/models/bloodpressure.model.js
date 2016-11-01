'use strict';

const tableName = 'blood_pressure';

function BloodPressure(db) {
    this.db = db;
}

module.exports = BloodPressure;

const proto = BloodPressure.prototype;

proto.find = function findMeasure(query={}, fields='*') {
    return this.db(tableName).select(fields).where(query);
};

proto.validateNew = function validateNewBloodPressureMeasure(newMeasure) {
    // Missing fields check
    const missings = [];
    if (!newMeasure.userId) missings.push('userId');
    if (!newMeasure.date) missings.push('date');
    if (!newMeasure.systolic) missings.push('systolic');
    if (!newMeasure.diastolic) missings.push('diastolic');

    if (missings.length > 0) return Promise.reject({ missings });

    return Promise.resolve({});
};

proto.create = function createBloodPressureMeasure(newMeasure) {
    const now = (new Date()).toISOString();

    const data = {
        userId: newMeasure.userId,
        date: newMeasure.date,
        systolic: newMeasure.systolic,
        diastolic: newMeasure.diastolic,
        metadata: newMeasure.metadata,
        createdAt: now,
        updatedAt: now
    };

    return this.db(tableName).insert(data, 'id')
        .then(function(result) {
            return Promise.resolve({ id: result[0] });
        })
        .catch(function handleUserCreationFailure(err) {
            return Promise.reject(err);
        });
};
