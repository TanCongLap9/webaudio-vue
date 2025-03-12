import { Node2 } from "./Node2";

export class ChannelSplitter extends Node2<ChannelSplitterNode> {
    static count = 0;
    constructor() {
        super(
            `ChannelSplitter${++ChannelSplitter.count}`,
            Node2.context.createChannelMerger()
        );
    }
}
