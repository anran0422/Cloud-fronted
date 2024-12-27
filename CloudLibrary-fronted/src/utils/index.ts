/**
 * 格式化文件大小
 * @param size
 */
export const formatSize = (size?: number) => {
  if (!size) return '未知'
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  return (size / (1024 * 1024)).toFixed(2) + ' MB'
}

/**
 * 下载图片
 * @param url 图片下载地址
 * @param fileName 要保存为的文件名
 */
import { saveAs } from 'file-saver';

export function downloadImage(url?: string, fileName?: string) {
  if (!url) {
    return
  }
  // 安装的包里面的，可是现在不起作用
  saveAs(url, fileName)
}

