/**
 * 将 RFC3339 格式的日期字符串转换为格式化的日期字符串
 * @param rfc3339Date RFC3339 格式的日期字符串
 * @param format 可选的日期格式，默认为 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export function formatRFC3339Date(
  rfc3339Date: string, 
  format: string = 'YYYY-MM-DD'
): string {
  try {
    const date = new Date(rfc3339Date);
    
    // 如果日期无效，返回原始字符串
    if (isNaN(date.getTime())) {
      return rfc3339Date;
    }

    // 使用内置的日期格式化
    const formatMap: Record<string, (d: Date) => string> = {
      'YYYY-MM-DD': (d) => d.toISOString().split('T')[0],
      'YYYY/MM/DD': (d) => d.toISOString().split('T')[0].replace(/-/g, '/'),
      'MM/DD/YYYY': (d) => {
        const parts = d.toISOString().split('T')[0].split('-');
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
      },
      'DD/MM/YYYY': (d) => {
        const parts = d.toISOString().split('T')[0].split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      },
      'YYYY-MM-DD HH:mm:ss': (d) => d.toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }).replace(/\//g, '-')
    };

    return formatMap[format] ? formatMap[format](date) : date.toISOString();
  } catch (error) {
    console.error('日期转换错误:', error);
    return rfc3339Date;
  }
}

/**
 * 将日期转换为相对时间
 * @param rfc3339Date RFC3339 格式的日期字符串
 * @returns 相对时间字符串
 */
export function formatRelativeTime(rfc3339Date: string): string {
  const date = new Date(rfc3339Date);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}天前`;
  if (hours > 0) return `${hours}小时前`;
  if (minutes > 0) return `${minutes}分钟前`;
  return '刚刚';
} 