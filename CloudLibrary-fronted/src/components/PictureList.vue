<template>
  <div class="picture-list">
    <!-- 图片列表 -->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :loading="loading"
    >
      <template #renderItem="{ item: picture }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a-card hoverable @click="doClickPicture(picture)">
            <template #cover>
              <img
                style="height: 180px; object-fit: cover"
                :alt="picture.name"
                :src="picture.thumbnailUrl ?? picture.url"
                loading="lazy"
              />
            </template>
            <a-card-meta :title="picture.name">
              <template #description>
                <a-flex>
                  <a-tag color="green">
                    {{ picture.category ?? '默认' }}
                  </a-tag>
                  <a-tag v-for="tag in picture.tags" :key="tag">
                    {{ tag }}
                  </a-tag>
                </a-flex>
              </template>
            </a-card-meta>

            <!--图片快捷操作-->
            <template v-if="showOP" #actions>
              <a-tooltip title="搜图" color='green'>
                <SearchOutlined @click="e => doSearch(picture, e)" />
              </a-tooltip>
              <a-tooltip title="分享" color='lime'>
                <ShareAltOutlined @click="e => doShare(picture, e)"/>
              </a-tooltip>
              <a-tooltip title="编辑" color='cyan'>
                <EditOutlined v-if="canEdit" @click="e => doEdit(picture, e)" />
              </a-tooltip>
              <a-tooltip title="删除" color='volcano'>
                <DeleteOutlined v-if="canDelete" @click="e => doDelete(picture, e)" />
              </a-tooltip>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <!-- 分享图片组件 -->
    <ShareModal ref="shareModalRef" :link="shareLink"  />
  </div>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DeleteOutlined,EditOutlined,SearchOutlined,ShareAltOutlined } from '@ant-design/icons-vue'
import { deletePictureUsingPost } from '@/api/pictureController'
import { message } from 'ant-design-vue'
import ShareModal from '@/components/modal/ShareModal.vue'
import { ref } from 'vue'

interface Props {
  dataList?: API.PictureVO[]
  loading?: boolean
  showOP?: boolean
  onReload?: () => void
  canEdit?: boolean
  canDelete?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  loading: false,
  showOP: false,
  canEdit: false,
  canDelete: false,
})

// 跳转至图片详情
const router = useRouter()
const doClickPicture = (picture) => {
  router.push({
    path: `/picture/${picture.id}`,
  })
}

// 分享弹窗引用
const shareModalRef =ref()
// 分享链接
const shareLink = ref<string>()

const doShare = (picture: API.PictureVO, e: Event) => {
  e.stopPropagation();
  shareLink.value = `${window.location.protocol}//${window.location.host}/picture/${picture.id}`
  if(shareModalRef.value) {
    shareModalRef.value.openModal()
  }
}

const doEdit = (picture, e) => {
  // 阻止冒泡
  e.stopPropagation()
  router.push({
    path:'/add_picture',
    query: {
      id:picture.id,
      spaceId: picture.spaceId
    }
  });
}

const doDelete = async (picture, e) => {
  // 阻止冒泡
  e.stopPropagation()
  const id = picture.id
  if(!id) {
    return
  }
  const res = await deletePictureUsingPost({id})
  if(res.data.code === 0) {
    message.success("删除图片成功")
    props.onReload()?.()
  } else {
    message.error("删除图片失败," + res.data.message)
  }
}

/**
 * 以图搜索
 */
const doSearch = (picture, e) => {
  e.stopPropagation()
  window.open(`/search_picture?pictureId=${picture.id}`)
}




</script>


<style scoped>
</style>
