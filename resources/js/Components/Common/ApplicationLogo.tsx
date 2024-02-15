import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className="w-[50px]">
            <img src="/images/logo.svg" alt="Logo"></img>
        </div>
    );
}
