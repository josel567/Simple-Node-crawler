export interface Website {
    url: string;
    links: Array<{
        anchor: string,
        href: string
    }>;
    time: number;
    level: number;
}
