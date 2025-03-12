<script setup lang="ts">
import { ConstantSource } from '../models/ConstantSource';
import { reactive } from 'vue';
import AppNode from './AppNode.vue';

defineProps<{
    index: number
}>();

const model = reactive(new ConstantSource());

</script>

<template>
    <AppNode :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`constantsource-offset-${index}`" class="form-label">offset</label>
            <input type="number" name="offset" :id="`constantsource-offset-${index}`"
                class="form-control form-control-sm" step="0.1" v-model="model.node.offset.value">
        </div>
    </AppNode>
</template>
