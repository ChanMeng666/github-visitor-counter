import crypto from 'crypto';
import { FLAG_COUNTER_BASE_URL } from '../constants.js';
import { validateHexColor, sanitizeLabel } from './params.js';

export function generateUserId(username) {
  const hash = crypto.createHash('md5').update(username).digest('hex');
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

  const userId = generateUserId(username);
  
  const bgColor = validateHexColor(bg) ? bg : 'FFFFFF';
  const textColor = validateHexColor(text) ? text : '000000';
  const borderColor = validateHexColor(border) ? border : 'CCCCCC';
  
  const sanitizedLabel = sanitizeLabel(label);
  const labelParam = sanitizedLabel.replace(/\s+/g, '%2520');
  
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