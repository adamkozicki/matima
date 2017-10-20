var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Gallery.add({
	name: { type: String, required: true },
	state: {type: Types.Select, options: 'Opublikowany, Draft', default: 'Draft', index: true },
	eventDate: {type: Types.Date, index: true},
	publishedDate: {type: Types.Date, index: true, dependsOn: {state: 'Opublikowany'} },
	clientReference: { type: String, required: true, initial: true },
	guestReference: { type: String, required: true, initial: true },	
	heroImage: { type: String },
	imagesReference: { type: String },
	galleryReference: { type: String, required: true, initial: true, index: true },
});

Gallery.register();
