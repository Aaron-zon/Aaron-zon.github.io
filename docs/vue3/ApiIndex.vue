<script setup lang="ts">
import { data as apiIndex, APIGroup } from './api.data'
import { onMounted, computed, ref } from 'vue'
import { withBase } from 'vitepress'

const search = ref()
const query = ref('')

const normalize = (s: string) => s.toLowerCase().replace(/-/g, ' ')

onMounted(() => {
    search.value?.focus()
})

const filtered = computed(() => {
    const q = normalize(query.value)

    const matches = (text: string) => normalize(text).includes(q)
    return apiIndex
        .map((section) => {
            // section title match
            if (matches(section.text)) {
                return section
            }

            // filter groups
            const matchedGroups = section.items
                .map((item) => {
                    // group title match
                    if (matches(item.text)) {
                        return item
                    }
                    // ssr special case
                    if (q.includes('ssr') && item.text.startsWith('Server')) {
                        return item
                    }
                    // filter headers
                    const matchedHeaders = item.headers.filter(
                        ({ text, anchor }) => matches(text) || matches(anchor)
                    )
                    return matchedHeaders.length
                        ? { text: item.text, link: item.link, headers: matchedHeaders }
                        : null
                })
                .filter((i) => i)

            return matchedGroups.length
                ? { text: section.text, items: matchedGroups }
                : null
        })
        .filter((i) => i) as APIGroup[]
})

</script>

<template>
    <div class="wrapper">
        <div id="api-index">
            <div class="header">
                <h1>Vue3</h1>
            </div>
        </div>

        <div
            v-for="section of filtered"
            :key="section.text"
            class="api-section"
        >
            <h2 id="section.anchor">{{ section.text }}</h2>
            <div class="api-groups">
                <div
                    v-for="item of section.items"
                    :key="item.text"
                    class="api-group"
                >
                    <h3>{{ item.text }}</h3>
                    <ul>
                        <li v-for="h of item.headers" :key="h.anchor">
                            <a :href="withBase(item.link) + '.html#' + h.anchor">{{ h.text }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>