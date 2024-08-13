import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../redux/postSlice";
import Footer from "../components/post/Footer";

function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);
  const post = useSelector((state) => state.post.posts.post);
  return (
    <div className="">
      {/* đây là box 1 */}
      <div style={{ display: "flex" }} className="pt-24">
        <div
          style={{ margin: "50px", background: "#0754a8" }}
          className="border border-gray-300 rounded-lg shadow-lg p-6 max-w-lg mb-4 bg-blue-700 text-white"
        >
          <div className="title-post text-3xl font-semibold font-serif">
            {post?.title}
          </div>
          <div className="text-xl font-light mt-4">
            <p className="mb-2">
              <span className="font-semibold">Tác giả:</span> {post?.author}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Ngày viết:</span>{" "}
              {new Date(post?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* đây là box 2 */}
        <div className="mt-16">
          <div className="w-[500px] h-[300px]">
            {" "}
            <img src={post?.image} />{" "}
          </div>
          <div
            className="mt-10"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          ></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default PostDetail;
