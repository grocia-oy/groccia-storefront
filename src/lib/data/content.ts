import { cmsClient } from '@lib/config';

export async function getGlobalAnnouncementBar(lang: string) {
  return cmsClient
    .getGlobal(lang, ['announcement_bar', 'footer', 'footer.store_list'])
    .catch(() => {
      console.error('Cannot get global announcement_bar content');
    });
}

export async function getFooter(lang: string) {
  return cmsClient
    .getGlobal(lang, [
      'footer',
      'footer.store_list',
      'footer.about_company',
      'footer.social_links',
      'footer.policy_links',
    ])
    .catch(() => {
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
    .getHomepage(lang, [
      'hero_carousel.image',
      'hero_carousel.buttons',
      'product_rails',
    ])
    .catch(() => {
      console.error('Cannot get homepage contents');
    });
}
