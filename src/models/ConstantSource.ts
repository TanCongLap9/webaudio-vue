import { Node2 } from "./Node2";

export class ConstantSource extends Node2<ConstantSourceNode> {
    static count = 0;
    constructor() {
        super(
            `ConstantSource${++ConstantSource.count}`,
            Node2.context.createConstantSource()
        );
    }

    override restore(node: ConstantSourceNode): ConstantSourceNode {
        const newNode = Node2.context.createConstantSource();
        newNode.offset.value = node.offset.value;
        return newNode;
    }
}