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
 * Wallet Connection base module
 * @module @aeternity/aepp-sdk/es/utils/wallet-connection
 * @export WalletConnection
 * @example import ContractBase from '@aeternity/aepp-sdk/es/utils/wallet-connection'
 */

import { required } from '@stamp/required'

/**
 * Basic Wallet Connection
 *
 * This stamp include interface for wallet connection functionality.
 * Attempting to create instances from the Stamp without overwriting all
 * abstract methods using composition will result in an exception.
 * @function
 * @alias module:@aeternity/aepp-sdk/es/utils/wallet-connection
 * @rtype Stamp
 * @param {Object} [options={}] - Initializer object
 * @return {Object} WalletConnection instance
 */
export const WalletConnection = required({
  methods: {
    connect: required,
    disconnect: required,
    sendMessage: required,
  }
})

/**
 * Connect
 * @function connect
 * @instance
 * @abstract
 * @rtype (onMessage: Function) => void
 * @param {Function} onMessage - Message handler
 */

/**
 * Disconnect
 * @function disconnect
 * @instance
 * @abstract
 * @rtype () => void
 */

/**
 * Send message
 * @function sendMessage
 * @instance
 * @abstract
 * @rtype (msg: Object) => void
 * @param {Object} msg - Message
 */

/**
 * On disconnect handler
 * @function onDisconnect
 * @instance
 * @abstract
 * @rtype (handler: Function) => void
 * @param {Function} handler - On disconnect callback fnh
 */

export default WalletConnection
