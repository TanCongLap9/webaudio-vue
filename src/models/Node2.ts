import type { Connection } from "@/ts/Connection";

export class Node2<T extends AudioNode | AudioContext> {
    running: boolean = false;
    static context = new AudioContext();

    static connectionsMap: Connection[] = [];

    constructor(
        public name: string,
        public node: T) {

    }

    get connectionsFrom() {
        return Node2.connectionsMap
            .filter(o => o.to === this)
            .map(o => o.from.name);
    }

    get connector(): AudioNode {
        return this.node instanceof AudioContext
            ? this.node.destination
            : this.node;
    }

    get runnable() {
        return this.node instanceof AudioScheduledSourceNode;
    }

    connectFrom(fromNode: Node2<T>) {
        fromNode.connector.connect(this.connector);
        Node2.connectionsMap.push({ from: fromNode, to: this });
        this.refresh();
    }

    disconnect() {
        for (let i = Node2.connectionsMap.length - 1; i >= 0; i--) {
            const connection = Node2.connectionsMap[i];
            if (connection.from === this) {
                connection.from.connector.disconnect();
                Node2.connectionsMap.splice(i, 1);
            }
        }
        this.refresh();
    }

    start() {
        if (!(this.node instanceof AudioScheduledSourceNode)) return;
        this.running = true;
        this.node.start();
        this.node.onended = () => this.onStop();
    }

    stop() {
        if (!(this.node instanceof AudioScheduledSourceNode)) return;
        this.node.stop();
    }

    onStop() {
        if (!(this.node instanceof AudioScheduledSourceNode)) return;
        this.running = false;
        const newNode = this.restore(this.node);
        for (const connection of Node2.connectionsMap)
            if (connection.from === this)
                newNode.connect(connection.to.connector);
        this.node = newNode as T;
    }

    restore(node: AudioNode): AudioNode {
        return node
    }

    refresh() {
        const oldName = this.name;
        this.name = "";
        this.name = oldName;
    }
}