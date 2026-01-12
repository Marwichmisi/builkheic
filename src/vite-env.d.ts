export { };

declare global {
    interface Window {
        AppConfig: {
            ads: {
                enabled: boolean;
                provider: string;
                clientId: string;
            };
            affiliate: {
                enabled: boolean;
                links: Record<string, string>;
            };
            app: {
                maxConcurrentConversions: number;
                debug: boolean;
            };
            seo: {
                footerCopyright: string;
                descriptionTitle: string;
                descriptionText: string;
            };
        };
    }
}
