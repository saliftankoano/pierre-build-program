import lab from "../lab.json";
import { resolveScenario } from "../lib/scenario";

type PageProps = { searchParams: Promise<{ scenario?: string }> };

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const mode = params.scenario === "incident" ? "incident" : "normal";
  const result = resolveScenario(mode);
  return (
    <main>
      <p className="eyebrow">{lab.id} · Milestone {lab.milestone} · {lab.timeboxMinutes} minutes</p>
      <h1>{lab.title}</h1>
      <p className="lede">{lab.buildBrief}</p>
      <section className="status" aria-labelledby="status-title">
        <div><p className="label">Current scenario</p><h2 id="status-title">{mode === "normal" ? "Normal operation" : "Seeded incident"}</h2></div>
        <span className={`pill ${result.state}`}>{result.label}</span>
        <p>{result.message}</p>
        <p><strong>Evidence:</strong> {result.evidence.join(" · ") || "No evidence collected yet"}</p>
      </section>
      <div className="actions">
        <a href="/">Normal state</a>
        <a href="/?scenario=incident">Activate incident</a>
      </div>
      <div className="grid">
        <section><p className="label">Known model</p><h2>{lab.bridge.knownConcept}</h2><p>{lab.bridge.applicationConcept}</p></section>
        <section><p className="label">Where the analogy breaks</p><h2>Boundary check</h2><p>{lab.bridge.analogyLimit}</p></section>
        <section><p className="label">Game day</p><h2>Observe before editing</h2><p>{lab.incidentBrief}</p></section>
      </div>
      <aside><strong>Start with a prediction.</strong> Run <code>npm run incident</code>, collect evidence, then make the smallest repair that passes the challenge test.</aside>
    </main>
  );
}
