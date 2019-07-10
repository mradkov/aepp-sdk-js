import stampit from '@stamp/it'
import { SUBSCRIPTION_TYPES } from '../schema'

const sendMessage = (messageId, connection) => ({ id, method, params, result, error }, isNotificationOrResponse = false) => {
  isNotificationOrResponse || (messageId += 1)
  id = isNotificationOrResponse ? (id || null) : messageId
  const msgData = params
    ? { params }
    : result
      ? { result }
      : { error }
  connection.sendMessage({
    jsonrpc: '2.0',
    ...id ? { id } : {},
    method,
    ...msgData
  })
  return id
}

const receive = (handler, msgId) => (msg) => {
  // if (!msg || !msg.jsonrpc || msg.jsonrpc !== '2.0' || !msg.method) return
  // Increment id for each request
  if (msg.id && +msg.id > msgId) msgId += 1
  handler(msg)
}

export const WalletClient = stampit({
  init ({ id, name, network, icons, connection, handlers: [onMessage, onDisconnect] }) {
    let messageId = 0
    this.id = id
    this.connection = connection
    this.info = { name, network, icons }
    // {
    //    [msg.id]: { resolve, reject }
    // }
    this.callbacks = {}
    this.actions = {}
    this.addressSubscription = []

    this.sendMessage = sendMessage(messageId, this.connection)

    connection.connect(receive(onMessage, messageId), onDisconnect)
  },
  methods: {
    disconnect () {
      this.connection.disconnect()
    },
    updateSubscription (type, value) {
      if (type === SUBSCRIPTION_TYPES.subscribe && !this.addressSubscription.includes(value)) {
        this.addressSubscription.push(value)
      }
      if (type === SUBSCRIPTION_TYPES.unsubscribe && this.addressSubscription.includes(value)) {
        this.addressSubscription = this.addressSubscription.filter(s => s !== value)
      }
    },
    addAction (action, [r, j]) {
      const removeAction = ((ins) => (id) => delete ins[id])(this.actions)
      if (this.callbacks.hasOwnProperty(action.id)) throw new Error('Action for this request already exist')
      this.actions[action.id] = {
        ...action,
        accept () {
          removeAction(action.id)
          r()
        },
        deny () {
          removeAction(action.id)
          j()
        }
      }
      return this.actions[action.id]
    },
    addCallback (msgId) {
      if (this.callbacks.hasOwnProperty(msgId)) throw new Error('Callback Already exist')
      return new Promise((resolve, reject) => {
        this.callbacks[msgId] = { resolve, reject }
      })
    },
    resolveCallback (msgId, args = []) {
      if (!this.callbacks[msgId]) throw new Error(`Can't find callback for this messageId ${msgId}`)
      this.callbacks[msgId].resolve(...args)
      delete this.callbacks[msgId]
    },
    rejectCallback (msgId, args = []) {
      if (!this.callbacks[msgId]) throw new Error(`Can't find callback for this messageId ${msgId}`)
      this.callbacks[msgId].reject(...args)
      delete this.callbacks[msgId]
    }
  }
})

export const WalletClients = stampit({
  init () {
    this.clients = new Map()
  },
  methods: {
    hasClient ({ id }) {
      return this.clients.has(id)
    },
    addClient (id, client) {
      if (this.hasClient(id)) console.warn(`Wallet RpcClient with id ${id} already exist`)
      this.clients.set(id, WalletClient({ ...client, id }))
    },
    getClient (id) {
      return this.clients.get(id)
    },
    updateClientInfo (id, info) {
      const client = this.getClient(id)
      client.info = { ...client.info, ...info }
      this.clients.set(id, client)
    },
    sentNotificationByCondition (msg, condition) {
      if (typeof condition !== 'function') throw new Error('Condition arguments must be a function which return boolean')
      this.clients
        .values()
        .filter(condition)
        .forEach(client => client.sendMessage(msg, true))
    }
  }
})
