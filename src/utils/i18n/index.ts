import US from '@/locales/en_US.json';
import ZH_CN from '@/locales/zh_CN';

export function __(key: string) {
  const timezone = localStorage.getItem('timezone');

  if (timezone === 'us') {
    return (US as any)[key] || key;
  }

  return (ZH_CN as any)[key] || key;
}

window.__ = __;

export default __;
