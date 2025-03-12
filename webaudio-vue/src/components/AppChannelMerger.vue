<script setup lang="ts">
import { reactive } from 'vue';
import AppNode from './AppNode.vue';
import { ChannelMerger } from '@/models/ChannelMerger';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new ChannelMerger());

</script>

<template>
    <AppNode :index="index" :model="model" :is-removable="true">
    </AppNode>
</template>
