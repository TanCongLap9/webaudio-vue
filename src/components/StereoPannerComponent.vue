<script setup lang="ts">
import { reactive } from 'vue';
import { StereoPanner } from '../models/StereoPanner';
import NodeComponent from './NodeComponent.vue';

defineProps<{
    index: number
}>();

const model = reactive(new StereoPanner());

</script>

<template>
    <NodeComponent :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`stereopanner-pan-${index}`" class="form-label">pan</label>
            <input type="number" name="pan" :id="`stereopanner-pan-${index}`" class="form-control form-control-sm"
                min="-1" max="1" step="0.1" v-model="model.node.pan.value">
        </div>
    </NodeComponent>
</template>