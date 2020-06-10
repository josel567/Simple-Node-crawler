export interface Website {
    url: string;
    links: Array<{
        anchor: string,
        href: string
    }>;
}
