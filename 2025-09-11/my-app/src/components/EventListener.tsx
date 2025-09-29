import { useEffect } from "react"

const EventListener = () => {
  const clickHandler = (event: MouseEvent) => {
    console.log({ x: event.clientX, y: event.clientY })
  }

  useEffect(() => {
    window.addEventListener("click", clickHandler)

    return () => {
      window.removeEventListener("click", clickHandler)
    }
  }, [])

  return <div>EventListener</div>
}

export default EventListener
