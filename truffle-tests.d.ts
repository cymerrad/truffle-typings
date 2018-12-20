import * as Chai from "chai";
import "./truffle-contract";

declare global {

	const assert: Chai.AssertStatic;
	const expect: Chai.ExpectStatic;

	/**
	 * Describe a set of nested tests for a contract with the given `name` and 
	 * with `accounts` contained in the network.
	 *
	 * - _Only available when invoked via the Truffle CLI._
	 */
	function contract(name: string, test: (accounts: Truffle.Accounts) => void): void;

	const artifacts: Truffle.Artifacts;

}