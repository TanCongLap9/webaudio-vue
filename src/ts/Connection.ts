import type { Node2 } from "@/models/Node2";

export interface Connection {
    from: Node2<AudioNode | AudioContext>,
    to: Node2<AudioNode | AudioContext>
}