'use strict';

/**
 * Micro servicio de thumbail de imagenes
 */

const cote = require('cote');
const Jimp = require('jimp');
const path = require('path');

const responder = new cote.Responder({ name: 'Image resize responder' });

responder.on('resize', (req, done) => {



    
    Jimp.read(path.join(__dirname, '..', 'public', 'anuncios', req.filename ))
        .then( img => {
            return img
                .resize(100, 100)
                .quality(60)
                .write(path.join(__dirname,  '..', 'public',  'anuncios', 'thumb-'+req.filename ))
            })
            .catch(err => {
                console.log(err)
            });
            done('min-' + req.filename);
});

module.exports = responder;