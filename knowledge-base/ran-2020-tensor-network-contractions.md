# Lecture Notes in Physics 964

Tensor
Network 
Contractions
Shi-Ju Ran · Emanuele Tirrito
Cheng Peng · Xi Chen
Luca Tagliacozzo · Gang Su
Maciej Lewenstein
Methods and Applications to
Quantum Many-Body Systems

---
*Page 2*

Lecture Notes in Physics
Volume 964
Founding Editors
Wolf Beiglböck, Heidelberg, Germany
Jürgen Ehlers, Potsdam, Germany
Klaus Hepp, Zürich, Switzerland
Hans-Arwed Weidenmüller, Heidelberg, Germany
Series Editors
Matthias Bartelmann, Heidelberg, Germany
Roberta Citro, Salerno, Italy
Peter Hänggi, Augsburg, Germany
Morten Hjorth-Jensen, Oslo, Norway
Maciej Lewenstein, Barcelona, Spain
Angel Rubio, Hamburg, Germany
Manfred Salmhofer, Heidelberg, Germany
Wolfgang Schleich, Ulm, Germany
Stefan Theisen, Potsdam, Germany
James D. Wells, Ann Arbor, MI, USA
Gary P. Zank, Huntsville, AL, USA


---
*Page 3*

The Lecture Notes in Physics
The series Lecture Notes in Physics (LNP), founded in 1969, reports new devel-
opments in physics research and teaching-quickly and informally, but with a high
quality and the explicit aim to summarize and communicate current knowledge in
an accessible way. Books published in this series are conceived as bridging material
between advanced graduate textbooks and the forefront of research and to serve
three purposes:
•
to be a compact and modern up-to-date source of reference on a well-deﬁned
topic
•
to serve as an accessible introduction to the ﬁeld to postgraduate students and
nonspecialist researchers from related areas
•
to be a source of advanced teaching material for specialized seminars, courses
and schools
Both monographs and multi-author volumes will be considered for publication.
Edited volumes should however consist of a very limited number of contributions
only. Proceedings will not be considered for LNP.
Volumes published in LNP are disseminated both in print and in electronic for-
mats, the electronic archive being available at springerlink.com. The series content
is indexed, abstracted and referenced by many abstracting and information services,
bibliographic networks, subscription agencies, library networks, and consortia.
Proposals should be sent to a member of the Editorial Board, or directly to the
managing editor at Springer:
Dr Lisa Scalone
Springer Nature
Physics Editorial Department I
Tiergartenstrasse 17
69121 Heidelberg, Germany
lisa.scalone@springernature.com
More information about this series at http://www.springer.com/series/5304


---
*Page 4*

Shi-Ju Ran • Emanuele Tirrito • Cheng Peng •
Xi Chen • Luca Tagliacozzo • Gang Su •
Maciej Lewenstein
Tensor Network Contractions
Methods and Applications to Quantum
Many-Body Systems


---
*Page 5*

Shi-Ju Ran
Department of Physics
Capital Normal University
Beijing, China
Emanuele Tirrito
Quantum Optics Theory
Institute of Photonic Sciences
Castelldefels, Spain
Cheng Peng
Stanford Institute for Materials
and Energy Sciences
SLAC and Stanford University
Menlo Park, CA, USA
Xi Chen
School of Physical Sciences
University of Chinese Academy of Science
Beijing, China
Luca Tagliacozzo
Department of Quantum Physics and
Astrophysics
University of Barcelona
Barcelona, Spain
Gang Su
Kavli Institute for Theoretical Sciences
University of Chinese Academy of Science
Beijing, China
Maciej Lewenstein
Quantum Optics Theory
Institute of Photonic Sciences
Castelldefels, Spain
ISSN 0075-8450
ISSN 1616-6361
(electronic)
Lecture Notes in Physics
ISBN 978-3-030-34488-7
ISBN 978-3-030-34489-4
(eBook)
https://doi.org/10.1007/978-3-030-34489-4
This book is an open access publication.
© The Editor(s) (if applicable) and the Author(s) 2020
Open Access This book is licensed under the terms of the Creative Commons Attribution 4.0 Inter-
national License (http://creativecommons.org/licenses/by/4.0/), which permits use, sharing, adaptation,
distribution and reproduction in any medium or format, as long as you give appropriate credit to the
original author(s) and the source, provide a link to the Creative Commons licence and indicate if changes
were made.
The images or other third party material in this book are included in the book’s Creative Commons
licence, unless indicated otherwise in a credit line to the material. If material is not included in the book’s
Creative Commons licence and your intended use is not permitted by statutory regulation or exceeds the
permitted use, you will need to obtain permission directly from the copyright holder.
The use of general descriptive names, registered names, trademarks, service marks, etc. in this publication
does not imply, even in the absence of a speciﬁc statement, that such names are exempt from the relevant
protective laws and regulations and therefore free for general use.
The publisher, the authors, and the editors are safe to assume that the advice and information in this book
are believed to be true and accurate at the date of publication. Neither the publisher nor the authors or
the editors give a warranty, expressed or implied, with respect to the material contained herein or for any
errors or omissions that may have been made. The publisher remains neutral with regard to jurisdictional
claims in published maps and institutional afﬁliations.
This Springer imprint is published by the registered company Springer Nature Switzerland AG.
The registered company address is: Gewerbestrasse 11, 6330 Cham, Switzerland


---
*Page 6*

Preface
Tensor network (TN), a young mathematical tool of high vitality and great potential,
has been undergoing extremely rapid developments in the last two decades,
gaining tremendous success in condensed matter physics, atomic physics, quantum
information science, statistical physics, and so on. In this lecture notes, we focus
on the contraction algorithms of TN as well as some of the applications to the
simulations of quantum many-body systems. Starting from basic concepts and
deﬁnitions, we ﬁrst explain the relations between TN and physical problems,
including the TN representations of classical partition functions, quantum many-
body states (by matrix product state, tree TN, and projected entangled pair state),
time evolution simulations, etc. These problems, which are challenging to solve,
can be transformed to TN contraction problems. We present then several paradigm
algorithms based on the ideas of the numerical renormalization group and/or
boundary states, including density matrix renormalization group, time-evolving
block decimation, coarse-graining/corner tensor renormalization group, and several
distinguished variational algorithms. Finally, we revisit the TN approaches from
the perspective of multi-linear algebra (also known as tensor algebra or tensor
decompositions) and quantum simulation. Despite the apparent differences in the
ideas and strategies of different TN algorithms, we aim at revealing the underlying
relations and resemblances in order to present a systematic picture to understand the
TN contraction approaches.
Beijing, China
Shi-Ju Ran
Castelldefels, Spain
Emanuele Tirrito
Menlo Park, CA, USA
Cheng Peng
Beijing, China
Xi Chen
Barcelona, Spain
Luca Tagliacozzo
Beijing, China
Gang Su
Castelldefels, Spain
Maciej Lewenstein
v


---
*Page 7*

Acknowledgements
We are indebted to Mari-Carmen Bañuls, Ignacio Cirac, Jan von Delft, Yichen
Huang, Karl Jansen, José Ignacio Latorre, Michael Lubasch, Wei Li, Simone
Montagero, Tomotoshi Nishino, Roman Orús, Didier Poilblanc, Guifre Vidal,
Andreas Weichselbaum, Tao Xiang, and Xin Yan for helpful discussions and
suggestions. SJR acknowledges Fundació Catalunya-La Pedrera, Ignacio Cirac
Program Chair and Beijing Natural Science Foundation (Grants No. 1192005). ET
and ML acknowledge the Spanish Ministry MINECO (National Plan 15 Grant:
FISICATEAMO No. FIS2016-79508-P, SEVERO OCHOA No. SEV-2015-0522,
FPI), European Social Fund, Fundació Cellex, Generalitat de Catalunya (AGAUR
Grant No. 2017 SGR 1341 and CERCA/Program), ERC AdG OSYRIS and NOQIA,
EU FETPRO QUIC, and the National Science Centre, Poland-Symfonia Grant
No. 2016/20/W/ST4/00314. LT was supported by the Spanish RYC-2016-20594
program from MINECO. SJR, CP, XC, and GS were supported by the NSFC (Grant
No. 11834014). CP, XC, and GS were supported in part by the National Key R&D
Program of China (Grant No. 2018FYA0305800), the Strategic Priority Research
Program of CAS (Grant No. XDB28000000), and Beijing Municipal Science and
Technology Commission (Grant No. Z118100004218001).
vii


---
*Page 8*

Contents
1
Introduction ..................................................................
1
1.1
Numeric Renormalization Group in One Dimension..................
1
1.2
Tensor Network States in Two Dimensions............................
3
1.3
Tensor Renormalization Group and Tensor Network Algorithms ....
5
1.4
Organization of Lecture Notes .........................................
7
References .....................................................................
8
2
Tensor Network: Basic Deﬁnitions and Properties .......................
25
2.1
Scalar, Vector, Matrix, and Tensor .....................................
25
2.2
Tensor Network and Tensor Network States...........................
27
2.2.1
A Simple Example of Two Spins and Schmidt
Decomposition ..................................................
27
2.2.2
Matrix Product State............................................
28
2.2.3
Afﬂeck–Kennedy–Lieb–Tasaki State ..........................
31
2.2.4
Tree Tensor Network State (TTNS) and Projected
Entangled Pair State (PEPS) ...................................
32
2.2.5
PEPS Can Represent Non-trivial Many-Body States:
Examples ........................................................
34
2.2.6
Tensor Network Operators .....................................
36
2.2.7
Tensor Network for Quantum Circuits.........................
39
2.3
Tensor Networks that Can Be Contracted Exactly ....................
42
2.3.1
Deﬁnition of Exactly Contractible Tensor Network States ...
42
2.3.2
MPS Wave-Functions...........................................
43
2.3.3
Tree Tensor Network Wave-Functions.........................
45
2.3.4
MERA Wave-Functions ........................................
47
2.3.5
Sequentially Generated PEPS Wave-Functions ...............
48
2.3.6
Exactly Contractible Tensor Networks ........................
50
ix


---
*Page 9*

x
Contents
2.4
Some Discussions .......................................................
54
2.4.1
General Form of Tensor Network ..............................
54
2.4.2
Gauge Degrees of Freedom ....................................
54
2.4.3
Tensor Network and Quantum Entanglement .................
55
References .....................................................................
58
3
Two-Dimensional Tensor Networks and Contraction Algorithms......
63
3.1
From Physical Problems to Two-Dimensional Tensor Networks .....
63
3.1.1
Classical Partition Functions ...................................
63
3.1.2
Quantum Observables ..........................................
66
3.1.3
Ground-State and Finite-Temperature Simulations ...........
67
3.2
Tensor Renormalization Group.........................................
69
3.3
Corner Transfer Matrix Renormalization Group ......................
71
3.4
Time-Evolving Block Decimation: Linearized Contraction
and Boundary-State Methods...........................................
74
3.5
Transverse Contraction and Folding Trick .............................
77
3.6
Relations to Exactly Contractible Tensor Networks
and Entanglement Renormalization ....................................
80
3.7
A Shot Summary ........................................................
83
References .....................................................................
83
4
Tensor Network Approaches for Higher-Dimensional Quantum
Lattice Models................................................................
87
4.1
Variational Approaches of Projected-Entangled Pair State ...........
87
4.2
Imaginary-Time Evolution Methods ...................................
90
4.3
Full, Simple, and Cluster Update Schemes ............................
92
4.4
Summary of the Tensor Network Algorithms in Higher
Dimensions ..............................................................
94
References .....................................................................
95
5
Tensor Network Contraction and Multi-Linear Algebra................
99
5.1
A Simple Example of Solving Tensor Network Contraction by
Eigenvalue Decomposition .............................................
99
5.1.1
Canonicalization of Matrix Product State ..................... 101
5.1.2
Canonical Form and Globally Optimal Truncations of
MPS ............................................................. 101
5.1.3
Canonicalization Algorithm and Some Related Topics ....... 104
5.2
Super-Orthogonalization and Tucker Decomposition ................. 106
5.2.1
Super-Orthogonalization ....................................... 107
5.2.2
Super-Orthogonalization Algorithm ........................... 108
5.2.3
Super-Orthogonalization and Dimension Reduction by
Tucker Decomposition.......................................... 109
5.3
Zero-Loop Approximation on Regular Lattices and Rank-1
Decomposition .......................................................... 112
5.3.1
Super-Orthogonalization Works Well for Truncating
the PEPS on Regular Lattice: Some Intuitive Discussions ... 112


---
*Page 10*

Contents
xi
5.3.2
Rank-1 Decomposition and Algorithm ........................ 113
5.3.3
Rank-1 Decomposition, Super-Orthogonalization, and
Zero-Loop Approximation ..................................... 115
5.3.4
Error of Zero-Loop Approximation and
Tree-Expansion Theory Based on Rank-Decomposition ..... 116
5.4
iDMRG, iTEBD, and CTMRG Revisited by Tensor Ring
Decomposition .......................................................... 119
5.4.1
Revisiting iDMRG, iTEBD, and CTMRG: A Uniﬁed
Description with Tensor Ring Decomposition ................ 119
5.4.2
Extracting the Information of Tensor Networks From
Eigenvalue Equations: Two Examples ......................... 123
References ..................................................................... 126
6
Quantum Entanglement Simulation Inspired by Tensor Network ..... 131
6.1
Motivation and General Ideas .......................................... 131
6.2
Simulating One-Dimensional Quantum Lattice Models .............. 132
6.3
Simulating Higher-Dimensional Quantum Systems................... 136
6.4
Quantum Entanglement Simulation by Tensor Network:
Summary ................................................................ 142
References ..................................................................... 145
7
Summary...................................................................... 147
Index............................................................................... 149


---
*Page 11*

Acronyms
AKLT state
Afﬂeck–Kennedy–Lieb–Tasaki state
AOP
Ab initio optimization principle
CANDECOMP/PARAFAC
Canonical decomposition/parallel factorization
CFT
Conformal ﬁeld theory
CTM
Corner transfer matrix
CTMRG
Corner transfer matrix renormalization group
DFT
Density functional theory
DMFT
Dynamical mean-ﬁeld theory
DMRG
Density matrix renormalization group
ECTN
Exactly contractible tensor network
HOOI
Higher-order orthogonal iteration
HOSVD
Higher-order singular value decomposition
HOTRG
Higher-order tensor renormalization group
iDMRG
Inﬁnite density matrix renormalization group
iPEPO
Inﬁnite projected entangled pair operator
iPEPS
Inﬁnite projected entangled pair state
iTEBD
Inﬁnite time-evolving block decimation
MERA
Multiscale entanglement renormalization ansatz
MLA
Multi-linear algebra
MPO
Matrix product operator
MPS
Matrix product state
NCD
Network contractor dynamics
NP hard
Non-deterministic polynomial hard
NRG
Numerical renormalization group
NTD
Network Tucker decomposition
PEPO
Projected entangled pair operator
PEPS
Projected entangled pair state
QES
Quantum entanglement simulation/simulator
QMC
Quantum Monte Carlo
RG
Renormalization group
RVB
Resonating valence bond
xiii


---
*Page 12*

xiv
Acronyms
SEEs
Self-consistent eigenvalue equations
SRG
Second renormalization group
SVD
Singular value decomposition
TDVP
Time-dependent variational principle
TEBD
Time-evolving block decimation
TMRG
Transfer matrix renormalization group
TN
Tensor network
TNR
Tensor network renormalization
TNS
Tensor network state
TPO
Tensor product operator
TRD
Tensor ring decomposition
TRG
Tensor renormalization group
TTD
Tensor-train decomposition
TTNS
Tree tensor network state
VMPS
Variational matrix product state


---
*Page 13*

Chapter 1
Introduction
Abstract One characteristic that deﬁnes us, human beings, is the curiosity of the
unknown. Since our birth, we have been trying to use any methods that human
brains can comprehend to explore the nature: to mimic, to understand, and to utilize
in a controlled and repeatable way. One of the most ancient means lies in the
nature herself, experiments, leading to tremendous achievements from the creation
of ﬁre to the scissors of genes. Then comes mathematics, a new world we made
by numbers and symbols, where the nature is reproduced by laws and theorems
in an extremely simple, beautiful, and unprecedentedly accurate manner. With the
explosive development of digital sciences, computer was created. It provided us
the third way to investigate the nature, a digital world whose laws can be ruled by
ourselves with codes and algorithms to numerically mimic the real universe. In this
chapter, we brieﬂy review the history of tensor network algorithms and the related
progresses made recently. The organization of our lecture notes is also presented.
1.1
Numeric Renormalization Group in One Dimension
Numerical simulation is one of the most important approaches in science, in
particular for the complicated problems beyond the reach of analytical solutions.
One distinguished example of the algorithms in physics as well as in chemistry is
ab initio principle calculation, which is based on density function theory (DFT) [1–
3]. It provides a reliable solution to simulate a wide range of materials that can be
described by the mean-ﬁeld theories and/or single-particle approximations. Monte
Carlo method [4], named after a city famous of gambling in Monaco, is another
example that appeared in almost every corner of science. In contemporary physics,
however, there are still many “hard nuts to crack.” Speciﬁcally in quantum physics,
numerical simulation faces un-tackled issues for the systems with strong correla-
tions, which might lead to exciting and exotic phenomena like high-temperature
superconductivity [5, 6] and fractional excitations [7].
Tensor network (TN) methods in the context of many-body quantum systems
have been developed recently. One could however identify some precursors of them
in the seminal works of Kramers and Wannier [8, 9], Baxter [10, 11], Kelland [12],
© The Author(s) 2020
S.-J. Ran et al., Tensor Network Contractions, Lecture Notes in Physics 964,
https://doi.org/10.1007/978-3-030-34489-4_1
1


---
*Page 14*

2
1
Introduction
Tsang [13], Nightingale and Blöte [11], and Derrida [14, 15], as found by Nishino
[16–22]. Here we start their history from the Wilson numerical renormalization
group (NRG) [23]. The NRG aims at ﬁnding the ground state of a spin system.
The idea of the NRG is to start from a small system whose Hamiltonian can be
easily diagonalized. The system is then projected on few low-energy states of the
Hamiltonian. A new system is then constructed by adding several spins and a new
low-energy effective Hamiltonian is obtained working only in the subspace spanned
by the low-energy states of the previous step and the full Hilbert space of the new
spins. In this way the low-energy effective Hamiltonian can be diagonalized again
and its low-energy states can be used to construct a new restricted Hilbert space.
The procedure is then iterated. The original NRG has been improved, for example,
by combining it with the expansion theory [24–26]. As already shown in [23] the
NRG successfully tackles the Kondo problem in one dimension [27], however, its
accuracy is limited when applied to generic strongly correlated systems such as
Heisenberg chains.
In the nineties, White and Noack were able to relate the poor NRG accuracy
with the fact that it fails to consider properly the boundary conditions [28]. In 1992,
White proposed the famous density matrix renormalization group (DMRG) that is
as of today the most efﬁcient and accurate algorithms for one-dimensional (1D)
models [29, 30]. White used the largest eigenvectors of the reduced density matrix
of a block as the states describing the relevant part of the low energy physics Hilbert
space. The reduced density matrix is obtained by explicitly constructing the ground
state of the system on a larger region. In other words, the space of one block is
renormalized by taking the rest of the system as an environment.
The simple idea of environment had revolutionary consequences in the RG-based
algorithms. Important generalizations of DMRG were then developed, including
the ﬁnite-temperature variants of matrix renormalization group [31–34], dynamic
DMRG algorithms [35–38], and corner transfer matrix renormalization group by
Nishino and Okunishi [16].1
About 10 years later, TN was re-introduced in its simplest form of matrix product
states (MPS) [14, 15, 39–41] in the context of the theory of entanglement in quantum
many-body systems; see, e.g., [42–45].2 In this context, the MPS encodes the
coefﬁcients of the wave-functions in a product of matrices, and is thus deﬁned as
the contraction of a one-dimensional TN. Each elementary tensor has three indexes:
one physical index acting on the physical Hilbert space of the constituent, and
two auxiliary indexes that will be contracted. The MPS structure is chosen since
it represents the states whose entanglement only scales with the boundary of a
region rather than its volume, something called the “area law” of entanglement.
Furthermore, an MPS gives only ﬁnite correlations, thus is well suited to represent
1We recommend a web page built by Tomotoshi Nishino, http://quattro.phys.sci.kobe-u.ac.jp/
dmrg.html, where one exhaustively can ﬁnd the progresses related to DMRG.
2For the general theory of entanglement and its role in the physics of quantum many-body systems,
see for instance [46–49].


---
*Page 15*

1.2
Tensor Network States in Two Dimensions
3
the ground states of the gapped short-range Hamiltonians. The relation between
these two facts was evinced in seminal contributions [50–59] and led Verstraete and
Cirac to prove that MPS can provide faithful representations of the ground states of
1D gapped local Hamiltonian [60].
These results together with the previous works that identiﬁed the outcome of
converged DMRG simulations with an MPS description of the ground states [61]
allowed to better understand the impressive performances of DMRG in terms of
the correct scaling of entanglement of its underlying TN ansatz. The connection
between DMRG and MPS stands in the fact that the projector onto the effective
Hilbert space built along the DMRG iterations can be seen as an MPS. Thus, the
MPS in DMRG can be understood as not only a 1D state ansatz, but also a TN
representation of the RG ﬂows ([40, 61–65], as recently reviewed in [66]).
These results from the quantum information community fueled the search for
better algorithms allowing to optimize variationally the MPS tensors in order
to target speciﬁc states [67]. In this broader scenario, DMRG can be seen as
an alternating-least-square optimization method. Alternative methods include the
imaginary-time evolution from an initial state encoded as in an MPS base of the
time-evolving block decimation (TEBD) [68–71] and time-dependent variational
principle of MPS [72]. Note that these two schemes can be generalized to simulate
also the short out-of-equilibrium evolution of a slightly entangled state. MPS has
been used beyond ground states, for example, in the context of ﬁnite-temperature
and low-energy excitations based on MPS or its transfer matrix [61, 73–77].
MPS has further been used to characterize state violating the area law of
entanglement, such as ground states of critical systems, and ground states of
Hamiltonian with long-range interactions [56, 78–86].
The relevance of MPS goes far beyond their use as a numerical ansatz. There
have been numerous analytical studies that have led to MPS exact solutions such
as the Afﬂeck–Kennedy–Lieb–Tasaki (AKLT) state [87, 88], as well as its higher-
spin/higher-dimensional generalizations [39, 44, 89–92]. MPS has been crucial in
understanding the classiﬁcation of topological phases in 1D [93]. Here we will not
talk about these important results, but we will focus on numerical applications even
though the theory of MPS is still in full development and constantly new ﬁelds
emerge such as the application of MPS to 1D quantum ﬁeld theories [94].
1.2
Tensor Network States in Two Dimensions
The simulations of two-dimensional (2D) systems, where analytical solutions are
extremely rare and mean-ﬁeld approximations often fail to capture the long-range
ﬂuctuations, are much more complicated and tricky. For numeric simulations, exact
diagonalization can only access small systems; quantum Monte Carlo (QMC)
approaches are hindered by the notorious “negative sign” problem on frustrated
spin models and fermionic models away from half-ﬁlling, causing an exponential
increase of the computing time with the number of particles [95, 96].


---
*Page 16*

4
1
Introduction
While very elegant and extremely powerful for 1D models, the 2D version of
DMRG [97–100] suffers several severe restrictions. The ground state obtained by
DMRG is an MPS that is essentially a 1D state representation, satisfying the 1D
area law of entanglement entropy [52, 53, 55, 101]. However, due to the lack of
alternative approaches, 2D DMRG is still one of the most important 2D algorithms,
producing a large number of astonishing works including discovering the numeric
evidence of quantum spin liquid [102–104] on kagomé lattice (see, e.g., [105–110]).
Besides directly using DMRG in 2D, another natural way is to extend the MPS
representation, leading to the tensor product state [111], or projected entangled pair
state (PEPS) [112, 113]. While an MPS is made up of tensors aligned in a 1D chain,
a PEPS is formed by tensors located in a 2D lattice, forming a 2D TN. Thus, PEPS
can be regarded as one type of 2D tensor network states (TNS). Note the work of
Afﬂeck et al. [114] can be considered as a prototype of PEPS.
The network structure of the PEPS allows us to construct 2D states that strictly
fulﬁll the area law of entanglement entropy [115]. It indicates that PEPS can
efﬁciently represent 2D gapped states, and even the critical and topological states,
with only ﬁnite bond dimensions. Examples include resonating valence bond states
[115–119] originally proposed by Anderson et al. for superconductivity [120–124],
string-net states [125–127] proposed by Wen et al. for gapped topological orders
[128–134], and so on.
The network structure makes PEPS so powerful that it can encode difﬁcult
computational problems including non-deterministic polynomial (NP) hard ones
[115, 135, 136]. What is even more important for physics is that PEPS provides
an efﬁcient representation as a variational ansatz for calculating ground states of
2D models. However, obeying the area law costs something else: the computational
complexity rises [115, 135, 137]. For instance, after having determined the ground
state (either by construction or variation), one usually wants to extract the physical
information by computing, e.g., energies, order parameters, or entanglement. For an
MPS, most of the tasks are matrix manipulations and products which can be easily
done by classical computers. For PEPS, one needs to contract a TN stretching in a
2D plain, unfortunately, most of which cannot be neither done exactly or nor even
efﬁciently. The reason for this complexity is what brings the physical advantage to
PEPS: the network structure. Thus, algorithms to compute the TN contractions need
to be developed.
Other than dealing with the PEPS, TN provides a general way to different
problems where the cost functions are written as the contraction of a TN. A cost
function is usually a scalar function, whose maximal or minimal point gives the
solution of the targeted optimization problem. For example, the cost function of the
ground-state simulation can be the energy (e.g., [138, 139]); for ﬁnite-temperature
simulations, it can be the partition function or free energy (e.g., [140, 141]); for the
dimension reduction problems, it can be the truncation error or the distance before
and after the reduction (e.g., [69, 142, 143]); for the supervised machine learning
problems, it can be the accuracy (e.g., [144]). TN can then be generally considered
as a speciﬁc mathematical structure of the parameters in the cost functions.


---
*Page 17*

1.3
Tensor Renormalization Group and Tensor Network Algorithms
5
Before reaching the TN algorithms, there are a few more things worth men-
tioning. MPS and PEPS are not the only TN representations in one or higher
dimensions. As a generalization of PEPS, projected entangled simplex state was
proposed, where certain redundancy from the local entanglement is integrated to
reach a better efﬁciency [145, 146]. Except for a chain or 2D lattice, TN can be
deﬁned with some other geometries, such as trees or fractals. Tree TNS is one
example with non-trivial properties and applications [39, 89, 147–158]. Another
example is multi-scale entanglement renormalization ansatz (MERA) proposed by
Vidal [159–167], which is a powerful tool especially for studying critical systems
[168–173] and AdS/CFT theories ([174–180], see [181] for a general introduction
of CFT). TN has also been applied to compute exotic properties of the physical
models on fractal lattices [182, 183].
The second thing concerns the fact that some TNs can indeed be contracted
exactly. Tree TN is one example, since there is no loop of a tree graph. This might
be the reason that a tree TNS can only have a ﬁnite correlation length [151], thus
cannot efﬁciently access criticality in two dimensions. MERA modiﬁes the tree in
a brilliant way, so that the criticality can be accessed without giving up the exactly
contractible structure [164]. Some other exactly contractible examples have also
been found, where exact contractibility is not due to the geometry, but due to some
algebraic properties of the local tensors [184, 185].
Thirdly, TN can represent operators, usually dubbed as TN operators. Generally
speaking, a TN state can be considered as a linear mapping from the physical Hilbert
space to a scalar given by the contraction of tensors. A TN operator is regarded
as a mapping from the bra to the ket Hilbert space. Many algorithms explicitly
employ the TN operator form, including the matrix product operator (MPO) for
representing 1D many-body operators and mixed states, and for simulating 1D
systems in and out-of-equilibrium [186–196], tensor product operator (also called
projected entangled pair operators) in for higher-systems [140, 141, 143, 197–206],
and multiscale entangled renormalization ansatz [207–209].
1.3
Tensor Renormalization Group and Tensor Network
Algorithms
Since most of TNs cannot be contracted exactly (with #P-complete computational
complexity [136]), efﬁcient algorithms are strongly desired. In 2007, Levin and
Nave generalized the NRG idea to TN and proposed tensor renormalization group
(TRG) approach [142]. TRG consists of two main steps in each RG iteration:
contraction and truncation. In the contraction step, the TN is deformed by singular
value decomposition (SVD) of matrix in such a way that certain adjacent tensors
can be contracted without changing the geometry of the TN graph. This procedure
reduces the number of tensors N to N/ν, with ν an integer that depends on the


---
*Page 18*

6
1
Introduction
way of contracting. After reaching the ﬁxed point, one tensor represents in fact
the contraction of inﬁnite number of original tensors, which can be seen as the
approximation of the whole TN.
After each contraction, the dimensions of local tensors increase exponentially,
and then truncations are needed. To truncate in an optimized way, one should
consider the “environment,” a concept which appears in DMRG and is crucially
important in TRG-based schemes to determine how optimal the truncations are.
In the truncation step of Levin’s TRG, one only keeps the basis corresponding to
the χ-largest singular values from the SVD in the contraction step, with χ called
dimension cut-off. In other words, the environment of the truncation here is the
tensor that is decomposed by SVD. Such a local environment only permits local
optimizations of the truncations, which hinders the accuracy of Levin’s TRG on the
systems with long-range ﬂuctuations. Nevertheless, TRG is still one of the most
important and computationally cheap approaches for both classical (e.g., Ising and
Potts models) and quantum (e.g., Heisenberg models) simulations in two and higher
dimensions [184, 210–227]. It is worth mentioning that for 3D classical models, the
accuracy of the TRG algorithms has surpassed other methods [221, 225], such as
QMC. Following the contraction-and-truncation idea, the further developments of
the TN contraction algorithms concern mainly two aspects: more reasonable ways
of contracting and more optimized ways of truncating.
While Levin’s TRG “coarse-grains” a TN in an exponential way (the number
of tensors decreases exponentially with the renormalization steps), Vidal’s TEBD
scheme [68–71] implements the TN contraction with the help of MPS in a linearized
way [189]. Then, instead of using the singular values of local tensors, one uses the
entanglement of the MPS to ﬁnd the optimal truncation, meaning the environment is
a (non-local) MPS, leading to a better precision than Levin’s TRG. In this case, the
MPS at the ﬁxed point is the dominant eigenstate of the transfer matrix of the TN.
Another group of TRG algorithms, called corner transfer matrix renormalization
group (CTMRG) [228], are based on the corner transfer matrix idea originally
proposed by Baxter in 1978 [229], and developed by Nishina and Okunishi in 1996
[16]. In CTMRG, the contraction reduces the number of tensors in a polynomial
way and the environment can be considered as a ﬁnite MPS deﬁned on the boundary.
CTMRG has a compatible accuracy compared with TEBD.
With a certain way of contracting, there is still high ﬂexibility of choosing the
environment, i.e., the reference to optimize the truncations. For example, Levin’s
TRG and its variants [142, 210–212, 214, 221], the truncations are optimized by
local environments. The second renormalization group proposed by Xie et al. [221,
230] employs TRG to consider the whole TN as the environments.
Besides the contractions of TNs, the concept of environment becomes more
important for the TNS update algorithms, where the central task is to optimize the
tensors for minimizing the cost function. According to the environment, the TNS
update algorithms are categorized as the simple [141, 143, 210, 221, 231, 232],
cluster [141, 231, 233, 234], and full update [221, 228, 230, 235–240]. The simple


---
*Page 19*

1.4
Organization of Lecture Notes
7
update uses local environment, hence has the highest efﬁciency but limited accuracy.
The full update considers the whole TN as the environment, thus has a high
accuracy. Though with a better treatment of the environment, one drawback of
the full update schemes is the expensive computational cost, which strongly limits
the dimensions of the tensors one can keep. The cluster update is a compromise
between simple and full update, where one considers a reasonable subsystem as the
environment for a balance between the efﬁciency and precision.
It is worth mentioning that TN encoding schemes are found to bear close
relations to the techniques in multi-linear algebra (MLA) (also known as tensor
decompositions or tensor algebra; see a review [241]). MLA was originally targeted
on developing high-order generalization of the linear algebra (e.g., the higher-order
version of singular value or eigenvalue decomposition [242–245]), and now has
been successfully used in a large number of ﬁelds, including data mining (e.g.,
[246–250]), image processing (e.g., [251–254]), machine learning (e.g., [255]), and
so on. The interesting connections between the ﬁelds of TN and MLA (for example,
tensor-train decomposition [256] and matrix product state representation) open new
paradigm for the interdisciplinary researches that cover a huge range in sciences.
1.4
Organization of Lecture Notes
Our lectures are organized as following. In Chap. 2, we will introduce the basic
concepts and deﬁnitions of tensor and TN states/operators, as well as their graphic
representations. Several frequently used architectures of TN states will be intro-
duced, including matrix product state, tree TN state, and PEPS. Then the general
form of TN, the gauge degrees of freedom, and the relations to quantum entangle-
ment will be discussed. Three special types of TNs that can be exactly contracted
will be exempliﬁed in the end of this chapter.
In Chap. 3, the contraction algorithms for 2D TNs will be reviewed. We will start
with several physical problems that can be transformed to the 2D TN contractions,
including the statistics of classical models, observation of TN states, and the
ground-state/ﬁnite-temperature simulations of 1D quantum models. Three paradigm
algorithms, namely TRG, TEBD, and CTMRG, will be presented. These algorithms
will be further discussed from the aspect of the exactly contractible TNs.
In Chap. 4, we will concentrate on the algorithms of PEPS for simulating the
ground states of 2D quantum lattice models. Two general schemes will be explained,
which are the variational approaches and the imaginary-time evolution. According
to the choice of environment for updating the tensors, we will explain the simple,
cluster, and full update algorithms. Particularly in the full update, the contraction
algorithms of 2D TNs presented in Chap. 3 will play a key role to compute the non-
local environments.


---
*Page 20*

8
1
Introduction
In Chap. 5, a special topic about the underlying relations between the TN
methods and the MLA will be given. We will start from the canonicalization
of MPS in one dimension, and then generalize to the super-orthogonalization of
PEPS in higher dimensions. The super-orthogonalization that gives the optimal
approximation of a tree PEPS in fact extends the Tucker decomposition from single
tensor to tree TN. Then the relation between the contraction of tree TNs and the
rank-1 decomposition will be discussed, which further leads to the “zero-loop”
approximation of the PEPS on the regular lattice. Finally, we will revisit the inﬁnite
DMRG (iDMRG), inﬁnite TEBD (iTEBD), and inﬁnite CTMRG in a uniﬁed picture
indicated by the tensor ring decomposition, which is a higher-rank extension of the
rank-1 decomposition.
In Chap. 6, we will revisit the TN simulations of quantum lattice models
from the ideas explained in Chap. 5. Such a perspective, dubbed as quantum
entanglement simulation (QES), shows a uniﬁed picture for simulating one- and
higher-dimensional quantum models at both zero [234, 257] and ﬁnite [258]
temperatures. The QES implies an efﬁcient way of investigating inﬁnite-size many-
body systems by simulating few-body models with classical computers or artiﬁcial
quantum platforms. In Chap. 7, a brief summary is given.
As TN makes a fundamental language and efﬁcient tool to a huge range of
subjects, which has been advancing in an extremely fast speed, we cannot cover
all the related progresses in this review. We will concentrate on the algorithms
for TN contractions and the closely related applications. The topics that are not
discussed or are only brieﬂy mentioned in this review include: the hybridization
of TN with other methods such as density functional theories and ab initio
calculations in quantum chemistry [259–268], the dynamic mean-ﬁeld theory
[269–278], and the expansion/perturbation theories [274, 279–284]; the TN algo-
rithms that are less related to the contraction problems such as time-dependent
variational principle [72, 285], the variational TN state methods [76, 240, 286–
291], and so on; the TN methods for interacting fermions [167, 266, 292–306],
quantum ﬁeld theories [307–313], topological states and exotic phenomena in many-
body systems (e.g., [105, 106, 108, 110, 116–119, 125, 126, 306, 314–329]), the
open/dissipative systems [186, 190–192, 194, 330–334], quantum information and
quantum computation [44, 335–344], machine learning [144, 345–360], and other
classical computational problems [361–366]; the TN theories/algorithms with non-
trivial statistics and symmetries [125–127, 303, 309, 314, 319, 367–380]; several
latest improvements of the TN algorithms for higher efﬁciency and accuracy
[236, 239, 381–385].
References
1. C.D. Sherrill, Frontiers in electronic structure theory. J. Chem. Phys. 132, 110902 (2010)
2. K. Burke, Perspective on density functional theory. J. Chem. Phys. 136, 150901 (2012)


---
*Page 21*

References
9
3. A.D. Becke, Perspective: ﬁfty years of density-functional theory in chemical physics. J.
Chem. Phys. 140, 18A301 (2014)
4. C.P. Robert, Monte Carlo Methods (Wiley, New York, 2004)
5. P.A. Lee, N. Nagaosa, X.-G. Wen, Doping a Mott insulator: physics of high-temperature
superconductivity. Rev. Mod. Phys. 78, 17–85 (2006)
6. B. Keimer, S.A. Kivelson, M.R. Norman, S. Uchida, J. Zaanen, From quantum matter to
high-temperature superconductivity in copper oxides. Nature 518(7538), 179 (2015)
7. R.B. Laughlin, Nobel lecture: fractional quantization. Rev. Mod. Phys. 71, 863–874 (1999)
8. H.A. Kramers, G.H. Wannier, Statistics of the two-dimensional ferromagnet. Part I. Phys.
Rev. 60(3), 252 (1941)
9. H.A. Kramers, G.H. Wannier, Statistics of the two-dimensional ferromagnet. Part II. Phys.
Rev. 60(3), 263 (1941)
10. R.J. Baxter, Dimers on a rectangular lattice. J. Math. Phys. 9, 650 (1968)
11. M.P. Nightingale, H.W.J. Blöte, Gap of the linear spin-1 Heisenberg antiferromagnet: a Monte
Carlo calculation. Phys. Rev. B 33, 659–661 (1986)
12. S.B. Kelland, Estimates of the critical exponent β for the Potts model using a variational
approximation. Can. J. Phys. 54(15), 1621–1626 (1976)
13. S.K. Tsang, Square lattice variational approximations applied to the Ising model. J. Stat. Phys.
20(1), 95–114 (1979)
14. B. Derrida, M.R. Evans, Exact correlation functions in an asymmetric exclusion model with
open boundaries. J. Phys. I 3(2), 311–322 (1993)
15. B. Derrida, M.R. Evans, V. Hakim, V. Pasquier, Exact solution of a 1D asymmetric exclusion
model using a matrix formulation. J. Phys. A Math. Gen. 26(7), 1493 (1993)
16. T. Nishino, K. Okunishi, Corner transfer matrix renormalization group method. J. Phys. Soc.
Jpn. 65, 891–894 (1996)
17. T. Nishino, K. Okunishi, M. Kikuchi, Numerical renormalization group at criticality. Phys.
Lett. A 213(1–2), 69–72 (1996)
18. T. Nishino, Y. Hieida, K. Okunishi, N. Maeshima, Y. Akutsu, A. Gendiar, Two-dimensional
tensor product variational formulation. Prog. Theor. Phys. 105(3), 409–417 (2001)
19. T. Nishino, K. Okunishi, Y. Hieida, N. Maeshima, Y. Akutsu, Self-consistent tensor product
variational approximation for 3D classical models. Nucl. Phys. B 575(3), 504–512 (2000)
20. T. Nishino, K. Okunishi, A density matrix algorithm for 3D classical models. J. Phys. Soc.
Jpn. 67(9), 3066–3072 (1998)
21. K. Okunishi, T. Nishino, Kramers-Wannier approximation for the 3D Ising model. Prog.
Theor. Phys. 103(3), 541–548 (2000)
22. T. Nishino, K. Okunishi, Numerical latent heat observation of the q = 5 Potts model (1997).
arXiv preprint cond-mat/9711214
23. K.G. Willson, The renormalization group: critical phenomena and the Kondo problem. Rev.
Mod. Phys. 47, 773 (1975)
24. M.D. Kovarik, Numerical solution of large S = 1/2 and S = 1 Heisenberg antiferromagnetic
spin chains using a truncated basis expansion. Phys. Rev. B 41, 6889–6898 (1990)
25. T. Xiang, G.A. Gehring, Real space renormalisation group study of Heisenberg spin chain. J.
Magn. Magn. Mater. 104, 861–862 (1992)
26. T. Xiang, G.A. Gehring, Numerical solution of S = 1 antiferromagnetic spin chains using a
truncated basis expansion. Phys. Rev. B 48, 303–310 (1993)
27. J. Kondo, Resistance minimum in dilute magnetic alloys. Prog. Theor. Phys. 32, 37–49 (1964)
28. S.R. White, R.M. Noack, Real-space quantum renormalization groups. Phys. Rev. Lett. 68,
3487 (1992)
29. S.R. White, Density matrix formulation for quantum renormalization groups. Phys. Rev. Lett.
69, 2863 (1992)
30. S.R. White, Density-matrix algorithms for quantum renormalization groups. Phys. Rev. B 48,
10345–10356 (1993)
31. R.J. Bursill, T. Xiang, G.A. Gehring, The density matrix renormalization group for a quantum
spin chain at non-zero temperature. J. Phys. Condens. Matter 8(40), L583 (1996)


---
*Page 22*

10
1
Introduction
32. S. Moukouri, L.G. Caron, Thermodynamic density matrix renormalization group study of the
magnetic susceptibility of half-integer quantum spin chains. Phys. Rev. Lett. 77, 4640–4643
(1996)
33. X.-Q. Wang, T. Xiang, Transfer-matrix density-matrix renormalization-group theory for
thermodynamics of one-dimensional quantum systems. Phys. Rev. B 56(9), 5061 (1997)
34. N. Shibata, Thermodynamics of the anisotropic Heisenberg chain calculated by the density
matrix renormalization group method. J. Phys. Soc. Jpn. 66(8), 2221–2223 (1997)
35. K.A. Hallberg, Density-matrix algorithm for the calculation of dynamical properties of low-
dimensional systems. Phys. Rev. B 52, R9827–R9830 (1995)
36. S. Ramasesha, S.K. Pati, H.R. Krishnamurthy, Z. Shuai, J.L. Brédas, Low-lying electronic
excitations and nonlinear optic properties of polymers via symmetrized density matrix
renormalization group method. Synth. Met. 85(1), 1019–1022 (1997)
37. T.D. Kühner, S.R. White, Dynamical correlation functions using the density matrix renormal-
ization group. Phys. Rev. B 60, 335–343 (1999)
38. E. Jeckelmann, Dynamical density-matrix renormalization-group method. Phys. Rev. B 66,
045114 (2002)
39. M. Fannes, B. Nachtergaele, R.F. Werner, Ground states of VBS models on Cayley trees. J.
Stat. Phys. 66, 939 (1992)
40. M. Fannes, B. Nachtergaele, R.F. Werner, Finitely correlated states on quantum spin chains.
Commun. Math. Phys. 144, 443–490 (1992)
41. A. Klumper, A. Schadschneider, J. Zittartz, Equivalence and solution of anisotropic spin-1
models and generalized t-J fermion models in one dimension. J. Phys. A Math. Gen. 24(16),
L955 (1991)
42. T.J. Osborne, M.A. Nielsen, Entanglement, quantum Phase transitions, and density matrix
renormalization. Quantum Inf. Process 1(1), 45–53 (2002)
43. G. Vidal, Efﬁcient classical simulation of slightly entangled quantum computations. Phys.
Rev. Lett. 91, 147902 (2003)
44. F. Verstraete, D. Porras, J.I. Cirac, Density matrix renormalization group and periodic
boundary conditions: a quantum information perspective. Phys. Rev. Lett. 93, 227205 (2004)
45. G. Vidal, Efﬁcient simulation of one-dimensional quantum many-body systems. Phys. Rev.
Lett. 93, 040502 (2004)
46. C.H. Bennett, D.P. DiVincenzo, Quantum information and computation. Nature 404, 247–255
(2000)
47. M.A. Nielsen, I. Chuang, Quantum Computation and Quantum Communication (Cambridge
University Press, Cambridge, 2000)
48. L. Amico, R. Fazio, A. Osterloh, V. Vedral, Entanglement in many-body systems. Rev. Mod.
Phys. 80, 517 (2008)
49. R. Horodecki, P. Horodecki, M. Horodecki, K. Horodecki, Quantum entanglement. Rev. Mod.
Phys. 81, 865 (2009)
50. M.B. Hastings, Locality in quantum and Markov dynamics on lattices and networks. Phys.
Rev. Lett. 93, 140402 (2004)
51. M.B. Hastings, Lieb-Schultz-Mattis in higher dimensions. Phys. Rev. B 69, 104431 (2004)
52. M.B. Hastings, An area law for one-dimensional quantum systems. J. Stat. Mech. Theory
Exp. 2007(08), P08024 (2007)
53. Y.-C. Huang, Classical Simulation of Quantum Many-body Systems (University of California,
California, 2015)
54. J.D. Bekenstein, Black holes and entropy. Phys. Rev. D 7, 2333–2346 (1973)
55. M. Srednicki, Entropy and area. Phys. Rev. Lett. 71, 666–669 (1993)
56. J.I. Latorre, E. Rico, G. Vidal, Ground state entanglement in quantum spin chains. Quantum
Inf. Comput. 4, 48 (2004)
57. P. Calabrese, J. Cardy, Entanglement entropy and quantum ﬁeld theory. J. Stat. Mech. Theor.
Exp. 2004(06) (2004)
58. M.B. Plenio, J. Eisert, J. Dreissig, M. Cramer, Entropy, entanglement, and area: analytical
results for harmonic lattice systems. Phys. Rev. Lett. 94, 060503 (2005)


---
*Page 23*

References
11
59. J. Eisert, M. Cramer, M.B. Plenio, Colloquium: area laws for the entanglement entropy. Rev.
Mod. Phys. 82, 277 (2010)
60. F. Verstraete, J.I. Cirac, Matrix product states represent ground states faithfully. Phys. Rev. B
73, 094423 (2006)
61. S. Östlund, S. Rommer, Thermodynamic limit of density matrix renormalization. Phys. Rev.
Lett. 75, 3537 (1995)
62. S. Rommer, S. Östlund, Class of ansatz wave functions for one-dimensional spin systems and
their relation to the density matrix renormalization group. Phys. Rev. B 55, 2164 (1997)
63. J. Dukelsky, M.A. Martín-Del´gado, T. Nishino, G. Sierra, Equivalence of the variational
matrix product method and the density matrix renormalization group applied to spin chains.
Europhys. Lett. 43, 457 (1998)
64. I.P. McCulloch, From density-matrix renormalization group to matrix product states. J. Stat.
Mech. Theory Exp. 2007(10), P10014 (2007)
65. U. Schollwöck, The density-matrix renormalization group in the age of matrix product states.
Ann. Phys. 326, 96–192 (2011)
66. D. Pérez-García, F. Verstraete, M.M. Wolf, J.I. Cirac, Matrix Product State Representations.
Quantum Inf. Comput. 7, 401 (2007)
67. F. Verstraete, V. Murg, J.I. Cirac, Matrix product states, projected entangled pair states, and
variational renormalization group methods for quantum spin systems. Adv. Phys. 57, 143–224
(2008)
68. G. Vidal, Efﬁcient classical simulation of slightly entangled quantum computations. Phys.
Rev. Lett. 91, 147902 (2003)
69. G. Vidal, Efﬁcient simulation of one-dimensional quantum many-body systems. Phys. Rev.
Lett. 93, 040502 (2004)
70. G. Vidal, Classical simulation of inﬁnite-size quantum lattice systems in one spatial dimen-
sion. Phys. Rev. Lett. 98, 070201 (2007)
71. R. Orús, G. Vidal, Inﬁnite time-evolving block decimation algorithm beyond unitary evolu-
tion. Phys. Rev. B 78, 155117 (2008)
72. J. Haegeman, J.I. Cirac, T.J. Osborne, I. Pižorn, H. Verschelde, F. Verstraete, Time-dependent
variational principle for quantum lattices. Phys. Rev. Lett. 107, 070601 (2011)
73. E. Bartel, A. Schadschneider, J. Zittartz, Excitations of anisotropic spin-1 chains with matrix
product ground state. Eur. Phys. J. B Condens. Matter Complex Syst. 31(2), 209–216 (2003)
74. S.-G. Chung, L.-H. Wang, Entanglement perturbation theory for the elementary excitation in
one dimension. Phys. Lett. A 373(26), 2277–2280 (2009)
75. B. Pirvu, J. Haegeman, F. Verstraete, Matrix product state based algorithm for determining
dispersion relations of quantum spin chains with periodic boundary conditions. Phys. Rev. B
85, 035130 (2012)
76. J. Haegeman, B. Pirvu, D.J. Weir, J.I. Cirac, T.J. Osborne, H. Verschelde, F. Verstraete,
Variational matrix product ansatz for dispersion relations. Phys. Rev. B 85, 100408 (2012)
77. V. Zauner-Stauber, L. Vanderstraeten, J. Haegeman, I.P. McCulloch, F. Verstraete, Topological
nature of spinons and holons: elementary excitations from matrix product states with
conserved symmetries. Phys. Rev. B 97, 235155 (2018)
78. C. Holzhey, F. Larsen, F. Wilczek, Geometric and renormalized entropy in conformal ﬁeld
theory. Nucl. Phys. B 424(3), 443–467 (1994)
79. G. Vidal, J.I. Latorre, E. Rico, A. Kitaev, Entanglement in quantum critical phenomena. Phys.
Rev. Lett. 90, 227902 (2003)
80. L. Tagliacozzo, T. de Oliveira, S. Iblisdir, J.I. Latorre, Scaling of entanglement support for
matrix product states. Phys. Rev. B 78, 024410 (2008)
81. F. Pollmann, S. Mukerjee, A.M. Turner, J.E. Moore, Theory of ﬁnite-entanglement scaling at
one-dimensional quantum critical points. Phys. Rev. Lett. 102, 255701 (2009)
82. F. Pollmann, J.E. Moore, Entanglement spectra of critical and near-critical systems in one
dimension. New J. Phys. 12(2), 025006 (2010)
83. V. Stojevic, J. Haegeman, I.P. McCulloch, L. Tagliacozzo, F. Verstraete, Conformal data from
ﬁnite entanglement scaling. Phys. Rev. B 91, 035120 (2015)


---
*Page 24*

12
1
Introduction
84. S.-J. Ran, C. Peng, W. Li, M. Lewenstein, G. Su, Criticality in two-dimensional quantum
systems: Tensor network approach. Phys. Rev. B 95, 155114 (2017)
85. P. Hauke, L. Tagliacozzo, Spread of correlations in long-range interacting quantum systems.
Phys. Rev. Lett. 111(20), 207202 (2013)
86. T. Koffel, M. Lewenstein, L. Tagliacozzo, Entanglement entropy for the long-range Ising
chain in a transverse ﬁeld. Phys. Rev. Lett. 109(26), 267203 (2012)
87. I. Afﬂeck, T. Kennedy, E.H. Lieb, H. Tasaki, Rigorous results on valence-bond ground states
in antiferromagnets. Phys. Rev. Lett. 59, 799 (1987)
88. I. Afﬂeck, T. Kennedy, E.H. Lieb, H. Tasaki, Valence bond ground states in isotropic quantum
antiferromagnets. Commun. Math. Phys. 115, 477 (1988)
89. H. Niggemann, A. Klümper, J. Zittartz, Quantum phase transition in spin-3/2 systems on the
hexagonal lattice-optimum ground state approach. Z. Phys. B 104, 103 (1997)
90. H. Niggemann, A. Klümper, J. Zittartz, Ground state phase diagram of a spin-2 antiferromag-
net on the square lattice. Eur. Phys. J. B Condens. Matter Complex Syst. 13, 15 (2000)
91. F. Verstraete, M.A. Martin-Delgado, J.I. Cirac, Diverging entanglement length in gapped
quantum spin systems. Phys. Rev. Lett. 92, 087201 (2004)
92. V. Karimipour, L. Memarzadeh, Matrix product representations for all valence bond states.
Phys. Rev. B 77, 094416 (2008)
93. F. Pollmann, A.M. Turner, Detection of symmetry-protected topological phases in one
dimension. Phys. Rev. B 86(12), 125441 (2012)
94. F. Verstraete, J.I. Cirac, Continuous matrix product states for quantum ﬁelds. Phys. Rev. Lett.
104, 190405 (2010)
95. S.R. White, D.J. Scalapino, R.L. Sugar, E.Y. Loh, J.E. Gubernatis, R.T. Scalettar, Numerical
study of the two-dimensional Hubbard model. Phys. Rev. B 40, 506–516 (1989).
96. M. Troyer, U.J. Wiese, Computational complexity and fundamental limitations to fermionic
quantum Monte Carlo simulations. Phys. Rev. Lett. 94, 170201 (2005)
97. S.R. White, Spin gaps in a frustrated Heisenberg model for cav4O9. Phys. Rev. Lett. 77,
3633–3636 (1996)
98. S.R. White, D.J. Scalapino, Density matrix renormalization group study of the striped phase
in the 2D t-J model. Phys. Rev. Lett. 80, 1272 (1998)
99. T. Xiang, J.-Z. Lou, Z.-B. Su, Two-dimensional algorithm of the density-matrix renormaliza-
tion group. Phys. Rev. B 64, 104414 (2001)
100. E.M. Stoudenmire, S.R. White, Studying two-dimensional systems with the density matrix
renormalization group. Annu. Rev. Condens. Matter Phys. 3, 111–128 (2012)
101. N. Schuch, M.M. Wolf, F. Verstraete, J.I. Cirac, Entropy scaling and simulability by matrix
product states. Phys. Rev. Lett. 100, 030504 (2008)
102. F. Mila, Quantum spin liquids. Eur. J. Phys. 21(6), 499 (2000)
103. L. Balents, Spin liquids in frustrated magnets. Nature 464, 199 (2010)
104. L. Savary, L. Balents, Quantum spin liquids: a review. Rep. Prog. Phys. 80, 016502 (2017)
105. H.C. Jiang, Z.Y. Weng, D.N. Sheng, Density matrix renormalization group numerical study
of the kagome antiferromagnet. Phys. Rev. Lett. 101, 117203 (2008)
106. S. Yan, D.A. Huse, S.R. White, Spin-liquid ground state of the S = 1/2 kagome Heisenberg
antiferromagnet. Science 332(6034), 1173–1176 (2011)
107. H.-C. Jiang, Z.-H. Wang, L. Balents, Identifying topological order by entanglement entropy.
Nat. Phys. 8, 902–905 (2012)
108. S. Depenbrock, I.P. McCulloch, U. Schollwöck, Nature of the spin-liquid ground state of the
S = 1/2 Heisenberg model on the kagome lattice. Phys. Rev. Lett. 109, 067201 (2012)
109. S. Nishimoto, N. Shibata, C. Hotta, Controlling frustrated liquids and solids with an applied
ﬁeld in a kagome Heisenberg antiferromagnet. Nat. Commun. 4, 2287 (2012)
110. Y.-C. He, M.P. Zaletel, M. Oshikawa, F. Pollmann, Signatures of Dirac cones in a DMRG
study of the kagome Heisenberg model. Phys. Rev. X 7, 031020 (2017)
111. T. Nishino, Y. Hieida, K. Okunishi, N. Maeshima, Y. Akutsu, A. Gendiar, Two-dimensional
tensor product variational formulation. Prog. Theor. Phys. 105(3), 409–417 (2001)


---
*Page 25*

References
13
112. F. Verstraete, J.I. Cirac, Valence-bond states for quantum computation. Phys. Rev. A 70,
060302 (2004)
113. F. Verstraete, J.I. Cirac, Renormalization algorithms for quantum-many body systems in two
and higher dimensions (2004). arXiv preprint:cond-mat/0407066
114. I. Afﬂeck, T. Kennedy, E. H. Lieb, H. Tasaki, Valence bond ground states in isotropic quantum
antiferromagnets. Commun. Math. Phys. 115(3), 477–528 (1988)
115. F. Verstraete, M.M. Wolf, D. Perez-Garcia, J.I. Cirac, Criticality, the area law, and the
computational power of projected entangled pair states. Phys. Rev. Lett. 96, 220601 (2006)
116. D. Poilblanc, N. Schuch, D. Pérez-García, J.I. Cirac, Topological and entanglement properties
of resonating valence bond wave functions. Phys. Rev. B 86, 014404 (2012)
117. N. Schuch, D. Poilblanc, J.I. Cirac, D. Pérez-García, Resonating valence bond states in the
PEPS formalism. Phys. Rev. B 86, 115108 (2012)
118. L. Wang, D. Poilblanc, Z.-C. Gu, X.-G Wen, F. Verstraete, Constructing a gapless spin-liquid
state for the spin-1/2 j1–j2 Heisenberg model on a square lattice. Phys. Rev. Lett. 111,
037202 (2013)
119. D. Poilblanc, P. Corboz, N. Schuch, J.I. Cirac, Resonating-valence-bond superconductors with
fermionic projected entangled pair states. Phys. Rev. B 89(24), 241106 (2014)
120. P.W. Anderson, Resonating valence bonds: a new kind of insulator? Mater. Res. Bull. 8(2),
153–160 (1973)
121. P.W. Anderson, On the ground state properties of the anisotropic triangular antiferromagnet.
Philos. Mag. 30, 432 (1974)
122. P.W. Anderson, The resonating valence bond state in La2CuO4 and superconductivity. Science
235, 1196 (1987)
123. G. Baskaran, Z. Zou, P.W. Anderson, The resonating valence bond state and high-Tc
superconductivity—a mean ﬁeld theory. Solid State Commun. 63(11), 973–976 (1987)
124. P.W. Anderson, G. Baskaran, Z. Zou, T. Hsu, Resonating-valence-bond theory of phase
transitions and superconductivity in La2CuO4-based compounds. Phys. Rev. Lett. 58, 2790–
2793 (1987)
125. Z.C. Gu, M. Levin, B. Swingle, X.G. Wen, Tensor-product representations for string-net
condensed states. Phys. Rev. B 79, 085118 (2009)
126. O. Buerschaper, M. Aguado, G. Vidal, Explicit tensor network representation for the ground
states of string-net models. Phys. Rev. B 79, 085119 (2009)
127. X. Chen, B. Zeng, Z.C. Gu, I.L. Chuang, X.G. Wen, Tensor product representation of a
topological ordered phase: necessary symmetry conditions. Phys. Rev. B 82, 165119 (2010)
128. X.G. Wen, Vacuum degeneracy of chiral spin states in compactiﬁed space. Phys. Rev. B 40,
7387 (1989)
129. X.G. Wen, Topological orders in rigid states. Int. J. Mod. Phys. B 4, 239 (1990)
130. X.G. Wen, Q. Niu, Ground-state degeneracy of the fractional quantum Hall states in the
presence of a random potential and on high-genus Riemann surfaces. Phys. Rev. B 41, 9377
(1990)
131. X.G. Wen, Topological orders and edge excitations in fractional quantum Hall states. Adv.
Phys. 44, 405 (1995)
132. M. Levin, X.G. Wen, String-net condensation: a physical mechanism for topological phases.
Phys. Rev. B 71, 045110 (2005)
133. M. Levin, X.G. Wen, Colloquium: photons and electrons as emergent phenomena. Rev. Mod.
Phys. 77, 871–879 (2005)
134. X.G. Wen, An introduction to quantum order, string-net condensation, and emergence of light
and fermions. Ann. Phys. 316, 1–29 (2005)
135. N. Schuch, M.M. Wolf, F. Verstraete, J.I. Cirac, Computational complexity of projected
entangled pair states. Phys. Rev. Lett. 98, 140506 (2007)
136. A. García-Sáez, J.I. Latorre, An exact tensor network for the 3SAT problem (2011). arXiv
preprint: 1105.3201
137. T. Hucklea, K. Waldherra, T. Schulte-Herbrüggen. Computations in quantum tensor networks.
Linear Algebra Appl. 438, 750–781 (2013)


---
*Page 26*

14
1
Introduction
138. A.W. Sandvik, G. Vidal, Variational quantum Monte Carlo simulations with tensor-network
states. Phys. Rev. Lett. 99, 220602 (2007)
139. L. Vanderstraeten, J. Haegeman, P. Corboz, F. Verstraete, Gradient methods for variational
optimization of projected entangled-pair states. Phys. Rev. B 94, 155123 (2016)
140. P. Czarnik, L. Cincio, J. Dziarmaga, Projected entangled pair states at ﬁnite temperature:
imaginary time evolution with ancillas. Phys. Rev. B 86, 245101 (2012)
141. S.J. Ran, B. Xi, T. Liu, G. Su, Theory of network contractor dynamics for exploring
thermodynamic properties of two-dimensional quantum lattice models. Phys. Rev. B 88,
064407 (2013)
142. M. Levin, C.P. Nave, Tensor renormalization group approach to two-dimensional classical
lattice models. Phys. Rev. Lett. 99, 120601 (2007)
143. S.J. Ran, W. Li, B. Xi, Z. Zhang, G. Su, Optimized decimation of tensor networks with super-
orthogonalization for two-dimensional quantum lattice models. Phys. Rev. B 86, 134429
(2012)
144. E. Stoudenmire, D.J. Schwab, Supervised learning with tensor networks, in Advances in
Neural Information Processing Systems (2016), pp. 4799–4807
145. Z.-Y. Xie, J. Chen, J.-F. Yu, X. Kong, B. Normand, T. Xiang, Tensor renormalization of
quantum many-body systems using projected entangled simplex states. Phys. Rev. X 4(1),
011025 (2014)
146. H.-J. Liao, Z.-Y. Xie, J. Chen, Z.-Y. Liu, H.-D. Xie, R.-Z. Huang, B. Normand, T. Xiang,
Gapless spin-liquid ground state in the S = 1/2 kagome antiferromagnet. Phys. Rev. Lett.
118(13), 137202 (2017)
147. B. Friedman, A density matrix renormalization group approach to interacting quantum
systems on Cayley trees. J. Phys. Condens. Matter 9, 9021 (1997)
148. M. Lepetit, M. Cousy, G.M. Pastor, Density-matrix renormalization study of the Hubbard
model on a Bethe lattice. Eur. Phys. J. B Condens. Matter Complex Syst. 13, 421 (2000)
149. M.A. Martin-Delgado, J. Rodriguez-Laguna, G. Sierra, Density-matrix renormalization-
group study of excitons in dendrimers. Phys. Rev. B 65, 155116 (2002)
150. Y.-Y. Shi, L.M. Duan, G. Vidal, Classical simulation of quantum many-body systems with a
tree tensor network. Phys. Rev. A 74, 022320 (2006)
151. D. Nagaj, E. Farhi, J. Goldstone, P. Shor, I. Sylvester, Quantum transverse-ﬁeld Ising model
on an inﬁnite tree from matrix product states. Phys. Rev. B 77, 214431 (2008)
152. L. Tagliacozzo, G. Evenbly, G. Vidal, Simulation of two-dimensional quantum systems using
a tree tensor network that exploits the entropic area law. Phys. Rev. B 80, 235127 (2009)
153. V. Murg, F. Verstraete, Ö. Legeza, R.M. Noack, Simulating strongly correlated quantum
systems with tree tensor networks. Phys. Rev. B 82, 205105 (2010)
154. W. Li, J. von Delft, T. Xiang, Efﬁcient simulation of inﬁnite tree tensor network states on the
Bethe lattice. Phys. Rev. B 86, 195137 (2012)
155. N. Nakatani, G.K.L. Chan, Efﬁcient tree tensor network states (TTNS) for quantum chem-
istry: generalizations of the density matrix renormalization group algorithm. J. Chem. Phys.
138, 134113 (2013)
156. I. Pižorn, F. Verstraete, R.M. Konik, Tree tensor networks and entanglement spectra. Phys.
Rev. B 88, 195102 (2013)
157. M. Gerster, P. Silvi, M. Rizzi, R. Fazio, T. Calarco, S. Montangero, Unconstrained tree tensor
network: an adaptive gauge picture for enhanced performance. Phys. Rev. B 90, 125154
(2014)
158. V. Murg, F. Verstraete, R. Schneider, P.R. Nagy, Ö. Legeza. Tree tensor network state with
variable tensor order: an efﬁcient multireference method for strongly correlated systems. J.
Chem. Theory Comput. 11, 1027–1036 (2015)
159. G. Vidal, Entanglement renormalization. Phys. Rev. Lett. 99, 220405 (2007)
160. G. Vidal, Class of quantum many-body states that can be efﬁciently simulated. Phys. Rev.
Lett. 101, 110501 (2008)
161. L. Cincio, J. Dziarmaga, M.M. Rams, Multiscale entanglement renormalization ansatz in two
dimensions: quantum Ising model. Phys. Rev. Lett. 100, 240603 (2008)


---
*Page 27*

References
15
162. G. Evenbly, G. Vidal, Entanglement renormalization in two spatial dimensions. Phys. Rev.
Lett. 102, 180406 (2009)
163. M. Aguado, G. Vidal, Entanglement renormalization and topological order. Phys. Rev. Lett.
100, 070404 (2008)
164. G. Evenbly, G. Vidal, Algorithms for entanglement renormalization. Phys. Rev. B 79, 144108
(2009)
165. P. Corboz, G. Vidal, Fermionic multiscale entanglement renormalization ansatz. Phys. Rev. B
80, 165129 (2009)
166. G. Evenbly, G. Vidal, Entanglement renormalization in free bosonic systems: real-space
versus momentum-space renormalization group transforms. New J. Phys. 12, 025007 (2010)
167. G. Evenbly, G. Vidal, Entanglement renormalization in noninteracting fermionic systems.
Phys. Rev. B 81, 235102 (2010)
168. R.N.C. Pfeifer, G. Evenbly, G. Vidal, Entanglement renormalization, scale invariance, and
quantum criticality. Phys. Rev. A 79, 040301 (2009)
169. S. Montangero, M. Rizzi, V. Giovannetti, R. Fazio, Critical exponents with a multiscale
entanglement renormalization Ansatz channel. Phys. Rev. B 80, 113103 (2009)
170. G. Evenbly, P. Corboz, G. Vidal, Nonlocal scaling operators with entanglement renormaliza-
tion. Phys. Rev. B 82, 132411 (2010)
171. P. Silvi, V. Giovannetti, P. Calabrese, G.E. Santoro1, R. Fazio, Entanglement renormalization
and boundary critical phenomena. J. Stat. Mech. 2010(3), L03001 (2010)
172. G. Evenbly, G. Vidal, Quantum Criticality with the Multi-scale Entanglement Renormaliza-
tion Ansatz. Strongly Correlated Syst. Springer 176, 99–130 (2013)
173. J.C. Bridgeman, A. O’Brien, S.D. Bartlett, A.C. Doherty, Multiscale entanglement renormal-
ization ansatz for spin chains with continuously varying criticality. Phys. Rev. B 91, 165129
(2015)
174. G. Evenbly, G. Vidal, Tensor network states and geometry. J. Stat. Phys. 145, 891–918 (2011)
175. B. Swingle, Entanglement renormalization and holography. Phys. Rev. D 86, 065007 (2012)
176. C. Beny, Causal structure of the entanglement renormalization ansatz. New J. Phys. 15,
023020 (2013)
177. X.L.
Qi,
Exact
holographic
mapping
and
emergent
space-time
geometry
(2013).
arXiv:1309.6282
178. M. Miyaji, T. Numasawa, N. Shiba, T. Takayanagi, K. Watanabe, Continuous multiscale
entanglement renormalization ansatz as holographic surface-state correspondence. Phys. Rev.
Lett. 115, 171602 (2015)
179. N. Bao, C.J. Cao, S.M. Carroll, A. Chatwin-Davies, N. Hunter-Jones, J. Pollack, G.N.
Remmen, Consistency conditions for an AdS multiscale entanglement renormalization ansatz
correspondence. Phys. Rev. D 91, 125036 (2015)
180. B. Czech, L. Lamprou, S. McCandlish, J. Sully, Integral geometry and holography (2015).
arXiv:1505.05515
181. M. Natsuume, Ads/CFT duality user guide, in Lecture Notes in Physics, vol. 903 (Springer,
Tokyo, 2015)
182. J. Genzor, A. Gendiar, T. Nishino, Phase transition of the Ising model on a fractal lattice.
Phys. Rev. E 93, 012141 (2016)
183. M. Wang, S.-J. Ran, T. Liu, Y. Zhao, Q.-R. Zheng, G. Su, Phase diagram and exotic spin-spin
correlations of anisotropic Ising model on the Sierpi´nski gasket. Eur. Phys. J. B Condens.
Matter Complex Syst. 89(2), 1–10 (2016)
184. R. König, B.W. Reichardt, G. Vidal, Exact entanglement renormalization for string-net
models. Phys. Rev. B 79, 195123 (2009)
185. S.J. Denny, J.D. Biamonte, D. Jaksch, S.R. Clark, Algebraically contractible topological
tensor network states. J. Phys. A Math. Theory 45, 015309 (2012)
186. F. Verstraete, J.J. García-Ripoll, J.I. Cirac, Matrix product density operators: simulation of
ﬁnite-temperature and dissipative systems. Phys. Rev. Lett. 93, 207204 (2004)
187. M. Zwolak, G. Vidal, Mixed-state dynamics in one-dimensional quantum lattice systems: a
time-dependent superoperator renormalization algorithm. Phys. Rev. Lett. 93, 207205 (2004)


---
*Page 28*

16
1
Introduction
188. B. Pirvu, V. Murg, J.I. Cirac, F. Verstraete, Matrix product operator representations. New J.
Phys. 12(2), 025012 (2010)
189. W. Li, S. J. Ran, S.S. Gong, Y. Zhao, B. Xi, F. Ye, G. Su, Linearized tensor renormalization
group algorithm for the calculation of thermodynamic properties of quantum lattice models.
Phys. Rev. Lett. 106, 127202 (2011)
190. L. Bonnes, D. Charrier, A.M. Läuchli, Dynamical and steady-state properties of a Bose-
Hubbard chain with bond dissipation: a study based on matrix product operators. Phys. Rev.
A 90, 033612 (2014)
191. E. Mascarenhas, H. Flayac, V. Savona, Matrix-product-operator approach to the nonequilib-
rium steady state of driven-dissipative quantum arrays. Phys. Rev. A 92, 022116 (2015)
192. J. Cui, J.I. Cirac, M.C. Bañuls, Variational matrix product operators for the steady state of
dissipative quantum systems. Phys. Rev. Lett. 114, 220601 (2015)
193. J. Becker, T. Köhler, A.C. Tiegel, S.R. Manmana, S. Wessel, A. Honecker, Finite-temperature
dynamics and thermal intraband magnon scattering in Haldane spin-one chains. Phys. Rev. B
96, 060403 (2017)
194. A.A. Gangat, I. Te, Y.-J. Kao, Steady states of inﬁnite-size dissipative quantum chains via
imaginary time evolution. Phys. Rev. Lett. 119, 010501 (2017)
195. J. Haegeman, F. Verstraete, Diagonalizing transfer matrices and matrix product operators: a
medley of exact and computational methods. Ann. Rev. Condens. Matter Phys. 8(1), 355–406
(2017)
196. J.I. Cirac, D. Pérez-García, N. Schuch, F. Verstraete, Matrix product density operators:
renormalization ﬁxed points and boundary theories. Ann. Phys. 378, 100–149 (2017)
197. F. Fröwis, V. Nebendahl, W. Dür, Tensor operators: constructions and applications for long-
range interaction systems. Phys. Rev. A 81, 062337 (2010)
198. R. Orús, Exploring corner transfer matrices and corner tensors for the classical simulation of
quantum lattice systems. Phys. Rev. B 85, 205117 (2012)
199. P. Czarnik, J. Dziarmaga, Variational approach to projected entangled pair states at ﬁnite
temperature. Phys. Rev. B 92, 035152 (2015)
200. P. Czarnik, J. Dziarmaga, Projected entangled pair states at ﬁnite temperature: iterative self-
consistent bond renormalization for exact imaginary time evolution. Phys. Rev. B 92, 035120
(2015)
201. P. Czarnik, J. Dziarmaga, A.M. Ole´s, Variational tensor network renormalization in imaginary
time: two-dimensional quantum compass model at ﬁnite temperature. Phys. Rev. B 93,
184410 (2016)
202. P. Czarnik, M.M. Rams, J. Dziarmaga, Variational tensor network renormalization in imag-
inary time: benchmark results in the Hubbard model at ﬁnite temperature. Phys. Rev. B 94,
235142 (2016)
203. Y.-W. Dai, Q.-Q. Shi, S.-Y.. Cho, M.T. Batchelor, H.-Q. Zhou, Finite-temperature ﬁdelity and
von Neumann entropy in the honeycomb spin lattice with quantum Ising interaction. Phys.
Rev. B 95, 214409 (2017)
204. P. Czarnik, J. Dziarmaga, A.M. Ole´s, Overcoming the sign problem at ﬁnite temperature:
quantum tensor network for the orbital eg model on an inﬁnite square lattice. Phys. Rev. B
96, 014420 (2017)
205. A. Kshetrimayum, M. Rizzi, J. Eisert, R. Orús, A tensor network annealing algorithm for
two-dimensional thermal states (2018). arXiv preprint:1809.08258
206. P. Czarnik, J. Dziarmaga, P. Corboz, Time evolution of an inﬁnite projected entangled pair
state: an efﬁcient algorithm. Phys. Rev. B 99, 035115 (2019)
207. H. Matsueda, M. Ishihara, Y. Hashizume, Tensor network and a black hole. Phys. Rev. D 87,
066002 (2013)
208. A. Mollabashi, M. Naozaki, S. Ryu, T. Takayanagi, Holographic geometry of cMERA for
quantum quenches and ﬁnite temperature. J. High Energy Phys. 2014(3), 98 (2014)
209. W.-C. Gan, F.-W. Shu, M.-H. Wu, Thermal geometry from CFT at ﬁnite temperature. Phys.
Lett. B 760, 796–799 (2016)


---
*Page 29*

References
17
210. H.C. Jiang, Z.Y. Weng, T. Xiang, Accurate determination of tensor network state of quantum
lattice models in two dimensions. Phys. Rev. Lett. 101, 090603 (2008)
211. Z.C. Gu, M. Levin, X.G. Wen, Tensor-entanglement renormalization group approach as a
uniﬁed method for symmetry breaking and topological phase transitions. Phys. Rev. B 78,
205116 (2008)
212. Z.C. Gu, X.G. Wen, Tensor-entanglement-ﬁltering renormalization approach and symmetry
protected topological order. Phys. Rev. B 80, 155131 (2009)
213. M.-C. Chang, M.-F. Yang, Magnetization plateau of the classical Ising model on the Shastry-
Sutherland lattice: a tensor renormalization-group approach. Phys. Rev. B 79, 104411 (2009)
214. H.-H. Zhao, Z.-Y. Xie, Q.-N. Chen, Z.-C. Wei, J.-W. Cai, T. Xiang, Renormalization of tensor-
network states. Phys. Rev. B 81, 174411 (2010)
215. C.-Y. Huang, F.-L. Lin, Multipartite entanglement measures and quantum criticality from
matrix and tensor product states. Phys. Rev. A 81, 032304 (2010)
216. W. Li, S.-S. Gong, Y. Zhao, G. Su, Quantum phase transition, O(3) universality class, and
phase diagram of the spin- 1
2 Heisenberg antiferromagnet on a distorted honeycomb lattice: a
tensor renormalization-group study. Phys. Rev. B 81, 184427 (2010)
217. C. G´’uven, M. Hinczewski, The tensor renormalization group for pure and disordered
two-dimensional lattice systems. Phys. A Stat. Mech. Appl. 389(15), 2915–2919 (2010).
Statistical, Fluid and Biological Physics Problems
218. C. Güven, M. Hinczewski, A. Nihat Berker, Tensor renormalization group: local magnetiza-
tions, correlation functions, and phase diagrams of systems with quenched randomness. Phys.
Rev. E 82, 051110 (2010)
219. L. Wang, Y.-J. Kao, A.W. Sandvik, Plaquette renormalization scheme for tensor network
states. Phys. Rev. E 83, 056703 (2011)
220. Q.N. Chen, M.P. Qin, J. Chen, Z.C. Wei, H.H. Zhao, B. Normand, T. Xiang, Partial order
and ﬁnite-temperature phase transitions in Potts models on irregular lattices. Phys. Rev. Lett.
107(16), 165701 (2011)
221. Z.-Y. Xie, J. Chen, M.-P. Qin, J.-W. Zhu, L.-P. Yang, T. Xiang, Coarse-graining renormaliza-
tion by higher-order singular value decomposition. Phys. Rev. B 86, 045139 (2012)
222. Y. Shimizu, Tensor renormalization group approach to a lattice boson model. Mod. Phys. Lett.
A 27(06), 1250035 (2012)
223. A. García-Sáez, J.I. Latorre, Renormalization group contraction of tensor networks in three
dimensions. Phys. Rev. B 87, 085130 (2013)
224. M.P. Qin, Q.N. Chen, Z.Y. Xie, J. Chen, J.F. Yu, H.H. Zhao, B. Normand, T. Xiang, Partial
long-range order in antiferromagnetic Potts models. Phys. Rev. B 90(14), 144424 (2014)
225. S. Wang, Z.-Y. Xie, J. Chen, B. Normand, T. Xiang, Phase transitions of ferromagnetic Potts
models on the simple cubic lattice. Chin. Phys. Lett. 31(7), 070503 (2014)
226. K. Roychowdhury, C.-Y. Huang, Tensor renormalization group approach to classical dimer
models. Phys. Rev. B 91, 205418 (2015)
227. H.-H. Zhao, Z.-Y. Xie, T. Xiang, M. Imada, Tensor network algorithm by coarse-graining
tensor renormalization on ﬁnite periodic lattices. Phys. Rev. B 93, 125115 (2016)
228. R. Orús, G. Vidal, Simulation of two-dimensional quantum systems on an inﬁnite lattice
revisited: corner transfer matrix for tensor contraction. Phys. Rev. B 80, 094403 (2009)
229. R.J. Baxter, Variational approximations for square lattice models in statistical mechanics. J.
Stat. Phys. 19, 461 (1978)
230. Z.Y. Xie, H.C. Jiang, Q.N. Chen, Z.Y. Weng, T. Xiang, Second renormalization of tensor-
network states. Phys. Rev. Lett. 103, 160601 (2009)
231. M. Lubasch, J.I. Cirac, M.-C. Bañuls, Unifying projected entangled pair state contractions.
New J. Phys. 16(3), 033014 (2014)
232. S.S. Jahromi, R. Orús, A universal tensor network algorithm for any inﬁnite lattice (2018).
arXiv preprint:1808.00680
233. L. Wang, F. Verstraete, Cluster update for tensor network states (2011). arXiv preprint
arXiv:1110.4362


---
*Page 30*

18
1
Introduction
234. S.-J. Ran, A. Piga, C. Peng, G. Su, M. Lewenstein. Few-body systems capture many-body
physics: tensor network approach. Phys. Rev. B 96, 155120 (2017)
235. J. Jordan, R. Orús, G. Vidal, F. Verstraete, J.I. Cirac, Classical simulation of inﬁnite-size
quantum lattice systems in two spatial dimensions. Phys. Rev. Lett. 101, 250602 (2008)
236. I. Pižorn, L. Wang, F. Verstraete, Time evolution of projected entangled pair states in the
single-layer picture. Phys. Rev. A 83, 052321 (2011)
237. R. Orús, Exploring corner transfer matrices and corner tensors for the classical simulation of
quantum lattice systems. Phys. Rev. B 85, 205117 (2012)
238. M. Lubasch, J.I. Cirac, M.-C. Bañuls, Algorithms for ﬁnite projected entangled pair states.
Phys. Rev. B 90, 064425 (2014)
239. H.N. Phien, J.A. Bengua, H.D. Tuan, P. Corboz, R. Orús, Inﬁnite projected entangled pair
states algorithm improved: fast full update and gauge ﬁxing. Phys. Rev. B 92, 035142 (2015)
240. P. Corboz, Variational optimization with inﬁnite projected entangled-pair states. Phys. Rev. B
94, 035133 (2016)
241. T.G. Kolda, B.W. Bader, Tensor decompositions and applications. SIAM Rev. 51(3), 455–500
(2009)
242. L. De Lathauwer, B. De Moor, J. Vandewalle, A multilinear singular value decomposition.
SIAM. J. Matrix Anal. Appl. 21, 1253–1278 (2000)
243. L. De Lathauwer, B. De Moor, J. Vandewalle, On the best rank-1 and rank-(R1, R2,. . ., RN)
approximation of higher-order tensors. SIAM. J. Matrix Anal. and Appl. 21(4), 1324–1342
(2000)
244. L. De Lathauwer, J. Vandewalle, Dimensionality reduction in higher-order signal processing
and rank-(R1,R2,. . .,RN) reduction in multilinear algebra. Linear Algebra Appl. 391, 31–55
(2004). Special Issue on Linear Algebra in Signal and Image Processing
245. L. De Lathauwer, A Link between the canonical decomposition in multilinear algebra and
simultaneous matrix diagonalization. SIAM. J. Matrix Anal. Appl. 28(3), 642–666 (2006)
246. E. Acar, S.A. Çamtepe, M.S. Krishnamoorthy, B. Yener, Modeling and Multiway Analysis of
Chatroom Tensors (Springer, Heidelberg, 2005), pp. 256–268
247. L. Ning, Z. Benyu, Y. Jun, C. Zheng, L. Wenyin, B. Fengshan, C. Leefeng, Text repre-
sentation: from vector to tensor, in Fifth IEEE International Conference on Data Mining
(ICDM’05) (IEEE, Piscataway, 2005)
248. J.-T. Sun, H.-J. Zeng, H. Liu, Y.-C. Lu, Z. Chen, CubeSVD: a novel approach to personalized
web search, in Proceedings of the 14th International Conference on World Wide Web (ACM,
New York, 2005), pp. 382–390
249. E. Acar, S.A. Çamtepe, B. Yener, Collective Sampling and Analysis of High Order Tensors
for Chatroom Communications (Springer, Heidelberg, 2006), pp. 213–224
250. J. Sun, S. Papadimitriou, P.S. Yu, Window-based tensor analysis on high-dimensional and
multi-aspect streams, in Sixth International Conference on Data Mining (ICDM’06) (IEEE,
Piscataway, 2006), pp. 1076–1080
251. T.G. Kolda, B.W. Bader, J.P. Kenny, Higher-order web link analysis using multilinear algebra,
in Fifth IEEE International Conference on Data Mining (ICDM’05) (IEEE, Piscataway,
2005), p. 8
252. T.G. Kolda, B.W. Bader, The TOPHITS model for higher-order web link analysis, in
Workshop on Link Analysis, Counterterrorism and Security, vol. 7 (2006), pp. 26–29
253. B.W. Bader, R.A. Harshman, T.G. Kolda, Temporal analysis of semantic graphs using
ASALSAN, in Seventh IEEE International Conference on Data Mining (ICDM 2007) (IEEE,
Piscataway, 2007), pp. 33–42
254. B. Du, M.-F. Zhang, L.-F. Zhang, R.-M. Hu, D.-C. Tao, PLTD: patch-based low-rank tensor
decomposition for hyperspectral images. IEEE Trans. Multimedia 19(1), 67–79 (2017)
255. N.D. Sidiropoulos, L. De Lathauwer, X. Fu, K.-J Huang, E.E. Papalexakis, C. Faloutsos,
Tensor decomposition for signal processing and machine learning. IEEE Trans. Signal
Process. 65(13), 3551–3582 (2017)
256. I.V. Oseledets, Tensor-train decomposition. SIAM J. Sci. Comput. 33(5), 2295–2317 (2011)


---
*Page 31*

References
19
257. S.-J. Ran, Ab initio optimization principle for the ground states of translationally invariant
strongly correlated quantum lattice models. Phys. Rev. E 93, 053310 (2016)
258. S.-J. Ran, B. Xi, C. Peng, G. Su, M. Lewenstein, Efﬁcient quantum simulation for thermody-
namics of inﬁnite-size many-body systems in arbitrary dimensions. Phys. Rev. B 99, 205132
(2019)
259. S.R. White, R.L. Martin, Ab-initio quantum chemistry using the density matrix renormaliza-
tion group. J. Chem. Phys. 110(9), 4127–4130 (1999)
260. A.O. Mitrushenkov, G. Fano, F. Ortolani, R. Linguerri, P. Palmieri, Quantum chemistry using
the density matrix renormalization group. J. Chem. Phys. 115(15), 6815–6821 (2001)
261. K.H. Marti, I. M. Ondík, G. Moritz, M. Reiher, Density matrix renormalization group
calculations on relative energies of transition metal complexes and clusters. J. Chem. Phys.
128(1), 014104 (2008)
262. K.H. Marti, M. Reiher, The density matrix renormalization group algorithm in quantum
chemistry. Zeitschrift für Physikalische Chemie 224(3-4), 583–599 (2010)
263. G.K.-L. Chan, S. Sharma, The density matrix renormalization group in quantum chemistry.
Ann. Rev. Phys. Chem. 62(1), 465–481 (2011). PMID: 2121(9144)
264. S. Wouters, D. Van Neck, The density matrix renormalization group for ab initio quantum
chemistry. Eur. Phys. J. D 68(9), 272 (2014)
265. S. Sharma, A. Alavi, Multireference linearized coupled cluster theory for strongly correlated
systems using matrix product states. J. Chem. Phys. 143(10), 102815 (2015)
266. C. Krumnow, L. Veis, Ö. Legeza, J. Eisert, Fermionic orbital optimization in tensor network
states. Phys. Rev. Lett. 117, 210402 (2016)
267. E. Ronca, Z.-D. Li, C.A.J.-Hoyos, G.K.-L. Chan, Time-step targeting time-dependent and
dynamical density matrix renormalization group algorithms with ab initio Hamiltonians. J.
Chem. Theory Comput. 13(11), 5560–5571 (2017). PMID: 28953377
268. Y. Yao, K.-W. Sun, Z. Luo, H.-B. Ma, Full quantum dynamics simulation of a realistic
molecular system using the adaptive time-dependent density matrix renormalization group
method. J. Phys. Chem. Lett. 9(2), 413–419 (2018). PMID: 29298068
269. F. Gebhard, E. Jeckelmann, S. Mahlert, S. Nishimoto, R.M. Noack, Fourth-order perturbation
theory for the half-ﬁlled Hubbard model in inﬁnite dimensions. Eur. Phys. J. B 36(4), 491–509
(2003)
270. S. Nishimoto, F. Gebhard, E. Jeckelmann, Dynamical density-matrix renormalization group
for the Mott–Hubbard insulator in high dimensions. J. Phys. Condens. Mat. 16(39), 7063–
7081 (2004)
271. D.J. Garc’ıa, K. Hallberg, M.J. Rozenberg, Dynamical mean ﬁeld theory with the density
matrix renormalization group. Phys. Rev. Lett. 93, 246403 (2004)
272. K.A. Hallberg, New trends in density matrix renormalization. Adv. Phys. 55(5-6), 477–526
(2006)
273. F.A. Wolf, I.P. McCulloch, O. Parcollet, U. Schollwöck, Chebyshev matrix product state
impurity solver for dynamical mean-ﬁeld theory. Phys. Rev. B 90, 115124 (2014)
274. M. Ganahl, P. Thunström, F. Verstraete, K. Held, H.G. Evertz, Chebyshev expansion for
impurity models using matrix product states. Phys. Rev. B 90, 045144 (2014)
275. F.A. Wolf, I.P. McCulloch, U. Schollwöck, Solving nonequilibrium dynamical mean-ﬁeld
theory using matrix product states. Phys. Rev. B 90, 235131 (2014)
276. F.A. Wolf, A. Go, I.P. McCulloch, A.J. Millis, U. Schollwöck, Imaginary-time matrix product
state impurity solver for dynamical mean-ﬁeld theory. Phys. Rev. X 5, 041032 (2015)
277. M. Ganahl, M. Aichhorn, H.G. Evertz, P. Thunström, K. Held, F. Verstraete, Efﬁcient DMFT
impurity solver using real-time dynamics with matrix product states. Phys. Rev. B 92, 155132
(2015)
278. D. Bauernfeind, M. Zingl, R. Triebl, M. Aichhorn, H.G. Evertz, Fork tensor-product states:
efﬁcient multiorbital real-time DMFT solver. Phys. Rev. X 7, 031013 (2017)
279. A. Holzner, A. Weichselbaum, I.P. McCulloch, U. Schollwöck, J. von Delft. Chebyshev
matrix product state approach for spectral functions. Phys. Rev. B 83, 195115 (2011)


---
*Page 32*

20
1
Introduction
280. F.A. Wolf, J.A. Justiniano, I.P. McCulloch, U. Schollwöck, Spectral functions and time
evolution from the Chebyshev recursion. Phys. Rev. B 91, 115144 (2015)
281. J.C. Halimeh, F. Kolley, I.P. McCulloch, Chebyshev matrix product state approach for time
evolution. Phys. Rev. B 92, 115130 (2015)
282. B.-B. Chen, Y.-J. Liu, Z.-Y. Chen, W. Li, Series-expansion thermal tensor network approach
for quantum lattice models. Phys. Rev. B 95, 161104 (2017)
283. E. Tirrito, S.-J. Ran, A.J. Ferris, I.P. McCulloch, M. Lewenstein, Efﬁcient perturbation theory
to improve the density matrix renormalization group. Phys. Rev. B 95, 064110 (2017)
284. L. Vanderstraeten, M. Mariën, J. Haegeman, N. Schuch, J. Vidal, F. Verstraete, Bridging
perturbative expansions with tensor networks. Phys. Rev. Lett. 119, 070401 (2017)
285. J. Haegeman, C. Lubich, I. Oseledets, B. Vandereycken, F. Verstraete, Unifying time evolution
and optimization with matrix product states. Phys. Rev. B 94, 165116 (2016)
286. A. Milsted, J. Haegeman, T.J. Osborne, F. Verstraete, Variational matrix product ansatz for
nonuniform dynamics in the thermodynamic limit. Phys. Rev. B 88, 155116 (2013)
287. J. Haegeman, T.J. Osborne, F. Verstraete, Post-matrix product state methods: to tangent space
and beyond. Phys. Rev. B 88, 075133 (2013)
288. L. Vanderstraeten, M. Mariën, F. Verstraete, J. Haegeman, Excitations and the tangent space
of projected entangled-pair states. Phys. Rev. B 92, 201111 (2015)
289. V. Zauner-Stauber, L. Vanderstraeten, M.T. Fishman, F. Verstraete, J. Haegeman, Variational
optimization algorithms for uniform matrix product states. Phys. Rev. B 97(4), 045145 (2018)
290. Y.-J. Zou, A. Milsted, G. Vidal, Conformal data and renormalization group ﬂow in critical
quantum spin chains using periodic uniform matrix product states. Phys. Rev. Lett. 121,
230402 (2018)
291. L. Vanderstraeten, J. Haegeman, F. Verstraete, Tangent-space methods for uniform matrix
product states, in SciPost Physics Lecture Notes (2019), pp. 7
292. T. Barthel, C. Pineda, J. Eisert, Contraction of fermionic operator circuits and the simulation
of strongly correlated fermions. Phys. Rev. A 80, 042333 (2009)
293. P. Corboz, R. Orús, B. Bauer, G. Vidal, Simulation of strongly correlated fermions in two
spatial dimensions with fermionic projected entangled-pair states. Phys. Rev. B 81, 165104
(2010)
294. P. Corboz, J. Jordan, G. Vidal, Simulation of fermionic lattice models in two dimensions with
projected entangled-pair states: next-nearest neighbor Hamiltonians. Phys. Rev. B 82, 245119
(2010)
295. I. Pizorn, F. Verstraete, Fermionic implementation of projected entangled pair states algo-
rithm. Phys. Rev. B 81, 245110 (2010)
296. C.V. Kraus, N. Schuch, F. Verstraete, J.I. Cirac, Fermionic projected entangled pair states.
Phys. Rev. A 81, 052338 (2010)
297. K.H. Marti, B. Bauer, M. Reiher, M. Troyer, F. Verstraete, Complete-graph tensor network
states: a new fermionic wave function ansatz for molecules. New J. Phys. 12(10), 103008
(2010)
298. P. Corboz, S.R. White, G. Vidal, M. Troyer, Stripes in the two-dimensional t −J model with
inﬁnite projected entangled-pair states. Phys. Rev. B 84, 041108 (2011)
299. K.H. Marti, M. Reiher, New electron correlation theories for transition metal chemistry. Phys.
Chem. Chem. Phys. 13, 6750–6759 (2011)
300. Z.-C. Gu, Efﬁcient simulation of Grassmann tensor product states. Phys. Rev. B 88, 0115139
(2013)
301. P. Czarnik, J. Dziarmaga, Fermionic projected entangled pair states at ﬁnite temperature.
Phys. Rev. B 90, 035144 (2014)
302. Y. Shimizu, Y. Kuramashi, Grassmann tensor renormalization group approach to one-ﬂavor
lattice Schwinger model. Phys. Rev. D 90, 014508 (2014)
303. E. Zohar, M. Burrello, T.B. Wahl, J.I. Cirac, Fermionic projected entangled pair states and
local U(1) gauge theories. Ann. Phys. 363, 385–439 (2015)
304. C. Wille, O. Buerschaper, J. Eisert, Fermionic topological quantum states as tensor networks.
Phys. Rev. B 95, 245127 (2017)


---
*Page 33*

References
21
305. N. Bultinck, D.J. Williamson, J. Haegeman, F. Verstraete, Fermionic projected entangled-pair
states and topological phases. J. Phys. A Math. Theor. 51(2), 025202 (2017)
306. S. Yang, T.B. Wahl, H.-H. Tu, N. Schuch, J.I. Cirac, Chiral projected entangled-pair state with
topological order. Phys. Rev. Lett. 114(10), 106803 (2015)
307. L. Tagliacozzo, A. Celi, M. Lewenstein, Tensor networks for lattice gauge theories with
continuous groups. Phys. Rev. X 4, 041024 (2014)
308. E. Rico, T. Pichler, M. Dalmonte, P. Zoller, S. Montangero, Tensor networks for lattice gauge
theories and atomic quantum simulation. Phys. Rev. Lett. 112, 201601 (2014)
309. J. Haegeman, K. Van Acoleyen, N. Schuch, J.I. Cirac, F. Verstraete, Gauging quantum states:
from global to local symmetries in many-body systems. Phys. Rev. X 5, 011024 (2015)
310. X. Chen, A. Vishwanath, Towards gauging time-reversal symmetry: a tensor network
approach. Phys. Rev. X 5, 041034 (2015)
311. T. Pichler, M. Dalmonte, E. Rico, P. Zoller, S. Montangero, Real-time dynamics in U(1) lattice
gauge theories with tensor networks. Phys. Rev. X 6, 011023 (2016)
312. B. Buyens, S. Montangero, J. Haegeman, F. Verstraete, K. Van Acoleyen, Finite-
representation approximation of lattice gauge theories at the continuum limit with tensor
networks. Phys. Rev. D 95, 094509 (2017)
313. K. Zapp, R. Orús, Tensor network simulation of QED on inﬁnite lattices: learning from (1 +
1)d, and prospects for (2 + 1)d. Phys. Rev. D 95, 114508 (2017)
314. R.N.C. Pfeifer, P. Corboz, O. Buerschaper, M. Aguado, M. Troyer, G. Vidal, Simulation of
anyons with tensor network algorithms. Phys. Rev. B 82, 115126 (2010)
315. R. König, E. Bilgin, Anyonic entanglement renormalization. Phys. Rev. B 82, 125118 (2010)
316. T.B. Wahl, H.H. Tu, N. Schuch, J.I. Cirac, Projected entangled-pair states can describe chiral
topological states. Phys. Rev. Lett. 111(23), 236805 (2013)
317. J. Dubail, N. Read, Tensor network trial states for chiral topological phases in two dimensions
and a no-go theorem in any dimension. Phys. Rev. B 92(20), 205307 (2015)
318. D. Poilblanc, J.I. Cirac, N. Schuch, Chiral topological spin liquids with projected entangled
pair states. Phys. Rev. B 91(22), 224431 (2015)
319. M. Mambrini, R. Orús, D. Poilblanc, Systematic construction of spin liquids on the square
lattice from tensor networks with SU(2) symmetry. Phys. Rev. B 94, 205124 (2016)
320. C.-Y. Huang, T.-C. Wei, Detecting and identifying two-dimensional symmetry-protected
topological, symmetry-breaking, and intrinsic topological phases with modular matrices via
tensor-network methods. Phys. Rev. B 93, 155163 (2016)
321. M. Gerster, M. Rizzi, P. Silvi, M. Dalmonte, S. Montangero, Fractional quantum Hall effect
in the interacting Hofstadter model via tensor networks (2017). arXiv preprint:1705.06515
322. H.J. Liao, Z.Y. Xie, J. Chen, Z.Y. Liu, H.D. Xie, R.Z. Huang, B. Normand, T. Xiang, Gapless
spin-liquid ground state in the S = 1/2 Kagome Antiferromagnet. Phys. Rev. Lett. 118,
137202 (2017)
323. C. Peng, S.-J. Ran, T. Liu, X. Chen, G. Su, Fermionic algebraic quantum spin liquid in an
octa-kagome frustrated antiferromagnet. Phys. Rev. B 95, 075140 (2017)
324. T. Liu, S.-J. Ran, W. Li, X. Yan, Y. Zhao, G. Su, Featureless quantum spin liquid, 1/3-
magnetization plateau state, and exotic thermodynamic properties of the spin-1/2 frustrated
Heisenberg antiferromagnet on an inﬁnite Husimi lattice. Phys. Rev. B 89, 054426 (2014)
325. S. Yang, L. Lehman, D. Poilblanc, K. Van Acoleyen, F. Verstraete, J.I. Cirac, N. Schuch, Edge
theories in projected entangled pair state models. Phys. Rev. Lett. 112, 036402 (2014)
326. T.B. Wahl, S.T. Haßler, H.-H. Tu, J.I. Cirac, N. Schuch, Symmetries and boundary theories
for chiral projected entangled pair states. Phys. Rev. B 90, 115133 (2014)
327. S.-J. Ran, W Li, S.-S. Gong, A. Weichselbaum, J. von Delft, G. Su, Emergent spin-1
trimerized valence bond crystal in the spin-1/2 Heisenberg model on the star lattice (2015).
arXiv preprint :1508.03451
328. D.J. Williamson, N. Bultinck, M. Mariën, M.B. ¸Sahino˘glu, J. Haegeman, F. Verstraete, Matrix
product operators for symmetry-protected topological phases: gauging and edge theories.
Phys. Rev. B 94, 205150 (2016)


---
*Page 34*

22
1
Introduction
329. S.-H. Jiang, Y. Ran, Anyon condensation and a generic tensor-network construction for
symmetry-protected topological phases. Phys. Rev. B 95, 125107 (2017)
330. T. Prosen, M. Žnidariˇc, Matrix product simulations of non-equilibrium steady states of
quantum spin chains. J. Stat. Mech. Theory Exp. 2009(02), P02035 (2009)
331. F.A.Y.N. Schröder, A.W. Chin, Simulating open quantum dynamics with time-dependent
variational matrix product states: towards microscopic correlation of environment dynamics
and reduced system evolution. Phys. Rev. B 93, 075105 (2016)
332. A.H. Werner, D. Jaschke, P. Silvi, M. Kliesch, T. Calarco, J. Eisert, S. Montangero, Positive
tensor network approach for simulating open quantum many-body systems. Phys. Rev. Lett.
116, 237201 (2016)
333. A. Kshetrimayum, H. Weimer, R. Orús, A simple tensor network algorithm for two-
dimensional steady states. Nat. Commun. 8(1), 1291 (2017)
334. D. Jaschke, S. Montangero, L.D. Carr, One-dimensional many-body entangled open quantum
systems with tensor network methods. Quantum Sci. Tech. 4(1), 013001 (2018)
335. R. Jozsa, On the simulation of quantum circuits (2006). arXiv preprint quant-ph/0603163
336. D. Gross, J. Eisert, Novel schemes for measurement-based quantum computation. Phys. Rev.
Lett. 98, 220503 (2007)
337. I. Arad, Z. Landau, Quantum computation and the evaluation of tensor networks. SIAM J.
Comput. 39(7), 3089–3121 (2010)
338. D. Gross, J. Eisert, N. Schuch, D. Perez-Garcia, Measurement-based quantum computation
beyond the one-way model. Phys. Rev. A 76, 052315 (2007)
339. I.L. Markov, Y.-Y. Shi, Simulating quantum computation by contracting tensor networks.
SIAM J. Comput. 38(3), 963–981 (2008)
340. V. Giovannetti, S. Montangero, R. Fazio, Quantum multiscale entanglement renormalization
ansatz channels. Phys. Rev. Lett. 101, 180503 (2008)
341. K. Fujii, T. Morimae, Computational power and correlation in a quantum computational
tensor network. Phys. Rev. A 85, 032338 (2012)
342. T.H. Johnson, J.D. Biamonte, S.R. Clark, D. Jaksch, Solving search problems by strongly
simulating quantum circuits. Sci. Rep. 3, 1235 (2013)
343. A.J. Ferris, D. Poulin, Tensor networks and quantum error correction. Phys. Rev. Lett. 113,
030501 (2014)
344. I. Dhand, M. Engelkemeier, L. Sansoni, S. Barkhofen, C. Silberhorn, M.B. Plenio, Proposal
for quantum simulation via all-optically-generated tensor network states. Phys. Rev. Lett. 120,
130501 (2018)
345. C. Bény, Deep learning and the renormalization group (2013). arXiv:1301.3124
346. J.A. Bengua, H.N. Phien, H.D. Tuan, Optimal feature extraction and classiﬁcation of tensors
via matrix product state decomposition, in 2015 IEEE International Congress on Big Data,
pp. 669–672 (IEEE, Piscataway, 2015)
347. A. Novikov, D. Podoprikhin, A. Osokin, D.P. Vetrov, Tensorizing neural networks, in
Advances in Neural Information Processing Systems, ed. by C. Cortes, N.D. Lawrence, D.D.
Lee, M. Sugiyama, R. Garnett (Curran Associates, Red Hook, 2015), pp. 442–450
348. D. Liu, S.-J. Ran, P. Wittek, C. Peng, R.B. Garc’ia, G. Su, M. Lewenstein, Machine Learning
by Unitary Tensor Network of Hierarchical Tree Structure. New J. Phys. 21, 073059 (2019)
349. J. Chen, S. Cheng, H.-D. Xie, L. Wang, T. Xiang, On the equivalence of restricted Boltzmann
machines and tensor network states (2017). arXiv:1701.04831
350. Y.-C. Huang, J.E. Moore, Neural network representation of tensor network and chiral states
(2017). arXiv:1701.06246
351. Z.-Y. Han, J. Wang, H. Fan, L. Wang, P. Zhang, Unsupervised generative modeling using
matrix product states (2017). arXiv:1709.01662
352. Y. Levine, D. Yakira, N. Cohen, A. Shashua, Deep learning and quantum physics: a
fundamental bridge (2017). arXiv:1704.01552
353. A.J. Gallego, R. Orus, The physical structure of grammatical correlations: equivalences,
formalizations and consequences (2017). arXiv:1708.01525


---
*Page 35*

References
23
354. C. Guo, Z.-M. Jie, W. Lu, D. Poletti, Matrix product operators for sequence-to-sequence
learning. Phys. Rev. E 98, 042114 (2018)
355. A. Cichocki, N. Lee, I. Oseledets, A.-H. Phan, Q.-B. Zhao, D.P. Mandic, et al. Tensor
networks for dimensionality reduction and large-scale optimization: Part 1 low-rank tensor
decompositions. Found. Trends R⃝Mach. Learn. 9(4-5), 249–429 (2016)
356. A. Cichocki, A.-H. Phan, Q.-B. Zhao, N. Lee, I. Oseledets, M. Sugiyama, D.P. Mandic,
et al. Tensor networks for dimensionality reduction and large-scale optimization: Part 2
applications and future perspectives. Found. Trends R⃝Mach. Learn. 9(6), 431–673 (2017)
357. I. Glasser, N. Pancotti, J.I. Cirac, Supervised learning with generalized tensor networks
(2018). arXiv preprint:1806.05964
358. E.M. Stoudenmire, Learning relevant features of data with multi-scale tensor networks.
Quantum Sci. Tech. 3(3), 034003 (2018)
359. C. Chen, K. Batselier, C.-Y. Ko, N. Wong, A support tensor train machine (2018). arXiv
preprint:1804.06114
360. S. Cheng, L. Wang, T. Xiang, P. Zhang, Tree tensor networks for generative modeling (2019).
arXiv preprint:1901.02217
361. M. Espig, W. Hackbusch, S. Handschuh, R. Schneider, Optimization problems in contracted
tensor networks. Comput. Vis. Sci. 14(6), 271–285 (2011)
362. A. Cichocki, Era of big data processing: a new approach via tensor networks and tensor
decompositions (2014). arXiv preprint:1403.2048
363. J.D Biamonte, J. Morton, J. Turner, Tensor network contractions for# SAT. J. Stat. Phys.
160(5), 1389–1404 (2015)
364. M. Bachmayr, R. Schneider, A. Uschmajew, Tensor networks and hierarchical tensors for
the solution of high-dimensional partial differential equations. Found. Comput. Math. 16(6),
1423–1472 (2016)
365. Z.-C. Yang, S. Kourtis, C. Chamon, E.R. Mucciolo, A.E. Ruckenstein, Tensor network
method for reversible classical computation. Phys. Rev. E 97, 033303 (2018)
366. S. Kourtis, C. Chamon, E.R Mucciolo, A.E. Ruckenstein, Fast counting with tensor networks
(2018). arXiv preprint:1805.00475
367. D.P.-García, M. Sanz, C.E. González-Guillén, M.M. Wolf, J.I. Cirac, Characterizing symme-
tries in a projected entangled pair state. New J. Phys. 12(2), 025010 (2010)
368. A. Weichselbaum, Non-abelian symmetries in tensor networks: a quantum symmetry space
approach. Ann. Phys. 327, 2972–3047 (2012)
369. N. Schuch, I. Cirac, D. Pérez-García, PEPS as ground states: degeneracy and topology. Ann.
Phys. 325(10), 2153–2192 (2010)
370. S. Singh, R.N.C. Pfeifer, G. Vidal, Tensor network decompositions in the presence of a global
symmetry. Phys. Rev. A 82, 050301 (2010)
371. S. Singh, R.N.C. Pfeifer, G. Vidal, Tensor network states and algorithms in the presence of a
global U(1) symmetry. Phys. Rev. B 83, 115125 (2011)
372. R. Orús, Advances on tensor network theory: symmetries, fermions, entanglement, and
holography. Eur. Phys. J. B. 87(11), 280 (2014)
373. B. Bauer, P. Corboz, R. Orús, M. Troyer, Implementing global abelian symmetries in projected
entangled-pair state algorithms. Phys. Rev. B 83, 125106 (2011)
374. S. Singh, G. Vidal, Tensor network states and algorithms in the presence of a global SU(2)
symmetry. Phys. Rev. B 86, 195114 (2012)
375. L. Tagliacozzo, A. Celi, M. Lewenstein, Tensor networks for lattice gauge theories with
continuous groups. Phys. Rev. X 4, 041024 (2014)
376. R. Orús, Advances on tensor network theory: symmetries, fermions, entanglement, and
holography. Eur. Phys. J. B. 87(11), 280 (2014)
377. M. Rispler, K. Duivenvoorden, N. Schuch, Long-range order and symmetry breaking in
projected entangled-pair state models. Phys. Rev. B 92, 155133 (2015)
378. S.-H. Jiang, Y. Ran, Symmetric tensor networks and practical simulation algorithms to sharply
identify classes of quantum phases distinguishable by short-range physics. Phys. Rev. B 92,
104414 (2015)


---
*Page 36*

24
1
Introduction
379. H.-Y. Lee, J.-H. Han, Classiﬁcation of trivial spin-1 tensor network states on a square lattice.
Phys. Rev. B 94, 115150 (2016)
380. E. Zohar, M. Burrello, Building projected entangled pair states with a local gauge symmetry.
New J. Phys. 18(4), 043008(2016)
381. M.C. Bañuls, M.B. Hastings, F. Verstraete, J.I. Cirac, Matrix product states for dynamical
simulation of inﬁnite chains. Phys. Rev. Lett. 102, 240603 (2009)
382. A. Müller-Hermes, J.I. Cirac, M.-C. Bañuls, Tensor network techniques for the computation
of dynamical observables in one-dimensional quantum spin systems. New J. Phys. 14(7),
075003 (2012)
383. M.B. Hastings, R. Mahajan, Connecting entanglement in time and space: improving the
folding algorithm. Phys. Rev. A 91, 032306 (2015)
384. S. Yang, Z.C. Gu, X.G. Wen, Loop optimization for tensor network renormalization. Phys.
Rev. Lett. 118, 110504 (2017)
385. Z.-Y. Xie, H.-J. Liao, R.-Z. Huang, H.-D. Xie, J. Chen, Z.-Y. Liu, T. Xiang, Optimized
contraction scheme for tensor-network states. Phys. Rev. B 96, 045128 (2017)
Open Access This chapter is licensed under the terms of the Creative Commons Attribution 4.0
International License (http://creativecommons.org/licenses/by/4.0/), which permits use, sharing,
adaptation, distribution and reproduction in any medium or format, as long as you give appropriate
credit to the original author(s) and the source, provide a link to the Creative Commons licence and
indicate if changes were made.
The images or other third party material in this chapter are included in the chapter’s Creative
Commons licence, unless indicated otherwise in a credit line to the material. If material is not
included in the chapter’s Creative Commons licence and your intended use is not permitted by
statutory regulation or exceeds the permitted use, you will need to obtain permission directly from
the copyright holder.


---
*Page 37*

Chapter 2
Tensor Network: Basic Deﬁnitions
and Properties
Abstract This chapter is to introduce some basic deﬁnitions and concepts of TN.
We will show that the TN can be used to represent quantum many-body states, where
we explain MPS in 1D and PEPS in 2D systems, as well as the generalizations to
thermal states and operators. The quantum entanglement properties of the TN states
including the area law of entanglement entropy will also be discussed. Finally, we
will present several special TNs that can be exactly contracted, and demonstrate the
difﬁculty of contracting TNs in general cases.
2.1
Scalar, Vector, Matrix, and Tensor
Generally speaking, a tensor is deﬁned as a series of numbers labeled by N indexes,
with N called the order of the tensor.1 In this context, a scalar, which is one number
and labeled by zero index, is a zeroth-order tensor. Many physical quantities are
scalars, including energy, free energy, magnetization, and so on. Graphically, we
use a dot to represent a scalar (Fig. 2.1).
A D-component vector consists of D numbers labeled by one index, and thus is
a ﬁrst-order tensor. For example, one can write the state vector of a spin-1/2 in a
chosen basis (say the eigenstates of the spin operator ˆS[z]) as
|ψ⟩= C1|0⟩+ C2|1⟩=

s=0,1
Cs|s⟩,
(2.1)
with the coefﬁcients C a two-component vector. Here, we use |0⟩and |1⟩to represent
spin up and down states. Graphically, we use a dot with one open bond to represent
a vector (Fig. 2.1).
1Note that in some references, N is called the tensor rank. Here, the word rank is used in another
meaning, which will be explained later.
© The Author(s) 2020
S.-J. Ran et al., Tensor Network Contractions, Lecture Notes in Physics 964,
https://doi.org/10.1007/978-3-030-34489-4_2
25


---
*Page 38*

26
2
Tensor Network: Basic Deﬁnitions and Properties
•  •  •
Fig. 2.1 From left to right, the graphic representations of a scalar, vector, matrix, and tensor
A matrix is in fact a second-order tensor. Considering two spins as an example,
the state vector can be written under an irreducible representation as a four-
dimensional vector. Instead, under the local basis of each spin, we write it as
|ψ⟩= C00|0⟩|0⟩+ C01|0⟩|1⟩+ C10|1⟩|0⟩+ C11|1⟩|1⟩=
1

ss′=0
Css′|s⟩|s′⟩, (2.2)
with Css′ a matrix with two indexes. Here, one can see that the difference between a
(D×D) matrix and a D2-component vector in our context is just the way of labeling
the tensor elements. Transferring among vector, matrix, and tensor like this will be
frequently used later. Graphically, we use a dot with two bonds to represent a matrix
and its two indexes (Fig. 2.1).
It is then natural to deﬁne an N-th order tensor. Considering, e.g., N spins, the
2N coefﬁcients can be written as an N-th order tensor C,2 satisfying
|ψ⟩=
1

s1···sN=0
Cs1...sN |s1⟩. . . |sN⟩.
(2.3)
Similarly, such a tensor can be reshaped into a 2N-component vector. Graphically,
an N-th order tensor is represented by a dot connected with N open bonds (Fig. 2.1).
In above, we use states of spin-1/2 as examples, where each index can take two
values. For a spin-S state, each index can take d = 2S + 1 values, with d called the
bond dimension. Besides quantum states, operators can also be written as tensors. A
spin-1/2 operator ˆSα (α = x, y, z) is a (2 × 2) matrix by ﬁxing the basis, where we
have Sα
s′
1s′
2s1s2 = ⟨s′
1s′
2| ˆSα|s1s2⟩. In the same way, an N-spin operator can be written
as a 2N-th order tensor, with N bra and N ket indexes.3
We would like to stress some conventions about the “indexes” of a tensor
(including matrix) and those of an operator. A tensor is just a group of numbers,
where their indexes are deﬁned as the labels labeling the elements. Here, we always
put all indexes as the lower symbols, and the upper “indexes” of a tensor (if exist)
are just a part of the symbol to distinguish different tensors. For an operator which
is deﬁned in a Hilbert space, it is represented by a hatted letter, and there will be
2If there is no confuse, we use the symbol without all its indexes to refer to a tensor for conciseness,
e.g., use C to represent Cs1...sN .
3Note that here, we do not distinguish bra and ket indexes deliberately in a tensor, if not necessary.


---
*Page 39*

2.2
Tensor Network and Tensor Network States
27
M
U
Fig. 2.2 The graphic representation of the Schmidt decomposition (singular value decomposition
of a matrix). The positive-deﬁned diagonal matrix λ, which gives the entanglement spectrum
(Schmidt numbers), is deﬁned on a virtual bond (dumb index) generated by the decomposition
no “true” indexes, meaning that both upper and lower “indexes” are just parts of the
symbol to distinguish different operators.
2.2
Tensor Network and Tensor Network States
2.2.1
A Simple Example of Two Spins and Schmidt
Decomposition
After introducing tensor (and its diagram representation), now we are going to talk
about TN, which is deﬁned as the contraction of many tensors. Let us start with
the simplest situation, two spins, and consider to study the quantum entanglement
properties for instance. Quantum entanglement, mostly simpliﬁed as entanglement,
can be deﬁned by the Schmidt decomposition [1–3] of the state (Fig. 2.2) as
|ψ⟩=
1

ss′=0
Css′|s⟩|s′⟩=
1

ss′=0
χ

a=1
Usaλaa′V ∗
as′|s⟩|s′⟩,
(2.4)
where U and V are unitary matrices, λ is a positive-deﬁned diagonal matrix in
descending order,4 and χ is called the Schmidt rank. λ is called the Schmidt
coefﬁcients since in the new basis after the decomposition, the state is written in
a summation of χ product states as |ψ⟩= 
a λa|u⟩a|v⟩a, with the new basis
|u⟩a = 
s Usa|s⟩and |v⟩a = 
s′ V ∗
sa|s′⟩.
Graphically, we have a small TN, where we use green squares to represent the
unitary matrices U and V , and a red diamond to represent the diagonal matrix λ.
There are two bonds in the graph shared by two objects, standing for the summations
(contractions) of the two indexes in Eq. (2.4), a and a′. Unlike s (or s′), the space of
the index a (or a′) is not from any physical Hilbert space. To distinguish these two
kinds, we call the indexes like s the physical indexes and those like a the geometrical
or virtual indexes. Meanwhile, since each physical index is only connected to one
tensor, it is also called an open bond.
4Sometime, λ is treated directly as a χ-component vector.


---
*Page 40*

28
2
Tensor Network: Basic Deﬁnitions and Properties
Some simple observations can be made from the Schmidt decomposition.
Generally speaking, the index a (also a′ since λ is diagonal) contracted in a TN carry
the quantum entanglement [4]. In quantum information sciences, entanglement is
regarded as a quantum version of correlation [4], which is crucially important to
understand the physical implications of TN. One usually uses the entanglement
entropy to measure the strength of the entanglement, which is deﬁned as S =
−2 χ
a=1 λ2
a ln λa. Since the state should be normalized, we have χ
a=1 λ2
a = 1. For
dim(a) = 1, obviously |ψ⟩= λ1|u⟩1|v⟩1 is a product state with zero entanglement
S = 0 between the two spins. For dim(a) = χ, the entanglement entropy S ≤ln χ,
where S takes its maximum if and only if λ1 = · · · = λχ. In other words, the
dimension of a geometrical index determines the upper bound of the entanglement.
Instead of Schmidt decomposition, it is more convenient to use another language
to present later the algorithms: singular value decomposition (SVD), a matrix
decomposition in linear algebra. The Schmidt decomposition of a state is the SVD
of the coefﬁcient matrix C, where λ is called the singular value spectrum and its
dimension χ is called the rank of the matrix. In linear algebra, SVD gives the
optimal lower-rank approximations of a matrix, which is more useful to the TN
algorithms. Speciﬁcally speaking, with a given matrix C of rank-χ, the task is to
ﬁnd a rank- ˜χ matrix C′ ( ˜χ ≤χ) that minimizes the norm
D = |M −M′| =

ss′

Mss′ −M′
ss′
2.
(2.5)
The optimal solution is given by the SVD as
M′
ss′ =
χ′−1

a=0
UsaλaaV ∗
s′a.
(2.6)
In other words, M′ is the optimal rank-χ′ approximation of M, and the error is given
by
ε =




	
χ−1

a=χ′
λ2a,
(2.7)
which will be called the truncation error in the TN algorithms.
2.2.2
Matrix Product State
Now we take a N-spin state as an example to explain the MPS, a simple but powerful
1D TN state. In an MPS, the coefﬁcients are written as a TN given by the contraction


---
*Page 41*

2.2
Tensor Network and Tensor Network States
29
A[1]
A[1]
A[2]
A[N-1]
A[N]
•••
•••
•••
•••
S1
S1
S2
SN-2
SN-1
a1
a1
a2
aN-2
aN-1
A[1]
S1
a1
A[2]
S2
a2
Fig. 2.3 An impractical way to obtain an MPS from a many-body wave-function is to repetitively
use the SVD
of N tensors. Schollwöck in his review [5] provides a straightforward way to obtain
such a TN is by repetitively using SVD or QR decomposition (Fig. 2.3). First, we
group the ﬁrst N−1 indexes together as one large index, and write the coefﬁcients as
a 2N−1 × 2 matrix. Then implement SVD or any other decomposition (for example,
QR decomposition) as the contraction of C[N−1] and A[N]
Cs1···sN−1sN =

aN−1
C[N−1]
s1···sN−1,aN−1A[N]
sN,aN−1.
(2.8)
Note that as a convention in this paper, we always put the physical indexes in front
of geometrical indexes and use a comma to separate them. For the tensor C[N−1],
one can do the similar thing by grouping the ﬁrst N −2 indexes and decompose
again as
Cs1···sN−1aN−1 =

aN−2
C[N−2]
s1···sN−2,aN−2A[N−1]
sN−1,aN−2aN−1.
(2.9)
Then the total coefﬁcients become the contraction of three tensors as
Cs1···sN−1sN =

aN−2aN−1
C[N−2]
s1···sN−2,aN−2A[N−1]
sN−1,aN−2aN−1A[N]
sN,aN−1.
(2.10)
Repeat decomposing in the above way until each tensor only contains one physical
index, we have the MPS representation of the state as
Cs1···sN−1sN =

a1···aN−1
A[1]
s1,a1A[2]
s2,a1a2 · · · A[N−1]
sN−1,aN−2aN−1A[N]
sN,aN−1.
(2.11)
One can see that an MPS is a TN formed by the contraction of N tensors.
Graphically, MPS is represented by a 1D graph with N open bonds. In fact, an


---
*Page 42*

30
2
Tensor Network: Basic Deﬁnitions and Properties
Fig. 2.4 The graphic representations of the matrix product states with open (left) and periodic
(right) boundary conditions
MPS given by Eq. (2.11) has open boundary condition, and can be generalized to
periodic boundary condition (Fig. 2.4) as
Cs1···sN−1sN =

a1···aN
A[1]
s1,aNa1A[2]
s2,a1a2 · · · A[N−1]
sN−1,aN−2aN−1A[N]
sN,aN−1aN ,
(2.12)
where all tensors are third-order. Moreover, one can introduce translational invari-
ance to the MPS, i.e., A[n] = A for n = 1, 2, · · · , N. We use χ, dubbed as virtual
bond dimension of the MPS, to represent the dimension of each geometrical index.
MPS is an efﬁcient representation of a many-body quantum state. For a N-spin
state, the number of the coefﬁcients is 2N which increases exponentially with N. For
an MPS given by Eq. (2.12), it is easy to count that the total number of the elements
of all tensors is Ndχ2 which increases only linearly with N. The above way of
obtaining MPS with decompositions is also known as tensor train decomposition
(TTD) in MLA, and MPS is also called tensor-train form [6]. The main aim of TTD
is investigating the algorithms to obtain the optimal tensor-train form of a given
tensor, so that the number of parameters can be reduced with well-controlled errors.
In physics, the above procedure shows that any states can be written in an MPS,
as long as we do not limit the dimensions of the geometrical indexes. However, it
is extremely impractical and inefﬁcient, since in principle, the dimensions of the
geometrical indexes {a} increase exponentially with N. In the following sections,
we will directly applying the mathematic form of the MPS without considering the
above procedure.
Now we introduce a simpliﬁed notation of MPS that has been widely used in
the community of physics. In fact with ﬁxed physical indexes, the contractions of
geometrical indexes are just the inner products of matrices (this is how its name
comes from). In this sense, we write a quantum state given by Eq. (2.11) as
|ψ⟩= tT rA[1]A[2] · · · A[N]|s1s2 · · · sN⟩= tT r
N

n=1
A[n]|sn⟩.
(2.13)
tT r stands for summing over all shared indexes. The advantage of Eq. (2.13) is to
give a general formula for an MPS of either ﬁnite or inﬁnite size, with either periodic
or open boundary condition.


---
*Page 43*

2.2
Tensor Network and Tensor Network States
31
2.2.3
Afﬂeck–Kennedy–Lieb–Tasaki State
MPS is not just a mathematic form. It can represent non-trivial physical states.
One important example can be found with AKLT model proposed in 1987, a
generalization of spin-1 Heisenberg model [7]. For 1D systems, Mermin–Wagner
theorem forbids any spontaneously breaking of continuous symmetries at ﬁnite
temperature with sufﬁciently short-range interactions. For the ground state of AKLT
model called AKLT state, it possesses the sparse anti-ferromagnetic order (Fig. 2.5),
which provides a non-zero excitation gap under the framework of Mermin–Wagner
theorem. Moreover, AKTL state provides us a precious exactly solvable example to
understand edge states and (symmetry-protected) topological orders.
AKLT state can be exactly written in an MPS with χ = 2 (see [8] for example).
Without losing generality, we assume periodic boundary condition. Let us begin
with the AKLT Hamiltonian that can be given by spin-1 operators as
ˆH =

n
1
2
ˆSn · ˆSn+1 + 1
6( ˆSn · ˆSn+1)2 + 1
3

.
(2.14)
By introducing the non-negative-deﬁned projector ˆP2( ˆSn + ˆSn+1) that projects the
neighboring spins to the subspace of S = 2, Eq. (2.14) can be rewritten in the
summation of projectors as
ˆH =

n
ˆP2( ˆSn + ˆSn+1).
(2.15)
Thus, the AKLT Hamiltonian is non-negative-deﬁned, and its ground state lies in its
kernel space, satisfying ˆH|ψAKLT ⟩= 0 with a zero energy.
Now we construct a wave-function which has a zero energy. As shown in Fig. 2.6,
we put on each site a projector that maps two (effective) spins-1/2 to a triplet, i.e.,
Fig. 2.5 One possible conﬁguration of the sparse anti-ferromagnetic ordered state. A dot repre-
sents the S = 0 state. Without looking at all the S = 0 states, the spins are arranged in the
anti-ferromagnetic way
Fig. 2.6 An intuitive graphic representation of the AKLT state. The big circles representing S = 1
spins, and the small ones are effective S = 1
2 spins. Each pair of spin-1/2 connecting by a red bond
forms a singlet state. The two “free” spin-1/2 on the boundary give the edge state


---
*Page 44*

32
2
Tensor Network: Basic Deﬁnitions and Properties
the physical spin-1, where the transformation of the basis obeys
|+⟩= |00⟩
(2.16)
|˜0⟩=
1
√
2
(|01⟩+ |10⟩),
(2.17)
|−⟩= |11⟩.
(2.18)
The corresponding projector is determined by the Clebsch–Gordan coefﬁcients [9],
and is a (3 × 4) matrix. Here, we rewrite it as a (3 × 2 × 2) tensor, whose three
components (regarding to the ﬁrst index) are the ascending, z-component, and
descending Pauli matrices of spin-1/2,5
σ + =
0
1
0
0

,
σ z =
 1
0
0 −1

,
σ −=
 0
0
1
0

.
(2.19)
In the language of MPS, we have the tensor A satisfying
A0,aa′ = σ +
aa′,
A1,aa′ = σ z
aa′,
A2,aa′ = σ −
aa′.
(2.20)
Then we put another projector to map two spin-1/2 to a singlet, i.e., a spin-0 with
|¯0⟩=
1
√
2
(|01⟩−|10⟩).
(2.21)
The projector is in fact a (2 × 2) identity with the choice of Eq. (2.19)
I =
 1
0
0
1

.
(2.22)
Now, the MPS of the AKLT state with periodic boundary condition (up to a
normalization factor) is obtained by Eq. (2.12), with every tensor A given by
Eq. (2.20). For such an MPS, every projector operator ˆP2( ˆSn + ˆSn+1) in the AKLT
Hamiltonian is always acted on a singlet, then we have ˆH|ψAKLT ⟩= 0.
2.2.4
Tree Tensor Network State (TTNS) and Projected
Entangled Pair State (PEPS)
TTNS is a generalization of the MPS that can code more general entanglement
states. Unlike an MPS where the tensors are aligned in a 1D array, a TTNS is given
5Here, one has some degrees of freedom to choose different projectors, which is only up to a gauge
transformation. But once one projector is ﬁxed, the other is also ﬁxed.


---
*Page 45*

2.2
Tensor Network and Tensor Network States
33
(a)
(b)
(c)
Fig. 2.7 The illustration of (a) and (b) two different TTNSs and (c) MERA
by a tree graph. Figure 2.7a, b shows two examples of TTNS with the coordination
number z = 3. The red bonds are the physical indexes and the black bonds are the
geometrical indexes connecting two adjacent tensors. The physical ones may locate
on each tensor or put on the boundary of the tree. A tree is a graph that has no
loops, which leads to many simple mathematical properties that parallel to those of
an MPS. For example, the partition function of a TTNS can be efﬁciently exactly
computed. A similar but more power TN state called MERA also has such a property
(Fig. 2.7c). We will get back to this in Sect. 2.3.6. Note an MPS can be treated as a
tree with z = 2.
An important generalization to the TNs of loopy structures is known as projected
entangled pair state (PEPS), proposed by Verstraete and Cirac [10, 11]. The tensors
of a PEPS are located in, instead of a 1D chain or a tree graph, a d-dimensional
lattice, thus graphically forming a d-dimensional TN. An intuitive picture of PEPS
is given in Fig. 2.8, i.e., the tensors can be understood as projectors that map the
physical spins into virtual ones. The virtual spins form the maximally entangled
state in a way determined by the geometry of the TN. Note that such an intuitive
picture was ﬁrstly proposed with PEPS [10], but it also applies to TTNS.
Similar to MPS, a TTNS or PEPS can be formally written as
|Ψ ⟩= tT r

n
P [n]|sn⟩,
(2.23)
where tT r means to sum over all geometrical indexes. Usually, we do not write
the formula of a TTNS or PEPS, but give the graph instead to clearly show the
contraction relations.
Such a generalization makes a lot of senses in physics. One key factor regards
the area law of entanglement entropy [12–17] which we will talk about later in this
chapter. In the following as two straightforward examples, we show that PEPS can
indeed represents non-trivial physical states including nearest-neighbor resonating
valence bond (RVB) and Z2 spin liquid states. Note these two types of states on
trees can be similarly deﬁned by the corresponding TTNS.


---
*Page 46*

34
2
Tensor Network: Basic Deﬁnitions and Properties
Fig. 2.8 (a) An intuitive picture of the projected entangled pair state. The physical spins (big
circles) are projected to the virtual ones (small circles), which form the maximally entangled states
(red bonds). (b)–(d) Three kinds of frequently used PEPSs
2.2.5
PEPS Can Represent Non-trivial Many-Body States:
Examples
RVB state was ﬁrstly proposed by Anderson to explain the possible disordered
ground state of the Heisenberg model on triangular lattice [18, 19]. RVB state
is deﬁned as the superposition of macroscopic conﬁgurations where all spins are
paired to form the singlet states (dimers). The strong ﬂuctuations are expected to
restore all symmetries and lead to a spin liquid state without any local orders. The
distance between two spins in a dimer can be short range or long range. For nearest-
neighbor RVB, the dimers are only the nearest neighbors (Fig. 2.9, also see [20]).
RVB state is supposed to relate to high-Tc copper-oxide-based superconductor.
By doping the singlet pairs, the insulating RVB state can translate to a charged
superconductive state [21–23].
For the nearest-neighbor situation, an RVB state (deﬁned on an inﬁnite square
lattice, for example) can be exactly written in a PEPS of χ = 3. Without losing
generality, we take the translational invariance, i.e., the TN is formed by inﬁnite


---
*Page 47*

2.2
Tensor Network and Tensor Network States
35
Fig. 2.9 The nearest-neighbor RVB state is the superposition of all possible conﬁgurations of
nearest-neighbor singlets
copies of several inequivalent tensors. Two different ways have been proposed
to construct the nearest-neighbor RVB PEPS [24, 25]. In addition, Wang et al.
proposed a way to construct the PEPS with long-range dimers [26]. In the following,
we explain the way proposed by Verstraete et al. to construct the nearest-neighbor
one [24]. There are two inequivalent tensors: the tensor deﬁned on each site whose
dimensions are (2 × 3 × 3 × 3 × 3) only has eight non-zero elements,
P0,0222 = P0,2022 = P0,2202 = P0,2220 = 1
(2.24)
P1,1222 = P1,2122 = P1,2212 = P1,2221 = 1
(2.25)
The two-dimensional index of P is a physical index with s = 0 representing spin
up and s = 1 spin down. The extra dimension for each of the other four geometrical
indexes is used for carrying the vacuum state. The tensor P is acting as projector
that maps the occupied geometrical index (either up or down) to a physical spin.
For example, P1,2122 means to map a virtual spin up which occupies the second
geometrical index to a real spin up. The rest elements are all zero, which means the
corresponding projections are forbidden.
Then a projector B is introduced for building spin singlets between two nearest-
neighbor sites connected by a shared geometrical bond in the RVB structure. B is a
(3 × 3) matrix with only three non-zero elements
B01 = 1, B10 = −1, B22 = 1.
(2.26)
Matrix B plays as a router, which only lets the singlet state deﬁned as |10⟩−|10⟩
and vacuum state go through the path.
Then the inﬁnite PEPS (iPEPS) of the nearest-neighbor RVB is given by the
contraction of inﬁnite copies of P’s on the sites and B’s (Fig. 2.8) on the bonds as
|Ψ ⟩=

{s,a}

n∈sites
Psn,a1na2na3na4n

m∈bonds
Ba1ma2m

j∈sites
|sj⟩.
(2.27)
After the contraction of all geometrical indexes, the state is the superposition of
all possible conﬁgurations consisting of nearest-neighbor dimers. This iPEPS looks
different from the one given in Eq. (2.23) but they are essentially the same, because


---
*Page 48*

36
2
Tensor Network: Basic Deﬁnitions and Properties
one can contract the B’s into P’s so that the PEPS is only formed by tensors deﬁned
on the sites.
Another example is the Z2 spin liquid state, which is one of simplest string-net
states [27–29], ﬁrstly proposed by Levin and Wen to characterize gapped topological
orders [30]. Similarly with the picture of strings, the Z2 state is the superposition of
all conﬁgurations of string loops. Writing such a state with TN, the tensor on each
vertex is (2 × 2 × 2 × 2) satisfying
Pa1···aN =
1, a1 + · · · + aN = even,
0, otherwise.
(2.28)
The tensor P forces the fusion rules of the strings: the number of the strings
connecting to a vertex must be even, so that there are no loose ends and all strings
have to form loops. It is also called in some literatures the ice rule [31, 32] or Gauss’
law [33]. In addition, the square TN formed solely by the tensor P gives the famous
eight-vertex model, where the number “eight” corresponds to the eight non-zero
elements (i.e., allowed sting conﬁgurations) on a vertex [34].
The tensors B are deﬁned on each bond to project the strings to spins, whose
non-zero elements are
B0,00 = 1, B1,11 = 1.
(2.29)
The tensor B is a projector that maps the spin-up (spin-down) state to the occupied
(vacuum) state of a string.
2.2.6
Tensor Network Operators
The MPS or PEPS can be readily generalized from representations of states to those
of operators called MPO [35–42] or projected entangled pair operator (PEPO)6 [43–
52]. Let us begin with MPO, which is also formed by the contraction of local tensors
as (Fig. 2.10)
ˆO =

{s,a}

n
W [n]
sns′n,anan+1|sn⟩⟨s′
n|.
(2.30)
Different from MPS, each tensor has two physical indexes, of which one is a
bra and the other is a ket index (Fig. 2.11). An MPO may represent several non-
trivial physical models, for example, the Hamiltonian. Crosswhite and Bacon [53]
proposed a general way of constructing an MPO called automata. Now we show
how to construct the MPO of an Hamiltonian using the properties of a triangular
6Generally, a representation of an operator with a TN can be called tensor product operator (TPO).
MPO and PEPO are two examples.


---
*Page 49*

2.2
Tensor Network and Tensor Network States
37
Fig. 2.10 The graphic representation of a matrix product operator, where the upward and
downward indexes represent the bra and ket space, respectively
Fig. 2.11 The graphic representation of a projected entangled pair operator, where the upward and
downward indexes represent the bra and ket space, respectively
MPO. Let us start from a general lower-triangular MPO satisfying W [n]
::,00 = C[n],
W [n]
::,01 = B[n], and W [n]
::,11 = A[n] with A[n], B[n], and C[n] some d × d square
matrices. We can write W [n] in a more explicit 2 × 2 block-wise form as
W [n] =
C[n]
0
B[n] A[n]

.
(2.31)
If one puts such a W [n] in Eq. (2.30), it will give the summation of all terms in the
form of
O =
N

n=1
A[1] ⊗· · · ⊗A[n−1] ⊗B[n] ⊗C[n+1] ⊗· · · ⊗C[N]
=
N

n=1
n−1

⊗i=1
A[i] ⊗B[n] ⊗
N

⊗j=n+1
C[j],
(2.32)


---
*Page 50*

38
2
Tensor Network: Basic Deﬁnitions and Properties
with N the total number of tensors and 
⊗the tensor product.7 Such a property can
be easily generalized to a W formed by D × D blocks.
Imposing Eq. (2.32), we can construct as an example the summation of one-site
local terms, i.e., 
n X[n],8 with
W [n] =
 I
0
X[n] I

,
(2.33)
with X[n] a d × d matrix and I the d × d identity.
If two-body terms are included, such as 
m X[m] + 
n Y [n]Z[n+1], we have
W [n] =
⎛
⎝
I
0
0
Z[n]
0
0
X[n] Y [n] I
⎞
⎠.
(2.34)
This can be obviously generalized to L-body terms. With open boundary conditions,
the left and right tensors are
W [1] =

I 0 0

,
(2.35)
W [N] =
⎛
⎝
0
0
I
⎞
⎠.
(2.36)
Now we apply the above technique on a Hamiltonian of, e.g., the Ising model in
a transverse ﬁeld
ˆH =

n
ˆSz
n ˆSz
n+1 + h

m
ˆSx
m.
(2.37)
Its MPO is given by
W [n] =
⎛
⎝
I
0 0
ˆSz
0 0
h ˆSx ˆSz I
⎞
⎠.
(2.38)
7For n = 0, A[0] (or B[0], C[0]) does not exist but can be deﬁned as a scalar 1, for simplicity of the
formula.
8Note that X[n1] and X[n2] are not deﬁned in a same space with n1 ̸= n2, Thus, precisely speaking,
 here is the direct sum. We will not specify this when it causes no confuse.


---
*Page 51*

2.2
Tensor Network and Tensor Network States
39
Such a way of constructing an MPO is very useful. Another example is the
Fourier transformation to the number operator of Hubbard model in momentum
space ˆnk = ˆb†
k ˆbk. The Fourier transformation is written as
ˆnk =
N

m,n=1
ei(m−n)k ˆb†
m ˆbn,
(2.39)
with ˆbn (ˆb†
n) the annihilation (creation) operator on the n-th site. The MPO
representation of such a Fourier transformation is given by
ˆWn =
⎛
⎜⎜⎝
ˆI
0
0
0
ˆb†
eik ˆI
0
0
ˆb
0
e−ik ˆI 0
ˆb† ˆb e+ik ˆb† e−ik ˆb ˆI
⎞
⎟⎟⎠,
(2.40)
with ˆI the identical operator in the corresponding Hilbert space.
The MPO formulation also allows for a convenient and efﬁcient representation
of the Hamiltonians with longer range interactions [54]. The geometrical bond
dimensions will in principle increase with the interaction length. Surprisingly,
a small dimension is needed to approximate the Hamiltonian with long-range
interactions that decay polynomially [46].
Besides, MPO can be used to represent the time evolution operator ˆU(τ) = e−τ ˆH
with Trotter–Suzuki decomposition, where τ is a small positive number called
Trotter–Suzuki step [55, 56]. Such an MPO is very useful in calculating real,
imaginary, or even complex time evolutions, which we will present later in detail.
An MPO can also give a mixed state.
Similarly, PEPS can also be generalized to projected entangled pair operator
(PEPO, Fig. 2.11), which on a square lattice, for instance, can be written as
ˆO =

{s,a}

n
W [n]
sns′n,a1na2na3na4n|sn⟩⟨s′
n|.
(2.41)
Each tensor has two physical indexes (bra and ket) and four geometrical indexes.
Each geometrical bond is shared by two adjacent tensors and will be contracted.
2.2.7
Tensor Network for Quantum Circuits
A special case of TN are quantum circuits [57]. Quantum circuits encode com-
putations made on qubits (or qudits in general). Figure 2.12 demonstrates the TN
representation of a quantum circuit made by unitary gates that act on a product state
of many constituents initialized as 
⊗|0⟩.


---
*Page 52*

40
2
Tensor Network: Basic Deﬁnitions and Properties
Fig. 2.12 The TN representation of a quantum circuit. Two-body unitaries act on a product state
of a given number of constituents |0⟩⊗· · · ⊗|0⟩and transform it into a target entangled state |ψ⟩
Fig. 2.13 (a) The past casual cone of the red site. The unitary gate U5 does not affect the reduced
density matrix of the red site. This is veriﬁed by computing explicitly ρA by tracing over all the
others constituents. (b) In the TN of ρA, U5 is contracted with U†
5 , which gives an identity
An Example of Quantum Circuits In order to make contact with TN, we will
consider the speciﬁc case of quantum circuits where all the gates act on at most
two neighbors. An example of such circuit is the Trotterized evolution of a system
described by a nearest-neighbor Hamiltonian ˆH = 
i,i+1 ˆhi,i+1, where i, i+1 label
the neighboring constituents of a one-dimensional system. The evolution operator
for a time t is ˆU(t) = exp(−i ˆHt), and can be decomposed into a sequence of
inﬁnitesimal time evolution steps [58] (more details will be given in Sect. 3.1.3)
ˆU(t) = lim
N→∞exp

−i t
N
ˆH
N
.
(2.42)
In the limit, we can decompose the evolution into a product of two-body evolution
ˆU(t) = lim
τ→0

i,i+1
ˆU(τ)i,i+1,
(2.43)
where ˆUi,i+1(τ) = exp(−iτ ˆhi,i+1) and τ = t/N. This is obviously a quantum
circuit made by two-qubit gates with depth N. Conversely, any quantum circuit
naturally possesses an arrow of time, it transforms a product state into an entangled
state after a sequence of two-body gates.
Casual Cone One interesting concept in a quantum circuit is that of the causal cone
illustrated in Fig. 2.13, which becomes explicit with the TN representations. Given
a quantum circuit that prepares (i.e., evolves the initial state to) the state |ψ⟩, we
can ask a question: which subset of the gates affect the reduced density matrix of a
certain subregion A of |ψ⟩? This can be seen by constructing the reduced density
matrix of the subregion A ρA = tr ¯A|ψ⟩⟨ψ| with ¯A the rest part of the system
besides A.


---
*Page 53*

2.2
Tensor Network and Tensor Network States
41
The TN of the reduced density matrix is formed by a set of unitaries that deﬁne
the past causal cone of the region A (see the area between the green lines in
Fig. 2.13). The rest unitaries (for instance, the ˆU5 and its conjugate in the right sub-
ﬁgure of Fig. 2.13) will be eliminated in the TN of the reduced density matrix. The
contraction of the causal cone can thus be rephrased in terms of the multiplication
of a set of transfer matrices, each performing the computation from t to t −1. The
maximal width of these transfer matrices deﬁnes the width of the causal cone, which
can be used as a good measure of the complexity of computing ρA [59]. The best
computational strategy one can ﬁnd to compute exactly ρA will indeed always scale
exponentially with the width of the cone [57].
Unitary Tensor Networks and Quantum Circuits The simplest TN, the MP can
be interpreted as a sequential quantum circuit [60]. The idea is that one can think
of the MPS as a sequential interaction between each constituent (a d-level system)
an ancillary D-level system (the auxiliary qDit, red bonds). The ﬁrst constituent
interacts (say the bottom one shown in Fig. 2.14) and then sequentially all the
constituents interact with the same D-level system. With this choice, the past causal
cone of a constituent is made by all the MPS matrices below it. Interestingly in
the MPS case, the causal cone can be changed using the gauge transformations
(see Sect. 2.4.2), something very different to what happens in two-dimensional
TNs. This amounts to ﬁnding appropriate unitary transformations acting on the
auxiliary degrees of freedom that allow to reorder the interactions between the
D-level system and the constituents. In such a way, a desired constituent can be
made to interact ﬁrst, then followed by the others. An example of the causal cone
in the center gauge used in iDMRG calculation [61] is presented in Fig. 2.15.
This idea allows to minimize the number of tensors in the causal cone of a given
region. However, the scaling of the computational cost of the contraction is not
affected by such a temporal reordering of the TN, since in this case the width of the
cone is bounded by one unitary in any gauge. The gauge choice just changes the
number of computational steps required to construct the desired ρA. In the case that
A includes non-consecutive constituents, the width of the cone increases linearly
Fig. 2.14 The MPS as a quantum circuit. Time ﬂows from right to left so that the lowest
constituent is the ﬁrst to interact with the auxiliary D-level system. Here we show the past causal
cone of a single constituent. Similarly, the past causal cone of A made by adjacent constituent has
the same form starting from the upper boundary of A


---
*Page 54*

42
2
Tensor Network: Basic Deﬁnitions and Properties
Fig. 2.15 Using the gauge degrees of freedom of an MPS, we can modify its past causal cone
structure to make its region as small as possible, in such a way decreasing the computational
complexity of the actual computation of speciﬁc ρA. A convenient choice is the center gauge used
in iDMRG
Fig. 2.16 The width of the causal cone increases as we increase the depth of the quantum circuit
generating the MPS state
with the number of constituents, and the complexity of computing ρA increases
exponentially with the number of constituents.
Again, the gauge degrees of freedom can be used to modify the structure of
the past causal cone of a certain spin. As an example, the iDMRG center gauge
is represented in Fig. 2.15.
An example of a TN with a larger past causal cone can be obtained by using more
than one layers of interactions. Now the support of the causal cone becomes larger
since it includes transfer matrices acting on two D-level systems (red bonds shown
in Fig. 2.16). Notice that this TN has loops but it still exactly contractible since the
width of the causal cone is still ﬁnite.
2.3
Tensor Networks that Can Be Contracted Exactly
2.3.1
Deﬁnition of Exactly Contractible Tensor Network States
The notion of the past causal cone can be used to classify TNSs based on the
complexity of computing their contractions. It is important to remember that the
complexity strongly depends on the object that we want to compute, not just the


---
*Page 55*

2.3
Tensor Networks that Can Be Contracted Exactly
43
TN. For example, the complexity of an MPS for a N-qubit state scales only linearly
with N. However, to compute the n-site reduced density matrix, the cost scales
exponentially with n since the matrix itself is an exponentially large object. Here
we consider to compute scalar quantities, such as the observables of one- and two-
site operators.
We deﬁne the a TNS to be exactly contractible when it is allowed to compute
their contractions with a cost that is a polynomial to the elementary tensor
dimensions D. A more rigorous deﬁnition can be given in terms of their tree width
see, e.g., [57]. From the discussion of the previous section, it is clear that such
a TNS corresponds to a bounded causal cone for the reduced density matrix of
a local subregion. In order to show this, we now focus on the cost of computing
the expectation value of local operators and their correlation functions on a few
examples of TNSs.
The relevant objects are thus the reduced density matrix of a region A made of
a few consecutive spins, and the reduced density matrix of two disjoint blocks A1
and A2 of which each made of a few consecutive spins. Once we have the reduced
density matrices of such regions, we can compute arbitrary expectation values of
local operators by ⟨O⟩=tr(ρAO) and ⟨OA1O′
A2⟩= tr(ρA1∪A2OA1O′
A2) with OA,
OA1, O′
A2 arbitrary operators deﬁned on the regions A, A1, A2.
2.3.2
MPS Wave-Functions
The simplest example of the computation of the expectation value of a local operator
is obtained by considering MPS wave-functions [8, 62]. Figure 2.17 shows an MPS
in the left-canonical form (see Sect. 5.1.3 for more details). Rather than putting
the arrows of time, here we put the direction in which the tensors in the TN are
isometric. In other words, an identity is obtained by contracting the inward bonds
of a tensor in |ψ⟩with the outward bonds of its conjugate in ⟨ψ| (Fig. 2.18). Note
that |ψ⟩and ⟨ψ| have opposite arrows, by deﬁnition. These arrows are directly on
the legs of the tensors. The arrows in |ψ⟩are in the opposite direction than the time,
by comparing Fig. 2.14 with Fig. 2.18. The two ﬁgures indeed represent the MPS
in the same gauge. This means that the causal cone of an observable is on the right
of that observable, as shown on the second line of Fig. 2.18, where all the tensors
on the left side are annihilated as a consequence of the isometric constraints. We
Fig. 2.17 The MPS wave-function representation in left-canonical form


---
*Page 56*

44
2
Tensor Network: Basic Deﬁnitions and Properties
Fig. 2.18 The expectation value of a single-site operator with an MPS wave-function
Fig. 2.19 Two-point correlation function of an MPS wave-function
immediately have that the causal cone has at most the width of two. The contraction
becomes a power of the transfer operator of the MPS E = 
i Ai ⊗Ai†, where Ai
and Ai† represent the MPS tensors and its complex conjugate. The MPS transfer
matrix E only acts on two auxiliary degrees of freedom. Using the property that E
is a completely positive map and thus has a ﬁxed point [8], we can substitute the
transfer operator by its largest eigenvector v, leading to the ﬁnal TN diagram that
encodes the expectation value of a local operator.
In Fig. 2.19, we show the TN representation of the expectation value of the two-
point correlation functions. Obviously, the past causal cone width is bounded by
two auxiliary sites. Note that in the second line, the directions of the arrows on the
right side are changed. This in general does not happen in more complicated TNs as
we will see in the next subsection. Before going there, we would like to comment
the properties of the two-point correlation functions of MPS. From the calculation
we have just performed, we see that they are encoded in powers of the transfer
matrix that evolve the system in the real space. If that matrix can be diagonalized,
we can immediately see that the correlation functions naturally decay exponentially
with the ratio of the ﬁrst to the second eigenvalue. Related details can be found in
Sect. 5.4.2.


---
*Page 57*

2.3
Tensor Networks that Can Be Contracted Exactly
45
2.3.3
Tree Tensor Network Wave-Functions
An alternative kind of wave-functions are the TTNSs [63–69]. In a TTNS, one can
add the physical bond on each of the tensor, and use it as a many-body state deﬁned
on a Caley-tree lattice [63]. Here, we will focus on the TTNS with physical bonds
only on the outer leafs of the tree.
The calculations with a TTNS normally correspond to the contraction of tree
TNs. A speciﬁc case of a two-to-one TTNS is illustrated in Fig. 2.20, named binary
Caley tree. This TN can be interpreted as a quantum state of multiple spins with
different boundary conditions. It can also be considered as a hierarchical TN, in
which each layer corresponds to a different level of coarse-graining renormalization
group (RG) transformation [64]. In the ﬁgure, different layers are colored differ-
ently. In the ﬁrst layer, each tensor groups two spins into one and so on. The tree TN
can thus be interpreted a speciﬁc RG transformation. Once more, the arrows on the
tensors indicate the isometric property of each individual tensor that the directions
are opposite as the time, if we interpret the tree TN as a quantum circuit. Note again
that |ψ⟩and ⟨ψ| have opposite arrows, by deﬁnition.
The expectation value of a one-site operator is in fact a tree TN shown in
Fig. 2.21. We see that many of the tensors are completely contracted with their
Hermitian conjugates, which simply give identities. What are left is again a bounded
causal cone. If we now build an inﬁnite TTNS made by inﬁnitely many layers, and
assume the scale invariance, the multiplication of inﬁnitely many power of the scale
Fig. 2.20 A binary TTNS made of several layers of third-order tensors. Different layers are
identiﬁed with different colors. The arrows ﬂow in the opposite direction of the time while being
interpreted as a quantum circuit


---
*Page 58*

46
2
Tensor Network: Basic Deﬁnitions and Properties
Fig. 2.21 The expectation value of a local operator of a TTNS. We see that after applying the
isometric properties of the tensors, the past causal cone of a single site has a bounded width. The
calculation again boils down to a calculation of transfer matrices. This time the transfer matrices
evolve between different layers of the tree
Fig. 2.22 The computation of the correlation function of two operators separated by a given
distance boils down to the computation of a certain power of transfer matrices. The computation
of the casual cone can be simpliﬁed in a sequential way, as depicted in the last two sub-ﬁgures
transfer matrix can be substituted with the corresponding ﬁxed point, leading to a
very simple expression for the TN that encodes the expectation value of a single-site
operator.
Similarly, if we compute the correlation function of local operators at a given
distance, as shown in Fig. 2.22, we can once more get rid of the tensors outside the
casual cone. Rigorously we see that the causal cone width now increases to four
sites, since it consists of two different two-site branches. However, if we order the


---
*Page 59*

2.3
Tensor Networks that Can Be Contracted Exactly
47
contraction as shown in the middle, we see that the contractions boil down again to a
two-site causal cone. Interestingly, since the computation of two-point correlations
at very large distance involves the power of transfer matrices that translate in scale
rather than in space, one would expect that these matrices are all the same (as a
consequence of scale-invariance, for example). Thus, we would get polynomially
decaying correlations [70].
2.3.4
MERA Wave-Functions
Until now, we have discussed with the TNs that, even if they can be embedded in
a 2D space, they contain no loops. In the context of network complexity theory,
they are called mean-ﬁeld networks [71]. However, there are also TNs with loops
that are exactly contractible [57]. A particular case is that of a 1D MERA (and
its generalizations) [72–76]. The MERA is again a TN that can be embedded in
a 2D plane, and that is full of loops as seen in Fig. 2.23. This TN has a very
peculiar structure, again, inspired from RG transformation [77]. MERA can also be
interpreted as a quantum circuit where the time evolves radially along the network,
once more opposite to the arrows that indicate the direction along which the tensors
are unitary. The MERA is a layered TN, with where layer (in different colors in
the ﬁgure) is composed by the appropriate contraction of some third-order tensors
(isometries) and some fourth-order tensors (disentangler). The concrete form of the
Fig. 2.23 The TN of MERA. The MERA has a hierarchical structure consisting of several layers
of disentanglers and isometries. The computational time ﬂows from the center towards the edge
radially, when considering MERA as a quantum circuit. The unitary and isometric tensors and the
network geometry are chosen in order to guarantee that the width of the causal cone is bounded


---
*Page 60*

48
2
Tensor Network: Basic Deﬁnitions and Properties
Fig. 2.24 Past causal cone of a single-site operator for a MERA
Fig. 2.25 Two-point correlation function in the MERA
network is not really important [76]. In this speciﬁc case we are plotting a two-to-
one MERA that was discussed in the original version of Ref. [75]. Interestingly, an
operator deﬁned on at most two sites gives a bounded past causal cone as shown in
Figs. 2.24 and 2.25.
As in the case of the TTNS, we can indeed perform the explicit calculation of
the past causal cone of a single-site operator (Fig. 2.24). There we show the TN
contraction of the required expectation value, and then simplify it by taking into
account the contractions of the unitary and isometric tensors outside the casual cone
with a bounded width involving at most four auxiliary constituents.
The calculation of a two-point correlation function of local operators follows a
similar idea and leads to the contraction shown in Fig. 2.25. Once more, we see that
the computation of the two-point correlation function can be done exactly due to the
bounded width of the corresponding casual cone.
2.3.5
Sequentially Generated PEPS Wave-Functions
The MERA and TTNS can be generalized to two-dimensional lattices [64, 74]. The
generalization of MPS to 2D, on the other hand, gives rise to PEPS. In general, it
belongs to the 2D TNs that cannot be exactly contracted [24, 78].


---
*Page 61*

2.3
Tensor Networks that Can Be Contracted Exactly
49
Fig. 2.26 (a) A sequentially generated PEPS. All tensors but the central one (green in the ﬁgure)
are isometries, from the in-going bonds (marked with ingoing arrows) to the outgoing ones. The
central tensor represents a normalized vector on the Hilbert space constructed by the physical
Hilbert space and the four copies of auxiliary spaces, one for each of its legs. (b) The norm of such
PEPS, after implementing the isometric constraints, boils down to the norm of its central tensor
However for a subclass of PEPS, one can implement the contract exactly, which
is called sequentially generated PEPS [79]. Differently from the MERA where the
computation of the expectation value of any sufﬁciently local operator leads to a
bounded causal cone, sequentially generated PEPS has a central site, and the local
observables around the central site can be computed easily. However, the local
observables in other regions of the TN give larger causal cones. For example, we
represent in Fig. 2.26a sequentially generated PEPS for a 3 × 3 lattice. The norm
of the state is computed in (b), where the TN boils down to the norm of the central
tensor. Some of the reduced density matrices of the system are also easy to compute,
in particular those of the central site and its neighbors (Fig. 2.27a). Other reduced
density matrices, such as those of spins close to the corners, are much harder to
compute. As illustrated in Fig. 2.27b, the causal cone of a corner site in a 3 × 3
PEPS has a width 2. In general for an L × L PEPS, the casual cone would have a
width L/2.
Differently from MPS, the causal cone of a PEPS cannot be transformed by
performing a gauge transformation. However, as ﬁrstly observed by F. Cucchietti
(private communication), one can try to approximate a PEPS of a given causal cone
with another one of a different causal cone, by, for example, moving the center
site. This is not an exact operation, and the approximations involved in such a
transformation need to be addressed numerically. The systematic study of the effect
of these approximations has been studied recently in [80, 81]. In general, we have
to say that the contraction of a PEPS wave-function can only be performed exactly
with exponential resources. Therefore, efﬁcient approximate contraction schemes
are necessary to deal with PEPS.


---
*Page 62*

50
2
Tensor Network: Basic Deﬁnitions and Properties
Fig. 2.27 (a) The reduced density matrices of a PEPS that is sequentially generated containing
two consecutive spins (one of them is the central spin. (b) The reduced density matrix of a local
region far from the central site is generally hard to compute, since it can give rise to an arbitrarily
large causal cone. For the reduced density matrix of any of the corners with a L × L PEPS, which
is the most consuming case, it leads to a causal cone with a width up to L/2. That means the
computation is exponentially expensive with the size of the system
Fig. 2.28 If one starts with contracting an arbitrary bond, there will be a tensor with six bonds.
As the contraction goes on, the number of bonds increases linearly with the boundary ∂of the
contracted area, thus the memory increases exponentially as O(χ∂) with χ the bond dimension
2.3.6
Exactly Contractible Tensor Networks
We have considered above, from the perspective of quantum circuits, whether a TNS
can be contracted exactly by the width of the casual cones. Below, we reconsider this
issue from the aspect of TN.
Normally, a TN cannot be contracted without approximation. Let us consider a
square TN, as shown in Fig. 2.28. We start from contracting an arbitrary bond in
the TN (yellow shadow). Consequently, we obtain a new tensor with six bonds
that contains χ6 parameters (χ is the bond dimension). To proceed, the bonds
adjacent to this tensor are probably a good choice to contract next. Then we will
have to restore a new tensor with eight bonds. As the contraction goes on, the


---
*Page 63*

2.3
Tensor Networks that Can Be Contracted Exactly
51
Fig. 2.29 Two kinds of TNs that can be exactly contracted: (a) tree and (b) fractal TNs. In (b), the
shadow shows the Sierpi´nski gasket, where the tensors are deﬁned in the triangles
number of bonds increases linearly with the boundary ∂of the contracted area, thus
the memory increases exponentially as O(χ∂). For this reason, it is impossible to
exactly contract a TN, even if it only contains a small number of tensors. Thus,
approximations are inevitable. This computational difﬁculty is closely related to the
area law of entanglement entropy [17] (also see Sect. 2.4.3), or the width of the
casual cone as in the case of PEPS. Below, we give three examples of TNs that can
be exactly contracted.
Tensor Networks on Tree Graphs We here consider a scalar tree TN (Fig. 2.29a)
with NL layers of third-order tensors. Some vectors are put on the outmost boundary.
An example that a tree TN may represent is an observable of a TTNS. A tree TN is
written as
Z =

{a}
NL

n=1
Mn

m=1
T [n,m]
an,m,1,an,m,2,an,m,3

k
v[k]
ak ,
(2.44)
with T [n,m] the m-th tensor on the n-th layer, Mn the number of tensors of the n-th
layer, and v[k] the k-th vectors on the boundary.
Now we contract each of the tensor on the NL-th layer with the corresponding
two vectors on the boundary as
v′
a3 =

a1a2
T [NLm]
a1a2a3 v[k1]
a1 v[k2]
a2 .
(2.45)
After the vectors are updated by the equation above, and the number of layers of the
tree TN becomes NL −1. The whole tree TN can be exactly contracted by repeating
this procedure.
We can see from the above contraction that if the graph does not contain any
loops, i.e., has a tree-like structure, the dimensions of the obtained tensors during


---
*Page 64*

52
2
Tensor Network: Basic Deﬁnitions and Properties
the contraction will not increase unboundedly. Therefore, the TN deﬁned on it can
be exactly contracted. This is again related to the area law of entanglement entropy
that a loop-free TN satisﬁes: to separate a tree-like TN into two disconnecting parts,
the number of bonds that needs to be cut is only one. Thus, the upper bond of
the entanglement entropy between these two parts is constant, determined by the
dimension of the bond that is cut. This is also consistent with the analyses based on
the maximal width of the casual cones.
Tensor Networks on Fractals Another example that can be exactly contracted is the
TN deﬁned on the fractal called Sierpi´nski gasket (Fig. 2.29b) (see, e.g., [82, 83]).
The TN can represent the partition function of the statistical model deﬁned on the
Sierpi´nski gasket, such as Ising and Potts model. As explained in Sec. II, the tensor
is given by the probability distribution of the three spins in a triangle.
Such a TN can be exactly contracted by iteratively contracting each three of the
tensors located in a same triangle as
T ′
a1a2a3 =

b1b2b3
Ta1b1b2Ta2b2b3Ta3b3b1.
(2.46)
After each round of contractions, the dimension of the tensors and the geometry
of the network keep unchanged, but the number of the tensors in the TN decreases
from N to N/3. It means we can exactly contract the whole TN by repeating the
above process.
Algebraically Contractible Tensor Networks The third example is called alge-
braically contractible TNs [84, 85]. The tensors that form the TN possess some
special algebraic properties, so that even the bond dimensions increase after each
contraction, the rank of the bonds is kept unchanged. It means one can introduce
some projectors to lower the bond dimension without causing any errors.
The simplest algebraically contractible TN is the one formed by the super-
diagonal tensor I deﬁned as
Ia1,··· ,aN =
 1, a1 = · · · = aN,
0, otherwise.
(2.47)
I is also called copy tensor, since it forces all its indexes to take a same value.
For a square TN of an arbitrary size formed by the fourth-order Is, obviously
we have its contraction Z = d with d the bond dimension. The reason is that the
contraction is the summation of only d non-zero values (each equals to 1).
To demonstrate its contraction, we will need one important property of the copy
tensor (Fig. 2.30): if there are n ≥1 bonds contracted between two copy tensors,
the contraction gives a copy tensor
Ia1···b1··· =

c1···
Ia1···c1···Ib1···c1···.
(2.48)


---
*Page 65*

2.3
Tensor Networks that Can Be Contracted Exactly
53
Fig. 2.30 The fusion rule of the copy tensor: the contraction of two copy tensors of N1-th and
N2-th order gives a copy tensor of (N1 + N2 −N)-th order, with N the number of the contracted
bonds
This property is called the fusion rule, and can be understood in the opposite way: a
copy tensor can be decomposed as the contraction of two copy tensors.
With the fusion rule, one will readily have the property for the dimension
reduction: if there are n ≥1 bonds contracted between two copy tensors, the
contraction is identical after replacing the n bonds with one bond

c1···cn
Ia1···c1···cnIb1···c1··· =

c
Ia1···cIb1···c.
(2.49)
In other words, the dimension of the contracting bonds can be exactly reduced
from χn to χ. Applying this property to TN contraction, it means each time when
the bond dimension increases after contracting several tensors into one tensor, the
dimension can be exactly reduced to χ, so that the contraction can continue until all
bonds are contracted.
From the TN of the copy tensors, a class of exactly contractible TN can be
deﬁned, where the local tensor is the multiplication of the copy tensor by several
unitary tensors. Taking the square TN as example, we have
Ta1a2a3a4 =

b1b2b3b4
Xb1Ib1b2b3b4Ua1b1Va2b2U∗
a3b3V ∗
a4b4,
(2.50)
with U and V two unitary matrices. X is an arbitrary d-dimensional vector that can
be understood as the “weights” (not necessarily to be positive to deﬁne the tensor).
After putting the tensors in the TN, all unitary matrices vanish to identities. Then
one can use the fusion rule of the copy tensor to exactly contract the TN, and the
contraction gives Z = 
b(Xb)NT with NT the total number of tensors.
The unitary matrices are not trivial in physics. If we take d = 2 and
U = V =
√
2/2
√
2/2
√
2/2 −
√
2/2

,
(2.51)
the TN is in fact the inner product of the Z2 topological state (see the deﬁnition of
Z2 PEPS in Sect. 2.2.3). If one cuts the system into two subregions, all the unitary
matrices vanish into identities inside the bulk. However, those on the boundary will
survive, which could lead to exotic properties such as topological orders, edge states,


---
*Page 66*

54
2
Tensor Network: Basic Deﬁnitions and Properties
and so on. Note that Z2 state is only a special case. One can refer to a systematic
picture given by X. G. Wen called the string-net states [27–29].
2.4
Some Discussions
2.4.1
General Form of Tensor Network
One can see that a TN (state or operator) is deﬁned as the contraction of certain
tensors {T [n]} with a general form as
T{s} =

{a}

n
T [n]
sn
1 sn
2 ··· ,an
1an
2···.
(2.52)
The indexes {a} are geometrical indexes, each of which is shared normally two
tensors and will be contracted. The indexes {s} are open bonds, each of which
only belongs to one tensor. After contracting all the geometrical indexes, the TN
represents a N -th order tensor, with N the total number of the open indexes {s}.
Each tensor in the TN can possess different number of open or geometrical
indexes. For an MPS, each tensor has one open index (called physical bond) and
two geometrical indexes; for PEPS on square lattice, it has one open and four
geometrical indexes. For the generalizations of operators, the number of open
indexes is two for each tensor. It also allows hierarchical structure of the TN, such
as TTNS and MERA.
One special kind of the TNs is the scalar TN with no open bonds, denoted as
Z =

{a}

n
T [n]
an
1an
2···.
(2.53)
It is very important because many physical problems can be transformed to
computing the contractions of scalar TNs. A scalar TN can be obtained from the
TNs that has open bonds, such as Z = 
{s} T{s} or Z = 
{s} T †
{s}T{s}, where Z
can be the cost function (e.g., energy or ﬁdelity) to be maximized or minimized. The
TN contraction algorithms mainly deal with the scalar TNs.
2.4.2
Gauge Degrees of Freedom
For a given state, its TN representation is not unique. Let us take translational
invariant MPS as an example. One may insert a (full-rank) matrix U and its
inverse U−1 on each of the virtual bonds and then contracted them, respectively,
into the two neighboring tensors. The tensors of new MPS become ˜A[n]
s,aa′ =


---
*Page 67*

2.4
Some Discussions
55

bb′ UabA[n]
s,bb′U−1
a′b′. In fact, we only put an identity I = UU−1, thus do not
implement any changes to the MPS. However, the tensors that form the MPS change,
meaning the TN representation changes. It is also the case when inserting an matrix
and its inverse on any of the virtual bonds of a TN state, which changes the tensors
without changing the state itself. Such degrees of freedom is known as the gauge
degrees of freedom, and the transformations are called gauge transformations.
The gauge degrees of on the one hand may cause instability to TN simulations.
Algorithms for ﬁnite and inﬁnite PEPS were proposed to ﬁx the gauge to reach
higher stability [86–88]. On the other hand, one may use gauge transformation to
transform a TN state to a special form, so that, for instance, one can implement
truncations of local basis while minimizing the error non-locally [45, 89] (we will
go back to this issue later). Moreover, gauge transformation is closely related to
other theoretical properties such as the global symmetry of TN states, which has
been used to derive more compact TN representations [90], and to classify many-
body phases [91, 92] and to characterize non-conventional orders [93, 94], just to
name a few.
2.4.3
Tensor Network and Quantum Entanglement
The numerical methods based on TN face great challenges, primarily that the
dimension of the Hilbert space increases exponentially with the size. Such an
“exponential wall” has been treated in different ways by many numeric algorithms,
including the DFT methods [95] and QMC approaches [96].
The power of TN has been understood in the sense of quantum entanglement:
the entanglement structure of low-lying energy states can be efﬁciently encoded
in TNSs. It takes advantage of the fact that not all quantum states in the total
Hilbert space of a many-body system are equally relevant to the low-energy or low-
temperature physics. It has been found that the low-lying eigenstates of a gapped
Hamiltonian with local interactions obey the area law of the entanglement entropy
[97].
More precisely speaking, for a certain subregion R of the system, its reduced
density matrix is deﬁned as ˆρR = TrE ( ˆρ), with E denotes the spatial complement
of R. The entanglement entropy is deﬁned as
S(ρR) = −Tr{ρRlog(ρR)}.
(2.54)
Then the area law of the entanglement entropy [17, 98] reads
S(ρR) = O(|∂R|),
(2.55)


---
*Page 68*

56
2
Tensor Network: Basic Deﬁnitions and Properties
with |∂R| the size of the boundary. In particular, for a D-dimensional system, one
has
S = O(lD−1),
(2.56)
with l the length scale. This means that for 1D systems, S = const. The area law
suggests that the low-lying eigenstates stay in a “small corner” of the full Hilbert
space of the many-body system, and that they can be described by a much smaller
number of parameters. We shall stress that the locality of the interactions is not
sufﬁcient to the area law. Vitagliano et al. show that simple 1D spin models can
exhibit volume law, where the entanglement entropy scales with the bulk [99, 100].
The area law of entanglement entropy is intimately connected to another fact that
a non-critical quantum system exhibits a ﬁnite correlation length. The correlation
functions between two blocks in a gapped system decay exponentially as a function
of the distance of the blocks [101], which is argued to lead to the area law. An
intuitive picture can be seen in Fig. 2.31. Let us consider a 1D gapped quantum
system whose ground state |ψABC⟩possesses a correlation length ξcorr. By dividing
into three subregions A, B, and C, the reduced density operator ˆρAC is obtained
when tracing out the block B, i.e., ˆρAC = TrB|ψABC⟩⟨ψABC| (see Fig. 2.32). In
Fig. 2.31 Bipartition of a 1D system into two half chains. Signiﬁcant quantum correlations in
gapped ground states occur only on short length scales
Fig. 2.32 To argue the 1D area law, the chain is separated into three subsystems denoted by A,
B, and C. If the correlation length ξcorr is much larger than the size of B (denoted by lAC), the
reduced density matrix by tracing B approximately satisﬁes ˆρAC ≃ˆρA ⊗ˆρC


---
*Page 69*

2.4
Some Discussions
57
the limit of large distance between A and C blocks with lAC ≫ξcorr, one has the
reduced density matrix satisfying
ˆρAC ≃ˆρA ⊗ˆρC,
(2.57)
up to some exponentially small corrections. Then |ψABC⟩is a puriﬁcation9 of a
mixed state with the form |ψABl⟩⊗|ψBrC⟩that has no correlations between A and
C; here Bl and Br sit at the two ends of the block B, which together span the original
block.
It is well known that all possible puriﬁcations of a mixed state are equivalent
to each other up to a local unitary transformation on the virtual Hilbert space.
This naturally implies that there exists a unitary operation ˆUB on the block B that
completely disentangles the left from the right part as
ˆIA ⊗ˆUB ⊗ˆIC|ψABC⟩→|ψABl⟩⊗|ψBrC⟩.
(2.58)
ˆUB implies that there exists a tensor Bs,aa′ with 0 ≤a, a′, s ≤χ −1 and basis
{|ψA⟩}, {|ψB⟩}, {|ψC⟩} deﬁned on the Hilbert spaces belonging to A, B, C such
that
|ψABC⟩≃

saa′
Bs,aa′|ψA
a ⟩|ψB
s ⟩|ψC
a′⟩.
(2.59)
This argument directly leads to the MPS description and gives a strong hint that
the ground states of a gapped Hamiltonian is well represented by an MPS of ﬁnite
bond dimensions, where B in Eq. (2.59) is analog to the tensor in an MPS. Let us
remark that every state of N spins has an exact MPS representation if we allow χ
to grow exponentially with the number of spins [102]. The whole point of MPS is
that a ground state can typically be represented by an MPS where the dimension χ
is small and scales at most polynomially with the number of spins: this is the reason
why MPS-based methods are more efﬁcient than exact diagonalization.
For the 2D PEPS, it is more difﬁcult to strictly justify the area law of entan-
glement entropy. However, we can make some sense of it from the following
aspects. One is the fact that PEPS can exactly represent some non-trivial 2D states
that satisﬁes the area law, such as the nearest-neighbor RVB and Z2 spin liquid
mentioned above. Another is to count the dimension of the geometrical bonds D
between two subsystems, from which the entanglement entropy satisﬁes an upper
bound as S ≤log D.10
9Puriﬁcation: Let ρ be a density matrix acting on a Hilbert space HA of ﬁnite dimension n. Then
there exists a Hilbert space HB and a pure state |ψ⟩∈HA ⊗HB such that the partial trace of
|ψ⟩⟨ψ| with respect to HB: ρ = T rB|ψ⟩⟨ψ|. We say that |ψ⟩is the puriﬁcation of ˆρ.
10One can see this with simply a ﬂat entanglement spectrum, λn = 1/D for any n.


---
*Page 70*

58
2
Tensor Network: Basic Deﬁnitions and Properties
After dividing a PEPS into two subregions, one can see that the number of
geometrical bonds Nb increase linearly with the length scale, i.e., Nb ∼l. It means
the dimension D satisﬁes D ∼χl, and the upper bound of the entanglement entropy
fulﬁlls the area law given by Eq. (2.56), which is
S ≤O(l).
(2.60)
However, as we will see later, such a property of PEPS is exactly the reason that
makes it computationally difﬁcult.
References
1. E. Schmidt, Zur theorie der linearen und nichtlinearen integralgleichungen. I. Teil: Entwick-
lung willkürlicher funktionen nach systemen vorgeschriebener. Math. Ann. 63, 433–476
(1907)
2. A. Ekert, P.L. Knight, Entangled quantum systems and the Schmidt decomposition. Am. J.
Phys. 63(5), 415–423 (1995)
3. A. Peres, Quantum Theory: Concepts and Methods (Springer Netherlands, 2002)
4. M.A. Nielsen, I.L. Chuang, Quantum Computation and Quantum Information, 10th edn.
(Cambridge University Press, Cambridge, 2010)
5. U. Schollwöck, The density-matrix renormalization group in the age of matrix product states.
Ann. Phys. 326, 96–192 (2011)
6. I.V. Oseledets, Tensor-train decomposition. SIAM J. Sci. Comput. 33(5), 2295–2317 (2011)
7. I. Afﬂeck, T. Kennedy, E.H. Lieb, H. Tasaki, Rigorous results on valence-bond ground states
in antiferromagnets. Phys. Rev. Lett. 59, 799 (1987)
8. D. Pérez-García, F. Verstraete, M.M. Wolf, J.I. Cirac, Matrix Product State Representations.
Quantum Inf. Comput. 7, 401 (2007)
9. J.J. de Swart, The octet model and its Clebsch-Gordan coefﬁcients. Rev. Mod. Phys. 35, 916–
939 (1963)
10. F. Verstraete, J.I. Cirac, Valence-bond states for quantum computation. Phys. Rev. A 70,
060302 (2004)
11. F. Verstraete, J.I. Cirac, Renormalization algorithms for quantum-many body systems in two
and higher dimensions (2004). arXiv preprint:cond-mat/0407066
12. J.D. Bekenstein, Black holes and entropy. Phys. Rev. D 7, 2333–2346 (1973)
13. M. Srednicki, Entropy and area. Phys. Rev. Lett. 71, 666–669 (1993)
14. J.I. Latorre, E. Rico, G. Vidal, Ground state entanglement in quantum spin chains. Quantum
Inf. Comput. 4, 48 (2004)
15. P. Calabrese, J. Cardy, Entanglement entropy and quantum ﬁeld theory. J. Stat. Mech. Theor.
Exp. 2004(06) (2004)
16. M.B. Plenio, J. Eisert, J. Dreissig, M. Cramer, Entropy, entanglement, and area: analytical
results for harmonic lattice systems. Phys. Rev. Lett. 94, 060503 (2005)
17. J. Eisert, M. Cramer, M.B. Plenio, Colloquium: area laws for the entanglement entropy. Rev.
Mod. Phys. 82, 277 (2010)
18. P.W. Anderson, Resonating valence bonds: a new kind of insulator? Mater. Res. Bull. 8(2),
153–160 (1973)
19. P.W. Anderson, On the ground state properties of the anisotropic triangular antiferromagnet.
Philos. Mag. 30, 432 (1974)
20. L. Balents, Spin liquids in frustrated magnets. Nature 464, 199 (2010)


---
*Page 71*

References
59
21. P.W. Anderson, The resonating valence bond state in La2CuO4 and superconductivity. Science
235, 1196 (1987)
22. G. Baskaran, Z. Zou, P.W. Anderson, The resonating valence bond state and high-Tc
superconductivity—a mean ﬁeld theory. Solid State Commun. 63(11), 973–976 (1987)
23. P.W. Anderson, G. Baskaran, Z. Zou, T. Hsu, Resonating-valence-bond theory of phase
transitions and superconductivity in La2CuO4-based compounds. Phys. Rev. Lett. 58, 2790–
2793 (1987)
24. F. Verstraete, M.M. Wolf, D. Perez-Garcia, J.I. Cirac, Criticality, the area law, and the
computational power of projected entangled pair states. Phys. Rev. Lett. 96, 220601 (2006)
25. N. Schuch, D. Poilblanc, J.I. Cirac, D. Pérez-García, Resonating valence bond states in the
PEPS formalism. Phys. Rev. B 86, 115108 (2012)
26. L. Wang, D. Poilblanc, Z.-C. Gu, X.-G Wen, F. Verstraete, Constructing a gapless spin-liquid
state for the spin-1/2 j1–j2 Heisenberg model on a square lattice. Phys. Rev. Lett. 111,
037202 (2013)
27. Z.C. Gu, M. Levin, B. Swingle, X.G. Wen, Tensor-product representations for string-net
condensed states. Phys. Rev. B 79, 085118 (2009)
28. O. Buerschaper, M. Aguado, G. Vidal, Explicit tensor network representation for the ground
states of string-net models. Phys. Rev. B 79, 085119 (2009)
29. X. Chen, B. Zeng, Z.C. Gu, I.L. Chuang, X.G. Wen, Tensor product representation of a
topological ordered phase: necessary symmetry conditions. Phys. Rev. B 82, 165119 (2010)
30. M. Levin, X.G. Wen, String-net condensation: a physical mechanism for topological phases.
Phys. Rev. B 71, 045110 (2005)
31. S.T. Bramwell, M.J.P. Gingras, Spin ice state in frustrated magnetic pyrochlore materials.
Science 294(5546), 1495–1501 (2001)
32. J.D. Bernal, R.H. Fowler, A theory of water and ionic solution, with particular reference to
hydrogen and hydroxyl Ions. J. Chem. Phys. 1(8), 515–548 (1933)
33. T. Fennell, P.P. Deen, A.R. Wildes, K. Schmalzl, D. Prabhakaran, A.T. Boothroyd, R.J. Aldus,
D.F. McMorrow, S.T. Bramwell, Magnetic coulomb phase in the spin ice HO2Ti2O7. Science
326(5951), 415–417 (2009)
34. R.J. Baxter, Eight-vertex model in lattice statistics. Phys. Rev. Lett. 26, 832–833 (1971)
35. F. Verstraete, J.J. García-Ripoll, J.I. Cirac, Matrix product density operators: simulation of
ﬁnite-temperature and dissipative systems. Phys. Rev. Lett. 93, 207204 (2004)
36. M. Zwolak, G. Vidal, Mixed-state dynamics in one-dimensional quantum lattice systems: a
time-dependent superoperator renormalization algorithm. Phys. Rev. Lett. 93, 207205 (2004)
37. B. Pirvu, V. Murg, J.I. Cirac, F. Verstraete, Matrix product operator representations. New J.
Phys. 12(2), 025012 (2010)
38. W. Li, S. J. Ran, S.S. Gong, Y. Zhao, B. Xi, F. Ye, G. Su, Linearized tensor renormalization
group algorithm for the calculation of thermodynamic properties of quantum lattice models.
Phys. Rev. Lett. 106, 127202 (2011)
39. J. Becker, T. Köhler, A.C. Tiegel, S.R. Manmana, S. Wessel, A. Honecker, Finite-temperature
dynamics and thermal intraband magnon scattering in Haldane spin-one chains. Phys. Rev. B
96, 060403 (2017)
40. A.A. Gangat, I. Te, Y.-J. Kao, Steady states of inﬁnite-size dissipative quantum chains via
imaginary time evolution. Phys. Rev. Lett. 119, 010501 (2017)
41. J. Haegeman, F. Verstraete, Diagonalizing transfer matrices and matrix product operators: a
medley of exact and computational methods. Ann. Rev. Condens. Matter Phys. 8(1), 355–406
(2017)
42. J.I. Cirac, D. Pérez-García, N. Schuch, F. Verstraete, Matrix product density operators:
renormalization ﬁxed points and boundary theories. Ann. Phys. 378, 100–149 (2017)
43. P. Czarnik, L. Cincio, J. Dziarmaga, Projected entangled pair states at ﬁnite temperature:
imaginary time evolution with ancillas. Phys. Rev. B 86, 245101 (2012)
44. S.J. Ran, B. Xi, T. Liu, G. Su, Theory of network contractor dynamics for exploring
thermodynamic properties of two-dimensional quantum lattice models. Phys. Rev. B 88,
064407 (2013)


---
*Page 72*

60
2
Tensor Network: Basic Deﬁnitions and Properties
45. S.J. Ran, W. Li, B. Xi, Z. Zhang, G. Su, Optimized decimation of tensor networks with super-
orthogonalization for two-dimensional quantum lattice models. Phys. Rev. B 86, 134429
(2012)
46. F. Fröwis, V. Nebendahl, W. Dür, Tensor operators: constructions and applications for long-
range interaction systems. Phys. Rev. A 81, 062337 (2010)
47. R. Orús, Exploring corner transfer matrices and corner tensors for the classical simulation of
quantum lattice systems. Phys. Rev. B 85, 205117 (2012)
48. P. Czarnik, J. Dziarmaga, Variational approach to projected entangled pair states at ﬁnite
temperature. Phys. Rev. B 92, 035152 (2015)
49. P. Czarnik, J. Dziarmaga, A.M. Ole´s, Variational tensor network renormalization in imaginary
time: two-dimensional quantum compass model at ﬁnite temperature. Phys. Rev. B 93,
184410 (2016)
50. P. Czarnik, M.M. Rams, J. Dziarmaga, Variational tensor network renormalization in imag-
inary time: benchmark results in the Hubbard model at ﬁnite temperature. Phys. Rev. B 94,
235142 (2016)
51. Y.-W. Dai, Q.-Q. Shi, S.-Y.. Cho, M.T. Batchelor, H.-Q. Zhou, Finite-temperature ﬁdelity and
von Neumann entropy in the honeycomb spin lattice with quantum Ising interaction. Phys.
Rev. B 95, 214409 (2017)
52. P. Czarnik, J. Dziarmaga, A.M. Ole´s, Overcoming the sign problem at ﬁnite temperature:
quantum tensor network for the orbital eg model on an inﬁnite square lattice. Phys. Rev. B
96, 014420 (2017)
53. G.M. Crosswhite, D. Bacon, Finite automata for caching in matrix product algorithms. Phys.
Rev. A 78, 012356 (2008)
54. G.M. Crosswhite, A.C. Doherty, G. Vidal, Applying matrix product operators to model
systems with long-range interactions. Phys. Rev. B 78, 035116 (2008)
55. G. Vidal, Efﬁcient simulation of one-dimensional quantum many-body systems. Phys. Rev.
Lett. 93, 040502 (2004)
56. G. Vidal, Classical simulation of inﬁnite-size quantum lattice systems in one spatial dimen-
sion. Phys. Rev. Lett. 98, 070201 (2007)
57. I.L. Markov, Y.-Y. Shi, Simulating quantum computation by contracting tensor networks.
SIAM J. Comput. 38(3), 963–981 (2008)
58. G. Vidal, Efﬁcient classical simulation of slightly entangled quantum computations. Phys.
Rev. Lett. 91, 147902 (2003)
59. R. Jozsa, N. Linden, On the role of entanglement in quantum-computational speed-up, Proc.
R. Soc. London, Ser. A Math. Phys. Eng. Sci. 459(2036), 2011–2032 (2003)
60. C. Schön, E. Solano, F. Verstraete, J.I. Cirac, M.M. Wolf, Sequential generation of entangled
multiqubit states. Phys. Rev. Lett. 95, 110503 (2005)
61. I.P. McCulloch, Inﬁnite size density matrix renormalization group, revisited (2008). arXiv
preprint:0804.2509
62. M. Fannes, B. Nachtergaele, R.F. Werner, Finitely correlated states on quantum spin chains.
Commun. Math. Phys. 144, 443–490 (1992)
63. Y.-Y. Shi, L.M. Duan, G. Vidal, Classical simulation of quantum many-body systems with a
tree tensor network. Phys. Rev. A 74, 022320 (2006)
64. L. Tagliacozzo, G. Evenbly, G. Vidal, Simulation of two-dimensional quantum systems using
a tree tensor network that exploits the entropic area law. Phys. Rev. B 80, 235127 (2009)
65. V. Alba, L. Tagliacozzo, P. Calabrese, Entanglement entropy of two disjoint blocks in critical
Ising models. Phys. Rev. B 81, 060411 (2010)
66. V. Alba, L. Tagliacozzo, P. Calabrese, Entanglement entropy of two disjoint intervals in c= 1
theories. J. Stat. Mech. 1106, P06012 (2011)
67. P. Calabrese, L. Tagliacozzo, E. Tonni, Entanglement negativity in the critical Ising chain. J.
Stat. Mech. 1305, P05002 (2013)
68. A. Ferris, G. Vidal, Perfect sampling with unitary tensor networks. Phys. Rev. B 85, 165146
(2012)


---
*Page 73*

References
61
69. F. Gliozzi, L.Tagliacozzo, Entanglement entropy and the complex plane of replicas. J. Stat.
Mech. 1001, P01002 (2010)
70. P. Silvi, V. Giovannetti, S. Montangero, M. Rizzi, J.I. Cirac, R. Fazio, Homogeneous binary
trees as ground states of quantum critical Hamiltonians. Phys. Rev. A 81, 062335 (2010)
71. V. Bapst, L. Foini, F. Krzakala, G. Semerjian, F. Zamponi, The quantum adiabatic algorithm
applied to random optimization problems: the quantum spin glass perspective. Phys. Rep.
523, 127–205 (2013)
72. G. Vidal, Entanglement renormalization. Phys. Rev. Lett. 99, 220405 (2007)
73. G. Vidal, Class of quantum many-body states that can be efﬁciently simulated. Phys. Rev.
Lett. 101, 110501 (2008)
74. G. Evenbly, G. Vidal, Entanglement renormalization in two spatial dimensions. Phys. Rev.
Lett. 102, 180406 (2009)
75. G. Evenbly, G. Vidal, Algorithms for entanglement renormalization. Phys. Rev. B 79, 144108
(2009)
76. L. Tagliacozzo, G. Vidal, Entanglement renormalization and gauge symmetry. Phys. Rev. B
83, 115127 (2011)
77. G. Vidal, Entanglement renormalization: an introduction (2009). arXiv preprint:0912.1651
78. Y. Nishino, N. Maeshima, A. Gendiar, T. Nishino, Tensor product variational formulation for
quantum systems (2004). arXiv preprint, cond-mat/0401115
79. M.-C. Bañuls, D. Pérez-García, M.M. Wolf, F. Verstraete, J.I. Cirac, Sequentially generated
states for the study of two-dimensional systems. Phys. Rev. A 77, 052306 (2008)
80. M.P. Zaletel, F. Pollmann, Isometric Tensor Network States in Two Dimensions (2019). arXiv
preprint:1902.05100
81. R. Haghshenas, M.J. O’Rourke, G.K. Chan, Canonicalization of projected entangled pair
states (2019). arXiv preprint:1903.03843
82. J. Genzor, A. Gendiar, T. Nishino, Phase transition of the Ising model on a fractal lattice.
Phys. Rev. E 93, 012141 (2016)
83. M. Wang, S.-J. Ran, T. Liu, Y. Zhao, Q.-R. Zheng, G. Su, Phase diagram and exotic spin-spin
correlations of anisotropic Ising model on the Sierpi´nski gasket. Eur. Phys. J. B Condens.
Matter Complex Syst. 89(2), 1–10 (2016)
84. R. König, B.W. Reichardt, G. Vidal, Exact entanglement renormalization for string-net
models. Phys. Rev. B 79, 195123 (2009)
85. S.J. Denny, J.D. Biamonte, D. Jaksch, S.R. Clark, Algebraically contractible topological
tensor network states. J. Phys. A Math. Theory 45, 015309 (2012)
86. M. Lubasch, J.I. Cirac, M.-C. Bañuls, Algorithms for ﬁnite projected entangled pair states.
Phys. Rev. B 90, 064425 (2014)
87. H.N. Phien, J.A. Bengua, H.D. Tuan, P. Corboz, R. Orús, Inﬁnite projected entangled pair
states algorithm improved: fast full update and gauge ﬁxing. Phys. Rev. B 92, 035142 (2015)
88. H.N. Phien, I.P. McCulloch, G. Vidal, Fast convergence of imaginary time evolution tensor
network algorithms by recycling the environment. Phys. Rev. B 91, 115137 (2015)
89. R. Orús, G. Vidal, Inﬁnite time-evolving block decimation algorithm beyond unitary evolu-
tion. Phys. Rev. B 78, 155117 (2008)
90. S. Singh, G. Vidal, Global symmetries in tensor network states: symmetric tensors versus
minimal bond dimension. Phys. Rev. B 88, 115147 (2013)
91. X. Chen, Z.-C. Gu, X.-G. Wen, Classiﬁcation of gapped symmetric phases in one-dimensional
spin systems. Phys. Rev. B 83, 035107 (2011)
92. N. Schuch, D. Pérez-Garc’ia, I. Cirac, Classifying quantum phases using matrix product states
and projected entangled pair states. Phys. Rev. B 84(16), 165139 (2011)
93. D. Pérez-García, M.M. Wolf, M. Sanz, F. Verstraete, J.I. Cirac, String order and symmetries
in quantum spin lattices. Phys. Rev. Lett. 100, 167202 (2008)
94. F. Pollmann, A.M. Turner, E. Berg, M. Oshikawa, Entanglement spectrum of a topological
phase in one dimension. Phys. Rev. B 81, 064439 (2010)
95. W. Kohn, Nobel lecture: electronic structure of matter: wave functions and density function-
als. Rev. Mod. Phys. 71, 1253–1266 (1999)


---
*Page 74*

62
2
Tensor Network: Basic Deﬁnitions and Properties
96. M. Troyer, U.J. Wiese, Computational complexity and fundamental limitations to fermionic
quantum Monte Carlo simulations. Phys. Rev. Lett. 94, 170201 (2005)
97. I. Peschel, M. Kaulke, Ö. Legeza, Density-matrix spectra for integrable models. Ann. Phys.
8(2), 153–164 (1999)
98. Y.-C. Huang, Classical Simulation of Quantum Many-body Systems (University of California,
California, 2015)
99. G. Vitagliano, A. Riera, J.I. Latorre, Volume-law scaling for the entanglement entropy in
spin-1/2 chains. New J. Phys. 12(11), 113049 (2010)
100. R. Movassagh, P.W. Shor, Supercritical entanglement in local systems: counterexample to the
area law for quantum matter. Proc. Natl. Acad. Sci. 113(47), 13278–13282 (2016)
101. M.B. Hastings, Locality in quantum and Markov dynamics on lattices and networks. Phys.
Rev. Lett. 93, 140402 (2004)
102. F. Verstraete, D. Porras, J.I. Cirac, Density matrix renormalization group and periodic
boundary conditions: a quantum information perspective. Phys. Rev. Lett. 93, 227205 (2004)
Open Access This chapter is licensed under the terms of the Creative Commons Attribution 4.0
International License (http://creativecommons.org/licenses/by/4.0/), which permits use, sharing,
adaptation, distribution and reproduction in any medium or format, as long as you give appropriate
credit to the original author(s) and the source, provide a link to the Creative Commons licence and
indicate if changes were made.
The images or other third party material in this chapter are included in the chapter’s Creative
Commons licence, unless indicated otherwise in a credit line to the material. If material is not
included in the chapter’s Creative Commons licence and your intended use is not permitted by
statutory regulation or exceeds the permitted use, you will need to obtain permission directly from
the copyright holder.


---
*Page 75*

Chapter 3
Two-Dimensional Tensor Networks
and Contraction Algorithms
Abstract In this section, we will ﬁrst demonstrate in Sect. 3.1 that many important
physical problems can be transformed to 2D TNs, and the central tasks become
to compute the corresponding TN contractions. From Sects. 3.2 to 3.5, we will
then present several paradigm contraction algorithms of 2D TNs including TRG,
TEBD, and CTMRG. Relations to other distinguished algorithms and the exactly
contractible TNs will also be discussed.
3.1
From Physical Problems to Two-Dimensional Tensor
Networks
3.1.1
Classical Partition Functions
Partition function, which is a function of the variables of a thermodynamic state
such as temperature, volume, and etc., contains the statistical information of a
thermodynamic equilibrium system. From its derivatives of different orders, we can
calculate the energy, free energy, entropy, and so on. Levin and Nave pointed out
in Ref. [1] that the partition functions of statistical lattice models (such as Ising
and Potts models) with local interactions can be written in the form of TN. Without
losing generality, we take square lattice as an example.
Let us start from the simplest case: the classical Ising model on a single square
with only four sites. The four Ising spins denoted by si (i = 1, 2, 3, 4) locate on
the four corners of the square, as shown in Fig. 3.1a; each spin can be up or down,
represented by si = 0 and 1, respectively. The classical Hamiltonian of such a
system reads
Hs1s2s3s4 = J(s1s2 + s2s3 + s3s4 + s4s1) −h(s1 + s2 + s3 + s4),
(3.1)
with J the coupling constant and h the magnetic ﬁeld.
© The Author(s) 2020
S.-J. Ran et al., Tensor Network Contractions, Lecture Notes in Physics 964,
https://doi.org/10.1007/978-3-030-34489-4_3
63


---
*Page 76*

64
3
Two-Dimensional Tensor Networks and Contraction Algorithms
Fig. 3.1 (a) Four Ising spins (blue balls with arrows) sitting on a single square, and the red lines
represent the interactions. The blue block is the tensor T (Eq. (3.2)), with the black lines denoting
the indexes of T . (b) The graphic representation of the TN on a larger lattice with more than one
square. (c) The TN construction of the partition function on inﬁnite square lattice
When the model reaches the equilibrium at temperature T, the probability of each
possible spin conﬁguration is determined by the Maxwell–Boltzmann factor
Ts1s2s3s4 = e−βHs1s2s3s4 ,
(3.2)
with the inverse temperature β = 1/T.1 Obviously, Eq. (3.2) is a fourth-order tensor
T , where each element gives the probability of the corresponding conﬁguration.
1In this paper, we set Boltzmann constant kB = 1 for convenience.


---
*Page 77*

3.1
From Physical Problems to Two-Dimensional Tensor Networks
65
The partition function is deﬁned as the summation of the probability of all
conﬁgurations. In the language of tensor, it is obtained by simply summing over
all indexes as
Z =

s1s2s3s4
Ts1s2s3s4.
(3.3)
Let us proceed a little bit further by considering four squares, whose partition
function can be written in a TN with four tensors (Fig. 3.1b) as
Z =

{ss′}
Ts1s2s′
2s′
1Ts′
2s3s4s′
3Ts′
4s′
3s5s6Ts8s′
1s′
4s7.
(3.4)
Each of the indexes {s′} inside the TN is shared by two tensors, representing the spin
that appears in both of the squares. The partition function is obtained by summing
over all indexes.
For the inﬁnite square lattice, the probability of a certain spin conﬁguration
(s1, s2, · · · ) is given by the product of inﬁnite number of tensor elements as
e−βH{s} = e−βHs1s2s3s4e−βHs4s5s6s7 · · · = Ts1s2s3s4Ts4s5s6s7 · · ·
(3.5)
Then the partition function is given by the contraction of an inﬁnite TN formed by
the copies of T (Eq. (3.2)) as
Z =

{s}

n
Tsn
1 sn
2 sn
3 sn
4 ,
(3.6)
where two indexes satisfy sn
j = sm
k if they refer to the same Ising spin. The graphic
representation of Eq. (3.6) is shown in Fig. 3.1c. One can see that on square lattice,
the TN still has the geometry of a square lattice. In fact, such a way will give a
TN that has a geometry of the dual lattice of the system, and the dual of the square
lattice is itself.
For the Q-state Potts model on square lattice, the partition function has the same
TN representation as that of the Ising model, except that the elements of the tensor
are given by the Boltzmann weight of the Potts model and the dimension of each
index is Q. Note that the Potts model with q = 2 is equivalent to the Ising model.
Another example is the eight-vertex model proposed by Baxter in 1971 [2]. It is
one of the “ice-type” statistic lattice model, and can be considered as the classical
correspondence of the Z2 spin liquid state. The tensor that gives the TN of the
partition function is also (2 × 2 × 2 × 2), whose non-zero elements are
Ts1,··· ,sN =
1, s1 + · · · + sN = even,
0, otherwise.
(3.7)


---
*Page 78*

66
3
Two-Dimensional Tensor Networks and Contraction Algorithms
We shall remark that there are more than one ways to deﬁne the TN of the
partition function of a classical system. For example, when there only exist nearest-
neighbor couplings, one can deﬁne a matrix Mss′ = e−βHss′ on each bond and put
on each site a super-digonal tensor I (or called copy tensor) deﬁned as
Is1,··· ,sN =

1, s1 = · · · = sN;
0, otherwise.
(3.8)
Then the TN of the partition function is the contraction of copies of M and I, and
possesses exactly the same geometry of the original lattice (instead of the dual one).
3.1.2
Quantum Observables
With a TN state, the computations of quantum observables as ⟨ψ| ˆO|ψ⟩and ⟨ψ|ψ⟩
are the contraction of a scalar TN, where ˆO can be any operator. For a 1D MPS,
this can be easily calculated, since one only needs to deal with a 1D TN stripe. For
2D PEPS, such calculations become contractions of 2D TNs. Taking ⟨ψ|ψ⟩as an
example, the TN of such an inner product is the contraction of the copies of the local
tensor (Fig. 3.1c) deﬁned as
Ta1a2a3a4 =

s
P ∗
s,a′′
1a′′
2a′′
3a′′
4 Ps,a′
1a′
2a′
3a′
4,
(3.9)
with P the tensor of the PEPS and ai = (a′
i, a′′
i ). There are no open indexes left and
the TN gives the scalar ⟨ψ|ψ⟩. The TN for computing the observable ⟨ˆO⟩is similar.
The only difference is that we should substitute some small number of Ta1a2a3a4
in original TN of ⟨ψ|ψ⟩with “impurities” at the sites where the operators locate.
Taking one-body operator as an example, the “impurity” tensor on this site can be
deﬁned as
T [i]
a1a2a3a4 =

s,s′
P ∗
s,a′′
1a′′
2a′′
3a′′
4
ˆO[i]
s,s′Ps′,a′
1a′
2a′
3a′
4.
(3.10)
In such a case, the single-site observables can be represented by the TN contrac-
tion of
⟨ψ| ˆO[i]|ψ⟩
⟨ψ|ψ⟩
=
tTr T [i] 
n̸=i T
tTr N
n=1 T
.
(3.11)


---
*Page 79*

3.1
From Physical Problems to Two-Dimensional Tensor Networks
67
For some non-local observables, e.g., the correlation function, the contraction of
⟨ψ| ˆO[i] ˆO[j]|ψ⟩is nothing but adding another “impurity” by
⟨ψ| ˆO[i] ˆO[j]|ψ⟩= tTr T [i]T [j]
N

n̸=i,j
T.
(3.12)
3.1.3
Ground-State and Finite-Temperature Simulations
Ground-state simulations of 1D quantum models with short-range interactions can
also be efﬁciently transferred to 2D TN contractions. When minimizing the energy
E = ⟨ψ| ˆH|ψ⟩
⟨ψ|ψ⟩,
(3.13)
where we write |ψ⟩as an MPS. Generally speaking, there are two ways to solve
the minimization problem: (1) simply treat all the tensor elements as variational
parameters; (2) simulate the imaginary-time evolution
|ψgs⟩= lim
β→∞
e−β ˆH|ψ⟩
∥e−β ˆH|ψ⟩∥
.
(3.14)
The ﬁrst way can be realized by, e.g., Monte Carlo methods where one could
randomly change or choose the value of each tensor element to locate the minimal
of energy. One can also use the Newton method and solve the partial-derivative
equations ∂E/∂xn = 0 with xn standing for an arbitrary variational parameter.
Anyway, it is inevitable to calculate E (i.e., ⟨ψ| ˆH|ψ⟩and ⟨ψ|ψ⟩) for most cases,
which is to contraction the corresponding TNs as explained above.
We shall stress that without TN, the dimension of the ground state (i.e., the
number of variational parameters) increases exponentially with the system size,
which makes the ground-state simulations impossible for large systems.
The second way of computing the ground state with imaginary-time evolution
is more or less like an “annealing” process. One starts from an arbitrarily chosen
initial state and acts the imaginary-time evolution operator on it. The “temperature”
is lowered a little for each step, until the state reaches a ﬁxed point. Mathematically
speaking, by using Trotter-Suzuki decomposition, such an evolution is written in a
TN deﬁned on (D + 1)-dimensional lattice, with D the dimension of the real space
of the model.
Here, we take a 1D chain as an example. We assume that the Hamiltonian only
contains at most nearest-neighbor couplings, which reads
ˆH =

n
ˆhn,n+1,
(3.15)


---
*Page 80*

68
3
Two-Dimensional Tensor Networks and Contraction Algorithms
with ˆhn,n+1 containing the on-site and two-body interactions of the n-th and n+1-th
sites. It is useful to divide ˆH into two groups, ˆH = ˆH e + ˆH o as
ˆH e ≡

even n
ˆhn,n+1,
ˆH o ≡

odd n
ˆhn,n+1.
(3.16)
By doing so, each two terms in ˆH e or ˆH o commutes with each other. Then the
evolution operator ˆU(τ) for inﬁnitesimal imaginary time τ →0 can be written as
ˆU(τ) = e−τ ˆH = e−τ ˆH ee−τ ˆH o + O

τ 2 
ˆH e, ˆH o
.
(3.17)
If τ is small enough, the high-order terms are negligible, and the evolution operator
becomes
ˆU(τ) ≃

n
ˆU(τ)n,n+1,
(3.18)
with the two-site evolution operator ˆU(τ)n,n+1 = e−τ ˆHn,n+1.
The above procedure is known as the ﬁrst-order Trotter-Suzuki decomposition
[3–5]. Note that higher-order decomposition can also be adopted. For example, one
may use the second-order Trotter-Suzuki decomposition that is written as
e−τ ˆH ≃e−τ
2 ˆH ee−τ ˆH oe−τ
2 ˆH e.
(3.19)
With Eq. (3.18), the time evolution can be transferred to a TN, where the local
tensor is actually the coefﬁcients of ˆU(τ)n,n+1, satisfying
Tsnsn+1s′ns′
n+1 = ⟨s′
ns′
n+1| ˆU(τ)n,n+1|snsn+1⟩.
(3.20)
Such a TN is deﬁned in a plain of two dimensions that corresponds to the spatial and
(real or imaginary) time, respectively. The initial state is located at the bottom of the
TN (β = 0) and its evolution is to do the TN contraction which can be efﬁciently
solved by TN algorithms (presented later).
In addition, one can readily see that the evolution of a 2D state leads to the
contraction of a 3D TN. Such a TN scheme provides a straightforward picture
to understand the equivalence between a (d + 1)-dimensional classical and a
d-dimensional quantum theory. Similarly, the ﬁnite-temperature simulations of
a quantum system can be transferred to TN contractions with Trotter-Suzuki
decomposition. For the density operator ˆρ(β) = e−β ˆH, the TN is formed by the
same tensor given by Eq. (3.20).


---
*Page 81*

3.2
Tensor Renormalization Group
69
3.2
Tensor Renormalization Group
In 2007, Levin and Nave proposed TRG approach [1] to contract the TN of
2D classical lattice models. In 2008, Gu et al. further developed TRG to handle
2D quantum topological phases [6]. TRG can be considered as a coarse-graining
contraction algorithm. To introduce the TRG algorithm, let us consider a square TN
formed by inﬁnite number of copies of a fourth-order tensor Ta1a2a3a4 (see the left
side of Fig. 3.2).
Contraction and Truncation The idea of TRG is to iteratively “coarse-grain” the
TN without changing the bond dimensions, the geometry of the network, and the
translational invariance. Such a process is realized by two local operations in each
iteration. Let us denote the tensor in the t-th iteration as T (t) (we take T (0) = T ).
For obtaining T (t+1), the ﬁrst step is to decompose T (t) by SVD in two different
ways (Fig. 3.2) as
T (t)
a1a2a3a4 =

b
Ua1a2bVa3a4b,
(3.21)
T (t)
a1a2a3a4 =

b
Xa4a1bYa2a3b.
(3.22)
Note that the singular value spectrum can be handled by multiplying it with the
tensor(s), and the dimension of the new index satisﬁes dim(b) = χ2 with χ the
dimension of each bond of T (t).
Fig. 3.2 For an inﬁnite square TN with translational invariance, the renormalization in the TRG
algorithm is realized by two local operations of the local tensor. After each iteration, the bond
dimensions of the tensor and the geometry of the network keep unchanged


---
*Page 82*

70
3
Two-Dimensional Tensor Networks and Contraction Algorithms
The purpose of the ﬁrst step is to deform the TN, so that in the second step, a
new tensor T (t+1) can be obtained by contracting the four tensors that form a square
(Fig. 3.2) as
T (t+1)
b1b2b3b4 ←

a1a2a3a4
Va1a2b1Ya2a3b2Ua3a4b3Xa4a1b4.
(3.23)
We use an arrow instead of the equal sign, because one may need to divide the
tensor by a proper number to keep the value of the elements from being divergent.
The arrows will be used in the same way below.
These two steps deﬁne the contraction strategy of TRG. By the ﬁrst step, the
number of tensors in the TN (i.e., the size of the TN) increases from N to 2N,
and by the second step, it decreases from 2N to N/2. Thus, after t times of each
iterations, the number of tensors decreases to the 1
2t of its original number. For this
reason, TRG is an exponential contraction algorithm.
Error and Environment The dimension of the tensor at the t-th iteration becomes
χ2t , if no truncations are implemented. This means that truncations of the bond
dimensions are necessary. In its original proposal, the dimension is truncated by
only keeping the singular vectors of the χ-largest singular values in Eq. (3.22). Then
the new tensor T (t+1) obtained by Eq. (3.23) has exactly the same dimension as T (t).
Each truncation will absolutely introduce some error, which is called the
truncation error. Consistent with Eq. (2.7), the truncation error is quantiﬁed by the
discarded singular values λ as
ε =
χ2−1
b=χ λ2
b
χ2−1
b=0 λ2
b
.
(3.24)
According to the linear algebra, ε in fact gives the error of the SVD given in
Eq. (3.22), meaning that such a truncation minimizes the error of reducing the rank
of T (t), which reads
ε = |T (t)
a1a2a3a4 −
χ−1

b=0
Ua1a2bVa3a4b|.
(3.25)
One may repeat the contraction-and-truncation process until T (t) converges. It
usually only takes ∼10 steps, after which one in fact contract a TN of 2t tensors
to a single tensor.
The truncation is optimized according to the SVD of T (t). Thus, T (t) is called
the environment. In general, the tensor(s) that determines the truncations is called
the environment. It is a key factor to the accuracy and efﬁciency of the algorithm.
For those that use local environments, like TRG, the efﬁciency is relatively high
since the truncations are easy to compute. But, the accuracy is bounded since the
truncations are only optimized according to some local information (like in TRG
the local partitioning T (t)).


---
*Page 83*

3.3
Corner Transfer Matrix Renormalization Group
71
One may choose other tensors or even the whole TN as the environment. In 2009,
Xie et al. proposed the second renormalization group (SRG) algorithm [7]. The
idea is in each truncation step of TRG, they deﬁne the global environment that is a
fourth-order tensor Ea ˜n
1a ˜n
2a ˜n
3a ˜n
4 = 
{a}

n̸=˜n T (n,t)
an
1an
2an
3an
4 with T (n,t) the n-th tensor in
the t-th step and ˜n the tensor to be truncated. E is the contraction of the whole TN
after getting rid of T (˜n,t), and is computed by TRG. Then the truncation is obtained
not by the SVD of T (˜n,t), but by the SVD of E . The word “second” in the name of
the algorithm comes from the fact that in each step of the original TRG, they use
a second TRG to calculate the environment. SRG is obviously more consuming,
but bears much higher accuracy than TRG. The balance between accuracy and
efﬁciency, which can be controlled by the choice of environment, is one main factor
to consider while developing or choosing the TN algorithms.
3.3
Corner Transfer Matrix Renormalization Group
In the 1960s, the corner transfer matrix (CTM) idea was developed originally by
Baxter in Refs. [8, 9] and a book [10]. Such ideas and methods have been applied
to various models, for example, the chiral Potts model [11–13], the 8-vertex model
[2, 14, 15], and to the 3D Ising model [16]. Combining CTM with DMRG, Nishino
and Okunishi proposed the CTMRG [17] in 1996 and applied it to several models
[17–27]. In 2009, Orús and Vidal further developed CTMRG to deal with TNs [28].
What they proposed to do is to put eight variational tensors to be optimized in
the algorithm, which are four corner transfer matrices C[1], C[2], C[3], C[4] and four
row (column) tensors R[1], R[2], R[3], R[4], on the boundary, and then to contract the
tensors in the TN to these variational tensors in a speciﬁc order shown in Fig. 3.3.
The TN contraction is considered to be solved with the variational tensors when they
converge in this contraction process. Compared with the boundary-state methods in
the last subsection, the tensors in CTMRG deﬁne the states on both the boundaries
and corners.
Contraction In each iteration step of CTMRG, one choses two corner matrices on
the same side and the row tensor between them, e.g., C[1], C[2], and R[2]. The update
of these tensors (Fig. 3.4) follows
˜C[1]
˜b2b′
1 ←

b1
C[1]
b1b2R[1]
b1a1b′
1,
(3.26)
˜R[2]
˜b2a4 ˜b3 ←

a2
R[2]
b2a2b3Ta1a2a3a4,
(3.27)
˜C[2]
˜b3b′
4 ←

b4
C[2]
b3b4R[3]
b4a3b′
4,
(3.28)
where ˜b2 = (b2, a1) and ˜b3 = (b3, a1).


---
*Page 84*

72
3
Two-Dimensional Tensor Networks and Contraction Algorithms
Fig. 3.3 Overview of the CTMRG contraction scheme. The tensors in the TN are contracted to
the variational tensors deﬁned on the edges and corners
Fig. 3.4 The ﬁrst arrow shows absorbing tensors R[1], T , and R[3] to renew tensors C[1], R[2], and
C[2] in left operation. The second arrow shows the truncation of the enlarged bond of ˜C[1], ˜R[2],
and ˜C[2]. Inset is the acquisition of the truncation matrix Z
After the contraction given above, it can be considered that one column of the
TN (as well as the corresponding row tensors R[1] and R[3]) is contracted. Then one
chooses other corner matrices and row tensors (such as ˜C[1], C[4], and R[1]) and
implement similar contractions. By iteratively doing so, the TN is contracted in the
way shown in Fig. 3.3.


---
*Page 85*

3.3
Corner Transfer Matrix Renormalization Group
73
Note that for a ﬁnite TN, the initial corner matrices and row tensors should be
taken as the tensors locating on the boundary of the TN. For an inﬁnite TN, they
can be initialized randomly, and the contraction should be iterated until the preset
convergence is reached.
CTMRG can be regarded as a polynomial contraction scheme. One can see that
the number of tensors that are contracted at each step is determined by the length of
the boundary of the TN at each iteration time. When contracting a 2D TN deﬁned
on a (L×L) square lattice as an example, the length of each side is L−2t at the t-th
step. The boundary length of the TN (i.e., the number of tensors contracted at the
t-th step) bears a linear relation with t as 4(L −2t) −4. For a 3D TN such as cubic
TN, the boundary length scales as 6(L −2t)2 −12(L −2t) + 8, thus the CTMRG
for a 3D TN (if exists) gives a polynomial contraction.
Truncation One can see that after the contraction in each iteration step, the bond
dimensions of the variational tensors increase. Truncations are then in need to
prevent the excessive growth of the bond dimensions. In Ref. [28], the truncation
is obtained by inserting a pair of isometries V and V † in the enlarged bonds. A
reasonable (but not the only choice) of V for translational invariant TN is to consider
the eigenvalue decomposition on the sum of corner transfer matrices as

b
˜C[1]†
˜bb
˜C[1]
˜b′b +

b
˜C[2]†
˜bb
˜C[1]
˜b′b ≃
χ−1

b=0
V˜bbΛbV ∗
˜b′b.
(3.29)
Only the χ largest eigenvalues are preserved. Therefore, V is a matrix of the
dimension Dχ × χ, where D is the bond dimension of T and χ is the dimension
cut-off. We then truncate ˜C[1], ˜R[2], and ˜C[2] using V as
C[1]
b′
1b2 =

˜b2
˜C[1]
˜b2b′
1V ∗
˜b2b2,
(3.30)
R[2]
b2a4b3 =

˜b2,˜b3
˜R[2]
˜b2a4 ˜b3V˜b2b2V ∗
˜b3b3,
(3.31)
C[2]
b3b′
4 =

˜b3
˜C[2]
˜b3b′
4V˜b3b3.
(3.32)
Error and Environment Same as TRG or TEBD, the truncations are obtained by
the matrix decompositions of certain tensors that deﬁne the environment. From
Eq. (3.29), the environment in CTMRG is the loop formed by the corner matrices
and row tensors. Note that symmetries might be considered to accelerate the
computation. For example, one may take C[1] = C[2] = C[3] = C[4] and
R[1] = R[2] = R[3] = R[4] when the TN has rotational and reﬂection symmetries
(Ta1a2a3a4 = Ta′
1a′
2a′
3a′
4 after any permutation of the indexes).


---
*Page 86*

74
3
Two-Dimensional Tensor Networks and Contraction Algorithms
3.4
Time-Evolving Block Decimation: Linearized
Contraction and Boundary-State Methods
The TEBD algorithm by Vidal was developed originally for simulating the time
evolution of 1D quantum models [29–31]. The (ﬁnite and inﬁnite) TEBD algorithm
has been widely applied to varieties of issues, such as criticality in quantum
many-body systems (e.g., [32–34]), the topological phases [35], the many-body
localization [36–38], and the thermodynamic property of quantum many-body
systems [39–45].
In the language of TN, TEBD solves the TN contraction problems in a linearized
manner, and the truncation is calculated in the context of an MPS. In the following,
let us explain the inﬁnite TEBD (iTEBD) algorithm [31] (Fig. 3.5) by still taking
the inﬁnite square TN formed by the copies of a fourth-order tensor T as an
example. In each step, a row of tensors (which can be regarded as an MPO) are
contracted to an MPS |ψ⟩. Inevitably, the bond dimensions of the tensors in the MPS
will increase exponentially as the contractions proceed. Therefore, truncations are
necessary to prevent the bond dimensions diverging. The truncations are determined
by minimizing the distance between the MPSs before and after the truncation. After
the MPS |ψ⟩converges, the TN contraction becomes ⟨ψ|ψ⟩, which can be exactly
and easily computed.
Contraction We use is two-site translational invariant MPS, which is formed by the
tensors A and B on the sites and the spectrum Λ and Γ on the bonds as

{a}
· · · Λan−1Asn−1,an−1anΓanBsn,anan+1Λan+1 · · · .
(3.33)
In each step of iTEBD, the contraction is given by
As,˜a ˜a′ ←

s′
Tsbs′b′As′,aa′, Bs,˜a ˜a′ ←

s′
Tsbs′b′Bs′,aa′,
(3.34)
Fig. 3.5 The illustration of the contraction and truncation of the iTEBD algorithm. In each
iteration step, a row of tensors in the TN are contracted to the MPS, and truncations by SVD
are implemented so that the bond dimensions of the MPS keep unchanged


---
*Page 87*

3.4
Time-Evolving Block Decimation: Linearized Contraction and Boundary-...
75
where the new virtual bonds are entangled, satisfying ˜a = (b, a) and ˜a′ = (b′, a′).
Meanwhile, the spectrum is also updated as
Λ˜a ←Λa1b, Γ˜a′ ←Γa′1b′,
(3.35)
where 1 is a vector with 1b = 1 for any b.
It is readily to see that the number of tensors in iTEBD will be reduced linearly
as tN, with t the number of the contraction-and-truncation steps and N →∞
the number of the columns of the TN. Therefore, iTEBD (also ﬁnite TEBD) can
be considered as a linearized contraction algorithm, in contrast to the exponential
contraction algorithm like TRG.
Truncation Truncations are needed when the dimensions of the virtual bonds
exceed the preset dimension cut-off χ. In the original version of iTEBD [31], the
truncations are done by local SVDs. To truncate the virtual bond ˜a, for example,
one deﬁnes a matrix by contracting the tensors and spectrum connected to the target
bond as
Ms1 ˜a1,s2 ˜a2 =

˜a
Λ˜a1As1,˜a1 ˜aΓ˜aBs2,˜a ˜a2Λ˜a2.
(3.36)
Then, perform SVD on M, keeping only the χ-largest singular values and the
corresponding basis as
Ms1 ˜a1,s2 ˜a2 =
χ−1

a=0
Us1,˜a1aΓaVs2,a ˜a2.
(3.37)
The spectrum Γ is updated by the singular values of the above SVD. The tensors A
and B are also updated as
As1,˜aa = (Λ˜a)−1Us1,˜aa, Bs2,a ˜a = Vs2,a ˜a(Λ˜a)−1.
(3.38)
Till now, the truncation of the spectrum Γ and the corresponding virtual bond have
been completed. Any spectra and virtual bonds can be truncated similarly.
Error and Environment Similar to TRG and SRG, the environment of the original
iTEBD is M in Eq. (3.37), and the error is measured by the discarded singular values
of M. Thus, iTEBD seems to only use local information to optimize the truncations.
What is amazing is that when the MPO is unitary or near unitary, the MPS converges
to a so-called canonical form [46, 47]. The truncations are then optimal by taking
the whole MPS as the environment. If the MPO is far from being unitary, Orús and
Vidal proposed the canonicalization algorithm [47] to transform the MPS into the
canonical form before truncating. We will talk about this issue in detail in the next
section.


---
*Page 88*

76
3
Two-Dimensional Tensor Networks and Contraction Algorithms
Boundary-State Methods: Density Matrix Renormalization Group and Variational
Matrix Product State The iTEBD can be understood as a boundary-state method.
One may consider one row of tensors in the TN as an MPO (see Sect. 2.2.6
and Fig. 2.10), where the vertical bonds are the “physical” indexes and the bonds
shared by two adjacent tensors are the geometrical indexes. This MPO is also
called the transfer operator or transfer MPO of the TN. The converged MPS is
in fact the dominant eigenstate of the MPO.2 While the MPO represents a physical
Hamiltonian or the imaginary-time evolution operator (see Sect. 3.1), the MPS is
the ground state. For more general situations, e.g., the TN represents a 2D partition
function or the inner product of two 2D PEPSs, the MPS can be understood as
the boundary state of the TN (or the PEPS) [48–50]. The contraction of the 2D
inﬁnite TN becomes computing the boundary state, i.e., the dominant eigenstate
(and eigenvalue) of the transfer MPO.
The boundary-state scheme gives several non-trivial physical and algorithmic
implications [48–52], including the underlying resemblance between iTEBD and
the famous inﬁnite DMRG (iDMRG) [53]. DMRG [54, 55] follows the idea of
Wilson’s NRG [56], and solves the ground states and low-lying excitations of
1D or quasi-1D Hamiltonians (see several reviews [57–60]); originally it has no
direct relations to TN contraction problems. After the MPS and MPO become
well understood, DMRG was re-interpreted in a manner that is more close to TN
(see a review by Schollwöck [57]). In particular for simulating the ground states
of inﬁnite-size 1D systems, the underlying connections between the iDMRG and
iTEBD were discussed by McCulloch [53]. As argued above, the contraction of
a TN can be computed by solving the dominant eigenstate of its transfer MPO.
The eigenstates reached by iDMRG and iTEBD are the same state up to a gauge
transformation (note the gauge degrees of freedom of MPS will be discussed in
Sect. 2.4.2). Considering that DMRG mostly is not used to compute TN contractions
and there are already several understanding reviews, we skip the technical details
of the DMRG algorithms here. One may refer to the papers mentioned above if
interested. However, later we will revisit iDMRG in the clue of multi-linear algebra.
Variational matrix product state (VMPS) method is a variational version of
DMRG for (but not limited to) calculating the ground states of 1D systems with
periodic boundary condition [61]. Compared with DMRG, VMPS is more directly
related to TN contraction problems. In the following, we explain VMPS by solving
the contraction of the inﬁnite square TN. As discussed above, it is equivalent to
solve the dominant eigenvector (denoted by |ψ⟩) of the inﬁnite MPO (denoted by
ˆ
rho) that is formed by a row of tensors in the TN. The task is to minimize ⟨ψ| ˆρ|ψ⟩
under the constraint ⟨ψ|ψ⟩= 1. The eigenstate |ψ⟩written in the form of an MPS.
The tensors in |ψ⟩are optimized on by one. For instance, to optimize the n-th
tensor, all other tensors are kept unchanged and considered as constants. Such a local
minimization problem becomes ˆH eff |Tn⟩= E ˆNeff |Tn⟩with E the eigenvalue.
2For simplicity, we assume the MPO gives an Hermitian operator so that its eigenstates and
eigenvalues are well-deﬁned.


---
*Page 89*

3.5
Transverse Contraction and Folding Trick
77
Fig. 3.6 The illustration of (a) ˆH eff and (b) ˆNeff in the variational matrix product state method
ˆH eff is given by a sixth-th order tensor deﬁned by contracting all tensors in ⟨ψ| ˆρ|ψ⟩
except for the n-th tensor and its conjugate (Fig. 3.6a). Similarly, ˆNeff is also given
by a sixth-th order tensor deﬁned by contracting all tensors in ⟨ψ|ψ⟩except for
the n-th tensor and its conjugate (Fig. 3.6b). Again, the VMPS is different from the
MPS obtained by TEBD only up to a gauge transformation.
Note that the boundary-state methods are not limited to solving TN contractions.
An example is the time-dependent variational principle (TDVP). The basic idea of
TDVP was proposed by Dirac in 1930 [62], and then it was cooperated with the
formulation of Hamiltonian [63] and action function [64]. For more details, one
could refer to a review by Langhoff et al. [65]. In 2011, TDVP was developed
to simulate the time evolution of many-body systems with the help of MPS [66].
Since TDVP (and some other algorithms) concerns directly a quantum Hamiltonian
instead of the TN contraction, we skip giving more details of these methods in this
paper.
3.5
Transverse Contraction and Folding Trick
For the boundary-state methods introduced above, the boundary states are deﬁned
in the real space. Taking iTEBD for the real-time evolution as an example, the
contraction is implemented along the time direction, which is to do the time
evolution in an explicit way. It is quite natural to consider implementing the
contraction along the other direction. In the following, we will introduce the
transverse contraction and the folding trick proposed and investigated in Refs. [67–
69]. The motivation of transverse contraction is to avoid the explicit simulation of
the time-dependent state |ψ(t)⟩that might be difﬁcult to capture due to the fast
growth of its entanglement.
Transverse Contraction Let us consider to calculate the average of a one-body
operator o(t) = ⟨ψ(t)|ˆo|ψ(t)⟩with |ψ(t)⟩that is a quantum state of inﬁnite size
evolved to the time t. The TN representing o(t) is given in the left part of Fig. 3.7,
where the green squares give the initial MPS |ψ(0)⟩and its conjugate, the yellow
diamond is ˆo, and the TN formed by the green circles represents the evolution
operator eit ˆH and its conjugate (see how to deﬁne the TN in Sect. 3.1.3).


---
*Page 90*

78
3
Two-Dimensional Tensor Networks and Contraction Algorithms
Fig. 3.7 Transverse contraction of the TN for a local expectation value ⟨O(t)⟩
To perform the transverse contraction, we treat each column of the TN as an
MPO
ˆ
T . Then as shown in the right part of Fig. 3.7, the main task of computing
o(t) is to solve the dominant eigenstate |φ⟩(normalized) of
ˆ
T , which is an MPS
illustrated by the purple squares. One may solve this eigenstate problems by any of
the boundary-state methods (TEBD, DMRG, etc.). With |φ⟩, o(t) can be exactly and
efﬁciently calculated as
o(t) = ⟨ψ(t)|ˆo|ψ(t)⟩
⟨ψ(t)|ψ(t)⟩= ⟨φ| ˆ
To|φ⟩
⟨φ| ˆ
T |φ⟩
,
(3.39)
with
ˆ
To is the column that contains the operator ˆo. Note that the length of |φ⟩(i.e.,
the number of tensors in the MPS) is proportional to the time t, thus one should use
the ﬁnite-size versions of the boundary-state methods. It should also be noted that
ˆ
T may not be Hermitian. In this case, one should not use |φ⟩and its conjugate, but
compute the left and right eigenstates of
ˆ
T instead.
Interestingly, similar ideas of the transverse contraction appeared long before
the concept of TN emerged. For instance, transfer matrix renormalization group
(TMRG) [70–73] can be used to simulate the ﬁnite-temperature properties of a 1D
system. The idea of TMRG is to utilize DMRG to calculate the dominant eigenstate
of the transfer matrix (similar to T ). In correspondence with the TN terminology,
it is to use DMRG to compute |φ⟩from the TN that deﬁnes the imaginary-time
evolution. We will skip of the details of TMRG since it is not directly related to TN.
One may refer the related references if interested.


---
*Page 91*

3.5
Transverse Contraction and Folding Trick
79
Fig. 3.8 The illustration of the folding trick
Folding Trick The main bottleneck of a boundary-state method concerns the
entanglement of the boundary state. In other words, the methods will become
inefﬁcient when the entanglement of the boundary state grows too large. One
example is the real-time simulation of a 1D chain, where the entanglement entropy
increases linearly with time. Solely with the transverse contraction, it will not
essentially solve this problem. Taking the imaginary-time evolution as an example,
it has been shown that with the dual symmetry of space and time, the boundary
states in the space and time directions possess the same entanglement [69, 74].
In Ref. [67], the folding trick was proposed. The idea is to “fold” the TN before
the transverse contraction (Fig. 3.8). In the folded TN, each tensor is the tensor
product of the original tensor and its conjugate. The length of the folded TN in
the time direction is half of the original TN, and so is the length of the boundary
state.
The previous work [67] on the dynamic simulations of 1D spin chains showed
that the entanglement of the boundary state is in fact reduced compared with that
of the boundary state without folding. This suggests that the folding trick provides
a more efﬁcient representation of the entanglement structure of the boundary state.
The authors of Ref. [67] suggested an intuitive picture to understand the folding
trick. Consider a product state as the initial state at t −0 and a single localized
excitation at the position x that propagates freely with velocity v. By evolving for
a time t, only (x ± vt) sites will become entangled. With the folding trick, the
evolutions (that are unitary) besides the (x ±vt) sites will not take effects since they
are folded with the conjugates and become identities. Thus the spins outside (x±vt)
will remain product state and will not contribute entanglement to the boundary state.
In short, one key factor to consider here is the entanglement structure, i.e., the fact
that the TN is formed by unitaries. The transverse contraction with the folding trick
is a convincing example to show that the efﬁciency of contracting a TN can be
improved by properly designing the contraction way according to the entanglement
structure of the TN.


---
*Page 92*

80
3
Two-Dimensional Tensor Networks and Contraction Algorithms
3.6
Relations to Exactly Contractible Tensor Networks
and Entanglement Renormalization
The TN algorithms explained above are aimed at dealing with contracting optimally
the TNs that cannot be exactly contracted. Then a question arises: Is a classical com-
puter really able to handle these TNs? In the following, we show that by explicitly
putting the isometries for truncations inside, the TNs that are contracted in these
algorithms become eventually exactly contractible, dubbed as exactly contractible
TN (ECTN). Different algorithms lead to different ECTN. That means the algorithm
will show a high performance if the TN can be accurately approximated by the
corresponding ETNC.
Figure 3.9 shows the ECTN emerging in the plaquette renormalization [75] or
higher-order TRG (HOTRG) algorithms [76]. Take the contraction of a TN (formed
by the copies of tensor T ) on square lattice as an example. In each iteration step, four
nearest-neighbor T s in a square are contracted together, which leads to a new square
TN formed by tensors (T (1)) with larger bond dimensions. Then, isometries (yellow
Fig. 3.9 The exactly contractible TN in the HOTRG algorithm


---
*Page 93*

3.6
Relations to Exactly Contractible Tensor Networks and Entanglement...
81
triangles) are inserted in the TN to truncate the bond dimensions (the truncations
are in the same spirit of those in CTMRG, see Fig. 3.4). Let us not contract the
isometries with the tensors, but leave them there inside the TN. Still, we can move
on to the next iteration, where we contract four T (1)’s (each of which is formed
by four T and the isometries, see the dark-red plaques in Fig. 3.9) and obtain more
isometries for truncating the bond dimensions of T (1). By repeating this process
for several times, one can see that tree TNs appear on the boundaries of the coarse-
grained plaques. Inside the 4-by-4 plaques (light red shadow), we have the two-layer
tree TNs formed by three isometries. In the 8-by-8 plaques, the tree TN has three
layers with seven isometries. These tree TNs separate the original TN into different
plaques, so that it can be exactly contracted, similar to the fractal TNs introduced in
Sect. 2.3.6.
In the iTEBD algorithm [29–31, 47] (Fig. 3.10), one starts with an initial MPS
(dark-blue squares). In each iteration, one tensor (light blue circles) in the TN
is contracted with the tensor in the MPS and then the bonds are truncated by
isometries (yellow triangles). Globally seeing, the isometries separate the TN into
many “tubes” (red shadow) that are connected only at the top. The length of the tubes
equals to the number of the iteration steps in iTEBD. Obviously, this TN is exactly
contractible. Such a tube-like structure also appears in the contraction algorithms
based on PEPS.
For the CTMRG algorithm [28], the corresponding ECTN is a little bit com-
plicated (see one quarter of it in Fig. 3.11). The initial row (column) tensors and
the corner transfer matrices are represented by the pink and green squares. In each
Fig. 3.10 The exactly contractible TN in the iTEBD algorithm


---
*Page 94*

82
3
Two-Dimensional Tensor Networks and Contraction Algorithms
Fig. 3.11 A part of the exactly contractible TN in the CTMRG algorithm
iteration step, the tensors (light blue circles) located most outside are contracted
to the row (column) tensors and the corner transfer matrices, and isometries
are introduced to truncate the bond dimensions. Globally seeing the picture, the
isometries separate the TN into a tree-like structure (red shadow), which is exactly
contractible.
For these three algorithms, each of them gives an ECTN that is formed by two
part: the tensors in the original TN and the isometries that make the TN exactly
contractible. After optimizing the isometries, the original TN is approximated by
the ECTN. The structure of the ECTN depends mainly on the contraction strategy
and the way of optimizing the isometries depends on the chosen environment.
The ECTN picture shows us explicitly how the correlations and entanglement are
approximated in different algorithms. Roughly speaking, the correlation properties
can be read from the minimal distance of the path in the ECTN that connects
two certain sites, and the (bipartite) entanglement can be read from the number
of bonds that cross the boundary of the bipartition. How well the structure suits
the correlations and entanglement should be a key factor of the performance of a
TN contraction algorithm. Meanwhile, this picture can assist us to develop new
algorithms by designing the ECTN and taking the whole ECTN as the environment
for optimizing the isometries. These issues still need further investigations.
The uniﬁcation of the TN contraction and the ECTN has been explicitly utilized
in the TN renormalization (TNR) algorithm [77, 78], where both isometries and


---
*Page 95*

References
83
unitaries (called disentangler) are put into the TN to make it exactly contractible.
Then instead of tree TNs or MPSs, one will have MERAs (see Fig. 2.7c, for
example) inside which can better capture the entanglement of critical systems.
3.7
A Shot Summary
In this section, we have discussed about several contraction approaches for dealing
with 2D TNs. Applying these algorithms, many challenging problems can be
efﬁciently solved, including the ground-state and ﬁnite-temperature simulations of
1D quantum systems, and the simulations of 2D classical statistic models. Such
algorithms consist of two key ingredients: contractions (local operations of tensors)
and truncations. The local contraction determines the way how the TN is contracted
step by step, or in other words, how the entanglement information is kept according
to the ECTN structure. Different (local or global) contractions may lead to different
computational costs, thus optimizing the contraction sequence is necessary in many
cases [67, 79, 80]. The truncation is the approximation to discard less important
basis so that the computational costs are properly bounded. One essential concept
in the truncations is “environment,” which plays the role of the reference when
determining the weights of the basis. Thus, the choice of environment concerns
the balance between the accuracy and efﬁciency of a TN algorithm.
References
1. M. Levin, C.P. Nave, Tensor renormalization group approach to two-dimensional classical
lattice models. Phys. Rev. Lett. 99, 120601 (2007)
2. R.J. Baxter, Eight-vertex model in lattice statistics. Phys. Rev. Lett. 26, 832–833 (1971)
3. H.F. Trotter, On the product of semi-groups of operators. Proc. Am. Math. Soc. 10(4), 545–551
(1959)
4. M. Suzuki, M. Inoue, The ST-transformation approach to analytic solutions of quantum
systems. I general formulations and basic limit theorems. Prog. Theor. Phys. 78, 787 (1987)
5. M. Inoue, M. Suzuki, The ST-transformation approach to analytic solutions of quantum
systems. II: transfer-matrix and Pfafﬁan methods. Prog. Theor. Phys. 79(3), 645–664 (1988)
6. Z.C. Gu, M. Levin, X.G. Wen, Tensor-entanglement renormalization group approach as a
uniﬁed method for symmetry breaking and topological phase transitions. Phys. Rev. B 78,
205116 (2008)
7. Z.Y. Xie, H.C. Jiang, Q.N. Chen, Z.Y. Weng, T. Xiang, Second renormalization of tensor-
network states. Phys. Rev. Lett. 103, 160601 (2009)
8. R.J. Baxter, Dimers on a rectangular lattice. J. Math. Phys. 9, 650 (1968)
9. R.J. Baxter, Variational approximations for square lattice models in statistical mechanics. J.
Stat. Phys. 19, 461 (1978)
10. R.J. Baxter, Exactly Solved Models in Statistical Mechanics (Elsevier, Amsterdam, 2016)
11. R.J. Baxter, Corner transfer matrices of the chiral Potts model. J. Stat. Phys. 63, 433–453
(1991)


---
*Page 96*

84
3
Two-Dimensional Tensor Networks and Contraction Algorithms
12. R.J. Baxter, Chiral Potts model: corner transfer matrices and parametrizations. Int. J. Mod.
Phys. B 7, 3489–3500 (1993)
13. R.J. Baxter, Corner transfer matrices of the chiral Potts model. II. The triangular lattice. J. Stat.
Phys. 70, 535–582 (1993)
14. R.J. Baxter, Corner transfer matrices of the eight-vertex model. I. Low-temperature expansions
and conjectured properties. J. Stat. Phys. 15, 485–503 (1976)
15. R.J. Baxter, Corner transfer matrices of the eight-vertex model. II. The Ising model case. J.
Stat. Phys. 17, 1–14 (1977)
16. R.J. Baxter, P.J. Forrester, A variational approximation for cubic lattice models in statistical
mechanics. J. Phys. A Math. Gen. 17, 2675–2685 (1984)
17. T. Nishino, K. Okunishi, Corner transfer matrix renormalization group method. J. Phys. Soc.
Jpn. 65, 891–894 (1996)
18. T. Nishino, Y. Hieida, K. Okunishi, N. Maeshima, Y. Akutsu, A. Gendiar, Two-dimensional
tensor product variational formulation. Prog. Theor. Phys. 105(3), 409–417 (2001)
19. T. Nishino, K. Okunishi, Y. Hieida, N. Maeshima, Y. Akutsu, Self-consistent tensor product
variational approximation for 3D classical models. Nucl. Phys. B 575(3), 504–512 (2000)
20. T. Nishino, K. Okunishi, A density matrix algorithm for 3D classical models. J. Phys. Soc. Jpn.
67(9), 3066–3072 (1998)
21. K. Okunishi, T. Nishino, Kramers-Wannier approximation for the 3D Ising model. Prog. Theor.
Phys. 103(3), 541–548 (2000)
22. T. Nishino, K. Okunishi, Numerical latent heat observation of the q = 5 Potts model (1997).
arXiv preprint cond-mat/9711214
23. T. Nishino, K. Okunishi, Corner transfer matrix algorithm for classical renormalization group.
J. Phys. Soc. Jpn. 66(10), 3040–3047 (1997)
24. N. Tsushima, T. Horiguchi, Phase diagrams of spin-3/2 Ising model on a square lattice in terms
of corner transfer matrix renormalization group method. J. Phys. Soc. Jpn. 67(5), 1574–1582
(1998)
25. K. Okunishi, Y. Hieida, Y. Akutsu, Universal asymptotic eigenvalue distribution of density
matrices and corner transfer matrices in the thermodynamic limit. Phys. Rev.E 59(6) (1999)
26. Z.B. Li, Z. Shuai, Q. Wang, H.J. Luo, L. Schülke, Critical exponents of the two-layer Ising
model. J. Phys. A Math. Gen. 34(31), 6069 (2001)
27. A. Gendiar, T. Nishino, Latent heat calculation of the three-dimensional q= 3, 4, and 5 Potts
models by the tensor product variational approach. Phys. Rev.E 65(4), 046702 (2002)
28. R. Orús, G. Vidal, Simulation of two-dimensional quantum systems on an inﬁnite lattice
revisited: corner transfer matrix for tensor contraction. Phys. Rev. B 80, 094403 (2009)
29. G. Vidal, Efﬁcient classical simulation of slightly entangled quantum computations. Phys. Rev.
Lett. 91, 147902 (2003)
30. G. Vidal, Efﬁcient simulation of one-dimensional quantum many-body systems. Phys. Rev.
Lett. 93, 040502 (2004)
31. G. Vidal, Classical simulation of inﬁnite-size quantum lattice systems in one spatial dimension.
Phys. Rev. Lett. 98, 070201 (2007)
32. L. Tagliacozzo, T. de Oliveira, S. Iblisdir, J.I. Latorre, Scaling of entanglement support for
matrix product states. Phys. Rev. B 78, 024410 (2008)
33. F. Pollmann, S. Mukerjee, A.M. Turner, J.E. Moore, Theory of ﬁnite-entanglement scaling at
one-dimensional quantum critical points. Phys. Rev. Lett. 102, 255701 (2009)
34. F. Pollmann, J.E. Moore, Entanglement spectra of critical and near-critical systems in one
dimension. New J. Phys. 12(2), 025006 (2010)
35. F. Pollmann, A.M. Turner, Detection of symmetry-protected topological phases in one
dimension. Phys. Rev. B 86(12), 125441 (2012)
36. D. Delande, K. Sacha, M. Płodzie´n, S.K. Avazbaev, J. Zakrzewski, Many-body Anderson
localization in one-dimensional systems. New J. Phys. 15(4), 045021 (2013)
37. J.H. Bardarson, F. Pollmann, J.E. Moore, Unbounded growth of entanglement in models of
many-body localization. Phys. Rev. Lett. 109(1), 017202 (2012)


---
*Page 97*

References
85
38. P. Ponte, Z. Papi´c, F. Huveneers, D.A. Abanin, Many-body localization in periodically driven
systems. Phys. Rev. Lett. 114(14), 140401 (2015)
39. F. Pollmann, J.E. Moore, Entanglement spectra of critical and near-critical systems in one
dimension. New J. Phys. 12(2), 025006 (2010)
40. B. Pozsgay, M. Mestyán, M.A. Werner, M. Kormos, G. Zaránd, G. Takács, Correlations after
Quantum Quenches in the XXZ spin chain: failure of the generalized Gibbs ensemble. Phys.
Rev. Lett. 113(11), 117203 (2014)
41. P. Barmettler, M. Punk, V. Gritsev, E. Demler, E. Altman, Relaxation of antiferromagnetic
order in spin-1/2 chains following a quantum quench. Phys. Rev. Lett. 102(13), 130603 (2009)
42. M. Fagotti, M. Collura, F.H.L. Essler, P. Calabrese, Relaxation after quantum quenches in the
spin-1 2 Heisenberg XXZ chain. Phys. Rev. B 89(12), 125101 (2014)
43. P. Barmettler, M. Punk, V. Gritsev, E. Demler, E. Altman, Quantum quenches in the anisotropic
spin-Heisenberg chain: different approaches to many-body dynamics far from equilibrium.
New J. Phys. 12(5), 055017 (2010)
44. F.H.L. Essler, M. Fagotti, Quench dynamics and relaxation in isolated integrable quantum spin
chains. J. Stat. Mech. Theory Exp. 2016(6), 064002 (2016)
45. W. Li, S.J. Ran, S.S. Gong, Y. Zhao, B. Xi, F. Ye, G. Su, Linearized tensor renormalization
group algorithm for the calculation of thermodynamic properties of quantum lattice models.
Phys. Rev. Lett. 106, 127202 (2011)
46. D. Pérez-García, F. Verstraete, M.M. Wolf, J.I. Cirac, Matrix Product State Representations.
Quantum Inf. Comput. 7, 401 (2007)
47. R. Orús, G. Vidal, Inﬁnite time-evolving block decimation algorithm beyond unitary evolution.
Phys. Rev. B 78, 155117 (2008)
48. J.I. Cirac, D. Pérez-García, N. Schuch, F. Verstraete, Matrix product density operators:
renormalization ﬁxed points and boundary theories. Ann. Phys. 378, 100–149 (2017)
49. N. Schuch, D. Poilblanc, J.I. Cirac, D. Pérez-García, Topological order in the projected
entangled-pair states formalism: transfer operator and boundary Hamiltonians. Phys. Rev. Lett.
111, 090501 (2013)
50. J.I. Cirac, D. Poilblanc, N. Schuch, F. Verstraete, Entanglement spectrum and boundary
theories with projected entangled-pair states. Phys. Rev. B 83, 245134 (2011)
51. S.-J. Ran, C. Peng, W. Li, M. Lewenstein, G. Su, Criticality in two-dimensional quantum
systems: Tensor network approach. Phys. Rev. B 95, 155114 (2017)
52. S. Yang, L. Lehman, D. Poilblanc, K. Van Acoleyen, F. Verstraete, J.I. Cirac, N. Schuch, Edge
theories in projected entangled pair state models. Phys. Rev. Lett. 112, 036402 (2014)
53. I.P. McCulloch, Inﬁnite size density matrix renormalization group, revisited (2008). arXiv
preprint:0804.2509
54. S.R. White, Density matrix formulation for quantum renormalization groups. Phys. Rev. Lett.
69, 2863 (1992)
55. S.R. White, Density-matrix algorithms for quantum renormalization groups. Phys. Rev. B 48,
10345–10356 (1993)
56. K.G. Willson, The renormalization group: critical phenomena and the Kondo problem. Rev.
Mod. Phys. 47, 773 (1975)
57. U. Schollwöck, The density-matrix renormalization group in the age of matrix product states.
Ann. Phys. 326, 96–192 (2011)
58. E.M. Stoudenmire, S.R. White, Studying two-dimensional systems with the density matrix
renormalization group. Annu. Rev. Condens. Matter Phys. 3, 111–128 (2012)
59. U. Schollwöck, The density-matrix renormalization group. Rev. Mod. Phys. 77, 259–315
(2005)
60. G.K.-L. Chan, S. Sharma, The density matrix renormalization group in quantum chemistry.
Ann. Rev. Phys. Chem. 62(1), 465–481 (2011). PMID: 21219144
61. F. Verstraete, D. Porras, J.I. Cirac, Density matrix renormalization group and periodic boundary
conditions: a quantum information perspective. Phys. Rev. Lett. 93, 227205 (2004)
62. P.A.M. Dirac, Note on exchange phenomena in the Thomas atom, in Mathematical Pro-
ceedings of the Cambridge Philosophical Society, vol. 26(3), (Cambridge University Press,
Cambridge, 1930), pp. 376–385


---
*Page 98*

86
3
Two-Dimensional Tensor Networks and Contraction Algorithms
63. A.K. Kerman, S.E. Koonin, Hamiltonian formulation of time-dependent variational principles
for the many-body system. Ann. Phys. 100(1), 332–358 (1976)
64. R. Jackiw, A. Kerman, Time-dependent variational principle and the effective action. Phys.
Lett. A 71(2), 158–162 (1979)
65. P.W. Langhoff, S.T. Epstein, M. Karplus, Aspects of time-dependent perturbation theory. Rev.
Mod. Phys. 44, 602–644 (1972)
66. J. Haegeman, J.I. Cirac, T.J. Osborne, I. Pižorn, H. Verschelde, F. Verstraete, Time-dependent
variational principle for quantum lattices. Phys. Rev. Lett. 107, 070601 (2011)
67. M.C. Bañuls, M.B. Hastings, F. Verstraete, J.I. Cirac, Matrix product states for dynamical
simulation of inﬁnite chains. Phys. Rev. Lett. 102, 240603 (2009)
68. A. Müller-Hermes, J.I. Cirac, M.-C. Bañuls, Tensor network techniques for the computation of
dynamical observables in one-dimensional quantum spin systems. New J. Phys. 14(7), 075003
(2012)
69. M.B. Hastings, R. Mahajan, Connecting entanglement in time and space: improving the folding
algorithm. Phys. Rev. A 91, 032306 (2015)
70. R.J. Bursill, T. Xiang, G.A. Gehring, The density matrix renormalization group for a quantum
spin chain at non-zero temperature. J. Phys. Condens. Matter 8(40), L583 (1996)
71. X.-Q. Wang, T. Xiang, Transfer-matrix density-matrix renormalization-group theory for
thermodynamics of one-dimensional quantum systems. Phys. Rev. B 56(9), 5061 (1997)
72. N. Shibata, Thermodynamics of the anisotropic Heisenberg chain calculated by the density
matrix renormalization group method. J. Phys. Soc. Jpn. 66(8), 2221–2223 (1997)
73. T. Nishino, Density matrix renormalization group method for 2d classical models. J. Phys. Soc.
Jpn. 64(10), 3598–3601 (1995)
74. E. Tirrito, L. Tagliacozzo, M. Lewenstein, S.-J. Ran, Characterizing the quantum ﬁeld theory
vacuum using temporal matrix product states (2018). arXiv:1810.08050
75. L. Wang, Y.-J. Kao, A.W. Sandvik, Plaquette renormalization scheme for tensor network states.
Phys. Rev. E 83, 056703 (2011)
76. Z.-Y. Xie, J. Chen, M.-P. Qin, J.-W. Zhu, L.-P. Yang, T. Xiang, Coarse-graining renormalization
by higher-order singular value decomposition. Phys. Rev. B 86, 045139 (2012)
77. G. Evenbly, G. Vidal, Tensor network renormalization. Phys. Rev. Lett. 115, 180405 (2015)
78. G. Evenbly, G. Vidal, Tensor network renormalization yields the multiscale entanglement
renormalization ansatz. Phys. Rev. Lett. 115, 200401 (2015)
79. G. Evenbly, R.N.C. Pfeifer, Improving the efﬁciency of variational tensor network algorithms.
Phys. Rev. B 89, 245118 (2014)
80. R.N.C. Pfeifer, J. Haegeman, F. Verstraete, Faster identiﬁcation of optimal contraction
sequences for tensor networks. Phys. Rev. E 90, 033315 (2014)
Open Access This chapter is licensed under the terms of the Creative Commons Attribution 4.0
International License (http://creativecommons.org/licenses/by/4.0/), which permits use, sharing,
adaptation, distribution and reproduction in any medium or format, as long as you give appropriate
credit to the original author(s) and the source, provide a link to the Creative Commons licence and
indicate if changes were made.
The images or other third party material in this chapter are included in the chapter’s Creative
Commons licence, unless indicated otherwise in a credit line to the material. If material is not
included in the chapter’s Creative Commons licence and your intended use is not permitted by
statutory regulation or exceeds the permitted use, you will need to obtain permission directly from
the copyright holder.


---
*Page 99*

Chapter 4
Tensor Network Approaches
for Higher-Dimensional Quantum Lattice
Models
Abstract In this section, we will show several representative TN approaches for
simulating the quantum lattice models in (d > 1) dimensions. We will mainly
use the language of TN contractions. One may refer to several existing reviews
(Schollwöck, Ann Phys 326:96–192, 2011; Verstraete et al., Adv Phys 57:143–
224, 2008; Cirac and Verstraete, J Phys A Math Theor 42:504004, 2009; Orús,
Ann Phys 349:117, 2014; Haegeman and Verstraete, Ann Rev Condens Matter Phys
8(1):355–406, 2017) for more exhaustive understanding on the TN simulations for
quantum problems. We will focus on the algorithms based on PEPS, and show the
key roles that the 2D TN contraction algorithms presented in Sect. 3 play in the
higher-dimensional cases.
4.1
Variational Approaches of Projected-Entangled Pair
State
Without losing generality, we consider a 2D quantum system with nearest-neighbor
coupling on an inﬁnite square lattice as an example. The ground state can be
represented by an iPEPS (see Sect. 2.2.4). Similar to MPS (Sect. 3.1.3), the central
task is to minimize the energy
E = ⟨ψ| ˆH|ψ⟩
⟨ψ|ψ⟩.
(4.1)
There are in general two ways to do the minimization. One way proposed ﬁrstly
by Verstraete and Cirac [1] is considering the elements in the tensors as variational
parameters. The tensors in the TN are updated one by one. In a similar spirit as the
boundary-state methods (see Sect. 3.4), the key of this approach is to transform the
global minimization to local ones, where one tensor (say P [i], see the PEPS form in
Eq. (2.23), Sect. 2.2.4) is updated by a local minimization problem
E = P [i]† ˆH eff P [i]
P [i]† ˆNeff P [i] .
(4.2)
© The Author(s) 2020
S.-J. Ran et al., Tensor Network Contractions, Lecture Notes in Physics 964,
https://doi.org/10.1007/978-3-030-34489-4_4
87


---
*Page 100*

88
4
Tensor Network Approaches for Higher-Dimensional Quantum Lattice Models
Fig. 4.1 The illustration of
ˆH eff in Eq. (4.2)
ˆH eff is an “effective” Hamiltonian by computing ⟨ψ| ˆH|ψ⟩but after taking P [i]† in
⟨ψ| and P [i] in |ψ⟩out. Figure 4.1 depicts ˆH eff where ˆH is written as an inﬁnite
PEPO (iPEPO, also see Sect. 2.2.6 for PEPO) for a better illustration. Similarly,
ˆNeff is deﬁned by computing ⟨ψ|ψ⟩but after taking P [i]† and P [i] out.
Obviously, the computations of both ˆH eff and ˆNeff are in fact to contract the
corresponding 2D TN’s where the 2D TN contraction algorithms are needed. In
[2], Corboz used CTMRG (see [3] or Sect. 3.3) to compute the contractions. In [4],
Vanderstraeten et al. further developed this idea to a gradient method, where the
gradient is calculated by implementing similar 2D TN contractions. The gradient is
given as
∂E
∂P [i]† = ∂⟨ψ| ˆH|ψ⟩/⟨ψ|ψ⟩
∂P [i]†
= 2∂P [i]†⟨ψ| ˆH|ψ⟩
⟨ψ|ψ⟩
−2⟨ψ| ˆH|ψ⟩
⟨ψ|ψ⟩2 ∂P [i]†⟨ψ|ψ⟩.
By imposing the normalization condition ⟨ψ|ψ⟩= 1 and shifting the ground-state
energy to zero by ˆH ←ˆH −⟨ψ| ˆH|ψ⟩, the gradient is simpliﬁed as
∂E
∂P [i]† = 2∂P [i]†⟨ψ| ˆH|ψ⟩.
(4.3)
Thus the gradient is computed by contracting the TN of ⟨ψ| ˆH|ψ⟩after taking P [i]†
out.
The gradient method is consistent with the effective Hamiltonian schemes. In
fact, one has
∂E
∂P [i]† = 2 ˆH eff P [i]. At the minimal point, the gradient should vanish
∂E
∂P [i]† = 0. It means 2 ˆH eff P [i] = 0, i.e., P [i] is the dominant eigenstate of ˆH eff
with a zero eigenvalue. Considering the ground-state energy is shifted to zero, P [i]
is the ground state of the effective Hamiltonian ˆH eff .


---
*Page 101*

4.1
Variational Approaches of Projected-Entangled Pair State
89
Note that the inﬁnite PEPO (iPEPO) representation is not enforced to deﬁne
ˆH eff . In fact, it is not easy to obtain the iPEPO of an arbitrary 2D (or 3D)
Hamiltonian. The usual way is to start from the summation form of the Hamiltonian
ˆH =  ˆHij, and compute the contribution to ˆH eff from each ˆHij separately [2].
Each term is computed by contracting a 2D TN, where one can reuse the results to
improve the efﬁciency.
Following the same clue (minimizing E), algorithms were proposed to combine
TN with the QMC methods [5–9]. Still let us focus on those based on PEPS. One
may transform Eq. (4.1) as
E =

S,S′ W(S′)⟨S′| ˆH|S⟩W(S)

S W(S)2
,
(4.4)
where S
=
(s1, s2, · · · ) goes through all spin conﬁgurations and W(S)
=
⟨s1s2 · · · |ψ⟩is the coefﬁcient of the iPEPS for the given conﬁguration. QMC
sampling can be implemented by deﬁning the weight function as W(S)2 and the
estimator E(S) as
E(S) =

S′
W(S′)
W(S) ⟨S′| ˆH|S⟩,
(4.5)
so that the energy becomes
E = ⟨E(S)⟩=

S
W(S)2E(S).
(4.6)
It is easy to see that the normalization condition of the weights 
S W(S)2 = 1 is
satisﬁed.
The task becomes to compute W(S) and ⟨S′| ˆH|S⟩with different conﬁgurations.
The computation of ⟨S′| ˆH|S⟩is relatively easy since |S⟩and |S′⟩are just two
product states. The computation of W(S) is more tricky. When |ψ⟩is a PEPS on
a square lattice, W(S) is a 2D scalar TN by ﬁxing all the physical indexes of the
PEPS as
W(S) = tTr

n
P [n]
sn ,
(4.7)
where P [n]
sn
is a fourth-order tensor that only has the geometrical index.1 The n-th
physical index is taken as sn. Considering that most of the conﬁgurations are not
translationally invariant, such QMC-TN methods are usually applied to ﬁnite-size
models. One may use the ﬁnite TN version of the algorithms reviewed in Sect. 3.
1One may refer to Eq. (2.23) to better understand Eq. (4.7).


---
*Page 102*

90
4
Tensor Network Approaches for Higher-Dimensional Quantum Lattice Models
4.2
Imaginary-Time Evolution Methods
Another way to compute the ground-state iPEPS is to do imaginary-time evolution,
analog to the MPS methods presented in Sect. 3.1.3. For a d-dimensional quantum
model, its ground-state simulation can be considered as computing the contraction
of a (d + 1)-dimensional TN.
Firstly, let us show how the evolution operator for an inﬁnitesimal imaginary-
time step τ can be written as an iPEPO, which is in fact one layer of the 3D TN
(Fig. 4.2). The evolution of the iPEPS is to put the iPEPS at the bottom and to
contract the TN layer by layer to it.
To proceed, we divide the local Hamiltonians on the square lattice into four
group: ˆHe,e = 
even i,j ˆH [i,j;i,j+1] + ˆH [i.j;i+1,j], ˆHo,o = 
odd i,j ˆH [i,j;i,j+1] +
ˆH [i.j;i+1,j],
ˆHe,o
=

even i, odd j ˆH [i,j;i,j+1] +
ˆH [i.j;i+1,j], and Ho,e
=

odd i, even j ˆH [i,j;i,j+1]+ ˆH [i.j;i+1,j]. One can see that each two terms in one group
commute to each other. The evolution operator for an inﬁnitesimal imaginary-time
step (τ →0) then can be written as
ˆU = exp(−τ ˆH)
(4.8)
= exp

−τ ˆH [e,e]
exp

−τ ˆH [o,o]
exp

−τ ˆH [e,o]
exp

−τ ˆH [o,e]
+ O

τ 2
.
exp(-τH  )
ij =
L
R
=
=
T
[L]
T
[R]
L
L
L
L
L
L
R
L
L
R
R
R
Fig. 4.2 The evolution of a PEPS can be mapped to the contraction of a 3D TN


---
*Page 103*

4.2
Imaginary-Time Evolution Methods
91
Let us assume translational invariance to the Hamiltonian, i.e., ˆH [i,j] = ˆH [two].
The element of two-body evolution operator is a fourth-order tensor Usisj s′
is′
j =
⟨s′
is′
j| exp(−τ ˆH [two])|sisj⟩. Implement SVD or QR decomposition on U (4.2) as
Usisj s′
is′
j =

α
Lsis′
i,aRsj s′
j ,a.
(4.9)
Then the two tensors T [L] and T [R] that form the iPEPO of ˆU is obtained as
T [L]
ss′,a1a2a3a4 =

s1s2s3
Lss1,a1Ls1s2,a2Ls2s3,a3Ls3s′,a4,
T [R]
ss′,a1a2a3a4 =

s1s2s3
Rss1,a1Rs1s2,a2Rs2s3,a3Rs3s′,a4.
(4.10)
The four Ls (or Rs) in T [L] (or T [R]) correspond to the evolution operators of the
two-body terms in ˆH [e,e], ˆH [o,o], ˆH [e,o], and ˆH [o,e] in Eq. (4.9), respectively (see
the left part of Fig. 4.2).
While the TN for the imaginary-time evolution with the iPEPO is a cubic TN,
one may directly use the tensor U, which also gives a 3D but not cubic TN. Without
losing generality, we in the following will use the iPEPO to present the algorithms
for contraction a cubic TN. The algorithm can be readily applied to deal with
the statistic models on cubic lattice or other problems that can be written as the
contraction of a cubic TN.
The evolution ˆU|ψ⟩is to contract the iPEPO (one layer of the tensors) to the
iPEPS. In accordance to the translational invariance of the iPEPO, the iPEPS is also
formed by two inequivalent tensors (denoted by P [L] and P [R]). Locally, the tensors
in the evolved iPEPS are given as
˜P [L]
s,˜α1 ˜α2 ˜α3 ˜α4 =

s′
T [L]
ss′,a1a2a3a4P [L]
s′,α1α2α3α4,
(4.11)
˜P [R]
s,˜α1 ˜α2 ˜α3 ˜α4 =

s′
T [R]
ss′,a1a2a3a4P [R]
s′,α1α2α3α4,
(4.12)
with the composite indexes ˜αx = (ax, αx) (x = 1, 2, 3, 4). Obviously, the bond
dimensions of the new tensors are increased by dim(ax) times. It is necessary to
preset a dimension cut-off χ: when the bond dimensions become larger than χ,
approximations will be introduced to reduce the dimensions back to χ. One then
can iterate the evolution of the iPEPS with bounded computational cost. After the
iPEPS converges, it is considered that the ground state is reached. Therefore, one
key step in the imaginary-time schemes (as well as the similar contraction schemes
of 3D TN’s) is to ﬁnd the optimal truncations of the enlarged bonds. In the following,
we will concentrate on the truncation of bond dimensions, and present three kinds of


---
*Page 104*

92
4
Tensor Network Approaches for Higher-Dimensional Quantum Lattice Models
scheme known as full, simple, and cluster updates according to which environment
the truncations are optimized [10].2
4.3
Full, Simple, and Cluster Update Schemes
For truncating the dimensions of the geometrical bonds of an iPEPS, the task is to
minimize the distance between the iPEPSs before and after the truncation, i.e.,
ε = || ˜ψ⟩−|ψ⟩|.
(4.13)
With the normalization condition of the iPEPSs, the problem can be reduced to the
maximization of the ﬁdelity
Z = ⟨˜ψ|ψ⟩.
(4.14)
As discussed in Sect. 3.1.2, Z is in fact a scalar TN.
Full Update Among the three kinds of update schemes, full update seems to be the
most natural and reasonable, in which the truncation is optimized referring to the
whole iPEPS [10–16]. Let us consider a translationally invariant iPEPS. For square
lattice, the iPEPS is formed by the inﬁnite copies of two tensors P [L] and P [R]
located on the two sub-lattices, respectively. Their evolution is given by Eq. (4.10).
We use ˜P [L] and ˜P [R] to denote the tensors with enlarged bond dimensions. Below,
we follow Ref. [13] to explain the truncation process. To truncate the fourth bond
˜α4 of the tensor, for example, one ﬁrstly deﬁnes the tensor M by contracting a pair
of ˜P [L] and ˜P [R] as
Ms1 ˜α1 ˜α2 ˜α3,s2 ˜α′
1 ˜α′
2 ˜α′
3 =

˜α4
˜P [L]
s1,˜α1 ˜α2 ˜α3 ˜α4 ˜P [R]
s2,˜α′
1 ˜α′
2 ˜α′
3 ˜α4.
(4.15)
Note that P [L] and P [R] share the bond ˜α4 that is to be truncated. Compute the
environment tensor Me by contracting the TN of Z after taking a pair of ˜P [L] and
˜P [R] out from the TN. M is in fact an eighth-order tensor of the same dimensions
as M. Decompose Me by SVD as
Me
s1 ˜α1 ˜α2 ˜α3,s2 ˜α′
1 ˜α′
2 ˜α′
3 =

α
V [L]
s1 ˜α1 ˜α2 ˜α3,αΛαV [R]
s2 ˜α′
1 ˜α′
2 ˜α′
3,α.
(4.16)
2The deﬁnition of the update schemes also apply to ﬁnite-size PEPS and the variational methods;
for example, the variational methods which contract the whole TN to update the (i)PEPS are also
called full update.


---
*Page 105*

4.3
Full, Simple, and Cluster Update Schemes
93
Deﬁne a new matrix as ˜M = Λ1/2V [R]MV [L]Λ1/2 and decompose it by SVD as
˜M ≃˜V [L] ˜Λ ˜V [R] by taking only the χ-largest singular values and singular vectors.
Finally, two tensors are updated by P [L] =
˜Λ1/2 ˜V [L]T Λ−1/2V [R]T and P [R] =
˜Λ1/2 ˜V [R]Λ−1/2V [L]. One can check
Ms1 ˜α1 ˜α2 ˜α3,s2 ˜α′
1 ˜α′
2 ˜α′
3 ≃

α4
P [L]
s1,˜α1 ˜α2 ˜α3α4P [R]
s2,˜α′
1 ˜α′
2 ˜α′
3α4,
(4.17)
with the dimension of the shared bond dim(α4) = χ. We shall stress that Eq. (4.17)
is not the SVD of M; the decomposition and truncation are optimized by the SVD
of Me, hence is a non-local optimization.
With the formula given above, the task is to compute the environment tensor
Me by the contraction algorithms of 2D TN’s. In Ref. [13], the authors developed
the SRG, where Me is computed by a modiﬁed version of TRG algorithm [17].
Other options include iTEBD [15], CTMRG [12], etc. Note that how to deﬁne
the environment as well as how to truncate by the environment may have subtle
differences in different works. The spirit is the same, which is to minimize the
ﬁdelity in Eq. (4.14) referring to the whole iPEPS.
Simple Update A much more efﬁcient way known as the simple update was
proposed by Jiang et al. [18]; it uses local environment to determine the truncations,
providing an extremely efﬁcient algorithm to simulate the 2D ground states. As
shown in Fig. 2.8c, the iPEPS used in the simple update is formed by the tensors on
the site and the spectra on the bonds: two tensors P [L] and P [R] located on the two
sub-lattices, and λ[1], λ[2], λ[3], and λ[4] on the four inequivalent geometrical bonds
of each tensor. The evolution of the tensors in such an iPEPS is given by Eq. (4.10).
λ[i] should be simultaneously evolved as ˜λ[i]
(ai,αi) = Iaiλαi with Iai = 1.
To truncate the fourth geometrical bond of P [L] (and P [R]), for example, we
construct a new tensor by contracting P [L] and P [R] and the adjacent spectra as
Ms1 ˜α1 ˜α2 ˜α3,s2 ˜α′
1 ˜α′
2 ˜α′
3 =

˜α4
˜P [L]
s1,˜α1 ˜α2 ˜α3 ˜α4 ˜P [R]
s2,˜α′
1 ˜α′
2 ˜α′
3 ˜α4 ˜λ[1]
˜α1 ˜λ[2]
˜α2 ˜λ[3]
˜α3 ˜λ[1]′
˜α′
1
˜λ[2]′
˜α2 ˜λ[3]′
˜α3 ˜λ[4]
˜α4 .
(4.18)
Then implement SVD on M as
Ms1 ˜α1 ˜α2 ˜α3,s2 ˜α′
1 ˜α′
2 ˜α′
3 ≃
χ

α=1
U[L]
s1 ˜α1 ˜α2 ˜α3,αλαU[R]
s2 ˜α′
1 ˜α′
2 ˜α′
3,α,
(4.19)


---
*Page 106*

94
4
Tensor Network Approaches for Higher-Dimensional Quantum Lattice Models
where one takes only the χ-largest singular values and the basis. P [L] and P [R] are
updated as
P [L]
s1,˜α1 ˜α2 ˜α3α = U[L]
s1 ˜α1 ˜α2 ˜α3,α

˜λ[1]
˜α1
−1 
˜λ[2]
˜α2
−1 
˜λ[3]
˜α3
−1
,
P [R]
s2,˜α1 ˜α2 ˜α3α = U[R]
s2 ˜α1 ˜α2 ˜α3,α

˜λ[1]
˜α1
−1 
˜λ[2]
˜α2
−1 
˜λ[3]
˜α3
−1
.
(4.20)
The spectrum ˜λ4 is updated by λ in the SVD.
The above procedure truncates dim(˜α4) to the dimension cut-off χ, which can be
readily applied to truncate any other bonds. According to the discussion about SVD
in Sect. 2.2.1, the environment is the two tensors and the adjacent spectra λs in M,
where the λs play the role of an “effective” environment that approximate the true
environment (Me in the full update). From this viewpoint, the simple update uses
local environment. Later by borrowing from the idea of the orthogonal form of the
iPEPS on Bethe lattices [19–26], it was realized that the environment of the simple
update is the iPEPS on the inﬁnite trees [27–29], not just several tensors. We will
talk about this in detail in the next chapter from the perspective of the multi-linear
algebra.
Cluster Update By keeping the same dimension cut-off, the simple update is
much more efﬁcient than the full update. On the other hand, obviously, the full
update possesses higher accuracy than the simple update by considering better the
environment. The cluster update is between the simple and full updates, which is
more ﬂexible to balance between the efﬁciency and accuracy [10, 27, 30].
One way is to choose a ﬁnite cluster of the inﬁnite TN and deﬁne the environment
tensor by contracting the ﬁnite TN after taking a pair of ˜P [L] and ˜P [R] out. One
can consider to ﬁrstly use the simple update to obtain the spectra and put them
on the boundary of the cluster [30]. This is equivalent to using a new boundary
condition [27, 29], different from the open or periodic boundary conditions of a ﬁnite
cluster. Surely, the bigger the cluster becomes, more accurate but more consuming
the computation will be. One may also consider an inﬁnite-size cluster, which is
formed by a certain number of rows of the tensors in the TN [10]. Again, both the
accuracy and computational cost will in general increase with the number of rows.
With inﬁnite rows, such a cluster update naturally becomes the full update. Despite
the progresses, there are still many open questions, for example, how to best balance
the efﬁciency and accuracy in the cluster update.
4.4
Summary of the Tensor Network Algorithms in Higher
Dimensions
In this section, we mainly focused on the iPEPS algorithm that simulates the ground
states of 2D lattice models. The key step is to compute the environment tensor,
which is to contract the corresponding TN. For several special cases such as trees


---
*Page 107*

References
95
and fractal lattices, the environment tensor corresponds to an exactly contractible
TN, and thus can be computed efﬁciently (see Sect. 2.3.6). For the regular lattices
such as square lattice, the environment tensor is computed by the TN contraction
algorithms, which is normally the most consuming step in the iPEPS approaches.
The key concepts and ideas, such as environment, (simple, cluster, and full)
update schemes, and the use of SVD, can be similarly applied to ﬁnite-size cases
[31, 32], the ﬁnite-temperature simulations [27, 28, 33–39], and real-time simula-
tions [31, 40] in two dimensions. The computational cost of the TN approaches
is quite sensitive to the spatial dimensions of the system. The simulations of 3D
quantum systems are much more consuming than the 2D cases, where the task
becomes to contract the 4D TN. The 4D TN contraction is extremely consuming,
one may consider to generalize the simple update [29, 41], or to construct ﬁnite-size
effective Hamiltonians that mimic the inﬁnite 3D quantum models [29, 42]
Many technical details of the approaches can be ﬂexibly modiﬁed according
to the problems under consideration. For example, the iPEPO formulation is very
useful when computing a 3D statistic model, which is to contract the corresponding
3D TN. As for the imaginary-time evolution, it is usually more efﬁcient to use
the two-body evolution operators (see, e.g., [12, 18]) rather than the iPEPO.
The environment is not necessarily deﬁned by the tensors; it can be deﬁned by
contracting everything of the TN except for the aimed geometrical bond [28, 33].
The contraction order also signiﬁcantly affects the efﬁciency and accuracy. One may
consider to use the “single-layer” picture [10, 31], or an “intersected” optimized
contraction scheme [43].
References
1. F. Verstraete, J.I. Cirac, Renormalization algorithms for quantum-many body systems in two
and higher dimensions (2004). arXiv preprint:cond-mat/0407066
2. P. Corboz, Variational optimization with inﬁnite projected entangled-pair states. Phys. Rev. B
94, 035133 (2016)
3. T. Nishino, K. Okunishi, Corner transfer matrix renormalization group method. J. Phys. Soc.
Jpn. 65, 891–894 (1996)
4. L. Vanderstraeten, J. Haegeman, P. Corboz, F. Verstraete, Gradient methods for variational
optimization of projected entangled-pair states. Phys. Rev. B 94, 155123 (2016)
5. A.W. Sandvik, G. Vidal, Variational quantum Monte Carlo simulations with tensor-network
states. Phys. Rev. Lett. 99, 220602 (2007)
6. N. Schuch, M.M. Wolf, F. Verstraete, J.I. Cirac, Simulation of quantum many-body systems
with strings of operators and Monte Carlo tensor contractions. Phys. Rev. Lett. 100, 040501
(2008)
7. A. Sfondrini, J. Cerrillo, N. Schuch, J.I. Cirac, Simulating two- and three-dimensional
frustrated quantum systems with string-bond states. Phys. Rev. B 81, 214426 (2010)
8. L. Wang, I. Pižorn, F. Verstraete, Monte Carlo simulation with tensor network states. Phys.
Rev. B 83, 134421 (2011)
9. W.-Y. Liu, S.-J. Dong, Y.-J. Han, G.-C. Guo, L.-X. He, Gradient optimization of ﬁnite projected
entangled pair states. Phys. Rev. B 95, 195154 (2017)


---
*Page 108*

96
4
Tensor Network Approaches for Higher-Dimensional Quantum Lattice Models
10. M. Lubasch, J.I. Cirac, M.-C. Bañuls, Unifying projected entangled pair state contractions.
New J. Phys. 16(3), 033014 (2014)
11. Z.-Y. Xie, J. Chen, M.-P. Qin, J.-W. Zhu, L.-P. Yang, T. Xiang, Coarse-graining renormalization
by higher-order singular value decomposition. Phys. Rev. B 86, 045139 (2012)
12. R. Orús, G. Vidal, Simulation of two-dimensional quantum systems on an inﬁnite lattice
revisited: corner transfer matrix for tensor contraction. Phys. Rev. B 80, 094403 (2009)
13. Z.Y. Xie, H.C. Jiang, Q.N. Chen, Z.Y. Weng, T. Xiang, Second renormalization of tensor-
network states. Phys. Rev. Lett. 103, 160601 (2009)
14. R. Orús, Exploring corner transfer matrices and corner tensors for the classical simulation of
quantum lattice systems. Phys. Rev. B 85, 205117 (2012)
15. J. Jordan, R. Orús, G. Vidal, F. Verstraete, J.I. Cirac, Classical simulation of inﬁnite-size
quantum lattice systems in two spatial dimensions. Phys. Rev. Lett. 101, 250602 (2008)
16. H.N. Phien, J.A. Bengua, H.D. Tuan, P. Corboz, R. Orús, Inﬁnite projected entangled pair
states algorithm improved: fast full update and gauge ﬁxing. Phys. Rev. B 92, 035142 (2015)
17. M. Levin, C.P. Nave, Tensor renormalization group approach to two-dimensional classical
lattice models. Phys. Rev. Lett. 99, 120601 (2007)
18. H.C. Jiang, Z.Y. Weng, T. Xiang, Accurate determination of tensor network state of quantum
lattice models in two dimensions. Phys. Rev. Lett. 101, 090603 (2008)
19. Y.-Y. Shi, L.M. Duan, G. Vidal, Classical simulation of quantum many-body systems with a
tree tensor network. Phys. Rev. A 74, 022320 (2006)
20. D. Nagaj, E. Farhi, J. Goldstone, P. Shor, I. Sylvester, Quantum transverse-ﬁeld Ising model on
an inﬁnite tree from matrix product states. Phys. Rev. B 77, 214431 (2008)
21. L. Tagliacozzo, G. Evenbly, G. Vidal, Simulation of two-dimensional quantum systems using
a tree tensor network that exploits the entropic area law. Phys. Rev. B 80, 235127 (2009)
22. V. Murg, F. Verstraete, Ö. Legeza, R.M. Noack, Simulating strongly correlated quantum
systems with tree tensor networks. Phys. Rev. B 82, 205105 (2010)
23. W. Li, J. von Delft, T. Xiang, Efﬁcient simulation of inﬁnite tree tensor network states on the
Bethe lattice. Phys. Rev. B 86, 195137 (2012)
24. N. Nakatani, G.K.L. Chan, Efﬁcient tree tensor network states (TTNS) for quantum chemistry:
generalizations of the density matrix renormalization group algorithm. J. Chem. Phys. 138,
134113 (2013)
25. I. Pižorn, F. Verstraete, R.M. Konik, Tree tensor networks and entanglement spectra. Phys. Rev.
B 88, 195102 (2013)
26. V. Murg, F. Verstraete, R. Schneider, P.R. Nagy, Ö. Legeza. Tree tensor network state with
variable tensor order: an efﬁcient multireference method for strongly correlated systems. J.
Chem. Theory Comput. 11, 1027–1036 (2015)
27. S.J. Ran, B. Xi, T. Liu, G. Su, Theory of network contractor dynamics for exploring
thermodynamic properties of two-dimensional quantum lattice models. Phys. Rev. B 88,
064407 (2013)
28. S.J. Ran, W. Li, B. Xi, Z. Zhang, G. Su, Optimized decimation of tensor networks with
super-orthogonalization for two-dimensional quantum lattice models. Phys. Rev. B 86, 134429
(2012)
29. S.-J. Ran, A. Piga, C. Peng, G. Su, M. Lewenstein. Few-body systems capture many-body
physics: tensor network approach. Phys. Rev. B 96, 155120 (2017)
30. L. Wang, F. Verstraete, Cluster update for tensor network states (2011). arXiv preprint
arXiv:1110.4362
31. I. Pižorn, L. Wang, F. Verstraete, Time evolution of projected entangled pair states in the single-
layer picture. Phys. Rev. A 83, 052321 (2011)
32. M. Lubasch, J.I. Cirac, M.-C. Bañuls, Algorithms for ﬁnite projected entangled pair states.
Phys. Rev. B 90, 064425 (2014)
33. P. Czarnik, L. Cincio, J. Dziarmaga, Projected entangled pair states at ﬁnite temperature:
imaginary time evolution with ancillas. Phys. Rev. B 86, 245101 (2012)
34. P. Czarnik, J. Dziarmaga, Variational approach to projected entangled pair states at ﬁnite
temperature. Phys. Rev. B 92, 035152 (2015)


---
*Page 109*

References
97
35. P. Czarnik, J. Dziarmaga, Projected entangled pair states at ﬁnite temperature: iterative self-
consistent bond renormalization for exact imaginary time evolution. Phys. Rev. B 92, 035120
(2015)
36. P. Czarnik, J. Dziarmaga, A.M. Ole´s, Variational tensor network renormalization in imaginary
time: two-dimensional quantum compass model at ﬁnite temperature. Phys. Rev. B 93, 184410
(2016)
37. P. Czarnik, M.M. Rams, J. Dziarmaga, Variational tensor network renormalization in imaginary
time: benchmark results in the Hubbard model at ﬁnite temperature. Phys. Rev. B 94, 235142
(2016)
38. P. Czarnik, J. Dziarmaga, A.M. Ole´s, Overcoming the sign problem at ﬁnite temperature:
quantum tensor network for the orbital eg model on an inﬁnite square lattice. Phys. Rev. B
96, 014420 (2017)
39. A. Kshetrimayum, M. Rizzi, J. Eisert, R. Orús, A tensor network annealing algorithm for two-
dimensional thermal states (2018). arXiv preprint:1809.08258
40. P. Czarnik, J. Dziarmaga, P. Corboz, Time evolution of an inﬁnite projected entangled pair
state: an efﬁcient algorithm. Phys. Rev. B 99, 035115 (2019)
41. S.S. Jahromi, R. Orús, A universal tensor network algorithm for any inﬁnite lattice (2018).
arXiv preprint:1808.00680
42. S.-J. Ran, B. Xi, C. Peng, G. Su, M. Lewenstein, Efﬁcient quantum simulation for thermody-
namics of inﬁnite-size many-body systems in arbitrary dimensions. Phys. Rev. B 99, 205132
(2019)
43. Z.-Y. Xie, H.-J. Liao, R.-Z. Huang, H.-D. Xie, J. Chen, Z.-Y. Liu, T. Xiang, Optimized
contraction scheme for tensor-network states. Phys. Rev. B 96, 045128 (2017)
Open Access This chapter is licensed under the terms of the Creative Commons Attribution 4.0
International License (http://creativecommons.org/licenses/by/4.0/), which permits use, sharing,
adaptation, distribution and reproduction in any medium or format, as long as you give appropriate
credit to the original author(s) and the source, provide a link to the Creative Commons licence and
indicate if changes were made.
The images or other third party material in this chapter are included in the chapter’s Creative
Commons licence, unless indicated otherwise in a credit line to the material. If material is not
included in the chapter’s Creative Commons licence and your intended use is not permitted by
statutory regulation or exceeds the permitted use, you will need to obtain permission directly from
the copyright holder.


---
*Page 110*

Chapter 5
Tensor Network Contraction
and Multi-Linear Algebra
Abstract This chapter is aimed at understanding TN algorithms from the per-
spective of MLA. In Sect. 5.1, we start from a simple example with a 1D TN
stripe, which can be “contracted” by solving the eigenvalue decomposition of
matrices. This relates to several important MPS techniques such as canonicaliza-
tion (Orús and Vidal, Phys Rev B 78:155117, 2008) that enables to implement
optimal truncations of the bond dimensions of MPSs (Sect. 5.1.1). In Sect. 5.2,
we discuss about super-orthogonalization (Ran et al., Phys Rev B 86:134429,
2012) inspired by Tucker decomposition (De Lathauwer et al., SIAM J Matrix
Anal Appl 21(4):1324–1342, 2000) in MLA, which is also a higher-dimensional
generalization of canonicalization; it is proposed to implement optimal truncations
of the iPEPSs deﬁned on trees. In Sect. 5.3.1, we explain based on the rank-1
decomposition (De Lathauwer et al., SIAM J Matrix Anal Appl 21:1253–1278,
2000) that super-orthogonalization in fact provides the “loopless approximation” of
the iPEPSs on regular lattices (Ran et al., Phys Rev B 88:064407, 2013); it explains
how the approximations in the simple update algorithm works for the ground-state
simulations on 2D regular lattices (Jiang et al., Phys Rev Lett 101:090603, 2008).
In Sect. 5.4, we will discuss tensor ring decomposition (TRD) (Ran, Phys Rev E
93:053310, 2016), which is a rank-N generalization of the rank-1 decomposition.
TRD naturally provides a uniﬁed description of iDMRG (White, Phys Rev Lett
69:2863, 1992; Phys Rev B 48:10345–10356, 1993; McCulloch, Inﬁnite size density
matrix renormalization group, revisited, 2008. arXiv:0804.2509), iTEBD (Vidal,
Phys Rev Lett 98:070201, 2007), and CTMRG (Orús and Vidal, Phys Rev B
80:094403, 2009; Fishman et al., Faster methods for contracting inﬁnite 2D tensor
networks, 2017. arXiv:1711.05881) when considering the contractions of 2D TNs.
5.1
A Simple Example of Solving Tensor Network
Contraction by Eigenvalue Decomposition
As discussed in the previous sections, the TN algorithms are understood mostly
based on the linear algebra, such as eigenvalue and singular value decompositions.
Since the elementary building block of a TN is a tensor, it is very natural to think
© The Author(s) 2020
S.-J. Ran et al., Tensor Network Contractions, Lecture Notes in Physics 964,
https://doi.org/10.1007/978-3-030-34489-4_5
99


---
*Page 111*

100
5
Tensor Network Contraction and Multi-Linear Algebra
about using the MLA to understand and develop TN algorithms. MLA is also known
as tensor decompositions or tensor algebra [1]. It is a highly inter-disciplinary
subject. One of its tasks is to generalize the techniques in the linear algebra to
higher-order tensors. For instance, one key question is how to deﬁne the rank of
a tensor and how to determine its optimal lower-rank approximation. This is exactly
what we need in the TN algorithms.
Let us begin with a trivial example by simply considering the trace of the product
of N number of (χ × χ) matrices M as
TrM = Tr(M[1]M[2] · · · M[N]) = Tr
N

n=1
M[n],
(5.1)
with M[n] = M. In the language of TN, this can be regarded as a 1D TN with
periodic boundary condition. For simplicity, we assume that the dominant eigenstate
of M is unique.
Allow us to ﬁrstly use a clumsy way to do the calculation: contract the shared
bonds one by one from left to right. For each contraction, the computational cost is
O(χ3), thus the total cost is O(Nχ3).
Now let us be smarter by using the eigenvalue decomposition (assume it exists
for M) in the linear algebra, which reads
M = UΛU†,
(5.2)
where Λ are diagonal and U is unitary satisfying UU† = U†U = I. Substituting
Eq. (5.2) into (5.1), we can readily have the contraction as
TrM = Tr(UΛU†UΛU† · · · UΛU†) = Tr(UΛNU†) =
χ−1

a=0
ΛN
a .
(5.3)
The dominant computational cost is around O(χ3).
In the limit of N →∞, things become even easier, where we have
TrM = lim
N→∞ΛN
0
χ−1

a=0
Λa
Λ0
N
= ΛN
0 ,
(5.4)
where Λ0 is the largest eigenvalue, and we have limN→∞( Λa
Λ0 )N = 0 for a > 0. It
means all the contributions except for the dominant eigenvalue vanish when the TN
is inﬁnitely long. What we should do is just to compute the dominant eigenvalue.
The efﬁciency can be further improved by numerous more mature techniques (such
as Lanczos algorithm).


---
*Page 112*

5.1
A Simple Example of Solving Tensor Network Contraction by Eigenvalue...
101
5.1.1
Canonicalization of Matrix Product State
Before considering a 2D TN, let us take some more advantages of the eigenvalue
decomposition on the 1D TN’s, which is closely related to the canonicalization
of MPS proposed by Orús and Vidal for non-unitary evolution of MPS [2]. The
utilization of canonicalization is mainly in two aspects: locating optimal truncations
of the MPS, and ﬁxing the gauge degrees of freedom of the MPS for better stability
and efﬁciency.
5.1.2
Canonical Form and Globally Optimal Truncations of
MPS
As discussed in the above chapter, when using iTEBD to contract a TN, one needs
to ﬁnd the optimal truncations of the virtual bonds of the MPS. In other words, the
problem is how to optimally reduce the dimension of an MPS.
The globally optimal truncation can be down in the following expensive way.
Let us divide the MPS into two parts by cutting the bond that is to be truncated
(Fig. 5.1). Then, if we contract all the virtual bonds on the left-hand side and reshape
all the physical indexes there into one index, we will obtain a large matrix denoted
as L···sn,αn that has one big physical and one virtual index. Another matrix denoted
as R∗
sn+1··· ,αn can be obtained by doing the same thing on the right hand side. The
conjugate of R is taken there to obey some conventions.
Then, by contracting the virtual bond and doing SVD as

an
L···sn,anR∗
sn+1··· ,an =

a′n
˜L···sn,a′nλa′n ˜R∗
sn+1··· ,a′n,
(5.5)
the virtual bond dimension is optimally reduced to χ by only taking the χ-
largest singular values and the corresponding vectors. The truncation error that
is minimized is the distance between the MPS before and after the truncation.
Therefore, the truncation is optimal globally concerning the whole MPS as the
environment.
Fig. 5.1 An impractical scheme to get the global optimal truncation of the virtual bond (red).
First, the MPS is cut into two parts. All the indexes on each side of the cut are grouped into one
big index. Then by contracting the virtual bond and doing the SVD, the virtual bond dimension is
optimally reduced to χ by only taking the χ-largest singular values and the corresponding vectors


---
*Page 113*

102
5
Tensor Network Contraction and Multi-Linear Algebra
Fig. 5.2 The MPS with two-site translational invariance
In practice, we do not implement the SVD above. It is actually the decomposition
of the whole wave-function, which is exponentially expensive. Canonicalization
provides an efﬁcient way to realize the SVD through only local operations.
Considering an inﬁnite MPS with two-site translational invariance (Fig. 5.2); it is
formed by the tensors A and B as well as the diagonal matrices Λ and Γ as

{a}
· · · Λan−1Asn−1,an−1anΓanBsn,anan+1Λan+1 · · · = tTr(· · · ΛAΓ BΛ · · · ). (5.6)
This is the MPS used in the iTEBD algorithm (see Sect. 3.4 and Fig. 3.5). Note that
all argument can be readily generalized to the inﬁnite MPSs with n-site translational
invariance, or even to the ﬁnite MPSs.
An MPS is in the canonical form if the tensors satisfy

sa
ΛaAs,aa′Λ∗
aA∗
s,aa′′ = Ia′a′′,
(5.7)

sa
As,a′aΓaA∗
s,a′′aΓ ∗
a = Ia′a′′,
(5.8)

sa
ΓaBs,aa′Γ ∗
a B∗
s,aa′′ = Ia′a′′,
(5.9)

sa
Bs,a′aΛaB∗
s,a′′aΛ∗
a = Ia′a′′,
(5.10)
where Λ and Γ are positive-deﬁned (Fig. 5.3). Equations (5.7)–(5.10) are called
the canonical conditions of the MPS. Note there will be 2n equations with n-site
translational invariance, meaning that each inequivalent tensor will obey to two (left
and right) conditions.
In the canonical form, Λ or Γ directly give the singular values by cutting
the MPS on the corresponding bond. To see this, let us calculate Eq. (5.5) from
a canonical MPS. From the canonical conditions, matrices L and R are unitary,
satisfying L†L = I and R†R = I (the physical indexes are contracted). Meanwhile,
Λ (or Γ ) is positive-deﬁned, thus L, Λ (or Γ ) and R of a canonical MPS directly
deﬁne the SVD, and Λ or Γ is indeed the singular value spectrum. Then the optimal
truncations of the virtual bonds are reached by simply keeping χ-largest values of
Λ and the corresponding basis of the neighboring tensors. This is true when cutting
any one of the bonds of the MPS. From the uniqueness of SVD, Eqs. (5.7) and (5.8)


---
*Page 114*

5.1
A Simple Example of Solving Tensor Network Contraction by Eigenvalue...
103
Fig. 5.3 Four canonical conditions of an MPS
leads to a unique MPS representation, thus such a form is called “canonical”. In
other words, the canonicalization ﬁxes the gauge degrees of freedom of the MPS.
For any ﬁnite MPS, the uniqueness is robust. For an inﬁnite MPS, there will be
some additional complexity. Let us deﬁne the left and right transfer matrices ML
and MR of as
ML
a1a′
1a2a′
2 =

s
Λa1As,a1a2Λ∗
a′
1A∗
s,a′
1a′
2,
(5.11)
MR
a1a′
1a2a′
2 =

s
As,a1a2Γa1A∗
s,a′
1a′
2Γ ∗
a′
1.
(5.12)
Then the canonical conditions (Eq. (5.7)) say that the identity is the left (right)
eigenvector of ML (MR), satisfying

a1a′
1
Ia1a′
1ML
a1a′
1a2a′
2 = λLIa2a′
2,
(5.13)

a1a′
1
Ia2a′
2MR
a1a′
1a2a′
2 = λRIa1a′
1,
(5.14)
with λL (λR) the eigenvalue.
Similar eigenvalue equations can be obtained from the canonical conditions
associated to the tensor B, where we have the transfer matrices as
NL
a1a′
1a2a′
2 =

s
Γa1Bs,a1a2Γ ∗
a′
1B∗
s,a′
1a′
2,
(5.15)
NR
a1a′
1a2a′
2 =

s
Bs,a1a2Λa1B∗
s,a′
1a′
2Λ∗
a′
1.
(5.16)


---
*Page 115*

104
5
Tensor Network Contraction and Multi-Linear Algebra
Now the canonical conditions are given by four eigenvalue equations and can be
reinterpreted as the following: with an inﬁnite MPS formed by A, B, Λ and Γ , it is
canonical when the identity is the eigenvector of its transfer matrices.
Simply from the canonical conditions, it does not require the “identity” to be
dominant eigenvector. However, if the identity is not the dominant one, the canonical
conditions will become unstable under an arbitrarily small noise. Below, we will
show that the canonicalization algorithm assures that the identity is the leading
eigenvector, since it transforms the leading eigenvector to an identity. In addition,
if the dominant eigenvector of ML and MR (also NL and NR) is degenerate, the
canonical form will not be unique. See Ref. [2] for more details.
5.1.3
Canonicalization Algorithm and Some Related Topics
Considering the iTEBD algorithm [3] (see Sect. 3.4), while the MPO represents a
unitary operator, the canonical form of the MPS will be reserved by the evolution
(contraction). For the imaginary-time evolution, the MPO is near-unitary. For the
Trotter step τ →0, the MPO approaches to be an identity. It turns out that in
this case, the MPS will be canonicalized by the evolution in the standard iTEBD
algorithm. When the MPO is non-unitary (e.g., when contracting the TN of a 2D
statistic model) [2], the MPS will not be canonical, and the canonicalization might
be needed to better truncate the bond dimensions of the MPS.
Canonicalization Algorithm An algorithm to canonicalize an arbitrary MPS was
proposed by Orús and Vidal [2]. The idea is to compute the ﬁrst eigenvectors of the
transfer matrices, and introduce proper gauge transformations on the virtual bonds
that map the leading eigenvector to identity.
Let us take the gauge transformations on the virtual bonds between A and B as
an example. Firstly, compute the dominant left eigenvector vL of the matrix NLML,
and similarly the dominant right eigenvector vR of the matrix NRMR. Then, reshape
vL and vR as two matrices and decompose them symmetrically as
vR
a1a′
1 =

a′′
1
Xa1a′′
1 X∗
a′
1a′′
1 ,
(5.17)
vL
a1a′
1 =

a′′
1
Ya1a′′
1 Y ∗
a′
1a′′
1 .
(5.18)
X and Y can be calculated using eigenvalue decomposition, i.e., vR = WDW † with
X = W
√
D.
Insert the identities X−1X and YY −1 on the virtual bond as shown in Fig. 5.4,
then we get a new matrix M = XΓ Y on this bond. Apply SVD on M as M =
U ˜Γ V †, where we have the updated spectrum ˜Γ on this bond. Meanwhile, we obtain


---
*Page 116*

5.1
A Simple Example of Solving Tensor Network Contraction by Eigenvalue...
105
Fig. 5.4 The illustration of the canonical transformations
the gauge transformations to update A and B as U = X−1U and V = V †Y −1,
where the transformations are implemented as
As1,a1a2 ←

a
As1,a1aUaa2,
(5.19)
Bs1,a1a2 ←

a
Bs1,aa2Va1a.
(5.20)
Implement the same steps given above on the virtual bonds between B and A, then
the MPS is transformed to the canonical form.
Variants of the Canonical Form From the canonical form of an MPS, one can deﬁne
the left or right-canonical forms. Deﬁne the follow tensors
AL
s,aa′ = ΛaAs,aa′,
(5.21)
AR
s,aa′ = As,aa′Γa′,
(5.22)
BL
s,aa′ = ΓaBs,aa′,
(5.23)
BR
s,aa′ = Bs,aa′Λa′,
(5.24)
AM
s,aa′ = ΛaAs,aa′Γa′.
(5.25)
The left-canonical MPS is deﬁned by AL and BL as
tTr(· · · ALBLALBL · · · ).
(5.26)
Similarly, the right-canonical MPS is deﬁned by AR and BR as
tTr(· · · ARBRARBR · · · ).
(5.27)
The central-orthogonal MPS is deﬁned as
tTr(· · · ALBLAMBRAR · · · ).
(5.28)


---
*Page 117*

106
5
Tensor Network Contraction and Multi-Linear Algebra
One can easily check that these MPSs and the canonical MPS can be transformed to
each other by gauge transformations.
From the canonical conditions, AL, AR, BL, and BR are non-square orthogonal
matrices (e.g., 
sa AL
s,aa′AL∗
s,aa′′ = Ia′a′′), called isometries. AM is called the central
tensor of the central-orthogonal MPS. This MPS form is the state ansatz behind the
DMRG algorithm [4, 5], and is very useful in TN-based methods (see, for example,
the works of McCulloch [6, 7]). For instance, when applying DMRG to solve 1D
quantum model, the tensors AL and BL deﬁne a left-to-right RG ﬂow that optimally
compresses the Hilbert space of the left part of the chain. AR and BR deﬁne a right-
to-left RG ﬂow similarly. The central tensor between these two RG ﬂows is in fact
the ground state of the effective Hamiltonian given by the RG ﬂows of DMRG.
Note that the canonical MPS is also called the central canonical form, where the
directions of the RG ﬂows can be switched arbitrarily by gauge transformations,
thus there is no need to deﬁne the directions of the ﬂows or a speciﬁc center.
Relations to Tensor Train Decomposition It is worth mentioning the TTD [8]
proposed in the ﬁeld of MLA. As argued in Chap. 2, one advantage of MPS is
it lowers the number of parameters from an exponential size dependence to a
polynomial one. Let us consider a similar problem: for a N-th order tensor that has
dN parameters, how to ﬁnd its optimal MPS representation, where there are only
[2dχ + (N −2)dχ2] parameters? TTD was proposed for this aim: by decomposing
a tensor into a tensor-train form that is similar to a ﬁnite open MPS, the number
of parameters becomes linearly relying to the order of the original tensor. The
TTD algorithm shares many similar ideas with MPS and the related algorithms
(especially DMRG which was proposed about two decades earlier). The aim of TTD
is also similar to the truncation tasks in the TN algorithms, which is to compress the
number of parameters.
5.2
Super-Orthogonalization and Tucker Decomposition
As discussed in the above section, the canonical form of an MPS brings a lot
of advantages, such as determining the entanglement and the optimal truncations
of the virtual bond dimensions by local transformations. The canonical form can
be readily generalized to the iPEPSs on trees. Can we also deﬁne the canonical
form for the iPEPSs in higher-dimensional regular lattices, such as square lattice
(Fig. 5.5)? If this can be done, we would know how to ﬁnd the globally optimal
transformations that reduces the bond dimensions of the iPEPS, just like what we
can do with an MPS. Due to the complexity of 2d TN’s, unfortunately, there is
no such a form in general. In the following, we explain the super-orthogonal form
of iPEPS proposed in 2012 [9], which applies the canonical form of tree iPEPS
to the iPEPS on regular lattices. The super-orthogonalization is a generalization
of the Tucker decomposition (a higher-order generalization of matrix SVD) [10],
providing a zero-loop approximation scheme [11] to deﬁne the entanglement and
truncate the bond dimensions.


---
*Page 118*

5.2
Super-Orthogonalization and Tucker Decomposition
107
Fig. 5.5 The ﬁrst two ﬁgures show the iPEPS on tree and square lattices, with two-site transla-
tional invariance. The last one shows the super-orthogonal conditions
5.2.1
Super-Orthogonalization
Let us start from the iPEPS on the (inﬁnite) Bethe lattice with the coordination
number z = 4. It is formed by two tensors P and Q on the sites as well as four
spectra Λ(k) (k = 1, 2, 3, 4) on the bonds, as illustrated in Fig. 5.5. Here, we still
take the two-site translational invariance for simplicity.
There are eight super-orthogonal conditions, of which four associate to the tensor
P and four to Q. For P, the conditions are

s

···ak−1ak+1···
Ps,···ak···P ∗
s,···a′
k···

n̸=k
Λ(n)
an Λ(n)∗
an
= Iaka′
k, (∀k),
(5.29)
where all the bonds along with the corresponding spectra are contracted except
for ak. It means that by putting ak as one index and all the rest as another, the
k-rectangular matrix S(k) deﬁned as
S(k)
s···ak−1ak+1··· ,ak = Ps,···ak···

n̸=k
Λ(n)
an ,
(5.30)
is an isometry, satisfying S(k)†S(k) = I. The super-orthogonal conditions of the
tensor Q are deﬁned in the same way. Λ(k) is dubbed super-orthogonal spectrum
when the super-orthogonal conditions are fulﬁlled.
In the canonicalization of MPS, the vectors on the virtual bonds give the
bipartite entanglement deﬁned by Eq. (5.5). Meanwhile, the bond dimensions can
be optimally reduced by discarding certain smallest elements of the spectrum.
In the super-orthogonalization, this is not always true for iPEPSs. For example,
given a translational invariant iPEPS deﬁned on a tree (or called Bethe lattice,
see Fig. 5.5a) [12–19], the super-orthogonal spectrum indeed gives the bipartite
entanglement spectrum by cutting the system at the corresponding place. However,
when considering loopy lattices, such as the iPEPS deﬁned on a square lattice
(Fig. 5.5b), this will no longer be true. Instead, the super-orthogonal spectrum


---
*Page 119*

108
5
Tensor Network Contraction and Multi-Linear Algebra
provides an approximation of the entanglement of the iPEPS by optimally ignoring
the loops. One can still truncate the bond dimensions according to the super-
orthogonal spectrum, giving in fact the simple update (see Sect. 4.3). We will discuss
the loopless approximation in detail in Sect. 5.3 using the rank-1 decomposition.
5.2.2
Super-Orthogonalization Algorithm
Any PEPS can be transformed to the super-orthogonal form by iteratively imple-
menting proper gauge transformations on the virtual bonds [9]. The algorithm
consists of two steps. Firstly, compute the reduced matrix M (k) of the k-rectangular
matrix of the tensor P (Eq. (5.30)) as
M (k)
aka′
k =

s

···ak−1ak+1···
S(k)
s···ak−1ak+1··· ,akS(k)∗
s···ak−1ak+1··· ,a′
k.
(5.31)
Compared with the super-orthogonal conditions in Eq. (5.29), one can see that
M (k) = I when the PEPS is super-orthogonal. Similarly, we deﬁne the reduced
matrix N (k) of the tensor Q.
When the PEPS is not super-orthogonal, M (k) and N (k) are not identities but
Hermitian matrices. Decompose them as M (k) = X(k)X(k)† and N (k) = Y (k)Y (k)†.
Then, insert the identities X(k)[X(k)]−1 and Y (k)[Y (k)]−1 on the virtual bonds to
perform gauge transformations along four directions as shown in Fig. 5.6. Then,
we can use SVD to renew the four spectra by X(k)Λ(k)Y (k)T = U(k) ˜Λ(k)V (k)†.
Meanwhile, we transform the tensors as
Ps,···ak··· ←

a′
ka′′
k
Ps,···a′
k···[X(k)]−1
a′
ka′′
k U(k)
a′′
k ak,
(5.32)
Qs,···ak··· ←

a′
ka′′
k
Qs,···a′
k···[Y (k)]−1
a′
ka′′
k V (k)∗
a′′
k ak.
(5.33)
Fig. 5.6 The illustrations of gauge transformations in the super-orthogonalization algorithm


---
*Page 120*

5.2
Super-Orthogonalization and Tucker Decomposition
109
Compared with the canonicalization algorithm of MPS, one can see that the
gauge transformations in the super-orthogonalization algorithm are quite similar.
The difference is that one cannot transform a PEPS into the super-orthogonal form
by a single step, since the transformation on one bond might cause some deviation
from obeying the super-orthogonal conditions on other bonds. Thus, the above
procedure should be iterated until all the tensors and spectra converge.
5.2.3
Super-Orthogonalization and Dimension Reduction by
Tucker Decomposition
Such an iterative scheme is closely related to the Tucker decomposition in MLA
[10]. Tucker decomposition is considered as a generalization of (matrix) SVD to
higher-order tensors, thus it is also called higher-order or multi-linear SVD. The
aim is to ﬁnd the optimal reductions of the bond dimensions for a single tensor.
Let us deﬁne the k-reduced matrix of a tensor T as
M(k)
aka′
k =

a1···ak−1ak+1···
Ta1···ak−1akak+1···T ∗
a1···ak−1a′
kak+1···,
(5.34)
where all except the k-th indexes are contracted. The Tucker decomposition
(Fig. 5.7) of a tensor T has the form as
Ta1a2··· =

a1a2···
Sb1b2···

k
U(k)
akbk,
(5.35)
where the following conditions should be satisﬁed:
•
Unitarity. U(k) are unitary matrices satisfying U(k)U(k)† = I.
•
All-orthogonality. For any k, the k-reduced matrix M(k) of the tensor S is
diagonal, satisfying
M(k)
aka′
k = Γ (k)
ak Iaka′
k.
(5.36)
•
Ordering. For any k, the elements of Γ (k) in the k-reduced matrix are positive-
deﬁned and in the descending order, satisfying Γ0 > Γ1 > · · · .
Fig. 5.7 The illustrations of
Tucker decomposition
(Eq. (5.35))


---
*Page 121*

110
5
Tensor Network Contraction and Multi-Linear Algebra
From these conditions, one can see that the tensor T is decomposed as the
contraction of another tensor S with several unitary matrices. S is called the core
tensor. In other words, the optimal lower-rank approximation of the tensor can be
simply obtained by
Ta1a2··· ≃
χ−1

a1a2···=0
Sb1b2···

k
U(k)
akbk,
(5.37)
where we only take the ﬁrst χ terms in the summation of each index.
Such an approximations can be understood in terms of the SVD of matrices.
Applying the conditions of the k-reduced matrix of T , we have
M(k)
aka′
k =

bk
U(k)
akbkΓ (k)
bk U(k)†
a′
kbk.
(5.38)
Since U(k) is unitary and Γ (k) is positive-deﬁned and in the descending order,
the above equation is exactly the eigenvalue decomposition of M(k). From the
relation between the SVD of a matrix and the eigenvalue decomposition of its
reduced matrix, we can see that U(k) and Γ (k) in fact give the SVD of the matrix
Ta1···ak−1ak+1··· ,ak as
Ta1···ak−1ak+1··· ,ak =

bk
Sa1···ak−1ak+1··· ,bk

Γ (k)
bk U(k)
akbk.
(5.39)
Then, The optimal truncation of the rank of each index is reached by the correspond-
ing SVD. The truncation error is obviously the distance deﬁned as
ε(k) =

Ta1···ak−1ak+1··· ,ak −
χ

bk=1
Sa1···ak−1ak+1···Γ (k)
bk U(k)
akbk

,
(5.40)
which is minimized in this SVD.
For the algorithms of Tucker decomposition, one simple way is to do the
eigenvalue decomposition of each k-reduced matrix, or the SVD of each k-
rectangular. Then for a K-th ordered tensor, K SVDs will give us the Tucker
decomposition and a lower-rank approximation. This algorithm is often called
higher-order SVD (HOSVD), which has been successfully applied to implement
truncations in the TRG algorithm [20]. The accuracy of HOSVD can be improved.
Since the truncation on one index will deﬁnitely affect the truncations on other
indexes, there will be some “interactions” among different indexes (modes) of
the tensor. The truncations in HOSVD are calculated independently, thus such
“interactions” are ignored. One improved way is the high-order orthogonal iteration


---
*Page 122*

5.2
Super-Orthogonalization and Tucker Decomposition
111
(HOOI), where the interactions among different modes are considered by iteratively
doing SVDs until reaching the convergence. See more details in Ref. [10].
Compared with the conditions of Tucker decomposition, let us redeﬁne the super-
orthogonal conditions of a PEPS as
•
Super-orthogonality. For any k, the reduced matrix of the k-rectangular matrix
M (k) (Eq. (5.31)) is diagonal, satisfying
M (k)
aka′
k = Γ (k)
ak Iaka′
k.
(5.41)
•
Ordering. For any k, the elements of Γ (k) are positive-deﬁned and in the
descending order, satisfying Γ0 > Γ1 > · · · .
Note that the condition “unitary” (ﬁrst one in Tucker decomposition) is hidden in
the fact that we use gauge transformations to transform the PEPS into the super-
orthogonal form. Therefore, the super-orthogonalization is also called network
Tucker decomposition (NTD).
In the Tucker decomposition, the “all-orthogonality” and “ordering” lead to an
SVD associated to a single tensor, which explains how the optimal truncations
work from the decompositions in linear algebra. In the NTD, the SVD picture is
generalized from a single tensor to a non-local PEPS. Thus, the truncations are
optimized in a non-local way.
Let us consider a ﬁnite-size PEPS and arbitrarily choose one geometrical bond
(say a). If the PEPS is on a tree, we can cut the bond and separate the TN into three
disconnecting parts: the spectrum (Λ) on this bond and two tree brunches stretching
to the two sides of the bond. Speciﬁcally speaking, each brunch contains one virtual
bond and all the physical bonds on the corresponding side, formally denoted as
Ψ L
i1i2··· ,a (and Ψ R
j1j2··· ,a on the other side). Then the state given by the iPEPS can be
written as

a
Ψ L
i1i2··· ,aΛaΨ R
j1j2··· ,a.
(5.42)
To get the SVD picture, we need to prove that Ψ L and Ψ R in the above equation
are isometries, satisfying the orthogonal conditions as

i1i2···
Ψ L
i1i2··· ,aΨ L
i1i2··· ,a′ = Iaa′,

j1j2···
Ψ R
j1j2··· ,aΨ R
j1j2··· ,a′ = Iaa′.
(5.43)
Note that the spectrum Λ is already positive-deﬁned according to the algorithm. To
this end, we construct the TN of 
i1i2··· Ψ L(R)
i1i2··· ,aΨ L(R)
i1i2··· ,a′ from its boundary. If the
PEPS is super-orthogonal, the spectra must be on the boundary of the TN because


---
*Page 123*

112
5
Tensor Network Contraction and Multi-Linear Algebra
the super-orthogonal conditions are satisﬁed everywhere.1 Then the contractions
of the tensors on the boundary satisfy Eq. (5.29), which gives identities. Then we
have on the new boundary again the spectra to iterate the contractions. All tensors
can be contracted by iteratively using the super-orthogonal conditions, which in
the end gives identities as Eq. (5.43). Thus, Ψ L and Ψ R are indeed isometries and
Eq. (5.42) indeed gives the SVD of the whole wave-function. The truncations of
the bond dimensions are globally optimized by taking the whole tree PEPS as the
environment.
For an iPEPS, it can be similarly proven that Ψ L and Ψ R are isometries. One
way is to put any non-zero spectra on the boundary and iterate the contraction by
Eq. (5.31). While the spectra on the boundary can be arbitrary, the results of the
contractions by Eq. (5.31) converge to identities quickly [9]. Then the rest of the
contractions are exactly given by the super-orthogonal conditions (Eq. (5.29)). In
other words, the identity is a stable ﬁxed point of the above iterations. Once the
ﬁxed point is reached, it can be considered that the contraction is from inﬁnitely far
away, meaning from the “boundary” of the iPEPS. In this way, one proves Ψ L and
Ψ R are isometries, i.e., Ψ L†Ψ L = I and Ψ R†Ψ R = I.
5.3
Zero-Loop Approximation on Regular Lattices
and Rank-1 Decomposition
5.3.1
Super-Orthogonalization Works Well for Truncating the
PEPS on Regular Lattice: Some Intuitive Discussions
From the discussions above, we can see that the “canonical” form of a TN state is
strongly desired, because it is expected to give the entanglement and the optimal
truncations of the bond dimensions. Recall that to contract a TN that cannot be
contracted exactly, truncations are inevitable, and locating the optimal truncations
is one of the main tasks in the computations. The super-orthogonal form provides
a robust way to optimally truncate the bond dimensions of the PEPS deﬁned on a
tree, analog to the canonicalization of MPS.
Interestingly, the super-orthogonal form does not require the tree structure. For an
iPEPS deﬁned on a regular lattice, for example, the square lattice, one can still super-
orthogonalize it using the same algorithm. What is different is that the SVD picture
of the wave-function (generally, see Eq. (5.5)) will not rigorously hold, as well as the
robustness of the optimal truncations. In other words, the super-orthogonal spectrum
does not exactly give the entanglement. A question rises: can we still truncate iPEPS
deﬁned on a square lattice according to the super-orthogonal spectrum?
1With the open boundary condition, one may consider the geometrical bond dimensions as one,
and deﬁne the spectra by the one-dimensional vector [21].


---
*Page 124*

5.3
Zero-Loop Approximation on Regular Lattices and Rank-1 Decomposition
113
Surprisingly, numeric simulations show that the accuracy by truncating according
to the super-orthogonal spectrum is still good in many cases. Let us take the ground-
state simulation of a 2D system by imaginary-time evolution as an example. As
discussed in Sect. 4.2, the simulation becomes the contraction of a 3D TN. One
usual way to compute this contraction is to contract layer by layer to an iPEPS
(see, e.g., [22, 23]). The contraction will enlarge the virtual bond dimensions, and
truncations are needed. When the ground state is gapped (see, e.g., [9, 23]), the
truncations produce accurate results, which means the super-orthogonal spectrum
approximates the true entanglement quite well.
It has been realized that using the simple update algorithm [23], the iPEPS
will converge to the super-orthogonal form for a vanishing Trotter step τ →0.
The success of the simple update suggests that the optimal truncation method
on trees still works well for regular lattices. Intuitively, this can be understood
in the following way. Comparing a regular lattice with a tree, if it has the same
coordination number, the two lattices look exactly the same if we only inspect
locally on one site and its nearest neighbors. The difference appears when one
goes round the closed loops on the regular lattice, since there is no loop in the
tree. Thus, the error applying the optimal truncation schemes (such as super-
orthogonalization) of a tree to a regular lattice should be characterized by some
non-local features associated to the loops. This explains in a descriptive way why
the simple update works well for gapped states, where the physics is dominated
by short-range correlations. For the systems that possess small gaps or are gapless,
simple update is not sufﬁciently accurate [24], particularly for the non-local physical
properties such as the correlation functions.
5.3.2
Rank-1 Decomposition and Algorithm
Rank-1 decomposition in MLA [25] provides a more mathematic and rigorous
way to understand the approximation by super-orthogonalization (simple update)
to truncate PEPS on regular lattices [11]. For a tensor T , its rank-1 decomposition
(Fig. 5.8) is deﬁned as
Ta1a2···aK ≃Ω
K

k=1
v(k)
ak ,
(5.44)
Fig. 5.8 The illustrations of
rank-1 decomposition
(Eq. (5.44))


---
*Page 125*

114
5
Tensor Network Contraction and Multi-Linear Algebra
Fig. 5.9 The illustrations of self-consistent conditions for the rank-1 decomposition (Eq. (5.47))
where v(k) are normalized vectors and Ω is a constant that satisﬁes
Ω =

a1a2···aK
Ta1a2···aK
K

k=1
v(k)∗
ak .
(5.45)
Rank-1 decomposition provides an approximation of T , where the distance between
T and its rank-1 approximation is minimized, i.e.,
min
v(k)
ak
=1
Ta1a2···aK −Ω
K

k=1
v(k)
ak
 .
(5.46)
The rank-1 decomposition is given by the ﬁxed point of a set of self-consistent
equations (Fig. 5.9), which are

all except ak
Ta1a2···aK

j̸=k
v(j)
aj = Ωv(k)
ak
(∀k).
(5.47)
It means that v(k) is obtained by contracting all other vectors with the tensor. This
property provides us an algorithm to compute rank-1 decomposition: one arbitrarily
initializes the vectors {v(k)} of norm-1 and recursively updates each vector by the
tensor and the rest vectors using Eq. (5.47) until all vectors converge.
Apart from some very special cases, such an optimization problem is concave,
thus rank-1 decomposition is unique.2 Furthermore, if one arbitrarily chooses a set
of norm-1 vectors, they will converge to the ﬁxed point exponentially fast with the
iterations. To the best of our knowledge, the exponential convergence has not been
proved rigorously, but observed in most cases.
2In fact, the uniqueness of rank-1 decomposition has not been rigorously proven.


---
*Page 126*

5.3
Zero-Loop Approximation on Regular Lattices and Rank-1 Decomposition
115
5.3.3
Rank-1 Decomposition, Super-Orthogonalization, and
Zero-Loop Approximation
Let us still consider an translational invariant square TN that is formed by inﬁnite
copies of the 4th-order tensor T (Fig. 2.28). The rank-1 decomposition of T provides
an approximative scheme to compute the contraction of the TN, which is called the
theory of network contractor dynamics (NCD) [11].
The picture of NCD can be understood in an opposite way to contraction, but by
iteratively using the self-consistent conditions (Eq. (5.47)) to “grow” a tree TN that
covers the whole square lattice (Fig. 5.10). Let us start from Eq. (5.45) of Ω. Using
Eq. (5.47), we substitute each of the four vectors by the contraction of T with the
other three vectors. After doing so, Eq. (5.45) becomes the contraction of more than
one T s with the vectors on the boundary. In other words, we “grow” the local TN
contraction from one tensor plus four vectors to that with more tensors and vectors.
By repeating the substitution, the TN can be grown to cover the whole square
lattice, where each site is allowed to put maximally one T . Inevitably, some sites
will not have T , but four vectors instead. These vectors (also called contractors)
give the rank-1 decomposition of T as Eq. (5.44). This is to say that some tensors
in the square TN are replaced by its rank-1 approximation, so that all loops are
destructed and the TN becomes a loopless tree covering the square lattice. In this
way, the square TN is approximated by such a tree TN on square lattice, so that its
contraction is simply computed by Eq. (5.45).
The growing process as well as the optimal tree TN is only to understand the
zero-loop approximation with rank-1 decomposition. There is no need to practically
Fig. 5.10 Using the self-consistent conditions of the rank-1 decomposition, a tree TN with no
loops can grow to cover the inﬁnite square lattice. The four vectors gathering in a same site give
the rank-1 approximation of the original tensor


---
*Page 127*

116
5
Tensor Network Contraction and Multi-Linear Algebra
implement such a process. Thus, it does not matter how the TN is grown or where
the rank-1 tensors are put to destroy the loops. All information we need is given by
the rank-1 decomposition. In other words, the zero-loop approximation of the TN is
encoded in the rank-1 decomposition.
For growing the TN, we shall remark that using the contraction of one T with
several vectors to substitute one vector is certainly not unique. However, the aim
of “growing” is to reconstruct the TN formed by T . Thus, if T has to appear in
the substitution, the vectors should be uniquely chosen as those given in the rank-1
decomposition due to the uniqueness of rank-1 decomposition. Secondly, there are
hidden conditions when covering the lattice by “growing”. A stronger version is
Ta1a2a3a4 = T ∗
a3a2a1a4 = T ∗
a1a4a3a2 = Ta3a4a1a2.
(5.48)
And a weaker one only requires the vectors to be conjugate to each other as
v(1) = v(3)†, v(2) = v(4)†.
(5.49)
These conditions assure that the self-consistent equations encode the correct tree
that optimally in the rank-1 sense approximates the square TN.
Comparing with Eqs. (5.29) and (5.47), the super-orthogonal conditions are
actually equivalent to the above self-consistent equations of rank-1 decomposition
by deﬁning the tensor T and vector v as
Ta1a2···aK =

s
Ps,a′
1a′
2···a′
KP ∗
s,a′′
1a′′
2···a′′
K
K

k=1

Λ(k)
a′
k Λ(k)∗
a′′
k ,
(5.50)
v(k)
ak =

Λ(k)
a′
k Λ(k)∗
a′′
k ,
(5.51)
with ak = (a′
k, a′′
k ). Thus, the super-orthogonal spectrum provides an optimal
approximation for the truncations of the bond dimensions in the zero-loop level.
This provides a direct connection between the simple update scheme and rank-1
decomposition.
5.3.4
Error of Zero-Loop Approximation and Tree-Expansion
Theory Based on Rank-Decomposition
The error of NCD (and simple update) is an important issue. From the ﬁrst glance,
the error seems to be the error of rank-1 decomposition ε = |T −
k v(k)|. This
would be true if we replaced all tensors in the square TN by the rank-1 version.
In this case, the PEPS is approximated by a product state with zero entanglement.
In the NCD scheme, however, we only replace a part of the tensors to destruct the


---
*Page 128*

5.3
Zero-Loop Approximation on Regular Lattices and Rank-1 Decomposition
117
Fig. 5.11 The illustrations of
rank-1 decomposition
(Eq. (5.52))
loops. The corresponding approximative PEPS is an entanglement state with a tree
structure. Therefore, the error of rank-1 decomposition cannot properly characterize
the error of simple update.
To control the error, let us introduce the rank decomposition (also called
CANDECOMP/PARAFAC decomposition) of T in MLA (Fig. 5.11) that reads
Ta1a2··· =
R−1

r=0
Ωr

k
v(k,r)
ak
,
(5.52)
where v(k,r) are normalized vectors. The idea of rank decomposition [26, 27] is
to expand T into the summation of R number of rank-1 tensors with R called the
tensor rank. The elements of the vector Ω can always be in the descending order
according to the absolute values. Then the leading term Ω0

k v(k,0) gives exactly
the rank-1 decomposition of T , and the error of the rank-1 decomposition becomes
| R−1
r=1 Ωr

k v(k,r)
ak
|.
In the optimal tree TN, let us replace the rank-1 tensors back by the full rank
tensor in Eq. (5.52). We suppose the rank decomposition is exact, thus we will
recover the original TN by doing so. The TN contraction becomes the summation
of R ˜N terms with ˜N the number of rank-1 tensors in the zero-loop TN. Each term
is the contraction of a tree TN, which is the same as the optimal tree TN except that
certain vectors are changed to v(k,r) instead of the rank-1 term v(k,0). Note that in
all terms, we use the same tree structure; the leading term in the summation is the
zero-loop TN in the NCD scheme. It means with rank decomposition, we expand
the contraction of the square TN by the summation of the contractions of many tree
TN’s.
Let us order the summation referring to the contributions of different terms.
For simplicity, we assume R = 2, meaning T can be exactly decomposed as the
summation of two rank-1 tensors, which are the leading term given by the rank-1
decomposition, and the next-leading term denoted as T1 = Ω1

k v(k,1). We dub
as the next-leading term as the impurity tensor. Deﬁning ˜n as the number of the
impurity tensors appearing in one of the tree TN in the summation, the expansion
can be written as
Z = Ω ˜N
0
˜N

˜n=0
Ω1
Ω0
˜n

C ∈C (˜n)
ZC .
(5.53)


---
*Page 129*

118
5
Tensor Network Contraction and Multi-Linear Algebra
Fig. 5.12 The illustrations of the expansion with rank decomposition. The yellow and red circles
stand for v(k,0)
ak
(zeroth order terms in the rank decomposition) and v(k,1)
ak
(ﬁrst order terms),
respectively. Here, we consider the tensor rank R = 2 for simplicity
We use C (˜n) to denote the set of all possible conﬁgurations of ˜n number of the
impurity tensors, where there are ˜n of T1s located in different positions in the tree.
Then ZC denotes the contraction of such a tree TN with a speciﬁc conﬁguration
of T1’s. In general, the contribution is determined by the order of |Ω1/Ω0| since
|Ω1/Ω0| < 1 (Fig. 5.12).
To proceed, we choose one tensor in the tree as the original point, and always
contract the tree TN by ending at this tensor. Then the distance D of a vector is
deﬁned as the number of tensors in the path that connects this vector to the original
point. Note that one impurity tensor is the tensor product of several vectors, and
each vector may have different distance to the original point. For simplicity, we take
the shortest one to deﬁne the distance of an impurity tensor.
Now, let us utilize the exponential convergence of the rank-1 decomposition.
After contracting any vectors with the tensor in the tree, the resulting vector
approaches to the ﬁxed point (the vectors in the rank-1 decomposition) in an
exponential speed. Deﬁne D0 as the average number of the contractions that will
project any vectors to the ﬁxed point with a tolerable difference. Consider any
impurity tensors with the distance D > D0, their contributions to the contraction
are approximately the same, since after D0 contractions, the vectors have already
been projected to the ﬁxed point.
From the above argument, we can see that the error is related not only to the error
of the rank-1 decomposition, but also to the speed of the convergence to the rank-
1 component. The smaller D0 is, the smaller the error (the total contribution from


---
*Page 130*

5.4
iDMRG, iTEBD, and CTMRG Revisited by Tensor Ring Decomposition
119
the non-dominant terms) will be. Calculations show that the convergence speed is
related to the correlation length (or gap) of the physical system, but their rigorous
relations have not been established yet. Meanwhile, the expansion theory of the TN
contraction given above requires the rank decomposition, which, however, is not
uniquely deﬁned of an arbitrarily given tensor.
5.4
iDMRG, iTEBD, and CTMRG Revisited by Tensor Ring
Decomposition
We have shown that the rank-1 decomposition solves the contraction of inﬁnite-size
tree TN and provides a mathematic explanation of the approximation made in the
simple update. Then, it is natural to think: can we generalize this scheme beyond
being only rank-1, in order to have better update schemes? In the following, we will
show that besides the rank decomposition, the tensor ring decomposition (TRD)
[28] was suggested as another rank-N generalization for solving TN contraction
problems.
TRD is deﬁned by a set of self-consistent eigenvalue equations (SEEs) with
certain constraints. The original proposal of TRD requires all eigenvalue equations
to be Hermitian [28]. Later, a generalize version was proposed [29] that provides
an uniﬁed description of the iDMRG [4, 5, 7], iTEBD [3], and CTMRG [30]
algorithms. We will concentrate on this version in the following.
5.4.1
Revisiting iDMRG, iTEBD, and CTMRG: A Uniﬁed
Description with Tensor Ring Decomposition
Let us start from the iDMRG algorithm. The TN contraction can be solved using
the iDMRG [4, 5, 7] by considering an inﬁnite-size row of tensors in the TN as
an MPO [31–35] (also see some related discussions in Sect. 3.4). We introduce
three third-order variational tensors denoted by vL, vR (dubbed as the boundary or
environmental tensors) and Ψ (dubbed as the central tensor). These tensors are the
ﬁxed-point solution of the a set of eigenvalue equations. vL and vR are, respectively,
the left and right dominant eigenvector of the following matrices (Fig. 5.13a, b)
ML
c′b′
1b1,cb′
2b2 =

aa′
Ta′c′acA∗
a′b′
1b′
2Aab1b2,
(5.54)
MR
c′b′
1b1,cb′
2b2 =

aa′
Ta′c′acB∗
a′b′
1b′
2Bab1b2,
(5.55)


---
*Page 131*

120
5
Tensor Network Contraction and Multi-Linear Algebra
Fig. 5.13 The (a, b) and (c) show the three local eigenvalue equations given by Eqs. (5.55) and
(5.57). The isometries A and B are obtained by the QR decompositions of Ψ in two different ways
in Eq. (5.56), as shown in (d)
where A and B are the left and right orthogonal parts obtained by the QR
decomposition (or SVD) of Ψ (Fig. 5.13d) as
Ψabb′ =

b′′
Aabb′′ ˜Ψb′′b′ =

b′′
˜Ψ †
bb′′Bab′′b′.
(5.56)
Ψ is the dominant eigenvector of the Hermitian matrix (Fig. 5.13c) that satisﬁes
Ha′b′
1b′
2,ab1b2 =

cc′
Ta′c′acvL
c′b′
1b1vR
cb′
2b2.
(5.57)
One can see that each of the eigenvalue problems is parametrized by the solutions
of others, thus we solve them in a recursive way. First, we initialize arbitrarily the
central tensors Ψ and get A and B by Eq. (5.56). Note that a good initial guess
can make the simulations faster and more stable. Then we update vL and vR by
multiplying with ML and MR as Eqs. (5.54) and (5.55). Then we have the new Ψ
by solving the dominant eigenvector of H in Eq. (5.57) that is deﬁned by the new
vL and vR. We iterate such a process until all variational tensors converge.
Let us rephrase the iDMRG algorithm given above in the language of TN
contraction/reconstruction. When the variational tensors give the ﬁxed point, the
eigenvalue equations “encodes” the inﬁnite TN, i.e., the TN can be reconstructed
from the equations. To do so, we start from a local representation of Z (Fig. 5.14)
written as
Z ⇋

Ta′c′acΨ ∗
a′b1b2Ψab3b4vL
c′b1b3vR
cb2b4,
(5.58)
where the summation goes through all indexes. According to the fact that Ψ is the
leading eigenvector of Eq. (5.57), Z is maximized with ﬁxed vL and vR. We here and
below use the symbol “⇋” to represent the contraction relation up to a difference of
a constant factor.


---
*Page 132*

5.4
iDMRG, iTEBD, and CTMRG Revisited by Tensor Ring Decomposition
121
Fig. 5.14 The eigenvalue
equations as illustrated
“encode” the inﬁnite TN
Then, we use the eigenvalue equations of vL and vR to add one ML and one MR
(Eqs. (5.54) and (5.55)) in the contraction, i.e., we substitute vL by vLML and vR
by MRvR. After doing so for one time, a ﬁnite central-orthogonal MPS appears,
formed by A, B and Ψ . Such substitutions can be repeated for inﬁnite times, and
then we will have an inﬁnite central-orthogonal MPS formed by Ψ , A and B as
Φ···an··· =

{b}
· · · Aan−2bn−2bn−1Aan−1bn−1bnΨanbnbn+1Ban+1bn+1bn+2Ban+2bn+2bn+3 · · · .
(5.59)
One can see that the bond dimension of bn is in fact the dimension cut-off of the
MPS.
Now, we have
Z ⇋Φ†ρΦ,
(5.60)


---
*Page 133*

122
5
Tensor Network Contraction and Multi-Linear Algebra
Fig. 5.15 The illustrations of
the TRD in Eq. (5.62)
where ρ is an inﬁnite-dimensional matrix that has the form of an MPO (middle of
Fig. 5.14) as
ρ···a′n··· ,···an··· =

{c}
· · · Ta′ncnancn+1Ta′
n+1cn+1an+1cn+2 · · · .
(5.61)
ρ is in fact one raw of the TN. Compared with Eq. (5.58), the difference of Z is only
a constant factor that can be given by the dominant eigenvalues of ML and MR.
After the substitutions from Eqs. (5.58)–(5.60), Z is still maximized by the given
Φ, since vL and vR are the dominant eigenvectors. Note that such a maximization
is reached under the assumption that the dominant eigenvector Φ can be well
represented in an MPS with ﬁnite bond dimensions. Meanwhile, one can easily see
that the MPS is normalized |Φ···an···| = 1, thanks to the orthogonality of A and B.
Then we come to a conclusion that Φ is the optimal MPS that gives the dominant
eigenvector of ρ, satisfying Φ ⇋ρΦ.3 Then, we can rewrite the TN contraction as
Z ⇋limK→∞Φ†ρKΦ, where the inﬁnite TN appears as ρK (Fig. 5.14).
Now we deﬁne the tensor ring decomposition (TRD)4: with the following
conditions
•
Z (Eq. (5.58)) is maximized under the constraint that vL and vR are normalized,
•
Φ†ρΦ is maximized under the constraint that Φ is normalized,
the TRD (Fig. 5.15) of T is deﬁned by ˜T as
˜Ta′c′ac =

b1b2b3b4
Ψ ∗
a′b1b2Ψab3b4vL
c′b1b3vR
cb2b4,
(5.62)
so that the TN contraction Z =  Ta′c′ac ˜Ta′c′ac (Eq. (5.58)) is maximized. Like the
NTD and rank-1 decomposition, TRD belongs to the decompositions that encode
inﬁnite TN’s, i.e., an inﬁnite TN can be reconstructed from the self-consistent
equations (note the rank decomposition does not encode any TN’s). Comparing with
3For a Hermitian matrix M, v is its dominant eigenvector if |v| = 1 and v†Mv is maximized.
4The deﬁnition of TRD given here is from Ref. [28], which is completely different from the tensor
ring decomposition proposed in Ref. [36]. While their TRD provides an approximation of a single
tensor, the TRD discussed in this paper is more like an encoding scheme of an inﬁnite-size TN.


---
*Page 134*

5.4
iDMRG, iTEBD, and CTMRG Revisited by Tensor Ring Decomposition
123
Eq. (5.47), TRD is reduced to the rank-1 decomposition by taking the dimensions
of {b} as one.
It was shown that for the same system, the ground state obtained by iDMRG
is equivalent to the ground state by iTEBD, up to a gauge transformation [7, 37].
Different from this connection, TRD further uniﬁes iDMRG and iTEBD. For
iTEBD, after combining the contraction and truncation given by Eqs. (3.34) and
(3.38), we have the equation for updating the tensor there as
As,cc′ ⇋

s′aba′b′
Tsbs′b′As′,aa′Xab,cYa′b′,c′.
(5.63)
Looking at Eqs. (5.55) and (5.55), Eq. (5.63) is just the eigenvalue equation for
updating v[L(R)] by v[L(R)] ⇋M[L(R)]v[L(R)]; the QR decomposition in Eq. (5.56)
guaranties that the “truncations in iTEBD” are implemented by isometries. In
other words, one can consider another MPS deﬁned in the vertical direction,
which is formed by v[L(R)] and updated by the iTEBD algorithm. It means that
while implementing iDMRG in the parallel direction of the TN, one is in fact
simultaneously implementing iTEBD to update another MPS along the vertical
direction.
Particularly, when one uses iDMRG to solve the ground state of a 1D system,
the MPS formed by v[L(R)] in the imaginary-time direction satisﬁes the continuous
structure [29, 38] that was originally proposed for continuous ﬁeld theories [39].
Such an iTEBD calculation can also be considered as the transverse contraction of
the TN [38, 40, 41].
CTMRG [30, 42] is also closely related to the scheme given above, which leads
to the CTMRG without the corners. The tensors Ψ , vL and vR correspond to the
row and column tensors, and the equations for updating these tensors are the same
to the equations of updating the row and column tensors in CTMRG (see Eqs. (3.27)
and (3.31)). Such a relation becomes more explicit in the rank-1 case, when corners
become simply scalars. The difference is that in the original CTMRG by Orús et al.
[30], the tensors are updated with a power method, i.e., Ψ ←H Ψ and v[L(R)] ←
M[L(R)]v[L(R)]. Recently, eigen-solvers instead of power method were suggested in
CTMRG ([42] and a related review [43]), where the eigenvalue equations of the row
and column tensors are the same to those given in TRD. The efﬁciency was shown
to be largely improved with this modiﬁcation.
5.4.2
Extracting the Information of Tensor Networks From
Eigenvalue Equations: Two Examples
In the following, we present how to extract the properties of the TN by taking
the free energy and correlation length as two example related to the eigenvalue
equations. Note that these quantities correspond to the properties of the physical
model and have been employed in many places (see, e.g., a review [44]). In the


---
*Page 135*

124
5
Tensor Network Contraction and Multi-Linear Algebra
following, we treated these two quantities as the properties of the TN itself. When
the TN is used to represent different physical models, these quantities will be
interpreted accordingly to different physical properties.
For an inﬁnite TN, the contraction usually gives a divergent or vanishing value.
The free energy per tensor of the TN is deﬁned to measure the contraction as
f = −lim
N→∞
ln Z
N ,
(5.64)
with Z the value of the contraction in theory and N denoting the number of tensors.
Such a deﬁnition is closely related to some physical quantities, such as the free
energy of classical models and the average ﬁdelity of TN states [45]. Meanwhile, f
can enable us to compare the values of the contractions of two TN’s without actually
computing Z .
The free energy is given by the dominant eigenvalues of ML and MR. Let us
reverse the above reconstructing process to show this. Firstly, we use the MPS in
Eq. (5.59) to contract the TN in one direction, and have Z = (limK→∞ηK)Φ†Φ =
limK→∞ηK with η the dominant eigenvalue of ρ. The problem becomes getting η.
By going from Φ†ρΦ to Eq. (5.58), we can see that the eigenvalue problem of Φ is
transformed to that of H in Eq. (5.57) multiplied by a constant lim ˜K→∞κ ˜K
0 with
κ0 the dominant eigenvalue of ML and MR and ˜K the number of tensors in ρ. Thus,
we have η = η0κ ˜K
0 with η0 the dominant eigenvalue of H . Finally, we have the TN
contraction Z = [η0κ ˜K
0 ]K = ηK
0 κN
0 with K ˜K = N. By substituting into Eq. (5.64),
we have f = −ln κ0 −lim ˜K→∞(ln η0)/K1 = −ln κ0.
The second issue is about the correlations of the TN. The correlation function of
a TN can be deﬁned as
F

˜T [r1], ˜T [r2]
= Z

˜T [r1], ˜T [r2]
/Z −Z

˜T [r1], T [r2]
Z

T [r1], ˜T [r2]
/Z 2,
(5.65)
where Z ( ˜T [r1], ˜T [r2]) denotes the contraction of the TN after substituting the
original tensors in the positions r1 and r2 by two different tensors ˜T [r1] and ˜T [r2].
T [r] denotes the original tensor at the position r.
Though the correlation functions depend on the tensors that are substituted with,
and can be deﬁned in many different ways, the long-range behavior share some
universal properties. For a sufﬁciently large distance (|r1 −r2| ≫1), if ˜T [r1] and
˜T [r2] are in a same column, F satisﬁes
F ∼e−|r1−r2|/ξ.
(5.66)
One has the correlation length
ξ = 1/(ln η0 −ln η1),
(5.67)


---
*Page 136*

5.4
iDMRG, iTEBD, and CTMRG Revisited by Tensor Ring Decomposition
125
with η0 and η1 the two dominant eigenvalues of H . If ˜T [r1] and ˜T [r2] are in a same
row, one has
ξ = 1/(ln κ0 −ln κ1),
(5.68)
with κ0 and κ1 the two dominant eigenvalues of ML(R).
To prove Eq. (5.67), we rewrite Z ( ˜T [r1], ˜T [r2])/Z as
Z

˜T [r1], ˜T [r2]
/Z = [Φ†ρ

˜T [r1], ˜T [r2]
Φ]/

Φ†ρΦ

.
(5.69)
Then, introduce the transfer matrix M of Φ†ρΦ, i.e., Φ†ρΦ = TrM ˜K with ˜K →
∞. With the eigenvalue decomposition of M = D−1
j=0 ηjvjv†
j with D the matrix
dimension and vj the j-th eigenvectors, one can further simply the equation as
Z

˜T [r1], ˜T [r2]
/Z =
D−1

j=0

ηj/η0
|r1−r2| v†
0M

˜T [r1]
vjv†
jM

˜T [r1]
v0,
(5.70)
with M ( ˜T [r]) the transfer matrix after substituting the original tensor at r with ˜T [r].
Similarly, one has
Z

˜T [r1], T

/Z = v†
0M

˜T [r1]
v0,
(5.71)
Z

T, ˜T [r2]
/Z = v†
0M

˜T [r2]
v0.
(5.72)
Note that one could transform the MPS into a translationally invariant form (e.g.,
the canonical form) to uniquely deﬁne the transfer matrix of Φ†ρΦ. Substituting
the equations above in Eq. (5.65), one has
F

˜T [r1], ˜T [r2]
=
D−1

j=1

ηj/η0
|r1−r2| v†
0M

˜T [r1]
vjv†
jM

˜T [r1]
v0. (5.73)
When the distance is sufﬁciently large, i.e., |r1 −r2| ≫1, only the dominant term
takes effects, which is
F

˜T [r1], ˜T [r2]
≃(η1/η0)|r1−r2| v†
0M

˜T [r1]
v1v†
1M

˜T [r1]
v0.
(5.74)
Compared with Eq. (5.66), one has ξ = 1/(ln η0 −ln η1). The second case can be
proven similarly.
These two quantities are deﬁned independently on speciﬁc physical models that
the TN might represent, thus they can be considered as the mathematical properties


---
*Page 137*

126
5
Tensor Network Contraction and Multi-Linear Algebra
of the TN. By introducing physical models, these quantities are closely related to
the physical properties. For example, when the TN represents the partition function
of a classical lattice model, Eq. (5.64) multiplied by the temperature is exactly the
free energy. And the correlation lengths of the TN are also the physical correlation
lengths of the model in two spatial directions. When the TN gives the imaginary-
time evolution of an inﬁnite 1D quantum chain, the correlation lengths of the TN
are the spatial and dynamical correlation length of the ground state.
It is a huge topic to investigate the properties of the TN’s or TN states. Paradigm
examples include injectivity and symmetries [46–61], statistics and fusion rules [62–
65]. These issues are beyond the scope of this lecture notes. One may refer to the
related works if interested.
References
1. T.G. Kolda, B.W. Bader, Tensor decompositions and applications. SIAM Rev. 51(3), 455–500
(2009)
2. R. Orús, G. Vidal, Inﬁnite time-evolving block decimation algorithm beyond unitary evolution.
Phys. Rev. B 78, 155117 (2008)
3. G. Vidal, Classical simulation of inﬁnite-size quantum lattice systems in one spatial dimension.
Phys. Rev. Lett. 98, 070201 (2007)
4. S.R. White, Density matrix formulation for quantum renormalization groups. Phys. Rev. Lett.
69, 2863 (1992)
5. S.R. White, Density-matrix algorithms for quantum renormalization groups. Phys. Rev. B 48,
10345–10356 (1993)
6. I.P. McCulloch, From density-matrix renormalization group to matrix product states. J. Stat.
Mech. Theory Exp. 2007(10), P10014 (2007)
7. I.P. McCulloch, Inﬁnite size density matrix renormalization group, revisited (2008). arXiv
preprint:0804.2509
8. I.V. Oseledets, Tensor-train decomposition. SIAM J. Sci. Comput. 33(5), 2295–2317 (2011)
9. S.J. Ran, W. Li, B. Xi, Z. Zhang, G. Su, Optimized decimation of tensor networks with
super-orthogonalization for two-dimensional quantum lattice models. Phys. Rev. B 86, 134429
(2012)
10. L. De Lathauwer, B. De Moor, J. Vandewalle, On the best rank-1 and rank-(R1, R2,. . ., RN)
approximation of higher-order tensors. SIAM. J. Matrix Anal. and Appl. 21(4), 1324–1342
(2000)
11. S.J. Ran, B. Xi, T. Liu, G. Su, Theory of network contractor dynamics for exploring
thermodynamic properties of two-dimensional quantum lattice models. Phys. Rev. B 88,
064407 (2013)
12. Y.-Y. Shi, L.M. Duan, G. Vidal, Classical simulation of quantum many-body systems with a
tree tensor network. Phys. Rev. A 74, 022320 (2006)
13. D. Nagaj, E. Farhi, J. Goldstone, P. Shor, I. Sylvester, Quantum transverse-ﬁeld Ising model on
an inﬁnite tree from matrix product states. Phys. Rev. B 77, 214431 (2008)
14. L. Tagliacozzo, G. Evenbly, G. Vidal, Simulation of two-dimensional quantum systems using
a tree tensor network that exploits the entropic area law. Phys. Rev. B 80, 235127 (2009)
15. V. Murg, F. Verstraete, Ö. Legeza, R.M. Noack, Simulating strongly correlated quantum
systems with tree tensor networks. Phys. Rev. B 82, 205105 (2010)


---
*Page 138*

References
127
16. W. Li, J. von Delft, T. Xiang, Efﬁcient simulation of inﬁnite tree tensor network states on the
Bethe lattice. Phys. Rev. B 86, 195137 (2012)
17. N. Nakatani, G.K.L. Chan, Efﬁcient tree tensor network states (TTNS) for quantum chemistry:
generalizations of the density matrix renormalization group algorithm. J. Chem. Phys. 138,
134113 (2013)
18. I. Pižorn, F. Verstraete, R.M. Konik, Tree tensor networks and entanglement spectra. Phys. Rev.
B 88, 195102 (2013)
19. V. Murg, F. Verstraete, R. Schneider, P.R. Nagy, Ö. Legeza. Tree tensor network state with
variable tensor order: an efﬁcient multireference method for strongly correlated systems. J.
Chem. Theory Comput. 11, 1027–1036 (2015)
20. Z.-Y. Xie, J. Chen, M.-P. Qin, J.-W. Zhu, L.-P. Yang, T. Xiang, Coarse-graining renormalization
by higher-order singular value decomposition. Phys. Rev. B 86, 045139 (2012)
21. C.D. Sherrill, Frontiers in electronic structure theory. J. Chem. Phys. 132, 110902 (2010)
22. J. Jordan, R. Orús, G. Vidal, F. Verstraete, J.I. Cirac, Classical simulation of inﬁnite-size
quantum lattice systems in two spatial dimensions. Phys. Rev. Lett. 101, 250602 (2008)
23. H.C. Jiang, Z.Y. Weng, T. Xiang, Accurate determination of tensor network state of quantum
lattice models in two dimensions. Phys. Rev. Lett. 101, 090603 (2008)
24. Z.-Y. Xie, J. Chen, J.-F. Yu, X. Kong, B. Normand, T. Xiang, Tensor renormalization of
quantum many-body systems using projected entangled simplex states. Phys. Rev. X 4(1),
011025 (2014)
25. L. De Lathauwer, B. De Moor, J. Vandewalle, A multilinear singular value decomposition.
SIAM. J. Matrix Anal. Appl. 21, 1253–1278 (2000)
26. F.L. Hitchcock, The expression of a tensor or a polyadic as a sum of products. Stud. Appl.
Math. 6(1–4), 164–189 (1927)
27. F.L. Hitchcock, Multiple invariants and generalized rank of a P-Way matrix or tensor. Stud.
Appl. Math. 7(1-4), 39–79 (1928)
28. S.-J. Ran, Ab initio optimization principle for the ground states of translationally invariant
strongly correlated quantum lattice models. Phys. Rev. E 93, 053310 (2016)
29. E. Tirrito, L. Tagliacozzo, M. Lewenstein, S.-J. Ran, Characterizing the quantum ﬁeld theory
vacuum using temporal matrix product states (2018). arXiv preprint:1810.08050
30. R. Orús, G. Vidal, Simulation of two-dimensional quantum systems on an inﬁnite lattice
revisited: corner transfer matrix for tensor contraction. Phys. Rev. B 80, 094403 (2009)
31. F. Verstraete, J.J. García-Ripoll, J.I. Cirac, Matrix product density operators: simulation of
ﬁnite-temperature and dissipative systems. Phys. Rev. Lett. 93, 207204 (2004)
32. M. Zwolak, G. Vidal, Mixed-state dynamics in one-dimensional quantum lattice systems: a
time-dependent superoperator renormalization algorithm. Phys. Rev. Lett. 93, 207205 (2004)
33. W. Li, S. J. Ran, S.S. Gong, Y. Zhao, B. Xi, F. Ye, G. Su, Linearized tensor renormalization
group algorithm for the calculation of thermodynamic properties of quantum lattice models.
Phys. Rev. Lett. 106, 127202 (2011)
34. J. Becker, T. Köhler, A.C. Tiegel, S.R. Manmana, S. Wessel, A. Honecker, Finite-temperature
dynamics and thermal intraband magnon scattering in Haldane spin-one chains. Phys. Rev. B
96, 060403 (2017)
35. A.A. Gangat, I. Te, Y.-J. Kao, Steady states of inﬁnite-size dissipative quantum chains via
imaginary time evolution. Phys. Rev. Lett. 119, 010501 (2017)
36. Q.-B Zhao, G.-X. Zhou, S.-L. Xie, L.-Q. Zhang, A. Cichocki, Tensor ring decomposition
(2016). arXiv preprint:1606.05535
37. J. Haegeman, C. Lubich, I. Oseledets, B. Vandereycken, F. Verstraete, Unifying time evolution
and optimization with matrix product states. Phys. Rev. B 94, 165116 (2016)
38. M.B. Hastings, R. Mahajan, Connecting entanglement in time and space: improving the folding
algorithm. Phys. Rev. A 91, 032306 (2015)
39. F. Verstraete, J.I. Cirac, Continuous matrix product states for quantum ﬁelds. Phys. Rev. Lett.
104, 190405 (2010)


---
*Page 139*

128
5
Tensor Network Contraction and Multi-Linear Algebra
40. M.C. Bañuls, M.B. Hastings, F. Verstraete, J.I. Cirac, Matrix product states for dynamical
simulation of inﬁnite chains. Phys. Rev. Lett. 102, 240603 (2009)
41. A. Müller-Hermes, J.I. Cirac, M.-C. Bañuls, Tensor network techniques for the computation of
dynamical observables in one-dimensional quantum spin systems. New J. Phys. 14(7), 075003
(2012)
42. M.T. Fishman, L. Vanderstraeten, V. Zauner-Stauber, J. Haegeman, F. Verstraete, Faster
methods for contracting inﬁnite 2d tensor networks (2017). arXiv preprint:1711.05881
43. J. Haegeman, F. Verstraete, Diagonalizing transfer matrices and matrix product operators: a
medley of exact and computational methods. Ann. Rev. Condens. Matter Phys. 8(1), 355–406
(2017)
44. R. Orús, A practical introduction to tensor networks: matrix product states and projected
entangled pair states. Ann. Phys. 349, 117 (2014)
45. H.-Q. Zhou, R. Orús, G. Vidal, Ground state ﬁdelity from tensor network representations. Phys.
Rev. Lett. 100, 080601 (2008)
46. E. Zohar, M. Burrello, T.B. Wahl, J.I. Cirac, Fermionic projected entangled pair states and local
U(1) gauge theories. Ann. Phys. 363, 385–439 (2015)
47. J. Haegeman, K. Van Acoleyen, N. Schuch, J.I. Cirac, F. Verstraete, Gauging quantum states:
from global to local symmetries in many-body systems. Phys. Rev. X 5, 011024 (2015)
48. M. Mambrini, R. Orús, D. Poilblanc, Systematic construction of spin liquids on the square
lattice from tensor networks with SU(2) symmetry. Phys. Rev. B 94, 205124 (2016)
49. D.P.-García, M. Sanz, C.E. González-Guillén, M.M. Wolf, J.I. Cirac, Characterizing symme-
tries in a projected entangled pair state. New J. Phys. 12(2), 025010 (2010)
50. A. Weichselbaum, Non-Abelian symmetries in tensor networks: a quantum symmetry space
approach. Ann. Phys. 327, 2972–3047 (2012)
51. N. Schuch, I. Cirac, D. Pérez-García, PEPS as ground states: degeneracy and topology. Ann.
Phys. 325(10), 2153–2192 (2010)
52. S. Singh, R.N.C. Pfeifer, G. Vidal, Tensor network decompositions in the presence of a global
symmetry. Phys. Rev. A 82, 050301 (2010)
53. S. Singh, R.N.C. Pfeifer, G. Vidal, Tensor network states and algorithms in the presence of a
global U(1) symmetry. Phys. Rev. B 83, 115125 (2011)
54. R. Orús, Advances on tensor network theory: symmetries, fermions, entanglement, and
holography. Eur. Phys. J. B. 87(11), 280 (2014)
55. B. Bauer, P. Corboz, R. Orús, M. Troyer, Implementing global Abelian symmetries in projected
entangled-pair state algorithms. Phys. Rev. B 83, 125106 (2011)
56. S. Singh, G. Vidal, Tensor network states and algorithms in the presence of a global SU(2)
symmetry. Phys. Rev. B 86, 195114 (2012)
57. L. Tagliacozzo, A. Celi, M. Lewenstein, Tensor networks for lattice gauge theories with
continuous groups. Phys. Rev. X 4, 041024 (2014)
58. M. Rispler, K. Duivenvoorden, N. Schuch, Long-range order and symmetry breaking in
projected entangled-pair state models. Phys. Rev. B 92, 155133 (2015)
59. S.-H. Jiang, Y. Ran, Symmetric tensor networks and practical simulation algorithms to sharply
identify classes of quantum phases distinguishable by short-range physics. Phys. Rev. B 92,
104414 (2015)
60. H.-Y. Lee, J.-H. Han, Classiﬁcation of trivial spin-1 tensor network states on a square lattice.
Phys. Rev. B 94, 115150 (2016)
61. O. Buerschaper, Twisted injectivity in projected entangled pair states and the classiﬁcation of
quantum phases. Ann. Phys. 351, 447–476 (2014)
62. Z.C. Gu, M. Levin, B. Swingle, X.G. Wen, Tensor-product representations for string-net
condensed states. Phys. Rev. B 79, 085118 (2009)
63. O. Buerschaper, M. Aguado, G. Vidal, Explicit tensor network representation for the ground
states of string-net models. Phys. Rev. B 79, 085119 (2009)


---
*Page 140*

References
129
64. S.J. Denny, J.D. Biamonte, D. Jaksch, S.R. Clark, Algebraically contractible topological tensor
network states. J. Phys. A Math. Theory 45, 015309 (2012)
65. R.N.C. Pfeifer, P. Corboz, O. Buerschaper, M. Aguado, M. Troyer, G. Vidal, Simulation of
anyons with tensor network algorithms. Phys. Rev. B 82, 115126 (2010)
Open Access This chapter is licensed under the terms of the Creative Commons Attribution 4.0
International License (http://creativecommons.org/licenses/by/4.0/), which permits use, sharing,
adaptation, distribution and reproduction in any medium or format, as long as you give appropriate
credit to the original author(s) and the source, provide a link to the Creative Commons licence and
indicate if changes were made.
The images or other third party material in this chapter are included in the chapter’s Creative
Commons licence, unless indicated otherwise in a credit line to the material. If material is not
included in the chapter’s Creative Commons licence and your intended use is not permitted by
statutory regulation or exceeds the permitted use, you will need to obtain permission directly from
the copyright holder.


---
*Page 141*

Chapter 6
Quantum Entanglement Simulation
Inspired by Tensor Network
Abstract This chapter is focused on the quantum entanglement simulation
approach (Ran et al., Phys Rev B 96:155120, 2017). The idea is to use few-
body models embedded in the “entanglement bath” to mimic the properties of large
and inﬁnite-size quantum systems. The few-body models are dubbed as quantum
entanglement simulators. Generally speaking, the QES approach consists of three
stages: ﬁrst, determine the effective interactions that give the inﬁnite boundary
condition (Ran et al., Phys Rev B 96:155120, 2017; Phien et al., Phys Rev B
86:245107, 2012) by the MPS/PEPS methods, such as iDMRG in one dimension or
zero-loop scheme in two and three dimensions; second, construct the simulators by
surrounding a ﬁnite-size cluster of the targeted model with the effective interactions;
third, simulate the properties of the quantum entanglement simulator by the ﬁnite-
size algorithms or quantum hardware, and extract the properties of the targeted
model within the bulk.
6.1
Motivation and General Ideas
An impression one may have for the TN approaches of the quantum lattice models
is that the algorithm (i.e., how to contract and/or truncate) will dramatically change
when considering different models or lattices. This motivates us to look for more
uniﬁed approaches. Considering that a huge number of problems can be transformed
to TN contractions, one general question we may ask is: how can we reduce a
non-deterministic polynomial hard TN contraction problem approximately to an
effective one that can be computed exactly and efﬁciently by classical computers?
We shall put some principles while considering this question: the effective problem
should be as simple as possible, containing as few parameters to solve as possible.
We would like to coin this principle for TN contractions as the ab initio optimization
principle (AOP) of TN [1]. The term “ab inito” is taken here to pay respect to the
famous ab inito principle approaches in condensed matter physics and quantum
chemistry (see several recent reviews in [2–4]). Here, “ab inito” means to think from
the very beginning, with least prior knowledge of or assumptions to the problems.
© The Author(s) 2020
S.-J. Ran et al., Tensor Network Contractions, Lecture Notes in Physics 964,
https://doi.org/10.1007/978-3-030-34489-4_6
131


---
*Page 142*

132
6
Quantum Entanglement Simulation Inspired by Tensor Network
One progress achieved in the spirit of AOP is the TRD introduced in Sect. 5.4.
Considering the TN on an inﬁnite square lattice, its contraction is reduced to a set
of self-consistent eigenvalue equations that can be efﬁciently solved by classical
computers. The variational parameters are just two tensors. One advantage of
TRD is that it connects the TN algorithms (iDMRG, iTEBD, CTMRG), which are
previously considered to be quite different, in a uniﬁed picture.
Another progress made in the AOP spirit is called QES for simulating inﬁnite-
size physical models [1, 5, 6]. It is less dependent on the speciﬁc models; it
also provides a natural way for designing quantum simulators and for hybridized-
quantum-classical simulations of many-body systems. Hopefully in the future when
people are able to readily realize the designed Hamiltonians on artiﬁcial quantum
platforms, QES will enable us to design the Hamiltonians that will realize quantum
many-body phenomena.
6.2
Simulating One-Dimensional Quantum Lattice Models
Let us ﬁrstly take the ground-state simulation of the inﬁnite-size 1D quantum system
as an example. The Hamiltonian is the summation of two-body nearest-neighbor
terms, which reads ˆHInf = 
n ˆHn,n+1. The translational invariance is imposed.
The ﬁrst step is to choose a supercell (e.g., a ﬁnite part of the chain with ˜N sites).
Then the Hamiltonian of the supercell is ˆHB =  ˜N
n=1 ˆHn,n+1, and the Hamiltonian
connecting the supercell to the rest part is ˆH∂= ˆHn′,n′+1 (note the interactions are
nearest neighbor).
Deﬁne the operator ˆF ∂as
ˆF∂= ˆI −τ ˆH∂,
(6.1)
with τ the Trotter-Suzuki step. This deﬁnition is to construct the Trotter-Suzuki
decomposition [7, 8]. Instead of using the exponential form e−τ ˆH , we equivalently
chose to shift
ˆH∂for algorithmic consideration. The errors of these two ways
concerning the ground state are at the same level (O(τ 2)). Introduce an ancillary
index a and rewrite ˆF∂as a sum of operators as
ˆF∂=

a
ˆFL(s)a ˆFR(s′)a,
(6.2)
where ˆFL(s)a and ˆFR(s′)a are two sets of one-body operators (labeled by a) acting
on the left and right one of the two spins (s and s′) associated with ˆH∂, respectively
(Fig. 6.1). Equation (6.2) can be easily achieved directly from the Hamiltonian
or using eigenvalue decomposition. For example, for the Heisenberg interaction
with
ˆH∂
= 
α=x,y,z Jα ˆSα(s) ˆSα(s′) with ˆSα(s) the spin operators. We have


---
*Page 143*

6.2
Simulating One-Dimensional Quantum Lattice Models
133
Fig. 6.1 Graphical
representations of
Eqs. (6.1)–(6.4)
ˆF∂= 
a=0,x,y,z ˜Ja ˆSa(s) ˆSa(s′) with ˆS0 = I, ˜J0 = 1, ˜Ja = −τJa (α = x, y, z),
hence we can deﬁne ˆFL(s)a =

| ˜Ja| ˆSα(s) and ˆFR(s)a = sign( ˜Ja)

| ˜Ja| ˆSα(s′).
Construct the operator ˆ
F(S)a′a, with S = (s1, · · · , s ˜N) representing the physical
spins inside the supercell, as
ˆ
F(S)a′a = ˆFR(s1)†
a′ ˜HB ˆFL(s ˜N)a,
(6.3)
with
˜HB =
ˆI −τ ˆHB. ˆFR(s1)†
a′ and ˆFL(s ˜N)a act on the ﬁrst and last sites of
the supercell, respectively. One can see that
ˆ
F(S)a′a represents a set of operators
labeled by two indexes (a′ and a) that act on the supercell.
In the language of TN, the coefﬁcients of
ˆ
F(S)a′a in the local basis (|S⟩=
|s1⟩· · · |s ˜N⟩) is a fourth-order cell tensor (Fig. 6.1) as
TS′a′Sa = ⟨S′| ˆ
F(S)a′a|S⟩.
(6.4)
On the left-hand side, the order of the indexes are arranged to be consistent with
the deﬁnition in the TN algorithm introduced in the precious sections. T is the cell
tensor, whose inﬁnite copies form the TN of the imaginary-time evolution up to
the ﬁrst Trotter-Suzuki order. One may consider the second Trotter-Suzuki order
by deﬁning
ˆ
F(S)a′a as
ˆ
F(S)a′a = ( ˆI −τ ˆHB/2) ˆFR(s1)†
a′ ˆFL(s ˜N)a( ˆI −τ ˆHB/2).
With the cell tensor T , the ground-state properties can be solved using the TN
algorithms (e.g., TRD) introduced above. The ground state is given by the MPS
given by Eq. (5.59).
Let us consider one of the eigenvalue equations [also see Eq. (5.57)] in the TRD
HS′b′
1b′
2,Sb1b2 =

aa′
TS′a′SavL
a′b′
1b1vR
ab′
2b2.
(6.5)
We deﬁne a new Hamiltonian
ˆ
H by using HS′b′
1b′
2,Sb1b2 as the coefﬁcients
ˆ
H =

SS′

b1b2b′
1b′
2
HS′b′
1b′
2,Sb1b2|S′b′
1b′
2⟩⟨Sb1b2|.
(6.6)
ˆ
H is the effective Hamiltonian in iDMRG [9–11] or the methods which represent
the RG of Hilbert space by MPS [12, 13]. The indexes {b} are considered as virtual


---
*Page 144*

134
6
Quantum Entanglement Simulation Inspired by Tensor Network
spins with basis {|b⟩}. The virtual spins are called the entanglement bath sites in the
QES.
By substituting with the cell tensor T [Eqs. (6.3) and (6.4)] inside the above
equation, we have
ˆ
H =
ˆ
HL ˜HB
ˆ
HR,
(6.7)
where the Hamiltonians
ˆ
HL and
ˆ
HR locate on the boundaries of
ˆ
H , whose
coefﬁcients satisfy
⟨b′
1s′
1| ˆ
HL|b1s1⟩=

a
vL
ab′
1b1⟨s′
1| ˆFR(s1)†
a|s1⟩,
(6.8)
⟨s′
˜Nb′
2| ˆ
HR|s ˜Nb2⟩=

a
⟨s′
˜N| ˆFL(s ˜N)†
a|s ˜N⟩vR
ab2b′
2.
ˆ
HL and
ˆ
HR are just two-body Hamiltonians, of which each acts on the bath site
and its neighboring physical site on the boundary of the bulk; they deﬁne the inﬁnite
boundary condition for simulating the time evolution of 1D quantum systems [14].
ˆ
HL and
ˆ
HR can also be written in a shifted form as
ˆ
HL(R) = I −τ ˆHL(R).
(6.9)
This is because the tensor vL (and also vR) satisﬁes a special form [15] as
vL
0,bb′ = Ibb′ −τQbb′,
(6.10)
vL
a,bb′ = τ a/2(Ra)bb′ (a > 0),
(6.11)
with Q and R two Hermitian matrices independent on τ. In other words, the MPS
formed by inﬁnite copies of vL or vR is a continuous MPS [16], which is known as
the temporal MPS [17]. Therefore, ˆHL(R) is independent on τ, called the physical-
bath Hamiltonian. Then
ˆ
H can be written as the shift of a few-body Hamiltonian
as
ˆ
H = I −τ ˆHFB, where ˆHFB has the standard summation form as
ˆHFB = ˆHL +
L

n=1
ˆHn,n+1 + ˆHR.
(6.12)
For ˆHL and ˆHR with the bath dimension χ, the coefﬁcient matrix of ˆHL(R) is
(2χ × 2χ). Then ˆHL(R) can be generally expanded by ˆSα1 ⊗
ˆ
S α2 with { ˆ
S } the
generators of the SU(χ) group, and deﬁne the magnetic ﬁeld and coupling constants
associated to the entanglement bath
ˆHL(R) =

α1,α2
J α1α2
L(R) ˆ
S α1 ⊗ˆSα2,
(6.13)


---
*Page 145*

6.2
Simulating One-Dimensional Quantum Lattice Models
135
with S denoting the SU(χ) spin operators and ˆS the operators of the physical spin
(with the identity included).
Let us take the bond dimension χ = 2 as an example, and ˆHL(R) just gives the
Hamiltonian between two spin-1/2’s. Thus, it can be expanded by the spin (or Pauli)
operators ˆSα1 ⊗ˆSα2 as
ˆHL(R) =
3

α1,α2=0
J α1α2
L(R) ˆSα1 ⊗ˆSα2,
(6.14)
where the spin-1/2 operators are labeled as ˆS0 = I, ˆS1 = ˆSx, ˆS2 = ˆSy, and
ˆS3 = ˆSz. Then with α1 ̸= 0 and α2 ̸= 0, we have J α1α2
L(R) as the coupling constants,
and J α10
L(R) and J 0α2
L(R) the magnetic ﬁelds on the ﬁrst and second sites, respectively.
J 00
L(R) only provides a constant shift of the Hamiltonian which does not change the
eigenstates.
As an example, we show the ˆHL and ˆHR for the inﬁnite quantum Ising chain
in a transverse ﬁeld [18]. The original Hamiltonian reads ˆHIsing = 
n ˆSz
n ˆSz
n+1 −
α 
n ˆSx
n, and ˆHL and ˆHR satisﬁes
ˆHL = J L
xz ˆSx
1 ˆSz
2 + J L
zz ˆSz
1 ˆSz
2 −hL
x ˆSx
1 −hL
z ˆSz
1 −˜hL
x ˆSx
2 ,
ˆHR = J R
zx ˆSz
N−1 ˆSx
N + J R
zz ˆSz
N−1 ˆSz
N −hR
x ˆSx
N −hR
z ˆSz
N −˜hR
x ˆSx
N−1.
(6.15)
The coupling constants and magnetic ﬁelds depend on the transverse ﬁeld α, as
shown in Fig. 6.2. The calculation shows that except the Ising interactions and the
transverse ﬁeld that originally appear in the inﬁnite model, the ˆSx ˆSz coupling and a
vertical ﬁeld emerge in ˆHL and ˆHR. This is interesting, because the ˆSx ˆSz interaction
Fig. 6.2 The α-dependence [18] of the coupling constants (left) and magnetic ﬁelds (right) of the
few-body Hamiltonians (Eq. (6.15)). Reused from [18] with permission


---
*Page 146*

136
6
Quantum Entanglement Simulation Inspired by Tensor Network
is the stabilizer on the open boundaries of the cluster state, a highly entangled state
that has been widely used in quantum information sciences [19, 20]. More relations
with the cluster state are to be further explored.
The physical information of the inﬁnite-size model can be extracted from the
ground state of ˆHFB (denoted by |Ψ (Sb1b2)⟩) by tracing over the entanglement-
bath degrees of freedom. To this aim, we calculate the reduced density matrix of the
bulk as
ˆρ(S) = Trb1b2|Ψ (Sb1b2)⟩⟨Ψ (Sb1b2)|.
(6.16)
Note |Ψ (Sb1b2)⟩= 
Sb1b2 ΨSb1b2|Sb1b2⟩with ΨSb1b2 the eigenvector of Eq. (6.5)
or (5.57). It is easy to see that ΨSb1b2 is the central tensor in the central-orthogonal
MPS (Eq. (5.59)), thus the ˆρ(S) is actually the reduced density matrix of the MPS.
Since the MPS optimally gives the ground state of the inﬁnite model, therefore,
ˆρ(S) of the few-body ground state optimally gives the reduced density matrix of the
original model.
In Eq. (6.12), the summation of the physical interactions is within the supercell
that we choose to construct the cell tensor. To improve the accuracy to, e.g., capture
longer correlations inside the bulk, one just needs to increase the supercell in ˆHFB.
In other words, ˆHL and ˆHR are obtained by TRD from the supercell of a tolerable
size ˜N, and ˆHFB is constructed with a larger bulk as ˆHFB = ˆHL +  ˜N′
n=1 ˆHn,n+1 +
ˆHR with ˜N′ > ˜N. Though ˆHFB becomes more expensive to solve, we have many
well-established ﬁnite-size algorithms to compute its dominant eigenvector. We will
show below that this way is extremely useful in higher dimensions.
6.3
Simulating Higher-Dimensional Quantum Systems
For (D > 1)-dimensional quantum systems on, e.g., square lattice, one can use dif-
ferent update schemes to calculate the ground state. Here, we explain an alternative
way by generalizing the above 1D simulation to higher dimensions [5]. The idea is
to optimize the physical-bath Hamiltonians by the zero-loop approximation (simple
update, see Sect. 5.3), e.g., iDMRG on tree lattices [21, 22], and then construct the
few-body Hamiltonian ˆHFB with larger bulks. The loops inside the bulk will be
fully considered when solving the ground state of ˆHFB, thus the precision will be
signiﬁcantly improved compared with the zero-loop approximation.
The procedures are similar to those for 1D models. The ﬁrst step is to contract the
cell tensor, so that the ground-state simulation is transformed to a TN contraction
problem. We choose the two sites connected by a parallel bond as the supercell,
and construct the cell tensor that parametrizes the eigenvalue equations. The bulk
interaction is simply the coupling between these two spins, i.e., ˆHB =
ˆHi,j, and
the interaction between two neighboring supercells is the same, i.e., ˆH∂= ˆHi,j. By


---
*Page 147*

6.3
Simulating Higher-Dimensional Quantum Systems
137
Fig. 6.3 Graphical
representation of the cell
tensor for 2D quantum
systems (Eq. (6.18))
shifting ˆH∂, we deﬁne ˆF∂= I −τ ˆH∂and decompose it as
ˆF∂=

a
ˆFL(s)a ⊗ˆFR(s′)a.
(6.17)
ˆFL(s)a and ˆFR(s′)a are two sets of operators labeled by a that act on the two spins (s
and s′) in the supercell, respectively (see the texts below Eq. (6.2) for more detail).
Deﬁne a set of operators by the product of the (shifted) bulk Hamiltonian with
ˆFL(s)a and ˆFR(s)a (Fig. 6.3) as
ˆ
F(S)a1a2a3a4 = ˆFR(s)a1 ˆFR(s)a2 ˆFL(s′)a3 ˆFL(s′)a4 ˜H B,
(6.18)
with S = (s, s′) and ˜H B = I −τ ˆH B. The cell tensor that deﬁnes the TN is given
by the coefﬁcients of
ˆ
F(S)a1a2a3a4 as
TS′Sa1a2a3a4 = ⟨S′| ˆ
F(S)a1a2a3a4|S⟩.
(6.19)
One can see that T has six bonds, of which two (S and S′) are physical and four (a1,
a2, a3, and a4) are non-physical. For comparison, the tensor in the 1D quantum case
has four bonds, where two are physical and two are non-physical [see Eq. (6.4)]. As
discussed above in Sect. 4.2, the ground-state simulation becomes the contraction
of a cubic TN formed by inﬁnite copies of T . Each layer of the cubic TN gives the
operator ˆρ(τ) = I −τ ˆH, which is a PEPO deﬁned on a square lattice. Inﬁnite layers
of the PEPO limK→∞ˆρ(τ)K give the cubic TN.
The next step is to solve the SEEs of the zero-loop approximation. For the same
model deﬁned on the loopless Bethe lattice, the 3D TN is formed by inﬁnite layers
of PEPO ˆρBethe(τ) that is deﬁned on the Bethe lattice. The cell tensor is deﬁned
exactly in the same way as Eq. (6.19). With the Bethe approximation, there are ﬁve
variational tensors, which are Ψ (central tensor) and v[x] (x = 1, 2, 3, 4, boundary
tensors). Meanwhile, we have ﬁve self-consistent equations that encodes the 3D TN


---
*Page 148*

138
6
Quantum Entanglement Simulation Inspired by Tensor Network
limK→∞ˆρBethe(τ)K, which are given by ﬁve matrices as
HS′b′
1b′
2b′
3b′
4,Sb1b2b3b4 =

a1a2a3a4
TS′Sa1a2a3a4v[1]
a1b1b′
1v[2]
a2b2b′
2v[3]
a3b3b′
3v[4]
a4b4b′
4,
(6.20)
M[1]
a1b1b′
1,a3b3b′
3 =

S′Sa2a4b2b′
2b4b′
4
TS′Sa1a2a3a4A[1]∗
S′b′
1b′
2b′
3b′
4v[2]
a2b2b′
2A[1]
Sb1b2b3b4v[4]
a4b4b′
4,
(6.21)
M[2]
a2b2b′
2,a4b4b′
4 =

S′Sa1a3b1b′
1b3b′
3
TS′Sa1a2a3a4A[2]∗
S′b′
1b′
2b′
3b′
4v[1]
a1b1b′
1A[2]
Sb1b2b3b4v[3]
a3b3b′
3,
(6.22)
M[3]
a1b1b′
1,a3b3b′
3 =

S′Sa2a4b2b′
2b4b′
4
TS′Sa1a2a3a4A[3]∗
S′b′
1b′
2b′
3b′
4v[2]
a2b2b′
2A[3]
Sb1b2b3b4v[4]
a4b4b′
4,
(6.23)
M[4]
a2b2b′
2,a4b4b′
4 =

S′Sa1a3b1b′
1b3b′
3
TS′Sa1a2a3a4A[4]∗
S′b′
1b′
2b′
3b′
4v[1]
a1b1b′
1A[4]
Sb1b2b3b4v[3]
a3b3b′
3.
(6.24)
Equations (6.20) and (6.22) are illustrated in Fig. 6.4 as two examples. A[x] is an
isometry obtained by the QR decomposition (or SVD) of the central tensor Ψ
referring to the x-th virtual bond bx. For example, for x = 2, we have (Fig. 6.4)
ΨSb1b2b3b4 =

b
A[2]
Sb1bb3b4R[2]
bb2.
(6.25)
Fig. 6.4 The left ﬁgure is the graphic representations of HS′b′
1b′
2b′
3b′
4,Sb1b2b3b4 in Eq. (6.20), and
we take Eq. (6.22) from the self-consistent equations as an example shown in the middle. The QR
decomposition in Eq. (6.25) is shown in the right ﬁgure, where the arrows indicate the direction of
orthogonality of A[3] in Eq. (6.26)


---
*Page 149*

6.3
Simulating Higher-Dimensional Quantum Systems
139
A[2] is orthogonal, satisfying

Sb1b3b4
A[2]∗
Sb1bb3b4A[2]
Sb1b′b3b4 = Ibb′.
(6.26)
The self-consistent equations can be solved recursively. By solving the leading
eigenvector of H given by Eq. (6.20), we update the central tensor Ψ . Then
according to Eq. (6.25), we decompose Ψ to obtain A[x], then update M[x] in
Eqs. (6.21)–(6.24), and update each v[x] by M[x]v[x]. Repeat this process until all the
ﬁve variational tensors converge. The algorithm is the generalized DMRG based on
inﬁnite tree PEPS [21, 22]. Each boundary tensor can be understood as the inﬁnite
environment of a tree branch, thus the original model is actually approximated at
this stage by that deﬁned on an Bethe lattice. Note that when only looking at the
tree locally (from one site and its nearest neighbors), it looks the same to the original
lattice. Thus, the loss of information is mainly long range, i.e., from the destruction
of loops.
We can have a deeper understanding of the Bethe approximation with the help
of rank-1 decomposition explained in Sect. 5.3. Equations (6.21)–(6.24) encode
a Bethe TN, whose contraction is written as ZBethe = ⟨˜Φ| ˆρBethe(τ)| ˜Φ⟩with
ˆρBethe(τ) the PEPO of the Bethe model and | ˜Φ⟩a tree iPEPS (Fig. 6.5). To see
this, let us start with the local contraction (Fig. 6.5a) as
ZBethe =

Ψ ∗
S′b′
1b′
2b′
3b′
4ΨSb1b2b3b4TS′Sa1a2a3a4v[1]
a1b1b′
1v[2]
a2b2b′
2v[3]
a3b3b′
3v[4]
a4b4b′
4. (6.27)
Then, each v[x] can be replaced by M[x]v[x] because we are at the ﬁxed point of the
eigenvalue equations. By repeating this substitution in a similar way as the rank-1
decomposition in Sect. 5.3.3, we will have the TN for ZBethe, which is maximized
at the ﬁxed point (Fig. 6.5b). With the constraint ⟨˜Φ| ˜Φ⟩= 1 satisﬁed, | ˜Φ⟩is the
ground state of ˆρBethe(τ).
Fig. 6.5 The left ﬁgure shows the local contraction that encodes the inﬁnite TN for simulating
the 2D ground state. By substituting with the self-consistent equations, the TN representing ˜Z =
⟨˜Φ| ˆρBethe(τ)| ˜Φ⟩can be reconstructed, with ˆρBethe(τ) the tree PEPO of the Bethe model and | ˜Φ⟩
a PEPS


---
*Page 150*

140
6
Quantum Entanglement Simulation Inspired by Tensor Network
Now, we constrain the growth so that the TN covers the inﬁnite square lattice.
Inevitably, some v[x]s will gather at the same site. The tensor product of these v[x]s
in fact gives the optimal rank-1 approximation of the “correct” full-rank tensor here
(Sect. 5.3.3). Suppose that one uses the full-rank tensor to replace its rank-1 version
(the tensor product of four v[x]’s), one will have the PEPO of I −τ ˆH (with H the
Hamiltonian on square lattice), and the tree iPEPS becomes the iPEPS deﬁned on the
square lattice. Compared with the NCD scheme that employs rank-1 decomposition
explicitly to solve TN contraction, one difference here for updating iPEPS is that the
“correct” tensor to be decomposed by rank-1 decomposition contains the variational
tensor, thus is in fact unknown before the equations are solved. For this reason, we
cannot use rank-1 decomposition directly. Another difference is that the constraint,
i.e., the normalization of the tree iPEPS, should be fulﬁlled. By utilizing the iDMRG
algorithm with the tree iPEPS, the rank-1 tensor is obtained without knowing
the “correct” tensor, and meanwhile the constraints are satisﬁed. The zero-loop
approximation of the ground state is thus given by the tree iPEPS.
The few-body Hamiltonian is constructed in a larger cluster, so that the error
brought by zero-loop approximation can be reduced. Similar to the 1D case, we
embed a larger cluster in the middle of the entanglement bath. The few-body
Hamiltonian (Fig. 6.6) is written as
ˆ
H =

⟨n∈cluster,α∈bath⟩
ˆ
H∂(n, α)

⟨i,j⟩∈cluster
[I −τ ˆH(si, sj)].
(6.28)
ˆ
H∂(n, α) is deﬁned as the physical-bath Hamiltonian between the α-th bath site and
the neighboring n-th physical site, and it is obtained by the corresponding boundary
tensor v[x(α)] and ˆFL(R)(sn) (Fig. 6.6) as
⟨b′
αs′
n| ˆ
H∂(n, α)|bαsn⟩=

a
v[x(α)]
ab′αbα⟨s′
n| ˆFL(R)(sn)a|sn⟩.
(6.29)
Fig. 6.6 The left ﬁgure shows the few-body Hamiltonian
ˆ
H in Eq. (6.28). The middle one shows
the physical-bath Hamiltonian
ˆ
H∂that gives the interaction between the corresponding physical
and bath site. The right one illustrates the state ansatz for the inﬁnite system. Note that the boundary
of the cluster should be surrounded by
ˆ
H∂’s, and each
ˆ
H∂corresponds to an inﬁnite tree brunch in
the state ansatz. For simplicity, we only illustrate four of the
ˆ
H∂s and the corresponding brunches


---
*Page 151*

6.3
Simulating Higher-Dimensional Quantum Systems
141
Here, ˆFL(R)(sn)a is the operator deﬁned in Eq. (6.17), and v[x(α)]
ab′αbα are the solutions
of the SEEs given in Eqs. (6.20)–(6.24).
ˆ
H in Eq. (6.28) can also be rewritten as the shift of a few-body Hamiltonian
ˆHFB, i.e.,
ˆ
H = I −τ ˆHFB. We have ˆHFB possessing the standard summation form
as
ˆHFB =

⟨i,j⟩∈cluster
ˆH(si, sj) +

⟨n∈cluster,α∈bath⟩
ˆHPB(n, α),
(6.30)
with
ˆ
H∂(n, α) = I −τ ˆHPB(sn, bα). This equations gives a general form of the
few-body Hamiltonian: the ﬁrst term contains all the physical interactions inside
the cluster, and the second contains all physical-bath interactions ˆHPB(sn, bα).
ˆ
H
can be solved by any ﬁnite-size algorithms, such as exact diagonalization, QMC,
DMRG [9, 23, 24], or ﬁnite-size PEPS [25–27] algorithms. The error from the rank-
1 decomposition will be reduced since the loops inside the cluster will be fully
considered.
Similar to the 1D cases, the ground-state properties can be extracted by the
reduced density matrix ˆρ(S) after tracing over the entanglement-bath degrees of
freedom. We have ˆρ(S) = Tr/(S)|Φ⟩⟨Φ| (with |Φ⟩the ground state of the inﬁnite
model) that well approximate by
ˆρ(S) ≃

SS′b1b2···
Ψ ∗
S′b1b2···ΨSb1b2···|S⟩⟨S′|,
(6.31)
with ΨSb1b2··· the coefﬁcients of the ground state of ˆHFB.
Figure 6.6 illustrates the ground state ansatz behind the few-body model. The
cluster in the center is entangled with the surrounding inﬁnite tree brunches through
the entanglement-bath degrees of freedom. Note that solving Eq. (6.20) in Stage one
is equivalent to solving Eq. (6.28) by choose the cluster as one supercell.
Some benchmark results of simulating 2D and 3D spin models can be found in
Ref. [5]. For the ground state of Heisenberg model on honeycomb lattice, results of
the magnetization and bond energy show that the few-body model of 18 physical
and 12 bath sites suffers only a small ﬁnite-effect of O(10−3). For the ground state
of 3D Heisenberg model on cubic lattice, the discrepancy of the energy per site is
O(10−3) between the few-body model of 8 physical plus 24 bath sites and the model
of 1000 sites by QMC. The quantum phase transition of the quantum Ising model on
cubic lattice can also be accurately captured by such a few-body model, including
determining the critical ﬁeld and the critical exponent of the magnetization.


---
*Page 152*

142
6
Quantum Entanglement Simulation Inspired by Tensor Network
6.4
Quantum Entanglement Simulation by Tensor Network:
Summary
Below, we summarize the QES approach for quantum many-body systems with few-
body models [1, 5, 6]. The QES contains three stages (Fig. 6.7) in general. The ﬁrst
stage is to optimize the physical-bath interactions by classical computations. The
algorithm can be iDMRG in one dimension or the zero-loop schemes in higher
dimensions. The second stage is to construct the few-body model by embedding
a ﬁnite-size cluster in the entanglement bath, and simulate the ground state of
this few-body model. One can employ any well-established ﬁnite-size algorithms
by classical computations, or build the quantum simulators according to the few-
body Hamiltonian. The third stage is to extract physical information by tracing
over all bath degrees of freedom. The QES approach has been generalized to
ﬁnite-temperature simulations for one-, two-, and three-dimensional quantum lattice
models [6].
As to the classical computations, one will have a high ﬂexibility to balance
between the computational complexity and accuracy, according to the required
precision and the computational resources at hand. On the one hand, thanks to the
zero-loop approximation, one can avoid the conventional ﬁnite-size effects faced by
the previous exact diagonalization, QMC, or DMRG algorithms with the standard
ﬁnite-size models. In the QES, the size of the few-body model is ﬁnite, but the actual
size is inﬁnite as the size of the defective TN (see Sect. 5.3.3). The approximation
is that the loops beyond the supercell are destroyed in the manner of the rank-1
approximation, so that the TN can be computed efﬁciently by classical computation.
On the other hand, the error from the destruction of the loops can be reduced in the
second stage by considering a cluster larger than the supercell. It is important that
the second stage would introduce no improvement if no larger loops were contained
in the enlarged cluster. From this point of view, we have no “ﬁnite-size” but “ﬁnite-
loop” effects. In addition, this “loop” scheme explains why we can ﬂexibly change
the size of the cluster in stage two: which is just to restore the rank-1 tensors inside
the chosen cluster with the full tensors.
The relations among other algorithms are illustrated in Fig. 6.8 by taking certain
limits of the computational parameters. The simplest situation is to take the
dimension of the bath sites dim(b) = 1, and then
ˆ
H∂can be written as a linear
combination of spin operators (and identity). Thus in this case, v[x] simply plays
Fig. 6.7 The “ab initio optimization principle” to simulate quantum many-body systems


---
*Page 153*

6.4
Quantum Entanglement Simulation by Tensor Network: Summary
143
Fig. 6.8 Relations to the algorithms (PEPS, DMRG, and ED) for the ground-state simulations of
2D and 3D Hamiltonian. The corresponding computational set-ups in the ﬁrst (bath calculation)
and second (solving the few-body Hamiltonian) stages are given above and under the arrows,
respectively. Reused from [5] with permission
the role of a classical mean ﬁeld. If one only uses the bath calculation of the ﬁrst
stage to obtain the ground-state properties, the algorithm will be reduced to the
zero-loop schemes such as tree DMRG and simple update of iPEPS. By choosing
a large cluster and dim(b) = 1, the DMRG simulation in stage two becomes
equivalent to the standard DMRG for solving the cluster in a mean ﬁeld. By taking
proper supercell, cluster, algorithms, and other computational parameters, the QES
approach can outperform others.
The QES approach with classical computations can be categorized as a cluster
update scheme (see Sect. 4.3) in the sense of classical computations. Compared with
the “traditional” cluster update schemes [26, 28–30], there exist some essential
differences. The “traditional” cluster update schemes use the super-orthogonal
spectra to approximate the environment of the iPEPS. The central idea of QES is
different, which is to give an effective ﬁnite-size Hamiltonian; the environment is
mimicked by the physical-bath Hamiltonians instead of some spectra.
In addition, it is possible to use full update in the ﬁrst stage to optimize the
interactions related to the entanglement bath. For example, one may use TRD
(iDMRG, iTEBD, or CTMRG) to compute the environment tensors, instead of the
zero-loop schemes. This idea has not been realized yet, but it can be foreseen that the
interactions among the bath sites will appear in ˆHFB. Surely the computation will
become much more expensive. It is not clear yet how the performance would be.
The idea of “bath” has been utilized in many approaches and gained tremendous
successes. The general idea is to mimic the target model of high complexity by a
simpler model embedded in a bath. The physics of the target model can be extracted


---
*Page 154*

144
6
Quantum Entanglement Simulation Inspired by Tensor Network
Table 6.1 The effective models under several bath-related methods: density functional theory
(DFT, also known as the ab initio calculations), dynamical mean-ﬁeld theory (DMFT), and QES
Methods
DFT
DMFT
QES
Effective models
Tight binding model
Single impurity model
Interacting few-body model
by integrating over the bath degrees of freedom. The approximations are reﬂected
by the underlying effective model. Table 6.1 shows the effective models of two
recognized methods (DFT and dynamic mean-ﬁeld theory (DMFT) [31]) and the
QES. An essential difference is that the effective models of the former two methods
are of single-particle or mean-ﬁeld approximations, and the effective model of the
QES is strongly correlated.
The QES allow for quantum simulations of inﬁnite-size many-body systems by
realizing the few-body models on the quantum platforms. There are several unique
advantages. The ﬁrst one concerns the size. One of the main challenges to build a
quantum simulator is to access a large size. In this scheme, a few-body model of
only O(10) sites already shows a high accuracy with the error ∼O(10−3) [1, 5].
Such sizes are accessible by the current platforms. Secondly, the interactions in the
few-body model are simple. The bulk just contains the interactions of the original
physical model. The physical-bath interactions are only two-body and nearest
neighbor. But there exist several challenges. Firstly, the physical-bath interaction for
simulating, e.g., spin-1/2 models, is between a spin-1/2 and a higher spin. This may
require the realization of the interactions between SU(N) spins, which is difﬁcult
but possible with current experimental techniques [32–35]. The second challenge
concerns the non-standard form in the physical-bath interaction, such as the ˆSx ˆSz
coupling in ˆHFB for simulating quantum Ising chain [see Eq. (6.15)] [18]. With
the experimental realization of the few-body models, the numerical simulations of
many-body systems will not only be useful to study natural materials. It would
become possible to ﬁrstly study the many-body phenomena by numerics, and then
realize, control, and even utilize these many-body phenomena in the bulk of small
quantum devices.
The QES Hamiltonian was shown to also mimics the thermodynamics [6]. The
ﬁnite-temperature information is extracted from the reduced density matrix
ˆρR = Trbath ˆρ,
(6.32)
with ˆρ = e−ˆ
HFB/T the density matrix of the QES at the temperature T and Trbath
the trace over the degrees of freedom of the bath sites. ˆρR mimics the reduced
density matrix of inﬁnite-size system that traces over everything except the bulk.
This idea has been used to simulate the quantum models in one, two, and three
dimensions. The QES shows good accuracy at all temperatures, where relatively
large error appears near the critical/crossover temperature.


---
*Page 155*

References
145
One can readily check the consistency with the ground-state QES. When the
ground state is unique, the density matrix is deﬁned as ˆρ = |Ψ ⟩⟨Ψ | with |Ψ ⟩the
ground state of the QES. In this case, Eqs. (6.32) and (6.16) are equivalent. With
degenerate ground states, the equivalence should still hold when the spontaneous
symmetry breaking occurs. With the symmetry preserved, it is an open question
how the ground-state degeneracy affects the QES, where at zero temperature we
have ˆρ = D
a |Ψa⟩⟨Ψa|/D with {|Ψa⟩} the degenerate ground states and D the
degeneracy.
References
1. S.-J. Ran, Ab initio optimization principle for the ground states of translationally invariant
strongly correlated quantum lattice models. Phys. Rev. E 93, 053310 (2016)
2. C.D. Sherrill, Frontiers in electronic structure theory. J. Chem. Phys. 132, 110902 (2010)
3. K. Burke, Perspective on density functional theory. J. Chem. Phys. 136, 150901 (2012)
4. A.D. Becke, Perspective: ﬁfty years of density-functional theory in chemical physics. J. Chem.
Phys. 140, 18A301 (2014)
5. S.-J. Ran, A. Piga, C. Peng, G. Su, M. Lewenstein. Few-body systems capture many-body
physics: tensor network approach. Phys. Rev. B 96, 155120 (2017)
6. S.-J. Ran, B. Xi, C. Peng, G. Su, M. Lewenstein, Efﬁcient quantum simulation for thermody-
namics of inﬁnite-size many-body systems in arbitrary dimensions. Phys. Rev. B 99, 205132
(2019)
7. M. Suzuki, M. Inoue, The ST-transformation approach to analytic solutions of quantum
systems. I general formulations and basic limit theorems. Prog. Theor. Phys. 78, 787 (1987)
8. M. Inoue, M. Suzuki, The ST-transformation approach to analytic solutions of quantum
systems. II: transfer-matrix and Pfafﬁan methods. Prog. Theor. Phys. 79(3), 645–664 (1988)
9. S.R. White, Density matrix formulation for quantum renormalization groups. Phys. Rev. Lett.
69, 2863 (1992)
10. S.R. White, Density-matrix algorithms for quantum renormalization groups. Phys. Rev. B 48,
10345–10356 (1993)
11. I.P. McCulloch, From density-matrix renormalization group to matrix product states. J. Stat.
Mech. Theory Exp. 2007(10), P10014 (2007)
12. V. Zauner-Stauber, L. Vanderstraeten, M.T. Fishman, F. Verstraete, J. Haegeman, Variational
optimization algorithms for uniform matrix product states. Phys. Rev. B 97(4), 045145 (2018)
13. J. Haegeman, C. Lubich, I. Oseledets, B. Vandereycken, F. Verstraete, Unifying time evolution
and optimization with matrix product states. Phys. Rev. B 94, 165116 (2016)
14. H.N. Phien, G. Vidal, I.P. McCulloch, Inﬁnite boundary conditions for matrix product state
calculations. Phys. Rev. B 86, 245107 (2012)
15. E. Tirrito, L. Tagliacozzo, M. Lewenstein, S.-J. Ran, Characterizing the quantum ﬁeld theory
vacuum using temporal matrix product states (2018). arXiv preprint:1810.08050
16. F. Verstraete, J.I. Cirac, Continuous matrix product states for quantum ﬁelds. Phys. Rev. Lett.
104, 190405 (2010)
17. M.B. Hastings, R. Mahajan, Connecting entanglement in time and space: improving the folding
algorithm. Phys. Rev. A 91, 032306 (2015)
18. S.-J. Ran, C. Peng, G. Su, M. Lewenstein, Controlling the phase diagram of ﬁnite spin- 1
2 chains
by tuning the boundary interactions. Phys. Rev. B 98, 085111 (2018)
19. H.J. Briegel, R. Raussendorf, Persistent entanglement in arrays of interacting particles. Phys.
Rev. Lett. 86, 910–913 (2001)


---
*Page 156*

146
6
Quantum Entanglement Simulation Inspired by Tensor Network
20. R. Raussendorf, H.J. Briegel, A one-way quantum computer. Phys. Rev. Lett. 86, 5188–5191
(2001)
21. M. Lepetit, M. Cousy, G.M. Pastor, Density-matrix renormalization study of the Hubbard
model on a Bethe lattice. Eur. Phys. J. B Condens. Matter Complex Syst. 13, 421 (2000)
22. N. Nakatani, G.K.L. Chan, Efﬁcient tree tensor network states (TTNS) for quantum chemistry:
generalizations of the density matrix renormalization group algorithm. J. Chem. Phys. 138,
134113 (2013)
23. S.R. White, D.J. Scalapino, Density matrix renormalization group study of the striped phase in
the 2D t-J model. Phys. Rev. Lett. 80, 1272 (1998)
24. T. Xiang, J.-Z. Lou, Z.-B. Su, Two-dimensional algorithm of the density-matrix renormaliza-
tion group. Phys. Rev. B 64, 104414 (2001)
25. A.W. Sandvik, G. Vidal, Variational quantum Monte Carlo simulations with tensor-network
states. Phys. Rev. Lett. 99, 220602 (2007)
26. M. Lubasch, J.I. Cirac, M.-C. Bañuls, Algorithms for ﬁnite projected entangled pair states.
Phys. Rev. B 90, 064425 (2014)
27. W.-Y. Liu, S.-J. Dong, Y.-J. Han, G.-C. Guo, L.-X. He, Gradient optimization of ﬁnite projected
entangled pair states. Phys. Rev. B 95, 195154 (2017)
28. W. Li, J. von Delft, T. Xiang, Efﬁcient simulation of inﬁnite tree tensor network states on the
Bethe lattice. Phys. Rev. B 86, 195137 (2012)
29. M. Lubasch, J.I. Cirac, M.-C. Bañuls, Unifying projected entangled pair state contractions.
New J. Phys. 16(3), 033014 (2014)
30. L. Wang, F. Verstraete, Cluster update for tensor network states (2011). arXiv preprint
arXiv:1110.4362
31. P. Anders, E. Gull, L. Pollet, M. Troyer, P. Werner, Dynamical mean ﬁeld solution of the Bose-
Hubbard model. Phys. Rev. Lett. 105, 096402 (2010)
32. A.V. Gorshkov, M. Hermele, V. Gurarie, C. Xu, P.S. Julienne, J. Ye, P. Zoller, E. Demler,
M.D. Lukin, A. M. Rey, Two-orbital SU(n) magnetism with ultracold alkaline-earth atoms.
Nat. Phys. 6(4), 289 (2010)
33. D. Banerjee, M.Bögli, M. Dalmonte, E. Rico, P. Stebler, U.J. Wiese, P. Zoller, Atomic quantum
simulation of U(n) and SU(n) non-Abelian lattice gauge theories. Phys. Rev. Lett. 110, 125303
(2013)
34. F. Scazza, C. Hofrichter, M. Höfer, P.C. De Groot, I. Bloch, S. Fölling, Observation of
two-orbital spin-exchange interactions with ultracold SU(n)-symmetric fermions. Nat. Phys.
10(10), 779 (2014)
35. X. Zhang, M. Bishof, S.L. Bromley, C.V. Kraus, M.S. Safronova, P. Zoller, A.M. Rey, J. Ye,
Spectroscopic observation of SU(n)-symmetric interactions in Sr orbital magnetism. Science
345(6203), 1467–1473 (2014)
Open Access This chapter is licensed under the terms of the Creative Commons Attribution 4.0
International License (http://creativecommons.org/licenses/by/4.0/), which permits use, sharing,
adaptation, distribution and reproduction in any medium or format, as long as you give appropriate
credit to the original author(s) and the source, provide a link to the Creative Commons licence and
indicate if changes were made.
The images or other third party material in this chapter are included in the chapter’s Creative
Commons licence, unless indicated otherwise in a credit line to the material. If material is not
included in the chapter’s Creative Commons licence and your intended use is not permitted by
statutory regulation or exceeds the permitted use, you will need to obtain permission directly from
the copyright holder.


---
*Page 157*

Chapter 7
Summary
The explosive progresses of TN that have been made in the recent years opened
an interdisciplinary diagram for studying varieties of subjects. What is more, the
theories and techniques in the TN algorithms are now evolving into a new numerical
ﬁeld, forming a systematic framework for numerical simulations. Our lecture notes
are aimed at presenting this framework from the perspective of the TN contraction
algorithms for quantum many-body physics.
The basic steps of the TN contraction algorithms are to contract the tensors and to
truncate the bond dimensions to bound the computational cost. For the contraction
procedure, the key is the contraction order, which leads to the exponential, lin-
earized, and polynomial contraction algorithms according to how the size of the TN
decreases. For the truncation, the key is the environment, which plays the role of the
reference for determining the importance of the basis. We have the simple, cluster,
and full decimation schemes, where the environment is chosen to be a local tensor,
a local but larger cluster, and the whole TN, respectively. When the environment
becomes larger, the accuracy increases, but so do the computational costs. Thus, it
is important to balance between the efﬁciency and accuracy. Then, we show that by
explicitly writing the truncations in the TN, we are essentially dealing with exactly
contractible TNs.
Compared with the existing reviews of TN, a unique perspective that our notes
discuss about is the underlying relations between the TN approaches and the multi-
linear algebra (MLA). Instead of iterating the contraction-and-truncation process,
the idea is to build a set of local self-consistent eigenvalue equations that could
reconstruct the target TN. These self-consistent equations in fact coincide with or
generalize the tensor decompositions in MLA, including Tucker decomposition,
rank-1 decomposition and its higher-rank version. The equations are parameterized
by both the tensor(s) that deﬁne the TN and the variational tensors (the solution of
the equations), thus can be solved in a recursive manner. This MLA perspective
provides a uniﬁed scheme to understand the established TN methods including
iDMRG, iTEBD, and CTMRG. In the end, we explain how the eigenvalue equations
© The Author(s) 2020
S.-J. Ran et al., Tensor Network Contractions, Lecture Notes in Physics 964,
https://doi.org/10.1007/978-3-030-34489-4_7
147


---
*Page 158*

148
7
Summary
lead to the quantum entanglement simulation (QES) of the lattice models. The
central idea of QES is to construct an effective few-body model surrounded by the
entanglement bath, where its bulk mimics the properties of the inﬁnite-size model
at both zero and ﬁnite temperatures. The interactions between the bulk and the bath
are optimized by the TN methods. The QES provides an efﬁcient way for simulating
one-, two-, and even three-dimensional inﬁnite-size many-body models by classical
computation and/or quantum simulation.
With the lecture notes, we expect that the readers could use the existing TN
algorithms to solve their problems. Moreover, we hope that those who are interested
in TN itself could get the ideas and the connections behind the algorithms to develop
novel TN schemes.
Open Access This chapter is licensed under the terms of the Creative Commons Attribution 4.0
International License (http://creativecommons.org/licenses/by/4.0/), which permits use, sharing,
adaptation, distribution and reproduction in any medium or format, as long as you give appropriate
credit to the original author(s) and the source, provide a link to the Creative Commons licence and
indicate if changes were made.
The images or other third party material in this chapter are included in the chapter’s Creative
Commons licence, unless indicated otherwise in a credit line to the material. If material is not
included in the chapter’s Creative Commons licence and your intended use is not permitted by
statutory regulation or exceeds the permitted use, you will need to obtain permission directly from
the copyright holder.


---
*Page 159*

Index
A
Ab initio optimization principle (AOP), 131,
132
Afﬂeck-Kennedy-Lieb-Tasaki (AKLT), 3, 31
C
Canonical decomposition/parallel factorization
(CANDECOMP/PARAFAC), 117
Conformal ﬁeld theory (CFT), 5
Corner transfer matrix (CTM), 71
Corner transfer matrix renormalization group
(CTMRG), 6–8, 63, 71–73, 81, 88,
93, 99, 119, 123, 132, 143, 147
D
Density functional theory (DFT), 1, 55, 144
Density matrix renormalization group
(DMRG), 2–4, 6, 76, 78, 106, 139,
141–143
Dynamical mean-ﬁeld theory (DMFT), 144
E
Exactly contractible tensor network (ECTN),
80–83
H
Higher-order orthogonal iteration (HOOI), 111
Higher-order singular value decomposition
(HOSVD), 110
Higher-order tensor renormalization group
(HOTRG), 80
I
Inﬁnite density matrix renormalization group
(iDMRG), 8, 42, 76, 99, 119, 120,
123, 131–133, 136, 140, 142, 143,
147
Inﬁnite projected entangled pair operator
(iPEPO), 88, 89, 91, 95
Inﬁnite projected entangled pair state (iPEPS),
35, 87, 91–94, 99, 106, 107, 112,
113, 139, 140, 143
Inﬁnite time-evolving block decimation
(iTEBD), 8, 74–77, 81, 93, 99,
101, 102, 104, 119, 123, 132, 143,
147
M
Matrix product operator (MPO), 5, 36, 39,
74–76, 78, 104
Matrix product state (MPS), 2–6, 8, 25, 28–33,
36, 41, 43, 44, 54, 57, 66, 67,
74–76, 78, 81, 83, 87, 99, 101–107,
109, 112, 121–123, 131, 133, 134,
136
Multi-linear algebra (MLA), 7, 8, 30, 99, 106,
109, 113, 117, 147
Multiscale entanglement renormalization
ansatz (MERA), 5, 33, 47, 48, 54, 83
N
Network contractor dynamics (NCD),
115–117, 140
Network Tucker decomposition (NTD), 111,
122
© The Author(s) 2020
S.-J. Ran et al., Tensor Network Contractions, Lecture Notes in Physics 964,
https://doi.org/10.1007/978-3-030-34489-4
149


---
*Page 160*

150
Index
Non-deterministic polynomial (NP), 4
Numerical renormalization group (NRG), 2, 5,
76
P
Projected entangled pair operator (PEPO), 36,
39, 88, 137, 139, 140
Projected entangled pair state (PEPS), 4, 5, 7,
8, 25, 32, 33, 35, 36, 39, 48, 53, 54,
57, 58, 66, 76, 87, 89, 90, 108, 109,
111–113, 116, 131, 139, 141
Q
QR, 29, 91, 120, 138
Quantum entanglement simulation/simulator
(QES), 8, 131, 132, 134, 142–145,
148
Quantum Monte Carlo (QMC), 3, 6, 55, 89,
141, 142
R
Renormalization group (RG), 45, 47, 106,
133
Resonating valence bond (RVB), 33, 35
S
Second renormalization group (SRG), 71, 75,
93
Self-consistent eigenvalue equations (SEEs),
119, 137, 141
Singular value decomposition (SVD), 5, 6, 28,
29, 69–71, 74, 75, 91, 93, 95, 101,
102, 104, 106, 108, 110–112, 120,
138
T
Tensor network (TN), 1, 2, 4–8, 25, 27–29,
33, 34, 36, 39–41, 44, 45, 47, 48,
50, 52–55, 63–74, 76–81, 83, 87–95,
99–101, 106, 111–113, 115–120,
122–125, 131, 133, 136, 137, 139,
140, 142, 147
Tensor network renormalization (TNR), 82
Tensor network state (TNS), 4–6, 42, 43, 50,
55
Tensor product operator (TPO), 36
Tensor renormalization group (TRG), 5–7, 63,
69–71, 73, 75, 80, 93, 110
Tensor ring decomposition (TRD), 99, 119,
122, 123, 132, 133, 136, 143
Tensor-train decomposition (TTD), 30, 106
Time-dependent variational principle (TDVP),
77
Time-evolving block decimation (TEBD), 3, 6,
7, 63, 73, 74, 77, 78
Transfer matrix renormalization group
(TMRG), 78
Tree tensor network state (TTNS), 32, 45, 46,
48, 54
V
Variational matrix product state (VMPS), 76
