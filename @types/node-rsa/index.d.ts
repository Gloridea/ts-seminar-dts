declare module 'node-rsa' {
    interface NodeRsa {
        decrypt(message: string, encoding?: string): Buffer;
        encrypt(message: string, encoding?: string): Buffer;
    }

    interface NodeRsaConstructor {
        new (privateKey: string): NodeRsa;
    }

    let k: NodeRsaConstructor;
    export = k;
}