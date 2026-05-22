# Methodology Literature

Rendered methodology references for the quantum many-body physics harness.

`ref.bib` is the human-edited source of truth for which references belong to
which method (entry `keywords = {dmrg, tebd, …}`). The per-method JSON
manifest consumed by `fetch_metadata.py` / `render.py` is derived via
`tools/skills/download-ref/helpers/bibtex_to_manifest.py` and is not
committed. The rendered Markdown entries under each method folder are the
agent-facing cite targets — agents cite the rendered Markdown path when one
exists.

Each method folder has its own `INDEX.md` and rendered markdown entries. Raw
PDFs, Semantic Scholar metadata, and extracted figures live in ignored `.raw/`
and `.figures/` directories inside each method folder.

## Folders

- `dmrg/` - DMRG and matrix-product-state references.
- `tebd/` - TEBD and tensor-network introductions.
- `vmc-nqs/` - variational Monte Carlo and neural quantum state references.
- `anderson-impurity/` - Anderson/Kondo impurity solver references.
- `spectral/` - spectral-function and dynamical-correlation references.
- `finite-t/` - finite-temperature Lanczos, METTS, and purification references.
- `dmft/` - DMFT references mentioned as adjacent/future methodology.
- `qmc/` - quantum Monte Carlo references mentioned as adjacent methodology.

`ref.bib` lives at this directory's root. To regenerate it from the rendered
markdown (e.g. after a manual edit drift) run
`python3 tools/skills/download-ref/helpers/md_to_bibtex.py` from the repo root.
