<script setup lang="ts">
import { NodeType } from "@/ts/NodeType";
import { NodeService } from "../NodeService";
import { SelectMode } from "@/ts/SelectMode";

const { service } = defineProps<{
    service: NodeService
}>();

const emit = defineEmits<{
    (type: "add", nodeType: NodeType): void,
    (type: "toggleSelect", selectMode: SelectMode): void
}>();

</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="bg-secondary p-3">
            <div class="btn-group">
                <div class="btn btn-info dropup">
                    <div class="dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        Add
                    </div>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" @click="emit('add', NodeType.AnalyserNode)">Analyser</button>
                        <button class="dropdown-item" @click="emit('add', NodeType.AudioContext)">AudioContext</button>
                        <button class="dropdown-item"
                            @click="emit('add', NodeType.BiquadFilterNode)">BiquadFilter</button>
                        <button class="dropdown-item"
                            @click="emit('add', NodeType.AudioBufferSourceNode)">BufferSource</button>
                        <button class="dropdown-item"
                            @click="emit('add', NodeType.ChannelMergerNode)">ChannelMerger</button>
                        <button class="dropdown-item"
                            @click="emit('add', NodeType.ChannelSplitterNode)">ChannelSplitter</button>
                        <button class="dropdown-item"
                            @click="emit('add', NodeType.ConstantSourceNode)">ConstantSource</button>
                        <button class="dropdown-item" @click="emit('add', NodeType.ConvolverNode)">Convolver</button>
                        <button class="dropdown-item" @click="emit('add', NodeType.DelayNode)">Delay</button>
                        <button class="dropdown-item"
                            @click="emit('add', NodeType.DynamicsCompressorNode)">DynamicsCompressor</button>
                        <button class="dropdown-item" @click="emit('add', NodeType.GainNode)">Gain</button>
                        <button class="dropdown-item" @click="emit('add', NodeType.IIRFilterNode)">IIRFilter</button>
                        <button class="dropdown-item" @click="emit('add', NodeType.OscillatorNode)">Oscillator</button>
                        <button class="dropdown-item" @click="emit('add', NodeType.PannerNode)">Panner</button>
                        <button class="dropdown-item"
                            @click="emit('add', NodeType.StereoPannerNode)">StereoPanner</button>
                        <button class="dropdown-item" @click="emit('add', NodeType.WaveShaperNode)">WaveShaper</button>
                    </div>
                </div>
                <button id="connect-node" :class="{
                    'btn': true,
                    'btn-success': service.selectMode === SelectMode.CONNECT,
                    'btn-warning': service.selectMode !== SelectMode.CONNECT
                }" @click="emit('toggleSelect', SelectMode.CONNECT)">
                    <i class="fa fa-chain" aria-hidden="true"></i>
                    Connect!
                </button>
                <button id="disconnect-node" :class="{
                    'btn': true,
                    'btn-success': service.selectMode === SelectMode.DISCONNECT,
                    'btn-warning': service.selectMode !== SelectMode.DISCONNECT
                }" @click="emit('toggleSelect', SelectMode.DISCONNECT)">
                    <i class="fa fa-chain-broken" aria-hidden="true"></i>
                    Disconnect!
                </button>
            </div>
        </div>
    </div>
</template>
