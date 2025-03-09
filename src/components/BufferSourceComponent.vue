<script setup lang="ts">
import { Node2 } from '../models/Node2';
import { BufferSource } from '../models/BufferSource';
import { reactive, ref } from 'vue';
import NodeComponent from './NodeComponent.vue';

defineProps<{
    index: number
}>();

const model = reactive(new BufferSource());
const isBufferLoading = ref(false);

async function handleBufferChange(e: Event) {
    const elem = e.target as HTMLInputElement;

    isBufferLoading.value = true;
    if (elem.files![0]) {
        model.node.buffer = await elem.files![0]
            .arrayBuffer()
            .then(buf => Node2.context.decodeAudioData(buf));
    }
    else model.node.buffer = null;
    isBufferLoading.value = false;
}
</script>

<template>
    <NodeComponent :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`buffersource-buffer-${index}`" class="form-label">buffer</label>
            <input type="file" name="buffer" :id="`buffersource-buffer-${index}`" class="form-control form-control-sm"
                @input="handleBufferChange" :disabled="isBufferLoading">
        </div>
        <div class="mb-3">
            <label :for="`buffersource-detune-${index}`" class="form-label">detune</label>
            <input type="number" name="detune" :id="`buffersource-detune-${index}`" class="form-control form-control-sm"
                step="10" v-model="model.node.detune.value">
        </div>
        <div class="mb-3">
            <label :for="`buffersource-loop-${index}`" class="form-label me-2">loop</label>
            <input type="checkbox" name="loop" :id="`buffersource-loop-${index}`" class="form-check-input"
                v-model="model.node.loop">
        </div>
        <div class="mb-3">
            <label :for="`buffersource-loopstart-${index}`" class="form-label">loopStart</label>
            <input type="number" name="loopstart" :id="`buffersource-loopstart-${index}`"
                class="form-control form-control-sm" min="0" v-model="model.node.loopStart">
        </div>
        <div class="mb-3">
            <label :for="`buffersource-loopend-${index}`" class="form-label">loopEnd</label>
            <input type="number" name="loopend" :id="`buffersource-loopend-${index}`"
                class="form-control form-control-sm" min="0" v-model="model.node.loopEnd">
        </div>
        <div class="mb-3">
            <label :for="`buffersource-playbackrate-${index}`" class="form-label">playbackRate</label>
            <input type="number" name="playbackrate" :id="`buffersource-playbackrate-${index}`"
                class="form-control form-control-sm" min="0" step="0.1" v-model="model.node.playbackRate.value">
        </div>
    </NodeComponent>
</template>