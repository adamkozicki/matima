var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Image Model
 * ==========
 */

var Image = new keystone.List('Image', {
	autokey: { from: 'title', path: 'key', unique: true },
});
Image.add({
	title: { type: String, required: true, initial: true, index: true },
    state: {type: Types.Select, options: 'Publiczne, Prywatne', default: 'Publiczne', index: true },

    galleryReference: { type: String, required: true, initial: true, index: true },    
});


/**
 * Registration
 */
Image.defaultColumns = 'title'
Image.register();
