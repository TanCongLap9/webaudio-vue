<script setup lang="ts">
import { reactive } from 'vue';
import { Gain } from '../models/Gain';
import NodeComponent from './NodeComponent.vue';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new Gain());

</script>

<template>
    <NodeComponent :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`gain-gain-${index}`" class="form-label">gain</label>
            <input type="number" name="gain" :id="`gain-gain-${index}`" class="form-control form-control-sm" step="0.1"
                v-model="model.node.gain.value">
        </div>
    </NodeComponent>
</template>