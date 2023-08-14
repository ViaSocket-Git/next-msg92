import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Headcomp from "@/components/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // const [login, setlogin] = useState(true)
  // const [signup, setSignup] = useState(true)
  const [showNavbar, setShowNavbar] = useState(true)
  // const { slug } = router.query; 
  var  brawserPath = router.asPath;
  const trimmedPath =  brawserPath.split("?")[0];
  var brawserPathCase = brawserPath;
  var brawserPathMeta = brawserPath;
  console.log("brawserPath: " + brawserPath);
  if (brawserPath !== '/') {
    const pattern = /\/([^/?]+)/;
    const result = brawserPath.match(pattern);
    brawserPath = result ? result[0] : brawserPath;
    
  }
  var path = brawserPath.split("/")[1];
  console.log(path, "path");
  const year = new Date().getFullYear();
  // useEffect(() => {
  //   require("bootstrap/dist/js/bootstrap.bundle.min.js");
  //   if(brawserPath === '/login' || brawserPath === `/login` || brawserPath === '/signup'){
  //     setShowNavbar(false)
  //   }
  // }, [brawserPath]);

  useEffect(() => {

    // Check if the trimmedPath starts with "/login" or "/signup"
    if (trimmedPath.startsWith('/login') || trimmedPath.startsWith('/signup')) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [trimmedPath]);
    return (
      <>
      <Headcomp brawserPath={brawserPathMeta} />
      {showNavbar && <Navbar brawserPath={brawserPath} />}
      <Component {...pageProps} path={path} browserPath={brawserPath} browserPathCase={brawserPathCase}/>
      {showNavbar && <Footer path={path} year={year} />}
    </>
    );
}
