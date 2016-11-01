'use strict';

const assert = require('assert');

const resPath = '../../src/resources/bloodpressure/';
const depsMock = require('./bloodpressure.create.mocks');
const includesErrorCode = require('../helpers/includes_error_code');
const handler = require(resPath + 'bloodpressure.create').handler;

describe('Blood pressure module create handler', () => {
    it('should register a blood pressure measure and provide its id', (done) => {
        const nowISODate = (new Date()).toISOString();

        const newMeasure = {
            userId: 7,
            date: nowISODate,
            systolic: 80,
            diastolic: 120
        };
        handler(newMeasure, depsMock, (err, reply) => {
            if (err) return done (err);

            assert.strictEqual(reply.errors.length, 0, 'returned errors');
            assert(reply.measure.id > 0, 'id field not returned');
            done();
        });
    });

    it('should register a blood pressure measure with metadata and provide its id', (done) => {
        const nowISODate = (new Date()).toISOString();

        const newMeasure = {
            userId: 7,
            date: nowISODate,
            systolic: 80,
            diastolic: 120,
            metadata: {
                measures: 3,
                awakening: true
            }
        };
        handler(newMeasure, depsMock, (err, reply) => {
            if (err) return done (err);

            assert.strictEqual(reply.errors.length, 0, 'returned errors');
            assert(reply.measure.id > 0, 'id field not returned');
            done();
        });
    });

    it('should fail when some field is missing', (done) => {
        const newMeasure = {
        };
        handler(newMeasure, depsMock, (err, reply) => {
            if (err) return done (err);
            assert.notStrictEqual(reply.errors.length, 0, 'returned no errors with empty email');
            assert.ok(includesErrorCode(reply, 'UserIdRequired'), 'missing empty userId field error');
            assert.ok(includesErrorCode(reply, 'DateRequired'), 'missing empty date field error');
            assert.ok(includesErrorCode(reply, 'SystolicRequired'), 'missing empty systolic field error');
            assert.ok(includesErrorCode(reply, 'DiastolicRequired'), 'missing empty diastolic field error');

            done();
        });
    });
});
