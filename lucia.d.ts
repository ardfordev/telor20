// lucia.d.ts
/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("$lib/server/lucia.js").Auth;
	type UserAttributes = {
		email: string;
		name: string;
		unit: string;
		wilayah: string;
	};
}