const { default: PostCreate } = require("./components/PostCreate");
const { default: Posts } = require("./components/Posts");


function App() {
  return (
    <div className="container">
      <h1>Blog</h1>
      <PostCreate/>
      <Posts/>
    </div>
  );
}

export default App;
