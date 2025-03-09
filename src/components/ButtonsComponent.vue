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
                        <button id="create-analyser" class="dropdown-item"
                            @click="emit('add', NodeType.AnalyserNode)">Analyser</button>
                        <button id="create-audiocontext" class="dropdown-item"
                            @click="emit('add', NodeType.AudioContext)">AudioContext</button>
                        <button id="create-biquadfilter" class="dropdown-item"
                            @click="emit('add', NodeType.BiquadFilterNode)">BiquadFilter</button>
                        <button id="create-buffersource" class="dropdown-item"
                            @click="emit('add', NodeType.AudioBufferSourceNode)">BufferSource</button>
                        <button id="create-channelmerger" class="dropdown-item"
                            @click="emit('add', NodeType.ChannelMergerNode)">ChannelMerger</button>
                        <button id="create-channelsplitter" class="dropdown-item"
                            @click="emit('add', NodeType.ChannelSplitterNode)">ChannelSplitter</button>
                        <button id="create-constantsource" class="dropdown-item"
                            @click="emit('add', NodeType.ConstantSourceNode)">ConstantSource</button>
                        <button id="create-convolver" class="dropdown-item"
                            @click="emit('add', NodeType.ConvolverNode)">Convolver</button>
                        <button id="create-delay" class="dropdown-item" @click="emit('add', NodeType.DelayNode)">Delay</button>
                        <button id="create-dynamicscompressor" class="dropdown-item"
                            @click="emit('add', NodeType.DynamicsCompressorNode)">DynamicsCompressor</button>
                        <button id="create-gain" class="dropdown-item" @click="emit('add', NodeType.GainNode)">Gain</button>
                        <button id="create-iirfilter" class="dropdown-item"
                            @click="emit('add', NodeType.IIRFilterNode)">IIRFilter</button>
                        <button id="create-oscillator" class="dropdown-item"
                            @click="emit('add', NodeType.OscillatorNode)">Oscillator</button>
                        <button id="create-panner" class="dropdown-item"
                            @click="emit('add', NodeType.PannerNode)">Panner</button>
                        <button id="create-stereopanner" class="dropdown-item"
                            @click="emit('add', NodeType.StereoPannerNode)">StereoPanner</button>
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