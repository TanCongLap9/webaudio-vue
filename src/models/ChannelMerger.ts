import { Node2 } from "./Node2";

export class ChannelMerger extends Node2<ChannelMergerNode> {
    static count = 0;
    constructor() {
        super(
            `ChannelMerger${++ChannelMerger.count}`,
            Node2.context.createChannelMerger()
        );
    }
}