import React, {Children, useEffect, useRef, useState} from "react"
import SwitchItem from "./SwitchItem"
import pageLoaded from "../helpers/pageLoaded"

function Switch({children, isTab, isAuth, tabClassName})
{
    const [state, setState] = useState([])
    const stateRef = useRef([])
    const contRef = useRef(null)
    const arrayChildren = Children.toArray(children)

    useEffect(() =>
    {
        let preLocation = window.location.pathname

        function getUrls()
        {
            return arrayChildren.reduce((sum, item) => item?.props?.path ? [...sum, item.props.path === "*" ? ".*" : item.props.exact ? `^${item.props.path}(\\/?)$` : `^${item.props.path.replace(/:\w+/g, ".*")}`] : [...sum, false], [])
        }

        function changeRoute(e)
        {
            const {type} = e
            const urls = getUrls()
            const locationTemp = window.location.pathname
            preLocation = locationTemp
            const showChildIndexTemp = urls.indexOf(urls.filter(url => url && new RegExp(url).test(locationTemp))[0])
            const {showChildIndex, location} = stateRef.current[stateRef.current.length - 1] || {}
            if (e?.target?.history?.state !== "for-history" && location !== locationTemp)
            {
                if (type === "initial")
                {
                    setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: `initial${generateId()}`})
                }
                else if (showChildIndexTemp === -1 || (isAuth && showChildIndex === showChildIndexTemp))
                {
                    setStateFunc({type: "replacestate", showChildIndex, location: locationTemp})
                }
                else
                {
                    desktopRoute(showChildIndexTemp, locationTemp, type)
                }
            }
        }

        changeRoute({type: "initial"})

        if (pageLoaded()) window.addEventListener("popstate", changeRoute, {passive: true})
        else
        {
            const intervalMs = 400
            const interval = setInterval(() =>
            {
                const nowLocation = window.location.pathname
                if (preLocation !== nowLocation) changeRoute({type: "popstate"})
            }, intervalMs)

            function loaded()
            {
                setTimeout(() =>
                {
                    clearInterval(interval)
                    window.addEventListener("popstate", changeRoute, {passive: true})
                    window.removeEventListener("load", loaded)
                }, intervalMs)
            }

            window.addEventListener("load", loaded, {passive: true})
        }
        window.addEventListener("pushstate", changeRoute, {passive: true})
        window.addEventListener("replacestate", changeRoute, {passive: true})

        return () =>
        {
            window.removeEventListener("popstate", changeRoute)
            window.removeEventListener("pushstate", changeRoute)
            window.removeEventListener("replacestate", changeRoute)
        }
        // eslint-disable-next-line
    }, [])

    function desktopRoute(showChildIndexTemp, locationTemp, type)
    {
        const delta = getDelta({showChildIndexTemp})

        if (contRef.current.animate)
        {
            contRef.current.style.opacity = "0"
            const fadeOut = contRef.current.animate([{opacity: 1}, {opacity: 0}], {duration: 200, easing: "ease-in"})
            fadeOut.finished.then(() =>
            {
                setTimeout(() =>
                {
                    if (contRef.current)
                    {
                        setStateFunc({
                            type: type === "popstate" && stateRef.current.length < 2 ? null : type,
                            showChildIndex: showChildIndexTemp,
                            location: locationTemp,
                            id: generateId(),
                            delta,
                        })
                        setTimeout(() => contRef.current?.style?.removeProperty?.("opacity"), 10)
                        contRef.current.animate([{opacity: 0}, {opacity: 1}], {duration: 200, easing: "ease-out"})
                    }
                }, 0)
            })
        }
        else setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: generateId(), delta})
    }

    function getDelta({showChildIndexTemp})
    {
        let delta = 1
        for (let i = stateRef.current.length - 1; i--; i >= 0)
        {
            if (stateRef.current[i].showChildIndex === showChildIndexTemp)
            {
                delta = (stateRef.current.length - 1) - i
                break
            }
        }
        return delta
    }

    function setStateFunc({type, showChildIndex, location, id, delta})
    {
        if (type === "initial")
        {
            stateRef.current = [{showChildIndex, location, id}]
        }
        else if (type === "replacestate")
        {
            const lastItemRef = stateRef.current[stateRef.current.length - 1]
            stateRef.current = [...stateRef.current.slice(0, stateRef.current.length - 1), {...lastItemRef, showChildIndex, location, ...(id ? {id} : {})}]
        }
        else if (type === "pushstate")
        {
            stateRef.current = [...stateRef.current, {showChildIndex, location, id}]
        }
        else if (type === "popstate")
        {
            const lastItemRef = stateRef.current[stateRef.current.length - (delta + 1)]
            stateRef.current = [...stateRef.current.slice(0, stateRef.current.length - (delta + 1)), {...lastItemRef, showChildIndex, location}]
        }
        else
        {
            stateRef.current = [{showChildIndex, location, id}]
        }
        setState(stateRef.current)
    }

    function generateId()
    {
        return (Math.random() + 1).toString(36).substring(7)
    }

    const output = state.map((item, index) =>
    {
        const {showChildIndex, location, id} = item
        const element = arrayChildren[showChildIndex]
        if (element)
        {
            return <SwitchItem key={id}
                               element={element}
                               location={location}
                               index={index}
                               stateLength={state.length}
                               id={id}
            />
        }
        else return null
    })

    if (isTab) return <div className={`switch-tab-cont ${tabClassName}`} ref={contRef}>{output}</div>
    else return <div ref={contRef}>{output}</div>
}

export default Switch