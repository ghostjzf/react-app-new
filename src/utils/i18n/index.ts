import US from '@/locales/en_US.json';

export function __(key: string) {
  return (US as any)[key] || key;
}

window.__ = __;

export default __;
