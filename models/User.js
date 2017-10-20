var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	login: { type: String, unique: true, initial: true, required: true, index: true },
	email: { type: Types.Email, index: true, initial: true, required: true },
	password: { type: Types.Password, initial: true, required: true },
	resetPassword: { type: String },
	activationKey: { type: String },
	clientReference: { type: String, initial: true, required: true},
	isActive: {type: Boolean, label: 'Konto aktywne'},
	isClient: {type: Boolean, label: 'Klient'},
	isGuest: {type: Boolean, label: 'Gosc'}
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Panel admin', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'name, email, login, isAdmin', 'isActive';
User.register();
