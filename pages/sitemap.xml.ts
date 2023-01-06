import { generateSiteMap } from '@/config/sitemap';

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {

    // We generate the XML sitemap with the docsConfig data
    const sitemap = generateSiteMap();

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;