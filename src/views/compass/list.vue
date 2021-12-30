<script lang="ts">
export default { name: 'CompassList' }
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import { getPost } from '@/api/compass'
import { IPost, IPostParams } from '@/interfaces/compass'

const queryForm = reactive({
  id: null,
  author: '',
  title: '',
})

const getAllPost = async () => {
  const params: IPostParams = {
    _page: 1,
    _limit: 10,
  }
  if (queryForm.id) params.id = queryForm.id
  if (queryForm.author) params.author = queryForm.author
  if (queryForm.title) params.title = queryForm.title
  const posts = await getPost<IPost[]>(params)
  console.log(posts)
  posts.forEach((i) => {
    console.log(`${i.id}-${i.author}-${i.title}`)
  })
}

const onSubmit = () => {
  getAllPost()
}

getAllPost()
</script>

<template>
  <div>
    <el-form
      :inline="true"
      :model="queryForm"
      class="my-query-form"
      @keyup.enter="onSubmit"
    >
      <el-form-item label="id">
        <el-input
          v-model="queryForm.id"
          placeholder="Approved by"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="文章作者">
        <el-input
          v-model="queryForm.author"
          placeholder="文章作者"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input
          v-model="queryForm.title"
          placeholder="文章标题"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
    <my-table></my-table>
    <my-pagination />
  </div>
</template>

<style lang="scss" scoped></style>
