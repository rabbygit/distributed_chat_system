import { Adapter, BroadcastOptions, Room, SocketId } from "socket.io-adapter";
export interface RedisAdapterOptions {
    /**
     * the name of the key to pub/sub events on as prefix
     * @default socket.io
     */
    key: string;
    /**
     * after this timeout the adapter will stop waiting from responses to request
     * @default 5000
     */
    requestsTimeout: number;
    /**
     * Whether to publish a response to the channel specific to the requesting node.
     *
     * - if true, the response will be published to `${key}-request#${nsp}#${uid}#`
     * - if false, the response will be published to `${key}-request#${nsp}#`
     *
     * This option currently defaults to false for backward compatibility, but will be set to true in the next major
     * release.
     *
     * @default false
     */
    publishOnSpecificResponseChannel: boolean;
}
/**
 * Returns a function that will create a RedisAdapter instance.
 *
 * @param pubClient - a Redis client that will be used to publish messages
 * @param subClient - a Redis client that will be used to receive messages (put in subscribed state)
 * @param opts - additional options
 *
 * @public
 */
export declare function createAdapter(pubClient: any, subClient: any, opts?: Partial<RedisAdapterOptions>): (nsp: any) => RedisAdapter;
export declare class RedisAdapter extends Adapter {
    readonly pubClient: any;
    readonly subClient: any;
    readonly uid: any;
    readonly requestsTimeout: number;
    readonly publishOnSpecificResponseChannel: boolean;
    private readonly channel;
    private readonly requestChannel;
    private readonly responseChannel;
    private requests;
    /**
     * Adapter constructor.
     *
     * @param nsp - the namespace
     * @param pubClient - a Redis client that will be used to publish messages
     * @param subClient - a Redis client that will be used to receive messages (put in subscribed state)
     * @param opts - additional options
     *
     * @public
     */
    constructor(nsp: any, pubClient: any, subClient: any, opts?: Partial<RedisAdapterOptions>);
    /**
     * Called with a subscription message
     *
     * @private
     */
    onmessage(pattern: any, channel: any, msg: any): any;
    /**
   * Broadcasts a packet.
   *
   * @param {Object} packet - packet to emit
   * @param {Object} opts - options
   *
   * @public
   */
    broadcast(packet: any, opts: BroadcastOptions): void;
    private hasRoom;
    /**
     * Called on request from another node
     *
     * @private
     */
    private onrequest;
    /**
     * Send the response to the requesting node
     * @param request
     * @param response
     * @private
     */
    private publishResponse;
    /**
     * Called on response from another node
     *
     * @private
     */
    private onresponse;
    /**
     * Gets a list of sockets by sid.
     *
     * @param {Set<Room>} rooms   the explicit set of rooms to check.
     */
    sockets(rooms: Set<Room>): Promise<Set<SocketId>>;
    /**
     * Gets the list of all rooms (across every node)
     *
     * @public
     */
    allRooms(): Promise<Set<Room>>;
    /**
     * Makes the socket with the given id join the room
     *
     * @param {String} id - socket id
     * @param {String} room - room name
     * @public
     */
    remoteJoin(id: SocketId, room: Room): Promise<void>;
    /**
     * Makes the socket with the given id leave the room
     *
     * @param {String} id - socket id
     * @param {String} room - room name
     * @public
     */
    remoteLeave(id: SocketId, room: Room): Promise<void>;
    /**
     * Makes the socket with the given id to be forcefully disconnected
     * @param {String} id - socket id
     * @param {Boolean} close - if `true`, closes the underlying connection
     *
     * @public
     */
    remoteDisconnect(id: SocketId, close?: boolean): Promise<void>;
    fetchSockets(opts: BroadcastOptions): Promise<any[]>;
    addSockets(opts: BroadcastOptions, rooms: Room[]): void;
    delSockets(opts: BroadcastOptions, rooms: Room[]): void;
    disconnectSockets(opts: BroadcastOptions, close: boolean): void;
    serverSideEmit(packet: any[]): void;
    private serverSideEmitWithAck;
    /**
     * Get the number of subscribers of the request channel
     *
     * @private
     */
    private getNumSub;
}
