<template>
    <div class="json-formate" @dblclick="changeFormate()">
        <template v-if="formate">{{json | json_to_text}}</template>
        <template v-else>{{json}}</template>
    </div>
</template>

<script lang="ts">
    import jsonToText from '@/utils/jsontext'
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component({
        filters: {
            json_to_text: (value: string) => jsonToText(value)
        }
    })
    export default class JsonFormate extends Vue {
        private formate: boolean = false;

        @Prop({default: ''})
        private json!: string

        private changeFormate() {
            this.formate = !this.formate
        }

    }
</script>

<style scoped>
    .json-formate{
        white-space: pre;
    }
</style>
