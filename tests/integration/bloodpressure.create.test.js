'use strict';

const assert = require('assert');
const installFixtures = require('./helpers/install_fixtures');
const includesErrorCode = require('../helpers/includes_error_code');

describe('Blood pressure module create measure command', () => {
    let testEnv;
    let client;
    before(function prepareTestingContext(done) {
        const TestEnviroment = require('./helpers/create_service_client.js');
        testEnv = new TestEnviroment();
        testEnv.start(function settingUpVars(err, createdClient) {
            if (err) return done(err);
            client = createdClient;
            done();
        });
    });

    after(function cleanUp(done) {
        testEnv.stop(done);
    });

    beforeEach(function prepareTest(done) {
        installFixtures().then(() => {
            done();
        }, done);
    });

    it('should be able to create a measure and return its id', (done) => {
        const msg = {
            role: 'bloodpressure',
            cmd: 'create',
            userId: 3,
            date: (new Date).toISOString(),
            systolic: 120,
            diastolic: 80
        };

        client.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.strictEqual(reply.errors.length, 0, 'errors detected');
            assert.notStrictEqual(reply.measure.id, undefined, 'id field not returned');
            done();
        });
    });

    it('should be able to create a measure with metadata and return its id', (done) => {
        const msg = {
            role: 'bloodpressure',
            cmd: 'create',
            userId: 3,
            date: (new Date).toISOString(),
            systolic: 120,
            diastolic: 80,
            metadata: {
                measures: 3,
                awakening: true
            }
        };

        client.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.strictEqual(reply.errors.length, 0, 'errors detected');
            assert.notStrictEqual(reply.measure.id, undefined, 'id field not returned');
            done();
        });
    });

    it('should not create measures with missing fields', (done) => {
        const msg = {
            role: 'bloodpressure',
            cmd: 'create'
        };

        client.act(msg, (err, reply) => {
            if (err) return done(err);

            assert.notStrictEqual(reply.errors.length, 0, 'no errors detected');
            assert.ok(includesErrorCode(reply, 'UserIdRequired'), 'missing empty userId field error');
            assert.ok(includesErrorCode(reply, 'DateRequired'), 'missing empty date field error');
            assert.ok(includesErrorCode(reply, 'SystolicRequired'), 'missing empty systolic field error');
            assert.ok(includesErrorCode(reply, 'DiastolicRequired'), 'missing empty diastolic field error');
            done();
        });
    });

});
