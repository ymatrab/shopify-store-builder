export interface BrandStrategy {
    brandName: string;
    brandConcept: string;
    toneOfVoice: string;
    messagingPillars: string[];
    positioning: 'budget' | 'mid' | 'premium';
}

export interface CollectionPlan {
    handle: string;
    title: string;
    criteria: {
        tags?: string[];
    };
}

export interface NavigationLink {
    title: string;
    linkType: 'frontpage' | 'collection' | 'page' | 'url';
    handle?: string;
    url?: string;
}

export interface InformationArchitecturePlan {
    collectionsPlan: CollectionPlan[];
    navigationPlan: {
        mainMenu: NavigationLink[];
    };
    pagesNeeded: string[]; // e.g., ['about', 'faq', 'contact']
}

export interface DesignSystem {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontHeading: string;
    fontBody: string;
    buttonStyle: 'rounded' | 'square' | 'pill';
}

export interface SectionLayout {
    id: string;          // unique section ID
    type: string;        // e.g. 'hero', 'multicolumn', 'featured-collection'
    settings?: any;      // for v1, keep generic
}

export interface PageLayout {
    sections: SectionLayout[];
}

export interface DesignLayoutPlan {
    designSystem: DesignSystem;
    layouts: {
        [pageId: string]: PageLayout;
    };
}

export interface SectionCopy {
    [sectionId: string]: any; // in v1 allow flexible shape
}

export interface ProductCopyItem {
    productId: string;
    description: string;
    bullets?: string[];
}

export interface SeoMeta {
    [pageId: string]: {
        title: string;
        description: string;
    };
}

export interface CopySpec {
    sectionCopy: SectionCopy;
    productCopy: ProductCopyItem[];
    seoMeta: SeoMeta;
}

export interface StoreBlueprint {
    brandStrategy: BrandStrategy;
    iaPlan: InformationArchitecturePlan;
    designLayoutPlan: DesignLayoutPlan;
    copySpec: CopySpec;
}
