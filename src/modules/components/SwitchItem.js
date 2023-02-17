import React, {Suspense} from "react"
import LoadingWrapper from "./LoadingWrapper"

function SwitchItem({index, stateLength, element, location, id})
{
    const isRendering = index === stateLength - 1
    const output = <Suspense fallback={<LoadingWrapper haveBg key="loading-wrapper"/>}>{React.cloneElement(element, {location, isRendering})}</Suspense>
    return (
        <div className={`switch-cont ${isRendering ? "rendering" : ""}`} id={id}>
            <div className={`switch ${isRendering ? "main-render" : ""}`}>
                {output}
            </div>
        </div>
    )
}

export default SwitchItem