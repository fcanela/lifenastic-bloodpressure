'use strict';

const tableName = 'blood_pressure';

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            const promises = [];

            const nowISODate = (new Date()).toISOString();

            insert(1, nowISODate, 120, 80);
            insert(2, nowISODate, 140, 90);

            return Promise.all(promises);

            function insert(userId, date, systolic, diastolic) {
                const now = (new Date()).toISOString();
                const value = {
                    userId,
                    date,
                    systolic,
                    diastolic,
                    createdAt: now,
                    updatedAt: now
                };
                promises.push(knex(tableName).insert(value));
            };
        });

};

