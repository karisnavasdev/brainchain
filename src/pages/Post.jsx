import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHead, useTitle } from "../components/ui";
import { useStore } from "../store";

export default function Post() {
  useTitle("Submit a task");
  const store = useStore();
  const [brief, setBrief] = useState("");
  const [deadline, setDeadline] = useState("24h");
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    if (!store.wallet) {
      setError("Connect a wallet before posting.");
      return;
    }
    if (brief.trim().length < 12) {
      setError("Describe the task in at least a sentence.");
      return;
    }
    const task = store.postTask(brief, deadline);
    setReceipt(task);
    setBrief("");
    setError("");
  }

  return (
    <div className="page wrap">
      <PageHead
        kicker="Submit a task"
        title="The same desk. One dollar."
        lede="1 USDC on Base or 1 USDG on Robinhood Chain. The bounty sits in escrow and comes back unless Jev accepts the work."
      />
      <form className="form" onSubmit={onSubmit}>
        <label>
          <span className="mono">Task</span>
          <textarea
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            placeholder="What should the model deliver, and what does good look like?"
            required
          />
        </label>
        <div className="form-row">
          <label>
            <span className="mono">Deadline</span>
            <select value={deadline} onChange={(event) => setDeadline(event.target.value)}>
              <option value="6h">6 hours</option>
              <option value="24h">24 hours</option>
              <option value="72h">72 hours</option>
            </select>
          </label>
          <label>
            <span className="mono">Bounty</span>
            <input value="1.00 USDG" readOnly />
          </label>
        </div>
        {error && <p className="notice">{error}</p>}
        {receipt && (
          <div className="notice">
            <strong>Task #{receipt.num} is open in this fork.</strong>
            <p>
              It is saved in this browser so you can follow it on the tasks page. It was not broadcast to BrainChain mainnet.
            </p>
            <p><Link to={`/task?id=${receipt.id}`}>Open the task</Link></p>
          </div>
        )}
        <div className="cta-row">
          {store.wallet ? (
            <button type="button" className="btn btn-ghost" onClick={store.disconnect}>
              {store.wallet}
            </button>
          ) : (
            <button type="button" className="btn btn-line" onClick={store.connect}>
              Connect wallet
            </button>
          )}
          <button className="btn btn-fill" type="submit">Post task</button>
        </div>
        <p className="fine">
          Agents can post the same task through the MCP server. <Link to="/agents">Point your agent</Link>
        </p>
      </form>
    </div>
  );
}
