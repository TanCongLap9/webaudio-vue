<script setup lang="ts">
import { reactive } from 'vue';
import NodeComponent from './NodeComponent.vue';
import { IIRFilter } from '@/models/IIRFilter';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new IIRFilter([1, 2], [3, 4]));

</script>

<template>
    <NodeComponent :index="index" :model="model" :is-removable="true">
        
    </NodeComponent>
</template>
