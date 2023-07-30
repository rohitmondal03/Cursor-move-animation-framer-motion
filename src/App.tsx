import { useEffect, useState } from 'react'
import './App.css'
import { motion } from 'framer-motion';

function App() {
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({
    x: 0,
    y: 0
  })

  const [cursorVariant, setCursorVariant] = useState<string>("default")


  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])


  const variants: any = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 70,
      y: mousePosition.y - 70,
      backgroundColor: "yellow",
      mixBlendMode: "difference"
    }
  }


  const textEnter = () => {
    setCursorVariant("text")
  }

  const textLeave = () => {
    setCursorVariant("default")
  }


  return (
    <div className='main-div'>
      <div>
        <h1 onMouseEnter={textEnter} onMouseLeave={textLeave}>Hello World</h1>
      </div>

      <motion.div
        className='cursor'
        variants={variants}
        transition={{ type: "tween" }}
        animate={cursorVariant}
      />
    </div>
  )
}

export default App
