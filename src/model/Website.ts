export interface Website {
    _id: string;
    url: string;
    links: Array<{
        anchor: string,
        href: string
    }>;
    level: number;
}
