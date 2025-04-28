<template>
  <div class="project-progress">
    <div class="content">
      <a-timeline>
        <template v-for="(milestone, index) in milestones" :key="index">
          <a-timeline-item>
            <a-card :bordered="false" class="milestone-card">
              <template #title>
                <div class="milestone-header">
                  <span>{{ milestone.title }}</span>
                  <a-tag :class="['status-tag', milestone.status]">
                    {{ milestone.status }}
                  </a-tag>
                </div>
              </template>
              <template #extra>
                {{ milestone.date }}
              </template>
              <div class="features-list">
                <ul>
                  <li v-for="(feature, fIndex) in milestone.features" :key="fIndex">
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </a-card>
          </a-timeline-item>
        </template>
      </a-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type MilestoneStatus = '规划中' | '进行中' | '已完成'

interface Milestone {
  title: string
  date: string
  status: MilestoneStatus
  features: string[]
}

const milestones = ref<Milestone[]>([
  {
    title: '项目上线',
    date: '2025-04-22',
    status: '已完成',
    features: [
      '项目上线'
    ],
  },
  {
    title: '引入项目进程',
    date: '2025-04-26',
    status: '已完成',
    features: [
      '修改细节',
      '引入项目进程'
    ],
  },
  {
    title: '预计添加新功能',
    date: '2025-05-01',
    status: '规划中',
    features: [
      '更改整套前端 UI 界面',
      '引入 Elastic 技术栈实现倒排索引'
    ],
  },
])
</script>

<style scoped>
.project-progress {
  padding: 24px;
  min-height: 100vh;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.milestone-card {
  max-width: 800px;
  width: 100%;
  margin: 0 0 0 12px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.milestone-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #1890ff;
}

.milestone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.milestone-header span {
  font-size: 16px;
  font-weight: 500;
}

.features-list {
  padding: 8px 0;
}

.features-list ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.features-list li {
  margin: 0;
  padding-left: 16px;
  line-height: 1.6;
  position: relative;
}

.features-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: #1890ff;
  border-radius: 50%;
}

:deep(.ant-card-head) {
  min-height: auto;
  padding: 0 24px;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.ant-card-body) {
  padding: 16px 24px;
}

:deep(.ant-timeline-item-content) {
  width: 100%;
}

.status-tag {
  font-size: 12px !important;
  line-height: 18px !important;
  padding: 0 8px !important;
  border-radius: 10px !important;
  margin-right: 24px !important;
  border: none !important;
}

.status-tag.规划中 {
  color: #d46b08 !important;
  background: #fff7e6 !important;
}

.status-tag.进行中 {
  color: #096dd9 !important;
  background: #e6f4ff !important;
}

.status-tag.已完成 {
  color: #389e0d !important;
  background: #f6ffed !important;
}
</style>
