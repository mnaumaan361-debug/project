
import React, { useContext } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import open from '../assets/active.mp3'
import { toast } from 'react-toastify'

function Ai() {
    let {showSearch, setShowSearch} = useContext(shopDataContext)
    let navigate = useNavigate()
    let oppeningSound=new Audio(open)

    function speak(message) {
        let utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition

    function handleVoice() {
        oppeningSound.play()
        if (!SpeechRecognition) {
            toast.error("Speech recognition is not supported")
            return
        }

        const recognition = new SpeechRecognition()

        recognition.onresult = (e) => {
            console.log(e)

            const transcript = e.results[0][0].transcript.trim().toLowerCase()

            if (
                transcript.includes("search") &&
                transcript.includes("open") &&
                !showSearch
            ) {
                speak('Opening search')
                setShowSearch(true)
                navigate("/collection")
            }

            else if (
                transcript.includes("search") &&
                transcript.includes("close") &&
                showSearch
            ) {
                speak('Closing search')
                setShowSearch(false)
            }

            else if (
                transcript.includes("collection") ||
                transcript.includes("collections") ||
                transcript.includes("product") ||
                transcript.includes("products")
            ) {
                speak('Opening collection page')
                navigate("/collection")
                setShowSearch(false)
            }

            else if (
                transcript.includes("about") ||
                transcript.includes("aboutpage")
            ) {
                speak('Opening about page')
                navigate("/about")
                setShowSearch(false)
            }

            else if (
                transcript.includes("home") ||
                transcript.includes("homepage")
            ) {
                speak('Opening home page')
                navigate("/")
                setShowSearch(false)
            }

            else if (
                transcript.includes("cart") ||
                transcript.includes("kaat") ||
                transcript.includes("caat")
            ) {
                speak('Opening cart page')
                navigate("/cart")
                setShowSearch(false)
            }

            else if (
                transcript.includes("contact") ||
                transcript.includes("contactpage")
            ) {
                speak('Opening contact page')
                navigate("/contact")
                setShowSearch(false)
            }

            else if (
                transcript.includes("order") ||
                transcript.includes("orderpage")
            ) {
                speak('Opening order page')
                navigate("/order")
                setShowSearch(false)
            }

            else {
                toast.error("Try again")
            }
        }

        recognition.onerror = () => {
            toast.error("Voice recognition failed. Try again")
        }

        recognition.start()
    }

    return (
        <div
            className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]'
            onClick={handleVoice}
            
        >
            <img src={ai} alt="AI Assistant" className='w-[100px] cursor-pointer' />
        </div>
    )
}


export default Ai