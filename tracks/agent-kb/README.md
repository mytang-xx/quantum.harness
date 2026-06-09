# AI Agent and Knowledge Base (智能体与数据库)

A track for the **agent and knowledge-base layer** of the harness itself — the
reasoning agents that run quantum-many-body research and the knowledge base
(`.knowledge/`, model/physics/method cards, skills) that grounds them. Unlike the
method tracks (ED, MPS, PEPS, QMC, …), the deliverable here is not a reproduced
physics figure but a **better-functioning research agent or knowledge base**:
retrieval quality, grounding faithfulness, skill design, card coverage, or an
evaluation that measures any of these.

This track suits participants from AI / systems / data backgrounds who want to push
the harness's machinery rather than a single computational method.

**Track leads:** [Kun Chen (陈锟)](https://scholar.google.com/citations?user=YItDGoIAAAAJ),
[Jin-Guo Liu (刘金国)](https://scholar.google.com/citations?user=4edw228AAAAJ).

## Reproduction target

**Not yet fixed — to be decided at track start.** This track is scaffolded without a
fixed onboarding target; pick the concrete target interactively when you begin.
Candidate framings (choose and pin one with the track lead at the help desk):

- **Reproduce an agentic-AI / RAG result** — onboard by reproducing a published
  retrieval-augmented-generation or tool-use/agent benchmark number, then go beyond
  it. Keeps the same reproduce → challenge shape as the physics tracks; use
  `/download-ref` to bring the chosen paper into `.knowledge/literature/`.
- **Build + benchmark the harness knowledge base** — onboard by authoring a
  knowledge-base card plus a skill that consumes it, and measuring retrieval /
  grounding quality on real harness questions.
- **Stand up an agent evaluation** — onboard by building an eval that scores how
  faithfully a research agent answers quantum questions grounded in `.knowledge/`
  (retrieval recall, citation faithfulness), then improve the agent against it.

Once a target is chosen, record it here (and its tasks / success criteria) so the
track has a fixed onboarding goal like the other tracks.

## References

To be populated when the target is chosen. Foundational directions for this track:
retrieval-augmented generation, tool-use / reasoning-and-acting agents, agent
evaluation and grounding faithfulness. Use `/download-ref <arXiv-id|DOI>` to fetch
the chosen references into `.knowledge/literature/` with correct metadata rather
than hand-entering citations here.
