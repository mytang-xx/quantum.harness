# Tensor networks for quantum computing

Aleksandr Berezutskii,1, 2, ∗Minzhao Liu,3, † Atithi Acharya,3 Roman Ellerbrock,1 Johnnie Gray,4 Reza
Haghshenas,5 Zichang He,3 Abid Khan,3 Viacheslav Kuzmin,1 Dmitry Lyakh,6 Danylo Lykov,6 Salvatore
Mandr`a,7, 8, 9 Christopher Mansell,1 Alexey Melnikov,1 Artem Melnikov,1 Vladimir Mironov,1 Dmitry Morozov,1, 10
Florian Neukart,1 Alberto Nocera,11 Michael A. Perlin,3 Michael Perelshtein,1 Matthew Steinberg,3 Ruslan
Shaydulin,3 Benjamin Villalonga,7 Markus Pflitsch,1 Marco Pistoia,3 Valerii Vinokur,1 and Yuri Alexeev6, ‡
1Terra Quantum AG, Kornhausstrasse 25, St. Gallen, 9000, Switzerland
2Institut Quantique & D´epartement de Physique,
Universit´e de Sherbrooke, Sherbrooke, QC J1K 2R1, Canada
3Global Technology Applied Research, JPMorganChase, New York, NY 10001, USA
4Division of Chemistry and Chemical Engineering,
California Institute of Technology, Pasadena, CA 91125, USA
5Quantinuum, Broomfield, CO 80021, USA
6NVIDIA Corporation, 2788 San Tomas Expressway, Santa Clara, CA 95051, USA
7Google Quantum AI, Venice, CA 90291, USA
8Quantum Artificial Intelligence Laboratory, NASA Ames Research Center, Moffett Field, CA 94035, USA
9KBR Inc., Houston, TX 77002, USA
10Nanoscience Center and Department of Chemistry,
University of Jyv¨askyl¨a, Jyv¨askyl¨a, 40014, Finland
11Department of Physics and Astronomy and Quantum Matter Institute,
The University of British Columbia, Vancouver, BC V6T 1Z4, Canada
In the rapidly evolving field of quantum computing, tensor networks serve as an important tool
due to their multifaceted utility. In this paper, we review the diverse applications of tensor networks
and show that they are an important instrument for quantum computing. Specifically, we summarize
the application of tensor networks in various domains of quantum computing, including simulation
of quantum computation, quantum circuit synthesis, quantum error correction and mitigation, and
quantum machine learning. Finally, we provide an outlook on the opportunities and the challenges
of the tensor-network techniques.
CONTENTS
I. Introduction
1
II. Tensor-network methods
2
A. Common ansatzes
3
B. Manipulation of TNs
4
1. Update
5
2. Contraction
5
III. Simulation of quantum computation
5
A. Gate-based quantum computation
6
B. Analog evolution
6
C. Boson sampling
7
IV. Quantum circuit synthesis
7
A. Promoting TNs to quantum gates
7
B. Examples of a TN state and operator
preparation
8
C. Implementation techniques
8
V. Quantum error correction and mitigation
8
A. Tensor-network codes
9
∗Equal contribution; albe@terraquantum.swiss
† Equal contribution; minzhao.liu@jpmchase.com
‡ yalexeev@nvidia.com
B. Syndrome decoding
10
C. Quantum error mitigation
10
VI. Tensor networks for quantum machine learning 11
VII. Discussion and Outlook
11
Acknowledgments
12
Author contributions
12
References
12
Disclaimer
19
I.
INTRODUCTION
Tensor networks (TNs) have become a useful tool in
many areas of physical and mathematical sciences, espe-
cially in the field of quantum information science. The
interest in quantum computing (QC) has driven a lot of
the development in TNs because they are used to repre-
sent and manipulate quantum states and processes.
TNs were initially applied to quantum many-body sim-
ulations [1], for which they offer substantial advantages
over alternative methods for simulating weakly coupled
quantum systems and quantum systems with significant
arXiv:2503.08626v3  [quant-ph]  11 May 2025

---
*Page 2*

2
Field
Methods
Applications
Advantages
Challenges
Simulation
of
quantum computa-
tion (Section III)
Unstructured TNs, matrix
product
states
(MPS),
projected
entangled
pair
states (PEPS), tree tensor
network
states
(TTNS),
multi-scale
entanglement
renormalization
ansatz
(MERA),
density
matrix
renormalization
group
(DMRG),
various
renor-
malization methods
Simulation of quantum cir-
cuits, analog quantum pro-
cessors,
boson
sampling,
quantum algorithm bench-
marking, quantum many-
body physics simulation
Simulation complexity reduc-
tion, efficiency in representa-
tion of some quantum states
Representing
highly-
entangled quantum states,
simulating
long-time
dy-
namics,
simulating
deep
quantum circuits
Quantum
circuit
synthesis
(QCS)
(Section IV)
Encoding
of
TN
quan-
tum states into quantum
circuits,
realizing
TN-
inspired quantum circuits
Preparation
of
quantum
states relevant for quantum
computation and quantum
simulation
Efficiency and interpretability
in quantum state preparation
Requirement
of
many-
qubit gates whose number
normally scales with the
bond dimension
Quantum error cor-
rection (QEC) and
mitigation (QEM)
(Section V)
Tensor-network
decoders,
TN
inspired
quantum
error-correcting codes
Tensor-network
decoders
of error-correcting codes
Efficiency and
interpretability
in decoding, interpretability in
creating and studying error-
correcting codes, reduction in
error mitigation overhead
Computational
resources
overhead,
speed,
lack of
open-source software
Quantum machine
learning
(QML)
(Section VI)
Variational tensor-network
circuits as quantum neural
networks (QNNs)
Generative
and
discrimi-
native
models,
quantum
data classification,
quan-
tum data encoding
Analytical
interpretability,
qubit
efficiency,
noise
re-
silience,
absence
of
barren
plateaus,
potential reduction
in parameters number, avoid-
ing costly TN contraction on
classical computer
Requirement for nonlocal
interactions
in
quantum
hardware for many TN cir-
cuits,
lack of theoretical
guarantees for advantage
TABLE I. Summary of tensor network applications in quantum computing.
locality [2]. Over time, TNs have broadened their appli-
cation scope to quantum information theory and quan-
tum chemistry [2–4], and they have become indispens-
able to the QC field. In particular, TNs are employed to
simulate real quantum experiments that were previously
believed to be beyond the capability of classical comput-
ers [5–8]. This demonstrates that TNs successfully ad-
dress the so-called curse of dimensionality—the problem
that the size of the state space increases exponentially
with the number of degrees of freedom.
Additionally, TNs provide a general framework of an-
alyzing mathematical objects frequently encountered in
quantum information science, which makes them attrac-
tive tools to address many other challenges faced by QC.
Table I provides an overview of TN applications in QC
that we will discuss in this paper and spans four sub-
domains: simulation of quantum computation, quantum
circuit synthesis (QCS), quantum error correction (QEC)
and mitigation (QEM), and quantum machine learning
(QML). The Table I outlines the specific methods used,
their primary applications, key advantages, and the chal-
lenges they encounter.
We structure the rest of the paper as follows. Section II
briefly introduces tensor networks, key building blocks,
and commonly used methods. Sections III, IV, V and
VI discuss the aforementioned domains of application.
Finally, we conclude the paper with discussions on the
overall advantages of tensor networks, and provide an
outlook of the future on how tensor networks may benefit
quantum computing in Section VII.
II.
TENSOR-NETWORK METHODS
Tensors are mathematical objects that describe multi-
linear relationships between other objects. They can be
commonly thought of as multidimensional arrays of com-
plex numbers, where the numerical values of the arrays
are coefficients describing the relationships. Each index
of a tensor indicates mapping to or from an object, and
describing the relationship between m objects requires
m indices, resulting in a so-called m-th order tensor. For
example, a vector (x1, . . . , xn) can be compactly repre-
sented in index notation as xi with i ∈(1, . . . , n), and
is a first-order tensor. A matrix is thus a second-order
tensor xi,j with two indices, among other examples.
One can compose the multilinear relationships through
tensor contraction. For example, if a tensor ai,j describes
the relationship between the objects corresponding to the
i, j indices, and a tensor bj,k for those corresponding to
the j, k indices, then the resulting tensor describes the
relationship between objects corresponding to the i, k in-
dices. This can be described as
ci,k =
X
j
ai,jbj,k,
(1)
where the j index runs over all possible values. We call
this contraction of tensors a, b at the j index. Matrix


---
*Page 3*

3
x
i
t
i
l
k
j
i
=
c
i a
j b
k
k
i
=
d
j
a
b
c
k
i
l
(a)
(b)
(c)
(d)
M
U
Σ
(e)
V*
=
k
V*
i
i
j
j
=
(f)
V
FIG. 1. Graphical representations of (a) a vector, (b) a 4th order tensor, (c) matrix multiplication, (d) Equation (2), (e) SVD
of a tensor, and (f) the definition of isometry.
multiplication is thus a particular case of contraction be-
tween two 2nd-order tensors at one shared index. In gen-
eral, we could have arbitrary contraction between tensors
such as
di =
X
j,k,l
ai,j,kbk,lcj,l.
(2)
In this example, a 1st-order tensor d is obtained by con-
tracting a 3rd-order tensor a with two 2nd-order tensors
b and c.
Tensors and operations upon them are often repre-
sented using visual diagrams. An m-th order tensor is
represented as a node with m edges emerging from the
node, each representing an index. Sometimes, the shape
and direction of an edge may denote specific properties
of the tensor or its indices.
Contraction between two tensors at index j is rep-
resented by joining two nodes at the shared edge cor-
responding to index j.
Figure 1 provides examples of
graphical representations. Since representations of com-
plex contractions between multiple tensors are a network
of connected nodes like in Figure 1(d), such mathemati-
cal expressions are referred to as Tensor Networks.
Besides composing tensors through contraction, one
can also decompose them. This can be done using, for
example, the singular value decomposition (SVD). For
any matrix M, the SVD yields
M = UΣV †,
(3)
where Σ is a diagonal matrix of the singular values and
could be absorbed into U or V , and U, V are isometries
(U †U = I, V †V = I). This decomposition presents an
opportunity for approximate representation of the orig-
inal tensor by trimming the singular values, either by
keeping only the k largest singular values or discarding
singular values smaller than some threshold.
Further-
more, the Eckart–Young theorem [9] states that for ap-
proximations with a fixed rank, the solution provided by
SVD is optimal. There exist other matrix decompositions
which we do not discuss for the sake of brevity [10].
Graphically, the SVD decomposition is shown in Fig-
ure 1(e).
There, isometries are represented as orangle
nodes with directional bonds shown in Figure 1(f). For
isometries U, although U †U = I, but UU † ̸= I unless U
is also unitary. Therefore, the arrow notation is used to
differentiate the indices of the isometry. Unitaries, being
a special case of isometries, are represented as magenta
nodes with directional bonds as shown in Figure 2.
A.
Common ansatzes
The matrix product state (MPS) is the simplest yet
the most widely used ansatz (in this context, this term
refers to the structure as well as constraints on the TN’s
tensors). In general, the amplitudes of an N-body quan-
tum wavefunction form an Nth-order tensor, the MPS
provides an approximate representation of this tensor as
ci1,...,iN =
χ
X
α1,...,αN=1
Γ[1]i1
α1 Γ[2]i2
α1α2 . . . Γ[N]iN
αN−1,
(4)
which is a contraction of the Γi tensors, each correspond-
ing to a site in the system as shown in Fig. 2 (a). Here,
χ is the parameter called the bond dimension which con-
trols the accuracy of compression.
Closely related to
MPS is the matrix product operator (MPO) concept,
which uses a very similar representation for many-body
operators instead of vectors (which is the case for the
MPS). This is accomplished by adding an additional dual
index to each Γi tensor.
This TN is especially effective for simulating one-
dimensional (1D) quantum systems. It follows the area
law of entanglement [11] (the entanglement between two
parts of a many-body systems growing at most as the
size of the boundary), but has been used for other sys-
tems as well [7, 12]. Its contraction cost is polynomial in
the system size, meaning the physical observables can be
evaluated efficiently. This is because local physical ob-
servables can be expressed as a tensor network and can
be evaluated by contracting it. The concept of MPS has
independently emerged in computational mathematics,
where it is called the tensor train [13].


---
*Page 4*

4
(a)
(b)
(d)
(c)
(e)
FIG. 2. Different types of TNs: (a) the matrix product state, (b, c) the projected entangled pair states in 2D and 3D, (d) the
tree tensor network state, and (d) the multiscale entanglement renormalization ansatz. The orange circles represent isometric
tensors and the magenta circles represent unitary disentanglers.
Projected entangled pair states (PEPS), shown in
Fig. 2 (b) and Fig. 2 (c), aim at generalizing the 1D lo-
cality of the MPS to higher dimensions, making them ca-
pable of reproducing large entanglement and suitable for
simulating high dimensional quantum systems. However,
algorithms for PEPS are typically much more computa-
tionally demanding [3, 14].
Tree Tensor Networks States (TTNS)[15, 16], shown
in Fig. 2 (d) generalize the MPS from local to nonlocal
correlations. MPS can be understood as the special case
of a TTNS with a maximally unbalanced tree topology.
Balanced tree topologies provide a worst-case correlation
length that is logarithmic in the number of leaves and
thereby allow to capture long-range interactions.
The
scaling of TTNS is comparable to that of MPS[16], how-
ever, the rank required for accuratly describing the state
might scale rapidly. TTNS have been independently de-
veloped in the chemical physics community under the
name multilayer multiconfigurational Hartree[17].
The multiscale entanglement renormalizaton ansatz
(MERA), shown in Fig. 2 (e), is designed to capture the
entanglement structure of quantum systems across differ-
ent length scales and can reproduce logarithmic violation
of the area law.
The above TNs can also be equipped with the periodic
boundary conditions. Furthermore, they can be gener-
alized for providing the description of operators such as
Hamiltonians and quantum channels. One can even de-
fine TNs with arbitrary geometries for special applica-
tions.
For example, the quantum state of a quantum
circuit with single- and two-qubit gates can be repre-
sented by a network reflecting the connectivity [18]. Con-
sequently, the circuits with gates laid out in a fixed ge-
ometric pattern (e.g., a 2D grid) may be easier to simu-
late [8, 18, 19].
B.
Manipulation of TNs
While TNs can be used to represent a broad range
of mathematical objects in quantum information science,
their popularity stems primarily from their power as a
tool for obtaining meaningful, interpretable quantities
such as operator expectation values, reduced density ma-
trices, amplitudes, samples, and more. Due to the high
interest in the TN techniques, a plethora of software li-
braries suitable for different types of TN manipulations
are available, such as cuQuantum [20], quimb [21], ITen-
sor [22], and many more [23–38].


---
*Page 5*

5
1.
Update
One of the important tasks is optimizing a TN with
respect to a cost function, such as the energy of a quan-
tum state. A pioneering approach to this problem was
introduced by Steven White in 1992 in which the density
matrix renormalization group (DMRG) [39] is used. For
a cost function defined by a Hamiltonian on a lattice,
DMRG is a variational optimization technique that finds
the best MPS approximation of the many-body wave-
function of the ground state. This algorithm performs
global optimization by sequentially optimizing each local
tensor (or pairs of them, depending on the particular ver-
sion of the algorithm), which is repeated across several
sweeps.
In addition to the DMRG algorithm, gradient-based
optimization methods can also be employed if the gradi-
ent of the objective function (e.g., energy) is accessible,
for instance, through automatic differentiation [40, 41].
Additionally, Riemannian optimization [42, 43] can be
particularly helpful when one needs to maintain the iso-
metric properties of the TN [44, 45].
Another class of methods relies on Monte Carlo sam-
pling.
In the variational Monte Carlo (VMC) ap-
proach, observables are evaluated by sampling configu-
rations of the many body system instead of exact calcu-
lations [46, 47].
One may also consider the time evolution of a quantum
state or an operator in the TN representation. For dis-
crete time steps, this can be done by applying local gates
or Kraus operators through contraction, and restore the
original form of the TN with SVD. These approaches
are called time-evolving block decimation (TEBD). Con-
tinuous time evolution under a Hamiltonian can be ap-
proximated by discrete steps and the discrete method
can be applied if the Hamiltonian is sufficiently short
ranged.
For long-range Hamiltonians, TEBD becomes
inefficient, and methods such as MPO W II, TDVP, and
Krylov approaches are preferred; see [48] for a recent re-
view. Krylov methods use Lanczos diagonalization (an
approximate method) to compute the action of the time
evolution operator, while TDVP evolves the state directly
on the MPS manifold for fixed bond dimension [49–52].
2.
Contraction
A crucial part of many TN algorithms is the contrac-
tion – the evaluation of a single scalar or tensor repre-
sented by the network. Naively, the cost of the contrac-
tion scales exponentially in the number of indices.
In
practice, the contraction can be performed by using a
sequence of intermediate tensors using pairwise contrac-
tions, known as an ordering or a contraction tree. The
optimal contraction cost of this approach still generally
scales exponentially [18], but the approach nonetheless
offers a dramatic reduction in the cost at the expense of
some intermediate memory. Notably, certain tree- and
fractal-like geometries can be contracted with only poly-
nomial cost [53].
Finding the optimal contraction scheme is itself an NP-
complete problem [54, 55]. However, much progress has
recently been made using heuristic approaches targeting
the total cost of the contraction operation. Specifically,
these methods have been based on recursive graph parti-
tioning [23, 56, 57], simulated annealing [58, 59] and now
reinforcement learning [60, 61]. The extraordinary sensi-
tivity of the cost to the contraction tree quality has led
to improvements by many orders of magnitude for some
problems such as, for example, quantum circuit simula-
tion [23, 62, 63].
For exact simulation of quantum circuits, two addi-
tional techniques are central to achieving a state-of-the-
art performance.
First, whilst the time cost of a con-
traction might be acceptable, the space cost in terms
of intermediate memory might still be enormous. Slicing
(also known as cutting or projecting) splits a contrac-
tion into many smaller independent contractions [64–68],
each of which for example can fit on a GPU and be per-
formed in a massively parallel way [58, 69]. Depending
on the geometry, this can sometimes be performed with
very little overhead. Secondly, if one wants to evaluate
many related tensor networks differing only in some en-
tries (for example, a set of amplitudes of different output
basis states of a single quantum circuit), one can em-
ploy multi-contraction [5, 62] to cleverly avoid repeating
the same computation. The largest exact simulations of
quantum circuits use both of these techniques in tan-
dem [5, 70–72].
To go beyond exactly treatable network sizes, one must
use approximate contraction. While even this is not ex-
pected to be viable in the general case [73], evidence ob-
tained from simulating many-body physics systems shows
that many real world tensor networks are tractable ap-
proximately [74–79].
Time evolved MPS [52, 80] and
PEPS [8, 81–84] can be thought of as approximate con-
traction, in which case one is limited by buildup of
entanglement.
These methods have historically been
handcrafted, but recent work has focused on automatic
approximation [4, 85, 86] and contraction sequence-
optimized [87] approximate contraction. An outstanding
question is in which classes of quantum circuits do such
techniques admit a polynomial or exponential cost reduc-
tion [88].
III.
SIMULATION OF QUANTUM
COMPUTATION
Many quantum objects—statevectors, operators, chan-
nels, and others—can be represented as tensors. Given
that quantities of interest often derive from these objects,
TNs are often useful for simulating quantum systems.


---
*Page 6*

6
A.
Gate-based quantum computation
TNs can be used for simulating quantum algorithms
in the gate-based model. One of the approaches includes
evolving an ansatz, such as an MPS or PEPS, using
TEBD-like techniques. Alternatively, a quantum state
can be represented as a TN of contracted circuit gates
with fixed input indices and open output indices.
By
contracting appropriate TNs constructed from the state
network, amplitudes and expectation values can be com-
puted. Another example is the evaluation of the trace
of quantum circuits, which enables the estimation of the
circuit ensemble randomness [89].
A good example is the simulation of quantum circuits
used to simulate many-body physics, such as the experi-
ment on the dynamics of a kicked Ising model [90]. While
the problem was considered initially intractable using
state-vector MPS and isometric-TN [91] approaches, it
was later demonstrated that many other TN methods
[41, 92–95] can solve the same problem more efficiently,
and can even produce more accurate results than the
quantum processor itself.
Another important class of experiments suitable for
TN techniques is random circuit sampling (RCS). RCS
is a computational task where a quantum computer exe-
cutes a random n-qubit quantum circuit and output the
measurement results (a length-n bitstring) of the result-
ing quantum state. This task is classically hard because
the existence of an efficient classical algorithm for esti-
mating the probability of a given output would lead to
the collapse of the polynomial hierarchy [96, 97], which
theoretical computer scientists believe to be highly un-
likely. As a result, RCS has been experimentally demon-
strated many times as a proof of quantum computational
advantage [19, 59, 98–100].
Additionally, applications
based on RCS in which classical simulation using TNs
constitute an integral part have been proposed [101–104].
The leading approach for simulating RCS with the low-
est computational cost and the highest fidelity is con-
tracting the TN representing the quantum circuit as a
network of contracted tensors that correspond to the ap-
plied gates [18]. Contracting a fraction of slices effectively
performs a finite fidelity simulation [58]. Approximation
and simplification of the original TN could also be imple-
mented alongside slicing, which reduces the fidelity [70].
Additionally, conventional RCS experiments usually
request millions of samples from a single circuit. One can
reduce the cost by leaving some indices open [5, 105, 106],
using a sparse output state [70], or reuse intermediate re-
sults [5, 58, 62]. One can also perform some post process-
ing on the samples to spoof the quality metric [72].
Another commonly analyzed approach is the MPS
based on DMRG [107].
This approach also breaks the
TN corresponding to a sample amplitude into three parts:
the beginning of the circuit with fixed input indices, the
middle, and the end with fixed output indices. The first
and third parts can be represented using an MPS, and
the amplitude can be obtained by contracting the two
MPSs with the middle part in between. Noteworthy, this
method has been recently used to prove quantum utility
in simulating the quantum Ising model’s dynamics [108].
Finally, prior to the development of the aforemen-
tioned methods, other TN techniques such as MPO [109],
MPDO [110], PEPS [111], conversion of 3D to 2D net-
works [67] and TTNS [112, 113] were utilized to simu-
late gate-based quantum computations. Overall, while
the earlier RCS experiments [98–100] can now be simu-
lated, the more recent experiments with better fidelity
and larger circuit volume still remain hard [19, 59, 114].
B.
Analog evolution
Analog quantum computers are devices where a spe-
cific class of models is implemented “natively” on the
quantum hardware. These systems include optical lat-
tices of neutral atoms [115], trapped ions [116], Rydberg
tweezers [117], photonic waveguides [118], as well as su-
perconducting circuits [119].
Contrary to digital quan-
tum processors, analog quantum devices allow the simul-
taneous, time-dependent continuous control of pairwise
interactions of all the qubits available on the quantum
chip. The major drawbacks of analog quantum simula-
tors are the calibration errors of Hamiltonian parame-
ters and decoherence. One also needs to make sure that
the quantum processor is faithfully behaving according to
closed-system Schr¨odinger time-evolution for the largest
number of qubits possible.
TNs provide an invaluable
benchmarking tool in this regard.
In adiabatic quantum annealing [120] (AQA), the
lowest-energy state of a complex Hamiltonian is sought
by starting from a simple and well-defined initial low-
energy state of a well-controlled Hamiltonian. Then the
parameters of the established Hamiltonian are changed
very slowly to arrive at the more complex Hamiltonian.
In a coherent QA, the annealing process is performed
faster, i.e., on the time scale well less than the expected
qubit decoherence time.
Therefore, rather than seek-
ing for optimization of the final complex Hamiltonian,
one simulates the dynamics of a closed quantum sys-
tem swept through a quantum critical point. In partic-
ular, Ref. [121] claimed that in the studied the paramet-
ric range, the approximate classical TN methods such as
MPS and PEPS cannot match the solution quality of the
quantum simulator in solving the Schr¨odinger dynam-
ics for a transverse field Ising spin glass system in 3D
and biclique (all-to-all) lattice geometries, despite the
limited correlation length and finite experimental pre-
cision. Time evolution of the MPS was performed us-
ing the GPU accelerated TDVP on snake-like unfolded
2D, 3D, and biclique lattices (which was found superior
against other methods, such as TEBD as well as local
and global Krylov methods [48]) performed on Summit
and Frontier ORNL supercomputers. In this study, the
MPS methods played a crucial role via the estimation of
an equivalent “QPU bond dimension” [122], defined by


---
*Page 7*

7
matching the sampled QPU distribution quality against
converged MPS simulations at simulatable scales.
A recent simulation technique was able to achieve com-
parable accuracies to the quantum annealer [123] for two-
and three-dimensional systems. It used belief propaga-
tion for time evolution, and more sophisticated variants
of belief propagation for calculating expectation values.
However, no such simulation was performed for the infi-
nite dimensional biclique lattice studied by the quantum
annealer [124].
C.
Boson sampling
Boson sampling [125] is a computational model based
on linear optical elements, non-linear input, and mea-
surements. This model of computation is non-universal,
but it is, nonetheless, hard to simulate classically under
plausible complexity theoretic assumptions. Similar to
RCS, boson sampling is a computational task of produc-
ing samples from a probability distribution correspond-
ing to measurements of the outputs of a linear-optical
interferometer.
Since the transmission matrices (matrices describ-
ing the relationship between input and output optical
modes) of boson sampling experiments are approximately
Haar-random [126–129], using an MPS approach is de-
spite the high dimensionality of the optical interferome-
ter [130, 131]. Additionally, for simulations without pho-
ton loss, photon number conservation can be exploited
to reduce the cost of the MPS [130, 131].
In reality, various experimental noises, especially pho-
ton loss, scale with the system size, and the complexity-
theoretic argument is not applicable in this case. There-
fore, directly approximating the mixed state in the Fock
basis using an MPO can be efficient. In this approach,
if we have N input photons and Nout ∝N γ output pho-
tons (where γ is the scaling exponent), the MPO entan-
glement entropy (MPO EE, which roughly characterizes
the simulation hardness) grows as S = O(N 2γ−1 log N),
which indicates a logarithmic growth of the MPO EE
when Nout ∝
√
N [131, 132].
Further, for Guassian boson sampling [133], the lossy
output states can be modeled by applying random classi-
cal operations on a pure state [7, 134], allowing the state
to be simulated with an MPS. Further, one can optimize
this pure state to have significantly fewer photons com-
pared to the original state [7]. The bond dimension grows
logarithmically when Nout ∝
√
N, and this theoretically
guarantees polynomial growth of the bond dimension to
fixed fidelity. This enabled the largest boson sampling ex-
periments to be simulated on up to 288 GPUs in under
two hours [7], meaning that no boson sampling exper-
iments demonstrate clear evidence for beyond classical
hardness.
Additionally, one can simulate boson sampling in the
Heisenberg picture in a way similar to the simulation
of quantum circuits.
Instead of evolving the quantum
state using a TN, this approach evolves the Fock state
projector of the desired measurement outcome [135]. For
Gaussian boson sampling, the Schr¨odinger picture ap-
proach evolves a Gaussian state (an infinite superposi-
tion of Fock states), which usually has a larger bond di-
mension, whereas the Heisenberg picture evolves a Fock
state.
IV.
QUANTUM CIRCUIT SYNTHESIS
Quantum circuit synthesis is the process of decom-
posing a target quantum operation into a sequence of
executable gate operations that are compatible with a
specific quantum computing architecture [136].
When
considering modern quantum processors, the problem of
quantum circuit synthesis faces two challenges: (1) the
decomposition algorithms must adhere to the native con-
nectivity of the quantum device and (2) the circuit depth
allowed to faithfully prepare a quantum operation is lim-
ited by the characteristic noise in the quantum device.
A universal solution of these problems, either in terms
of scalability or precision, remains, at the present stage,
out of reach.
TNs offer a promising general pathway for addressing
these challenges [137].
TN architectures, such as MPS
and PEPS, feature an inherently geometrical layout pro-
vided by the prescribed decomposition/representation of
general tensor formats. It turns out that for circuit de-
scriptions, which inherently are TNs, such layouts are
particularly attractive due to the ease in attaining con-
nectivity within adjacent sets of qubits. Although this
feature is exploited in studying long/short range interac-
tions in condensed matter systems, it naturally provides
a partial solution to the problem of circuit synthesis in
terms of realizing native hardware connectivity. By rep-
resenting quantum states and operations as TNs and fur-
ther casting them as circuits, one can simplify both cir-
cuit design as well as address the problem of compiling
arbitrary unitaries into natively realizable gates.
This
can reduce the complexity of quantum circuits and en-
able more efficient synthesis.
A.
Promoting TNs to quantum gates
Quantum states and channels, represented as TNs
can be mapped to quantum circuits.
The process of
promoting TNs to quantum gates requires four steps:
(i) transforming the original TN into a TN of isometric
tensors; (ii) embedding spatial and temporal directions to
the network; (iii) promoting each isometric tensor into a
unitary; and (iv) decomposing each unitary as quantum
gates.
Quantum
operations
comprise
unitary
operations
across multiple qubits. In order to map a TN to a quan-
tum circuit, each tensor in the network is mapped to a
unitary tensor. An intermediate step in this approach is


---
*Page 8*

8
to convert every tensor in the network into an isomet-
ric tensor. Ensuring that each tensor is an isometry is
possible due to the gauge freedom in TNs [92, 138]. Ad-
ditionally, quantum circuits are inherently directional in
time, whereas TNs have no directionality. Therefore, we
are free to translate and rotate each tensor in the dia-
gram. In order to turn TN diagrams into QC diagrams,
we need to place an arrow of time onto the TN diagram,
and specify incoming and outgoing wires.
Once a TN
comprises only isometric tensors, we promote the indi-
vidual tensors into unitaries. This procedure is depicted
in Fig. 3(a).
B.
Examples of a TN state and operator
preparation
Using the introduced prescription, we provide exam-
ples of important TN architectures in the literature, and
demonstrate how they can be mapped to quantum cir-
cuits.
Figure 3 depicts how one converts an MPS into a quan-
tum circuit using the steps from the above subsection.
The key element in this procedure is that an MPS can
be exactly transformed into a canonical form, including
only isometric tensors, which is a unique feature of an
MPS—this is not the case for the higher-dimensional TNs
like PEPS. Preparing an MPS as a quantum circuit was
first introduced in [139], and has since been theoretically
explored by many others [140–144]. An experimental re-
alization of an MPS has been extensively explored across
various quantum computer architectures [145–148].
Although such methods are accurate, an exact MPS
preparation requires unitary operations acting immedi-
ately on the (⌊log(m)⌋+ 1) qubits, where m is an MPS
bond dimension. This may be undesirable for modern
quantum computers, given their limited connectivity and
the restricted set of native hardware gates.
One ap-
proach to address this issue is to variationally fit a net-
work of local circuits composed of native gates in or-
der to approximate the original unitary tensor network.
Alternatively, iterative methods can be used to remove
short-range entanglement through native-gate disentan-
glers [141, 144, 146, 149].
The PEPS, however, generally lack a canonical exact
isometric form due to the higher connectivity inherent in
their underlying structure. In other words, one cannot
exactly map a PEPS onto a quantum circuit without an
exponential amount of postselection. However, one can
create a subclass of PEPS, referred to as isoPEPS, to es-
tablish a proper connection to quantum circuits. In the
isoPEPS class, each tensor, or set of tensors, respects the
isometric condition, making it equivalent to a quantum
circuit [91, 150, 151]. The question of understanding the
variational power of isoPEPS and the way how it is com-
pared to PEPS and to 2dMERA and how they can be
realized experimentally on a digital quantum computer
is now an active area of research.
Among all tensor network methods for classical sim-
ulation of quantum systems, the MERA stands out as
the most natural representation of a quantum circuit:
it was originally envisioned in the reverse direction of
a quantum circuit in which all isometries are embed-
ded in unitaries. It features an intrinsic robustness to
noise and does not suffer from barren plateaus [152–154].
The MERA has recently been demonstrated on the ion-
trapped digital quantum computer to probe the critical-
ity of many-body systems [155–157][158].
C.
Implementation techniques
As mentioned in Sec. 4.1, TNs lack the inherent direc-
tionality compared to real quantum circuits. Because of
this, we must choose how tensors are executed in time,
which then is related to the quantum circuit architecture.
This freedom allows TN states to be prepared holographi-
cally. Introduced first in [145], a holographic preparation
of a TN state takes a spatial dimension of the physical
state and prepares it sequentially in time, with the im-
portant feature that once a circuit is done preparing one
site, the qubit can be reused to prepare the next site.
In addition to the holographic implementation tech-
niques where each site is sequentially prepared after the
next site, adaptive circuits have recently been explored
to prepare TN states [159–165].
Adaptive circuits are
quantum circuits that allow mid-circuit measurements
followed by gate operations that are determined by those
measurements. While pure unitary circuits require a cir-
cuit depth scaling with system size to prepare states with
long-range correlations, adaptive circuits can prepare cer-
tain states in constant-depth.
Beyond the exact implementations of mapping a TN
to a quantum circuit described above, various variational
methods are employed to prepare an approximate TN
state [166–168][169, 170]. The basic idea is to numerically
optimize a variational ansatz to approximate the target
state, typically resulting in a shallower quantum circuit.
In addition to preparing a TN state, the work [171] used
variational methods to instantiate a generic quantum cir-
cuit where the TN formulation is leveraged as an efficient
back-end in the compilation workflows.
V.
QUANTUM ERROR CORRECTION AND
MITIGATION
Quantum error correction (QEC) plays a critical role in
safeguarding quantum information from errors caused by
decoherence, dissipation, and control inaccuracies [136,
172]. In this section, we discuss two main topics: (i) the
parallels between quantum error-correcting codes and
TNs, along with (ii) the application of TNs in decod-
ing, including the formal reduction of optimal decoding
to a TN contraction [173].


---
*Page 9*

9
m1
m2
d
m1
m2
d
q
p
UA
A
d1
d2
d1
d2
q
p
V
=
=
d
q
p
d
q
p
m1
m2
d
q
p
d
q
p
m3
m4
d
q
p
circuit execution time
=
(a)
(b)
(c)
UV
FIG. 3. (a) Promoting an isometric d1 × d2 matrix V into a unitary gate UV , with an incoming p-dimensional ancilla qudit and
an outgoing q-dimensional qudit that is measured. The dimensions of p and q are p = lcm(d1, d2)/d1 and q = lcm(d1, d2)/d2,
where lcm denotes the least common multiple operation. (b) Same as (a), but the isometry is taken from an MPS tensor. (c)
Converting a (canonized) MPS into a quantum circuit by promoting isometric tensors into unitaries. Each individual unitary
is then decomposed into one and two-qubit gates by encoding the qudit wires to qubit wires followed by methods such as
Gray codes to decompose arbitrary unitary matrices into two-level unitaries. The arrows in the figure represent the isometric
conditions of the tensors, as defined in the convention in Figure 1, and do not indicate circuit time.
A.
Tensor-network codes
The first major intersection between TNs and QEC
was the establishment of a formal correspondence be-
tween certain QEC codes and the associated TNs [173].
Convolutional codes, concatenated block codes, and
topological codes, for example, can be respectively rep-
resented by the MPS, tree TNs, and PEPS. This insight
allows for importing well-established tools of TNs to rep-
resent and analyze QEC codes. In particular, the prob-
lem of an optimal decoding of an QEC code (i.e.
di-
agnosing errors, see the discussion in Section V B) was
shown to be formally equivalent to contracting an as-
sociated TN [173]. For convolutional and concatenated
block codes, which have efficiently contractable TNs, this
correspondence thereby provides the efficient optimal de-
coders.
The QEC-TN correspondence was later generalized by
the introduction of TN stabilizer codes [174, 175] and
the ‘quantum LEGO’ formalism [176–178] for construct-
ing large codes out of a finite set of smaller ‘seed’ codes.
The seed codes are represented by small tensors that are
combined into a TN to represent a larger code. This con-
struction was shown to be universal in the sense that any
qudit QEC code can be represented by a TN built out
of three elementary seed tensors [176]. A further advan-
tage to constructing codes in this fashion is due to the
fact that TN codes come naturally equipped with optimal
decoders that are evaluated by contracting a TN [174].
Quantum codes generated using tensor networks gen-
eralize code concatenation, a fact that has been observed
in Refs. [176, 177]. Several examples of code construc-
tions hailing from TN structures can be seen in topologi-
cal [175] and holographic [179–181] tensor-network codes,
as well as examples of non-Abelian stabilizer [182], non-
additive topological [183], and approximate quantum
codes [184, 185]. Apart from their usefulness in studying
topologically-ordered matter or the Anti-de Sitter/ Con-
formal Field Theory (AdS/CFT) correspondence, many
of the codes proposed exhibit favorable properties for
practical QEC [178, 186, 187]. Indeed, it has been shown
that machine-learning methods can even be utilized in
order to search for QEC codes possessing desirable code
parameters, entirely within the tensor-network formalism
[188, 189].


---
*Page 10*

10
B.
Syndrome decoding
Decoding a quantum error correcting code involves
processing syndrome measurements using a given the-
oretical error model.
This process yields appropriate
correction operations and involves solving the inference
problem of finding the set of errors that occurred in the
computation with the highest likelihood based on the
syndrome information measured and on the error model
at hand. Such a decoding method is known as maximum-
likelihood decoding, and has been shown to be formally
equivalent to contracting a TN [173, 190], even in the case
of more invasive noise models, such as those employing
correlated noise [191].
The error model of a quantum error correcting code
provides two sets of information: 1) the probability of oc-
currence of the different physical errors and 2) the recog-
nition of what syndrome measurements each of these er-
rors affects and how each one affects the logical qubit(s)
encoded. Given a set of syndrome measurements, there
are exponentially many configurations of physical errors
compatible with it. This set of error configurations can
be further decomposed into several subsets, defined af-
ter their effect on the logical information encoded; these
subsets are often called cosets.
The sum of the joint
probabilities of the error configurations of each coset is
proportional to the likelihood of the coset. Optimally, a
decoder infers the maximum likelihood coset as the most
probable logical outcome of the code, given a set of syn-
drome measurements, resulting in an exponentially large
sum of probabilities computed in good approximation by
the contraction of a TN.
There are two approaches to carry out this summa-
tion. The first and most popular one consists of identi-
fying a complete set of symmetries of the coset, i.e., all
sets of errors that leave the logical information and the
syndrome measurements unchanged. In this setting, an
enumeration of all error configurations included in the
coset is achieved by finding a particular configuration in
the set and applying to it all combinations of the sym-
metries [4, 173, 190, 192, 193].
A second approach consists of building a TN directly
from the error model connectivity between errors and
syndrome detectors. In this approach all error configu-
rations outside a coset are not considered by explicitly
zeroing out tensor entries corresponding to them. This
approach has the benefit of working with more general
error models directly, without the need to find a set of
symmetries that is computationally beneficial [194–196].
One can also utilize tensor networks in order to enumer-
ate error paths that appear in the realization of fault-
tolerant syndrome extraction, albeit with significantly
reduced computational complexity in certain specialized
cases [177, 197, 198].
Both approaches to TN decoding can be success-
fully leveraged with diverse noise models, such as era-
sure [199, 200]; fractal noise [201]; depolarizing noise
[200, 202]; biased noise, and explorations of quantum
channel capacity via the hashing bound [202–207]; as
well as non-Markovian noise sources [208]. In addition to
those noise models mentioned, circuit-level noise models
[194, 209] can also be decoded, albeit approximately.
Optimized decoding algorithms benefit from the com-
putational strategies inherent in TN theory, such as the
use of approximate contraction methods for large-scale
networks, which are directly applicable to decoding large
and complex QEC codes [4, 192–196]. TN decoders are,
up to date, considered as highly accurate but not prac-
tical for real time decoding [210].
The need for fast
decoders in real quantum error correction experiments
makes the use of heuristic decoders optimized for perfor-
mance more popular and practical. This leaves TN de-
coders as useful tools for the benchmark of experiments
and other less accurate decoders.
C.
Quantum error mitigation
Error mitigation methods are expected to play a cru-
cial role in near-term quantum experiments until fault-
tolerance is fully achieved [211, 212]. One of the promis-
ing methods in this area is probabilistic error cancellation
(PEC). However, it requires precise knowledge of the un-
derlying noise model at the gate level. PEC creates an
ensemble of circuits, with a denoiser, which on average
replicates a noise-inverting channel, inserted according
to a quasi-probability distribution, effectively canceling
out the noise. A quasi-probability distribution is a prob-
abilistic framework that assigns a sign to each sample,
allowing for the representation of non-physical channels.
The number of samples (measurement overhead) required
to address sign cancellations can be effectively bounded
by Hoeffding’s inequality, growing exponentially with the
number of qubits and circuit depths. Another approach
of error mitigation is zero-noise extrapolation (ZNE).
ZNE artificially introduces noise to obtain results at dif-
ferent noise levels before extrapolating to the noiseless
case [211], and was experimentally demonstrated [90].
Despite the overhead, it is anticipated that error miti-
gation will remain practical for circuits with qubit counts
in the hundreds and equivalent circuit depth [90]. The
tensor-network error mitigation (TEM) algorithms rep-
resent a similar paradigm for reducing overhead.
As
investigated in a series of recent works [213–216], TEM
provides a universal lower cost bound for error mitiga-
tion, specifically a quadratic cost reduction.
TEM is
a post-processing procedure that acts on a set of ran-
domized local measurements, as designed to cancel er-
rors by incorporating classically noise-inverting channels.
The mitigated estimations are given by contracting the
circuit-level TN. Notably, it was experimentally demon-
strated on a 91-qubit circuit with 4095 two-qubit gates.
[217] For systems containing more than a thousand qubits
with equivalent circuit depth, we foresee the development
of hybrid approaches combining quantum error correc-
tion with error mitigation techniques [218]. It remains


---
*Page 11*

11
an open question whether error mitigation alone, or in
combination with quantum error correction, can lead to
utility in near-term quantum computation or provide a
potential practical advantage in quantum algorithms.
VI.
TENSOR NETWORKS FOR QUANTUM
MACHINE LEARNING
Over the past decade, TNs have gained significant in-
terest in machine learning (ML). By compressing high-
dimensional linear layers in neural networks, TNs re-
duce memory usage and the number of training parame-
ters [219–221]. Moreover, TNs offer strong analytical in-
terpretability and are related to various established ML
techniques [222–226]. The structural flexibility of TNs
allows the introduction of inductive biases (constraints
on the learning algorithm to restrict the space of possi-
ble models to plausible ones) into ML models based on
intrinsic data topology and correlations [221, 227–229],
ultimately enhancing training efficiency and model gen-
eralization to data unseen during training.
This syn-
ergy has paved the way for employing TNs across various
ML applications, also sometimes referred to as quantum-
inspired ML.
Although the contraction complexity of many TNs
grows polynomially with the bond dimension, the de-
gree of the polynomials is higher than three in some cases
(such as for MERA), which is often regarded as inefficient
in practical ML. Quantum computers can potentially ad-
dress this problem of TN-based ML by implementing
parameterized quantum circuit (PQC) ans¨atze reflect-
ing specific TN architectures such as MPS [230, 231],
TTN [230, 232, 233], and MERA [232, 233], resulting in
TN-based quantum ML [234] (TN-QML).
In regression and classification tasks [230], TN-QML
obtains the output of a TN neural layer by measuring
observables on the corresponding quantum state rather
than performing costly tensor contractions on classical
hardware. In turn, in generative tasks [231], TN-QML
generates data by directly sampling from the quantum
state encoding the TN, thereby avoiding expensive clas-
sical sampling that would otherwise again rely on tensor
contractions.
Moreover, in the context of quantum simulation, pa-
rameterizing TNs with quantum gates has been shown to
offer an exponential reduction in the number of parame-
ters required to achieve results similar to those of classical
TNs [146, 149], which could potentially translate to ML
tasks as well. On the other hand, such variational TN
circuits offer advantages over commonly used quantum
hardware-efficient ans¨atze, such as being free from barren
plateaus [153, 235, 236] (flat regions in the optimization
landscape that impede training). Additionally, the TN
structure yields qubit-efficient implementations [230] and
robustness against decoherence [230, 232, 237].
The TN-QML approach also inherently enables quan-
tum applications, such as quantum phase classification
directly on quantum devices using quantum convolu-
tional neural networks (QCNNs) based on the TTN and
MERA architectures [233, 238]. However, although the
QCNN was initially considered a candidate for exponen-
tial quantum advantage, recent work [239] has argued
against this, suggesting it can be dequantized using clas-
sical shadow techniques.
Additionally, TNs are promising in QML as a tool for
encoding classical data into quantum circuits [240, 241]
and for pre-training the TN-PQC on classical comput-
ers [230, 242–244] before extending to quantum ans¨atze
that cannot be simulated classically.
Finally, TN sur-
rogate modeling can be employed to test QML models
for dequantization [245]. For an in-depth review of using
TNs in the QML, we refer the reader to [234].
VII.
DISCUSSION AND OUTLOOK
TNs are a valuable tool for the field of quantum com-
puting. Moreover, they can be important for analyzing
computational complexity classes. For example, finding
a polynomial-time tensor-network algorithm for a prob-
lem [246] proves that the problem is in the complexity
class P.
Similarly, one can empirically argue that a
problem is hard by trying existing state-of-the-art TN
techniques and observing exponential scaling. Along the
same vein, TNs can help validating quantum advantage
claims of finite-size quantum experiments, which may not
admit asymptotic quantum advantage.
Here, rigorous
benchmarking of TN techniques as well as other classical
techniques allows to decide whether a quantum experi-
ment is out of reach for classical computers.
In particular, recent developments in TNs and other
classical simulation techniques have significantly im-
proved our ability to simulate quantum many-body sys-
tems [247], as well as near-Clifford circuits. These meth-
ods arise from representing TN states directly in the
Pauli basis [248]. Recent advancements in representing
TN states in both a Pauli basis as well as a computa-
tional basis have shown promising results [249], and it
remains an open and interesting question on what classes
of circuits can be classically simulated exactly or approxi-
mately. Additionally, there is potential in understanding
the quantum circuit synthesis of TN states given that
they are in the Pauli basis.
On quantum error correction, one future direction may
be utilizing the quantum LEGO formalism to write down
families of quantum low-density parity-check codes [250]
in a systematic fashion. This is an important direction
since quantum low-density parity-check codes represent
a promising avenue in quantum error correction [251].
Additionally, the first explorations of non-Abelian sta-
bilizer and non-additive codes have already been con-
structed [182, 183]; it would be interesting to see whether
or not the quantum LEGO formalism or further exten-
sions can provide insight into systematic constructions of
such codes. Moreover, highly accurate TN decoding is


---
*Page 12*

12
too slow for real-time hardware decoding [210]; as such,
it could be valuable to design heuristic algorithms that
can form approximate TN decoding well. The alterna-
tive could be using AI for decoding [252, 253], which may
benefit from noisy simulations using tensor networks for
model training.
Finally, using TNs in QML requires both further in-
vestigation into their use in classical ML and the devel-
opment of new advances in QML itself. Although recent
studies question the feasibility of achieving a practical
exponential quantum advantage with QML [254, 255], it
remains to be seen whether TN-QML can offer any poly-
nomial advantage in this context.
TNs continue to drive progress across multiple areas
of quantum computing as demonstrated throughout this
review.
As we transition towards fault-tolerant quan-
tum devices, TNs will likely maintain their significance,
particularly in potential hybrid quantum-classical devices
which are anticipated to integrate quantum computers
with specialized classical accelerators like the GPUs,
TPUs, and FPGAs.
Looking forward, we foresee that
TNs will evolve to include new algorithmic approaches,
integration with AI, and techniques to meet the demands
of fault-tolerant quantum computers. As quantum hard-
ware capabilities improve, the synergy between TNs and
quantum computing may deepen, keeping TNs an im-
portant tool for further development of future quantum
computing systems.
ACKNOWLEDGMENTS
A. B., R. E., V. K., C. M., Al. M., Ar. M., V. M., D. M.,
F. N., M. Pere., M. Pf.
and V. V. were supported by
Terra Quantum AG. A. N. was supported by Natural
Sciences and Engineering Research Council of Canada
(NSERC) Alliance Quantum Program (Grant ALLRP-
578555), and the Canada First Research Excellence
Fund, Quantum Materials and Future Technologies Pro-
gram. S. ˙M. is partially supported by the Prime Contract
No.
80ARC020D0010 with the NASA Ames Research
Center and acknowledges funding from DARPA under
IAA 8839. A. B. thanks Ilia Luchnikov, Mikhail Litvi-
nov and Stefanos Kourtis for valuable discussions. A. A.,
Z. H., A. K., M. L., M. Perl., M. Pi., M. S. and R. S. thank
their colleagues at the Global Technology Applied Re-
search center of JPMorganChase for support and helpful
discussions.
AUTHOR CONTRIBUTIONS
Yu. A., A. B., M. L. and V. V. conceptualized the work.
A. B., R. E., J. G., R. H., A. K., M. L., A. N., F. N. and
V. V. contributed to the Tensor-network methods sec-
tion. M. L., A. N., F. N. contributed to the Simulation of
quantum computation section. A. A., R. H., Z. H., A. K.,
M. L., M. Pere., V. V. contributed to the Quantum circuit
synthesis section. A. B., R. H., M. Perl., M. S., B. V. con-
tributed to the Quantum error correction and mitigation
section. A. A., V. K. contributed to the Tensor networks
for quantum machine learning section. All authors con-
tributed to the Introduction and the Discussion and out-
look sections. All authors were involved in shaping the
direction of the manuscript, as well as in its discussion,
review, and editing.
[1] U.
Schollw¨ock,
The
density-matrix
renormalization
group in the age of matrix product states, Annals of
physics 326, 96 (2011).
[2] R. Or´us, Tensor networks for complex quantum systems,
Nature Reviews Physics 1, 538 (2019).
[3] R. Or´us, A practical introduction to tensor networks:
Matrix product states and projected entangled pair
states, Annals of physics 349, 117 (2014).
[4] C. T. Chubb, General tensor network decoding of 2D
Pauli codes, arXiv preprint arXiv:2101.04125 (2021).
[5] F. Pan and P. Zhang, Simulation of quantum circuits
using the big-batch tensor network method, Physical
Review Letters 128, 030501 (2022).
[6] R. Fu, Z. Su, H.-S. Zhong, X. Zhao, J. Zhang, F. Pan,
P. Zhang, X. Zhao, M.-C. Chen, C.-Y. Lu, et al., Achiev-
ing energetic superiority through system-level quan-
tum circuit simulation, arXiv preprint arXiv:2407.00769
(2024).
[7] C. Oh, M. Liu, Y. Alexeev, B. Fefferman, and L. Jiang,
Classical algorithm for simulating experimental gaus-
sian boson sampling, Nature Physics , 1 (2024).
[8] J. Tindall,
M. Fishman,
E. M. Stoudenmire, and
D. Sels, Efficient tensor network simulation of IBM’s ea-
gle kicked ising experiment, PRX Quantum 5, 010308
(2024).
[9] C. Eckart and G. Young, The approximation of one ma-
trix by another of lower rank, Psychometrika 1, 211
(1936).
[10] G. W. Stewart, Matrix algorithms: volume 1: basic de-
compositions (SIAM, 1998).
[11] F. Verstraete and J. I. Cirac, Matrix product states
represent ground states faithfully, Physical Review
B—Condensed
Matter
and
Materials
Physics
73,
094423 (2006).
[12] M. C. Ba˜nuls, Tensor network algorithms: A route map,
Annual Review of Condensed Matter Physics 14, 173
(2023).
[13] I. V. Oseledets, Tensor-train decomposition, SIAM
Journal on Scientific Computing 33, 2295 (2011).


---
*Page 13*

13
[14] N. Schuch, M. M. Wolf, F. Verstraete, and J. I. Cirac,
Computational complexity of projected entangled pair
states, Physical review letters 98, 140506 (2007).
[15] G. Vidal, Efficient classical simulation of slightly en-
tangled quantum computations, Phys. Rev. Lett. 91,
147902 (2003).
[16] Y.-Y. Shi, L.-M. Duan, and G. Vidal, Classical simula-
tion of quantum many-body systems with a tree tensor
network, Phys. Rev. A 74, 022320 (2006).
[17] H.
Wang
and
M.
Thoss,
Multilayer
formulation
of
the
multiconfiguration
time-dependent
hartree
theory,
The
Journal
of
Chemical
Physics
119,
1289
(2003),
https://pubs.aip.org/aip/jcp/article-
pdf/119/3/1289/19007271/1289 1 online.pdf.
[18] I. L. Markov and Y. Shi, Simulating quantum computa-
tion by contracting tensor networks, SIAM Journal on
Computing 38, 963 (2008).
[19] M. DeCross, R. Haghshenas, M. Liu, Y. Alexeev, C. H.
Baldwin, J. P. Bartolotta, M. Bohn, E. Chertkov,
J. Colina, D. DelVento, et al., The computational power
of random quantum circuits in arbitrary geometries,
arXiv preprint arXiv:2406.02501 (2024).
[20] H. Bayraktar, A. Charara, D. Clark, S. Cohen, T. Costa,
Y.-L. L. Fang, Y. Gao, J. Guan, J. Gunnels, A. Haidar,
A. Hehn,
M. Hohnerbach,
M. Jones,
T. Lubowe,
D. Lyakh, S. Morino, P. Springer, S. Stanwyck, I. Ter-
entyev, S. Varadhan, J. Wong, and T. Yamaguchi,
cuQuantum SDK: A High-Performance Library for Ac-
celerating Quantum Science (2023).
[21] J. Gray, quimb: A python package for quantum infor-
mation and many-body calculations, Journal of Open
Source Software 3, 819 (2018).
[22] M. Fishman, S. White, and E. Stoudenmire, The ITen-
sor software library for tensor network calculations, Sci-
Post Physics Codebases , 004 (2022).
[23] J. Gray and S. Kourtis, Hyper-optimized tensor network
contraction, Quantum 5, 410 (2021).
[24] A. Javadi-Abhari, M. Treinish, K. Krsulich, C. J. Wood,
J. Lishman, J. Gacon, S. Martiel, P. D. Nation, L. S.
Bishop, A. W. Cross, et al., Quantum computing with
qiskit, arXiv preprint arXiv:2405.08810 (2024).
[25] G. Torlai and M. Fishman, PastaQ: A package for simu-
lation, tomography and analysis of quantum computers
(2020).
[26] J. Hauschild and F. Pollmann, Efficient numerical sim-
ulations with tensor networks: Tensor Network Python
(TeNPy), SciPost Physics Lecture Notes , 005 (2018).
[27] G. Alvarez, The density matrix renormalization group
for strongly correlated electron systems: A generic im-
plementation, Computer Physics Communications 180,
1572 (2009).
[28] M. M. Rams, G. W´ojtowicz, A. Sinha, and J. Hasik,
Yastn:
Yet another symmetric tensor networks;
a
python library for abelian symmetric tensor network
calculations, arXiv preprint arXiv:2405.12196 (2024).
[29] X.-Z. Luo, J.-G. Liu, P. Zhang, and L. Wang, Yao. jl:
Extensible, efficient framework for quantum algorithm
design, Quantum 4, 341 (2020).
[30] J. Brennan, L. O’Riordan, K. Hanley, M. Doyle, M. Al-
lalen, D. Brayford, L. Iapichino, and N. Moran, QX-
Tools: A Julia framework for distributed quantum cir-
cuit simulation, Journal of Open Source Software 7,
3711 (2022).
[31] D. Strano and B. Bollay, unitaryfund/qrack (2017–
2024).
[32] S.-X. Zhang, J. Allcock, Z.-Q. Wan, S. Liu, J. Sun,
H. Yu, X.-H. Yang, J. Qiu, Z. Ye, Y.-Q. Chen, et al.,
TensorCircuit: a Quantum Software Framework for the
NISQ Era, Quantum 7, 912 (2023).
[33] D. Lykov, A. Chen, H. Chen, K. Keipert, Z. Zhang,
T. Gibbs, and Y. Alexeev, Performance Evaluation and
Acceleration of the QTensor Quantum Circuit Simulator
on GPUs (2021).
[34] F. Zhang, C. Huang, M. Newman, J. Cai, H. Yu,
Z. Tian, B. Yuan, H. Xu, J. Wu, X. Gao, et al., Alibaba
cloud quantum development platform: Large-scale clas-
sical simulation of quantum circuits, arXiv preprint
arXiv:1907.11217 (2019).
[35] B. Villalonga, D. Lyakh, S. Boixo, H. Neven, T. S. Hum-
ble, R. Biswas, E. G. Rieffel, A. Ho, and S. Mandr`a, Es-
tablishing the quantum supremacy frontier with a 281
Pflop/s simulation, Quantum Science and Technology
5, 034003 (2020).
[36] S. Mandr`a, J. Marshall, E. G. Rieffel, and R. Biswas,
HybridQ: A Hybrid Simulator for Quantum Circuits
(2021).
[37] D. I. Lyakh, T. Nguyen, D. Claudino, E. Dumitrescu,
and A. J. McCaskey, ExaTN: Scalable GPU-Accelerated
High-Performance Processing of General Tensor Net-
works at Exascale, Frontiers in Applied Mathematics
and Statistics 8, 838601 (2022).
[38] H. Zhai et al., Block2: A comprehensive open source
framework to develop and apply state-of-the-art dmrg
algorithms in electronic structure and beyond, The
Journal of Chemical Physics 159, 234801 (2023).
[39] S. R. White, Density matrix formulation for quantum
renormalization groups, Physical review letters 69, 2863
(1992).
[40] M. Wang,
Y. Pan,
Z. Xu,
X. Yang,
G. Li, and
A. Cichocki, Tensor networks meet neural networks:
A
survey
and
future
perspectives,
arXiv
preprint
arXiv:2302.09019 (2023).
[41] H.-J. Liao, J.-G. Liu, L. Wang, and T. Xiang, Differen-
tiable programming tensor networks, Physical Review
X 9, 031041 (2019).
[42] M. Hauru, M. Van Damme, and J. Haegeman, Rieman-
nian optimization of isometric tensor networks, SciPost
Phys 10, 040 (2021).
[43] I. Luchnikov, A. Ryzhov, S. Filippov, and H. Ouerdane,
QGOpt: Riemannian optimization for quantum tech-
nologies, SciPost Physics 10, 079 (2021).
[44] A. Berezutskii, I. Luchnikov, and A. Fedorov, Simu-
lating quantum circuits using the multi-scale entangle-
ment renormalization ansatz, Physical Review Research
7, 013063 (2025).
[45] I. Luchnikov, M. Krechetov, and S. Filippov, Rieman-
nian geometry and automatic differentiation for opti-
mization problems of quantum physics and quantum
technologies, New Journal of Physics (2021).
[46] A. W. Sandvik and G. Vidal, Variational quantum
Monte Carlo simulations with tensor-network states,
Physical review letters 99, 220602 (2007).
[47] L. Wang, I. Piˇzorn, and F. Verstraete, Monte Carlo
simulation with tensor network states, Physical Re-
view B—Condensed Matter and Materials Physics 83,
134421 (2011).


---
*Page 14*

14
[48] S. Paeckel, T. K¨ohler, A. Swoboda, S. R. Manmana,
U. Schollw¨ock, and C. Hubig, Time-evolution meth-
ods for matrix-product states, Annals of Physics 411,
167998 (2019).
[49] A. E. Feiguin and S. R. White, Time-step target-
ing methods for real-time dynamics using the den-
sity matrix renormalization group, Physical Review
B—Condensed
Matter
and
Materials
Physics
72,
020404 (2005).
[50] G. Alvarez,
L. G. Dias da Silva,
E. Ponce, and
E. Dagotto, Time evolution with the density-matrix
renormalization-group algorithm: A generic implemen-
tation for strongly correlated electronic systems, Phys-
ical Review E—Statistical, Nonlinear, and Soft Matter
Physics 84, 056706 (2011).
[51] J. Haegeman, J. I. Cirac, T. J. Osborne, I. Piˇzorn,
H. Verschelde, and F. Verstraete, Time-dependent vari-
ational principle for quantum lattices, Physical review
letters 107, 070601 (2011).
[52] J. Haegeman, C. Lubich, I. Oseledets, B. Vandereycken,
and F. Verstraete, Unifying time evolution and opti-
mization with matrix product states, Physical Review
B 94, 165116 (2016).
[53] S.-J. Ran, Z.-Z. Sun, S.-M. Fei, G. Su, and M. Lewen-
stein, Tensor network compressed sensing with unsu-
pervised machine learning, Physical Review Research
2, 033293 (2020).
[54] S. Arnborg, D. G. Corneil, and A. Proskurowski, Com-
plexity of finding embeddings in ak-tree, SIAM Journal
on Algebraic Discrete Methods 8, 277 (1987).
[55] R. N. Pfeifer, J. Haegeman, and F. Verstraete, Faster
identification of optimal contraction sequences for ten-
sor networks, Physical Review E 90, 033315 (2014).
[56] S. Kourtis, C. Chamon, E. Mucciolo, and A. Ruck-
enstein, Fast counting with tensor networks, SciPost
Physics 7, 060 (2019).
[57] F. Pan and P. Zhang, Simulating the Sycamore quantum
supremacy circuits, arXiv preprint arXiv:2103.03074
(2021).
[58] G.
Kalachev,
P.
Panteleev,
P.
Zhou,
and
M.-H.
Yung, Classical sampling of random quantum circuits
with bounded fidelity, arXiv preprint arXiv:2112.15083
(2021).
[59] A. Morvan, B. Villalonga, X. Mi, S. Mandra, A. Bengts-
son, P. Klimov, Z. Chen, S. Hong, C. Erickson, I. Droz-
dov, et al., Phase transitions in random circuit sam-
pling, Nature 634, 328 (2024).
[60] E. Meirom, H. Maron, S. Mannor, and G. Chechik, Op-
timizing tensor network contraction using reinforcement
learning (2022).
[61] X.-Y. Liu and Z. Zhang, Classical simulation of quan-
tum circuits using reinforcement learning: Parallel en-
vironments and benchmark (2023).
[62] G. Kalachev, P. Panteleev, and M.-H. Yung, Multi-
tensor contraction for xeb verification of quantum cir-
cuits, arXiv preprint arXiv:2108.05665 (2021).
[63] C. Huang, F. Zhang, M. Newman, J. Cai, X. Gao,
Z. Tian, J. Wu, H. Xu, H. Yu, B. Yuan, et al., Clas-
sical simulation of quantum supremacy circuits, arXiv
preprint arXiv:2005.06787 (2020).
[64] S. Aaronson and L. Chen, Complexity-theoretic foun-
dations of quantum supremacy experiments, arXiv
preprint arXiv:1612.05903 (2016).
[65] J. Chen, F. Zhang, C. Huang, M. Newman, and Y. Shi,
Classical simulation of intermediate-size quantum cir-
cuits, arXiv preprint arXiv:1805.01450 (2018).
[66] I. L. Markov, A. Fatima, S. V. Isakov, and S. Boixo,
Quantum supremacy is both closer and farther than it
appears, arXiv preprint arXiv:1807.10749 (2018).
[67] B. Villalonga, S. Boixo, B. Nelson, C. Henze, E. Rieffel,
R. Biswas, and S. Mandr`a, A flexible high-performance
simulator for verifying and benchmarking quantum cir-
cuits implemented on real hardware, npj Quantum In-
formation 5, 86 (2019).
[68] E. Pednault, J. A. Gunnels, G. Nannicini, L. Horesh,
T. Magerlein, E. Solomonik, E. W. Draeger, E. T.
Holland, and R. Wisnieff, Pareto-efficient quantum cir-
cuit simulation using tensor contraction deferral, arXiv
preprint arXiv:1710.05867 (2017).
[69] C. Huang, F. Zhang, M. Newman, X. Ni, D. Ding,
J. Cai, X. Gao, T. Wang, F. Wu, G. Zhang, et al.,
Efficient parallelization of tensor network contraction
for simulating quantum computation, Nature Compu-
tational Science 1, 578 (2021).
[70] F. Pan, K. Chen, and P. Zhang, Solving the Sampling
Problem of the Sycamore Quantum Circuits, Physical
Review Letters 129, 090502 (2022).
[71] Y. Liu, Y. Chen, C. Guo, J. Song, X. Shi, L. Gan,
W. Wu, W. Wu, H. Fu, X. Liu, et al., Verifying Quan-
tum Advantage Experiments with Multiple Amplitude
Tensor Network Contraction, Physical Review Letters
132, 030601 (2024).
[72] X.-H. Zhao, H.-S. Zhong, F. Pan, Z.-H. Chen, R. Fu,
Z. Su, X. Xie, C. Zhao, P. Zhang, W. Ouyang, et al.,
Leapfrogging sycamore: harnessing 1432 gpus for 7×
faster quantum random circuit sampling, National Sci-
ence Review 12, nwae317 (2025).
[73] D. Roth, On the hardness of approximate reasoning,
Artificial Intelligence 82, 273 (1996).
[74] T. Nishino and K. Okunishi, Corner transfer matrix
renormalization group method, Journal of the Physical
Society of Japan 65, 891 (1996).
[75] M. Levin and C. P. Nave, Tensor renormalization group
approach to two-dimensional classical lattice models,
Physical review letters 99, 120601 (2007).
[76] Z.-Y. Xie, J. Chen, M.-P. Qin, J. W. Zhu, L.-P.
Yang, and T. Xiang, Coarse-graining renormalization by
higher-order singular value decomposition, Physical Re-
view B—Condensed Matter and Materials Physics 86,
045139 (2012).
[77] G. Evenbly and G. Vidal, Tensor network renormaliza-
tion, Physical review letters 115, 180405 (2015).
[78] J. Chen, J. Jiang, D. Hangleiter, and N. Schuch, Sign
problem in tensor network contraction, arXiv preprint
arXiv:2404.19023 (2024).
[79] J. Jiang, J. Chen, N. Schuch, and D. Hangleiter, Positive
bias makes tensor-network contraction tractable, arXiv
preprint arXiv:2410.05414 (2024).
[80] G. Vidal, Class of quantum many-body states that can
be efficiently simulated, Physical review letters 101,
110501 (2008).
[81] F. Verstraete and J. I. Cirac, Renormalization algo-
rithms for quantum-many body systems in two and
higher dimensions, arXiv preprint cond-mat/0407066
(2004).
[82] H.-C. Jiang, Z.-Y. Weng, and T. Xiang, Accurate de-
termination of tensor network state of quantum lattice


---
*Page 15*

15
models in two dimensions, Physical review letters 101,
090603 (2008).
[83] P. Corboz, J. Jordan, and G. Vidal, Simulation of
fermionic lattice models in two dimensions with pro-
jected entangled-pair states:
Next-nearest neighbor
hamiltonians, Physical Review B—Condensed Matter
and Materials Physics 82, 245119 (2010).
[84] M. Lubasch, J. I. Cirac, and M.-C. Banuls, Unifying pro-
jected entangled pair state contractions, New Journal of
Physics 16, 033014 (2014).
[85] F. Pan, P. Zhou, S. Li, and P. Zhang, Contracting arbi-
trary tensor networks: general approximate algorithm
and applications in graphical models and quantum cir-
cuit simulations, Physical Review Letters 125, 060503
(2020).
[86] L. Ma, M. Fishman, M. Stoudenmire, and E. Solomonik,
Approximate contraction of arbitrary tensor networks
with a flexible and efficient density matrix algorithm,
arXiv preprint arXiv:2406.09769 (2024).
[87] J. Gray and G. K.-L. Chan, Hyperoptimized approxi-
mate contraction of tensor networks with arbitrary ge-
ometry, Physical Review X 14, 011009 (2024).
[88] Y. Zhou, E. M. Stoudenmire, and X. Waintal, What
limits the simulation of quantum computers?, Physical
Review X 10, 041038 (2020).
[89] M. Liu, J. Liu, Y. Alexeev, and L. Jiang, Estimating
the randomness of quantum circuit ensembles up to 50
qubits, npj Quantum Information 8, 137 (2022).
[90] Y. Kim, A. Eddins, S. Anand, K. X. Wei, E. Van
Den Berg, S. Rosenblatt, H. Nayfeh, Y. Wu, M. Za-
letel, K. Temme, et al., Evidence for the utility of quan-
tum computing before fault tolerance, Nature 618, 500
(2023).
[91] M. P. Zaletel and F. Pollmann, Isometric tensor network
states in two dimensions, Physical review letters 124,
037201 (2020).
[92] J. Tindall and M. Fishman, Gauging tensor networks
with belief propagation, SciPost Physics 15, 222 (2023).
[93] S. Anand, K. Temme, A. Kandala, and M. Zale-
tel, Classical benchmarking of zero noise extrapolation
beyond the exactly-verifiable regime, arXiv preprint
arXiv:2306.17839 (2023).
[94] S. Patra, S. S. Jahromi, S. Singh, and R. Or´us, Efficient
tensor network simulation of ibm’s largest quantum pro-
cessors, Physical Review Research 6, 013326 (2024).
[95] M. S. Rudolph, E. Fontana, Z. Holmes, and L. Cincio,
Classical surrogate simulation of quantum systems with
lowesa, arXiv preprint arXiv:2308.09109 (2023).
[96] A. Bouland, B. Fefferman, Z. Landau, and Y. Liu, Noise
and the frontier of quantum supremacy (2022).
[97] H. Krovi, Average-case hardness of estimating probabil-
ities of random quantum circuits with a linear scaling
in the error exponent, arXiv preprint arXiv:2206.05642
(2022).
[98] F. Arute, K. Arya, R. Babbush, D. Bacon, J. C.
Bardin, R. Barends, R. Biswas, S. Boixo, F. G. Bran-
dao, D. A. Buell, et al., Quantum supremacy using a
programmable superconducting processor, Nature 574,
505 (2019).
[99] Y. Wu, W.-S. Bao, S. Cao, F. Chen, M.-C. Chen,
X. Chen, T.-H. Chung, H. Deng, Y. Du, D. Fan, et al.,
Strong quantum computational advantage using a su-
perconducting quantum processor, Physical review let-
ters 127, 180501 (2021).
[100] Q. Zhu, S. Cao, F. Chen, M.-C. Chen, X. Chen, T.-H.
Chung, H. Deng, Y. Du, D. Fan, M. Gong, et al., Quan-
tum computational advantage via 60-qubit 24-cycle ran-
dom circuit sampling, Science bulletin 67, 240 (2022).
[101] S. Aaronson and S.-H. Hung, Certified randomness from
quantum supremacy (2023).
[102] M. Liu et al., Certified randomness with a trapped-ion
quantum processor, Nature 640, 343–348 (2025).
[103] O. Amer, K. Chakraborty, D. Cui, F. Kaleoglu, C. Lim,
M. Liu, and M. Pistoia, Certified randomness implies
secure classical position-verification, arXiv preprint
arXiv:2410.03982 (2024).
[104] O. Amer, S. Chakrabarti, K. Chakraborty, S. Eloul,
N. Kumar, C. Lim, M. Liu, P. Niroula, Y. Satsangi,
R. Shaydulin, and M. Pistoia, Applications of certified
randomness, arXiv preprint arXiv:2503.19759 (2025).
[105] E. Pednault, J. Gunnels, D. Maslov, and J. Gam-
betta, On “quantum supremacy”, IBM Research Blog
21 (2019).
[106] R. Schutski, D. Lykov, and I. Oseledets, Adaptive algo-
rithm for quantum circuit simulation, Physical Review
A 101, 042335 (2020).
[107] T. Ayral, T. Louvet, Y. Zhou, C. Lambert, E. M.
Stoudenmire, and X. Waintal, Density-matrix renormal-
ization group algorithm for simulating quantum circuits
with a finite fidelity, PRX Quantum 4, 020304 (2023).
[108] R. Haghshenas, E. Chertkov, M. Mills, W. Kadow, S.-
H. Lin, Y.-H. Chen, C. Cade, I. Niesen, T. Beguˇsi´c,
M. S. Rudolph, et al., Digital quantum magnetism
at the frontier of classical simulations, arXiv preprint
arXiv:2503.20870 (2025).
[109] K. Noh, L. Jiang, and B. Fefferman, Efficient classical
simulation of noisy random quantum circuits in one di-
mension, Quantum 4, 318 (2020).
[110] S. Cheng, C. Cao, C. Zhang, Y. Liu, S.-Y. Hou, P. Xu,
and B. Zeng, Simulating noisy quantum circuits with
matrix product density operators, Physical review re-
search 3, 023005 (2021).
[111] C. Guo, Y. Liu, M. Xiong, S. Xue, X. Fu, A. Huang,
X. Qiang, P. Xu, J. Liu, S. Zheng, et al., General-
purpose
quantum circuit
simulator with projected
entangled-pair states and the quantum supremacy fron-
tier, Physical review letters 123, 190501 (2019).
[112] R. Ellerbrock and T. J. Martinez, A multilayer multi-
configurational approach to efficiently simulate large-
scale circuit-based quantum computers on classical ma-
chines, The Journal of Chemical Physics 153 (2020).
[113] E. Dumitrescu, Tree tensor network approach to simu-
lating shor’s algorithm, Physical Review A 96, 062322
(2017).
[114] D. Gao et al., Establishing a new benchmark in
quantum computational advantage with 105-qubit zu-
chongzhi 3.0 processor, Phys. Rev. Lett. 134, 090601
(2025).
[115] C. Gross and I. Bloch, Quantum simulations with ultra-
cold atoms in optical lattices, Science 357, 995 (2017).
[116] R. Blatt and C. F. Roos, Quantum simulations with
trapped ions, Nature Physics 8, 277 (2012).
[117] A. Browaeys and T. Lahaye, Many-body physics with
individually controlled rydberg atoms, Nature Physics
16, 132 (2020).
[118] A. Aspuru-Guzik and P. Walther, Photonic quantum
simulators, Nature physics 8, 285 (2012).


---
*Page 16*

16
[119] A. A. Houck, H. E. T¨ureci, and J. Koch, On-chip quan-
tum simulation with superconducting circuits, Nature
Physics 8, 292 (2012).
[120] T. Kadowaki and H. Nishimori, Quantum annealing in
the transverse ising model, Physical Review E 58, 5355
(1998).
[121] A. D. King,
A. Nocera,
M. M. Rams,
J. Dziar-
maga,
R. Wiersema,
W. Bernoudy,
J. Raymond,
N. Kaushal, N. Heinsdorf, R. Harris, et al., Computa-
tional supremacy in quantum simulation, arXiv preprint
arXiv:2403.00910 (2024).
[122] A. L. Shaw, Z. Chen, J. Choi, D. K. Mark, P. Scholl,
R. Finkelstein, A. Elben, S. Choi, and M. Endres,
Benchmarking highly entangled states on a 60-atom
analogue quantum simulator, Nature 628, 71 (2024).
[123] J. Tindall, A. F. Mello, M. Fishman, E. M. Stouden-
mire, and D. Sels, Dynamics of disordered quantum sys-
tems with two- and three-dimensional tensor networks,
arXiv preprint arXiv:2503.05693 (2025).
[124] A. D. King, A. Nocera, M. M. Rams, J. Dziarmaga,
J. Raymond, N. Kaushal, A. W. Sandvik, G. Alvarez,
J. Carrasquilla, M. Franz, et al., Comment on:” dynam-
ics of disordered quantum systems with two-and three-
dimensional tensor networks” arxiv: 2503.05693, arXiv
preprint arXiv:2504.06283 (2025).
[125] S. Aaronson and A. Arkhipov, The computational com-
plexity of linear optics (2011).
[126] H.-S. Zhong, H. Wang, Y.-H. Deng, M.-C. Chen, L.-C.
Peng, Y.-H. Luo, J. Qin, D. Wu, X. Ding, Y. Hu, et al.,
Quantum computational advantage using photons, Sci-
ence 370, 1460 (2020).
[127] H.-S. Zhong, Y.-H. Deng, J. Qin, H. Wang, M.-C. Chen,
L.-C. Peng, Y.-H. Luo, D. Wu, S.-Q. Gong, H. Su, et al.,
Phase-Programmable Gaussian Boson Sampling Using
Stimulated Squeezed Light, Physical review letters 127,
180502 (2021).
[128] L.
S.
Madsen,
F.
Laudenbach,
M.
F.
Askarani,
F. Rortais, T. Vincent, J. F. Bulmer, F. M. Miatto,
L. Neuhaus, L. G. Helt, M. J. Collins, et al., Quantum
computational advantage with a programmable pho-
tonic processor, Nature 606, 75 (2022).
[129] Y.-H. Deng, Y.-C. Gu, H.-L. Liu, S.-Q. Gong, H. Su,
Z.-J. Zhang, H.-Y. Tang, M.-H. Jia, J.-M. Xu, M.-C.
Chen, et al., Gaussian boson sampling with pseudo-
photon-number-resolving detectors and quantum com-
putational advantage, Physical review letters 131,
150601 (2023).
[130] H.-L. Huang, W.-S. Bao, and C. Guo, Simulating the
dynamics of single photons in boson sampling devices
with matrix product states, Physical Review A 100,
032305 (2019).
[131] C. Oh, K. Noh, B. Fefferman, and L. Jiang, Classical
simulation of lossy boson sampling using matrix product
operators, Physical Review A 104, 022407 (2021).
[132] M. Liu, C. Oh, J. Liu, L. Jiang, and Y. Alexeev, Sim-
ulating lossy Gaussian boson sampling with matrix-
product operators, Physical Review A 108, 052604
(2023).
[133] C. S. Hamilton, R. Kruse, L. Sansoni, S. Barkhofen,
C. Silberhorn, and I. Jex, Gaussian boson sampling,
Physical review letters 119, 170501 (2017).
[134] N. Quesada, R. S. Chadwick, B. A. Bell, J. M. Arrazola,
T. Vincent, H. Qi, and R. Garc´ıa-Patr´on, Quadratic
speed-up for simulating gaussian boson sampling, PRX
Quantum 3, 010306 (2022).
[135] D. Cilluffo, N. Lorenzoni, and M. B. Plenio, Simulat-
ing Gaussian Boson Sampling with Tensor Networks in
the Heisenberg picture, arXiv preprint arXiv:2305.11215
(2023).
[136] M. A. Nielsen and I. L. Chuang, Quantum computation
and quantum information (Cambridge university press,
2010).
[137] J. Biamonte and V. Bergholm, Tensor networks in a
nutshell, arXiv preprint arXiv:1708.00006 (2017).
[138] G. Vidal, Efficient classical simulation of slightly entan-
gled quantum computations, Physical review letters 91,
147902 (2003).
[139] C. Sch¨on, E. Solano, F. Verstraete, J. I. Cirac, and
M. M. Wolf, Sequential generation of entangled multi-
qubit states, Physical review letters 95, 110503 (2005).
[140] D. Perez-Garcia,
F. Verstraete,
M. M. Wolf, and
J. I. Cirac, Matrix product state representations, arXiv
preprint quant-ph/0608197 (2006).
[141] S.-J. Ran, Encoding of matrix product states into quan-
tum circuits of one-and two-qubit gates, Physical Re-
view A 101, 032310 (2020).
[142] Z.-Y. Wei, D. Malz, and J. I. Cirac, Efficient adiabatic
preparation of tensor network states, Physical Review
Research 5, L022037 (2023).
[143] D. Malz, G. Styliaris, Z.-Y. Wei, and J. I. Cirac, Prepa-
ration of matrix product states with log-depth quantum
circuits, Physical Review Letters 132, 040404 (2024).
[144] R. Haghshenas, J. Gray, A. C. Potter, and G. K.-L.
Chan, Variational power of quantum circuit tensor net-
works, Physical Review X 12, 011047 (2022).
[145] M. Foss-Feig, D. Hayes, J. M. Dreiling, C. Figgatt, J. P.
Gaebler, S. A. Moses, J. M. Pino, and A. C. Potter,
Holographic quantum algorithms for simulating corre-
lated spin systems, Physical Review Research 3, 033002
(2021).
[146] F. Barratt, J. Dborin, M. Bal, V. Stojevic, F. Pollmann,
and A. G. Green, Parallel quantum simulation of large
systems on small nisq computers, npj Quantum Infor-
mation 7, 79 (2021).
[147] A. Smith, B. Jobst, A. G. Green, and F. Pollmann,
Crossing a topological phase transition with a quantum
computer, Physical Review Research 4, L022020 (2022).
[148] M. Meth, V. Kuzmin, R. van Bijnen, L. Postler,
R. Stricker, R. Blatt, M. Ringbauer, T. Monz, P. Silvi,
and P. Schindler, Probing phases of quantum matter
with an ion-trap tensor-network quantum eigensolver,
Physical Review X 12, 041035 (2022).
[149] S.-H. Lin, R. Dilip, A. G. Green, A. Smith, and F. Poll-
mann, Real-and imaginary-time evolution with com-
pressed quantum circuits, PRX Quantum 2, 010342
(2021).
[150] R. Haghshenas, M. J. O’Rourke, and G. K.-L. Chan,
Conversion of projected entangled pair states into a
canonical form, Physical Review B 100, 054404 (2019).
[151] Z.-Y. Wei, D. Malz, and J. I. Cirac, Sequential genera-
tion of projected entangled-pair states, Physical Review
Letters 128, 010607 (2022).
[152] I. H. Kim and B. Swingle, Robust entanglement
renormalization on a noisy quantum computer, arXiv
preprint arXiv:1711.07500 (2017).
[153] E. C. Mart´ın, K. Plekhanov, and M. Lubasch, Bar-
ren plateaus in quantum tensor network optimization,
Quantum 7, 974 (2023).


---
*Page 17*

17
[154] T. Barthel and Q. Miao, Absence of barren plateaus and
scaling of gradients in the energy optimization of iso-
metric tensor network states, Communications in Math-
ematical Physics 406, 86 (2025).
[155] T. J. Sewell and S. P. Jordan, Preparing renormaliza-
tion group fixed points on nisq hardware, arXiv preprint
arXiv:2109.09787 (2021).
[156] S. Anand, J. Hauschild, Y. Zhang, A. C. Potter, and
M. P. Zaletel, Holographic quantum simulation of en-
tanglement renormalization circuits, PRX Quantum 4,
030334 (2023).
[157] R. Haghshenas, E. Chertkov, M. DeCross, T. M. Gat-
terman, J. A. Gerber, K. Gilmore, D. Gresh, N. He-
witt, C. V. Horst, M. Matheny, et al., Probing critical
states of matter on a digital quantum computer, arXiv
preprint arXiv:2305.01650 (2023).
[158] Q. Miao, T. Wang, K. R. Brown, T. Barthel, and
M. Cetina, Probing entanglement scaling across a quan-
tum phase transition on a quantum computer, arXiv
preprint arXiv:2412.18602 (2024).
[159] Y. Zhang, S. Gopalakrishnan, and G. Styliaris, Charac-
terizing matrix-product states and projected entangled-
pair states preparable via measurement and feedback,
PRX Quantum 5, 040304 (2024).
[160] J. B. Larsen, M. D. Grace, A. D. Baczewski, and
A. B. Magann, Feedback-based quantum algorithms for
ground state preparation, Physical Review Research 6,
033336 (2024).
[161] D. T. Stephen and O. Hart, Preparing matrix prod-
uct states via fusion: constraints and extensions, arXiv
preprint arXiv:2404.16360 (2024).
[162] K. C. Smith, E. Crane, N. Wiebe, and S. Girvin, Deter-
ministic constant-depth preparation of the aklt state on
a quantum processor using fusion measurements, PRX
Quantum 4, 020315 (2023).
[163] R. Sahay and R. Verresen, Classifying one-dimensional
quantum states prepared by a single round of measure-
ments, arXiv preprint arXiv:2404.16753 (2024).
[164] R. Sahay and R. Verresen, Finite-depth preparation of
tensor network states from measurement, arXiv preprint
arXiv:2404.17087 (2024).
[165] K. C. Smith, A. Khan, B. K. Clark, S. Girvin, and T.-
C. Wei, Constant-depth preparation of matrix product
states with adaptive quantum circuits, PRX Quantum
5, 030344 (2024).
[166] M. Ben-Dov, D. Shnaiderov, A. Makmal, and E. G.
Dalla Torre, Approximate encoding of quantum states
using shallow circuits, npj Quantum Information 10, 65
(2024).
[167] M. S. Rudolph, J. Chen, J. Miller, A. Acharya, and
A. Perdomo-Ortiz, Decomposition of matrix product
states into shallow quantum circuits, Quantum Science
and Technology 9, 015012 (2023).
[168] A. A. Melnikov, A. A. Termanova, S. V. Dolgov,
F. Neukart, and M. Perelshtein, Quantum state prepara-
tion using tensor networks, Quantum Science and Tech-
nology 8, 035027 (2023).
[169] A. Termanova, A. Melnikov, E. Mamenchikov, N. Be-
lokonev,
S. Dolgov,
A. Berezutskii,
R. Ellerbrock,
C. Mansell, and M. Perelshtein, Tensor quantum pro-
gramming, New Journal of Physics 26, 123019 (2024).
[170] B. Jaderberg, G. Pennington, K. V. Marshall, L. W. An-
derson, A. Agarwal, L. P. Lindoy, I. Rungger, S. Mensa,
and J. Crain, Variational preparation of normal matrix
product states on quantum computers, arXiv preprint
arXiv:2503.09683 (2025).
[171] A. Kukliansky, E. Younis, L. Cincio, and C. Iancu,
QFactor: A domain-specific optimizer for quantum cir-
cuit instantiation (2023).
[172] D. A. Lidar and T. A. Brun, Quantum error correction
(Cambridge university press, 2013).
[173] A. J. Ferris and D. Poulin, Tensor networks and
quantum error correction, Physical review letters 113,
030501 (2014).
[174] T. Farrelly, R. J. Harris, N. A. McMahon, and T. M.
Stace, Tensor-network codes, Physical Review Letters
127, 040507 (2021).
[175] T. Farrelly, D. K. Tuckett, and T. M. Stace, Lo-
cal tensor-network codes, New Journal of Physics 24,
043015 (2022).
[176] C. Cao and B. Lackey, Quantum lego: Building quan-
tum error correction codes from tensor networks, PRX
Quantum 3, 020332 (2022).
[177] C. Cao, M. J. Gullans, B. Lackey, and Z. Wang, Quan-
tum lego expansion pack: Enumerators from tensor net-
works, PRX Quantum 5, 030313 (2024).
[178] J. Fan, M. Steinberg, A. Jahn, C. Cao, A. Sarkar,
and S. Feld, Lego hqec:
A software tool for an-
alyzing holographic quantum codes, arXiv preprint
arXiv:2410.22861 (2024).
[179] F. Pastawski, B. Yoshida, D. Harlow, and J. Preskill,
Holographic quantum error-correcting codes: Toy mod-
els for the bulk/boundary correspondence, Journal of
High Energy Physics 2015, 1 (2015).
[180] A. Jahn and J. Eisert, Holographic tensor network mod-
els and quantum error correction:
a topical review,
Quantum Science and Technology 6, 033002 (2021).
[181] M. Steinberg, S. Feld, and A. Jahn, Holographic codes
from hyperinvariant tensor networks, Nature Commu-
nications 14, 7314 (2023).
[182] R. Shen, Y. Wang, and C. Cao, Quantum lego and
xp stabilizer codes, arXiv preprint arXiv:2310.19538
(2023).
[183] A. Schotte, G. Zhu, L. Burgelman, and F. Verstraete,
Quantum error correction thresholds for the universal
fibonacci turaev-viro code, Phys. Rev. X 12, 021012
(2022).
[184] V. Bettaque and B. Swingle, Nora:
A tensor net-
work ansatz for volume-law entangled equilibrium states
of highly connected hamiltonians, Quantum 8, 1362
(2024).
[185] C. Cao and B. Lackey, Approximate bacon-shor code
and holography, Journal of High Energy Physics 2021,
1 (2021).
[186] M. Steinberg, J. Fan, R. J. Harris, D. Elkouss, S. Feld,
and A. Jahn, Far from perfect: Quantum error correc-
tion with (hyperinvariant) evenbly codes, arXiv preprint
arXiv:2407.11926 (2024).
[187] F. Pastawski and J. Preskill, Code properties from
holographic geometries, Physical Review X 7, 021022
(2017).
[188] V. P. Su, C. Cao, H.-Y. Hu, Y. Yanay, C. Tahan, and
B. Swingle, Discovery of optimal quantum error cor-
recting codes via reinforcement learning, arXiv preprint
arXiv:2305.06378 (2023).
[189] C. Mauron, T. Farrelly, and T. M. Stace, Optimiza-
tion of tensor network codes with reinforcement learn-
ing, New Journal of Physics 26, 023024 (2024).


---
*Page 18*

18
[190] S. Bravyi, M. Suchara, and A. Vargo, Efficient algo-
rithms for maximum likelihood decoding in the surface
code, Physical Review A 90, 032326 (2014).
[191] C. T. Chubb and S. T. Flammia, Statistical mechan-
ical models for quantum codes with correlated noise,
Annales de l’Institut Henri Poincar´e D 8, 269 (2021).
[192] A. S. Darmawan, Y. Nakata, S. Tamiya, and H. Ya-
masaki, Low-depth random Clifford circuits for quan-
tum coding against Pauli noise using a tensor-network
decoder, arXiv preprint arXiv:2212.05071 (2022).
[193] T. Farrelly, N. Milicevic, R. J. Harris, N. A. McMahon,
and T. M. Stace, Parallel decoding of multiple logical
qubits in tensor-network codes, Physical Review A 105,
052446 (2022).
[194] Google Quantum AI, Suppressing quantum errors by
scaling a surface code logical qubit, Nature 614, 676
(2023).
[195] C. Piveteau, C. T. Chubb, and J. M. Renes, Tensor-
network decoding beyond 2d, PRX Quantum 5, 040303
(2024).
[196] N. Shutty, M. Newman, and B. Villalonga, Efficient
near-optimal decoding of the surface code through en-
sembling, arXiv preprint arXiv:2401.12434 (2024).
[197] A. Kukliansky and B. Lackey, Quantum circuit tensors
and enumerators with applications to quantum fault tol-
erance, arXiv preprint arXiv:2405.19643 (2024).
[198] C. Cao and B. Lackey, Quantum weight enumerators
and tensor networks, IEEE Transactions on Information
Theory 70, 3512 (2023).
[199] R. J. Harris, N. A. McMahon, G. K. Brennen, and
T. M. Stace, Calderbank-shor-steane holographic quan-
tum error-correcting codes, Physical Review A 98,
052301 (2018).
[200] R. J. Harris, E. Coupe, N. A. McMahon, G. K. Brennen,
and T. M. Stace, Decoding holographic codes with an
integer optimization decoder, Physical Review A 102,
062417 (2020).
[201] N. Bao and J. Naskar, Code properties of the holo-
graphic sierpinski triangle, Physical Review D 106,
126006 (2022).
[202] J. Fan, M. Steinberg, A. Jahn, C. Cao, and S. Feld,
Overcoming the zero-rate hashing bound with holo-
graphic
quantum
error
correction,
arXiv
preprint
arXiv:2408.06232 (2024).
[203] D. K. Tuckett, A. S. Darmawan, C. T. Chubb, S. Bravyi,
S. D. Bartlett, and S. T. Flammia, Tailoring surface
codes for highly biased noise, Phys. Rev. X 9, 041031
(2019).
[204] Q. Xu, N. Mannucci, A. Seif, A. Kubica, S. T. Flammia,
and L. Jiang, Tailored xzzx codes for biased noise, Phys.
Rev. Res. 5, 013035 (2023).
[205] D. K. Tuckett, S. D. Bartlett, and S. T. Flammia, Ultra-
high error threshold for surface codes with biased noise,
Physical review letters 120, 050505 (2018).
[206] J. P. Bonilla Ataides, D. K. Tuckett, S. D. Bartlett,
S. T. Flammia, and B. J. Brown, The xzzx surface code,
Nature communications 12, 2172 (2021).
[207] A. Dua, A. Kubica, L. Jiang, S. T. Flammia, and M. J.
Gullans, Clifford-deformed surface codes, PRX Quan-
tum 5, 010347 (2024).
[208] F. Kobayashi, H. Manabe, G. A. White, T. Farrelly,
K. Modi, and T. M. Stace, Tensor-network decoders
for process tensor descriptions of non-markovian noise,
arXiv preprint arXiv:2412.13739 (2024).
[209] C. Piveteau, C. T. Chubb, and J. M. Renes, Tensor-
network decoding beyond 2d, PRX Quantum 5, 040303
(2024).
[210] F. Battistel, C. Chamberland, K. Johar, R. W. Overwa-
ter, F. Sebastiano, L. Skoric, Y. Ueno, and M. Usman,
Real-time decoding for fault-tolerant quantum comput-
ing: Progress, challenges and outlook, Nano Futures 7,
032003 (2023).
[211] K. Temme, S. Bravyi, and J. M. Gambetta, Error miti-
gation for short-depth quantum circuits, Physical review
letters 119, 180509 (2017).
[212] Y. Li and S. C. Benjamin, Efficient variational quan-
tum simulator incorporating active error minimization,
Physical Review X 7, 021050 (2017).
[213] Y. Guo and S. Yang, Quantum error mitigation via
matrix product operators, PRX Quantum 3, 040313
(2022).
[214] M. S. Tepaske and D. J. Luitz, Compressed quantum er-
ror mitigation, Physical Review B 107, L201114 (2023).
[215] S. Filippov, M. Leahy, M. A. Rossi, and G. Garc´ıa-
P´erez,
Scalable
tensor-network
error
mitigation
for near-term quantum computing, arXiv preprint
arXiv:2307.11740 (2023).
[216] S.
N.
Filippov,
S.
Maniscalco,
and
G.
Garc´ıa-
P´erez, Scalability of quantum error mitigation tech-
niques:
from utility to advantage, arXiv preprint
arXiv:2403.13542 (2024).
[217] L. E. Fischer et al., Dynamical simulations of many-
body quantum chaos on a quantum computer, arXiv
preprint arXiv:2411.00765 (2024).
[218] C. Piveteau, D. Sutter, S. Bravyi, J. M. Gambetta,
and K. Temme, Error mitigation for universal gates
on encoded qubits, Physical review letters 127, 200505
(2021).
[219] A. Novikov, D. Podoprikhin, A. Osokin, and D. P.
Vetrov, Tensorizing neural networks, Advances in neural
information processing systems 28 (2015).
[220] A. Novikov, M. Trofimov, and I. Oseledets, Exponential
machines, arXiv preprint arXiv:1605.03795 (2016).
[221] E. Stoudenmire and D. J. Schwab, Supervised learning
with tensor networks, Advances in neural information
processing systems 29 (2016).
[222] J. Chen, S. Cheng, H. Xie, L. Wang, and T. Xi-
ang, Equivalence of restricted Boltzmann machines and
tensor network states, Physical Review B 97, 085104
(2018).
[223] S. Li, F. Pan, P. Zhou, and P. Zhang, Boltzmann ma-
chines as two-dimensional tensor networks, Physical Re-
view B 104, 075154 (2021).
[224] Z.-Y. Han, J. Wang, H. Fan, L. Wang, and P. Zhang,
Unsupervised generative modeling using matrix product
states, Physical Review X 8, 031012 (2018).
[225] J. Liu, S. Li, J. Zhang, and P. Zhang, Tensor networks
for unsupervised machine learning, Physical Review E
107, L012103 (2023).
[226] I. Glasser, R. Sweke, N. Pancotti, J. Eisert, and I. Cirac,
Expressive power of tensor-network factorizations for
probabilistic modeling, Advances in neural information
processing systems 32 (2019).
[227] S. Cheng, L. Wang, T. Xiang, and P. Zhang, Tree tensor
networks for generative modeling, Physical Review B
99, 155131 (2019).
[228] T. Vieijra, L. Vanderstraeten, and F. Verstraete, Gen-
erative modeling with projected entangled-pair states,


---
*Page 19*

19
arXiv preprint arXiv:2202.08177 (2022).
[229] J. A. Reyes and E. M. Stoudenmire, Multi-scale ten-
sor network architecture for machine learning, Machine
Learning: Science and Technology 2, 035036 (2021).
[230] W. Huggins, P. Patil, B. Mitchell, K. B. Whaley, and
E. M. Stoudenmire, Towards quantum machine learning
with tensor networks, Quantum Science and technology
4, 024001 (2019).
[231] M. L. Wall, M. R. Abernathy, and G. Quiroz, Gener-
ative machine learning with tensor networks: Bench-
marks on near-term quantum computers, Physical Re-
view Research 3, 023010 (2021).
[232] E. Grant, M. Benedetti, S. Cao, A. Hallam, J. Lock-
hart, V. Stojevic, A. G. Green, and S. Severini, Hierar-
chical quantum classifiers, npj Quantum Information 4,
65 (2018).
[233] M. Lazzarin, D. E. Galli, and E. Prati, Multi-class quan-
tum classifiers with tensor network circuits for quan-
tum phase recognition, Physics Letters A 434, 128056
(2022).
[234] H.-M. Rieser, F. K¨oster, and A. P. Raulf, Tensor net-
works for quantum machine learning, Proceedings of the
Royal Society A 479, 20230218 (2023).
[235] C. Zhao and X.-S. Gao, Analyzing the barren plateau
phenomenon in training quantum neural networks with
the zx-calculus, Quantum 5, 466 (2021).
[236] A. Pesah, M. Cerezo, S. Wang, T. Volkoff, A. T. Sorn-
borger, and P. J. Coles, Absence of barren plateaus in
quantum convolutional neural networks, Physical Re-
view X 11, 041011 (2021).
[237] H. Liao, I. Convy, Z. Yang, and K. B. Whaley, Decoher-
ing tensor network quantum machine learning models,
Quantum Machine Intelligence 5, 7 (2023).
[238] I. Cong, S. Choi, and M. D. Lukin, Quantum convolu-
tional neural networks, Nature Physics 15, 1273 (2019).
[239] P. Bermejo, P. Braccia, M. S. Rudolph, Z. Holmes,
L. Cincio, and M. Cerezo, Quantum convolutional neu-
ral networks are (effectively) classically simulable, arXiv
preprint arXiv:2408.12739 (2024).
[240] R. Dilip, Y.-J. Liu, A. Smith, and F. Pollmann, Data
compression for quantum machine learning, Physical
Review Research 4, 043007 (2022).
[241] J. Iaconis and S. Johri, Tensor network based effi-
cient quantum data loading of images, arXiv preprint
arXiv:2310.05897 (2023).
[242] J. Dborin, F. Barratt, V. Wimalaweera, L. Wright,
and A. G. Green, Matrix product state pre-training for
quantum machine learning, Quantum Science and Tech-
nology 7, 035014 (2022).
[243] M. S. Rudolph,
J. Miller,
D. Motlagh,
J. Chen,
A. Acharya, and A. Perdomo-Ortiz, Synergy between
quantum circuits and tensor networks: Short-cutting
the race to practical quantum advantage, arXiv preprint
arXiv:2208.13673 (2022).
[244] A. Khan, B. K. Clark, and N. M. Tubman, Pre-
optimizing variational quantum eigensolvers with tensor
networks, arXiv preprint arXiv:2310.12965 (2023).
[245] S. Shin, Y. S. Teo, and H. Jeong, Dequantizing quantum
machine learning models using tensor networks, Physi-
cal Review Research 6, 023218 (2024).
[246] N. de Beaudrap, A. Kissinger, and K. Meichanetzidis,
Tensor network rewriting strategies for satisfiability and
counting, arXiv preprint arXiv:2004.06455 (2020).
[247] T. Rakovszky, C. Von Keyserlingk, and F. Pollmann,
Dissipation-assisted operator evolution method for cap-
turing hydrodynamic transport, Physical Review B 105,
075131 (2022).
[248] P. S. Tarabunga, E. Tirrito, M. C. Ba˜nuls, and M. Dal-
monte, Nonstabilizerness via matrix product states in
the pauli basis, Physical Review Letters 133, 010601
(2024).
[249] S. Masot-Llima and A. Garcia-Saez, Stabilizer tensor
networks: universal quantum simulator on a basis of
stabilizer states, Physical Review Letters 133, 230601
(2024).
[250] N. P. Breuckmann and J. N. Eberhardt, Quantum low-
density parity-check codes, PRX Quantum 2, 040101
(2021).
[251] P. Panteleev and G. Kalachev, Asymptotically good
quantum and locally testable classical LDPC codes, in
Proceedings of the 54th Annual ACM SIGACT Sympo-
sium on Theory of Computing (2022) pp. 375–388.
[252] J. Bausch, A. W. Senior, F. J. Heras, T. Edlich,
A. Davies, M. Newman, C. Jones, K. Satzinger, M. Y.
Niu, S. Blackwell, et al., Learning high-accuracy error
decoding for quantum processors, Nature , 1 (2024).
[253] H. H. Zhou, C. Zhao, K. Nakaji, J. Lietz, A. McCaskey,
T. L. Patti, and C. Chamberland, NVIDIA and QuEra
Decode Quantum Errors with AI, NVIDIA Technical
Blog (2025).
[254] M. Cerezo, M. Larocca, D. Garc´ıa-Mart´ın, N. L. Diaz,
P. Braccia, E. Fontana, M. S. Rudolph, P. Bermejo,
A. Ijaz, S. Thanasilp, et al., Does provable absence of
barren plateaus imply classical simulability? or, why we
need to rethink variational quantum computing, arXiv
preprint arXiv:2312.09121 (2023).
[255] E. Gil-Fuster, C. Gyurik, A. P´erez-Salinas, and V. Dun-
jko, On the relation between trainability and dequanti-
zation of variational quantum learning models, arXiv
preprint arXiv:2406.07072 (2024).
DISCLAIMER
This paper was prepared for informational purposes
with contributions from the Global Technology Applied
Research center of JPMorganChase. This paper is not a
product of the Research Department of JPMorganChase
or its affiliates. Neither JPMorganChase nor any of its
affiliates makes any explicit or implied representation or
warranty and none of them accept any liability in con-
nection with this paper, including, without limitation,
with respect to the completeness, accuracy, or reliability
of the information contained herein and the potential le-
gal, compliance, tax, or accounting effects thereof. This
document is not intended as investment research or in-
vestment advice, or as a recommendation, offer, or solic-
itation for the purchase or sale of any security, financial
instrument, financial product or service, or to be used in
any way for evaluating the merits of participating in any
transaction. The United States Government retains, and
by accepting the article for publication, the publisher ac-
knowledges that the United States Government retains,
a nonexclusive, paid-up, irrevocable, worldwide license


---
*Page 20*

20
to publish or reproduce the published form of this work,
or allow others to do so, for United States Government
purposes.
