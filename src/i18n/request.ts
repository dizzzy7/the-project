import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '../services/locale';

// TODO: Find out a way to not only split up the messaages by locale,
// but also by the current page

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
