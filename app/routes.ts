import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/api/chat1', 'routes/chat.tsx')
] satisfies RouteConfig;
