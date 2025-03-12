<script setup lang="ts">
import { reactive } from 'vue';
import { AudioContext2 } from "../models/AudioContext2";
import NodeComponent from './AppNode.vue';

const { index, main } = defineProps<{
    index: number,
    main: boolean
}>();

const model = reactive(new AudioContext2(main));

</script>

<template>
    <NodeComponent :model="model" :index="index" :is-removable="!main">

    </NodeComponent>
</template>
