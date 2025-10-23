import {Link} from "react-router";

export default function Home() {
    return (
        <ul>
            <li><Link to='/basic'>가장 기초적인 에이전트</Link></li>
            <li><Link to='/prompt_chainning'>1. 프롬프트 체이닝 패턴</Link></li>
        </ul>
    );
}
