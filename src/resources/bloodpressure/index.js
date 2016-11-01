'use strict';

const resource = {};
module.exports = resource;

resource.role = 'bloodpressure';

resource.commands = [
    require('./bloodpressure.list'),
    require('./bloodpressure.create')
];
