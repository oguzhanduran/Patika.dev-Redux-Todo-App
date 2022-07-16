import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <section className="todoapp">
        <Header />
        <Form />
        <Content />
      </section>
      <Footer />
    </div>
  );
}

export default App;
