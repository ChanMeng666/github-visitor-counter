import crypto from 'crypto';
import { FLAG_COUNTER_BASE_URL } from '../constants.js';
import { validateHexColor, sanitizeLabel } from './params.js';

export function generateUserId(username) {
  // 使用用户名生成固定的 4 位 ID
  // 注意：这确保了同一用户名总是得到相同的 ID
  const normalizedUsername = username.toLowerCase();
  const hash = crypto.createHash('md5').update(normalizedUsername).digest('hex');
  return hash.substring(0, 4);
}

export function generateFlagCounterUrl(params) {
  const {
    username,
    columns,
    maxflags,
    label,
    showcount,
    size,
    bg,
    text,
    border
  } = params;

  // 生成基于用户名的唯一 ID
  const userId = generateUserId(username);
  
  // 验证和设置颜色
  const bgColor = validateHexColor(bg) ? bg : 'FFFFFF';
  const textColor = validateHexColor(text) ? text : '000000';
  const borderColor = validateHexColor(border) ? border : 'CCCCCC';
  
  // 处理标签
  const sanitizedLabel = sanitizeLabel(label);
  const labelParam = sanitizedLabel.replace(/\s+/g, '%2520');
  
  // 构建 Flag Counter URL
  // 注意：Flag Counter 的每个唯一 URL 都是独立的计数器
  // 这意味着不同的参数组合会创建不同的计数器
  const flagParams = [
    `bg_${bgColor}`,
    `txt_${textColor}`,
    `border_${borderColor}`,
    `columns_${columns}`,
    `maxflags_${maxflags}`,
    `viewers_${labelParam}`,
    `labels_0`,
    `pageviews_${showcount ? '1' : '0'}`,
    `flags_${size}`,
    `percent_0`
  ].join('/');

  return `${FLAG_COUNTER_BASE_URL}/count2/${userId}/${flagParams}/`;
}