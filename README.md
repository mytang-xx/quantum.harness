# quantum.harness

A student-facing quantum many-body research harness. It helps an AI agent choose a method, write runnable code, run the calculation, and verify the result.

Each method track is curated by world-leading experts in that computational approach, so the guidance reflects real research practice: what to compute, which checks matter, and where common failures happen.

If you are here for **Harnessing Quantum 2026**, start from the [submission guide](https://giggleliu.github.io/summer-school-2026/zh/guide), then use this repo to choose a track and produce a reproducible calculation.

## Start Here

Paste this into Claude Code, Codex, or OpenCode:

```text
Clone https://github.com/QuantumBFS/quantum.harness,
run `make skills` to install the harness skills,
then run /onboard. I am a student; help me choose a track and complete a reproducible quantum many-body calculation.
```

Then ask:

```text
/track-starter
```

## Student Workflow

1. Pick a method track.
2. Install only the software stack that track needs.
3. Reproduce a target result or run a small model calculation.
4. Verify the result with limits, convergence checks, and benchmarks when available.
5. Submit a runnable script plus a short report.

## Tracks

Each track folder contains the method-specific starting point for students, including the target problem, recommended stack, and verification expectations.

| Track | Contributor | Folder |
|---|---|---|
| Exact diagonalization | [Chen Cheng (程晨)](https://scholar.google.com/citations?user=LZpS-T0AAAAJ) | [`tracks/ed/`](tracks/ed/) |
| MPS / DMRG / TEBD | [Wei Li (李伟)](https://scholar.google.com/citations?user=7wiebe8AAAAJ) | [`tracks/mps/`](tracks/mps/) |
| PEPS / CTMRG | [Hai-Jun Liao (廖海军)](https://scholar.google.com/citations?user=_8KbQtEAAAAJ) | [`tracks/peps/`](tracks/peps/) |
| Quantum Monte Carlo | [Ming-Pu Qin (秦明普)](https://scholar.google.com/citations?user=ikqa-0IAAAAJ), [Kun Chen (陈锟)](https://scholar.google.com/citations?user=YItDGoIAAAAJ) | [`tracks/qmc/`](tracks/qmc/) |
| VMC / neural quantum states | [Yan-Tao Wu (武琰涛)](https://scholar.google.com/citations?user=D8sgaMwAAAAJ) | [`tracks/vmc/`](tracks/vmc/) |
| Quantum circuit simulation | [Shi-Xin Zhang (张士欣)](https://scholar.google.com/citations?user=Ut8nVqIAAAAJ), [Jin-Guo Liu (刘金国)](https://scholar.google.com/citations?user=4edw228AAAAJ) | [`tracks/qcs/`](tracks/qcs/) |

## Expert Curators

The method tracks and verification practices are shaped by active researchers who review the harness's method cards, benchmark values, and computational judgment.

| Name | Affiliation |
|---|---|
| [Chen Cheng (程晨)](https://scholar.google.com/citations?user=LZpS-T0AAAAJ) | Lanzhou University |
| [Hai-Jun Liao (廖海军)](https://scholar.google.com/citations?user=_8KbQtEAAAAJ) | Institute of Physics, CAS |
| [Kun Chen (陈锟)](https://scholar.google.com/citations?user=YItDGoIAAAAJ) | Institute of Theoretical Physics, CAS |
| [Ming-Pu Qin (秦明普)](https://scholar.google.com/citations?user=ikqa-0IAAAAJ) | Shanghai Jiao Tong University |
| [Shi-Xin Zhang (张士欣)](https://scholar.google.com/citations?user=Ut8nVqIAAAAJ) | Institute of Physics, CAS |
| [Wei Li (李伟)](https://scholar.google.com/citations?user=7wiebe8AAAAJ) | Beihang University |
| [Yan-Tao Wu (武琰涛)](https://scholar.google.com/citations?user=D8sgaMwAAAAJ) | Institute of Physics, CAS |
| [Jin-Guo Liu (刘金国)](https://scholar.google.com/citations?user=4edw228AAAAJ) | Hong Kong University of Science and Technology (Guangzhou) |

## Terminal Setup

```bash
git clone https://github.com/QuantumBFS/quantum.harness.git
cd quantum.harness
make skills
make help
```

Install a stack after you choose a track, for example:

```bash
make install julia
```

## Example Prompts

```text
I want to reproduce Figure 2 of arXiv:1711.03528, the PXP quantum many-body scars paper. Use /reproduce-paper to guide me.
```

```text
/solve ground state of the J1-J2 Heisenberg model on a 6x6 square lattice at J2/J1=0.5
```

```text
Survey recent work on neural quantum states for frustrated magnets. Use /survey to build a reference library.
```

## What The Harness Provides

- Model and physics cards with Hamiltonians, conventions, phases, and known limits.
- Method cards with algorithm choices, setup guidance, and verification checks.
- Skills such as `/onboard`, `/track-starter`, `/reproduce-paper`, `/solve`, `/parameter-scan`, and `/survey`.
- Generated scripts under `scripts/` and outputs under `results/`.
- Cluster support for calculations too large for a laptop.

## More

- [`.knowledge/`](.knowledge/) - model, physics, method, benchmark, and literature cards.
- [`skills/`](skills/) - agent workflows invoked as `/name`.
- [`AGENTS.md`](AGENTS.md) - full harness operating instructions.
