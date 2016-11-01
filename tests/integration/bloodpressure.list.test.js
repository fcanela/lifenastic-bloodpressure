'use strict';

const assert = require('assert');
const installFixtures = require('./helpers/install_fixtures');

describe('Blood pressure module list command', () => {
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

    it('should list all measures', (done) => {
        const msg = {
            role: 'bloodpressure',
            cmd: 'list'
        };

        client.act(msg, (err, reply) => {
            if (err) return done(err);
            assert.strictEqual(reply.errors.length, 0, 'returned errors');

            const measures = reply.measures;
            assert.notEqual(measures.length, 0, 'empty list returned');
            const firstItem = measures[0];
            assert.notStrictEqual(firstItem.id, undefined, 'unable to get first record');
            done();
        });
    });
});
