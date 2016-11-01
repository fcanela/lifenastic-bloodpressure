'use strict';

const resourceAdaptor = require('./resource_adaptor');

module.exports = function addResources(seneca, dependencies) {
    addResource('bloodpressure');

    function addResource(dirname) {
        resourceAdaptor(dirname, dependencies, seneca);
    }
};

