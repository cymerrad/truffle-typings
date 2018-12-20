import * as Chai from "chai";

declare global {

	const assert: Chai.AssertStatic;
	const expect: Chai.ExpectStatic;

	function contract(name: string, test: (accounts: Truffle.Accounts) => void): void;

	const artifacts: Truffle.Artifacts;

}