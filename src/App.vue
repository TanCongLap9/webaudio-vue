<script setup lang="ts">
import { reactive, type Reactive } from "vue";
import AnalyserComponent from "./components/AnalyserComponent.vue";
import BiquadFilterComponent from "./components/BiquadFilterComponent.vue";
import BufferSourceComponent from "./components/BufferSourceComponent.vue";
import ConstantSourceComponent from "./components/ConstantSourceComponent.vue";
import ConvolverComponent from "./components/ConvolverComponent.vue";
import DynamicsCompressorComponent from "./components/DynamicsCompressorComponent.vue";
import DelayComponent from "./components/DelayComponent.vue";
import AudioContextComponent from "./components/AudioContextComponent.vue";
import IIRFilterComponent from "./components/IIRFilterComponent.vue";
import ChannelMergerComponent from "./components/ChannelMergerComponent.vue";
import ChannelSplitterComponent from "./components/ChannelSplitterComponent.vue";
import GainComponent from "./components/GainComponent.vue";
import OscillatorComponent from "./components/OscillatorComponent.vue";
import PannerComponent from "./components/PannerComponent.vue";
import StereoPannerComponent from "./components/StereoPannerComponent.vue";
import { NodeService } from './NodeService';
import ButtonsComponent from "./components/ButtonsComponent.vue";
import type { Node2 } from "./models/Node2";
import type { Pos } from "./ts/Pos";
import { NodeType } from "./ts/NodeType";
import { SelectMode } from "./ts/SelectMode";

const service = reactive(new NodeService());

function handleDown(e: MouseEvent | Touch, model: Node2<AudioNode | AudioContext>, pos: Reactive<Pos>) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement) return;
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
                <AudioContextComponent v-if="nodeType === NodeType.AudioContext" :index="i" :main="false" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AudioContextComponent v-if="nodeType === NodeType.Main" :index="i" :main="true" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <AnalyserComponent v-if="nodeType === NodeType.AnalyserNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <BiquadFilterComponent v-if="nodeType === NodeType.BiquadFilterNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <BufferSourceComponent v-if="nodeType === NodeType.AudioBufferSourceNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <ConstantSourceComponent v-if="nodeType === NodeType.ConstantSourceNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <ConvolverComponent v-if="nodeType === NodeType.ConvolverNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <DelayComponent v-if="nodeType === NodeType.DelayNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <DynamicsCompressorComponent v-if="nodeType === NodeType.DynamicsCompressorNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <GainComponent v-if="nodeType === NodeType.GainNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <OscillatorComponent v-if="nodeType === NodeType.OscillatorNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <PannerComponent v-if="nodeType === NodeType.PannerNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <StereoPannerComponent v-if="nodeType === NodeType.StereoPannerNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <IIRFilterComponent v-if="nodeType === NodeType.IIRFilterNode" :index="i" @down="handleDown" @up="handleUp"
                    @dispose="onRemoveNodeRequest" />
                <ChannelMergerComponent v-if="nodeType === NodeType.ChannelMergerNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
                <ChannelSplitterComponent v-if="nodeType === NodeType.ChannelSplitterNode" :index="i" @down="handleDown"
                    @up="handleUp" @dispose="onRemoveNodeRequest" />
            </template>
        </div>
        <ButtonsComponent :service="service" @add="onAddNodeRequest" @toggle-select="toggleSelectMode" />
    </div>
</template>
