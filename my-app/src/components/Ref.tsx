import { use, useEffect, useRef } from "react"

const Ref = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    console.log({ divRef, aRef })

    setTimeout(() => {
      if (divRef.current) {
        divRef.current.style.backgroundColor = "green"
        divRef.current.style.color = "white"
        divRef.current.style.padding = "20px"
        divRef.current.style.textAlign = "center"
        divRef.current.style.marginTop = "20px"
      }
    }, 1000)
  }, [])

  return <div ref={divRef}>Ref</div>
}

export default Ref
