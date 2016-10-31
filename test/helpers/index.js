'use strict';

require('sinon-as-promised');

//var auth = require('../../lib/auth');

exports.mockAuth = function(sandbox) {
    var authMock = sandbox.mock({'getAccessToken':function(){}});
    authMock.expects('getAccessToken').resolves({access_token: 'an_access_token'});
};