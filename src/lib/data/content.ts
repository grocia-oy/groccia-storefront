import { cmsClient } from '@lib/config';

export async function getGlobalAnnouncementBar(lang: string) {
  return cmsClient.getGlobal(lang, ['announcement_bar']).catch(() => {
    console.error('Cannot get global announcement_bar content');
  });
}

export async function getHomepageSeo(lang: string) {
  return cmsClient.getHomepage(lang, ['seo']).catch(() => {
    console.error('Cannot get homepage SEO content');
  });
}

export async function getHomePageFull(lang: string) {
  return cmsClient
    .getHomepage(lang, ['hero_carousel.image', 'hero_carousel.buttons'])
    .catch(() => {
      console.error('Cannot get homepage contents');
    });
}
