import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Day1 from "./pages/Day1";
import Day2 from "./pages/Day2";
import Day3 from "./pages/Day3";
import Day4 from "./pages/Day4";
import Day5 from "./pages/Day5";
import Day6 from "./pages/Day6";
import Planner from "./pages/Planner";
import TestVoice from "./pages/TestVoice";
import Phrases from "./pages/Phrases";

// Get base path from environment
const basePath = import.meta.env.BASE_URL || '/';

function AppRouter() {
  return (
    <Router base={basePath}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/day1" component={Day1} />
        <Route path="/day2" component={Day2} />
        <Route path="/day3" component={Day3} />
        <Route path="/day4" component={Day4} />
        <Route path="/day5" component={Day5} />
        <Route path="/day6" component={Day6} />
        <Route path="/planner" component={Planner} />
        <Route path="/test-voice" component={TestVoice} />
        <Route path="/phrases" component={Phrases} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
