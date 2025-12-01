export interface NavigationLink {
    title: string;
    linkType: 'frontpage' | 'collection' | 'page' | 'url';
    handle?: string;
    url?: string;
}

export interface ShopInfo {
    name: string;
    currency: string;
    locale: string;
}

export interface CatalogProfile {
    numProducts: number;
    hasImages: boolean;
    mainTags: string[];
}

export interface ThemeInfo {
    liveThemeId: number | null;
    baseTheme: 'dawn' | 'unknown';
}

export interface NavigationSnapshot {
    mainMenuItems: NavigationLink[];
}

export interface DiscoveryOutput {
    shopInfo: ShopInfo;
    catalogProfile: CatalogProfile;
    themeInfo: ThemeInfo;
    navigationSnapshot: NavigationSnapshot;
}
