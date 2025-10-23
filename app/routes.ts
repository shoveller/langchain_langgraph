import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/basic', 'routes/basic.tsx'),
    route('/api/basic', 'routes/api/basic.tsx'),
    route('/prompt_chainning', 'routes/prompt_chainning.tsx'),
    route('/api/prompt_chainning', 'routes/api/prompt_chainning.tsx'),
] satisfies RouteConfig;
