import { Provider } from "web3/providers";

declare global {
  interface HashMap<K, V> {
    [key: K]: V;
  }

  interface HashMapStringTo<T> {
    [key: string]: T;
  }

  /**
   * Namespace
   */
  namespace Truffle {
    type Accounts = string[];
    type HexString = string;
    type Address = HexString; // that is 42 characters in length

    interface TransactionDetails {
      from: string;
      to?: string;
      data?: string;
      gas?: number | string;
      gasPrice?: number | string;
      value?: number | string;
      nonce?: number;
    }

    interface TransactionLog {
      address: string;
      args: any;
      blockHash: string;
      blockNumber: number;
      event: string;
      logIndex: number;
      transactionHash: string;
      transactionIndex: number;
      type: string;
    }

    interface TransactionResponse {
      tx: string;
      receipt: any;
      logs: TransactionLog[];
    }

    interface NetworkInfo {
      id: string;
      blockLimit: number; // TODO: bigNumber?
    }

    interface NetworkLinks {

    }

    type NetworkEvents = HashMapStringTo<AbiEvent>


    interface Network {
      links: NetworkLinks;
      events: NetworkEvents;
    }

    interface Wallet {

    }

    interface Contract<T> extends ContractNew<any[]>, Artifact.JSON {
      // constructor methods (in order of appearance)

      setProvider(provider: Provider): void;
      'new'(...args: any[]): Promise<T>;
      at(address: string): T;
      deployed(): Promise<T>;
      defaults(params: TransactionDetails): void;
      hasNetwork(networkId: string | number): boolean;
      isDeployed(): boolean;
      detectNetwork(): Promise<NetworkInfo>;
      setNetwork(networkId: string | number): void;
      setWallet(wallet: Wallet);
      resetAddress(): void;
      link(name: string, address: Address);
      /**
       * 
       * @param json Object -> merge in the JSON data, 
       * network_id -> clone and set network_id. 
       * Something like that.
       */
      clone(json: Object | string);
      addProp(key: string, fn: Function); // TODO: what does it do?
      toJson(): string;

      // properties (in order of appearance)
      // mostly getters/setters

      //contract_name: string; // Ignore this prop?
      contractName: string;
      gasMultiplier: number;
      timeoutBlocks: number; // NOT_SURE
      autoGas: boolean;
      numberFormat: "BigNumber" | "BN" | "String";
      network: () => Network;
      /** @override */
      networks: () => Network[];
      address: string;
      transactionHash: string;
      links: () => NetworkLinks;
      events: () => NetworkEvents;
      binary: () => string;
      deployedBinary: () => string;

    }

    interface ContractInstance {
      address: string;
    }

    interface ContractNew<ARGs extends any[]> {
      "new"(...args: ARGs): any;
    }

    interface Deployer {
      link(library: Truffle.Contract<any>, destination: Truffle.Contract<any>): Deployer;
      link(library: Truffle.Contract<any>, destinations: Array<Truffle.Contract<any>>): Deployer;
      deploy<T extends any[]>(c: ContractNew<T>, ...args: T): Deployer;
    }

    type Migration = (deploy: Deployer, network: string, accounts: Accounts) => void;

    // Wanna exact typings for your smartcontracts? Use typechain
    interface Artifacts {
      require<T = any>(name: string): T;
    }
  }
}

declare namespace Artifact {
  interface JSON {
    abi: AbiFunction[];
    bytecode: string;
    deployedBytecode: string;
    sourceMap: string;
    deployedSourceMap: string;
    source: string;
    sourcePath: string;
    ast: any; // TODO
    compiler: {
      name: string;
      version: string;
    };

    networks: HashMapStringTo<{
      events: any; // TODO
      links: HashMap<Contract, Address>; // Contract -> Address
      address: string;
      transactionHash: string;
    }>;

    schemaVersion: string;
    updatedAt: string;
    devdoc: any; // TODO? this one is going to be difficult
    userdoc: any; // same
  }

  interface AbiFunction {
    constant: boolean;
    inputs: AbiInput[];
    name: string;
    outputs: any[];
    payable: boolean;
    stateMutability: string;
    type: string;
    signature: string;
  }

  interface AbiEvent {
    // TODO
  }

  interface AbiInput {
    name: string;
    type: string;
  }

  type Address = string;
  type Contract = string;
}