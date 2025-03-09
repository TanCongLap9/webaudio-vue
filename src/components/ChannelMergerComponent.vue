<script setup lang="ts">
import { reactive } from 'vue';
import NodeComponent from './NodeComponent.vue';
import { ChannelMerger } from '@/models/ChannelMerger';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new ChannelMerger());

</script>

<template>
    <NodeComponent :index="index" :model="model" :is-removable="true">
        
    </NodeComponent>
</template>
