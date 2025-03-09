<script setup lang="ts">
import { ConstantSource } from '../models/ConstantSource';
import { reactive } from 'vue';
import NodeComponent from './NodeComponent.vue';

defineProps<{
    index: number
}>();

const model = reactive(new ConstantSource());

</script>

<template>
    <NodeComponent :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`constantsource-offset-${index}`" class="form-label">offset</label>
            <input type="number" name="offset" :id="`constantsource-offset-${index}`"
                class="form-control form-control-sm" step="0.1" v-model="model.node.offset.value">
        </div>
    </NodeComponent>
</template>