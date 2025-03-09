<script setup lang="ts">
import { Node2 } from '../models/Node2';
import { Convolver } from '../models/Convolver';
import { reactive, ref } from 'vue';
import NodeComponent from './NodeComponent.vue';

defineProps<{
    index: number
}>();

const model = reactive(new Convolver());
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
            <label :for="`convolver-buffer-${index}`" class="form-label">buffer</label>
            <input type="file" name="buffer" :id="`convolver-buffer-${index}`" class="form-control form-control-sm"
                @input="handleBufferChange" :disabled="isBufferLoading">
        </div>
        <div class="mb-3">
            <label :for="`convolver-normalize-${index}`" class="form-label me-1">normalize</label>
            <input type="checkbox" name="normalize" :id="`convolver-normalize-${index}`" class="form-check-input"
                v-model="model.node.normalize">
        </div>
    </NodeComponent>
</template>