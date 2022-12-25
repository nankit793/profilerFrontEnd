import "../styles/globals.css";
// import App, { Container } from "next/app";
// import store from "../redux-next/store";
// import { wrapper } from "../redux-next/store";
import withRedux from "next-redux-wrapper";
import store from "../redux-next/store";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import reducer from "../redux-next/rootReducers";
function MyApp({ Component, pageProps }) {
  // const store = createStore(reducer);

  return (
    <>
      <div className="bg-color_3 ">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default withRedux(store)(MyApp);
