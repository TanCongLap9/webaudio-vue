import { Node2 } from "./Node2";

export class Oscillator extends Node2<OscillatorNode> {
    real = new Array<number>(5).fill(0);
    imag = new Array<number>(5).fill(0);
    periodicWave = Node2.context.createPeriodicWave(this.real, this.imag);
    static count = 0;
    constructor() {
        super(
            `Oscillator${++Oscillator.count}`,
            Node2.context.createOscillator()
        );
    }

    reloadPeriodicWave() {
        this.periodicWave = Node2.context.createPeriodicWave(this.real, this.imag);
        this.node.setPeriodicWave(this.periodicWave);
    }

    override restore(node: OscillatorNode) {
        const newNode = Node2.context.createOscillator();
        newNode.detune.value = node.detune.value;
        newNode.frequency.value = node.frequency.value;
        if (node.type !== "custom")
            newNode.type = node.type;
        else newNode.setPeriodicWave(this.periodicWave);
        return newNode;
    }
}