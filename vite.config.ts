import htmlPartials from "./plugin/html-partials";

const GITHUB_REPOSITORY_NAME = "bit-by-bit";
const GITHUB_REPOSITORY_BASE = `/${GITHUB_REPOSITORY_NAME}/`;

export default {
    base: GITHUB_REPOSITORY_BASE,
    plugins: [htmlPartials()]
}
