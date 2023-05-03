import AllRoutes from "./Routes/AllRoutes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/CoustomTheme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <AllRoutes/>
      </ThemeProvider>
    </div>
  );
}

export default App;
