<script setup lang="ts">
import { reactive, type Reactive } from "vue";
import AppAnalyser from "./components/AppAnalyser.vue";
import AppBiquadFilter from "./components/AppBiquadFilter.vue";
import AppBufferSource from "./components/AppBufferSource.vue";
import AppConstantSource from "./components/AppConstantSource.vue";
import AppConvolver from "./components/AppConvolver.vue";
import AppDynamicsCompressor from "./components/AppDynamicsCompressor.vue";
import AppDelay from "./components/AppDelay.vue";
import AppAudioContext from "./components/AppAudioContext.vue";
import AppIIRFilter from "./components/AppIIRFilter.vue";
import AppChannelMerger from "./components/AppChannelMerger.vue";
import AppChannelSplitter from "./components/AppChannelSplitter.vue";
import AppGain from "./components/AppGain.vue";
import AppOscillator from "./components/AppOscillator.vue";
import AppPanner from "./components/AppPanner.vue";
import AppStereoPanner from "./components/AppStereoPanner.vue";
import AppWaveShaper from "./components/AppWaveShaper.vue";
import AppButtons from "./components/AppButtons.vue";
import { NodeService } from './NodeService';
import type { Node2 } from "./models/Node2";
import type { Pos } from "./ts/Pos";
import { NodeType } from "./ts/NodeType";
import { SelectMode } from "./ts/SelectMode";

const service = reactive(new NodeService());

function handleDown(e: MouseEvent | Touch, model: Node2<AudioNode | AudioContext>, pos: Reactive<Pos>) {
    if (e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLAnchorElement) return;
    switch (service.selectMode) {
        case SelectMode.CONNECT:
            if (!service.nodeToConnect) {
                service.nodeToConnect = model;
            }
            else {
                model.connectFrom(service.nodeToConnect);
                service.nodeToConnect = null;
            }
            break;
        case SelectMode.DISCONNECT:
            model.disconnect();
            break;
        case SelectMode.MOVE:
            service.initialX = e.clientX - pos.left;
            service.initialY = e.clientY - pos.top;
            service.holding = pos;
    }
}

function handleUp(e: MouseEvent | Touch, model: Node2<AudioNode | AudioContext>, pos: Reactive<Pos>) {
    service.holding = null;
    service.initialX = pos.left;
    service.initialY = pos.top;
}

function handleMouseMove(e: MouseEvent) {
    const pos = service.holding;
    if (!pos) return;
    pos.left = e.clientX - service.initialX;
    pos.top = e.clientY - service.initialY;
}

function handleTouchMove(e: TouchEvent) {
    const pos = service.holding;
    if (!pos) return;
    pos.left = e.touches[0].clientX - service.initialX;
    pos.top = e.touches[0].clientY - service.initialY;
}

function onRemoveNodeRequest(model: Node2<AudioNode | AudioContext>, index: number) {
    service.nodes.splice(index, 1);
    model.disconnect();
    delete window.nodes[model.name];
}

function onAddNodeRequest(nodeType: NodeType) {
    service.nodes.push({id: service.newId++, nodeType});
}

function toggleSelectMode(selectMode: SelectMode) {
    if (service.selectMode === selectMode) {
        service.nodeToConnect = null;
        service.selectMode = SelectMode.MOVE;
    }
    else service.selectMode = selectMode;
}

</script>

<template>
    <div class="h-100 d-flex flex-column">
        <div class="position-relative overflow-hidden h-100" @mousemove="handleMouseMove"
            @touchmove="handleTouchMove">
            <template v-for="({id, nodeType}, i) of service.nodes" :key="id">
                <AppAudioContext v-if="nodeType === NodeType.AudioContext" :index="i" :main="false" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppAudioContext v-if="nodeType === NodeType.Main" :index="i" :main="true" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppAnalyser v-if="nodeType === NodeType.AnalyserNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <AppBiquadFilter v-if="nodeType === NodeType.BiquadFilterNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppBufferSource v-if="nodeType === NodeType.AudioBufferSourceNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppConstantSource v-if="nodeType === NodeType.ConstantSourceNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppConvolver v-if="nodeType === NodeType.ConvolverNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <AppDelay v-if="nodeType === NodeType.DelayNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <AppDynamicsCompressor v-if="nodeType === NodeType.DynamicsCompressorNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppGain v-if="nodeType === NodeType.GainNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <AppOscillator v-if="nodeType === NodeType.OscillatorNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <AppPanner v-if="nodeType === NodeType.PannerNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <AppStereoPanner v-if="nodeType === NodeType.StereoPannerNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppIIRFilter v-if="nodeType === NodeType.IIRFilterNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <AppChannelMerger v-if="nodeType === NodeType.ChannelMergerNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppChannelSplitter v-if="nodeType === NodeType.ChannelSplitterNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AppWaveShaper v-if="nodeType === NodeType.WaveShaperNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
            </template>
        </div>
        <AppButtons :service="service" @add="onAddNodeRequest" @toggle-select="toggleSelectMode" />
    </div>
</template>
