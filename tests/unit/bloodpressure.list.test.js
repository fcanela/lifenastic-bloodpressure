'use strict';

const assert = require('assert');

const resPath = '../../src/resources/bloodpressure/';
const depsMock = require('./bloodpressure.list.mocks');
const handler = require(resPath + 'bloodpressure.list').handler;

describe('Blood pressure list measures handler', () => {
    it('should list all measures', (done) => {
        handler({}, depsMock, (err, reply) => {
            if (err) return done(err);

            assert.strictEqual(reply.errors.length, 0, 'returned errors');

            const measures = reply.measures;
            assert.ok(measures instanceof Array, 'is an array');
            assert.notEqual(measures.length, 0, 'contains measures');
            assert.equal(measures[0].id, '1', 'contains the first measure');
            done();
        });
    });
});
