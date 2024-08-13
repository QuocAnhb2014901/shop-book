import Banner from "../components/Banner";
import Footer from "../components/post/Footer";
import PostNew from "../components/post/PostNew";
import Vacxinlist from "../components/post/Vacxinlist";
import Activities from "../components/post/Activities";
import Message from "./Message";
import About from "../components/post/About";
const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <About></About>
      <Activities></Activities>
      <PostNew></PostNew>
      <Vacxinlist></Vacxinlist>
      <Message></Message>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
