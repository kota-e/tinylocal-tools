import type { Strings } from '../../i18n/strings';
import type { MaskCategory } from './safepaste';

export function getSafePasteSummaryLabels(t: Strings): Record<MaskCategory, string> {
  return {
    EMAIL: t.emails,
    PHONE: t.phones,
    URL: t.urls,
    IP: t.ips,
    NUMBER: t.longNumbers,
    SECRET: t.secrets,
    CUSTOM: t.customWords,
  };
}
