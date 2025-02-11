'use strict';

const Chai = require('chai');

const Helpers = require('./helpers');
const Vips = require('../../lib/node/vips.js');

global.expect = Chai.expect;
global.Helpers = Helpers;

exports.mochaGlobalSetup = async function () {
    const options = {
        preRun: (module) => {
            module['EMBIND_AUTOMATIC_DELETELATER'] = true;
            module.setDelayFunction(fn => global.cleanup = fn);

            // Handy for debugging
            // module.ENV.G_MESSAGES_DEBUG = 'VIPS';

            // Hide warning messages
            module.ENV.VIPS_WARNING = '0';
        }
    };
    global.vips = await Vips(options);
}

exports.mochaGlobalTeardown = function () {
    // We are done, shutdown libvips and the runtime of Emscripten
    global.vips.shutdown();
}
