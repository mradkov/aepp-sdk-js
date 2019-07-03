/*
 * ISC License (ISC)
 * Copyright (c) 2018 aeternity developers
 *
 *  Permission to use, copy, modify, and/or distribute this software for any
 *  purpose with or without fee is hereby granted, provided that the above
 *  copyright notice and this permission notice appear in all copies.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 *  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 *  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 *  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 *  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 *  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *  PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * Remote Account module
 * @module @aeternity/aepp-sdk/es/account/remote
 * @export MemoryAccount
 * @example import MemoryAccount from '@aeternity/aepp-sdk/es/account/remote'
 */

import Account from './'
import { ADDRESS_FORMAT } from '../utils/crypto'

async function sign (data) {
  // return Promise.resolve(Crypto.sign(data, secrets.get(this).secretKey))
}

async function address (format = ADDRESS_FORMAT.api) {
  // return Promise.resolve(Crypto.formatAddress(format, secrets.get(this).publicKey))
}

async function connect () {
  this.connection.connect(this.handler)
}

/**
 * RemoteAccount
 * @function
 * @alias module:@aeternity/aepp-sdk/es/account/remote
 * @rtype Stamp
 * @param {Object} [options={}] - Initializer object
 * @param {Object} options.keypair - Key pair to use
 * @param {String} options.keypair.publicKey - Public key
 * @param {String} options.keypair.secretKey - Private key
 * @return {Account}
 */
export const RemoteAccount = Account.compose({
  init ({ connection }) {
    this.connection = connection
    this.handler = () => {}
  },
  methods: { sign, address, connect }
})

export default RemoteAccount