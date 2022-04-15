import CreateTodo from "./CreateTodo";
import Card from "./ui/Card";
import "./App.scss";
import { useThemeContext } from "./context/ThemeContext";

const App = () => {
  const { theme } = useThemeContext();

  return (
    <Card className={`theme-${theme} appbox`}>
      <Card className="background-img"></Card>
      <Card className="app">
        <CreateTodo />
      </Card>
    </Card>
  );
};

export default App;
