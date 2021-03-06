'use strict';

const Key = require('./Key');

const keyOrNull = (key) => {
	if (key instanceof Key)
		return key;

	return key ? new Key({ pem: key }) : null;
};

module.exports = class Keys {
	constructor({
		A006,
		E002,
		X002,
		bankX002,
		bankE002,
	}) {
		this.keys = {
			A006: keyOrNull(A006),
			E002: keyOrNull(E002),
			X002: keyOrNull(X002),
			bankX002: keyOrNull(bankX002),
			bankE002: keyOrNull(bankE002),
		};
	}

	static generate() {
		const keys = {};

		Object.keys({ A006: '', X002: '', E002: '' }).forEach((key) => {
			keys[key] = Key.generate(); // Key().generate();
		});

		return new Keys(keys);
	}

	setBankKeys(bankKeys) {
		this.keys.bankX002 = new Key(bankKeys.bankX002); // Key().importKey(bankKeys.bankX002);
		this.keys.bankE002 = new Key(bankKeys.bankE002); // Key().importKey(bankKeys.bankE002);
	}

	a() {
		return this.keys.A006;
	}

	e() {
		return this.keys.E002;
	}

	x() {
		return this.keys.X002;
	}

	bankX() {
		return this.keys.bankX002;
	}

	bankE() {
		return this.keys.bankE002;
	}
};
