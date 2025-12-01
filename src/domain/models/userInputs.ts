export interface UserInputs {
    brandName?: string;
    niche: string;
    positioning: 'budget' | 'mid' | 'premium';
    trafficFocus: string[]; // e.g., ['SEO', 'TikTok']
    needLogo: boolean;
}
