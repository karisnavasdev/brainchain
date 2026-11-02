import { Route, Routes } from "react-router-dom";
import { Shell } from "./components/ui";
import Home from "./pages/Home";
import {
  Agents,
  Changes,
  Decision,
  Decisions,
  Explorer,
  How,
  Legal,
  Model,
  Models,
  Network,
  NotFound,
  Operations,
  Points,
  Roadmap,
  Task,
  Tasks,
  Testnet,
} from "./pages/Pages";
import Post from "./pages/Post";

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decisions" element={<Decisions />} />
        <Route path="/decision" element={<Decision />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/task" element={<Task />} />
        <Route path="/models" element={<Models />} />
        <Route path="/model" element={<Model />} />
        <Route path="/how-it-works" element={<How />} />
        <Route path="/network" element={<Network />} />
        <Route path="/testnet" element={<Testnet />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/points" element={<Points />} />
        <Route path="/post" element={<Post />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/changes" element={<Changes />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  );
}
