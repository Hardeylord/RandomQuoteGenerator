import { useState } from "react";
import "./index.css";
import "./art.css";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [QUOTE, SET_QUOTE] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useGSAP(() => {
    // const split = new SplitText(".letters", {
    //   type: "chars, words",
    // });
    // gsap.from(split.words, {
    //   y: 100,
    //   autoAlpha: 0,
    //   stagger: 0.05,
    // });

    gsap.to('.letters', {
      opacity:1,
      ease:'power1.inOut',
      duration:1
    })
  }, [isLoading]);

  const getQuote = async () => {
    try {
      setisLoading(true);
      const quote = await fetch("https://api.quotable.io/random");
      const gottenQuote = await quote.json();
      SET_QUOTE(gottenQuote);
      setisLoading(false);
      console.log(QUOTE.content);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="bg-[#E6DED7] flex h-screen w-full">
        <div className="md:w-1/2 hidden md:flex">
          <img className="mask" src="/aristotle.png" />
        </div>
        <div className="md:w-1/2 pl-36 relative flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-[url(/scroll.png)] " />
          {/* <img src="/scroll.png" className="h-fit w-[70%]"/>  bg-center bg-contain 
              
            <img className="size-12" src="/game-icons_feather.svg" alt="" srcset="" />
          */}
          <div className="z-10 ">
            {QUOTE.length ? (
              isLoading ? (
                <img
                  className="size-12  animate-bounce"
                  src="/game-icons_feather.svg"
                  alt=""
                  srcset=""
                />
              ) : (
                <p className=" font-MedievalSharp opacity-0 letters text-[#1A1A1A] text-xl">
                  {QUOTE.content}
                </p>
              )
            ) : (
              <p className=" font-MedievalSharp letters text-xl">
                I think people who are creative are the luckiest people on
                earth. I know that there are no shortcuts, but you must keep
                your faith in something Greater than you and keep doing what you
                love. Do what you love, and you will find the way to get it out
                to the world.
              </p>
            )}
          </div>
          <div className="flex w-full mr-36 z-10 justify-end">
            <p>-</p>
            <span className="text-[#500000] font-fell text-2xl">
              {QUOTE.length ? <h1>{QUOTE.author}</h1> : <h1>Judy Collins</h1>}
            </span>
          </div>
          <div className="z-10 mt-16 bg-[#900c0c] rounded-full p-2 flex justify-center items-center">
            <img
              onClick={getQuote}
              className="size-6 cursor-pointer"
              src="/game-icons_quill-ink.svg"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
