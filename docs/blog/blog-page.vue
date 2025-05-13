<script setup>
import { blogRouter } from '../.vitepress/blogRouter'
import { onMounted, computed, ref } from 'vue';
import { withBase } from 'vitepress'

const filtered = computed(() => {
    const yearList = Object.keys(blogRouter).sort().reverse()
    const result = []
    for (const year of yearList) {
        blogRouter[year].year = year
        result.push(blogRouter[year])
    }
    return result
})
</script>

<template>
    <div>Blog</div>
    <div class="blog-container">
        <ul class="year-blog-wrapper">
            <li class="year-blog-group" v-for="blogList in filtered" :key="blogList.year">
                <div class="year">{{ blogList.year }}</div>
                <p v-for="item of blogList" 
                    :key="item.text" 
                    class="year-blog-item"
                >
                    <a class="text" :href="withBase(item.link) + '.html#'">{{ item.text  }}</a>
                </p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.year-blog-wrapper {
    list-style: none;
}

.year-blog-group {
    position: relative;
    margin-top: 100px;
}

.year-blog-item {
    margin: 0;
    padding: 5px;

}

.year-blog-item a {
    color: #666;
    text-decoration: none;
    position: relative;
    font-size: 18px;
}

.year-blog-item a:hover {
    color: #000;
}

.text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: black;
  transition: width 0.1s ease, left 0.1s ease;
}

.text:hover::after {
  width: 100%;
  left: 0;
}

.year {
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(80, 80, 80);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-feature-settings: normal;
    font-size: 128px;
    font-variation-settings: normal;
    font-weight: 700;
    line-height: 224px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    scrollbar-color: rgb(238, 238, 238) rgb(255, 255, 255);
    tab-size: 4;
    text-size-adjust: 100%;
    position: absolute;
    top: -105px;
    left: -50px;
    opacity: .2;
    color: transparent;
    z-index: -1;
}
</style>