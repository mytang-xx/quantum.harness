# Matrix Product States and Projected Entangled Pair States: Concepts,

Symmetries, and Theorems
J. Ignacio Cirac,1, 2 David Perez-Garcia,3, 4 Norbert Schuch,1, 2, 5, 6 and Frank Verstraete7
1Max-Planck-Institut f¨ur Quantenoptik, Hans-Kopfermann-Str. 1, 85748 Garching, Germany
2Munich Center for Quantum Science and Technology, Schellingstraße 4, 80799 M¨unchen, Germany
3Departamento de An´alisis Matem´atico, Universidad Complutense de Madrid, Plaza de Ciencias 3, 28040 Madrid, Spain
4ICMAT, Nicolas Cabrera, Campus de Cantoblanco, 28049 Madrid, Spain
5University of Vienna, Faculty of Physics, Boltzmanngasse 5, 1090 Wien, Austria
6University of Vienna, Faculty of Mathematics, Oskar-Morgenstern-Platz 1, 1090 Wien, Austria
7Department of Physics and Astronomy, Ghent University, Krijgslaan 281, S9, 9000 Gent, Belgium
The theory of entanglement provides a fundamentally new language for describing in-
teractions and correlations in many body systems. Its vocabulary consists of qubits and
entangled pairs, and the syntax is provided by tensor networks. We review how matrix
product states and projected entangled pair states describe many-body wavefunctions
in terms of local tensors. These tensors express how the entanglement is routed, act
as a novel type of non-local order parameter, and we describe how their symmetries
are reﬂections of the global entanglement patterns in the full system. We will discuss
how tensor networks enable the construction of real-space renormalization group ﬂows
and ﬁxed points, and examine the entanglement structure of states exhibiting topo-
logical quantum order. Finally, we provide a summary of the mathematical results of
matrix product states and projected entangled pair states, highlighting the fundamental
theorem of matrix product vectors and its applications.
CONTENTS
I. Introduction
2
A. Setting
2
B. History
4
C. Outline
5
II. Many-body quantum systems: entanglement and tensor
networks
7
A. Entanglement structure in quantum Hamiltonians
7
1. Local Reduced Density Matrices
8
2. Area laws for the entanglement entropy
9
B. Tensor networks
10
1. MPS and PEPS
11
2. MPO and PEPO
13
3. Correlations, Entanglement, and the Transfer
Matrix
14
4. Extension to fermionic, continuous and inﬁnite
tensor networks
16
5. Tensor networks as quantum circuits: tree tensor
states and MERA
17
C. The ground state manifold of local Hamiltonians
17
1. States to Hamiltonians: Parent Hamiltonians
18
2. Hamiltonians to states
18
3. Manifold of MPS and TDVP
21
D. Bulk-Boundary Correspondences
22
1. Entanglement spectrum
23
2. Boundary Theory
24
3. Edge Theory
25
E. Renormalization and phases of matter
26
1. Renormalization Fixed Points in MPS
27
2. MPDOs
27
3. Tree Tensor States and MERA
29
4. RG in higher dimensions
29
5. The limit to the continuum
30
III. Symmetries and classiﬁcation of phases
30
A. Symmetries in one dimension: MPS
31
1. Symmetric MPS
31
2. SPT phases and edge modes
33
3. Symmetry breaking: virtual symmetries,
Lieb-Schultz-Mattis, Kramers theorem, topological
excitations
35
4. Fermions and the Majorana chain
37
5. Gauge symmetries
38
6. Critical spin systems: MPO symmetries
38
B. Symmetries in two dimensions: PEPS
42
1. Symmetric PEPS
42
2. Entanglement Spectrum and Edge Modes
46
3. Topological sectors and anyons
47
IV. Formal results: Fundamental Theorems, Hamiltonians
50
A. The Fundamental Theorem of Matrix Product
Vectors
51
1. Overview
51
2. Canonical form and normal tensors
51
3. Basis of normal tensors
52
4. Fundamental Theorem of MPVs
52
B. Fundamental Theorems for PEPS
53
C. Hamiltonians
54
1. Parent Hamiltonians and ground space
54
2. Gaps
57
3. Stability
58
4. Alternative Hamiltonians
59
V. Outlook
60
A. Examples
61
1. One dimension: MPS
61
2. Two dimensions: PEPS
62
3. Fermionic MPS and PEPS
64
4. MPOs and MPUs
65
Acknowledgments
66
References
66
arXiv:2011.12127v2  [quant-ph]  9 Aug 2021

---
*Page 2*

2
I. INTRODUCTION
A. Setting
The many body problem has without a doubt been
the central problem in physics during the last 150 years.
Starting with the discovery of statistical physics, it
was realized that systems with symmetries and many
constituents exhibit phase transitions, and that those
phase transitions are mathematically described by non-
analyticities in thermodynamic quantities when taking
the limit of the system size to inﬁnity.
Quantum me-
chanics added a new level of complexity to the many
body problem due to the non-commutativity of the dif-
ferent terms in the Hamiltonian, but since the discovery
of path integrals it has been realized that the equilibrium
quantum many body problem in d dimensions can be very
similar to the classical many body problem in d + 1 di-
mensions. The (quantum) many body problem has been
the main driving force in theoretical physics during the
last century, and led to a comprehensive framework for
describing phase transitions in terms of (eﬀective) ﬁeld
theories and the renormalization group. The central chal-
lenge of the many body problem is to be able to pre-
dict the phase diagram for physical classes of microscopic
Hamiltonians and to predict the associated relevant ther-
modynamic quantities, order parameters and excitation
spectra. A further challenge is to predict the associated
non-equilibrium behaviour in terms of quantities such as
the structure factors, transport coeﬃcients and thermal-
ization rates.
The main diﬃculty in many body physics stems from
the tensor product structure of the underlying phase
space: the number of degrees of freedom scales expo-
nentially in the number of constituents and/or size of
the system. A central goal in theoretical physics is to
ﬁnd eﬀective compressed representations of the relevant
partition functions or wavefunctions in such a way that
all thermodynamic quantities such as energy, magneti-
zation, entropy, etc. can eﬃciently be extracted from
that description.
A particularly powerful method to
achieve this has since long been perturbative quantum
ﬁeld theory: the many body problem is readily solvable
for interaction-free systems in terms of Gaussians, and
information about the interactive system can then be ob-
tained by perturbing around the best free approximation
of the system. This approach works very well for weakly
interacting systems, but can obviously break down when
the system undergoes a phase transition driven by the
interactions. The method of choice for describing phase
transitions is the renormalization group introduced by
Wilson (Wilson, 1975): here one makes an inspired guess
of an eﬀective ﬁeld theory describing the system of in-
terest, and then performs a renormalization group ﬂow
into the space of actions or Hamiltonians by integrating
out the high energy degrees of freedom. In the case of
gapped systems, such a procedure leads to a ﬁxed point
structure described by topological quantum ﬁeld theory.
The full power of this method is revealed when applied
to gapless critical systems, where it is able to predict uni-
versal information such as the possible critical exponents
at phase transitions. However, the renormalization group
is not well suited for predicting the quantitative informa-
tion needed for simulating a given microscopic Hamilto-
nian, and has severe limitations in the strong coupling
regime where it is not clear how to integrate out the high
energy degrees of freedom without getting a proliferation
of unwanted terms.
To address those shortcomings, a
wide variety of exact and computational methods have
been devised.
In the case of 2-dimensional classical spin systems and
1-dimensional quantum spin systems and ﬁeld theories,
major insights into the interacting many body problem
have been obtained by the discovery of integrable sys-
tems. Integrable systems have an extensive amount of
quasi-local conservation laws, and the Bethe ansatz ex-
ploits this to construct classes of wavefunctions which
exactly diagonalize the corresponding Hamiltonians or
transfer matrices. The solution of those integrable sys-
tems was of crucial importance.
On the one hand, it
showcased the inadequacy of Landau’s theory of phase
transitions for interacting systems and motivated the de-
velopment of the renormalization group. On the other
hand, it showed that the collective behaviour of many
bodies such as spinons exhibits intriguing emergent phe-
nomena of a completely diﬀerent nature as compared to
the underlying microscopic degrees of freedom.
When
perturbing Bethe ansatz solutions and moving to higher
dimensions, it is a priori not clear how much of the un-
derlying structure survives. There are very strong sim-
ilarities between the Bethe ansatz and tensor networks,
and tensor networks can in essence be interpreted as a
systematic way of extending that framework to generic
non-integrable systems.
Computational methods have also played a crucial role
in unravelling fascinating aspects of the many body prob-
lem. Results of exact diagonalization assisted by ﬁnite
size scaling results originating from conformal ﬁeld the-
ory have allowed simulations of a wide variety of spin
systems. However, the infamous exponential wall is pro-
hibitive in scaling up those calculations to reasonably
sized systems for all but the simplest systems, especially
in higher dimensions. A scalable computational method
for classical equilibrium problems is given by Monte Carlo
sampling: experience has taught that typical relevant
Gibbs states have very special properties which allow to
set up rapidly converging Markov chains to simulate a va-
riety of local thermodynamic quantities of those systems.
This is also possible for quantum systems provided that
the associated path integral does not have the so-called
sign problem. Unfortunately, this sign problem shows up
in many systems of interest, especially in the context of


---
*Page 3*

3
frustrated magnets and systems with fermions. A pow-
erful and scalable solution to overcome this problem is
to assort to the variational method: here the goal is to
deﬁned a low-dimensional manifold in the exponentially
large Hilbert space such that the relevant states of the
system of interest are well approximated by states in that
manifold.
The most well known variational class of wavefunc-
tions is given by the class of Slater determinants, and
the corresponding variational method is called Hartree-
Fock. This method works excessively well for weakly in-
teracting systems, and perturbation theory around the
extrema can be done in terms of Feynman diagrams or by
coupled cluster theory. Dynamical information can also
be obtained by invoking the time dependent variational
principle, which can be understood as a least squares
projection of the full Hamiltonian evolution on the vari-
ational manifold of Slater determinants. Alternatively,
the Hartree Fock method can be rephrased as a mean
ﬁeld theory, and dynamical mean ﬁeld theory (DMFT)
extends it by modeling the interaction of a cluster with
the rest of the system as a set of self-consistent equations
of the cluster and a free bath. Although this approach
works well in 3 dimensions, it is not clear how gener-
ally applicable it is to lower dimensional systems. One
of the main diﬃculties for variational methods based on
free systems is the fact that the natural basis for free
systems is the momentum basis: plane waves diagonal-
ize free Hamiltonians, but the natural basis for systems
with strong interactions is the position basis and a phase
transition separates both regimes.
This brings us to the concept of tensor networks: ten-
sor networks are a variational class of wavefunctions
which allows to model ground states of strongly interact-
ing systems in position space in a systematic way. Just
as in the case of (post) Hartree Fock methods, the start-
ing point is a low-dimensional variational class in the
exponentially large Hilbert space. This manifold seems
to capture a very rich variety of quantum many body
states which are ground states of local quantum Hamil-
tonians, both for the case of spins, bosons and fermions.
The deﬁning character of states which can be represented
as tensor networks is the fact that they exhibit an area
law for the entanglement entropy. Time dependent infor-
mation can be obtained by applying the time dependent
variational principle on the manifold of tensor networks,
and spectral information is obtained by projecting the
full many body Hamiltonian on tangent spaces of the
manifold.
The tensor network description can be un-
derstood as a compression of the Euclidean path inte-
gral as used in quantum Monte Carlo, but then with-
out a sign problem. Both the coordinate and algebraic
Bethe ansatz can be reformulated in terms of tensor net-
works, and tensor networks allow for a systematic ex-
ploration of those methods beyond the integrable regime
and 1+1 dimensions. Critical properties can be extracted
in terms of ﬁnite entanglement scaling arguments, and
tensor networks allow for a natural formulation of a real-
space renormalization group procedure as originally en-
visioned by Kadanoﬀ. It also turns out that tensor net-
works provide representations for ground states of a wide
class of Hamiltonians exhibiting topological order, hence
being many body realizations of Topological Quantum
Field Theories (TQFTs), and provide a natural language
for describing the corresponding elementary excitations
(anyons) and braiding properties by providing explicit
representations of associated tensor fusion algebras.
Tensor networks can hence be understood as a sym-
biosis of a wide variety of theoretical and computational
many body techniques.
From our point of view, the
most interesting aspect of it is that it imposes a new
way of looking at quantum many body systems: ten-
sor networks elucidate the need of describing interacting
quantum many body systems in terms of the associated
entanglement degrees of freedom, and the essence of clas-
sifying phases of matter and understanding their essen-
tial diﬀerences is encoded in the diﬀerent symmetries of
the tensors which realize that entanglement structure. In
many ways, tensor networks provide a constructive im-
plementation of the following vision of Feynman (1987):
”Now in ﬁeld theory, what’s going on over
here and what’s going on over there and all
over space is more or less the same. What
do we have to keep track in our functional of
all things going on over there while we are
looking at the things that are going on over
here? . . . It’s really quite insane actually: we
are trying to ﬁnd the energy by taking the ex-
pectation of an operator which is located here
and we present ourselves with a functional
which is dependent on everything all over the
map. That’s something wrong. Maybe there
is some way to surround the object, or the re-
gion where we want to calculate things, by a
surface and describe what things are coming
in across the surface. It tells us everything
that’s going on outside . . . I think it should
be possible some day to describe ﬁeld theory
in some other way than with wave functions
and amplitudes. It might be something like
the density matrices where you concentrate
on quantities in a given locality and in order
to start to talk about it you don’t immedi-
ately have to talk about what’s going on ev-
erywhere else.”
Tensor networks precisely associate a tensor product
structure to interfaces between diﬀerent regions in space,
and the fact that such an interface is always of a dimen-
sion smaller than the original space is a manifestation of
the famous area law for the entanglement entropy. In the
case of 1-dimensional quantum spin chains and quantum


---
*Page 4*

4
ﬁeld theories, this virtual Hilbert space is 0-dimensional,
and the diﬀerent symmetry protected phases of matter
(SPT) can be understood in terms of inequivalent ways
in which the symmetries act on that Hilbert space. For
2-dimensional systems, the interface is 1-dimensional and
provides an explicit local representation for both the en-
tanglement Hamiltonian and the edge modes as appear-
ing in topological phases of matter.
The central goal of this review is to explain how tensor
networks describe many body systems from this entan-
glement point of view, and why it is reasonable to do so.
A recurring theme will be that the manifold of tensor net-
work states parameterizes a wide class of ground states
of strongly interacting systems, and that all the relevant
global information of the wavefunction is encoded in a
single local tensor which connects the physical degrees
of freedom to the virtual ones (that is the entanglement
degrees of freedom). This review does not touch upon
variational algorithms for optimizing tensor networks, as
those topics have been covered, e.g., by Bridgeman and
Chubb (2017); Haegeman and Verstraete (2017); Orus
(2014); Schollw¨ock (2011); Verstraete et al. (2008). For
further reading on the more traditional approaches to
the quantum many-body problem, as discussed in the
previous paragraphs, we refer to the books by Anderson
(2018); Avella and Mancini (2011); Becca and Sorella
(2017); Chaikin et al. (1995); Fradkin (2013); Girvin and
Yang (2019); Shavitt and Bartlett (2009); Wen (2004).
B. History
Let us start with a review of the historic development
of the ﬁeld of tensor networks; this will be complemented
by an outlook on ongoing developments and newly evolv-
ing directions in Section V.
Nishino (2020) has traced back the history of tensor
networks to the works of Kramers and Wannier (1941).
These authors were studying the 2D classical Ising model,
and introduced the concept of transfer matrices (which
are nothing but matrix product operators in the language
of this review) and a variational method for ﬁnding the
leading eigenvector of it by optimizing over a class of
wavefunctions which can be interpreted as precursors of
matrix product states (MPS). Much later, Baxter (1968,
1981, 2007) introduced the formalism of Corner Transfer
Matrices, and realized that the concept of matrix prod-
uct states allowed to make perturbative calculations of
thermodynamic quantities of classical spin systems to
very high order; to prove his point, he calculated the
hard square entropy constant to 42 digits of precision.
Accardi (1981) introduced matrix product states in the
realm of quantum mechanics by describing the wavefunc-
tions associated to quantum Markov chains. The most
famous matrix product state was introduced by Aﬄeck,
Kennedy, Lieb, and Tasaki (1987, the AKLT state), in
an eﬀort to provide evidence for the Haldane conjecture
concerning half-integer vs. integer spin Heisenberg mod-
els. They also wrote down a 2-dimensional analogue of
the AKLT state (Aﬄeck et al., 1988), and provided ev-
idence that it was the ground state of a gapped parent
Hamiltonian. Fannes, Nachtergaele and Werner realized
that the 1D AKLT state was part of a much larger class
of many body states, and they introduced the class of
ﬁnitely correlated states (FCS) which corresponds to in-
jective matrix product states. In a series of groundbreak-
ing papers, they proved that all FCS are unique ground
states of local gapped parent Hamiltonians, and derived a
wealth of interesting properties by exploiting the connec-
tion of MPS to quantum Markov chains (Fannes et al.,
1989, 1991, 1992a, 1994, 1996, 1992b).
Independent of this work in mathematical physics,
White (1992, 1993) discovered a powerful algorithm for
simulating quantum spin chains, which he called the den-
sity matrix renormalization group (DMRG). DMRG rev-
olutionized the way quantum spin chains can be simu-
lated, and provided extremely accurate results for asso-
ciated ground and excited state energies and order pa-
rameters. Nishino and Okunishi (1996) soon discovered
intriguing parallels between DMRG and the corner trans-
fer matrix method of Baxter (1981). Although it was cer-
tainly not envisioned and formulated like that, it turns
out that DMRG is a variational algorithm in the set of
matrix product states (Dukelsky et al., 1998; ¨Ostlund and
Rommer, 1995; Verstraete et al., 2004d). The reason for
the success of DMRG was only understood much later,
when it became clear that ground states of local gapped
Hamiltonians exhibit an area law for the entanglement
entropy (Hastings, 2007), and that all states exhibiting
such an area law can faithfully and eﬃciently be repre-
sented as matrix product states (Verstraete and Cirac,
2006). The family of matrix product states was rediscov-
ered multiple times in the community of quantum infor-
mation theory. First, Vidal devised an eﬃcient algorithm
for simulating a quantum computation which produces at
most a constant amount of entanglement (Vidal, 2003);
it turns out that the same algorithm can be reinterpreted
as a time-dependent version of DMRG, thereby opening
up a whole new set of applications for DMRG (Daley
et al., 2004; Verstraete et al., 2004a; Vidal, 2007a; White
and Feiguin, 2004).
From the point of view of entanglement theory, ma-
trix product states were rediscovered in the context of
quantum repeaters, where it was understood that de-
generacies in the entanglement spectrum such as occur-
ring in the AKLT model lead to novel length scales in
quantum spin systems as quantiﬁed by the localizable
entanglement (Verstraete et al., 2004b,c). A fundamen-
tal structure theorem for matrix product states (Cirac
et al., 2017a; Molnar et al., 2018a; Perez-Garcia et al.,
2008b) has clariﬁed such degeneracies as being the con-
sequence of the presence of projective representations in


---
*Page 5*

5
the way the entanglement degrees of freedom transform
under physical symmetries, and this has led to the clas-
siﬁcation of all possible symmetry protected topological
phases (SPT) for 1D quantum spin systems (Chen et al.,
2011a; Pollmann et al., 2012; Schuch et al., 2011).
Soon after the study of localizable entanglement in ma-
trix product states in 2003, a two-dimensional version of
MPS was introduced, and it was realized that the en-
tanglement degrees of freedom can play a fundamental
role by demonstrating that measurement based quantum
computation (Raussendorf and Briegel, 2001) proceeds
by eﬀectively implementing a standard quantum circuit
on those virtual degrees of freedom (Verstraete and Cirac,
2004b). Those states were subsequently called projected
entangled pair states (PEPS), and it was quickly under-
stood that the corresponding variational class provides
the natural generalization of MPS to 2 dimensions in
the sense that they parameterize states exhibiting an
area law and that there is a systematic way of increas-
ing the bond dimension, i.e., the number of variational
parameters (Verstraete and Cirac, 2004a). Subclasses of
PEPS states were considered before: the 2D AKLT state
was studied by Aﬄeck et al. (1988); Richter and Werner
(Richter, 1994) introduced and studied a 2D general-
ization of FCS based on isometric tensors; Niggemann,
Kl¨umper, and Zittartz (1997) studied a 2D PEPS where
the tensors satisﬁed the Yang-Baxter equation; Sierra
and Martin-Delgado (1998), and Nishino and collabora-
tors (Maeshima et al., 2001; Nishino et al., 2004) intro-
duced a generalization of MPS to 2D where the tensors
could be interpreted as Boltzmann weights of a vertex
model.
Just as in the 1D case, entanglement theory was the
key in formulating this ansatz in full generality. This led
to the introduction of variational matrix product state
algorithms for optimizing PEPS (Verstraete and Cirac,
2004a) and inﬁnite versions of it (Jordan et al., 2008). It
was found that PEPS form a very rich class of wavefunc-
tions, and a plethora of interesting quantum spin liq-
uid states were written in terms of PEPS tensors: the
resonating valence bond states (RVB) of Anderson, the
toric code state of Kitaev, and any ground state of a local
frustration-free commuting quantum Hamiltonian (Ver-
straete et al., 2006) such as any ground state of stabilizer
Hamiltonians (Verstraete and Cirac, 2004b) or string nets
(Buerschaper et al., 2009). In (Gu et al., 2008; Gu and
Wen, 2009), it was realized that the local symmetries
of the tensors are of primordial importance for describ-
ing long range topological order, and in (Schuch et al.,
2011) this was formalized by the crucial concept of G-
injectivity and later by the more general concept of ma-
trix product operator (MPO)-injectivity (Bultinck et al.,
2017; S¸ahino˘glu et al., 2014). This opened the way of
simulating systems exhibiting topological quantum order
and the associated anyons in terms of tensor networks.
Similarly, tensor networks and the associated local sym-
metries turned out to provide a very natural language for
describing SPT phases in 2D (Buerschaper, 2014; Chen
et al., 2013; Williamson et al., 2016).
In a diﬀerent development, Vidal (2007b, 2008) discov-
ered the multiscale entanglement renormalization ansatz
(MERA). This generalizes tree tensor networks (TTNs),
yet another type of tensor network that naturally arises in
the context of real space renormalization (Fannes et al.,
1992c; Murg et al., 2010; Shi et al., 2006; Silvi et al.,
2010).
Unlike MPS, MERA and TTNs are meant to
describe scale invariant wavefunctions, and capture the
scale invariance exhibited in conformally invariant theo-
ries by a real space construction of scale invariant tensors.
The full richness of MERA is only starting to be explored,
but extremely intriguing connections with e.g. AdS/CFT
and operator product expansions (Evenbly and Vidal,
2016; Pfeifer et al., 2009) have been uncovered.
We
will only discuss a few limited aspects of MERA here
in the context of the holographic principle and renormal-
ization, and refer to Evenbly and Vidal (2014) for a full
review. Finally, let us remark that ideas from renormal-
ization have also led to a range of renormalization-based
algorithms for tensor network contraction, such as the
Tensor Renormalization Group (TRG), the Tensor En-
tanglement Renormalization Group (TERG), or Tensor
Network Renormalization (TNR) (Evenbly, 2017; Even-
bly and Vidal, 2015; Gu et al., 2008; Jiang et al., 2008;
Levin and Nave, 2007; Xie et al., 2012, 2009; Zhao et al.,
2010).
C. Outline
There already exists an extensive literature on the ap-
plication of the diﬀerent kind of tensor networks (TN)
to quantum many-body systems. While there are many
reviews on that topic (Biamonte, 2019; Bridgeman and
Chubb, 2017; Cirac and Verstraete, 2009; Hallberg, 2006;
Orus, 2014; Schollw¨ock, 2005, 2011; Verstraete et al.,
2008) the vast majority focus on the practical aspects
of tensor networks; in particular, on how to use them in
numerical computations in order to approximate ground,
thermal equilibrium or dynamical states corresponding
to Hamiltonians deﬁned on lattices. However, as it has
been emphasized above, tensor networks have also been
key to the description or even discovery of a wide vari-
ety of physical phenomena, as well as to construct simple
examples displaying intriguing properties. This has been
achieved through the development of a theory of tensor
networks. The present paper aims at reviewing such a
theory, including both core results and their applications.
We will concentrate on translational invariant systems
in 1- and 2-dimensional lattices, since most of the analyt-
ical results have been obtained for such systems. We no-
tice, however, that many of the results covered in this re-
view extend naturally to higher spatial dimensions, other


---
*Page 6*

6
lattice geometries, and also to the non-translational in-
variant case.
This restriction, in the context of TN,
implies that a single tensor, A, encapsulates the phys-
ical properties of the many body system.
As we will
see, quantum states as well as operators (eg, character-
izing mixed states, Hamiltonians, or dynamics) are con-
structed in terms of such tensors. For states (operators),
the restriction to translationally invariant systems also
implies that we will focus this review on MPS (MPOs)
and PEPS (PEPOs). Basic questions we will address are:
Is this construction unique – that is, can two tensors give
rise to the same state or operator? If they do, what is
the relation between those tensors? How are the physical
properties of the states encoded in the tensor? For in-
stance, how do the local symmetries of the tensors reﬂect
local and/or global symmetries, or topological order? Or
vice-versa, how are the symmetries in the tensor reﬂected
in the physical properties of the many-body state, or in
the dynamics it describes? There are many other ques-
tions that have been resolved in the last years about ten-
sor networks, and it would be impossible to cover them in
detail in this review. We will nevertheless go over most
of them, and give the original references where they can
be found. Apart from that, the reader may also want to
consult Zeng et al. (2019) which complements in many
aspects this review.
This review is organized in four sections and an ap-
pendix. Section II motivates the use of TN to describe
quantum many-body systems, introduces diﬀerent TN,
and analyzes some of the most relevant properties. The
basic structure of TN stems from the entanglement struc-
ture of the ground states of many-body Hamiltonians ful-
ﬁlling an area law, which basically dictates that they ex-
hibit very little entanglement in comparison to typical
states. Tensor networks provide us with eﬃcient ways of
describing systems with small amounts of entanglement,
and they are thus ideally suited for parameterizing states
satisfying an area law. We will introduce the basic no-
tions of MPS for 1D systems, and their generalization to
higher dimensions, PEPS. We also consider the fermionic
versions of those TN states, where the physical systems
are fermionic modes. While most of the review concerns
pure states, we include some analysis for mixed states
and evolution operators, and for that purpose we also in-
troduce matrix product operators (MPOs) and projected
entangled pair operators (PEPOs). Even though we fo-
cus our attention to translational invariant systems, we
will brieﬂy mention some connections between MPS and
MERA, as they both can be viewed as being created
by special quantum circuits. We also argue that MPS
and PEPS not only approximate ground states of local
Hamiltonians, but for any of them one can ﬁnd a spe-
cial (set of) Hamiltonian(s), the so-called parent Hamil-
tonian, which is frustration-free and for which they are
the exact ground states. In particular, we list the con-
ditions under which the Hamiltonian is degenerate, and
also discuss how to describe low-energy excitations. Next
we discuss an intriguing property of PEPS, namely that
one can explicitly build a bulk-boundary correspondence
with them. That is, for any region of space it is always
possible to deﬁne a state which encodes all the physical
properties of the ﬁrst, but lives in a smaller spatial di-
mension. This is a version of the holographic principle
and enables the use of dimensional reduction, meaning
that one can fully characterize the properties of PEPS
by a theory that is deﬁned in the boundary.
We ﬁn-
ish this section by introducing a very powerful technique
in the TN context, namely renormalization. The basic
idea is to block tensors into others that can be assigned
to blocks of spins, in much the same way as real space
renormalization is used in statistical physics. The ﬁxed
point of such a procedure gives rise to very special TN,
that can be viewed as the ones that appear if one looks
at big scales. They have a simple form, so that one can
very easily deal with them and apply them, for instance,
to the classiﬁcation of phases of gapped Hamiltonians.
This procedure can be applied to pure or mixed states,
as well as unitary operators.
Section III analyzes how the symmetries of the ten-
sor generating a MPS or PEPS can be associated to the
symmetries of the states they generate, or to their topo-
logical order. This statement leads to one of the most
celebrated successes of tensor networks, namely the clas-
siﬁcation of phases by relating those to the representa-
tions of the symmetries of the tensors generating them.
In the case of global symmetries, this leads to symmetry
protected phases (SPT), whereas topological phases are
characterized by purely virtual symmetries.
The com-
bination of those results can also be used to character-
ize symmetry enriched phases (SET) for TN. Attending
to the (global) symmetries of the states with a certain
symmetry group, the generating tensor also possess that
symmetry, with the same symmetry group but with a
representation that is possibly projective. This is why
the classiﬁcation of SPT phases are intimately related to
the corresponding cohomology classes.
Topological or-
der, however, is related to purely virtual symmetries of
the tensor, and we will discuss how those virtual sym-
metries give rise to notions such as topological entangle-
ment entropy and anyons. We also consider local gauge
symmetries, and ways of gauging a global into a local
symmetry within the language of TNs.
Section IV is more mathematical and contains a re-
view of the basic theorems of MPS and PEPS. Of partic-
ular importance is the so-called Fundamental Theorem,
which lists the conditions under which two tensors gener-
ate the same state. This theorem is widely used in many
of the analytical results obtained for TN, such as in the
characterization of the ﬁxed points of the renormaliza-
tion procedure of Section II, and in the classiﬁcation of
symmetries and phases of Section III. It implies that the
same states can be generated by many tensors, so it is


---
*Page 7*

7
very useful to ﬁnd a canonical form, namely a speciﬁc
property of the tensor we can demand such that it is
basically uniquely associated to the state. While this is
possible for MPS, and a full theory for such a canonical
form and fundamental theorem exists, the situation for
PEPS is not yet complete, and we discuss the state of
the art.
Finally, we collect a number of prototypical examples
of MPS and PEPS appearing in the context of quantum
information and/or condensed matter theory in the ap-
pendix.
II. MANY-BODY QUANTUM SYSTEMS:
ENTANGLEMENT AND TENSOR NETWORKS
A. Entanglement structure in quantum Hamiltonians
A central feature of many-body quantum systems is the
fact that the dimension of the associated Hilbert space
scales exponentially large in the number of modes or par-
ticles in the system. The natural way of describing ma-
terials, atomic gases or quantum ﬁeld theories exhibiting
strong quantum correlations is to discretize the continu-
ous Hilbert space by deﬁning a lattice and an associated
tensor product structure for the modes which represent
localized orbitals such as Wannier modes. Such systems
can therefore be described in terms of an eﬀective Hamil-
tonian acting on a tensor product of these local modes. In
the case of bosons, one can typically restrict the local oc-
cupation number to be bounded (let’s say d-dimensional),
such that we get a Hilbert space of the form ⊗N
k=1Cd. In
the case of fermions, the tensor product has to be altered
to a graded tensor product.
In this review, we will mainly consider local transla-
tionally invariant quantum spin Hamiltonians deﬁned on
a lattice with the geometry of a ring or torus of the form
H =
N
X
i=1
hi,n ,
where hi,n is a local observable centered at site i, and
acting nontrivially only on the n−1 closest sites of i. As
an example, a nearest neighbor Hamiltonian such as the
Heisenberg model has n = 2. As n is ﬁnite, it is always
possible to block several sites together such that hi,n is
acting only on next nearest neighbors according to the
underlying lattice. We will be mostly interested in the
ground state and the lowest energy excitations of such a
Hamiltonian in the thermodynamic limit N →∞.
The gap, ∆, plays an important role in such spin sys-
tems. It measures the energy diﬀerence of the ﬁrst ex-
cited state and the ground state. If it vanishes in the
thermodynamic limit N →∞we say that the Hamil-
tonian is gapless and otherwise gapped. The ﬁrst case
occurs for critical systems, wheres the latter implies the
existence of a ﬁnite correlation length.
Just as in quantum ﬁeld theories, the central object
of interest in strongly correlated quantum spin systems
is the ground state or vacuum, as the quantum features
are most pronounced at low temperatures. The vacuum
quantum ﬂuctuations hold the key in unraveling the low
temperature properties of the material of interest, and
the structure of the ground state wavefunction dictates
the features of the elementary excitations or particles
which can be observed in experiments. Determining the
smallest eigenvector of an exponentially large matrix is
in principle an intractable problem.
Even a relatively
small system, such as a 2D Hubbard model with 12 × 12
sites, has a Hilbert space of dimension 2288 ≈5 × 1086,
which is much larger than the number of baryons in the
universe, and hence writing down the ground state wave-
function as a vector is an impossible feat. The key which
allows us to circumvent this impasse is to realize that
the matrices corresponding to Hamiltonians of quantum
spin systems are very sparse due to the fact that they ex-
hibit a tensor product structure and are deﬁned as a sum
of local terms with respect to this tensor product. This
will force the ground state to have a very special struc-
ture, and tensor networks are precisely constructed to
take advantage of that structure. Equally importantly,
the locality of the Hamiltonian forces the other eigen-
vectors with low energy to be simple local perturbations
of the ground state (Haegeman et al., 2012b), and this
feature is responsible for the existence of localized ele-
mentary excitations which we observe as particles, and
hence for the fact that the ground state is such a rel-
evant object even if the system under consideration is
not at zero temperature. This has to be contrasted to
a generic eigenvalue problem where knowledge of the ex-
tremal eigenvector does not give any information about
the other eigenvectors except for the fact that they are
orthogonal to it. Without locality, physics would be wild.
The locality and tensor product properties of the
Hamiltonians from which we want to determine the ex-
tremal eigenvectors are clearly the keys to unravelling
the structure of the corresponding wavefunctions. This
tensor product structure and locality also play the cen-
tral role in the ﬁeld of quantum information (Nielsen
and Chuang, 2000) and entanglement theory (Horodecki
et al., 2009), whose original aim was to exploit quantum
correlations to perform novel information theoretic tasks.
The study of entanglement theory introduced a new way
of quantifying quantum correlations in terms of elemen-
tary units of entanglement (ebits), and of describing local
operations which transform states into each other. The
key insight in entanglement theory has been the fact that
any pure bipartite states with an equal amount of entan-
glement (as measured by the entanglement entropy) can
be converted into each other by local quantum opera-
tions and classical communication (Bennett et al., 1996).
These fundamental facts of the theory of entanglement
were the original inspiration for deﬁning tensor networks:


---
*Page 8*

8
ground states of local Hamiltonians turn out to exhibit an
area law for the entanglement entropy, just as entangled
pairs of particles distributed among nearest-neighbours
on a lattice have. There should therefore exist local op-
erations which transform both sets of states into each
other. This construction precisely gives rise to the classes
of matrix product states (MPS) and projected entangled
pair states (PEPS), which are the main characters of this
review.
1. Local Reduced Density Matrices
The energy of a wavefunction with respect to a local
Hamiltonian is completely determined by its marginal or
local reduced density matrices ρi,n deﬁned as the density
matrix obtained by tracing out all degrees of freedom out-
side of the region n around site i: E = P
i Tr

hi,nρi,n

.
In the case of a translationally invariant Hamiltonian and
a unique ground state, the ground state inherits all sym-
metries of the Hamiltonian, including the translational
invariance, and hence we can drop the dependence on i
and the ground state energy Tr [hnρn] is a linear func-
tional in the reduced density matrix ρn. The question
of ﬁnding ground states is hence equivalent to ﬁnding a
many-body state whose marginal is extremal with respect
to hn. The set of all possible marginals of translation-
ally invariant quantum many-body states is convex. Any
state whose marginal is an extreme point in this convex
set must hence be the ground state of a local Hamil-
tonian deﬁned by the tangent plane on that convex set.
The ground state problem is therefore equivalent to char-
acterizing the set of all possible extremal points of local
reduced density matrices. The problem would hence eas-
ily be solved if such a characterization were possible, but
this problem is known as the N-representability problem
(Coleman, 1972) and is well known to be intractable for
generic systems (Liu et al., 2007).
The important message however is that ground states
are very special: they have extremal local reduced density
matrices, and all the global features such as correlation
length, possible topological order, and types of elemen-
tary excitations, follow from this local extremality condi-
tion. In other words: these global features emerge from
the requirement that the local reduced density matrix is
an extreme point in the set of all possible reduced density
matrices compatible with the symmetries of the system.
It will turn out that these extremal points can only cor-
respond to states with very little entanglement, and all
of them satisfy an area law for the entanglement entropy
(Verstraete and Cirac, 2006; Zauner et al., 2016).
It is instructive to consider the example of the Heisen-
berg spin
1
2 antiferromagnetic Hamiltonian P
⟨i,j⟩⃗Si⃗Sj
where the sum is restricted to nearest neighbors, and
the ⃗S = (Sx, Sy, Sz) are the standard spin operators. If
we only consider 2 sites, then the ground state is obvi-
ously equal to the spin singlet, which is maximally en-
tangled, and with associated energy −1.
The case of
a chain of N sites is much more complicated: due to
the non-commutativity, it is impossible to ﬁnd a state
whose ground state energy is equal to −1 per interac-
tion term.
This non-commutativity leads to “frustra-
tion”: the closer the reduced density matrix of e.g. sites
1 and 2 is to a singlet, the further it will have to be
from a singlet for the reduced density matrices of sites
2 and 3. This eﬀect can also be understood in terms of
the monogamy property of entanglement (Terhal, 2004):
a spin 1
2 has only the capacity of 1 ebit of entanglement
(an ebit being deﬁned as the amount of entanglement in a
maximally entangled state of two spin 1
2 systems (Nielsen
and Chuang, 2000)), and if it has to share this 1 ebit with
its neighbors, the corresponding reduced density matri-
ces will have at most 1
2 ebit of entanglement. The more
neighbors a spin has, the less entanglement it can share
with each individual one. This can be formalized in the
quantum de Finetti theorem and is the reason that mean
ﬁeld theory becomes exact in high dimensionsal lattices
(Brandao and Harrow, 2016; Raggio and Werner, 1989).
This is also the reason that one and 2D systems exhibit
some of the most interesting quantum eﬀects: in general,
the marginals of quantum many-body states in 3D lat-
tices are already well approximated by the ones obtained
by product or mean ﬁeld solutions, while this is not the
case for low dimensional systems.
The physics of ground states is completely determined
by the competition between translational invariance and
extremal local reduced density matrices (for the case of
the Heisenberg model, the density matrices will be as
close as possible to the singlet). Monogamy of entangle-
ment is precisely the property which gives rise to interest-
ing physics: in the case of classical statistical mechanics,
the competition of energy versus entropy gives rise to co-
operative phenomena and phase transitions. In the quan-
tum case, the non-commutativity of the diﬀerent terms
in the Hamiltonian leads to monogamy, which plays a
similar role and makes such phase transitions possible at
zero temperature.
The key to uncover the structure of ground states of
local Hamiltonians is to understand how the entangle-
ment is shared between the diﬀerent degrees of freedom.
Intuitively, for a given spin it is of no use to have strong
correlations with far away spins, as this will only bring
marginals further away from the extremal points. The
strongest (quantum) correlations it needs to have are
with those spins with which the Hamiltonian forces it
to interact, namely the nearest neighbors. We can hence
imagine that the entanglement between a bipartition of
a big system in two regions is proportional to the sur-
face between them, and this area law for entanglement is
exactly what is going on in ground states.
In summary: ground states of local Hamiltonians of
quantum spin systems are in one to one correspondence


---
*Page 9*

9
with states whose reduced density matrices are extremal
points within the set of all possible reduced density ma-
trices with a given translational symmetry. This property
forces the entanglement to be localized, giving rise to an
area law.
2. Area laws for the entanglement entropy
Let us consider a quantum spin system with a local
quantum Hamiltonian and ground state |ψ⟩, and a bi-
partition of the quantum spin system into two connected
regions, A and B, such that ρA and ρB are the reduced
density matrices of the ground state in these regions. The
entanglement entropy (Bennett et al., 1996)
S(ρA) = −Tr[ρA log(ρA)] = S(ρB)
(1)
quantiﬁes the amount of quantum correlations between
the two regions, and as argued in the last section, this
quantity is expected to be proportional to the surface of
the boundary between the two regions, ∂A, and hence
called the area law for the entanglement entropy (Eisert
et al., 2010). This area law should be contrasted to the
volume law exhibited by random states in the Hilbert
space: quantum states exhibiting an area law for the
entanglement entropy are very special; such states are
hence very atypical, and it will be possible to represent
them using tensor networks.
The origins of the area law can be traced back to stud-
ies of the entanglement entropy in free quantum ﬁeld the-
ories (Holzhey et al., 1994), where the ensuing area laws
were related to the Bekenstein-Hawking black hole en-
tropy (Bekenstein, 1973). Area laws can rigorously be
demonstrated for free bosonic (Plenio et al., 2005) and
fermionic systems (Gioev and Klich, 2006; Wolf, 2006),
modulo some logarithmic corrections in the presence of
Fermi surfaces.
They can also be proven in case that
correlations (deﬁned in terms of the mutual information)
between two arbitrary regions decay suﬃciently fast with
the distance independently of their sizes (Wolf et al.,
2008).
For interacting quantum systems at ﬁnite temperature
T and described by Gibbs states ρ ∝exp(−H/T), an
area law for the mutual information
I(A : B) = S(ρA) + S(ρB) −S(ρ) ≤c|∂A|
T
has been proven by Wolf et al. (2008) for any local Hamil-
tonian in any dimension as long as all terms in the Hamil-
tonian are bounded from above. Here |∂A| denotes the
number of spins in the boundary ∂A between region A
and B. Recently, Kuwahara et al. (2021) have improved
the temperature-dependence of this bound to diverge as
T 2/3.
It is much harder to prove the area law for ground
states of interacting quantum spin systems, although
there is plenty of evidence supporting that claim. In the
case of gapped quantum spin chains in one dimension,
a remarkable theorem has been formulated by Hastings
(2007) proving the area law which was later strengthened
by Arad, Kitaev, Landau, and Vazirani (2013): given
a local Hamiltonian of a quantum spin chain of N d-
dimensional spins whose gap is given by ∆, then the
entanglement entropy in the ground state is bounded
above by O
 (log d)3/∆

for any bipartite cut into two
connected regions (see Kuwahara and Saito (2020) for
a generalization to long-range interactions). Note that
this means that the entanglement entropy saturates in
the thermodynamic limit for the case of a gapped sys-
tem. In the case of a critical quantum spin chain where
the gap vanishes as O(1/N) or faster, this bound yields
a volume law, though it seems that nature is much more
economical and for all critical spin chains described by
a conformal ﬁeld or a Luttinger liquid theory, the actual
entanglement entropy is exponentially smaller and scales
as O(log(L)) for a region A of length L ≤N/2. When the
gap is allowed to vanish must faster as a function of the
system size, examples were constructed that saturate the
volume law, and hence give rise to novel phase transitions
from bounded to extensive entanglement (Movassagh and
Shor, 2016; Zhang et al., 2017).
Much more precise information about the nature of
the entanglement in a system can be obtained by looking
at the entanglement spectrum (Li and Haldane, 2008),
deﬁned as the logarithm of the set of eigenvalues of the
reduced density matrix λi(ρA). The Schmidt coeﬃcients
are the square roots of these eigenvalues, and the con-
vention is to order them in decreasing order. In the case
of gapped integrable spin chains in the thermodynamic
limit, these Schmidt coeﬃcients decay as exp(−αn) with
n ∈N, α a constant, and a degeneracy a(n) equal to
the number of ways to partition n in sums of unequal
integers (Peschel et al., 1999). Asymptotically, we have
a(n) = O

exp(π
p
n/3)/n3/4
. This result can be ob-
tained by calculating the eigenvalues of the corner trans-
fer matrix, which is a discrete version of the boost oper-
ator HMod as used in quantum ﬁeld theory to calculate
the entanglement entropy. For critical systems described
by a CFT, the largest Schmidt coeﬃcient seems to en-
code the information about the full entanglement entropy
(Orus et al., 2006).
Alternatively, Renyi entropies Sα(ρ) =
1
1−α log Tr (ρα)
with α ≥0 can be used to characterize the decay of the
Schmidt coeﬃcients. These Renyi entropies are mono-
tonically decreasing as a function of α; S0(ρ) measures
the rank of ρ, and the ones with 0 ≤α < 1 will be of
particular importance for the description of matrix prod-
uct states. Improving results and techniques from (Hast-
ings, 2007) and (Landau et al., 2013), Huang proved in
(Huang, 2014) that the ground state α-Renyi entangle-
ment entropy in gapped 1D systems is upper bounded by


---
*Page 10*

10
˜O(α−3/∆), where ˜O stands for O up to logarithmically
smaller factors. More speciﬁcally, it was demonstrated
that the residual probability ϵ(D), deﬁned as the sum of
all eigenvalues of the reduced density matrix smaller than
the D′th largest one, scales as exp

−c.∆1/3 [log(D)]4/3
for a general spin chain with gap ∆(Arad et al., 2013).
For integrable systems and systems in the scaling regime
of a conformal ﬁeld theory, a faster decay in the form
of ϵ(D) ≃exp(−c. [log(D)]2) is obtained (Calabrese and
Lefevre, 2008; Verstraete and Cirac, 2006).
For higher dimensional quantum spin systems, no gen-
eral proofs of an area law for ground states exist.
It
is believed that: (i) Gapped systems always exhibit an
area law for the entanglement entropy; (ii) Critical sys-
tems without a Fermi surface also satisfy an area law, but
get additive logarithmic corrections; (iii) Critical systems
with a Fermi surface exhibit an entanglement entropy
scaling as |∂A| log |∂A|, which is marginally larger than
the area law scaling.
In two dimensions, additive corrections also pop up for
systems exhibiting topological quantum order. For a re-
gion with a perimeter L and ignoring corner eﬀects, the
entanglement entropy scales like cL −log(D) with D the
total quantum dimension of the underlying anyonic the-
ory. As this quantum dimension is always larger than
1, topologically ordered systems have less entanglement
than the ones in a trivial phase. This indicates that a
topologically ordered system exhibits a certain symme-
try which reduces the support of the local reduced den-
sity matrix; it will turn out that such symmetries are
naturally described by matrix product operators.
B. Tensor networks
We will now deﬁne diﬀerent types of states and op-
erators that can be expressed as tensor networks, and
analyze their basic properties. Although most of this re-
view will focus on translational invariant states of spin
lattices and thus MPS and PEPS will be the main ac-
tors, we will also introduce their extension to fermionic
systems and make connections to other sets of states like
Tree Tensor Networks (TTN) and MERA.
The discussion on local reduced density matrices made
clear that ground states of local quantum Hamiltonians
are completely moulded by their desire to have extremal
local correlations, on the one hand, and to preserve lattice
symmetries, on the other. The discussion on area laws
for the entanglement entropy made clear that the entan-
glement between two neighboring regions is mainly con-
centrated on the interface between the two regions. The
same entanglement pattern can be obtained by distribut-
ing maximally entangled pairs of D-dimensional spins be-
tween all nearest neighbors, and then doing a local pro-
jection (or a general linear map) on all these local spins to
obtain one d-dimensional spin. This projection involves
|φ)
A
FIG. 1 Construction of projected entangled pair states on a
2D lattice.
a linear map from a Hilbert space of Ni D-dimensional
spins to a d-dimensional spin, with Ni the coordination
number of the lattice at site i, and any such linear map
can be represented by a tensor Ai
α1α2···αN . Translational
invariance is obtained if the lattice has periodic boundary
conditions and the same projection is chosen on all lattice
sites. This construction, illustrated in Figure 1, deﬁnes
the class of projected entangled pair states (PEPS) with
bond dimension D, and the diﬀerent states in that fam-
ily can be obtained by choosing diﬀerent projections A.
Below we will give a more precise description of PEPS,
and connect them to tensor networks.
This PEPS construction yields quantum many-body
states which have strong local correlations, exhibit the
translational symmetry of the underlying lattice, and
obey an area law for the entanglement entropy with re-
spect to any bipartition. Furthermore, extra symmetries
such as global U(1) or SU(2) symmetries can easily be in-
corporated by deﬁning tensors which transform accord-
ing to some representation of the corresponding group
(Perez-Garcia et al., 2010; Singh et al., 2010). All those
properties are highly nontrivial, and it is especially hard
to write down entangled translationally invariant wave-
functions without using the projected entangled pair con-
struction.
Conceptually, PEPS present a way of parameterizing
interesting many-body wavefunctions on any lattice with
a constant coordination number using a number of pa-
rameters which is independent of the system size (at least
for translationally invariant states). They hence provide
a way of writing down a nontrivial wavefunction in an
exponentially large Hilbert space in a compressed form.
Of course, this has to come as no surprise. Both prod-
uct states and Slater determinants provide ways of writ-
ing down wavefunctions in an exponentially large Hilbert
space using a few parameters. The main diﬀerence, how-
ever, is the fact that the PEPS construction can represent
a wide variety of ground states of strongly interacting sys-
tems. Being able to represent such wavefunctions has the
potential of cracking open some of the hardest problems
in many-body physics.
In the case of 1D spin chains, this PEPS construction
deﬁnes the class of matrix product states (MPS). The
area law for entanglement allows to demonstrate that
any ground state of a gapped quantum spin chain can be
represented eﬃciently using such an MPS (Arad et al.,


---
*Page 11*

11
2013; Hastings, 2007); and vice versa, that any MPS is
the ground state of a local gapped Hamiltonian (Fannes
et al., 1992b; Perez-Garcia et al., 2007). Similarly, a wide
class of correlated many-body systems in higher dimen-
sions can be represented using PEPS (Buerschaper et al.,
2009; Verstraete et al., 2006), and the main topic of this
review is to report on the mathematical properties of the
manifolds of MPS and PEPS and the relevance for the
physical properties and classiﬁcation of strongly corre-
lated systems. In a nutshell, the manifold of MPS and
PEPS form very rich classes of many-body systems, and
provide a unique window into the physics of strongly cor-
related quantum many-body systems, both from the the-
oretical and computational point of view.
1. MPS and PEPS
We will now introduce PEPS for an arbitrary lattice
and then particularize the deﬁnition to one spatial dimen-
sion to obtain MPS. Let us consider a lattice with N ver-
tices, V = {1, 2, . . . , N}, and a set of edges, E, connecting
them. We consider a spin at each vertex, with a corre-
sponding Hilbert space Cdi of dimension di. Our goal is
to construct states of these spins, i.e. |ψ⟩∈⊗N
i=1Cdi.
The elements e ∈E are pairs of vertices; for in-
stance, e = (1, 2) represents the edge connecting ver-
tices 1 and 2.
We will further denote by Si ⊂V the
set of vertices that are connected to the vertex i, i.e.
Si = {j ∈V , s.t. (i, j) ∈E} with zi = |Si| the coor-
dination number.
To construct |ψ⟩, we ﬁrst assign to
each vertex i, several auxiliary spins (one for each edge
connecting that vertex to another one) that are in a max-
imally entangled states with their neighbors. More ex-
plicitly, for each i ∈V and j ∈Si we denote by ai,j the
ancilla, which has an associated Hilbert space CDi,j with
dimension Di,j = Dj,i ∈N. To distinguish states of the
auxiliary spin from the physical ones, we use the notation
|·), as opposed to |·⟩. The ancillas ai,j and aj,i form a
maximally entangled state
|φ)i,j =
Di,j
X
n=1
|n)ai,j ⊗|n)aj,i ,
(2)
where the {|n)} form an orthonormal basis; note that
this ﬁxes a preferred basis, making the objects in the
construction basis-dependent. Thus, the state of the an-
cillas is
|Φ) =
O
e∈E
|φ)e .
(3)
Next, to each vertex i, we assign a linear map
A[i] :
O
j∈Si
CDi,j →Cdi .
We deﬁne the PEPS as
|ψ⟩=
O
i∈V
A[i] |Φ)
(4)
That is, the state is obtained by a linear map of the en-
tangled pairs of ancillae into the physical spins at each
vertex, cf. Fig. 1. The ﬁnal state will in general be entan-
gled, since the entanglement in the ancillae is transferred
to the spins through the mapping. This entanglement can
lead to long-range correlations, even though the ancillae
are only entangled locally. This is a simple consequence
of entanglement swapping, which allows to entangle re-
mote particles by a sequence of projections on entangled
pairs. Note that the whole state is completely determined
by the maps A[i]: since each of them is characterized by
pi = di
Q
j∈Si Di,j parameters, we just need P
i∈V pi pa-
rameters to specify the state.
The map A[i] is characterized by the coeﬃcients in a
basis:
As
α1,...,αzi = ⟨s|A[i]|α1, . . . , αzi)
(5)
and thus, by a tensor (whose entries depend on the basis
choice). We will indistinguishably call A map or tensor
in the following. A concept that will play a chief role
in this review is injectivity and its generalizations: we
say that the tensor A[i] is injective if the corresponding
map is injective; that is, if there exists another map,
A[i]−1 : Cdi →N
j∈Si CDi,j such that A[i]−1A[i] = 11.
There are other equivalent ways of deﬁning PEPS that
will be used later on. One particularly interesting one
consists of associating to each vertex i ∈V a ﬁducial
state, |φi⟩, of the spin and the virtual system (i.e., |φi⟩∈
Cdi ⊗j∈Si CDi,j), and deﬁne the PEPS to be
|ψ⟩= ⟨Φ|
h N
i∈V
|φi⟩
i
.
(6)
This state coincides with the one above if we write
|φi⟩=
X
s,α1,...,αzi
As
α1,...,αzi|s⟩⊗|α1, . . . , αzi⟩
(7)
and choose as As
α1,...,αzi the elements of the map A[i]
in the physical (|s⟩) and virtual (|αj⟩) basis.
In this
case, the ﬁducial states |φi⟩completely determine the
many-body state. Finally, yet another equivalent deﬁni-
tion is obtained by replacing the state |φ) of the ancillas
in Eqs. (2,3) by some tri- or multipartite local states –
such an ansatz is yet again equivalent to the original con-
struction, but can be advantageous e.g. in the numerical
simulation of frustrated spin systems (Schuch et al., 2012;
Xie et al., 2014).
Although the above construction applies to any lat-
tice, we will exclusively consider regular lattices, with
the same coordination number and the same physical di-
mension at each vertex (zi = z and di = d). We will


---
*Page 12*

12
call d the physical dimension. We will be particularly
interested in square lattices in 2 dimensions, or in 1D
lattices, where we recover MPS. In the ﬁrst case, we will
use the convention in the tensors (5) that α1, . . . , α4 are
taken clockwise (top, right, down, left). In the latter, it
is useful to deﬁne matrices Asi[i] ∈CDi−1,i⊗Di,i+1 with
elements Asi
αβ[i], and the above expression is equivalent
to
⟨s1, s2, . . . |ψ⟩= Tr [As1[1]As2[2] · · · AsN [N]] .
(8)
Every probability amplitude is given by the trace of a
product of N matrices, hence the name Matrix Product
State (MPS).
In regular lattices,
translationally invariant (also
named uniform) states are obtained by choosing the same
map at every site, A[i] = A and thus Di,j = D, the bond
dimension. By construction, it is clear that the PEPS
is invariant under translations. For any lattice size, the
state is completely determined by a single map, A or,
equivalently, a single tensor. We will say that the ten-
sor A generates the state |ψ(A)⟩. Thus, we can associate
to any tensor A a set of states |ψ(A)N⟩corresponding
to each lattice size. This map from a tensor to a set of
states is not one-to-one, which will be the basis for many
of the features of MPS and PEPS descriptions. Apart
from that, note that all the physical properties (like crit-
icality, symmetries, topological order, etc.) of the states
are completely determined by A, and thus are somehow
encoded in that tensor. A main goal of the theory of ten-
sor networks is to obtain such properties directly from
the tensor.
Instead of working with notation (5) and correspond-
ing proliferation of indices, it turns out to be much more
useful to work with a graphical tensor notation, and to
represent MPS and PEPS as a tensor network. A tensor
network consists of vertices and edges that have the same
geometry as the lattice. Every vertex represents a tensor
with a number of legs equal to the number of edges. An
edge with an open end represents an open index, while
an edge which is sandwiched between two vertices is to
be contracted and hence summed over. For example, the
tensor ψijk = P
αβγ Ai
αβAj
βγAk
γα is represented by three
vertices, three open lines, and three closed ones as
ψijk =
α
γ
β
k
i
j
With this tensor network notation, we can readily rep-
resent any MPS and PEPS, shown for a spin chain and
a square lattice in Figure 2. The marginal or reduced
density matrix of an MPS or PEPS can be obtained by
summing over or contracting the physical indices. Simi-
larly, we can represented local expectation values in the
form of a tensor network contraction.
(a)
(b)
FIG. 2 Tensor network description of an MPS (a), a PEPS
on a square lattice (b), and their corresponding marginals.
An important practical consideration is the question of
the computational complexity of contracting such tensor
networks.
Generally, contracting a generic PEPS net-
work is as hard as calculating the partition function of a
spin glass and can hence be #P-hard in the number of
tensors (Haferkamp et al., 2020; Schuch et al., 2007; Ver-
straete et al., 2006). In practice however, PEPS tensor
networks have a high degree of homogeneity (e.g. trans-
lational invariance), and powerful algorithms are being
developed to contract them. Contracting tensor networks
made of matrix product states is much cheaper, as the
cost of calculating any expectation value scales linearly in
the number of sites and as a cube in the bond dimension
(∼ND3): one can contract the tensor network starting
from one end and progress to the other end while con-
tracting all tensors along the way. This diﬀerence in com-
plexity of contracting 1D versus higher dimensional ten-
sor networks is responsible for the big discrepancy that
currently exists in the accuracy for simulating 1D spin
chains using DMRG versus 2D systems using PEPS. It
is however a very active area of research how to speed
up these higher dimensional tensor contractions. For the
state of the art algorithms, we refer to Corboz, 2016; Liao
et al., 2019; and Vanderstraeten et al., 2016.
Another important consideration is the fact that MPS
and PEPS representations are not unique: as we men-
tioned before, two tensors may generate the same set of
states. This fact will play a central role in understand-
ing how symmetries are represented in tensor networks,
in the classiﬁcation of diﬀerent phases of matter, and in
the process of devising eﬃcient numerical methods for
dealing with tensor networks. Let us consider the case of
MPS, and deﬁne a translationally invariant MPS |ψ(A)⟩
with periodic boundary conditions generated by the ten-
sor A; due to the cyclic nature of the trace, it is clear


---
*Page 13*

13
that |ψ(A)⟩= |ψ(B)⟩if Bi is related to Ai by a “gauge
transform” X:
Bi = XAiX−1
(9)
where X is any invertible D × D matrix. This is a spe-
ciﬁc instance of the fundamental theorem of MPS (Perez-
Garcia et al., 2007, 2008b), which will be reviewed in
Section IV, and that basically states that this is the only
possibility as long as the tensors are expressed in some
canonical form.
Many familiar states in the context of quantum in-
formation and condensed matter theory have simple de-
scriptions in terms of MPS and PEPS. One can also con-
struct PEPS that are closely connected to classical Gibbs
distributions: that is, for any classical spin system with
short-range interactions one can build a quantum state
such that the expectation values of the operators diago-
nal in the computational basis coincide with these of the
classical distribution (Verstraete et al., 2006).
2. MPO and PEPO
An important generalization of the class of MPS and
PEPS are matrix product operators (MPO) and pro-
jected entangled pair operators (PEPO). They are read-
ily deﬁned by the tensor network depicted in Figure 3.
When the operators that they represent are translation-
ally invariant, they are fully characterized by a single
tensor, just as PEPS, but now with two physical in-
dices: one corresponding to the bra and the other to
the ket of the local action of the operator. Analogously
to their pure state counterparts, they allow us to en-
code relevant many-body operators in a very economical
way. In particular, matrix product operators (Verstraete
et al., 2004a; Zwolak and Vidal, 2004) describe mixed
states (like those corresponding to thermal equilibrium,
or open quantum systems), Hamiltonians (Crosswhite
and Bacon, 2008; McCulloch, 2007; Pirvu et al., 2010),
or unitary evolution (Cirac et al., 2017b; S¸ahino˘glu et al.,
2018).
MPO and PEPO relate to other operators appearing
in the context of statistical physics. First and foremost,
they appear as transfer matrices in 2- and 3D classical
statistical mechanical models, where the free energy can
be inferred from its leading eigenvalue. The exact diag-
onalization of such transfer matrices in the former case
is the main aim of the ﬁeld of integrable models, and
beautiful algebraic structures in integrable systems have
been uncovered by invoking the Bethe ansatz and the as-
sociated Yang-Baxter relations. Similarly, MPOs are ob-
tained as the transfer matrix in the path integral formu-
lation of 1D quantum spin systems. They also appear in
the description of cellular automata and as transfer ma-
trices in non-equilibrium statistical physics, in the realm
(a)
(b)
FIG. 3 Deﬁnition of (a) Matrix Product Operators (MPO)
and (b) Projected Entangled Pair Operators (PEPO)
of percolation theory and the asymmetric exclusion pro-
cess. We refer to the review (Haegeman and Verstraete,
2017) for a detailed exposition of these connections.
MPOs are widely used in diﬀerent scenarios in the ﬁeld
of tensor networks. Although all these diﬀerent roles can
be extended to higher dimensions using PEPOs, let us
discuss them here in the context of MPOs.
Let us ﬁrst focus on MPOs as density matrices, it is
mixed state analogues of a pure MPS. In this case they
are called Matrix Product Density Operators (MPDO).
From the computational point of view, they arise in simu-
lations at ﬁnite temperature or in the presence of dissipa-
tion. A suﬃcient local condition for a MPO represented
by the 4-leg tensor O to be a global positive operator
(in the semideﬁnite sense, hence representing a density
matrix) is the existence of a 4-leg tensor A (the ”puriﬁ-
cation”) and a 3-leg tensor X (the ”gauge transform”)
such that the property depicted in Figure 4 is satisﬁed.
Note that this is only a suﬃcient condition for positivity.
Indeed, it has been shown that there can be an arbitrary
tradeoﬀin the bond dimension of the puriﬁcation (De las
Cuevas et al., 2013), and that there exist translationally
invariant MPDOs which do not possess MPO puriﬁca-
tions as in Fig. 4 valid for all system sizes (De las Cuevas
et al., 2016).
Second, MPO can also describe the dynamics of a
quantum many-body systems.
In that case they are
called Matrix Product Unitaries (MPU) (Cirac et al.,
2017b), as they generate a unitary operator U fulﬁlling
UU † = 11. As in the case of MPDOs, this extra condition
imposes a restriction on the tensor generating U. For this
case, it is possible to fully characterize them. In fact, by
blocking at most D4 spins, the resulting tensors have a
very simple structure (Fig. 5). The MPU can thus be
viewed as a quantum circuit with two layers of unitary
operators acting on nearest neighbors.
In fact, MPUs
O
=
X
X-1 A
¯A
FIG. 4 Suﬃcient condition for a translationally invariant
MPO ρ to be positive.


---
*Page 14*

14
(a)
b
a
U
¯U
=
,
U
¯U
U
¯U
=
U
¯U
a
b
U
¯U
(b)
U
=
=
U
U
U
U
U
U
=
u
v
FIG. 5 (a) Tensors generating an MPU after blocking. (b) the
MPU can be described as a quantum circuit, with alternating
layers of unitary operators u and v acting on nearest neighbors
withe even-odd indices or odd-even indices, respectively.
can be shown to be equivalent to 1D quantum cellular
automata; that is, unitary operators that transform local
operators into local operators, where by local we mean
acting non-trivially in a ﬁnite region only. That is, any
MPU possesses that property and any quantum cellular
automaton can be written as an MPU with ﬁnite bond di-
mension. Furthermore, an evolution operator generated
by a local Hamiltonian in ﬁnite time can be approximated
by an MPU, since the Lieb-Robinson bound for the prop-
agation of correlations ensures that it behaves as a quan-
tum cellular automaton, and thus as an MPU, up to some
small corrections. There are also some MPUs that can-
not be approximated by a local time-evolution operator.
A particular example is the shift operator sketched in
Fig. 6(a) (see Appendix A.4), which in each application
translates the state by one site to the left. The fact that
this operator cannot be obtained (or even approximated)
by the evolution of a local Hamiltonian is a direct con-
sequence of the index theorem, originally proven for 1D
quantum cellular automata (Gross et al., 2012), which
states that MPUs can be classiﬁed in terms of an index,
where the equivalence relation is that the tensors gen-
erating the MPU can be continuously transformed into
one another. The index measures how quantum informa-
tion is transported to the right (positive index) or to the
(a)
(b)
FIG. 6 (a) MPU representation of the left-moving shift op-
erator; (b) MPU made of two shift operators, one right- and
another left- moving.
A
=
B
FIG. 7 A suﬃcient condition for two PEPS to be equal to
each other is the existence of a MPO satisfying the Pulling
Through equation
left (negative index), and can only take discrete values.
The dynamics generated by local Hamiltonians has zero
index, whereas the one of the shift operator is ±1. In
Fig. 6(b) we give an example of an MPU where the lo-
cal Hilbert space has dimension 4 (and thus, it acts on
pairs of qubits), with zero index as it moves the same
information to the left as to the right.
Third, MPOs play a fundamental role in describing
symmetries of PEPS (Bultinck et al., 2017; Chen et al.,
2011c; S¸ahino˘glu et al., 2014).
In particular, the gen-
eralization of Eq.
(9) to PEPS is the pulling through
equation depicted in Figure 7. It gives a suﬃcient con-
dition for two tensors to generate the same PEPS. In
the case of systems exhibiting topological quantum or-
der, similar pulling through equations characterize the
symmetries of the underlying tensors; these symmetries
form an algebra and provide an explicit representation of
tensor categories describing the topological phase and its
emerging anyons (see Section III.B).
Finally, MPOs are also key in the bulk-boundary corre-
spondence (Cirac et al., 2011), where the physical prop-
erties of PEPS in 2 dimensions can be mapped into these
of a theory deﬁned at the boundary by an MPO. As we
will show, the classiﬁcation of the renormalization ﬁxed
points of MPO will thus allow us to characterize the topo-
logical order of 2D systems (Cirac et al., 2017a).
3. Correlations, Entanglement, and the Transfer Matrix
a. Matrix Product States
All matrix product states sat-
isfy an area law for the entanglement entropy. This fol-
lows directly from the projected entangled pair construc-
tion, where the MPS was obtained by applying a local
map on a tensor product of D-dimensional maximally
entangled states (see Fig.1). Let us take a region of con-
tiguous spins in the chain. Before the map, it is clear
that only the two pairs that are at the boundary con-
tribute to the entanglement entropy. In fact, the rank
of the reduced state in that region is equal to D2. Since
the map does not change the rank of the reduced state,
it follows that the entropy is at most 2 log(D).
For a
generic inﬁnite translationally invariant MPS, it is pos-
sible to calculate all eigenvalues of this reduced density
matrix exactly. This density matrix can be represented
by the tensor network depicted in Figure 8. Before we
show how to determine this spectrum, some basic alge-
braic properties of MPS have to be introduced.


---
*Page 15*

15
(a)
ρR
ρL
(b) eig


ρR
ρL
=
= eig
 
!
ρR
ρL
≃
≃eig
 
!
ρR
ρL ρR
ρL
FIG. 8 (a) Tensor Network description of the reduced density
matrix of n spins in an inﬁnite translationally invariant MPS.
|ρR,L⟩correspond to the right and left ﬁxed points, respec-
tively, of the transfer matrix (see main text). (b) Argument
showing that the eigenvalues of the reduced density matrix of
n sites in a MPS coincide with those of
 ρLρR⊗2 in the limit
of large n.
A central object for a MPS is its corresponding trans-
fer matrix E, deﬁned as Eαα′,ββ′ = P
i Ai
αβ ¯Ai
α′β′. It is
called the transfer matrix as it plays a role similar to
the transfer matrix in classical 1D statistical mechanics
models. The eigenvalues and eigenvectors of this transfer
matrix are of importance, as we will see in several places
throughout this review.
The eigenvalues can be com-
plex, as E is not necessarily hermitian, and it may have
some Jordan blocks. For a generic MPS, however, the
largest eigenvalue in magnitude is unique and there are
no Jordan blocks associated to it. We will assume this to
be the case for the time being. We ﬁnd it convenient to
write the corresponding right and left eigenvectors |ρR,L⟩
as operators ρR,L, so that (ρR,L)α,α′ = ⟨α, α′|ρR,L⟩.
The quantum Perron Frobenius theorem (Albeverio and
Høegh-Krohn, 1978; Wolf, 2012) then guarantees that
this largest eigenvalue is positive, as the eigenvalue equa-
tion can be written in the form of a completely posi-
tive map (the quantum version of a stochastic matrix):
P
i AiρRAi† = λ1ρR and P
i Ai†ρLAi = λ1ρL. Note that
the left eigenvector and right eigenvector do not have to
be equal to each other, but Perron Frobenius theory guar-
antees that both ρL and ρR can be chosen to be positive
semideﬁnite. As we will see in Section IV, the MPS ful-
ﬁlling that the largest eigenvalue (in magnitude) of the
transfer matrix is unique and both ρL and ρR are positive
deﬁnite is called normal. It is not diﬃcult to show that
by blocking a ﬁnite number of sites, any normal MPS
becomes injective (we refer the reader to Section IV for
a careful discussion).
In the case of an injective MPS with periodic bound-
ary conditions, the Euclidean norm of the MPS is given
by Tr EN and hence scales as λN
1
with N the number
of sites.
In the limit of large N, this norm should be
equal to 1, and we rescale the tensors Ai →Ai/√λ1 to
achieve this. We henceforth assume that λ1 = 1. The sec-
ond largest eigenvalue λ2 of the transfer matrix deﬁnes
the correlation length of the state: ξ = −1/ log(|λ2|).
For a general connected correlation function C(X, Y ) :=
⟨XY ⟩−⟨X⟩⟨Y ⟩of two operators X and Y with a dis-
tance n between them, the expectation value will be of
the form PD2
i≥2 cXY (i)λn
i and is hence a sum of D2 −1
pure exponentials, with D the bond dimension. MPS can
henceforth not reproduce algebraic correlations at long
distances, as a sum of exponentials cannot reproduce the
tail of an algebraic function.
For a ﬁnite system with
N sites, however, it is enough to choose D as a polyno-
mial in N to reproduce all correlation functions faithfully
(Verstraete and Cirac, 2006). Similarly, Ornstein-Zernike
type corrections of the form exp(−n/ξ)/√n can be taken
into account by taking D large enough (Rams et al., 2015;
Zauner et al., 2015).
Let us now go back to the calculation of the eigenval-
ues of a reduced density matrix of n sites of an injective
MPS, see Figure 8.
Using the basic fact in linear al-
gebra that the eigenvalues of the matrix A B are equal
to the eigenvalues of the matrix B A, the problem re-
duces to ﬁnding the eigenvalues of the D2 × D2 matrix
Fαβ,α′′β′′ = P
α′β′ ρL
αα′ρR
ββ′ (En)α′α′′,β′β′′. In the limit
of large n, En factorizes in |ρR⟩⟨ρL| and we see that the
eigenvalues of the reduced density matrix are given by
the eigenvalues of
 ρL.ρR⊗2; in other words, the con-
tribution from the left and right side of the block dis-
entangle for distances larger than the correlation length.
The eigenvalues of the matrix ρLρR are the squares of
the Schmidt coeﬃcients of an injective MPS with open
boundary conditions. The entanglement spectrum is de-
ﬁned as the logarithm of these eigenvalues.
b. PEPS
PEPS automatically fulﬁll the area law, as one
can argue in the very same way as we did with MPS. In
this case, the entanglement entropy of a L × L block on
a square lattice is upper bounded by 4L log(D).
Calculating correlation functions and the entanglement
spectrum of a PEPS is much more involved than the MPS
case. This follows from the fact that the contracted ten-
sor network looks very much like the partition function
of a classical statistical mechanical model, but then with
2 layers and complex numbers. The calculation of the
leading eigenvector of this transfer matrix correponds to
ﬁnding ﬁxed points of completely positive maps acting
on an inﬁnite spin chain. The entanglement spectrum
is then obtained by the eigenvalues of the correspond-
ing ﬁxed-point density matrix. Note that for topologi-
cal states of matter, an additive negative correction to
this entanglement entropy emerges (Kitaev and Preskill,
2006; Levin and Wen, 2006); this is called topological
quantum entanglement entropy, and is a signature of the
fact that the PEPS tensors exhibit nontrivial symmetries
by which they do not have full support on the physical


---
*Page 16*

16
Hilbert space. This will be discussed in Sec. III.B.
Unlike the 1D case, correlation functions can in princi-
ple decay following a power law, for example in the case of
the so-called Ising PEPS tuned at criticality (Verstraete
et al., 2006), discussed in the Appendix.
4. Extension to fermionic, continuous and inﬁnite tensor
networks
Tensor networks have also been deﬁned for fermionic
systems (Barthel et al., 2009; Bultinck et al., 2017a; Cor-
boz et al., 2010; Kraus et al., 2010), have been formu-
lated directly in the continuum (Verstraete and Cirac,
2010), and nontrivial MPS with inﬁnite bond dimension
have been constructed using vertex operators of confor-
mal ﬁeld theories (Cirac and Sierra, 2010).
a. Fermionic tensor networks
Deﬁning tensor networks
for fermionic systems presents two new diﬃculties. First
of all, the tensor product structure is altered due to the
anti-commutation relations of the creation and annihi-
lation operators, and second, a new superselection rule
emerges in the form of parity conservation. The projected
entangled pair construction can however readily be ex-
tended to the fermionic case by considering virtual max-
imally entangled modes of fermions as opposed to max-
imally entangled D-level systems: |I⟩= P
α a†
αb†
α|Ω⟩.
The parity constraint can be enforced by choosing the
projection operator ˆAi = P
αβγ... Ai
αβγ...aαbβcγ · · · to
have a ﬁxed parity. This parity constraint ensures that
the locality of the tensor network is conserved, which
makes it possible to contract tensor networks built from
such tensors eﬃciently. Alternatively, the construction
can be made using Majorana modes, and this will be
useful to construct fermionic PEPS with a chiral charac-
ter.
From the mathematical point of view, working with
fermions amounts to changing the convention of work-
ing in vector spaces with a tensor product structure to
working in supervector spaces with a Z2 graded tensor
product. In essence, the Hilbert space is split into a di-
rect sum of two vector spaces, V0 ⊕V1, and every vector
|i⟩in the Hilbert space has to be fully supported in one
of these spaces and has therefore a parity |i| associated
to it. Given the graded tensor product of two vectors
|i⟩⊗g |j⟩, swapping the vectors amounts to the relation
|i⟩⊗|j⟩→(−1)|i|.|j||j⟩|i⟩.
Matrix product states can
now be deﬁned in this supervector space (Bultinck et al.,
2017a) in the form of ˆA = P
iαβ Ai
αβ|α⟩⊗g ⟨i| ⊗g ⟨β|,
and using the sign rules of grading when moving vectors
around each other such as to contract the virtual indices,
any bosonic tensor network can readily be fermionized.
Interestingly, the notion of injectivity has to be altered
in fermionic tensor networks because of the fact that the
parity superselection rule cannot be broken. As a conse-
quence, diﬀerent boundary conditions have to be chosen
to construct translationally invariant states with an even
or an odd parity. These 2 distinct possibilities relate to
the fact that there are 2 distinct types of Z2 graded ten-
sor algebras, and these are characterized by the absence
or presence of Majorana edge modes. The prime example
of a fermionic spin chain with Majorana edge modes is
the Kitaev wire (Kitaev, 2001). When putting the Ki-
taev wire on a ring with periodic boundary conditions
(and hence translationally invariant), one gets a system
with odd parity, and the MPS description is given by
|ψ⟩=
X
i1···iN
Tr

Y Ai1Ai2 · · · AiN 
|i1⟩⊗g |i2⟩⊗g · · · (10)
with A0 =
 1 0
0 1

, A1 =
 0
1
−1 0

= Y .
Contrary
to the bosonic case, this MPS description is irreducible
and hence injective. By considering more copies of this
Kitaev chain, it is possible to study the entanglement
spectrum of all states in the Z8 classiﬁcation of gapped
fermionic spin chains (Bultinck et al., 2017a; Fidkowski
and Kitaev, 2010). This construction has been extended
to fermionic MPU (Piroli et al., 2020), which include all
quantum celullar automata in one dimension.
b. Continuous MPS
Continuous matrix product states
(Haegeman et al., 2013a; Verstraete and Cirac, 2010) can
be deﬁned by taking the limit of the lattice spacing going
to zero, whilst rescaling the matrix product tensors in an
appropriate way. This enables to write down wavefunc-
tions for quantum ﬁeld theories without a reference to an
underlying lattice discretization, and this is very useful
for doing numerical simulations of e.g. cold atoms and of
quantum ﬁeld theories.
Let us consider a bosonic system on a ring of length
L and with creation and annihilation operators of type
α satisfying

ψα
x , ψβ†
y

= δαβδ(x −y). The cMPS wave-
function of bond dimension D is deﬁned as
|ψ⟩= Tr
"
P exp
 Z L/2
−L/2
 
Q(x) +
X
α
Rα(x) ˆψ†
x(α)
!
dx
!#
|Ω⟩
(11)
where Q(x), Rα(x) ∈CD×D, P denotes a path ordered
exponential, and where [Rα(x), Rβ(x)] = 0. The path or-
dered exponential is the continuous limit of an MPS with
tensors given by A0[i] = 11 + ϵQ[i] and Aα[i] = √ϵRα[i]
with ϵ the lattice parameter. Fermionic cMPS are deﬁned
by replacing the commutation by anti-commutation con-
ditions.
A translationally invariant cMPS is obtained by choos-
ing the Q, Rα independent of x, and choosing L →∞.
An intriguing property exhibited by these cMPS is the
fact that the diagonal elements of the one-particle re-
duced density matrix in momentum space n(k) decay as


---
*Page 17*

17
O(1/k4). This implies that they are suﬃciently smooth
such as to not suﬀer from UV divergencies, and can there-
fore be used as variational wavefunctions without suﬀer-
ing the UV catastrophes experienced by other variational
methods (Haegeman et al., 2010).
c. Inﬁnite MPS
Instead of taking the continuum limit in
the space direction, it is also possible to consider matrices
Ai as operators in a general inﬁnite dimensional Hilbert
space as opposed to a ﬁnite dimensional one (such as in
the case of MPS). A particularly interesting choice in the
case of spin-1/2 systems is to deﬁne those operators in
terms of normal ordered vertex operators appearing in
conformal ﬁeld theory (Cirac and Sierra, 2010; Nielsen
et al., 2012, 2013; Tu et al., 2014),
Asi = : ei
√
4α.si.φ(zn) :
where α > 0 is a free parameter, si = ±1/2, and φ(zn)
is the ﬁeld of a free massless boson located on position
zn = x + i.y of the lattice. For a spin chain with N sites
with periodic boundary condition, we can choose zn =
L. exp(2πi.n/N), but it is also possible to parameterize
2D wavefunctions in this form. By taking the expectation
value of the virtual bosonic ﬁelds with respect to the
vacuum, the MPS wavefunction is then equivalent to
ψs1s2···sn = δP
i si
Y
i
χi,si
Y
i<j
(zi −zj)4αsi.sj .
These wavefunctions are eﬀectively lattice versions of the
Laughlin state, and a wealth of interesting critical and
chiral states such as the ground state of the Haldane-
Shastry or Kalmeyer-Laughlin type wavefunctions can
be constructed in this form. Additionally, it is possible
to deﬁne the corresponding parent Hamiltonians, and to
calculate exact expressions for the entanglement entropy.
A similar construction allows to study ground states
of the fractional quantum Hall eﬀect on a cylinder by
using diﬀerent CFTs, and such a systematic program
of variational calculations for quantum Hall systems has
been pursued by Estienne et al. (2013); Zaletel and Mong
(2012); Zaletel et al. (2013, 2015).
5. Tensor networks as quantum circuits: tree tensor states and
MERA
In the previous sections, we have advocated the picture
that MPS and PEPS parameterize the quantum corre-
lations in the corresponding many-body wavefunctions,
and therefore that the virtual D-level systems represent
the entanglement degrees of freedom. In the case of an
MPS with open boundary conditions, there is however an
alternative way of interpreting the wavefunction in terms
of a quantum circuit acting on a product state, and as-
sisted by a D-level ancillary system (Figure 9(a)). The
(a)
Ai
α,β =
V
i β
α
|0⟩
V
V
V
V
(b)
|0⟩
FIG. 9 (a) Staircase quantum circuit representing a MPS, (b)
Tree tensor network
unitaries (or rather isometries) building up the circuit are
obtained by bringing the MPS into canonical form by ap-
propriate gauge transformations (Sch¨on et al., 2005).
Instead of using a circuit in the form of a staircase, one
could also envision using a circuit in the form of a tree
(Figure 9(b)). Although translational invariance is lost
in this construction, it is possible to parameterize quan-
tum states using this construction with an entanglement
entropy that scales logarithmically in certain bipartitions
(Fannes et al., 1992c; Murg et al., 2010; Shi et al., 2006;
Silvi et al., 2010). This makes this ansatz particularly
well suited for simulating critical 1D systems. Expecta-
tion values can still be calculated eﬃciently as one can
always choose a contraction sequence for which there is
no proliferation of indices.
A more powerful and sophisticated ansatz can be made
by allowing for loops in the quantum circuit of the tree
tensor network, but at the same time ensuring that the
circuit is eﬃciently contractable. This gives rise to the
concept of the multiscale entanglement renormalization
ansatz (Vidal, 2007b, 2008). We refer to Evenbly and
Vidal (2014) for an authoritative review.
C. The ground state manifold of local Hamiltonians
Matrix Product States and PEPS form a low dimen-
sional manifold in an exponentially large Hilbert space.
More precisely, the set of uniform MPS forms a K¨ahler
manifold (Haegeman et al., 2014).
The question ad-
dressed in this section is how this manifold is related
to ground states of local quantum spin Hamiltonians. It
will be shown that the manifold of MPS is in one to
one correspondence with ground states of local gapped
Hamiltonians. This is a very strong justiﬁcation for using
this manifold for variational calculations. Using concepts
of diﬀerential geometry, it is then possible to relate the


---
*Page 18*

18
linear Schrodinger equation on the exponentially large
Hilbert space to nonlinear diﬀerential equations on the
compressed MPS manifold, as implemented in DMRG al-
gorithms. Additionally, the concept of the tangent plane
of the MPS manifold leads to a clear characterization
of the elementary excitations on top of the ground state
vacuum.
1. States to Hamiltonians: Parent Hamiltonians
As argued in section II.B, MPS and PEPS were ex-
plicitly constructed such as to mimic the entanglement
structure of ground states of local quantum Hamilto-
nians: they have strong local correlations, possess all
the symmetries of the problem, and obey an area law.
Conversely, to every MPS and PEPS, there exists a lo-
cal frustration-free quantum spin Hamiltonian for which
the MPS or PEPS is the ground state, called the par-
ent Hamiltonian.
(Here, frustration-free refers to the
fact that the ground state minimizes the energy of each
Hamiltonian term locally.) In the case of injective MPS
and PEPS it is furthermore the unique ground state, and
in the case of MPS, the parent Hamiltonian can be proven
to be gapped (see Section IV).
The existence of such a parent Hamiltonian is a con-
sequence of the fact that the rank of the reduced density
matrix in a contiguous region B scales as D|∂A|, with
|∂A| the length of the boundary of that region, as shown
in section II.B.3 (in the case of 1D systems, |∂A| = 2).
The total dimension of the Hilbert space spanned by all
spins in the region B scales as dV , with V the volume
of that region (in the 1D case, this is the length of the
block L). On any regular lattice, there exists a size and
shape of the block for which DA < dV , independent of
the lattice size, and this region will be the support of
one local term of the parent Hamiltonian deﬁned as the
projector orthogonal to the support of the local reduced
density matrix in that region. The full parent Hamilto-
nian is then obtained by summing up all these projectors
over all possible regions. Clearly, this Hamiltonian is a
sum of positive semideﬁnite terms, and every term in the
Hamiltonian annihilates the tensor network state under
consideration.
It is therefore frustration-free.
We will
further elaborate on the properties of this parent Hamil-
tonian in section IV.
Conceptually, it is very interesting that any MPS or
PEPS is the ground state of a local frustration-free
Hamiltonian. However, these states are also approximate
ground states of completely diﬀerent frustrated Hamilto-
nians.
How would all those diﬀerent Hamiltonians be
related to each other? From the linear algebra point of
view, it indeed seems that knowledge about one extremal
eigenvector does not provide much information about
the other ones, let alone about the spectrum of the full
Hamiltonian. However, the locality of the Hamiltonian
puts very stringent constraints on the possible elemen-
tary excitations or eigenvectors with eigenvalues close to
the ground state energy. The excitation spectrum is in-
deed completely reﬂected into the correlation functions in
the ground state. If the quantum states under consider-
ation would exhibit Lorentz invariance, this would be an
obvious statement, but it is not obvious that this argu-
ment survives for lattice systems. It has indeed been ob-
served (Haegeman et al., 2015; Zauner et al., 2015) that
the logarithms of the eigenvalues of the transfer matrix
reproduce the dispersion relations of the full quantum
Hamiltonian. This is a clear indication of the fact that
it is enough to understand the ground state to deduce
all low energy physics of a full quantum Hamiltonian: all
information is encoded in the ground state.
An even stronger argument can be made in the case
of topologically ordered systems and associated anyonic
excitations.
In that case, the full fusion and braiding
statistics of the anyons can be deduced from studying the
symmetries of the PEPS tensors representing the ground
states. No knowledge of the Hamiltonian is needed, as
the algebraic features of the excitations follows from the
entanglement structure present in the ground state. This
will be discussed in Section III.B.
2. Hamiltonians to states
From the traditional point of view of quantum many-
body physics, the central question of interest concerning
tensor networks is whether any ground state of a local
quantum Hamiltonian can be well approximated with an
MPS or a PEPS. From a practical point of view, the
crucial question is to understand how large the bond di-
mension D has to be chosen such that an MPS or PEPS
exists which provides a faithful approximation to the true
ground state. Given a ground state |ψN⟩of a quantum
spin system on N sites, the question is how large the
bond dimension D ≡D(N, ϵ) has to be chosen as a func-
tion of N and error measure ϵ such that there exists an
MPS/PEPS |ψ(A)⟩for which the ﬁdelity or overlap with
the exact ground state |⟨ψ(A)|ψN⟩| ≥1 −ϵ.
For the
tensor network description to be useful, the dependency
on N and 1/ϵ should be polynomial (note that simple
strategies based on exact diagonalization of small blocks
yields an exponential scaling).
We will discuss several approaches towards this prob-
lem, as each diﬀerent approach highlights a complemen-
tary aspect of this issue. In summary, the results for the
case of spin chains and MPS are as follows:
• If the Renyi entropy Sα, α < 1, with respect to
any bipartition is bounded above by c. log(N), then
an eﬃcient polynomial approximation exists of the
ground state in terms of an MPS. Note that this
includes the case of critical systems (Schuch et al.,
2008c; Verstraete and Cirac, 2006).


---
*Page 19*

19
• If the quantum spin chain is gapped and has a
unique ground state, then an eﬃcient polynomial
approximation of the ground state exists in terms
of an MPS (Arad et al., 2013; Hastings, 2007).
• if the state to be approximated has exponential
decay of correlation functions with respect to ev-
ery pair of observables (with potentially unbounded
support) then an eﬃcient polynomial approxima-
tion exists in terms of an MPS (Brandao and
Horodecki, 2013).
The fact that MPS are powerful enough to represent
ground states does not mean that an eﬃcient algorithm
can be found to ﬁnd them. Examples of quantum Hamil-
tonians can indeed be constructed for which the exact
ground state is an MPS, but for which it is NP-hard
to ﬁnd it (Schuch et al., 2008a); the catch is that such
Hamiltonians have a very small gap scaling as 1/poly(N).
Provided that the system under consideration has a gap
which does not scale with the system size, it was proven
by Landau, Vazirani, and Vidick (2013) that an eﬃcient
algorithm scaling as a polynomial in the system size can
be constructed to ﬁnd an approximate MPS ground state.
This result was extended by Arad et al. (2017) to the
case in which the Hamiltonian has a small density of
low-energy states. However, the question whether such
an algorithm is possible for all critical systems with a gap
scaling as O(1/N) is still open.
In the case of 2D PEPS, the strongest approxima-
tion result is weaker but still certiﬁes that we can sim-
ulate quantum spin systems eﬃciently: a Gibbs state
exp(−βH) can be approximated by a PEPO with bond
dimension D = (N/ϵ)O(β) (Hastings, 2006; Molnar et al.,
2015).
If however the Hamiltonian consists of terms
which all commute, such as in the case of stabilizer
Hamiltonians and all string nets, an exact representation
of the ground states can be found in terms of a PEPS
with a bond dimension which only depends on the size of
the support of the local terms in the Hamiltonian terms
and not on the system size (Verstraete et al., 2006).
a. Area laws and approximability
Using arguments re-
lated to the decay of the Schmidt coeﬃcients in 1D spin
chains, it has been proven that an eﬃcient approximation
of the ground state for a ﬁnite spin chain with L sites can
be obtained whenever the Renyi entanglement entropy of
half a chain of length N is bounded by Sα(N) ≤c. log(N)
for an α < 1.
To show this, consider an exact ground state |ψN⟩de-
ﬁned on a spin chain with N sites and with open bound-
ary conditions, and assume that its Schmidt spectrum or
eigenvalues of the reduced density matrix across a cut be-
tween sites i and i+1 are given by {µx(i)}. The main idea
lies in the fact that for ground states, these Schmidt co-
eﬃcients decay fast, and therefore only a small error will
be made when cutting the Schmidt decomposition after
the D largest Schmidt coeﬃcients. We deﬁne the resid-
ual probability ϵi(D) = P∞
x=D+1 µx(i) and ϵtotal(D) =
PN
i=1 ϵi(D). In Verstraete and Cirac (2006), it was shown
that an MPS with bond dimension D is guaranteed to ex-
ist for which the ﬁdelity |⟨ψ(A)|ψN⟩| ≥1 −ϵtotal(D). If
the Renyi entanglement entropy Sα with α < 1 for the
system of size N maximized over all bipartitions of the
spin chain is given by Sα(N), there exists an MPS with
bond dimension D for which
ϵtotal(D)
N
≤

D
1 −α
−1−α
α
exp
1 −α
α
Sα(N)

. (12)
This proves that the scaling of D to achieve a ﬁdelity 1−ϵ
is polynomial in 1/ϵ and N provided that the Renyi en-
tropy of half a chain satisﬁes Sα(N) ≤c log N. As shown
in Section II.A.2, this is indeed the case for all gapped
quantum spin systems, and also for all integrable critical
spin chains with a logarithmic term. An MPS descrip-
tion therefore provides an exponential compression for a
wide variety of ground states of quantum spin systems,
including critical ones.
The fact that Renyi entropies with α < 1 had to be
used stems from the fact that these are more suscep-
tible to the tails of the distribution of Schmidt values.
Conversely, it holds that a state with an entanglement
entropy satisfying a volume law for the von Neumann
entropy cannot be approximated faithfully using MPS,
but this problem is undetermined for the α < 1 Renyi
entropies (Schuch et al., 2008c).
b. No low tensor rank Ansatz
It has been argued in that
the MPS manifold is in one to one correspondence with
the set of ground states of local gapped Hamiltonians.
One may question whether one can obtain a similar iden-
tiﬁcation with a simpler ansatz, such as linear combi-
nations of polynomially many product states, as it is
the case for instance in (Beylkin and Mohlenkamp, 2002;
De Lathauwer et al., 2000; Hackbusch, 2012; Kolda and
Bader, 2009). Let us prove that this is not possible, since
one can show that any injective MPS has exponentially
small overlap with any product state.
Indeed, consider an injective MPS in canonical form
so that the right (resp. left) ﬁxed point of the associated
transfer operator, seen as a completely positive map, is
the identity matrix (resp. a positive deﬁnite full matrix
Λ with Tr(Λ) = 1). See Section IV for more details. This
implies that the operator norm ∥Λ∥op < 1.
Consider
ϵ =
1
2(1 −∥Λ∥op).
Then, block the tensors until the
transfer operator E is, in operator norm, ϵ-close to the
rank-one projector |11)(Λ|.
Let us name A to the corresponding (blocked) tensor,
as an element of the tensor product of the physical space
Cd with the set of D × D matrices and consider λ to


---
*Page 20*

20
be the maximum of the operator norm of Aw = ⟨w|A
(compare with (8)), where ∥w∥≤1 in the Hilbert norm.
Clearly λ can be rewritten as the maximum of |(u|Aw|v)|,
where u, v, w are again normalized in Hilbert norm, .
By the Cauchy-Schwarz inequality and the hypothesis
on the transfer operator,
|(u|Aw|v)| ≤|(u| ¯
(u|E|v) ¯
|v)| ≤(u|u)(v|Λ|v) + ϵ
≤∥Λ∥op + ϵ < 1,
which implies that λ < 1 (by a standard compactness
argument that holds due the the crucial fact that both
the physical and bond dimensions are ﬁnite).
Therefore, we can conclude (see (8))
|⟨w1w2 · · · wN|ψ(A)⟩| = |TrAw1Aw2 · · · AwN |
≤D
N
Y
j=1
max
w
∥Aw∥op = DλN .
c. Eﬃcient descriptions in thermal equilibrium
The ground
state of a gapped Hamiltonian can be well approximated
by evolving the Euclidean path integral exp(−tH)|0⟩for
a time t ≃1/∆with ∆the gap of the system and |0⟩a
state with non-zero overlap with the ground state. If the
Hamiltonian is frustration-free and only consists of com-
muting terms, this expression is equal to the product of
the exponentials of the local terms acting on the state |0⟩,
even in the limit of t →∞, and therefore automatically
produces a MPS/PEPS with a bond dimension related to
the size of the local support of the individual commuting
terms. This e.g. implies that the ground states of all
local stabilizer Hamiltonians and string nets have a very
simple exact description in terms of PEPS with a bond
dimension independent of the system size.
One can extend this result to the non-commutative
case by using a Trotter expansion of exp(−tH)
≈
(Q
k exp(−βhk/M))M (with H = P hk the local terms in
the Hamiltonian), with M suﬃciently large. Each term
exp(−βhk/M) can be written as a local tensor network
with constant bond dimension. However, when put to-
gether naively, this construction yields a tensor network
with a bond dimension which scales exponentially in M.
Fortunately, since each exp(−βhk/M) ≈11 −βhk/M is
very close to the identity, it is possible to compress this
representation by choosing a suitable subset of terms in
the full expansion of (Q(1 −βhk))M. This way, one ob-
tains a PEPO σD with bond dimension D which ap-
proximates the Gibbs state ρβ = e−βH/Z up to error
ϵ := ∥σD −ρβ∥1 in trace norm with a bond dimension
D = exp(O(log2(N/ϵ)), as long as β ≤O(log N) (Mol-
nar et al., 2015), independent of the spatial dimension.
In order to obtain a polynomial scaling in N for ﬁxed
temperature, one starts instead from the Taylor series
e−βH = P(−β)ℓ(P hk)ℓ/ℓ!, expands (P hk)ℓ, and ﬁnds
that only clustering terms in this expansion are relevant.
This way, one arrives at a PEPO approximation of the
Gibbs state for which D = (N/ϵ)O(β) for a ﬁxed tempera-
ture (Hastings, 2006; Molnar et al., 2015) (for a practical
implementation, see Vanhecke et al. (2019b)); using a
reﬁned approximation of the Taylor series, an improved
scaling of D ∼exp[O(
p
β log(n/ϵ))] has recently been
shown (Kuwahara et al., 2021). From here, one can con-
struct a PEPS approximation for ground states by apply-
ing e−βH to a suitable initial product state at a temper-
ature β = O(log N), which yields suﬃcient overlap with
the ground state as long as the density of states scales at
most as N cE for some constant c, that is, polynomial in
N (Hastings, 2006), which is the case for gapped systems
with particle-like excitations. The reverse direction has
been analyzed by Chen et al. (2020a), where it is shown
that generic MPDOs can be well approximated by Gibbs
states of (quasi-)local Hamiltonians.
A diﬀerent approach can be taken if, instead of as-
suming a low density of low-energy states, one restricts
to Hamiltonians which belong to a phase with a zero-
correlation renormalization ﬁxed point, as it is the case
for all known non-chiral topological phases in 2D. As de-
rived by Coser and Perez-Garcia (2018), following an idea
of Osborne (2007), the quasi-adiabatic theorem (Bach-
mann et al., 2012; Hastings and Wen, 2005) gives a ﬁ-
nite depth quantum circuit whose gates act on log2+δ N
neighboring sites (δ > 0 but arbitrarily small). When
applied on the renormalization ﬁxed point state (which
is an exact PEPS with ﬁnite bond dimension), the cir-
cuit gives an approximation of the ground state of the
target Hamiltonian with an error that goes to zero with
N faster than any polynomial.
This approximation is
a PEPS with bond dimension scaling as eO(log2+δ(N/ϵ)).
Moreover, it keeps all the virtual symmetries present on
the initial renormalization ﬁxed point PEPS and hence
the information about the topological phase it belongs
to (see Section III). A similar argument has been used
by Huang (2020) to propose quasi-polynomial algorithms
to compute local observables in systems belonging to the
trivial phase.
In the case of gapped 1D systems, the strongest results
along these lines have been obtained by randomizing the
path integral and invoking a Chebyshev-based Approxi-
mate Ground Space Projector (Arad et al., 2013, 2017;
Huang, 2014). Given an inﬁnite chain of d-level systems
with r ≤poly(n)-fold degenerate ground space and gap
∆and considering one cut in an inﬁnite spin chain, it
yields that
log(ϵ(D)) = −∆1/3 ˜Ω(log(D/r)4/3)
(log d)4/3
+ (log d)8/3
∆
(13)
where ϵ(D) is deﬁned as above, that is, the sum of the


---
*Page 21*

21
FIG. 10 Construction of a translation invariant MPO approx-
imation to inﬁnite translation invariant ground states by trun-
cating the bond dimension in an intermediate region (Schuch
and Verstraete, 2017); the resulting MPO ρk for k sites is then
patched together and superimposed with its translations.
square of all but the ﬁrst D Schmidt coeﬃcients on that
cut, and g = ˜Ω(h) exactly if h = ˜O(g) ≡O(g log(g)k) for
some k – that is, the truncation error ϵ(D) decreases su-
perpolynomially with the number of Schmidt coeﬃcients
kept, i.e., the bond dimension.
A corollary of this result is the existence of eﬃcient
translationally invariant MPO desciptions for inﬁnite
translationally invariant gapped quantum spin chains,
in the sense that any local expectation values of the
MPO approximation are ϵ-close to the ones of the exact
ground state. A direct proof was formulated by Schuch
and Verstraete (2017) and we sketch it here; building
on it, similar results have been obtained for pure uni-
form MPS (Dalzell and Brandao, 2019; Huang, 2019).
The construction is as follows: deﬁne an MPO ρk on
k sites by cutting the exact ground state k + 1 times
and then tracing the outer spins, Fig. 10.
This yields
an MPO with bond dimension D2 so that the trace dis-
tance to the true ground state reduced density matrix
σk is ∥ρk −σk∥1 ≤2
p
2ϵ(D)(k + 1). In order to obtain
a translationally invariant MPO for the inﬁnite chain,
take an inﬁnite tensor product of this MPO with itself
and sum over all k translations. The resulting MPO has
bond dimension kD2 and its reduced state on ℓcontigu-
ous sites approximates σℓup to error
ϵ ≤2
p
2kϵ(D) + 2(ℓ−1)
k
.
Choosing an appropriate k and using (13) one gets that
the bond dimension required to give an ϵ-approximation
on ℓsites scales as D ≤ℓ
ϵ. This result demonstrates that
the MPS compression is still faithful in the thermody-
namic limit, and hence provides clear evidence for the
falling of the exponential many-body wall.
Finally, approximation results of thermal states by
MPOs can also be obtained from area laws for thermal
states, see Kuwahara et al. (2021) and Jarkovsky et al.
(2020).
d. Many-body Localization
Matrix product states also
pop up for the description of eigenstates of quantum spin
systems subject to randomness. It has been argued that
all eigenstates, not just the ground state, of many-body
localized (MBL) Hamiltonians exhibit an area law for
the entanglement entropy, and furthermore that all have
an eﬃcient description in terms of matrix product states
(Bauer and Nayak, 2013; Nandkishore and Huse, 2015;
Wahl et al., 2017). This follows from a result of Imbrie
(2016), proving that there is a low depth quantum circuit
which completely diagonalizes any MBL Hamiltonian.
3. Manifold of MPS and TDVP
a. Manifold and TDVP
As demonstrated in the previous
paragraphs, ground states of local gapped quantum spin
chains can eﬃciently be parameterized as matrix product
states, and furthermore any such MPS is the ground state
of a local Hamiltonian. This implies that the manifold
of MPS is in one to one correspondence with all possible
ground states, and this opens a large number of perspec-
tives, such as the classiﬁcation of all phases of matter of
1D spin chains.
The manifold of inﬁnite uniform matrix product states
has been studied in detail by Haegeman et al. (2014).
MPS have the mathematical structure of a (principal)
ﬁber bundle; this follows from the parameter redundancy
corresponding to the gauge transforms. The total bundle
space corresponds to the parameter space, i.e. the space
of tensors associated to a physical site. The base manifold
is embedded in the Hilbert space and can be given the
structure of a K¨ahler manifold by inducing the Hilbert
space metric. A similar construction holds in the ﬁnite
case of MPS with open boundary conditions. The metric
is governed by the Schmidt numbers, and is singular when
the MPS is not normal/injective.
Given a speciﬁc MPS on the manifold, we can associate
a linear subspace to it, namely the tangent space on the
manifold (Haegeman et al., 2011; Vanderstraeten et al.,
2018). The dimension of that space is (d −1)D2, and is
spanned by the vectors
|ψαβi(A)⟩=
∂
∂Ai
αβ
|ψ(A)⟩.
Due to the product rule of diﬀerentiation, these vectors
correspond to plane waves and are hence normalized as
delta-functions. D2 of these are linearly dependent due to
the gauge freedom. These degrees of freedom can be used
to make the Gram matrix or metric gxy = ⟨ψx(A)|ψy(A)⟩
locally Euclidean (gxy = δxy); the gauge transformations
needed to achieve this are precisely the ones which bring
the MPS in left and right canonical form. As shown in
Figure 11, the projector on the tangent space PT (A) in
a speciﬁc point |ψ(A)⟩can be constructed in terms of a
sum of matrix product operators which are expressed in
terms of the tensors in left (AL) and right (AR) canonical
form.
This expression is of great practical interest, as it al-
lows to write down evolution equations within the man-
ifold of MPS. Let us for example assume that we aim


---
*Page 22*

22
[As
L]α,β =
α
β
s
[As
R]α,β =
α
β
s
=
=
PT (A) =
n
X
i=1
−
n
X
i=1
FIG. 11 For a given MPS, one considers the two possible
canonical forms, given by tensors AL (resp. AR), where the
right (resp. left) ﬁxed point of the transfer operator is the
identity (see Section IV for more details). They are distin-
guished in the ﬁgure by the direction of the triangle. They
allow to express the tangent space projector PT (A) as a sum of
MPOs. The variable i in the sum corresponds to the position
of the blue index.
to simulate the time evolution generated by a Hamilto-
nian H of a quantum state |ψ(A)⟩which is initially an
MPS. The evolution described by the Schr¨odinger equa-
tion i∂t|ψ⟩= H|ψ⟩will take the state outside of the man-
ifold and hence make the problem seemingly intractable.
The projector on the tangent plane however allows to pull
the state back on the manifold, in a way which maximizes
the overlap to any state on the manifold:
i ∂
∂t|ψ(A)⟩= PT (A)H|ψ(A)⟩.
The corresponding equations are the MPS equivalents
of the time dependent variational principle (TDVP) as
originally derived in the context of Hartree-Fock theory
(Dirac, 1930):
∂tAi
αβ = F
 Ai
αβ

.
This equation is non-linear due to the fact that the pro-
jector PT (A) depends itself on A. It conserves the energy
and all symmetries that can be represented within the
tangent plane, and it is possible to associate symplectic
structure with a Poisson bracket to it (Haegeman et al.,
2011). MPS therefore yields novel semi-classical descrip-
tions of the dynamics of quantum spin chains.
There are many methods to solve these diﬀerential
equations in practice, and the most interesting case con-
sists of evolving the equations in imaginary time such
as to converge to the ground state.
The density ma-
trix renornalization group (DMRG) (White, 1993) can be
understood in terms of splitting the diﬀerential equation
into the 2N−1 MPO terms, and then evolving each one of
them for an inﬁnitely large imaginary time step (Haege-
man et al., 2016). Increasing the bond dimension can be
understood in terms of a projection on the 2-site tangent
plane, and time-dependent DMRG can completely be for-
mulated within the time dependent variational principle.
We refer the interested reader to a review by Vander-
straeten et al. (2018) on tangent space methods for MPS.
b. Excitations
The tangent plane of an MPS represent-
ing the ground state of a quantum spin system reveals
another very intriguing aspect of MPS, namely the fact
that the projection of the full many-body Hamiltonian on
its linear subspace gives rise to an eﬀective Hamiltonian
whose spectrum reveals the dispersion relations of the
true elementary excitations of the many-body Hamilto-
nian (Haegeman et al., 2012b; Pirvu et al., 2012; Porras
et al., 2006; Rommer and ¨Ostlund, 1997).
More pre-
cisely, the tangent plane yields a method for parameter-
izing plane waves of the form ψk(A, B)⟩=
1
√
N
X
x
e2πikxTr

Ai1 · · · Aix−1BixAix+1 · · ·

|i1⟩|i2⟩· · ·
which correspond to Bloch wave-like excitations; the ten-
sors Bi
αβ can easily be determined by solving a linear
eigenvalue problem of the eﬀective Hamiltonian. By mak-
ing use of Lieb-Robinson techniques (Bravyi et al., 2006;
Hastings, 2004b; Hastings and Koma, 2006; Nachtergaele
and Sims, 2010), it has been proven by Haegeman et al.
(2013b) that such an ansatz provides a faithful repre-
sentation of the exact excitations in the system if these
are part of an isolated band with a gap ∆(k) above it
in the momentum sector k; by allowing the tensor B to
act on l sites, the ﬁdelity to the exact excited state is
lower bounded by 1 −p(l) exp (−∆(k)l/2vLR) with p(l)
a polynomial in l and vLR the Lieb Robinson velocity.
This is a beautiful manifestation of the fact that
ground state correlations reveal plenty of information
about the excitation spectrum. In fact, as commented
already, the spectrum of the transfer matrix E of the
MPS itself already contains this information: the corre-
lation length can be extracted from the gap in eigenvalues
of E, and the phases of all eigenvalues reveal information
about the full dispersion relation (Zauner et al., 2015).
D. Bulk-Boundary Correspondences
One of the most intriguing consequences of tensor net-
work descriptions is the fact that single tensors can rep-
resent entire many-body states if translational invariance
is imposed. Once we know the geometry of the lattice,
which tells us how to contract the local tensor with copies
of itself, the whole state is completely determined. Thus,
all physical properties (i.e., expectation values of observ-
ables) are contained in the tensor A, as they are all func-
tions of the coeﬃcients of that tensor. In a sense, one
could establish a map between all physical properties of
many-body states (given a certain geometry in d spatial


---
*Page 23*

23
dimensions), and the space of tensors corresponding to
that geometry. However, this map is highly nonlinear,
as the expectation values of observables in Hilbert space
will be complex functions of the tensor.
The special form of MPS/PEPS allows one to establish
other maps that are linear. In particular, if the PEPS is
deﬁned in a Hilbert space, Hd, corresponding to a certain
geometry in d spatial dimensions, it is possible to map
all physical properties to these of a diﬀerent space, Hd−1,
corresponding to d −1 spatial dimensions (Cirac et al.,
2011). Furthermore, the map takes the form of a linear
isometry. More explicitly, given a region R, it is possible
to ﬁnd an isometry, UR, that maps the reduced state and
all operators acting on that region, to a state and opera-
tors acting on its boundary, ∂R, so that the expectation
values computed in R coincide with these computed in
∂R.
The existence of this holographic principle is not sur-
prising, at least for ground states of local Hamiltonians
fulﬁlling the area law (see Section II.A.2). In fact, the
area law states that the entropy of (the reduced state
in) a region R scales with the number of particles at its
boundary. As the entropy counts degrees of freedom, it
is natural to think that one can map the reduced state
to a space that lives in the boundary ∂R. What is spe-
cial about tensor networks is that the Hilbert space of
this boundary is dictated by the bond dimension of the
tensors, and one can thus talk about geometrical notions
there too. For instance, the state in the boundary may
be a mixed state that can be described as the Gibbs state
of a local Hamiltonian, where the notion of locality refers
to that geometry. All this will become clearer when we
show how to explicitly construct the bulk-boundary cor-
respondence.
There exists another way of constructing a bulk-
boundary correspondence which may be more “physical”
(Yang et al., 2014). The one mentioned above relates the
physical properties in a region of the bulk to those of an-
other theory living in the boundary of such region, but in
thermal equilibrium. The boundary Hamiltonian charac-
terizing such a Gibbs state in the boundary does not have
a dynamical meaning (i.e. does not generate the evolu-
tion), but just a statistical one. In contrast, it is possible
to derive a Hamiltonian that describes the dynamics of
the physical boundary (i.e. the edges) of a many-body
system with respect to perturbations in the bulk. One
can build an isometry to map this Hamiltonian to one
that acts on the auxiliary indices associated to the edges
of the system. Thus, one can describe the dynamics in
the bulk by just transferring the dynamics to these auxil-
iary indices by using the isometry. For PEPS with ﬁnite
correlation length, this isometry will only aﬀect the lat-
tice sites that are close to the physical boundary, and
thus will be describing edge excitations. All this is very
reminiscent of the physics of the quantum Hall eﬀect in
2D, where there exists a 1D Hamiltonian that describes
the dynamics of the edge states. What we will discuss is
that something similar occurs with generic PEPS.
Very recently, this kind of bulk-boundary relations ap-
pearing in tensor networks has been used to construct
toy models of the AdS/CFT correspondence (Maldacena,
1999), as it appears in holographic principles proposed
in the context of high-energy physics and string theory.
First of all, the construction of MERAs (and TTNs)
can be associated to a coarse tesselation of an Anti-de
Sitter geometry, where the renormalization direction co-
incides with the radial coordinate (Evenbly and Vidal,
2011; Swingle, 2012). The 1D MERA construction can
be interpreted as a quantum circuit which implements a
conformal mapping between the physical Hilbert space
and the (renormalized) one in scale space (Czech et al.,
2016); the entanglement spectrum of the MERA can be
identiﬁed with the one of a MPO representing a thermal
state, hence relating the bond dimension of the MERA
approximation to the bond dimension needed to repre-
sent thermal states using MPOs (Van Acoleyen et al.,
2020). For MERA in 1D it is straightforward to show
that they display the logarithmic correction to the area
law associated to CFTs by simply ﬁnding the shortest
path in the MERA embracing the region in which one is
interested (Vidal, 2008) (on the other hand, 2D MERA
can be embedded in PEPS and thus obey an area law
(Barthel et al., 2010)). Swingle pointed out a very in-
triguing connection between this way of determining the
entropy and the Ryu-Takayanagi formula relating the en-
tropy of the ground state of a CFT and the geometry of
AdS space (Swingle, 2012). This indicated that MERA
could deﬁne geometries through that formula, and thus in
a sense relate the entanglement properties of many-body
states with geometries appearing in gravitational physics.
Later on, it was realized that by adding a physical index
to the MERA tensors, one could build a linear corre-
spondence (an isometry) between these physical indices
and the auxiliary ones living in the boundary (Pastawski
et al., 2015). This is closely related to the bulk-boundary
correspondence mentioned above. In fact, if one builds
PEPS in a (tesselated) hyperbolic geometry using the
quantum circuit construction, they are equivalent. In re-
cent works (Hayden et al., 2016; Kohler and Cubitt, 2019;
Qi and Yang, 2018; Qi et al., 2017), it has been shown
that by choosing appropriately the tensors which build
the TNS, one can ensure certain desired properties of
the AdS/CFT correspondence, and in this way explicitly
build toy-models displaying such properties.
1. Entanglement spectrum
Let us consider a many-body state |Ψ⟩in d dimensions
and its reduced state, ρR in a region R. The entangle-
ment spectrum σΨ of the state with respect to region R
is deﬁned as the spectrum of HR = −log(ρR). It is clear


---
*Page 24*

24
that these dimensionless numbers are related to the en-
tanglement of region R and its complement ¯R. In fact,
we can always write the Schmidt decomposition of |Ψ⟩as
|Ψ⟩=
dR
X
n=1
λn|ϕn⟩R ⊗|ψn⟩¯
R ,
(14)
where ϕn, ψn are orthonormal sets in HR and H ¯
R, re-
spectively. These are the Hilbert spaces corresponding
to the lattice sites in region R and ¯R, and have dimen-
sions d|R|, d| ¯
R|, respectively, where as usual |R| denotes
the number of lattice sites in R. The λn ∈[0, 1] are the
Schmidt coeﬃcients and completely characterize the en-
tanglement of state Ψ with respect to region R and ¯R. As
any Schmidt decomposition, the number of coeﬃcients is
dR ≤min(d|R|, d| ¯
R|).
Given the normalization of |Ψ⟩,
their squares add up to one. By deﬁnition,
σΨ = {−log(λ2
n)}dR
n=1 ,
(15)
which indicate that the entanglement spectrum is noth-
ing but the Schmidt coeﬃcients, which thus fully char-
acterize the entanglement. The operator HR is usually
referred to as the entanglement Hamiltonian.
It was argued by Li and Haldane (2008) that for quan-
tum Hall states (integer or fractional), the low-lying part
of the entanglement spectrum coincides (up to a propor-
tionality constant) with the Hamiltonian corresponding
to the CFT associated to its topological order. This has
been veriﬁed for other states with topological order and
proven for more general states whose wavefunction can
be written in terms of correlators of a CFT under certain
assumptions (see e.g. Dubail et al., 2012 and Qi et al.,
2012, the references therein and Section III.B.2). In mod-
els without topological order in d = 2 dimensions it has
also been found that the lower sector of the entanglement
spectrum resembles that of local theories in d = 1 dimen-
sions (Cirac et al., 2011; Lou et al., 2011). For instance,
for the AKLT state in a square lattice it has been found
that the entanglement spectrum also resembles that of
a Wess-Zumino-Witten SU(2)1 theory; this will be dis-
cussed in more detail in the following section.
2. Boundary Theory
Both, the existence of an area law and the numerical
results displaying a 1D-like spectrum in ground states of
2D theories indicate that it should be possible to com-
press the degrees of freedom corresponding to any region
R from |R| to |δR|. More speciﬁcally, one could always
ﬁnd a PR such that ˜ρR = PRρRPR ≈ρR, where PR is a
projector onto a subspace of HR with dimensions d|∂R|
b
,
where db is a constant integer. Note that this hints to an
area law given the fact that the von Neumann entropy
of a (mixed) state is upper bounded by the logarithm of
the dimension of the Hilbert space on which it is sup-
ported; in this case, S(˜ρR) ≤|∂R| log(db). Furthermore,
there should exist a Hamiltonian H∂R acting on a dif-
ferent space corresponding to d −1 spatial dimensions,
such that the lowest part of the entanglement spectrum
coincides with the spectrum of H∂R. The latter should
be somehow local (note that otherwise it does not make
so much sense to talk about the spatial dimensions).
For PEPS it is possible to make the above conclusions
rigorous (Cirac et al., 2011). The projector PR comes
automatically from the theory of tensor networks and,
in fact, ˜ρR = ρR, where db = D, the bond dimension.
Furthermore, for any region, R, there exists an isometry
UR : HR →H∂R
(16)
with U †
RUR = 11∂R and URU †
R = PR, such that
ρR = PRρRPR = U †
Rσ∂RUR ,
(17)
where
σR = URρRU †
R
(18)
is an operator deﬁned on the auxiliary indices at ∂R
(coming out of region R, see Fig. 12).
In fact, for
any observable XR acting on HR we can deﬁne X∂R =
URXRU †
R, so that
⟨ΨR|XR|ΨR⟩= trR(XRρR) = tr∂R(X∂Rσ∂R) .
(19)
This expresses the fact that one can compute all physi-
cal properties of the bulk (in R) in terms of a state liv-
ing in the boundary, σ∂R, and deﬁnes the bulk-boundary
correspondence. Furthermore, we can identify the entan-
glement Hamiltonian H∂R = −log(σ∂R) or equivalently
write
σ∂R = e−H∂R .
(20)
The isometric character of UR ensures that the entangle-
ment spectrum σ(HR) = σ(H∂R).
The derivation of the above statements is straightfor-
ward, and we reproduce it here. For that, let us consider
the PEPS |Ψ⟩, and denote by AI
i the tensor correspond-
ing to the contraction of all the auxiliary indices in region
R, where we have combined all physical indices of region
R into a single index I, and all the auxiliary indices which
have not been contracted (and thus stick out of region
R) into an index i. We do the same with region ¯R, and
denote the corresponding tensor by B ¯I
i . Note that the
auxiliary indices connect R and ¯R, and thus the auxil-
iary legs are characterized by the same combined index
i. Thus, we can write the coeﬃcients of |Ψ⟩as
ΨI ¯I ≡⟨I, ¯I|Ψ⟩=
D|∂R|
X
i=1
AI
i B
¯I
i .
(21)


---
*Page 25*

25
R
¯R
=
AI
B ¯
I
∂R
ρR =
=
σ∂R
=
UA
I
σA
=
UB
¯
I
σB
FIG. 12 Bulk-boundary correspondence: For any given re-
gion, R, ρR can be isometrically mapped to a density op-
erator, σ∂R, that is deﬁned in the auxiliary indices of the
boundary of R via a polar decomposition (see main text).
Considered as matrices, A and B can be expressed in
terms of their polar decomposition
AI
i =
D|∂R|
X
r=1
U A
I,rσA
r,i ,
(22)
B
¯I
i =
D|∂R|
X
r=1
U B
¯I,rσB
r,i .
(23)
Here, U A,B are isometries and σA,B positive semideﬁnite
operators. From here, one directly obtains (18) where
UR = U A and σ∂R = σA σB2σA.
The
possibility
of
explicitly
building
this
bulk-
boundary correspondence for PEPS is a direct conse-
quence of its TN structure. Indeed, in this case there
is a natural identiﬁcation of the degrees of freedom of
the boundary with these corresponding to the auxiliary
indices. The boundary state, as well as the Hamiltonian
H∂R act on that space. However, there is nothing which
guarantees that this Hamiltonian is in any way local. In
numerical studies, however, it has been always found that
if the state |Ψ⟩has ﬁnite correlation length, then the
boundary Hamiltonian is quasi-local (Cirac et al., 2011);
with a suitable treatment of sectors, this also holds for
symmetry-breaking (Rispler et al., 2015, 2017) and topo-
logical (Schuch et al., 2013) phases. More speciﬁcally, we
can always expand it as
H∂R =
|δR|
X
r=1
hr ,
(24)
where hr combines operators with non-trivial support on
exactly r consecutive sites.
In the studied examples,
there is clear evidence that ∥hr∥decays exponentially
with r. Furthermore, in some cases where the many-body
state is changed as a function of a parameter, Ψ(g), and
the corresponding correlation length, ξ(g), diverges at
some g = gc, this exponential decay disappears, so that
the boundary Hamiltonian displays long-range couplings.
A ﬁrst rigorous proof in this direction is provided in (Kas-
toryano et al., 2019; P´erez-Garc´ıa and P´erez-Hern´andez,
2020): If the boundary Hamiltonian is suﬃciently local,
then the parent Hamiltonian of |Ψ⟩is gapped (and hence
|Ψ⟩has ﬁnite correlation length).
As will be explained in Section III, in case |Ψ⟩displays
topological order and corresponds to a speciﬁc sector,
σ∂R itself is supported on a subspace of the boundary.
In the presence of a ﬁnite correlation length, the bound-
ary Hamiltonian is also expected to be local (Haegeman
et al., 2015; Schuch et al., 2013) and the non-local pro-
jector related to the topological order can be understood
as a superselection sector.
A key point in the construction is that (global) sym-
metries in the bulk wavefunction |Ψ⟩will show up as
(global) symmetries of the boundary state σ∂R with spe-
ciﬁc representations, and correspondingly as symmetries
of the entanglement Hamiltonian H∂R, which – together
with locality – can signiﬁcantly restrict the possible form
of H∂R = P hr. This will be further discussed in Sec-
tion III.B.2.
3. Edge Theory
Let us consider a PEPS, |Ψ⟩,
deﬁned on a 2D
torus, with translational invariance along both direc-
tions. As explained above, it is always possible to ﬁnd
a frustration-free parent Hamiltonian H for which |Ψ⟩is
the ground state (possibly not unique). This Hamiltonian
is itself translationally invariant, and thus can be writ-
ten as a sum of translations of a projector, Hr, acting on
few sites, which also annihilate |Ψ⟩. Now, following Yang
et al. (2014), let us consider the same problem but with
open boundary conditions. That is, we take the same
Hamiltonian, HR, but consider only the terms acting on
some region R. The ground state of that Hamiltonian is
now highly degenerate. In fact, by deﬁning the tensor A
as in (22) it is clear that for any
|ϕr⟩=
X
I
AI
r|I⟩,
(25)
we have
HR|ϕr⟩= 0 .
(26)
Let us denote by H0 ⊆H∂R the subspace of the
auxiliary indices spanned by all vectors AI
r, with I =
1, . . . , d|R|. In the generic case that |Ψ⟩is injective, all
|ϕr⟩will be linearly independent and H0 = H∂R. In case
|Ψ⟩has topological order, H0 ⊊H∂R will be the support
of an MPO projector (see Section III). In both cases, |ϕr⟩
will span the whole ground space of HR by construction.
We will denote by PR the projector onto that subspace.
Let us assume that HR is gapped, i.e. there is a γ > 0
such that for any size N, the gap ∆N above the ground-
state subspace is ∆N ≥γ > 0. If we add a small local


---
*Page 26*

26
perturbation to HR so that the new Hamiltonian reads
H′
R = HR + ϵVR ,
(27)
where VR is a sum of translations of a local operator
acting on few neighboring sites, the degeneracy of the
ground state subspace will be lifted. Assuming that ϵ is
small enough such that perturbation theory applies, the
eﬀect of VR on the low energy sector can be determined
with the help of degenerate perturbation theory, which
yields an eﬀective Hamiltonian
H′′
R = ϵPRVRPR .
(28)
Using the bulk-boundary correspondence of the previous
subsection, we can map this Hamiltonian to the auxiliary
indices at the edge of the system:
h∂R = ϵURVRU †
R .
(29)
We can now use this Hamiltonian, which acts on the aux-
iliary indices corresponding to the edges of our system,
in order to determine the low energy dynamics generated
by the perturbation, and then map it back to the bulk.
Note that, in contrast to the previous subsection, where
the boundary Hamiltonian just had a statistical mechan-
ics role, in the current scenario the edge Hamiltonian (29)
describes the real low-energy dynamics in the system.
In summary, we see that the isometry UR deﬁned by
the PEPS can be considered as a mapping between a
theory that lives in the bulk and another one that lives
in the boundary, and allows to relate the physics of the
two.
As before, in practice the edge Hamiltonian turns
out to be quasi-local for systems with ﬁnite correlation
length.
When mapping back the dynamical action of
H∂R from the boundary, only regions close to the edge
(at a distance of about the correlation length) will be af-
fected, so that perturbations only give rise to excitations
at the edge. This is very reminiscent of the Quantum Hall
eﬀect, where the low energy excitations occur at the edge.
Furthermore, the global symmetries of |Ψ⟩(and thus of
H) will be inherited by H∂R (see Section III). In addi-
tion, by changing parameters in VR, one can drive phase
transitions in H∂R: This illustrates that it is possible to
have phase transitions in the edge of a system, and in fact
realize a range of diﬀerent phases, without changing the
phase of the gapped bulk (Yang et al., 2014). Finally, as
we will discuss later, the existence of topological order in
|Ψ⟩is reﬂected in the fact that any H∂R (resulting from
a perturbation) has to commute with a non-local MPO
projector, which thus plays a role of a superselection rule
at the boundary. Indeed this is the way the topological
anomaly is revealed in this setup.
E. Renormalization and phases of matter
As discussed in the previous sections, tensor networks
give eﬃcient representations of ground states, thermal
states and elementary excitations in gapped locally in-
teracting systems. Therefore, if one is interested in clas-
sifying the diﬀerent possible features appearing in the low
energy sector of gapped strongly correlated lattice mod-
els, one can restrict the attention to MPS and PEPS.
In this review we will focus only on properties that are
global (or topological), in the sense that they are sta-
ble under renormalization steps. Since its conception by
Kadanoﬀ, Fisher and Wilson, the renormalization group
(RG) has played a central role in many-body physics.
From the conceptual point of view, the RG has clariﬁed
how simple toy Hamiltonians of spin systems can never-
theless exhibit the full spectrum of features of realistic
Hamiltonians, as the universal properties of both theo-
ries at long length scales can be identiﬁed. In essence, RG
provides a systematic method for integrating out UV de-
grees of freedom, thereby mapping a Hamiltonian to one
for which the length scale is reduced.
The correlation
length of the ground state of a Hamiltonian which is a
ﬁxed point of an RG ﬂow should hence be 0 or ∞, the for-
mer case corresponding to trivial or topological phases,
the latter to critical systems.
Formally, a renormalization step can be understood
as the composition of two processes: blocking several
sites, which coarse-grain the lattice, and acting with a
reversible operation in the blocks which rearrange the lo-
cal entanglement pattern. Reversibility is crucial since
we want to guarantee an exact renormalization process,
without discarding any relevant degree of freedom.
Being interested in the topological content of a phase,
arguably the best way to capture it is to restrict the at-
tention to renormalization ﬁxed points (RGFPs), where
all local entanglement is integrated out and only the
topological content remains.
It is however diﬃcult to
characterize such ﬁxed points without a description of
all possible renormalization ﬂows.
To circumvent that
problem, we will deﬁne RGFPs in tensor networks in-
trinsically, from ﬁrst principles, without referring to any
concrete ﬂow. For that we will identify some key prop-
erties that any RGFP of a gapped phase must have and
conclude from there that there is indeed a renormaliza-
tion ﬂow for which the given state is a ﬁxed point, to-
gether with a structural characterization of the tensor
networks that are RGFPs.
We will ﬁrst analyze the case of MPS, following Ver-
straete et al. (2005) and Cirac et al. (2017a), and com-
ment on the implications for the classiﬁcation of 1D
phases. We will then analyze the case of MPOs, follow-
ing Cirac et al. (2017a), and show how a fusion category
emerges from the RGFP conditions, which sheds light
on the classiﬁcation of 2D phases via the bulk-boundary
correspondence analyzed in Section III.B.2. We will also
comment on RGFPs in higher dimensions and concrete
renormalization ﬂows in tensor networks.


---
*Page 27*

27
1. Renormalization Fixed Points in MPS
As just discussed, we should identify properties that
any RGFP MPS must have. For that, given the ground
state subspace S, of a local Hamiltonian H, we say that it
has zero correlation length if connected correlation func-
tions vanish. That is, for any state Ψ ∈S, and any two
observables A and B acting on not neighboring regions
(i.e. not directly connected by the action of H),
⟨Ψ|AB|Ψ⟩−⟨Ψ|APSB|Ψ⟩= 0
(30)
where PS is the projector onto S. Note that, according to
this deﬁnition, a GHZ state has zero correlation length.
As normal MPS have a ﬁnite correlation length, and
general MPS can be expressed as superpositions of nor-
mal MPS, it should happen that as we block, the cor-
relation length decreases. Thus, RGFP must have zero
correlation length.
We will then say that a MPS is a
RGFP if it has zero correlation length. Since the trans-
fer matrix E of an MPS is the operator that mediates
the correlations in the system (Section II.B.3), zero cor-
relation length is equivalent to the condition
E2 = E .
(31)
There are other notions which are clearly connected
to RGFP which can be shown to also be equivalent to
zero correlation length in MPS (Cirac et al., 2017a), and
can be taken then as alternative (but equivalent) deﬁni-
tions of RGFP for MPS. The ﬁrst one is the fact that
the parent Hamiltonian can be written as sums of local
terms which mutually commute.
It has been recently
shown by Kastoryano and Lucia (2018) that if the par-
ent Hamiltonian of a PEPS is gapped, then the norm of
the commutator of the associated terms goes to zero as
we coarse-grain the system (see Section IV). One can
then expect that RGFP PEPS (and in particular RGFP
MPS) have commuting parent Hamiltonians. This prop-
erty is indeed equivalent to RGFP, as shown in Cirac
et al. (2017a).
The second equivalent notion is the saturation of the
area law. Strong subadditivity of the von Neumann en-
tropy (Lieb and Ruskai, 1973) implies that for a spin
chain of size N and a region of size L < N/2, S(N)
L+1 ≥
S(N)
L
, where S(N)
L
denotes the entanglement entropy of
that region. Since MPS fulﬁll the area law, i.e. S(N)
L
is
upper bounded by a constant, independent of L and N,
it follows that limL→∞S∞
L = c < ∞. This implies that
RGFPs must satisfy S(N)
L
= c for all L and thus in par-
ticular for L = 1. That is, they must saturate the area
law. As stated above, the converse is also true.
Let us now focus on property (31) and see what can
be concluded from there.
First of all, since diﬀerent Kraus representations of a
completely positive map must be related by an isometry
(Stinespring, 1955; Wolf, 2012), a tensor A corresponds
to an MPS RGFP if and only if (Verstraete et al., 2005)
Ai1Ai2 =
X
i1,i2
U(i1,i2),jAj
(32)
for some isometry U. Graphically,
A A
=
A
U
(33)
That is, the MPS given by A is the renormalization ﬁxed
point of a particular type of ﬂow, obtained by acting with
an isometry on the physical degrees of freedom.
Such a ﬂow has a natural interpretation in the light
of the usual deﬁnition of topological phases in quantum
systems. Two ground states, or particularly two PEPS,
are said to be in the same topological phase precisely
if there is a low-depth local quantum circuit converting
one state into the other. Via the quasi-adiabatic theo-
rem (Bachmann et al., 2012; Hastings and Wen, 2005),
this corresponds to the existence of a continuous gapped
path of Hamiltonians connecting the two systems. The
intuition behind this deﬁnition is that in order to go to
a diﬀerent phase, one needs to generate global (topo-
logical) correlations, which requires a time (i.e., circuit
depth) which scales with the system size.
The ﬂow described in Eq. (33) above keeps a state in
the same phase. If the unitary implemented in the renor-
malization ﬂow aims to disentangle the left and right
ends of a block, one expects only either nearest neigh-
bor or purely global entanglement to remain in the limit.
Indeed, if the tensors are normal, the RGFP condition
E2 = E implies that E is a rank one projector, and then
(using the isometric relation between Kraus representa-
tions) we can split each spin at a given site n into a left
and a right system nℓand nr, such that the structure of
the RGFP state up to local isometry is of the form
|Φ⟩= ⊗N
n=1|ϕ⟩(n−1)r,nℓ,
(34)
where |ϕ⟩is an entangled state deﬁned on the right and
left part of neighboring spins. If the state is not normal,
then one has a direct sum of states of the form (34), where
the terms in the sum are locally orthogonal (meaning
that the corresponding |ϕ⟩are supported on orthogonal
subspaces for each of the spins).
These states provide representatives for all possible
phases of matter for closed 1D systems; see Section
III.A.2.
2. MPDOs
For the case of mixed states we follow a similar ap-
proach.
Similarly to (31), in this context we say that


---
*Page 28*

28
a MPDO associated with tensor M has zero correlation
length if
M
M
=
M
(35)
As opposed to the pure state case, this is not enough
to guarantee that a given MPDO has no length scale as-
sociated with it. In particular, this does not neccessarily
imply that the MPDO fulﬁlls a property analogous to the
saturation of the area law. As mentioned earlier, in the
context of mixed states the notion of an area law refers
to the mutual information, instead of the entanglement
entropy (Wolf et al., 2008). That is, a system is said to
satisfy an area law for the mutual information if the mu-
tual information between a region R and its complement
¯R, I(R : ¯R) = S(ρR) + S(ρ ¯
R) −S(ρR ¯
R), can be bounded
by the number of spins at the boundary of R (up to a
multiplicative constant). It has been shown that thermal
states of short range Hamiltonians (Wolf et al., 2008) as
well as ﬁxed points of fast mixing Linbladians (Brandao
et al., 2015) fulﬁl an area law for the mutual informa-
tion, which therefore characterizes the relevant corner of
the Hilbert space for equilibrium states in analogy to the
area law for the entanglement entropy for ground states.
Similar to the case of MPS, in any MPDO the mutual
information between a region R and its complement is
upper bounded by a constant which only depends on the
bond dimension, but not the system size or the size of R.
Moreover, an analogous argument based on strong sub-
additivity implies that the mutual information increases
monotonously with the size of the region R. Hence, just
as before, we expect MPDO RGFPs to saturate the area
law for the mutual information. As shown in Cirac et al.
(2017a), this condition is however not equivalent to zero
correlation length.
In order to characterize RGFPs in
MPDOs, we therefore need to impose both conditions
independently: We therefore say that an MPDO is an
RGFP if it has both zero correlation length, and satura-
tion of the area law for mutual information.
It can be proven that RGFP MPDOs are character-
ized (up to a technical condition) by the existence of
two trace-preserving completely positive maps (quantum
channels) T and S such that
M
M
T
S
M
(36)
It is immediate to see that taking traces in Eq. (36) im-
plies zero correlation length. Moreover, since (36) allows
to grow or reduce a region by acting locally on it, it also
implies saturation of the area law. On the other hand, the
fact that both conditions together imply (36) is far less
obvious (Cirac et al., 2017a). We thus see that in analogy
to the case of MPS, imposing RGFP conditions related
to the absence of length scales gives rise to a particular
type of RG ﬂow for which the given MPDO is a ﬁxed
point. Here, the ﬂow consists of blocking a ﬁnite num-
ber of sites and implementing a renormalizing quantum
channel on the blocks whose action can be inverted. One
can use this type of RG ﬂow to deﬁne phases for mixed
states, in analogy to the MPS case discussed above: Two
mixed states are said to be in the same phase if there
exists a low-depth circuit of quantum channels that can
map one state into the other (Coser and Perez-Garcia,
2018).
Just as in the MPS case, there is also a result which
characterizes the structure of RGFP MPDOs. Namely,
it turns out that RGFP MPDOs generate a ﬁnite di-
mensional algebra of Matrix Product Operators, in the
following sense: Consider an MPDO generated by a ten-
sor M (obtained by contracting the tensors horizontally,
as in Fig. 3), and consider the MPO
OL(M) =
M
M
···
(37)
generated by M by contracting the same tensors verti-
cally on a ring of length L. Assume w.l.o.g. that this
MPO is in canonical form, i.e.
M =
M
α
µαMα ,
(38)
where the Mα are the diﬀerent injective blocks (we do
not include the case of multiple blocks, which can be
treated in a similar way, see Cirac et al., 2017a). Then,
the given MPDO is an RGFP if and only if there exists a
set of diagonal matrices χα,β,γ with positive entries such
that for each L, the operators OL(Mα) linearly span an
algebra with structure coeﬃcient c(L)
α,β,γ = tr(χL
α,β,γ), i.e.
OL(Mα)OL(Mβ) =
X
γ
c(L)
α,β,γOL(Mγ)
(39)
and
µγ =
X
α,β
c(1)
α,β,γµαµβ .
(40)
That is, the vector (µα)α is an idempotent for the “mul-
tiplication” induced by c(1).
In case the structure coeﬃcients c(L)
α,β,γ = tr(χL
α,β,γ) are
independent of L, one can easily show that the χα,β,γ,k ∈
{0, 1} and therefore c(L)
α,β,γ ∈N.
In this case, one can
further show that the RGFP MPDOs generated by M
can be written as
ρ(N)(M) =
d
X
i=1
λiP (N)
i
e−HN
(41)


---
*Page 29*

29
where d is the local Hilbert dimension of a single
site, P (N)
i
are projectors, HN = PN
i=1 hi,i+1 is trans-
lationally invariant, nearest-neighbor and commuting
[hi−1,i, hi,i+1] = 0, and [Pi, e−H] = 0 for all i.
This result establishes a connection with the boundary
theories of topological PEPS in two dimensions, proving
rigorously the desired structure for the boundary theory
for RGFP (see Section II.D): A global projector selecting
the topological sector and a local boundary Hamiltonian
commuting with it.
At the same time, it concludes –
based only on a natural RGFP condition – the existence
of an algebra of MPOs which, as will be explained in Sec-
tion III.B, is the starting point to obtain the most general
class of non-chiral topological models in two dimensions.
3. Tree Tensor States and MERA
For a general quantum state describing a spin chain,
it is possible to devise a multitude of renormalization
processes. The simplest one is the real space renormal-
ization, in which one joins a block of spins and truncates
the corresponding Hilbert space to build a new one. It
is straightforward to check that the concatenation of this
procedure gives rise to a tree tensor state (TTN), where
each layer is characterized by the truncation map (see
Section II.B.5).
As explained above, it is possible to
choose these maps as isometries.
The renormalization
ﬂow can be interpreted as the sequence of isometries cor-
responding to each level of the renormalization. The se-
quence may converge, so that one could deﬁne these TTN
where all the isometries are the same as ﬁxed points of
the RG ﬂow. These states give rise to a logarithmic vi-
olation of the area law, and have (averaged) correlation
functions which in general decay as a power law.
A much more sophisticated and comprehensive way of
performing such a renormalization consists in including
unitary operators (“disentanglers”) acting on neighbor-
ing spins before each step of the above procedure. The
resulting states are the Multiscale Entanglement Renor-
malization Ansatz (MERA) (Vidal, 2008), which include
more correlations than TTN as the tensor network now
contains loops (see Section II.B.5). Furthermore, the pro-
cedure can be applied to higher spatial dimensions with
an area law scaling of the entanglement, something which
is not possible with TTN.
The renormalization procedure in terms of MERA was
introduced by Vidal (2008), where he interpreted the uni-
taries and isometries as ways of disentangling neighbor-
ing spins at each step. In fact, by reading the MERA or
the TTN the other way round, one can see that they can
be generated out of a product state by applying unitary
operators.
As compared to previous procedures, MERA and TTN
are more appropriate to describe critical states, where the
correlation length diverges. In fact, given their structure
one can extract properties of the Conformal Field Theory
describing the critical behavior of the state, such as the
form of the primary ﬁelds or their scaling dimensions
(Giovannetti et al., 2008; Milsted and Vidal, 2017; Pfeifer
et al., 2009; Zou et al., 2018).
4. RG in higher dimensions
The renormalization procedures reviewed above can be
extended to higher dimensions using PEPS. In principle,
one can look for unitary operators acting on blocks of
spins (in plaquettes, for instance) that disentangle some
of them locally.
This procedure will not work as well
for PEPS as it does for MPS since in spatial dimension
larger than one, blocking increases the bond dimension,
as a direct reﬂection of the area law. Thus, one might
want to choose diﬀerent approaches.
The most natural one is to truncate the states by re-
placing the unitary operator by an isometry to obtain
a tree tensor network or adding disentangling unitaries
to obtain a MERA (Evenbly and Vidal, 2009). If one
considers tensor networks without physical degrees of
freedom such as classical partition functions, another ap-
proach consists of replacing several tensors corresponding
to neighboring spins by a single tensor but making sure
that the tensor, in some way, generates a tensor network
that is close to the original one (Bal et al., 2017; Even-
bly and Vidal, 2015; Gu et al., 2008; Yang et al., 2017).
Although these procedures may be useful as numerical
tools, the state obtained at the end will in general not be
the same as the original one.
A way around is to look for ﬁxed points of such types
of renormalization procedures. The corresponding non-
trivial ﬁxed points turn out to form representative states
for phases exhibiting topological quantum order (Wen,
2017). As pioneered in Dennis et al. (2002), qubits in
the toric code (Kitaev, 2003) can be disentangled with lo-
cal unitaries, and therefore the corresponding ﬁxed point
topological states can be represented in terms of a quan-
tum circuit of isometries and unitaries. Essentially the
same construction was used by Aguado and Vidal (2008);
K¨onig et al. (2009) to represent all quantum doubles (Ki-
taev, 2003) and string nets (Levin and Wen, 2005) as
ﬁxed points of renormalization ﬂows in the form of a
MERA. All those models have zero correlation length
and are the ground states of frustration free Hamilto-
nians with local commuting terms. The ground states
of those models can hence be obtained by projecting a
product state on the ground subspaces of all those lo-
cal Hamiltonian terms; such a construction generates a
simple PEPS description for the ground states of such
ﬁxed point Hamiltonians (Verstraete et al., 2006). This
PEPS representation was worked out for string nets in
(Gu and Wen, 2009) and its emerging MPO symmetries
were studied in (S¸ahino˘glu et al., 2014; Schuch et al.,


---
*Page 30*

30
(a)
(b)
⊗
(c)
⊗
(d)
⊗
FIG. 13 Examples of diﬀerent possibilities for RGFP in a 2D
square conﬁguration, where a unitary operation is applied to
the physical indices of four spins (a) and invertible operations
are applied to the auxiliary ones. (b) One can disentangle
several spins, i.e. obtain the original tensor and other ones
as product states; (c) one can obtain the original tensor and
other generating MPS; (d) one can obtain two copies of the
original tensor
2010) and presented in Sec. III.B.
From a more general perspective, one can consider
renormalization ﬁxed point equations for PEPS as, for
instance, these shown in Fig. 13, and write down the
corresponding (non-linear) stationary equations which
fully characterize these PEPS which can be considered
as RGFPs with respect to that property. Realizing such
a program would involve nontrivial results from algebraic
geometry, but has not been realized yet in full generality.
An alternative method in two spatial dimensions con-
sists of using the bulk-boundary correspondence reviewed
in Section II.D.2. Using this correspondence, the physi-
cal properties of a PEPS are characterized by a density
operator that lives at the boundary. Let us next consider
a PEPS on a cylinder. In the course of renormalizing the
PEPS using any RG procedure, the boundary state itself
will be renormalized as well, and as the RG ﬁxed point is
reached, one expects to obtain an RGFP MPDO (Cirac
et al., 2017a, cf. Sec. II.E.2) at the boundary as well. This
RGFP condition at the boundary leads to an emerging
algebra of MPOs. We will discuss in Section III.B.2 be-
low how, from the existence of such algebra, one recovers
in a direct way all known 2D non-chiral topologically or-
dered phases together with a description of their anyon
excitations.
The point of view of the characterization
of renormalization group ﬁxed point in terms of bound-
ary density operators is therefore equivalent to the one
in terms of disentangling circuits acting on the bulk, and
both give rise to quantum double models and string nets.
5. The limit to the continuum
A natural question is whether one can also implement a
process inverse to renormalization in the context of tensor
networks. That is, instead of coarse-graining the lattice
to distill the global entanglement pattern, ﬁne-graining
it to obtain a meaningful continuum limit.
Let us ﬁrst discuss this for 1D, following De las Cuevas
et al. (2018); Verstraete and Cirac (2010). As seen in Sec-
(a)
(b)
FIG. 14 The inverse renormalization procedure.
(a) For
MPS, in case E is divisible, one can rewrite the tensor in
terms of two tensors of the same bond dimension and iterate
the procedure; (b) For PEPS in two dimensions, the same
step would imply that the bond dimension of the new tensor
has to be square rooted
tion II.B.3, MPS are characterized by a quantum channel
E (their transfer operator), up to a local basis change. A
blocking step of r sites simply corresponds to taking the
transfer operator to the r’th power, Er, as used in Sec-
tion II.E.1. A ﬁne-graining step would therefore corre-
spond to taking integer roots of E. However, this is subtle
as there exist quantum channels T that cannot be divided
(Wolf and Cirac, 2008), in the sense that there does not
exist any other quantum channel R so that R2 = T. In
order to guarantee a well deﬁned continuum limit, one
needs to require that the transfer operator is inﬁnitely di-
visible, meaning that any posible integer root exists (De
las Cuevas et al., 2018). This in turn is equivalent, up to
a projector P commuting with the given channel E, to
the existence of an inﬁnitesimal generator L which gen-
erates a semigroup etL, t ≥0, that interpolates the initial
E (which corresponds to t = 1) all the way back to t = 0
(Denisov, 1989; Kholevo, 1987). The state obtained by
taking t →0 in this ﬁne-graining process is precisely the
cMPS discussed in Section II.B.4.
The above procedure cannot be easily extended to
higher dimensions. The reason is that the inverse renor-
malization process should produce tensors with non-
integer bond dimensions (as bond dimensions multiply
when blocking), which is impossible.
For instance, in
2D one should get from bond dimension D to tensors of
bond dimension
√
D (see Fig. 14). At some point of the
iteration, the square root will not be an integer, so that
the procedure cannot work. The only way around is if
in some sense, “D = ∞”. In fact, continuous PEPS can
be deﬁned in this way, for instance in terms of path in-
tegrals where the discrete auxiliary indices of the tensors
are replaced by functions which are integrated over when
being contracted (Jennings et al., 2015; Tilloy and Cirac,
2019).
III. SYMMETRIES AND CLASSIFICATION OF PHASES
Symmetries are a main guiding principle in quantum
many-body physics, and the situation is no diﬀerent for
tensor networks.
In fact, one of the main reasons for
the success of tensor networks is precisely the fact that
they make the role of symmetries in many-body systems
so explicit: a quantum state described by an MPS or


---
*Page 31*

31
PEPS |ψN⟩will be invariant under a global symmetry
U ⊗N|ψN⟩if and only if all local tensors transform triv-
ially under that symmetry. As a consequence, any global
symmetry, including symmetries associated to topologi-
cal order, will be reﬂected in the local symmetries of the
tensors describing the many-body states. Phrased dif-
ferently, the entanglement spectrum acts like a signature
of those symmetries. This yields a unifying principle for
describing distinct gapped phases of matter, including
topological ones for which there is no distinct local order
parameter in the sense of Landau (1937): distinct phases
of matter can be distinguished by the diﬀerent ways in
which the local tensors transform under the global sym-
metries.
The local tensors hence provide a non-trivial
generalization of the notion of a local order parameter,
and reduce the problem of classifying diﬀerent gapped
phases of matter to a problem in the representation the-
ory of groups and algebras. It is a well known fact that
there are certain topological obstructions to convert ten-
sors, which transform according to diﬀerent representa-
tions of the same group, into each other continuously.
Those obstructions are precisely the ones responsible for
the existence of topological quantum order.
One of the big success stories of many body physics
has certainly been the realization that global symmetries
can be lifted to local ones by introducing new “gauge”
degrees of freedom. Such a procedure can also be carried
out in the language of tensor networks, and gives rise to
tensors with an increased intrinsic symmetry action on
the entanglement degrees of freedom. The ensuing gauge
theories exhibit fascinating properties such as excitations
with anyonic statistics and non-trivial edge modes, and
the fact that such features directly follow from the sym-
metry properties of the local tensors makes tensor net-
works a natural framework for describing and exploring
quantum topological order. In fact, it can be argued that
tensor networks implement the representation theory of
braided fusion categories, which form the foundation of
both topological and conformal ﬁeld theories.
This section is divided in two parts. The ﬁrst part dis-
cusses symmetries of matrix product states, and is hence
concerned with the classiﬁcation of phases of quantum
spin chains. The second part discusses symmetries of pro-
jected entangled pair states, including the case of quan-
tum topological order. In both cases, we will limit the
discussion to uniform (translationally invariant) systems.
A. Symmetries in one dimension: MPS
1. Symmetric MPS
Normal (injective) uniform matrix product states ex-
hibit the remarkable property that two states |ψ(A)⟩
and |ψ(B)⟩are equal to each other if and only if there
exists a gauge transform X and a phase χ for which
Ai = eiχX−1BiX (Perez-Garcia et al., 2008b). If both
Ai and Bi are in canonical form, then X is guaranteed to
be unitary due to the uniqueness of the ﬁxed point. This
is a consequence of the fundamental theorem of MPS,
and will be discussed at large in Section IV. A useful
feature is the following property of a normal MPS:
X−1AiX = eiχY −1AiY ⇒χ = 0 ∧∃φ : X = eiφY .
(42)
Furthermore,
any translationally invariant normal
MPS has a uniform representation, i.e. the tensors Ai
do not depend on the site label. This property has very
strong consequences for MPS that are invariant under
global on-site, reﬂection and time-reversal symmetries:
it implies that the tensors building up an MPS with
global symmetries must themselves transform trivially
up to a phase under that symmetry. To illustrate this,
let us consider the case of an MPS in canonical form
which is invariant under a global on-site symmetry group
G : U(g)⊗N|ψN⟩≃|ψN⟩. It follows from Eq. (42) that
X
j
Uij(g)Aj = eiφ(g)X†(g)AiX(g) .
(43)
In other words, the 3-leg MPS tensor Ai written as a
vector in a vector space of dimension d.D2 transforms
trivially under the action of e−iφ(g)U(g) ⊗X(g) ⊗¯X(g)
with ¯X(g) the conjugate. This implies that the tensor Ai
can be written in terms of Clebsch-Gordan coeﬃcients of
irreducible representations of the group G and the varia-
tional degrees of freedom can be incorporated by adding
multiplicities (McCulloch and Gul´acsi, 2002; Sanz et al.,
2009b; Singh et al., 2010; Weichselbaum, 2012; White,
1993). Such decompositions have been used since long
and with great success in the context of DMRG. There
are two non-trivial facts that one can conclude from that.
First, the condition of injectivity in conjunction with
translational invariance imposes constraints on the type
of symmetries which can be realized in an MPS. This
is best illustrated by an example.
Let us consider a
spin- 1
2 system with SU(2) symmetry.
As the physical
spin transforms according to a half integer representa-
tion, the Clebsch Gordan coeﬃcients impose that the
virtual irreps alternate between integer and half-integer
representations (Sanz et al., 2009b).
By blocking two
sites, the MPS matrices Ai therefore exhibit two invari-
ant subspaces, and hence the MPS cannot be normal,
which shows that no uniform normal/injective MPS can
exhibit such a symmetry. As will be discussed later, this
is the tensor network manifestation of the Lieb-Schultz-
Mattis theorem.
Second, there is no need for the irreps on the virtual
degrees of freedom to form representations of the group
G: it is perfectly ﬁne if they transform according to pro-
jective representations, that is, representations up to a
phase
XgXh = eiω(g,h)Xgh ,
(44)


---
*Page 32*

32
as such phases leave eiφ(g)U(g) ⊗X(g) ⊗¯X(g) invariant
(Chen et al., 2011a; Pollmann et al., 2010; Schuch et al.,
2011). As an authoritative example, if the physical sys-
tem transforms according to SO(3), the virtual systems
can either both transform according to half-integer or in-
teger representations of SU(2), as readily seen from the
Clebsch-Gordan coeﬃcients; the half-integer representa-
tions of SU(2) form a projective representation of SO(3),
with phases ω(g, h) = 0 or π.
For a given group G, it is a relatively easy task to ﬁnd
all possible projective representations, as the associativ-
ity of matrix multiplication heavily constrains the possi-
ble ω(g, h). If the group is ﬁnite, this can be achieved
by using the Smith normal form, which is similar to the
Schmidt decomposition but with integer arithmetic. The
following picture emerges (Chen et al., 2013): for a given
group G, the diﬀerent projective representations fall into
equivalence classes, where in a given equivalence class,
the projective representations are related to each other
by simple phases : Xg = exp(iφ(g)) ˜Xg. Those phases
are clearly irrelevant from the point of view of MPS as
they cancel, and hence only the equivalence classes count.
Those classes are classiﬁed according to the second co-
homology group H2
α(G, U(1)) with group action α (this
action will be non-trivial when we consider time-reversal
and reﬂection symmetries), and are classiﬁed according
to the solutions of the equation
αg(ω(h, l)) −ω(g.h, l) + ω(g, h.l) −ω(g, h) = 0
mod 2π
(45)
obtained by imposing associativity relations on the pro-
jective representations. The action α is a homomorphism
from G to the automorphism group Z2 of U(1), and hence
consists of ±. In the case of global symmetries excluding
reﬂection and time-reversal, it is just the identity map:
αg(x) = x for all g ∈G. As follows from the Smith nor-
mal form, there are only a ﬁnite number of such equiva-
lence classes for a ﬁnite group, and these are labeled by
integer and hence topological indices.
In the case of a continuous (semisimple) Lie group G,
irreducible projective representations are in one to one
correspondence to irreducible linear representations of
its universal covering group C, from which G is then
obtained by modding out a subgroup Zs of its center
Z: G = C/Zs. Note that the relation between SU(2)
and SO(3) discussed above is precisely of this form. In
that example, half-integer representations of SU(2) corre-
spond to projective non-linear representations of SO(3).
For compact groups such as SO(3), this yields also a ﬁ-
nite number of diﬀerent inequivalent classes of projective
representations (i.e. the second cohomology group is ﬁ-
nite).
Before studying the remarkable physical implications
of those projective representations, let us generalize the
discussion to include time-reversal and/or reﬂection sym-
metries. A symmetry G of the system can be labeled by
a subset of the tuples x = (g, t, r) ∈G ⋊ZT
2 × ZR
2 where
g denotes the physical group action and t, r ∈0, 1 denote
the linear representation of time-reversal and reﬂection.
From now on we will consider G of the form G ⋊H with
H a subgroup of ZT
2 × ZR
2 .
Let us start with discussing a normal MPS in canon-
ical form invariant under pure time-reversal symmetry
represented by the tuple x = (1, 1, 0) corresponding to
the morphism Sx(Ai) = ¯Ai, it is elements-wise conjuga-
tion. As this is a symmetry of the system, the funda-
mental theorem imposes that there exists a Xx and φ(x)
such that ¯Ai = eiφ(x)X†
xAiXx.
As conjugating a ten-
sor twice yields the original tensor, we must have Ai =
Sx(Sx(Ai)) = Sx(eiφ(x)X†
xAiXx) = e−iφ(x) ¯X†
x ¯Ai ¯Xx =
(Xx ¯Xx)†Ai(Xx ¯Xx). By Eq. (42), this is only possible for
Xx ¯Xx = ±11, and as discussed in the next section ±1 is
a topological index. Note that if we had deﬁned time-
reversal symmetry in the form x = (σy, 1, 0), as encoun-
tered in Wigner’s discussion on time-reversal in spin- 1
2
systems, we would have obtained: Ai = Sx(Sx(Ai)) =
(Xx ¯Xx)†Ai(Xx ¯Xx) = σy.σy ¯Ai = −Ai, which is in vi-
olation with Eq. (42). This implies that ground states
of systems exhibiting such a symmetry cannot be repre-
sented by a normal/injective MPS or, phrased diﬀerently,
cannot be unique ground states of a local gapped Hamil-
tonian. This turns out to be the tensor network analogue
of the famous Kramers theorem on time-reversal. From
the mathematics point of view, the obstruction follows
from the fact that the physical symmetry σy acts as a
projective representation under time-reversal.
As has become clear by now, to discuss global symme-
tries labeled by xi = (gi, ti, ri) and x3 = x1 ◦x2, we need
to deﬁne the actions of the symmetries on MPS tensors
in the form Sx
 eiφX†AiX

= eiχ1
x(φ)χ2
x(X)†Aiχ2
x(X):
here we introduced the functions χ1
x(φ) as the mor-
phism on the phase φ and χ2
x(X) the morphism on the
gauge X induced by element x.
As discussed before,
if x = (g, 1, 0) involves time-reversal, then χ1
x(φ) =
−φ + φ(x) and χ2
x(X) = Xx. ¯X with φ(x) and the
gauge tensor Xx depending only on the group element
x.
Similarly, a reﬂection x = (g, 0, 1) in terms of
MPS is implemented by taking the transpose of the
matrices involved: Sx
 eiφX†AiX

= eiφXT (Ai)T ¯X =
ei(φ+φ(x))XT X†
xAiXx ¯X.
Hence in this case χ1
x(φ) =
φ+φ(x) and χ2
x(X) = Xx. ¯X. If a group element involves
simultaneous time-reversal and reﬂection x = (g, 1, 1),
then χ1
x(φ) = −φ + φ(x) and χ2
x(X) = Xx.X. The fun-
damental theorem of MPS imposes that χ1
x forms a linear
representation of the group χ1
x1 ◦χ1
x2 = χ1
x1.x2. This im-
poses a non-trivial constraint on the phases φ(x):
(−1)t1.φ(x2) −φ(x1.x2) + φ(x1) = 0
mod 2π
with t1 = 1 iﬀx1 involves time-reversal. This is precisely
the deﬁning equation for a 1-cocycle of the ﬁrst coho-
mology group H1
β(G, U(1)) with group action βx(φ) =


---
*Page 33*

33
(−1)t(x).φ. For ﬁnite groups and for compact semisim-
ple Lie groups there are only a ﬁnite number of dis-
tinct cocycle solutions of this equation modulo the triv-
ial co-boundary solutions. Indeed, the equivalence class
of a cocycle is obtained by adding a co-boundary to it:
φ(x) →φ(x)+(βx(c)−c) for any constant c, and all such
solutions are indistinguishable from the point of view of
MPS.
Similarly, the fundamental theorem implies that the
morphism χ2
x(.) must form a projective representation of
G: χ2
x1 ◦χ2
x2 = exp(iω(x1, x2))χ2
x1.x2.
Imposing asso-
ciativity in the form χ2
x1
 exp(iω(x2, x3))χ2
x2.x3(X)

=
exp(iω(x1, x2))χ2
x1.x2
 χ2
x3(X)

leads to the following
condition on the phases ω(x1, x2):
(−1)(t1+r1)ω(x2, x3) −ω(x1.x2, x3)
+ω(x1, x2.x3) −ω(x1, x2) = 0
mod 2π
This is precisely the deﬁning equation for a 2-cocycle of
the second cohomology group H2
α(G, U(1)) with group
action αx(φ) = (−1)(t(x)+r(x))φ.
Given a ﬁnite group
G, the ﬁnite number of equivalence classes of this equa-
tion can again be found explicitly by making use of the
Smith normal form. In this case, the co-boundaries cor-
respond to ω(x, y) →ω(x, y) + αx(ξ(y)) −ξ(x.y) + ξ(x)
for any function ξ(x). H2
α(G, U(1)), as it is the case also
for H1
β(G, U(1)), is itself an (abelian) group and hence of
the form Zn × Zm × . . . .
In summary, we have seen that all global symmetries
of uniform normal (injective) MPS wavefunctions are re-
ﬂected in the local tensors Ai of the MPS; these symme-
tries can be represented projectively on the virtual level,
and the classiﬁcation of all possible ways in which this
can occur can be obtained by solving the (integer) linear
algebra problem of ﬁnding all 1- and 2-cocycles of the
group of interest.
2. SPT phases and edge modes
a. Symmetry protected topological order
The way global
symmetries are reﬂected on the local MPS tensors has
very strong implications for the classiﬁcation and descrip-
tion of phases of matter of 1D spin systems. The funda-
mental idea underlying this classiﬁcation is the fact that
the unique ground state of any local gapped quantum
spin chain has an eﬃcient representation in terms of a
normal (injective) MPS. This implies that the classiﬁca-
tion of gapped phases can be done on the level of MPS as
opposed to Hamiltonians, which is a huge simpliﬁcation.
Given
two
translationally
invariant
normal
MPS
parametrized by tensors Ai and Bi, it turns out that
there always exists an interpolation between them (even
if they have a diﬀerent bond dimension) for which all
intermediate MPS are also injective: there is no topolog-
ical obstruction for constructing such a path, and hence
there only exists one phase for gapped quantum spin sys-
tems (Chen et al., 2011a; Schuch et al., 2011) (note that
the situation changes in the case of fermions, as will be
discussed in III.A.4). This problem is equivalent to con-
structing an interpolating path Ai(t) for which the trans-
fer matrix E = P
i Ai(t) ⊗¯Ai(t) has a unique largest
eigenvalue (which is guaranteed to be real). As demon-
strated in Schuch et al. (2011), this can be achieved in
three steps. First, we block diﬀerent sites until the tensor
Ai1Ai2... is injective, and then apply a ﬁltering operation
to bring this blocked MPS into the form of a renormal-
ization group ﬁxed point while keeping the unique largest
eigenvalue property. Second, we can readily interpolate
between any two of such dimer-type wavefunctions by a
local quantum circuit without closing the gap.
In the
third step, we apply another ﬁltering operation to ob-
tain the tensor Bi. The corresponding parent Hamilto-
nian H(t) is guaranteed to be gapped along the path,
demonstrating that any two injective MPS are in the
same phase. For a generalization of this theorem without
the blocking step, see (Szehr and Wolf, 2016).
The situation changes drastically when symmetry con-
straints are imposed on the adiabatic path and hence
on the MPS: a much smaller dimensional manifold can
then be traversed during the interpolation, and topologi-
cal obstructions might occur. Colloquially speaking, the
submanifold of all normal MPS with a given symmetry
decomposes into disconnected components. As a conse-
quence, any symmetry preserving interpolating path be-
tween two states living on diﬀerent components has to
pass through a phase transition, and at this point the
interpolating MPS will not be injective anymore (Chen
et al., 2011a; Schuch et al., 2011). These diﬀerent compo-
nents correspond to diﬀerent symmetry protected topo-
logical phases of matter (SPT phases).
They are pro-
tected by translational invariance, on-site symmetries,
time-reversal symmetry and/or reﬂection invariance.
The necessary mathematical framework for demon-
strating this has been developed in Section III.A.1.
By studying how an MPS Ai transformed under one
or a combination of the above symmetries Sx(Ai) =
exp(iφ(x))X†
xAiXx, it was shown that φ(x) had to be
a 1-cocycle of H1
β(G, U(1)) and that we could associate
to the gauge matrices Xx a map (morphism) χ2
x(X) =
Xx.X or χ2
x(X) = Xx. ¯X (dependent on whether time-
reversal and/or reﬂection invariance is involved) which it-
self forms a projective representation of the physical sym-
metry group:
χ2
x1.
 χ2
x2(.)

= exp(iω(x1, x2))χ2
x1.x2(.).
The corresponding phases are characterized by the topo-
logically distinct 2-cocycles ω(x1, x2) of the second coho-
mology group H2
α(G, U(1)).
A remarkable point is that the opposite is also true:
whenever two injective MPS Ai and Bi exhibit equiva-
lent 1- and 2-cocycles φ and ω when transforming under
the group involving on-site, time-reversal and/or reﬂec-
tion symmetry, then there exists an adiabatic path of


---
*Page 34*

34
injective MPS which interpolates between them.
The
proof of this is basically equivalent to the one sketched
when no symmetries are involved. Within each of these
phases, a representative MPS with zero correlation length
can be constructed starting from any solution of the 1-
and 2-cocycle condition.
The translationally invariant
SPT phases of gapped spin systems for a given sym-
metry group G are therefore completely classiﬁed by
H2
α(G, U(1)) × H1
β(G, U(1)) (Chen et al., 2013). The H2
part has a strong inﬂuence on the entanglement spec-
trum.
The H1 part is related to the translational in-
variance of the system, and is not stable under blocking
(note that the ﬁrst cohomology group indeed plays a cen-
tral role in the description of the space groups).
Let us explicitly construct the RG ﬁxed point MPS
which transforms according to a given 1- and 2-cocycle
φ and ω. The local physical Hilbert space will have the
dimension squared of the number of elements in the sym-
metry group and can be parameterized as a tensor prod-
uct (a, b), while the virtual indices are labeled by the
group elements. The MPS is deﬁned as
Aab
xy =

eiα(a.x).ω(a,x)+iβ(b).φ(b) if y = a.x
0
otherwise
and the corresponding gauge matrices are of the form
(Xg)xy =

eiα(x).ω(x,g)
if y = x.g
0
otherwise
.
This
works
as
the
condition
Sq(Aab)
=
exp(iφ(q))X†
qAabXq
is
equivalent
to
the
2-cocycle
equation. This MPS has zero correlation length (which
follows from the fact that the transfer matrix is a rank
1 projector) and hence represents the renormalization
group ﬁxed point in its corresponding phase.
In the
particular case of e.g. an on-site Z2 × Z2 symmetry,
the simplest group exhibiting non-trivial 2-cocycles,
this construction precisely yields the 1D cluster state
(Appendix A) when blocking pairs of adjacent sites.
The prime example of an MPS in a non-trivial SPT
phase is the AKLT state (Aﬄeck et al., 1988), speciﬁed
by the Pauli matrices Ai = σi, i = x, y, z. Its SPT char-
acter can be protected by multiple distinct physical sym-
metries: on-site SO(3) (with virtual symmetry given by a
spin- 1
2 representation), on-site Z2 ×Z2 (the smallest sub-
group of SO(3) still exhibiting a non-trivial 2-cocycle),
time-reversal, or reﬂection symmetry. In all these cases,
the AKLT MPS tensor transforms projectively.
By making use of the Smith normal form, it is easy
to solve for all cocycle conditions and determine the
number of possible diﬀerent SPT phases by combin-
ing those symmetries.
If we consider the symmetries
of the AKLT state (on-site Z2 × Z2, time-reversal ZT
2
and reﬂection ZR
2 ), we obtain the following classiﬁca-
tion:
H2
α(Z2 × Z2 × ZT
2 × ZR
2 , U(1)) = Z×7
2 , while
H1
β(Z2 × Z2 × ZT
2 × ZR
2 , U(1)) = Z×3
2 . This means that
there are 1024 distinct topological phases protected by
this (large) symmetry group (Chen et al., 2011b). A sim-
pler example is obtained when considering an on-site Z2
in combination with time-reversal, leading to H2
α(Z2 ×
ZT
2 , U(1)) = Z×2
2
and H1
β(Z2 × ZT
2 , U(1)) = Z2. Simi-
larly, H2
α(Z2 × ZR
2 , U(1)) = Z×2
2 , H2
α(ZT
2 × ZR
2 , U(1)) =
Z×2
2
and H2
α(Z2 × Z2 × ZT
2 , U(1)) = Z×4
2 . The submani-
folds of normal MPS subject to global symmetries clearly
exhibit an incredibly rich structure.
b. Entanglement
spectrum
and
edge
modes
In
Sec-
tion II.D, we have seen how PEPS provide a natural way
to access the entanglement spectrum, compute boundary
Hamiltonians, and determine the edge physics of quan-
tum many-body systems. In the context of non-trivial
SPT phases, all of these exhibit characteristic ﬁngerprints
of the phase, which we discuss in the following.
A distinct feature of normal MPS belonging to a non-
trivial SPT phase is the fact that their entanglement
spectrum exhibits a very clear pattern of degeneracies.
The fact that topological order is reﬂected in the entan-
glement spectrum was ﬁrst observed by Li and Haldane
(2008). Pollmann et al. (2012) connected these ideas to
the dangling spin- 1
2 edge modes in the AKLT chain, and
by making use of the fundamental theorem of MPS they
realized that these edge modes were protected. The con-
secutive work of Chen et al. (2013) revealed that the right
mathematical formalism to deal with this phenomenon is
cohomology theory.
The degeneracy of the entanglement spectrum and the
existence of edge modes follows from the following prop-
erty of projective representations Xg: they cannot be
Abelian and cannot be reduced to 1-dimensional repre-
sentations, and hence are only reducible to matrices of
dimension strictly larger than one. Let us ﬁrst consider
the case of on-site group symmetries. If a given injec-
tive MPS is in canonical form and exhibits non-trivial
SPT order, its entanglement spectrum is obtained by
looking at the leading eigenvector of its transfer matrix
P
i Ai ⊗¯Ai|ρ⟩= |ρ⟩. Because of the uniqueness of the
corresponding eigenvalue, ρ has to inherit all symmetries
of the MPS and will hence be invariant under the trans-
formation XgρX†
g = ρ. As Xg has no 1-dimensional in-
variant subspaces, ρ must necessarily have a spectrum in
which all eigenvalues have a degenerate multiplicity. For
the case of time-reversal and/or reﬂection symmetries,
the situation is slightly more complicated. The virtual
degrees of freedom of the MPS in the non-trivial SPT
phase then transform according to an anti-symmetric
gauge transform X = −XT if the MPS is in canonical
form. The entanglement spectrum is then determined by
the eigenvalues of the matrix ρ = X ¯ρX†, with ρ the lead-
ing eigenvector of the transfer matrix. All eigenvalues of
ρ are guaranteed to be degenerate: given a right eigen-
vector |x⟩with (real) eigenvalue λ, ⟨¯x|X−1 is guaranteed


---
*Page 35*

35
to be a left eigenvector with the same eigenvalue. But
⟨¯x|X−1|x⟩= 0 as it is the trace of a product of a sym-
metric with an antisymmetric matrix; this implies that
⟨¯x|X−1 is the left eigenvector corresponding to a diﬀerent
right eigenvector, implying a two-fold degeneracy.
Exactly the same feature is responsible for the fact
that non-trivial SPT phases exhibit edge modes when
deﬁned on systems with open boundary conditions: the
ground state degeneracy of an MPS with respect to its
parent Hamiltonian with open boundary conditions will
at least be the dimension of the irrep space squared, as
we can deﬁne boundary vectors on both sides which will
transform non-trivially under Xg and will not change the
energy. A beautiful feature of MPS is the fact that these
gapless edge modes can actually be constructed by lifting
operators acting on the virtual level to the physical level
(which is always possible when the MPS is normal). For
the case of the AKLT model, this indeed leads to a 4-fold
degeneracy. There is however only one state in this 4-
dimensional space which will be in the spin 0 sector, and
that one will exhibit long-range entanglement between
the two edges. This is a general feature of SPT phases.
c. String order parameters for SPT phases
Symmetry
breaking phases can be distinguished by their local order
parameters. Since SPT phases do not break any symme-
tries, we will need non-local observables to distinguish
them. Such non-local order parameters have since long
been used to study the AKLT model under the name of
string order parameters (Kennedy and Tasaki, 1992; den
Nijs and Rommelse, 1989). In general, if we consider a
gapped quantum spin system with unique ground state
exhibiting a physical symmetry group Ug, we can con-
struct a family of observables acting on L + 2 sites of the
form
Oα,g(L) := Rα ⊗U ⊗L
g
⊗Rα ,
where Rα is an observable that transforms according to
a non-trivial linear representation α(g) of G: U †
gRαUg =
exp(iα(g))Rα (the non-triviality ensures that the local
expectation value of Rα is zero).
We say that a spin
system exhibits string order iﬀfor some Rα and g the
limit limL→∞⟨ψ|Oα,g(L)|ψ⟩̸= 0. Using the language of
MPS, we can readily prove that the existence of such
string order implies the fact that the system is in a non-
trivial SPT phase when the group under consideration
is Abelian (Pollmann and Turner, 2012). This can most
easily be shown by demonstrating the fact that it has to
be equal to zero in the trivial phase, i.e. in a phase in
which the virtual symmetries Xg form a group represen-
tation of G. As Ug represents a physical symmetry, the
expectation value of ⟨Oα,g⟩(in the thermodynamic limit)
is equivalent to evaluating the product XL
α,g.XR
α,g
⟨Sα,g⟩=
A
A
A
A
ρl
ρl
ρr
ρr
R¯α
Rα
Xg
X†
g
We could also have calculated this expectation value
starting from the state U ⊗N
h
|ψ⟩. By pulling this symme-
try to the virtual level, a simple manipulation of the ten-
sors then shows that XL
α,g = eiα(h)XL
α,hgh−1. As we as-
sumed the group to be Abelian and the one-dimensional
irrep α(h) to be non-trivial, this implies that the expec-
tation value of the string order parameter has to be equal
to zero.
The
expectation
value
of
the
string
order
pa-
rameter can certainly be non-zero in the case of
a non-trivial SPT phase;
in that case (and again
assuming
an
Abelian
group),
we
obtain
XL
α,g
=
eiα(h)+ω(h,g)+ω(h.g,h−1)XL
α,hgh−1.
As
the
group
is
Abelian, ω(h.g, h−1) = −ω(g, h), and hence the expec-
tation value does not have to vanish if α(h) = ω(g, h) −
ω(h, g). This is precisely what happens in the case of the
AKLT chain and considering the string order parameter
for the Z2 × Z2 symmetry. Note that not all SPT phases
are detectable using this idea (Pollmann and Turner,
2012); this happens when all the commuting pairs of el-
ements g1 and g2 also commute in the projective repre-
sentation.
A related idea which directly measures an observable
targeting the commutator exp(i(ω(g, h) −ω(h, g))) ≃
Tr(XgXhX†
gX†
h) can be deﬁned in terms of swaps be-
tween distant regions, see Haegeman et al. (2012a) for
details.
3. Symmetry breaking: virtual symmetries,
Lieb-Schultz-Mattis, Kramers theorem, topological excitations
a. Virtual symmetries
Let us now consider the case of
non-injective MPS which is invariant under a global
symmetry.
After blocking, the tensor Ai correspond-
ing to a non-injective MPS can always be written as
a direct sum of injective MPS blocks Ai = L
α Ai
α.
The full MPS is hence a sum of these injective ones:
|ψ(Ai)⟩= P
α |ψ(Ai
α)⟩.
W.l.o.g.
we will assume that
the non-injective MPS Ai cannot be decomposed into
smaller blocks that are themselves invariant under the
symmetry group G under consideration; the global sym-
metry then permutes all the blocks into each other. This
situation happens precisely when considering the uniform
superposition of all ground states of a symmetry broken
system. The paradigmatic example of such a system is
given by the ferromagnetic Ising model H = −P
i ZiZi+1
with global symmetry X⊗N, where the symmetric ground
state is the superposition of all spins up and all spins


---
*Page 36*

36
down. This state can readily be represented as an MPS
with bond dimension 2: A↑= |0⟩⟨0|, A↓= |1⟩⟨1|. This
so-called GHZ state exhibits long-range order. Because
the corresponding MPS is not injective, the tensors Ai ex-
hibit a non-trivial symmetry G on the virtual level rep-
resented by the matrices that commute simultaneously
with all Ai (σz in this GHZ case). MPS with this prop-
erty are called G-injective. Note that this symmetry is
dual to the physical symmetry which permutes the blocks
(represented by σx in the case under consideration).
For a given group G, one can construct a particularly
simple G-injective MPS which is itself a renormalization
group ﬁxed point (all nonzero eigenvalues of the corre-
sponding transfer matrix are equal to 1) and hence pro-
vides a natural generalization of the GHZ to arbitrary
groups.
The physical symmetry action is represented
by the regular representation. It is deﬁned by the MPS
tensor with physical dimension |G|2 and virtual dimen-
sion |G|:
Aij =
1
|G|
X
g∈G
X
α,β
(Lg)αi
 ¯Lg

βj |α)(β| ,
(46)
here Lg denotes the left regular representation of the
group G (Schuch et al., 2010). For the case of Z2 sym-
metry, this can be written in the GHZ form by going to
the dual basis (related by the discrete Fourier transform)
both on physical and virtual level and with a blocking of
two sites. Such a construction will be shown to be es-
pecially useful to construct topological phases in higher
dimensions.
b. SET phases
In many interesting physical applica-
tions, only part of the total symmetry of the system is
broken, while another part is unbroken. From the point
of view of MPS, the broken symmetry leads to permuta-
tions of the diﬀerent MPS blocks, while the unbroken one
exhibits symmetries on the virtual level as encountered
in the discussion of injective MPS. To accomodate both
of these symmetries, the corresponding gauge representa-
tions Xg acquires the form of an induced representation.
Induced representations are a technique in representation
theory to lift representations Xh of a subgroup H to rep-
resentations of the full group G, that we will assume to be
ﬁnite. Given a subgroup H, we can consider one repre-
sentative ˜gα out of every left coset α = g.H; any element
of G can then uniquely be written as ˜gα.hβ. This deﬁnes
functions φ1, φ2 such that ga.˜gα = ˜gφ1(a,α).hφ2(a,α). The
induced representation is then given by
Va =
X
α
|φ1(a, α)⟩⟨α| ⊗Xhφ2(a,α)
It acts as the regular representation between the
blocks, but as an irrep within each individual block. This
is indeed precisely the symmetry exhibited by symmetry-
enriched topological phases (SET phases): the Xh ma-
trices form (possibly projective) representations of the
unbroken symmetry group, while the broken symmetries
yield permutations of the diﬀerent blocks of the non-
injective MPS. Along the lines of the discussion on SPT
phases, it can now be established that two systems are in
the same phase if and only if the permutation represen-
tations φ1(a, α) are equal to each other and furthermore
that the Xh must belong to the same equivalence class
of H2(H, U(1)) (Schuch et al., 2011). An alternative ap-
proach based on a 1D version of anyon condensation is
explained in Garre-Rubio et al. (2017).
c. Kramers theorem and Lieb-Schultz-Mattis
One of the
most fascinating aspects of quantum spin chains is the
beautiful interplay between symmetry and degeneracy.
This has led to a wealth of theorems, of which Kramers’
Theorem (Kramers, 1930), the Lieb-Schultz-Mattis theo-
rem (Lieb, Schultz, and Mattis, 1961), and the Mermin-
Wagner theorem (Mermin and Wagner, 1966) are cer-
tainly the most famous and useful ones. Let us discuss
these in the light of MPS.
Kramers’ theorem dictates that eigenstates of time-
reversal invariant systems must be degenerate if the total
spin of the system is half-integer. More precisely and in
the case of spin- 1
2, the theorem is valid whenever time-
reversal is implemented as an anti-unitary transforma-
tion in the form |ψ⟩→(σy)⊗N|ψ⟩as originally derived
by Wigner (see Bargmann, 1954). In Sec. III.A.1, it was
shown that no normal uniform MPS can exhibit such a
symmetry, as there is a topological obstruction involv-
ing the global phase making it impossible for a normal
uniform MPS to accomodate an on-site symmetry which
acts projectively.
To deal with such a situation, we hence have to modify
the uniform MPS ansatz. In the case of spin- 1
2, this is
most easily done by introducing an ansatz with a two-site
unit cell:
|ψ(A, B)⟩=
X
Tr
 Ai1Bi2Ai3Bi4 · · ·

|i1⟩|i2⟩· · ·
(47)
A careful analysis of the possibilities leads to the conclu-
sion that there always exists a gauge such that Bi can
be chosen equal to one of the following : ¯Ai, (σy ⊗11) ¯Ai
or (σy ⊗11) ¯Ai(σy ⊗11). The other (degenerate) ground
state is then obtained by either shifting the MPS over
1 site, or by acting with the time-reversal symmetry on
the state. The total time-reversal invariant uniform MPS
can then be written as the superposition of both, yielding
a non-injective MPS with tensors
 0
Ai
Bi
0

(48)


---
*Page 37*

37
Note that this MPS has no invariant subspaces, but ex-
hibits the structure of a limit cycle (see Sec.IV.A). Only
by blocking two sites do we get a G-injective structure.
Note also that a translational-invariant breaking term
in the Hamiltonian can distinguish the two blocks: the
blocked MPS ˜Aij = AiBj is injective and is hence the
unique ground state of a local Hamiltonian. This is pre-
cisely the mechanism in the Su-Schrieﬀer-Heeger model
(Su et al., 1979), where a staggered ﬁeld opens a gap and
leads to a unique ground state.
Similarly, the Lieb-Schultz-Mattis theorem dictates
that the singlet ground state of an SU(2) invariant quan-
tum spin chain whose unit cell transforms according to
a half-integer representation of SU(2) must be gapless
or symmetry broken. This theorem has been extended
to the case of any half-integer charge, for example for
the case of a U(1) symmetry with one charge per two
unit cells (Oshikawa et al., 1997).
From the point of
view of MPS, this situation is very similar to the case of
Kramers’ theorem. As discussed in Section III.A.1, the
structure of Clebsch-Gordan coeﬃcients imposes that a
half charge couples to one half-integer and one integer
charge. As a consequence, the MPS will be exactly of the
form of Eq. (48) with Bi related to Ai by e.g. a transpose.
Just as in the case of Kramers theorem, it follows that
any MPS with such a symmetry will be non-injective,
and will become G-injective after blocking two sites. In
the case of a spin- 1
2 antiferromagnetic Heisenberg model,
the ground state is critical, and can hence not be repre-
sented exactly as an MPS. Nevertheless, DMRG meth-
ods are able to reproduce the ground state energy to
an astounding precision with an MPS exhibiting SU(2)
symmetry. What happens is that the DMRG algorithm
is artiﬁcially introducing a tiny staggering in the anti-
ferromagnetic strength, a relevant perturbation opening
up a gap, breaking the translational invariance. In the
uniform case, we will get an MPS of the form Eq. (47),
and this representation will be of central importance to
capture the topological non-trivial spinon excitations.
Finally, let us say a few words about the Mermin-
Wagner theorem, which states that a continuous sym-
metry in a quantum spin chain cannot be broken with
an order parameter (observable) that does not commute
with the Hamiltonian. As the unique ground state of a
local gapped Hamiltonian can be represented as an in-
jective MPS, the impossibility of deﬁning an MPS with
the relevant symmetries of the Hamiltonian (including
translational invariance) implies that the ground state of
that Hamiltonian has to be critical or has to break trans-
lational invariance. If the ground state is critical, any
good variational (hence injective) MPS approximation of
that ground state will either have to break the continu-
ous symmetry or the translational invariance; which one
leads to a better approximation depends on the respec-
tive scaling exponents of both perturbations.
d. Topological excitations: domain walls and spinons
A di-
rect implication of symmetry breaking is the emergence
of topological excitations. In the case of G-injective MPS
such as the Ising model in the ferromagnetic phase, these
are domain wall excitations that tunnel between the dif-
ferent blocks Ai
α of the MPS (Haegeman et al., 2012b):
|ψ(X)⟩=
X
· · · Aix−2
1
Aix−1
1
eikxXixAix+1
2
· · ·
O
|iy⟩,
(49)
where Xix is a “tunneling” tensor which couples the dif-
ferent blocks Ai
1 and Ai
2, and the sum runs over all iy
and all positions x of X. Note that such excitations only
make sense for an open inﬁnite system, and that the mo-
mentum k is only deﬁned up to a constant shift. This
ansatz can readily be used to simulate dispersion rela-
tions of the elementary excitations of symmetry broken
quantum spin chains, where the variational parameters
of these excitations are encoded in Xi, giving rise to an
eﬀective Hamiltonian for the quasi-particle excitations.
The topological trivial excitations can then be under-
stood as scattering states of such domain walls.
This
structure also emerges when studying excitations of crit-
ical systems using a variational MPS approach: the MPS
will slightly break the symmetry, and the elementary ex-
citations will then tunnel from one ground state to the
other one.
This was e.g. observed when studying the
elementary excitations of the Lieb-Liniger model using
cMPS (Draxler et al., 2013).
A similar situation occurs when the translation sym-
metry is broken instead of the on-site symmetry, as dis-
cussed in relation to Kramers and Lieb-Schultz-Mattis.
The MPS description then acquires a · · · ABAB · · · or
· · · ABCABC · · · etc.
structure.
The elementary ex-
citations become (topological) dislocations of the form
· · · ABABXAB · · · . If we consider the Heisenberg spin-
1
2 antiferromagnet and its MPS description with such a
2-site unit cell, the emerging topological excitations are
spinons: the corresponding tensor Xi transforms accord-
ing to a half-integer object, as it intertwines between two
MPS tensors which have the same half-integer or integer
spin index (Zauner-Stauber et al., 2018). This is a topo-
logical feature as there is clearly no local operator which
can create such an excitation. The MPS picture hence
gives a very precise meaning to the spin in a spin wave,
as originally coined by Faddeev and Takhtajan (1981).
In general, the framework of MPS makes it very clear
how elementary excitations can acquire fractionalized
quantum numbers. This will even be more pronounced in
the case of 2 dimensions, where PEPS provides a natural
framework for describing anyons.
4. Fermions and the Majorana chain
The case of virtual symmetries becomes particularly
intriguing when symmetry breaking is prohibited due


---
*Page 38*

38
to the existence of a superselection rule.
This hap-
pens in the case of a chain of fermions, where super-
positions between states with an even and odd number
of fermions are ruled out. In contrast to the situation
of symmetry breaking discussed in the previous section,
the fermion superselection rule has the power to stabilize
a G-injective GHZ state, as all corresponding symmetry
broken states |ψ (Aα)⟩would violate the superselection
rule.
This scenario was ﬁrst discussed by Kitaev (2001), and
the corresponding non-trivial Hamiltonian is called the
Kitaev or Majorana chain. He demonstrated that there
are 2 distinct phases for interacting fermionic spin chains,
and hence that there is no adiabatic gapped path between
the trivial phase and the Majorana phase. The ground
state of the Kitaev chain is a fermionic MPS with bond
dimension 2. As discussed in Section II.B.4, the natural
language for fermionic MPS is the one in terms of Z2
graded algebras. Just as happened in the case of SPT
phases, the Kitaev chain has edge modes which are ex-
ponentially localized around the boundary, and this can
be understood in terms of the entanglement degrees of
freedom which exhibit the virtual symmetry. When con-
sidering the Kitaev chain on a ring with periodic bound-
ary conditions, the ground state is unique and has odd
parity (see Eq. (10)):
|ψ⟩=
X
i1···iN
tr

Y Ai1Ai2 · · · AiN 
|i1⟩⊗g |i2⟩⊗g · · · . (50)
The tensors A0 = 11 and A1 = Y = σy both commute
with Y which forms the representation of the virtual sym-
metry, and hence the MPS is non-injective and can be
written as a sum of two injective MPS |ψ1⟩+ |ψ2⟩. The
symmetry broken states |ψi⟩however contain superposi-
tions of an even and odd number of fermions, and are
hence unphysical.
As demonstrated in Bultinck et al.
(2017a), the uniqueness of the ground state is guaranteed
by the Z2 graded version of injectivity. For a system with
open boundary conditions, we get a 2-fold degeneracy as
opposed to a 4-fold one as in the case of the AKLT model;
the Hilbert space ”dimension” of a Majorana fermion is
indeed
√
2 as opposed to 2. As a consequence, the Ma-
jorna chain has the unique feature that the system with
periodic boundary conditions can be represented through
an MPS with open boundary conditions and bond dimen-
sion 2.
There is also an intriguing interplay between time-
reversal symmetry and the Z2 superselection rule.
As
ﬁrst demonstrated by Fidkowski and Kitaev (2010), 8
diﬀerent SPT phases emerge. This has to be contrasted
to the spin case, where time-reversal gives rise to only
2 cases. These 8 phases can be distinguished by study-
ing how the entanglement degrees of freedom transform
under the time-reversal symmetry, and this gives rise to
3 diﬀerent indices (Bultinck et al., 2017a). The ﬁrst in-
dex distinguishes the Majorana case (with a virtual Z2
symmetry) from the trivial non-Majorana case (without
such a symmetry). A new Z2 index κ emerges according
to the transformation rules under conjugation of the ten-
sors ¯Ai = eiχXAiX−1; just as in the case of spins, the
index κ is witnessed by ¯X.X = (−1)κ11. A third Z2 index
µ characterizes how the matrix Y , which represents the
center of the MPS algebra, transforms under the gauge
X: X.Y = (−1)µY.X. Those three Z2 indices give rise
to the celebrated Z8 classiﬁcation of interacting fermionic
spin chains, and a representative of each of the 8 classes
can be constructed by taking tensor products of Kitaev
chains.
A wide variety of such fermionic SPT phases can
be constructed by repeating this construction for other
groups and symmetries. In analogy to the discussion on
SET phases, this can be achieved by making use of in-
duced representations, where the physical and purely vir-
tual symmetries are combined in a natural way.
5. Gauge symmetries
The idea of lifting global symmetries to local ones by
introducing new gauge degrees of freedom has proven
to be of fundamental importance in the ﬁeld of parti-
cle physics. It turns out that a procedure similar to the
minimal coupling prescription can be implemented on the
level of wavefunctions whenever these are expressed in
terms of MPS (Buyens et al., 2014; Kull et al., 2017):
starting with an MPS describing matter ﬁelds with a
global symmetry Ug implemented (projectively) on the
virtual degrees of freedom as Xg, it is straightforward
to introduce new (gauge) degrees of freedom and tensors
on the edges which will lift the global symmetries to lo-
cal ones. To achieve this, let us consider a tensor with
physical degrees of freedom corresponding to the group
elements, and deﬁne it as:
Aa−1.b =
X
ab
|a)|a−1.b⟩(b|
(51)
Acting with the left regular representation Lg on the
physical level is equivalent to acting with the right reg-
ular representation Rg on |a) →|ag), and acting with
the right regular representation Rg on the physical level
amounts to acting with Rg−1: (b| →(bg−1|. Note that
this tensor provides the natural generalization of the
GHZ-state in the dual basis for any group.
6. Critical spin systems: MPO symmetries
In Section III.A.3, we have discussed the diﬃculty of
representing ground states of critical quantum spin sys-
tems using injective MPS, and hinted to the fact that
there are topological obstructions to do so. Whenever


---
*Page 39*

39
the (continuous) symmetries of a translationally invari-
ant quantum spin Hamiltonian cannot be represented by
a uniform injective MPS, then the ground state of that
Hamiltonian has to either be critical and exhibit power
law decay of its correlations, or exhibit symmetry break-
ing.
An important question is the characterization of
the nonlocal symmetries emerging for such critical sys-
tems which prevent the exact description of their ground
states with ﬁnite bond dimension MPS. The formalism of
matrix product operators (MPO) provides exactly that.
Additionally, the MPO formalism provides a constructive
way of writing down Hamiltonians with such a symmetry.
It turns out that the same symmetries are the ones re-
sponsible for the existence of non-chiral topological order
in 2 + 1 dimensions. This is of course not surprising, as
there is a very intimate connection between topological
quantum ﬁeld theory in 2 + 1 and conformal ﬁeld theory
in 2 + 0 or 1 + 1 dimensions (Elitzur et al., 1989; Fuchs
et al., 2002; Moore and Seiberg, 1989; Witten, 1989).
This section therefore also provides the mathematical
background for studying topological gapped systems in 2
dimensions.
The symmetries under consideration have been studied
at great length in the ﬁelds of quantum groups, integra-
bility and conformal ﬁeld theory. The picture that has
emerged is that critical spin systems exhibit ”topolog-
ical symmetries” or anomalies that can be seen as lat-
tice remnants of the full conformal group (Aasen et al.,
2016; Vanhove et al., 2018). In the example of the critical
quantum transverse Ising model, this ”symmetry” corre-
sponds to the famous Kramers-Wannier duality, and the
scale-invariant symmetry operations form a closed alge-
bra as opposed to a group.
Matrix product operators
are precisely the right framework to provide represen-
tations of these algebras (Bultinck et al., 2017; Lootens
et al., 2021; Molnar et al., 2021; S¸ahino˘glu et al., 2014;
Williamson et al., 2017).
a. MPO algebras
Given a tensor
in canonical form (in each direction) we can deﬁne the
algebras
A(N) =
n
X
· · ·
: X
o
with N the system size. We can identify all A(N) if the
product is independent of N. In such a case we say that
the algebra
A =
n
X
: X
o
is an MPO algebra (Bultinck et al., 2017; Molnar et al.,
2021).
A series of non-trivial consequences can be derived
from this deﬁnition; for the precise mathematical state-
ments, we refer to Lootens et al. (2021):
1. Any MPO algebra can be decomposed into a ﬁ-
nite set of injective MPOs represented as Oa with
a taken from a set of labels a ∈C; these Oa form
a ring with nonnegative integer fusion coeﬃcients
N c
ab: OaOb = P
c N c
abOc. We use the notation 2Fa
for describing the MPO tensors.
2. The Fundamental theorem of MPS implies the ex-
istence of a fusion tensor 1F which satisﬁes the fol-
lowing zipper equation:
=
2F 1F = 1F 2F 2F
If the labels a ∈C correspond to the irreps of
a group, then the 1F can be identiﬁed with the
Clebsch-Gordan coeﬃcients.
3. Associativity of the zipper equation requires the
existence of a recoupling tensor 0F which solely de-
pends on the set of labels a ∈C satisfying the fol-
lowing equation:
≃
1F 1F = 0F 1F 1F
If the labels a ∈C correspond to the irreps of a
group and the MPO tensors encode these irreps,
then the 0F are equal to the Racah or Wigner 6j
symbols.
4. Any recoupling tensor 0F has to satisfy the ubiqui-
tous algebraic pentagon equation. For given MPO
fusion rules N c
ab, there only exists a ﬁnite number
of possible inequivalent solutions to the pentagon
equation. This puts a huge restriction on the pos-
sible MPO algebras, and puts its study squarely in
the realm of fusion categories.
5. The scale invariance of the MPO algebra implies
the existence of a diﬀerent set of fusion tensors 3F
acting on the physical degrees of freedom satisfying
the following pulling through equation:
=
2F 3F = 3F 2F 2F
It follows that there also exists a dual algebra ob-
tained by switching the role of physical and virtual
indices of the MPO tensor 2F; note that this is
precisely the same duality as the one described in


---
*Page 40*

40
Sec. II.E.2 describing renormalization group ﬁxed
points. This vertical MPO algebra can now again
be decomposed into its injective blocks, giving rise
to a new set of discrete labels α ∈D and fusion
coeﬃcients ˜N γ
αβ.
This D will also form a fusion
category. As will become clear from Sec. III.B, we
also call 3F the PEPS tensor.
6. Recoupling of the fusion tensors 3F implies the ex-
istence of a set of fusion tensors 4F satisfying:
≃
3F 3F = 4F 3F 3F
7. The tensor 4F satisﬁes the pentagon equation, with
solutions completely determined by ˜N k
ij.
The 5 objects iF and accompanying six consistency
equations appear in the ﬁeld of tensor categories and form
the deﬁning equations of a bimodule category. Such cat-
egories have been studied extensively in the context of
describing boundaries between systems exhibiting topo-
logical quantum order (Kitaev and Kong, 2012), but have
a completely diﬀerent meaning here.
A (C, D) bimodule category M has a new set of la-
bels A, B, . . . ∈M which will represent the entangle-
ment degrees of freedom and therefore the choice of this
bimodule category determines the explicit representation
of the MPO/fusion/PEPS tensor. We can then identify
the fusion, MPO and PEPS tensors as follows (note that
all tensor legs are labelled by triple indices belonging to
either C, M or D, some of which might be trivial):
 1F abC
A
B,kj
c,mn =
j
k
n
m
a
b
c
A
B
C
 2F aCα
B
D,nk
A,jm =
a
α
m
j
n
k
A
B
D
C

3F Aαβ
B
γ,km
C,jn =
α
β
γ
A
C
B
j
n
m
k
For bimodule categories that are invertible, the cate-
gories C and D are Morita equivalent; this requires that
their Drinfeld doubles or Drinfeld centers are equivalent.
As described in Section III.B.3, this Drinfeld center has a
very tangible physical meaning as it represents the (out-
put) fusion category of the anyon excitations in topo-
logical phases of matter described by string nets deﬁned
by the (input) category D; equivalently, it describes the
primary ﬁelds for lattice realizations of CFTs. A partic-
ularly simple choice of an invertible bimodule category is
obtained by choosing C = D = M; in that case, all iF
symbols are equal and the six pentagon equations are all
equivalent (Bultinck et al., 2017).
Instead of the categorical description which arises nat-
urally from the fundamental theorem of MPS, an equiva-
lent formulation of MPO algebras in terms of weak Hopf
algebras appears in Molnar et al. (2021), where the size
independence of the MPO algebra is formalized in the
form of a co-multiplication
∆
 
!
=
X
X
This equivalence makes the seminal result of (Hayashi,
1999) connecting fusion categories with weak Hopf alge-
bras very explicit. The additional known connection with
subfactor theory is also made explicit for MPO algebras
in (Kawahigashi, 2020).
The central pulling through equation can also be
rephrased completely in terms of the full MPO algebra
(Molnar et al., 2021; S¸ahino˘glu et al., 2014):
λ
=
λ
(52)
Here λ is an extra block diagonal tensor which is a di-
rect sum of identities acting on the invariant subspaces
of the MPO tensors, and weighted with the quantum di-
mensions of categorical objects corresponding to related
MPO injective blocks. Moreover, reversing the arrows,
as done in the right and bottom tensors, means taking
the inverse representation (Bultinck et al., 2017).
Let us illustrate this with an example, for which C
represents the labels of a group g ∈G and α ∈D the
labels of its irreps Dα, each α appearing as many times
as its dimension. M can then be chosen to be trivial,
and the injective MPOs Og is represented by the MPO
tensors
Ag =
X
αij
Dα(g)ij |g)(g| ⊗|i, α⟩⟨j, α|
where we keep using the notation already established in
Section II.B.1: curved ket/bras | · ) correspond to the vir-
tual level and standard ones | · ⟩to the physical one.
Up to a unitary transformation on the physical indices,
this is equal to Ag = |g)(g|⊗Lg, with Lg the regular rep-
resentation, and leads to the representation for quantum
doubles used by Schuch et al. (2010). The G-injective
MPO is then deﬁned as (compare with (46))
1
|G|
X
g∈G
L⊗N
g
(53)


---
*Page 41*

41
The corresponding pulling through equation (52) then
becomes equal to
L⊗2
h
⊗(11⊗2)
X
g
L⊗2
g
⊗L⊗2
g−1 =
=
 X
g
L⊗2
g
⊗L⊗2
g−1
!
(11⊗2) ⊗L⊗2
h
which is trivially true.
Stepping up one level of sophistication, MPO alge-
bras can accommodate 3-cocycles, corresponding to non-
trivial solutions to the pentagon equations and requiring
non-trivial entanglement degrees of freedom ∈M (Buer-
schaper, 2014; Williamson et al., 2016). The most general
MPO algebras form representations of all bimodule cat-
egories with a spherical structure (Lootens et al., 2021).
b. MPO symmetries
The pulling through equation for
the 2F tensors can be used to deﬁne operators that com-
mute with the full MPO algebra:
=
If these tensors can be made Hermitian, they deﬁne a
Hamiltonian on a one-dimensional lattice by taking the
sum of their translations; the corresponding full Hamilto-
nian will commute with the complete MPO algebra. All
so-called anyonic spin chains (Gils et al., 2009) can be
constructed in that way, and the MPO symmetries hence
realize the corresponding topological symmetries.
Let us illustrate this with two simple examples. If one
considers the two unitary solutions of the pentagon equa-
tions for the fusion rules corresponding to the group Z2,
one of them corresponds to a non-trivial 3-cocycle. The
local Hamiltonian commuting with the corresponding
MPO is precisely the cluster state Hamiltonian with crit-
ical magnetic ﬁeld (Bridgeman and Williamson, 2017),
which is equivalent to the XY model (Lahtinen and Ar-
donne, 2015). Similarly, if one starts from the Ising fu-
sion rules, one obtains the critical Ising model in trans-
verse magnetic ﬁeld, and for the Fibonacci fusion rules,
the critical “golden chain” Hamiltonian emerges (Lootens
et al., 2019; Vanhove et al., 2018).
In a similar vein, it is possible to construct classical
statistical mechanical lattice models using this construc-
tion; the construction gives rise to the RSOS models of
Andrews, Baxter and Forester (Aasen et al., 2016; An-
drews et al., 1984), which are known to yield lattice crit-
ical systems corresponding to all CFTs in the minimal
series.
This clearly suggests that the MPO symmetry is ex-
actly the one that is responsible for criticality; it emerges
at the critical point, and provides a topological obstruc-
tion for a normal/injective MPS to have such a sym-
metry.
Strictly speaking, it is not a symmetry as the
MPOs do not have to be invertible; in the case of the
Ising model for example, the MPO implementing the
Kramers-Wannier duality is not invertible, and this is a
consequence of the fact that the critical theory must both
be symmetric with respect to the local Z2 symmetry and
the dual disorder symmetry (Kadanoﬀand Ceva, 1971)
which anticommute. Furthermore, it can be shown that
a perturbation which commutes with the full MPO alge-
bra and keeps translational invariance is generically pro-
hibited from opening a gap (Buican and Gromov, 2017).
However, MPO symmetries are not enough to guarantee
criticality, as MPOs only encode the topological features
of critical systems; extra constraints related to the ge-
ometry, the so-called discrete holomorphicity, have to be
imposed and lead to a lattice version of the conformal
symmetry (Fendley, 2021).
For the present discussion, let us now demonstrate that
a uniform normal MPS cannot exhibit an MPO symme-
try obtained from a non-trivial solution of the pentagon
equations.
For the group case of 3-cocycles, this was
originally proven by Chen et al. (2013) (see also Molnar
et al., 2018b; Williamson et al., 2016), and their proof
can readily be extended to the general case of MPO al-
gebras. It is proven by contradiction, and is based on the
fundamental theorem. Let us sketch the proof.
First, if we act with an MPO Oα on an injective MPS
|ψ(A)⟩and it is proportional to |ψ(A)⟩, the fundamental
theorem implies the existence of an intertwiner Vα which
reduces the local tensors of the MPS Oα|ψ(A)⟩back those
of the original one:
α
Vα
=
Vα
If we act with 2 MPOs, then there are two inequivalent
ways of reducing to the original one: either we ﬁrst reduce
the MPS and Oα via Vα, followed by Vβ, or we can ﬁrst
reduce the two MPOs with the intertwiner F:
β
α
F γ
αβ
=
γ
F γ
αβ
Note that in the case of multiple fusion channels γ, it
is immaterial which fusion channel is taken as long as
it does not give zero.
It has been proven by Molnar
et al. (2018b, Theorem 22) that these 2 ways of reducing
to an injective MPS must be equivalent up to a scalar
λ(α, β; γ).
α
Vα
β
Vβ
= λ(α, β; γ)
α F γ
αβ
β
Vγ


---
*Page 42*

42
We now act with three MPOs on the supposed injec-
tive MPS for which all of them are symmetry operators.
Just as in the deﬁning equation of the pentagon equation,
there are two diﬀerent ways of changing the order of the
reductions, and both have to be equivalent. If follows
that
λ(α, β; a).λ(a, γ; b)
λ(β, γ; c).λ(α, c; b) = F αβγ
bac
There is however a topological obstruction to achieve
this: a non-trivial solution F of the pentagon equation
can never be a simple product of functions which act
exactly as gauge transforms on these same F-symbols.
In the case of groups and 3-cocycles, the left hand side
corresponds exactly to the co-boundary and enforces the
F-symbol to be trivial.
This is the contradiction, and
proves that the MPS cannot be injective. As a conse-
quence, any Hamiltonian with an MPO symmetry will
either be critical or have a symmetry broken groundstate
space.
This theorem is very powerful and is a clear demon-
stration of the fact that MPO symmetries yield a Lieb-
Schultz-Mattis-like proof for “topological” symmetries as
opposed to continuous ones. Note that the proof assumed
no fusion multiplicities, it is all N c
ab ≤1, and coun-
terexamples can be constructed if this is not the case.
Note also that a non-trivial MPO symmetry does not
prevent a tensor network description for density matri-
ces, as the renormalization group ﬁxed points discussed
in Section II.E are exactly of that form.
Similarly, it
is possible to construct MERA with non-trivial MPO
symmetries, and hence allows for the description of crit-
ical phases with exact topological symmetries (Bridge-
man and Williamson, 2017). Those two facts turn out
to be intimitaly related to each other, as the entangle-
ment Hamiltonian of a MERA is exactly of the MPO
form (Van Acoleyen et al., 2020).
The fact that local Hamiltonians which commute with
non-trivial MPO symmetries necessarily have to be crit-
ical or symmetry broken has a crucial inﬂuence on the
edge modes of systems exhibiting topological quantum
order in 2 dimensions, and is the origin of the CFT-
TQFT correspondence and anomalies on these edges.
This will be discussed in Section III.B. The MPO picture
for describing critical quantum spin systems transcends
to the statistical mechanical world, in which the MPOs
become Wilson loop type operators which generalize the
disorder operators introduced in the context of the 2D
Ising model by Kadanoﬀand Ceva (1971). A systematic
study of these MPO symmetries allows to represent all
ﬁelds, including the chiral ones, in terms of the so-called
tube algebra, which is an MPO algebra representing the
Drinfeld Center of the input category. Many of the in-
triguing properties of conformal ﬁeld theories can as such
be transmuted to the lattice, including notions like orb-
ifolding and the coset construction (Lootens et al., 2019).
B. Symmetries in two dimensions: PEPS
The full power of symmetries in tensor networks is re-
vealed in the description of quantum many body systems
in two dimensions by PEPS, in which diﬀerent phases of
matter can be distinguished by the diﬀerent represen-
tations of these symmetries acting on the local PEPS
tensors. As such, tensor networks provide local order pa-
rameters for topological phases of matter as a direct man-
ifestation of the entanglement properties of such systems.
The most general language for describing these symme-
tries is in terms of matrix product operators, which play
the role of Wilson loops on the virtual level. These MPOs
provide a unifying framework for describing both the en-
tanglement structure of the ground state manifold and
for characterizing the elementary excitations in these sys-
tems.
1. Symmetric PEPS
The arena of topological quantum phases in two di-
mensions is much richer than the one for quantum spin
chains. From the tensor network point of view, this can
be understood from the fact that tensors have a much
richer but also more complicated structure than matri-
ces. The most general form of the fundamental theorem
of MPS, on which much of the previous section was built
upon, does not have an easy generalization to two di-
mensions, and we will therefore concentrate on the cases
for which the symmetries on the virtual level can be de-
scribed in terms of tensor products of local operators or
of matrix product operators.
We will distinguish ﬁve diﬀerent situations: a.
the
case of injective PEPS, describing gapped systems with
a unique ground state; b. non-injective PEPS as unique
ground states of gapped SPT phases; c.
non-injective
PEPS as ground states of systems exhibiting genuine
topological order; d. PEPS descriptions of SET phases;
e. chiral phases.
a. Injective PEPS
Global symmetries of injective PEPS
behave essentially equivalently to global symmetries in
the MPS case:
the fundamental theorem of injective
PEPS (Section IV.B) dictates that two uniform PEPS
are equal if and only if they are related by a gauge trans-
form on the virtual level:
X
j
Uij(g)Aj
αβγδ =
(54)
eiφ
X
α′β′γ′δ′
X(g)αα′X(g)−1
ββ′Y (g)γγ′Y (g)−1)δδ′Ai
α′β′γ′δ′


---
*Page 43*

43
Just as in the 1D case, X(g) and Y (g) form possibly
projective representations of the group G characterizing
the global symmetries of the system.
The fact that a
PEPS tensor exhibiting this feature has a global sym-
metry follows immediately from the fact that all these
gauge transformations cancel each other pairwise. The
surprising content of the fundamental theorem is that it
is also a necessary condition.
This again implies that
the PEPS tensor can be decomposed as a product of
Clebsch-Gordan coeﬃcients, as used already extensively
in numerical PEPS algorithms. Note that diﬀerent pro-
jective representations do not necessarily lead to diﬀerent
phases if one does not impose translational invariance, as
blocking several sites together allows to relate diﬀerent
projective representations to each other.
The canonical example for an injective PEPS with
global symmetries is the cluster state (Raussendorf and
Briegel, 2001) on the honeycomb lattice, which is the
unique ground state of the commuting parent Hamilto-
nian P
ijkl XiZjZkZl of qubits where j, k, l are the near-
est neigbours of site i. This state has a very simple PEPS
representation (Verstraete and Cirac, 2004b):
with
= |0000⟩+ |1111⟩,
=
1
√
2
1
1
1 −1

It exhibits the global symmetry Y ⊗N, as this is just the
product of all (commuting) terms of the Hamiltonian. To
use the fundamental theorem of PEPS, we ﬁrst block two
sites of this PEPS such as to make it uniform, and it can
then readily be checked that the local physical symmetry
is equivalent to acting on all virtual legs with the same
Y on all four legs. This cluster state is interesting from
the point of view of quantum information theory, as it
allows to do universal quantum computation by imple-
menting local measurements on its qubits (Raussendorf
and Briegel, 2001).
The underlying mechanism which
allows for this remarkable feature is the fact that local
measurements on the physical qubits eﬀectively teleport
the virtual degrees of freedom, and in that process im-
plement quantum gates (Verstraete and Cirac, 2004b).
A related mechanism underlies the concept of topologi-
cal quantum computation by braiding anyons, which can
be understood in terms of quantum circuits on the en-
tanglement degrees of freedom of the PEPS describing
the topological phase.
Note that we had to block sites of the cluster state to
get a uniform PEPS description. From the point of view
of space group symmetries, this is not wholly satisfactory
as this leads to a loss of symmetry in the system. It turns
out that the full space group symmetry can be done jus-
tice for general PEPS by including matrices which just
act on the virtual edges connecting the vertices of the
PEPS. By imposing translational symmetry, it will then
follow that this decorated PEPS will be uniform and ex-
hibit all lattice symmetries (Jiang and Ran, 2017).
b. Non-injective PEPS: SPT phases
Injective PEPS on a
square lattice are rare, as the injectivity condition is typ-
ically violated at the corners of the region of interest.
Unlike the MPS case however, non-injective PEPS can
still be unique ground states of local gapped Hamiltoni-
ans. The 2D AKLT model on the square lattice is such an
example. The non-injectivity gives rise to a much more
interesting algebraic structure in the form of a family of
matrix product operator symmetries Og labelled by the
group elements of the global symmetry (Molnar et al.,
2018b; Williamson et al., 2016):
g
=
Ug
g
(55)
It is easy to see that this local condition is suﬃcient
for the complete PEPS to be invariant under the global
symmetry U ⊗N(g) in the thermodynamic limit.
To be consistent, the MPOs Og should form a repre-
sentation of the group G: Og.Oh = Ogh. Remarkably,
the fundamental theorem of MPS allows to translate this
condition into a local condition for the tensors deﬁning
these MPOs, as two MPOs are equal to each other if
and only if there exists an intertwiner (or fusion tensor)
connecting them to each other:
g
g
h
h
Xgh
gh
=
g
h
Xgh
gh
gh
The associativity condition for these fusion tensors
then leads to the condition that both the elements of
these MPOs and of the intertwiners can be identiﬁed with
the elements of a 3-cocycle, determined by the third coho-
mology group H3(G, U(1)). This situation is completely
equivalent to the one discussed in Section III.A.6, but
for the special case of the fusion algebra being a group.
The third cohomology group is well known to classify
symmetry protected topological phases in 2 dimensions
(Chen et al., 2011c), and PEPS hence provides a natural
realization of such phases.
Just as in the case of 2-cocycles, there is a system-
atic way of writing down PEPS tensors which exhibit


---
*Page 44*

44
such MPO symmetries (Williamson et al., 2016). Indeed,
the pulling through equation (55) can componentswise be
identiﬁed with the 3-cocycle condition.
The canonical example of a non-trivial SPT PEPS
was derived in (Chen et al., 2011c) as the CZX state
with global Z2 symmetry, for which the virtual MPO
symmetry is represented by the following two matrix
product unitaries acting on qubits:
O1 = 11, OZ =
N
i CZi,i+1 ⊗N
i Xi.
Here the commuting matrices
CZi,i+1 = P
ij(−1)i.j|ij⟩⟨ij| represent diagonal con-
trolled Z-gates. OZ has bond dimension 2, but the square
of it is not in canoncial form and has a 1-dimensional in-
variant subspace equal to O1 = 11.
These ideas were worked out in the papers (Buer-
schaper, 2014; Molnar et al., 2018b; Williamson et al.,
2016). It was demonstrated that this notion of MPO-
injectivity - also called semi-injective - is suﬃcient for
guaranteeing the uniqueness of the ground state of the
corresponding parent Hamiltonian, and that the corre-
sponding PEPS fully characterize short-range entangled
SPT phases.
c. Virtual Symmetries
One of the most striking features
of two-dimensional quantum spin systems is the fact that
there exist topological phases of matter which are sta-
ble under any perturbations (Bravyi et al., 2010; Klich,
2010). This robustness is a consequence of its nontriv-
ial entanglement structure, which is reﬂected in the be-
haviour of the topological entanglement entropy, of its
edge modes, and in the anyonic statistics of its elemen-
tary excitations. Tensor networks provide a natural lan-
guage for describing all those features in terms of the
local symmetries of the tensors involved.
The fact that there is a connection between topological
phases of matter and symmetries in the tensors has its
roots in the pioneering work of Gu et al. (2008), and was
described in Schuch et al. (2010). There it was shown
that the symmetries in the virtual indices of a PEPS
characterize its topological order. Speciﬁcally, a PEPS
is constructed for each ﬁnite group G, where the local
tensor is given by the G-injective MPO (53):
1
|G|
P
g∈G
Lg
Lg
Lg
Lg
=
(56)
where input indices correspond to the virtual degrees of
freedom and output indices to the physical Hilbert space.
Strictly speaking the arrows on the right and bottom
tensors must be reversed to make arrows match in the
PEPS construction. In this case reversing the arrows is
nothing but taking the inverse representation. The PEPS
constructed this way is called G-injective.
The symmetries of the tensor, Eq. (52), allow to re-
cover easily all topological invariants (topological entan-
glement entropy, ground state degeneracy, anyonic statis-
tics,. . . ), and correspond to the phase of the quantum
double models of Kitaev (2003). It is important to notice
that by acting with an invertible operator on the physical
index, one can perturb the tensor and induce ﬁnite cor-
relation lengths and, for large perturbations, topological
phase transitions. In this sense, G-injective PEPS allow
to recover not only the quantum double model, but all the
associated phases (see Section II.C.2) and the phase tran-
sitions between them. They also allow to study particu-
larly relevant models which are not renormalization ﬁxed
points, as e.g. the nearest neighbour resonating valence
bond (RVB) state (Anderson, 1973), which is an SU(2)
invariant spin liquid when deﬁned on a frustrated 2D lat-
tice. As explained by Verstraete et al. (2006), this RVB
has a very simple description in terms of a PEPS with
bond dimension 3. As shown by Schuch et al. (2012), it
exhibits a non-trivial purely virtual Z2 symmetry, and
can adiabatically be continued to the toric code phase
without crossing a phase transition. Indeed, thanks to
the PEPS approach, a parent Hamiltonian was derived
for it (Schuch et al., 2012; Zhou et al., 2014).
The RVB state is an example where the symmetries
in the virtual indices arise naturally from physical sym-
metry constrains. For example, if a global SU(2) spin- 1
2
symmetry is encoded locally in the tensor
ug
=
wg
w†
g
vg
v†
g
(57)
then the virtual symmetries must necessarily be reducible
and contain both integer and half-integer representations,
e.g 1
2 ⊕0, and the tensor must be supported on the sector
containing an odd number of half-integer ones. This en-
forces a Z2 virtual symmetry in the tensor. This eﬀect is
nothing but a version in the context of PEPS of the cel-
ebrated Hastings’ 2D version of the Lieb-Schultz-Mattis
theorem (Hastings, 2004a).
The G-injective construction was generalized by Buer-
schaper (2014) to twisted quantum double models
(twisted G-injective PEPS), to the case of an arbitrary fu-
sion category by S¸ahino˘glu et al. (2014), under the name
MPO-injective PEPS, and those MPO constructions were
uniﬁed by invoking the structure of a bimodule category
by Lootens et al. (2021).
For the case of topologicsl phases, the pulling through
equation (52) becomes very similar to the case of SPT
phases but without a physical action:
=
(58)


---
*Page 45*

45
As discussed in Sec. III.A.6, the bimodule categories
deﬁne MPO algebras and PEPS tensors satisfying the
pulling through equations through a set of 6 coupled
pentagon equations. This construction starts from two
Morita-equivalent fusion categories C, D labelling the dif-
ferent MPO tensors respectively the degrees of freedom of
the physical Hilbert space. The (C, D)-bimodule category
M then represents the entanglement degrees of freedom
of the PEPS tensor depending on D and M. The PEPS
tensor is represented by 3F of Sec.
III.A.6, while the
MPO tensor corresponds to 2F. For the case of quantum
doubles, D is given by the group G, and C can either be
chosen to be equal to the irreps of that group, for which
M is trivial, or equal to G, in which case C = D = M
and nontrivial 3-cocycles become possible.
The same bimodule categorical objects can also be
used to deﬁne intertwiners between diﬀerent PEPS re-
alizations of the same state |ψ⟩(Lootens et al., 2021);
the fact that such diﬀerent realizations exist is a con-
sequence of the fact that the category D correspond-
ing to the physical degrees of freedom can have several
Morita-equivalent categories Ci, each with a compatible
Mi; diﬀerent M will lead to completely diﬀerent but
locally equivalent PEPS descriptions as PEPSD,M1 and
PEPSD,M2. Translating the seminal work of Kitaev and
Kong (2012) in the tensor network language, these inter-
twiners can again be described in terms of MPOs. It is
then possible to construct intertwiners relating diﬀerent
physical and/or virtual tensor network representations
of quantum doubles and string nets with each other.
In particular, the mapping of quantum double models
to string net tensor network descriptions can readily be
completed using such MPOs (see also Buerschaper and
Aguado, 2009; K´ad´ar et al., 2010).
d. SET phases
Just as in the one dimensional case, vir-
tual and physical symmetries can be combined in a non-
trivial way.
The corresponding phases are called SET
phases.
Such systems have at length been studied by
(Barkeshli et al., 2019), and the mathematical framework
to describe the possible phases is given by graded unitary
fusion category theory. Such graded fusion categories can
again be realized within the context of matrix product
operators, and the non-chiral case gives rise to a PEPS
desciption where the MPO symmetry reﬂects this grading
(Williamson et al., 2017). Analogously to SPT phases,
string order parameters can be deﬁned to detect the sym-
metry fractionalization pattern of SET phases that also
involve swaps between distant regions, see Garre-Rubio
and Iblisdir (2019) for details.
Graded fusion categories also allow to characterize
topological phases for fermionic systems in terms of su-
perpivotal categories (Aasen et al., 2019). By adopting
the language of graded tensor networks, it is possible to
realize these phases in terms of fermionic PEPS (Bultinck
et al., 2017b), for which the Majorana defects can explic-
itly be constructed. Also the generalization of the toric
code to the fermionic case (Gu et al., 2014) can readily
be understood in terms of these graded tensor networks.
e. Chiral phases
Phases with chiral order (Bernevig and
Hughes, 2013) exhibit a number of phenomena which dis-
tinguish them from the non-chiral topologically ordered
states discussed above. In particular, they exhibit pro-
tected gapless edge modes characterized by a chiral CFT,
whose spectrum is also matched by the entanglement
spectrum (Li and Haldane, 2008). These phases can ei-
ther be protected by the fermionic parity superselection
rule or by an additional symmetry, such as time-reversal,
and can show up both in free fermion and in interacting
models, most notably Kitaev’s honeycomb model (Ki-
taev, 2006). However, some of the properties of chiral
systems – such as the gapless nature of the entangle-
ment spectrum which is suggestive of some kind of “non-
renormalizability”, or the fact that their Wannier func-
tions cannot be locally supported (Kohn, 1973) – suggest
that it might not be possible to describe them as PEPS.
As it turns out, PEPS can describe non-interacting
fermionic systems with chiral order exactly (Dubail and
Read, 2015; Wahl et al., 2013, an example is given in the
Appendix). The resulting free fermion PEPS are ground
states of a ﬂat-band Hamiltonian with algebraically de-
caying interactions, whose bands have non-zero Chern
number, i.e., they exhibit non-trivial chiral order. The
simplest of these examples is a topological superconduc-
tor (protected by fermionic parity); more complex exam-
ples such as topological insulators can be e.g. constructed
from two or more copies thereof. The ﬂat-band Hamil-
tonian exhibits gapless chiral edge modes and a match-
ing chiral entanglement spectrum, and it exhibits correla-
tions (and thus interactions) which decay as 1/r3 (Wahl
et al., 2014). The PEPS tensor exhibits a virtual sym-
metry, characterized by an unoccupied mode. As shown
by Wahl et al. (2014), this unoccupied mode is stable
under blocking, and thus gives rise to an empty mode
formed jointly by one Majorana mode on the left and
right boundary each at a given momentum k, analogous
to the two Majorana edge modes in the Kitaev chain;
these edge modes match exactly the point where the edge
mode is absorbed into the bulk. Systems with a higher
Chern number (and a higher number of gapless edge
modes) correspondingly exhibit a larger number of such
symmetries.
Moreover, the same symmetry is needed
to construct the ground states on the torus – just as in
the case of the Majorana chain [Eq. (50)], anti-periodic
boundary conditions are required to describe the chiral
PEPS wavefunction.
Numerical ﬁndings suggest that PEPS can also de-
scribe interacting chiral phases. One possibility to con-
struct such interacting models is by Gutzwiller-projecting


---
*Page 46*

46
several copies of a non-interacting topological supercon-
ductor or insulator, a construction for which ﬁeld the-
ory predicts an interacting topological model; numerical
study of two copies indeed reveals entanglement spectra
consistent with a chiral Kalmeyer-Laughlin state, but at
the same time is suggestive of critical correlations (Yang
et al., 2015). An alternative approach put forth by Poil-
blanc et al. (2015, 2016) is to construct a PEPS from
tensors A which themselves possess a “chiral symmetry”
(that is, which are invariant under combined reﬂection
and conjugation); it is found that the resulting PEPS ex-
hibit entanglement spectra consistent with chiral theories
(depending on the additional symmetry such as SU(2) or
SU(3) encoded in the tensor), as well as algebraic cor-
relations (Chen et al., 2020b, 2018; Hackenbroich et al.,
2018; Haegeman and Verstraete, 2017; Poilblanc et al.,
2015, 2016). In all these cases, a limitation to their ana-
lytical study is in the fact that both entanglement spec-
tra and correlations can only be determined numerically,
leaving an uncertainty in distinguishing a truly chiral en-
tanglement spectrum from a non-chiral one with a very
small gap in the entanglement spectrum (and very diﬀer-
ent velocities of the counterpropagating chiral theories),
as well as critical correlations from a very large but ﬁnite
correlation length (Hackenbroich et al., 2018).
While PEPS can represent states with chiral order,
there are limitations to their ability to exactly capture
chiral systems: As shown by Dubail and Read (2015) and
Read (2017), PEPS cannot capture non-interacting (both
intrinsic and symmetry-protected) chiral states with ex-
ponentially decaying correlations exactly; and Lemm and
Mozgunov (2019) have shown that the existence of a
gapped parent Hamiltonian with periodic boundaries im-
plies an open-boundary spectrum inconsistent with chiral
edge modes with linear dispersion (see Sec. IV.C.2 for a
precise statement), providing a partial no-go result also
for interacting chiral phases.
Despite these no-go theorems, the approximation re-
sults for the faithful approximations of low-energy states
of gapped Hamiltonians (with a suitable density of states)
still apply (Hastings, 2006; Molnar et al., 2015), and it
has been found numerically that PEPS are well suited
to approximate ground and thermal states of both non-
interacting and interacting Hamiltonians, and allow to
simultaneously approximate chiral entanglement spectra
and exponentially decaying correlations on the relevant
scales (Chen et al., 2020b, 2018; Poilblanc, 2017; Wahl
et al., 2013).
2. Entanglement Spectrum and Edge Modes
a. Entanglement Hamiltonians
One of the deﬁning prop-
erties of PEPS is the fact that the tensors describe how
entanglement is routed throughout the system. In prac-
tice, tensor networks implement an eﬀective holographic
dimensional reduction of the physical degrees of freedom
to a 1-dimensional system of entanglement degrees of
freedom: all correlations in the PEPS are determined by
the ﬁxed points / entanglement Hamiltonians of the 1D
transfer matrices of the PEPS. The local MPO symme-
tries of the tensors immediately translate to MPO sym-
metries of these transfer matrices. As we have discussed,
the symmetries on the virtual level can be much richer
than the ones on the physical level, and for topological
ordered systems amount to non-trivial MPOs. The re-
sults reported in Section III.A.6 then immediately imply
that the corresponding entanglement Hamiltonians ought
to be critical, hence realizing an explicit tensor network
analogue of the ﬁngerprints of conformal ﬁeld theory in
the entanglement spectrum (Dubail et al., 2012; Qi et al.,
2012).
The situation is slightly diﬀerent for SPT phases as
for topological phases.
In the former case, the trans-
fer matrix has the symmetry [Og ⊗¯Og, T] = 0 and has
a unique ﬁxed point |ρ⟩which hence inherits this sym-
metry OgρO†
g = ρ.
As ﬁrst observed by Chen et al.
(2011c), whenever the symmetry on the entanglement
degrees of freedom is realized through a non-trivial co-
cycle, then the corresponding entanglement Hamiltonian
ρ = exp(−βHE) will be critical or symmetry broken.
Note that whenever the SPT ground state is a renormal-
ization group ﬁxed point with zero correlation length, the
corresponding temperature will be β = 0 and hence one
has to perturb the system to witness HE (Bultinck et al.,
2018).
For the case of a genuine topological phase, the MPO
symmetries do not have to come in pairs, and any oﬀ-
diagonal combination is also allowed: [Oa ⊗¯Ob, T] = 0.
This has interesting consequences for the ﬁxed point
structure of the corresponding transfer matrix T: when-
ever ρ is a ﬁxed point, then OaρO†
b will also be a ﬁxed
point for any choice of a, b. This degeneracy of the ﬁxed
points follows from the non-injectivity of the PEPS and
is a clear signature of topological order (Schuch et al.,
2013). Given N independent MPO-symmetries Oa, one
would naively think that there will be N 2 distinct ﬁxed
points. This is however not the case, as there are exactly
N ﬁxed points, implying that the entanglement structure
exhibits a subtle type of symmetry breaking. Following
(Haegeman et al., 2015), this can be understood from the
necessity of having anyons in the system: if the degen-
eracy would be N 2, then the anyons would be conﬁned,
and if the degeneracy would be 1, all anyons would be
condensed. Only the case of N diﬀerent ﬁxed points pro-
vides the perfect balance and leads to genuine topological
order. A quantum phase transition occurs whenever this
ﬁxed point structure changes.
This result is in complete accordance with the famous
formula for the topological entanglement entropy (Kitaev
and Preskill, 2006; Levin and Wen, 2006), which states
that the entanglement entropy of a certain region in the


---
*Page 47*

47
bulk has a log(Dq) correction with Dq the total quantum
dimension of the underlying fusion algebra. This is a di-
rect consquence of the fact that the edges of the block un-
der consideration do not live in the full Hilbert space but
are constrained to the MPO-invariant subspace, whose
dimension is a constant factor Dq lower than the full
one.
b. Edge Modes
A remarkable feature of PEPS is the fact
that it provides a Hilbert space with a tensor product
structure on the edge of a PEPS with open boundary
conditions: these are precisely the bonds/entanglement
degrees of freedom which are unconnected, and hence
span a Hilbert space DL with D the bond dimension and
L the number of uncoupled bonds (see Section II.D.3).
Note that those degrees of freedom cannot directly be ac-
cessed, as they are virtual, but that Hamiltonian terms
acting on the physical boundary of the system will induce
an eﬀective Hamiltonian on that Hilbert space. Assum-
ing that the bulk is gapped, low-energy modes can emerge
on that virtual Hilbert space, and an important question
is to study the spectrum and features of these edge excita-
tions. If the system exhibits non-trivial symmetries such
as in the case of topological order or SPT, then a fasci-
nating matter occurs: when the eﬀective Hilbert space of
the spin chain is projected onto the symmetric or invari-
ant subspace of the MPO symmetries, non-local features
emerge which are impossible for normal spin chains. In
the language of quantum ﬁeld theory, the MPOs induce
anomalies in the boundary.
Let us ﬁrst discuss the case of SPT phases. Acting with
the physical symmetry U ⊗N
g
on the wavefunction induces
a non-trivial MPO symmetry action on the boundary.
The eﬀective Hamiltonian of the edge modes is hence
MPO symmetric, and, as discussed in Section III.A.6,
must therefore be either symmetry breaking or critical.
Even in the case of symmetry breaking, there will be a
ground state with all symmetries, but it will be realized
as a highly entangled GHZ or cat state. This is equivalent
to the situation in the 1D AKLT model, where the only
SO(3) invariant state is one in which the dangling spins
at the ends form a singlet. The ground state of any SPT
state with open boundary conditions can therefore not
be unique, and from the physics point of view, symmetry
breaking will happen.
The situation is very diﬀerent for the topological case,
where the bulk symmetry is purely virtual. This implies
that the Hilbert space of the edge modes has to be pro-
jected on the MPO symmetric subspace.
If Ps is the
projector on the Og-invariant subspace, then the Hamil-
tonian PsHedgePs is gappable and has a unique ground
state. If the MPO symmetry is non-trivial, that ground
state must be MPO-symmetric and hence has to be a
GHZ-state. The diﬀerent components in this GHZ are
related to each other by acting with Og in them. This is a
fascinating phenomenon: the physics on the edge induces
stable highly entangled states which would be impossible
to create in a genuine 1-dimensional system. For the case
of quantum doubles, twisted quantum doubles and string
nets, the boundaries are always gappable, a fact that is
known to follow from the feature that the bulk theory
of these systems always yields a Lagrangian subgroup of
the anyons (Kitaev and Kong, 2012; Levin, 2013): the set
of anyons in the bulk can be divided into two sets, one
in which every anyon has trivial statistics with respect
to each other one, and a second subset for which every
one exhibits non-trivial statistics with at least one of the
ﬁrst set. As we will show in the next paragraph, anyons
are described by idempotents of an extended MPO alge-
bra, and always satisfy this criterion. The corresponding
ground state will be of GHZ-type or not depending on
whether the underlying MPO algebra is trivial (such as
e.g. for the case of quantum doubles) or not (such as for
e.g. the twisted quantum doubles and string nets).
3. Topological sectors and anyons
Two deﬁning features of topological phases are the fact
that the ground state degeneracy depends on the genus
of the manifold on which the spins are deﬁned, and the
fact that the elementary excitations are anyons with non-
trivial statistics. The fact that both of these features are
intimitly connected to each other is made explicit when
studying them from the point of view of PEPS: both are
deﬁned by exactly the same tensors (Bultinck et al., 2017;
Schuch et al., 2010).
a. Topological sectors
Let us ﬁrst discuss the diﬀerent
ground states for a topological spin system on a torus.
Consider on the one hand a uniform PEPS, and on the
other hand the same uniform PEPS but with a virtual
non-trivial MPO winding around one of the directions of
the torus. As the PEPS exhibits the MPO symmetry, the
location of the MPO is immaterial, and this second state
turns out to be orthogonal to the ﬁrst one. Note that
winding two MPOs Oa and Ob along the same direction
is equivalent to the sum of P
c N c
abOc, as we can always
pull them through the lattice until they touch each other.
We could of course also wind an MPO along the other
direction, and get another diﬀerent state.
A problem
arises however when we try to wind two MPOs along
the two diﬀerent directions: this inevitably leads to a
crossing of the two MPOs, and we have to deﬁne a new
(blue) tensor object deﬁning this crossing:
i
(59)


---
*Page 48*

48
By varying this blue tensor, and requiring that it can
be pulled through the PEPS tensors, we are able to com-
pletely characterize all ground states of the topological
theory. Physically, the pulling through property implies
that the topological sector is invisible by local measure-
ments on the physical Hilbert space.
It is of course possible to put more MPOs in the PEPS,
and doing so induces more and more crossings. However,
it should not lead to new ground states, and hence the
enlarged MPOs
(60)
themselves should form an algebra. It was proven that
they form a C∗algebra, which means that they form
a closed algebra when multiplying with each other and
under conjugation (Bultinck et al., 2017).
Such a C∗algebra has a natural decomposition into
minimal central idempotents Pi, PiPj = δijPi, and these
diﬀerent blocks provide the full set of orthogonal ground
states or topological sectors on the torus. From the cat-
egorical point of view, this construction is called the
Drinfeld Center (Drinfel’d, 1987; M¨uger, 2003b), and the
C∗algebra is called the Ocneanu tube algebra (Evans
and Kawahigashi, 1995).
The states corresponding to
the idempotents are the ground states with minimal en-
tanglement (Zhang et al., 2002), which indeed provide a
natural partitioning of the ground state sector. From a
practical point of view, these idempotents can be calcu-
lated from the structure factors of this enlarged MPO al-
gebra. This program can be realized in a straightforward
way for all PEPS described in the language of bimodule
categories. Similarly, it can be worked out in terms of
weak Hopf algebras: using that physical and virtual in-
dices in the associated MPOs correspond respectively to
the algebras A and A∗, the enlarged MPO gives a rep-
resentation, as vector space, of A ⊗A∗. Apart from the
algebra structure already commented, there is a natural
coproduct, given by ∆A ⊗∆A∗, that makes it a weak
Hopf algebra. This is called the Drinfeld double and it is
precisely the weak Hopf algebra associated to the Drin-
feld center category (see Section III.A.6).
Let us illustrate in the particular case of the G-injective
PEPS deﬁned by tensor (56) the process just described
that obtains the Drinfeld double of a ﬁnite group G, just
by imposing a pulling through condition on the enlarged
MPOs of the associated G-injective PEPS (Schuch et al.,
2010).
For that, let us start analyzing the conditions of the
crossing tensor needed to pull it through the lattice.
When we move a horizontal virtual MPO Og = L⊗N
g
one row down, if there is also a vertical virtual MPO
Oh = L⊗M
h
, the group element of the vertical MPO asso-
ciated to the position in between the two rows get con-
jugated by g.
Og
Oh
=
Og
Oh
g
g−1
(61)
Therefore the crossing tensor needed for that action is
precisely a linear combination of tensors of the form
|g)(g| ⊗|ghg−1⟩⟨h|.
(62)
The enlarged MPO associated to the crossing tensor
(62) is precisely L⊗N
g
⊗|ghg−1⟩⟨h|, which corresponds to
the element g ⊗δh ∈C(G) ⊗CG, where CG denotes the
set of functions G →C and δh is the function deﬁned by
δh(k) = 1 for k = h and 0 otherwise.
Given two pairs (g, δh), (g′, δh′) in C(G)⊗CG, the mul-
tiplication induced by their associated enlarged MPOs is
given by
(g, δh) · (g′, δh′) = (gg′, δh(g′h′g′−1)δh′)
since trivially
 L⊗N
g
⊗|ghg−1⟩⟨h|

·

L⊗N
g′
⊗|g′h′g′−1⟩⟨h′|

=
= L⊗N
gg′ ⊗δh(g′h′g′−1)|ghg−1⟩⟨h′| =
= L⊗N
gg′ ⊗δh(g′h′g′−1)|(gg′)h′(gg′)−1⟩⟨h′|
The algebra C(G)⊗CG with such multiplication is pre-
cisely the deﬁnition of the Drinfeld double of the group
G.
It is shown in (Gould, 1993) that the generating idem-
potents in this case are given by ﬁxing a conjugacy class,
a representative h ∈G for it, and an irrep α of the cen-
tralizer of h, Z(h) = {g ∈G : gh = hg}. The associated
central idempotent is the one given by a crossing tensor
proportional to:
Th,α =
X
k∈G
X
g∈Z(h)
χα(g−1)|k−1gk)(k−1gk|⊗|k−1hk⟩⟨k−1hk|
which gives an enlarged MPO proportional to
Ph,α =
X
k∈G
X
g∈Z(h)
χα(g−1)L⊗N
k−1gk ⊗|k−1hk⟩⟨k−1hk|
Note that the conjugation by k can be absorbed in the
PEPS, due to the virtual symmetry, which gives ﬁnally
the following simpler crossing tensor and enlarged MPO:
X
g∈Z(h)
χα(g−1)|g)(g| ⊗|h⟩⟨h|


---
*Page 49*

49
Ph,α =
X
g∈Z(h)
χα(g−1)L⊗N
g
⊗|h⟩⟨h|
The topological sectors are then indexed by a conju-
gacy class and an irrep of its centralizer, as expected
(Kitaev, 2003). For the particular case of the toric code,
we obtain the projectors (11⊗N ± X⊗N) ⊗|h⟩⟨h| with
h ∈{0, 1}. For the general case of bimodule categories,
the idempotents can readily be found by diagonalizing
linear combinations of the adjoint representation of the
C∗algebra (Lootens et al., 2021).
b. Anyons
In an amazing twist, it turns out that the
idempotents deﬁning the ground state manifold on the
torus also deﬁne the elementary bulk excitations. The
orthogonality of the idempotents provides a natural de-
composition of the Hilbert space into topological sectors,
and some of them have a non-trivial MPO string attached
to them. The corresponding anyons have non-trivial self-
statistics, and non-trivial braiding. All of these features
can succinctly be understood from the fact that virtual
MPO strings are attached to them, which are immaterial
as they can be moved at will through the lattice (Bult-
inck et al., 2017; Schuch et al., 2010). A pair of anyons
in the PEPS picture hence has the following form:
i
i∗
a
Here the blue tensor projects onto one of the idempo-
tents deﬁned above:
i
j
= δi,j
i
In the particular case of G-injective PEPS, the blue
tensor takes the form:
α
h
(63)
The topological spin of an anyon characterizes the
phase that the wavefunction acquires when rotating the
anyon over 2π:
j
= eiφj
j
For the case of the toric code, one sees that the anyon
characterized by the idempotent (I −Z⊗N)/2 with a
string attached to it has toplogical spin- 1
2, and is hence
called a fermion.
Anyons have new fusion rules generating the output
category. Those are precisely the ones associated to the
Drinfeld center. Crucially, anyons exhibit also braiding
properties, encoded in a tensor R, that gives a generalized
pulling through equation:
i
b
a
b
b
=
i
Ri,b
b
a
b
With this one can compute the braiding of an anyon
around another by doing the following four steps:
(1)
j
b
i
a
(2)
(3)
Rj,a
(4)
Rj,a
Ri,b
This idea can readily be exploited to see that the
concept of topological quantum computation (Freedman
et al., 2003; Kitaev, 2003), in which anyons are braided,
can be described in terms of the usual quantum circuit
model for quantum computation applied to the entangle-
ment degrees of freedom (see (Bultinck et al., 2017) for
the details).
Braiding takes a simpler and explicit form in the group
case. For instance, in case of a trivial irrep α, braiding
corresponds to conjugation (adjoint action) as it is illus-
trated in (61).
Note that distinct input categories can lead to equiva-
lent Drinfeld doubles; this e.g. happens for the case of a
twisted Z2 × Z2 and the Z4 quantum double. Two cate-
gories with this feature are called Morita equivalent (Ki-
taev and Kong, 2012; M¨uger, 2003a), and as discussed
in Sec. III.B.1.c it is then possible to construct an in-
tertwiner – in the form of an MPO - between the two
corresponding PEPS which preserves all topological fea-
tures and eﬀectively implements an automorphism of the
corresponding topological sectors.
This idea has been
extended to a systematic study of boundaries between
diﬀerent theories – e.g. between a topological phase and


---
*Page 50*

50
a trivial phase such as with open boundary conditions –
and allows to construct all possible boundary conditions
which are compatible with the anyonic bulk physics. For
the case of the toric code, this leads to the concept of
rough and smooth edges - absorbing electric vs. magnetic
excitations on the boundary (Bravyi and Kitaev, 1998;
Lootens et al., 2021).
c. Anyon condensation
Although the topological phases
described by quantum doubles and string nets are sta-
ble with respect to any perturbation (Bravyi et al., 2010;
Klich, 2010), a topological phase transition will occur
whenever the perturbation becomes large.
From the
point of view of PEPS, such a transition is character-
ized by a change in the MPO symmetry-breaking pat-
tern of the eigenvectors of the transfer matrix (Schuch
et al., 2013). In the topological phase described by an in-
put category with N labels (and hence N corresponding
MPOs), there are N linearly independent eigenvectors
σi of the transfer matrix with eigenvalues of modulus 1,
obtained by acting with the MPO’s on a ﬁducial one ρ:
σi = Oiρ. Note that for e.g. the toric code, ρ = 11. A cru-
cial property is that the MPOs OiρO†
j do not yield new
ﬁxed points, and furthermore that OiρO†
i is not linearly
independent of ρ. As demonstrated by Haegeman et al.
(2015), this can easily be seen to be a necessary condi-
tion for the possibility of having anyons, as otherwise the
expectation value of a PEPS with a pair of anyons con-
nected with an MPO string would be zero, as illustrated
in the following ﬁgure:
If the ﬁxed point OiρO†
i were orthogonal to ρ, the norm
of the state with 2 anyons connected by a string would
decay exponentially in the distance between the anyons,
as it would be obtained by raising a mixed transfer matrix
with spectral radius strictly smaller than one to the dis-
tance between the anyons. This explains why the eigen-
vectors of the transfer matrix must strike a delicate bal-
ance of the symmetry breaking pattern.
This immediately clariﬁes that a (large) perturbation
increasing the number of ﬁxed points of the transfer ma-
trix will lead to conﬁnement of the anyons - and hence to
a topological phase transition. Conversely, the situation
where the number of distinct ﬁxed points decreases makes
the existence of strings irrelevant – this corresponds to
the condensation of anyons. As shown by Duivenvoor-
den et al. (2017), the PEPS description is fully com-
patible with the standard rules of anyon condensation
(Bais et al., 2002): 1. Only particles with trivial self-
statistics can condense; 2. anyons become condensed iﬀ
they have mutual non-bosonic statistics with some con-
densed anyon; 3. non-condensed anyons which diﬀer by
a condensed anyons become indistinguishable; 4. anyons
which can fuse to two diﬀerent condensed anyons split up
into two distinguishable anyons. Not surprisingly, very
similar rules apply in the context of orbifolding in con-
formal ﬁeld theory. This connection can indeed be fully
established by making use of the formalism of strange
correlators (Vanhove et al., 2018) and of non-invertible
bimodule categories (Lootens et al., 2021) realizing all
possible ways in which anyons can condense.
When restricting to the group case, this leads to a nat-
ural connection between anyon condensation and SET
phases (Garre-Rubio et al., 2017). Given a group G and
a normal subgroup H, there is a natural way of condens-
ing anyons which is restricting the G-injective tensor to
the subgroup H. The strings of the anyons then fullﬁl
the pulling through equation (55) if they come from H.
If not, they get conﬁned and the pulling through equa-
tion gets degraded to one of the form of Eq. (58), where
a unitary must be applied in the physical level. These
unitaries form precisely a representation of the quotient
group Q = G/H. That is, condensing anyons make some
global symmetry emerge under which the new condensed
model is in an SET phase. Interestingly, one can show
that all SET phases appear in this way. This bimodule
MPO point of view of anyon condensation is a general-
ization of this idea.
IV. FORMAL RESULTS: FUNDAMENTAL THEOREMS,
HAMILTONIANS
In this section, we provide formal statements for two
types of mathematical questions linked to tensor net-
works.
In Section IV.A and Section IV.B, we enunci-
ate the Fundamental Theorems for Matrix Product Vec-
tors and PEPS, respectively. These fundamental theo-
rems relate diﬀerent MPS representations of the same
MPS, MPO, or PEPS, and are essential in the classiﬁca-
tion of phases under symmetries, renormalization ﬁxed
points, and MPO algebras describing topological order.
In Section IV.C, we discuss the relation of MPS/PEPS
and Hamiltonians. In particular, we explain how MPS
and PEPS appear as ground states of parent Hamiltoni-
ans, and review the known Theorems about their ground
space structure, their gap, and their robustness against
perturbations.


---
*Page 51*

51
A. The Fundamental Theorem of Matrix Product Vectors
1. Overview
In the preceding sections, we have encountered diﬀer-
ent kind of tensor networks: MPS, MPOs, MPDOs, and
MPUs. All these have in common that they live on a
sequence of spaces H⊗N
d
, N ∈N, where Hd is the cor-
responding d-dimensional local Hilbert space of states or
operators Therefore, all these cases can be seen as a spe-
cial case of Matrix Product Vectors (MPVs)
|V (N)(A)⟩=
d
X
i1,...,iN=1
tr
 Ai1 . . . AiN 
|i1 · · · iN⟩∈H⊗N
d
,
(64)
where the Ai are D×D matrices. We will denote the fam-
ily of MPVs generated by A by V(A) :=

|V (N)(A)⟩, N ∈
N
	
.
The map A 7→V(A) is not one-to-one – that is, dif-
ferent tensors B and C can generate the same family of
vectors, |V (N)(A)⟩= |V (N)(B)⟩∀N. This is for instance
the case if A and B are related by a similarity transfor-
mation (or gauge transformation), Bi = Y AiY −1 ∀i, as
Y cancels out in Eq. (64). The goal of the Fundamen-
tal Theorem of MPVs is to characterize the most general
way in which two MPV representations A and B of the
same family V(A) = V(B) are related.
The relevance of the Fundamental Theorem is man-
ifold.
It is the basic tool in the classiﬁcation of
phases in 1D systems under symmetries, U ⊗N|V N(A)⟩=
|V N(A)⟩, where Bi = P uijAj and Ai describe the same
MPV (Sec. III.A.2).
Its application to MPO algebras
is relevant in the study of topological order in MPO-
injective PEPS (Sec. III.B.1), as well as the character-
ization of SPT phases in 2D (III.B.1).
It is also be-
ing applied in the characterization of RG ﬁxed points
through bulk-boundary correspondence (Sec. II.E.2), or
in the classiﬁcation of MPUs and Quantum Cellular Au-
tomata (Sec. II.B.2).
The derivation of the Fundamental Theorem consists
of two steps. First, we will show that any MPV tensor D
can be brought into a canonical form A such that they
describe the same MPV family, |V (N)(A)⟩= |V (N)(D)⟩.
Second, we will present the Fundamental Theorem, which
in essence states that given any two tensors A and B in
canonical form with |V (N)(A)⟩= |V (N)(B)⟩, they are
related by a gauge transformation,
Bi = Y AiY −1 for all i .
(65)
The following discussion follows closely Cirac et al.
(2017a), where further details can be found.
2. Canonical form and normal tensors
In the following, we will introduce the canonical form
of MPVs and show how to get a tensor into its canonical
form. The reason we require a canonical form is that the
similarity transform (65) is not the only way in which
two tensors can generate the same MPV. Consider, for
instance, the case where the Bi are upper triangular, e.g.
Bi =

Bi
1 Bi
o
0
Bi
2

,
(66)
where Bi
k are Dk × Dk matrices, and Bi
o is a D1 × D2
matrix. As the oﬀ-diagonal block drops out in the trace,
the MPV generated by B is the same for any choice of
Bi
o. The goal of the canonical form is exactly to get rid
of those unphysical oﬀ-diagonal blocks.
The upper triangular form of Bi can be abstractly
characterized as the presence of a subspace S1 of dimen-
sion D1 which is left invariant under the action of all
Bi. That is, BiS1 ⊂S1, or equivalently, denoting by P1
(Q1 = 11 −P1) the orthogonal projector onto S1 (S⊥
1 ),
BiP1 = P1BiP1,
Q1Bi = Q1BiQ1.
(67)
Note that this shows that there exist a nontrivial left
invariant subspace if and only if there exists a nontrivial
right invariant one.
Arguably the easiest way to lift the redundancy in
(66) is to ﬁx Bi
o = 0.
This corresponds to changing
Bi to P1BiP1 + Q1BiQ1, which yields the same fam-
ily of MPVs. Moreover, there is no loss of generality in
assuming that S1 does not contain any smaller invari-
ant subspace (if it would, we could choose S1 to be that
smaller invariant subspace instead). We thus replace
Bi →P1BiP1 + Q1BiQ1
and repeat the argument with the block Q1BiQ1 (yield-
ing projections P2), and so on. After a ﬁnite number of
steps, there will be no (non-trivial) invariant subspace
anymore. The matrices {Ai}, deﬁned as
Ai =
r
X
k=1
PkBiPk =
r
M
k=1
µkAi
k ,
(68)
generate the same family V(A) = V(B) of MPV as the
initial Bi. Note that in a suitable basis, the Ai are all
block-diagonal with r blocks. The positive numbers µk
are scaled such that the CP map Ek, deﬁned through
Ek(X) =
d
X
i=1
Ai
kXAi†
k ,
(69)
has spectral radius equal to 1. Note that Ek is just the
transfer operator of the tensor Ak associated to the k-th
block.


---
*Page 52*

52
As shown by Fannes et al. (1992b) and Perez-Garcia
et al. (2007) (see also Wolf (2012)), each CP map Ek has
a unique eigenvalue λ = 1 and the corresponding left and
right eigenvectors are positive and full rank. A CP map
with these properties is called irreducible (Wolf, 2012).
However, irreducible CP maps can have other eigen-
values of magnitude one, always of the form ei2πq/p, with
p, q integers, gcd(q, p) = 1, and where p is a divisor of D.
In order to remove them, we block p spins. This blocking
procedure results in a new tensor Ci1,...,ip = Ai1 · · · Aip.
As has been shown by Cadarso et al. (2013), the blocked
matrices are still block-diagonal, such that the corre-
sponding transfer operators have a unique eigenvalue of
magnitude (and value) equal to one, and the correspond-
ing left and right eigenvectors are positive and full rank
(as there are no invariant subspaces). A CP map with
theses properties is called primitive (Wolf, 2012).
One can now state the main deﬁnition of the section.
Deﬁnition IV.1. A tensor Ak is called normal if its
transfer operator Ek, Eq. (69), is a primitive channel.
The corresponding MPV |V N(Ak)⟩is called a normal
MPV.
We say that a tensor A is in canonical form if
Ai =
r
M
k=1
µkAi
k ,
(70)
and the tensors Ak are normal tensors.
The above provides an algorithm for transforming any
tensor B after blocking into another tensor A which is in
canonical form, such that they both generate the same
family of MPVs, V(A) = V(B).
3. Basis of normal tensors
While the canonical form does no longer suﬀer from
ambiguities due to oﬀ-diagonal blocks, there is still a
source of ambiguity: Among the diﬀerent blocks there
could be some that generate the same (or linearly de-
pendent) vectors.
In order to properly treat this case
one needs to introduce the concept of a basis of normal
tensors.
Deﬁnition IV.2. A basis of normal tensors for A is
a set of normal tensors Aj (j = 1, . . . , g) so that (i) for
each N, |V (N)(A)⟩can be written as a linear combination
of V (N)(Aj), and (ii) there exists some N0 such that for
all N > N0, the |V (N)(Aj)⟩are linearly independent.
The following result from Cirac et al. (2017a) charac-
terizes bases of normal tensors and in particular shows
that such a basis always exists.
Proposition IV.3. The tensors Aj (j = 1, . . . , g) form
a basis normal tensors for A if and only if: (i) for all
normal tensors ˜Ak appearing in the canonical form (70)
of A, there exists a j, a non-singular matrix Xk, and a
phase φk such that
˜Ak = eiφkXkAjX−1
k
(71)
holds; (ii) the set is minimal, in the sense that for any
element Aj, there is no other j′ for which (71) is possible.
Note that given a set of normal tensors, a basis of nor-
mal tensors can be constructed (and eﬃciently obtained
numerically) by computing the largest eigenvalue λjk of
the mixed transfer operator Fjk(X) = P
i Ai
jX(Ai
k)† and
choosing a maximal subset for which |λjk| < 1 for all
pairs j, k.
The X relating Aj and Ak = eiφXAjX†
with |λjk| = 1 is then obtained by comparing the largest
eigenvector ρ of Fkk with the eigenvector Xρk of Fjk;
the phase can then be inferred immediately.
One can then write the matrices of any tensor, A, in
canonical form in terms of a basis of normal tensors Aj,
as
Ai =
g
M
j=1
rj
M
q=1
µj,qXj,qAi
jX−1
j,q
(72a)
= X


g
M
j=1
 Mj ⊗Ai
j


X−1 ,
(72b)
where Mj is a diagonal matrix with entries µj,q, and
X =
g
M
j=1
rj
M
q=1
Xj,q,
(73)
so that
|V N(A)⟩=
g
X
j=1
 rj
X
q=1
µN
j,q
!
|V (N)(Aj)⟩.
(74)
4. Fundamental Theorem of MPVs
We are now ready to state the Fundamental Theorem
of Matrix Product Vectors (Cirac et al., 2017a). It clar-
iﬁes which degree of freedom is left for two A and B in
canonical form which generate families of MPVs which
are proportional – or equal – to each other:
Theorem IV.4 (Fundamental Theorem for propor-
tional MPVs). Let A and B be two tensors in canon-
ical form, with bases of normal tensors Ai
ka and Bi
kb
(ka,b = 1, . . . , ga,b), respectively.
If for all N, A and
B generate MPV that are proportional to each other,
then: (i) ga = gb =: g; (ii) for all k, there exists a
jk, phases φk, and non-singular matrices Xk such that
Bi
k = eiφkXkAi
jkX−1
k .


---
*Page 53*

53
Corollary
IV.5
(Fundamental Theorem for equal
MPVs). If two tensors A and B in canonical form gen-
erate the same MPV for all N then: (i) the dimensions
of the matrices Ai and Bi coincide; (ii) there exists an
invertible matrix, X, such that Ai = XBiX−1.
The Xk and φk can again be obtained constructively
and numerically eﬃciently following the procedure de-
scribed after Proposition IV.3.
Note that one can select a gauge such that the CP
maps Ek associated to the normal tensors are unital, i.e.
Ek(11) = 11 (by replacing Ak with ρ−1/2Akρ1/2, with ρ
the ﬁxed point of Ek). In that case, both Theorem IV.4
and Corollary IV.5 hold with the extra condition that X
and Xk are unitary matrices.
The Fundamental Theorem of MPV can be generalized
to hold without the need of blocking to remove p-periodic
components (De las Cuevas et al., 2017), which allows to
apply the Fundamental Theorem to analyze e.g. sym-
metries with regard to the original unit cell. We state
only the analogue of Corollary IV.5., see De las Cuevas
et al. (2017) for the analogue of Theorem IV.4. In De
las Cuevas et al. (2018), this result has been applied to
the analysis of the existence of a continuum limit in the
context of MPS.
Theorem IV.6. Let A and B be tensors in block diag-
onal form as in (68), that is, the CP map of each block
is irreducible. If |V (N)(A)⟩= |V (N)(B)⟩for all N, then
there exists a diagonal matrix Z, and an invertible matrix
Y so that
(i) [Z, Ai] = 0 for all i,
(ii) ZAi = Y BiY −1 for all i, and
(iii) |V (N)(A)⟩= |V (N)(ZA)⟩for all N.
The idea behind the appearance of the diagonal matrix
Z is that the MPV associated to a block Ak whose CP
map has eigenvalues ei2πq/p satisfy that |V (N)(Ak)⟩=
0 unless N is a multiple of p. Hence we can multiply
this block by any complex p-th root of unity and the
whole MPV |V (N)(A)⟩will not be aﬀected, giving an
extra degree of freedom.
What is proven in Theorem
IV.6 is that this is essentially the only extra freedom one
gets in the general case without blocking.
B. Fundamental Theorems for PEPS
Fundamental Theorems for PEPS only exist for a num-
ber of special cases. Let us ﬁrst discuss the case of normal
PEPS.
Deﬁnition IV.7. A PEPS tensor A is called injective
if it is injective as a linear map A : (CD)⊗r →Cd from
the virtual to the physical system (with r the coordination
number), that is, if there exists a left-inverse A−1,
A−1A = 11(CD)⊗r .
Deﬁnition IV.8. A tensor A generating a 2D PEPS
is called normal if it becomes injective after blocking a
suﬃciently large rectangular region H × V .
Tensors which are injective on two regions are also in-
jective on their union, and thus if a normal tensor A be-
comes injective in a region of size H×V , it is also injective
for any region ˜H × ˜V with ˜H ≥H and ˜V ≥V (Molnar
et al., 2018a; Perez-Garcia et al., 2008a). It has beeen
shown that if A is normal, the required H and V are
upper bounded by a constant which only depends on the
bond dimension D and the graph, but not the speciﬁc
A (Micha lek et al., 2019).
For MPS, the notion of normality deﬁned above is
equivalent to the previously introduced notion (Deﬁni-
tion IV.1) of a normal tensor (Sanz et al., 2009a): Injec-
tivity implies that the tensor A must be normal, and con-
versely, the quantum version of Wieland’s theorem states
that after blocking at most 2D2(6 + log2 D) sites, every
normal tensor becomes injective (Michalek and Shitov
(2018), see also Perez-Garcia et al. (2010) and Rahaman
(2018)).
This yields the following version of the Fundamental
Theorem for normal PEPS shown in Molnar et al. (2018a)
(an earlier version of which was proven in Perez-Garcia
et al. (2010)):
Theorem IV.9 (Fundamental Theorem for normal
PEPS). Let A and B be two normal tensors such that
every H × L region is injective, and let A and B gen-
erate the same PEPS for some system size n × m ≥
(2H +1)×(2L+1). Then, there exist invertible matrices
X, Y and λ ∈C such that A = λ B (X−1⊗Y −1⊗X ⊗Y ),
and λnm = 1.
Based on it we have the desired 2D analogue of Corol-
lary IV.5 for normal 2D PEPS.
Corollary IV.10. Let A and B be two normal tensors
generating 2D PEPSs. Then they deﬁne the same state
for all sizes if and only if there exist invertible matrices
X, Y such that Ai = Bi(X−1 ⊗Y −1 ⊗X ⊗Y ) for all i.
Moreover X and Y are unique up to proportionality.
Just as in one dimension, this theorem in particular
provides a local characterization of all normal PEPS hav-
ing a global on-site symmetry or an spatial symmetry, see
Perez-Garcia et al. (2010) for details.
Beyond the normal case, a fundamental theorem for
PEPS has also been proven for so-called semi-injective
PEPS (see section III.B.1), which in particular encom-
pass 2D SPT phases such as the CZX model of Chen
et al. (2011c) and its generalizations (Chen et al., 2013;
Williamson et al., 2016); there, the relation between two
PEPS tensors A and B generating the same state is given
by Matrix Product Operators instead (Molnar et al.,
2018b). Using the theory of bimodule categories, it is


---
*Page 54*

54
also possible to construct such MPO intertwiners be-
tween equivalent PEPS with diﬀerent bond dimensions
(Lootens et al., 2021).
Let us note that one cannot hope for a Fundamental
Theory for PEPS in the same generality as in 1D, since
the corresponding problem in its full generality is unde-
cidable (Scarpa et al., 2020).
C. Hamiltonians
In this section, we discuss the relation of MPS and
PEPS with Hamiltonians. In particular, we provide the
construction of the parent Hamiltonian, the precise con-
ditions under which it has a unique ground state or
a ground space with a controlled degeneracy, and dis-
cuss the conditions under which these Hamiltonians can
be proven to be gapped.
We also discuss construc-
tions which provide alternative Hamiltonians associated
to an MPS. These results extend the seminal results
of Aﬄeck, Kennedy, Lieb, and Tasaki (1988, 1987) and
Fannes, Nachtergaele, and Werner (1992b) on exact par-
ent Hamiltonians for the AKLT states and for ﬁnitely
correlated states.
1. Parent Hamiltonians and ground space
a. Construction of the parent Hamiltonian
We start with
the 1D case. Given an MPS, consider the space
GL =



X
i1,...iL
tr(Ai1 · · · AiLX)|i1 · · · iL⟩: X ∈MD



(75)
of all states spanned by L consecutive sites of the MPS,
given arbitrary boundary conditions X. Graphically, this
corresponds to the states
A
A
A
A
· · ·
X
.
(76)
In some cases, we will also write Gi,...,j to denote Gi−j+1
on sites i, . . . , j.
Deﬁnition IV.11 (Parent Hamiltonian). A parent in-
teraction is any hermitian positive semideﬁnite operator
h ≥0 acting on L sites, whose kernel equals GL, Eq. (75).
The corresponding parent Hamiltonian of the MPS with
tensor A on N sites is then given by HN = PN
i=1 hi,
where hi denotes h acting on sites i, . . . , i+L−1 mod(N).
Since the dimension of GL is at most D2, the par-
ent Hamiltonian will necessarily be non-trivial as soon
as dL > D2 (as GL cannot be the full space).
Similarly, we can deﬁne parent Hamiltonians in two
dimensions (or on other graphs) by considering a suﬃ-
ciently large region R, where GR is the space spanned by
the states
X
(77)
with arbitrary boundary conditions X, and the terms in
the Hamiltonian are again positive semideﬁnite opera-
tors with kernel GR. Note that in two dimensions, the
resulting parent Hamiltonian can have diﬀerent types of
terms if one considers more then one type of region (e.g.
two rectangular regions of size 2 × 1 and 1 × 2). Note
that the same construction can be carried out without
translational invariance, and for general graphs.
It is clear that the parent Hamiltonian has the
MPS/PEPS |ψ⟩as a ground state, as HN = P hi ≥0
and HN|ψ⟩= P hi|ψ⟩= 0. Hamiltonians with the prop-
erty that the ground states minimize the local terms are
called frustration free. In the following, we will discuss
the conditions under which HN has a unique ground
state, or more generally a ground space with a controlled
structure.
b. Normality, injectivity and unique ground states.
Let us
ﬁrst recall the notion of injectivity from Sec. IV.B, Def-
inition IV.7: An MPS or PEPS tensor is injective if it
has a left-inverse A−1 when considered as a map from
virtual to physical system, A−1A = 11. For MPS, this
is equivalent to the property that the matrices Ai span
the whole set of MD×D matrices.
Let us also recall
that any injective MPS tensor is normal, and any nor-
mal MPS tensor becomes injective after blocking at most
L0 ≤2D2(6 + log2 D) sites.
For an MPS or PEPS with injective tensors, it can be
easily be proven that the parent Hamiltonian deﬁned on
nearest neighbors has a unique ground state. To this end,
it is most convenient to construct the PEPS as in section
II.B.1 by applying local linear maps to maximally entan-
gled pairs. That is, given a regular graph G of degree r
with vertex set V and edge set E, one can consider the
so called isometric PEPS of bond dimension D,
|ΩG⟩:=
O
e∈E
|ω⟩e ,
where |ω⟩is the maximally entangled state of dimension
D. A general MPS or PEPS |ΨG(A)⟩is then given by a
linear map (the tensor) A : (CD)⊗r →Cd
|ΨG(A)⟩:=
 O
v∈V
A
 O
e∈E
|ω⟩e =
 O
v∈V
A

|ΩG⟩,
(78)


---
*Page 55*

55
cf. Fig. 1. We omit the superscript G whenever the graph
is unambiguous.
For the isometric PEPS |Ω⟩, a possible parent Hamil-
tonian is given by h = 1 −|ω⟩⟨ω|, and it is immediate to
see that HN = P hi has |ψ⟩as its unique ground state.
We can now construct a parent Hamiltonian for |Ψ(A)⟩
as
h′ = (A−1 ⊗A−1)†h(A−1 ⊗A−1) .
(79)
Clearly, the kernel of h′ is GL, and thus, |Ψ(A)⟩is a
ground state of H′
N = P h′
i.
Now assume H′
N had
another ground state, |Φ⟩, i.e., h′
i|Φ⟩= 0.
Then,
hi(A−1)⊗N|Φ⟩= Xh′
i|Φ⟩= 0 (here, X acts as A† on sites
i, i + 1, and (A−1) on all others), i.e., (A−1)⊗N would
be another ground state of HN, whose ground state is
however unique.
Thus, the ground state of H′
N must
be unique as well. (This technique can more generally be
seen as establishing a one-to-one correspondence between
ground states of the parent Hamiltonians of two PEPS
|ψ⟩and |ψ′⟩= R⊗N|A⟩which are related by an invert-
ible map R – not necessarily the PEPS map A – and thus
can also be applied e.g. to the cases with topological or
otherwise degenerate ground space structure described in
the next subsection.)
This leads to the following result (Perez-Garcia et al.,
2008a):
Theorem IV.12. Consider a PEPS where the tensors
have been blocked such that all tensors are injective.
Then, the 2-body parent Hamiltonian constructed from
all nearest neighbor sites has a unique ground state. This
results holds independent of the graph and translational
invariance.
In particular, given a square lattice, if injectivity is
reached by blocking H × V sites, then the parent Hamil-
tonians containing all terms derived for patches of size
H × (2V ) and (2H) × V has a unique ground state. In
1D, the result correspondingly applies for parent Hamil-
tonians acting on 2L0 sites, with L0 the injectivity
length (Perez-Garcia et al., 2007).
The injectivity length of a normal MPS is the small-
est number of sites which have to be blocked such that
its tensors become injective. This result can be consid-
erably strengthened – yielding more local Hamiltonians
– by avoiding to block until injectivity is reached. For
a normal MPS, consider two Hamiltonian terms h and
h′ acting on sites 1, . . . , L0 + 1 and 2, . . . , L0 + 2, where
L0 is the injectivity length, and let us denote by A, B,
and C the tensors on site 1, the blocked tensor of site
2, . . . , L0 + 1, and the tensor at site L0 + 2, respectively;
note that B is injective. The joint ground space of h and
h′ is the intersection I = G1,...,L0+1 ∩G2,...,L0+2, i.e., all
states of the form
B
A
L
=
B
C
R
(80)
for some boundary conditions L and R. We can invert
A, which yields
A
L
=
C
R
We can now re-attach (“grow back”) B to A:
A
B
L
=
C
B
R
Since B is injective, so are A and B jointly, and we can
invert them (calling the inverse S):
L
=
C
B
R
S
We thus ﬁnd that
L
=
C
X
i.e., any state in the intersection I is also contained in
G1,...,L0+2; and the converse is trivially true. We can now
iterate this argument to show that the ground space of a
Hamiltonian with terms acting on L0+1 sites is the same
as for a Hamiltonian with terms acting on L0 + k, k > 1,
sites. Once we have reached k = L0, we can resort to
the above Theorem, or alternatively apply a similar argu-
ment when closing the boundaries. (These two properties
are called the intersection property and closure property,
respectively. (Fannes et al., 1992b; Perez-Garcia et al.,
2007; Schuch et al., 2010))
The same technique (inverting and growing back) also
works in two dimensions; e.g., on the square lattice we
would start from the equality
L
B
A
=
R
B
C
and apply the same arguments as above.
This yields
the following strengthened result (Fannes et al., 1992b;
Perez-Garcia et al., 2007; Schuch et al., 2012):


---
*Page 56*

56
Theorem IV.13 (Uniqueness of ground state). Con-
sider a normal MPS which becomes injective upon block-
ing L0 sites. Then, the parent Hamiltonian deﬁned on
L0 + 1 sites has a unique ground state.
Consider a normal PEPS on the square lattice which
becomes injective upon blocking H0 × V0 sites. Then, the
parent Hamiltonian deﬁned on (H0 + 1) × V0 and H0 ×
(V0 + 1) sites has a unique ground state.
Both results hold independent of translational invari-
ance.
Note that the locality bound need not be tight. E.g.,
the AKLT model has L0 = 2, yet the two-site parent
Hamiltonian is suﬃent to obtain a unique ground state.
This can be seen e.g. by checking by hand that G1,2 ∩
G2,3 = G1,2,3.
For MPS, this provides a full characterization of all
MPS which appear as unique ground states of local
Hamitonians: Non-normal MPS, which have more than
one block in their canonical form, exhibit long-range or-
der, and we will see in the next section that their par-
ent Hamiltonian exhibits a degenerate ground state sub-
space.
For PEPS, there exist classes of states that even not
being injective, the are unique ground states of a parent
Hamiltonian. This holds for all states constructed anal-
ogously to (78), by replacing |Ω⟩with any other state
which is a unique ground state of a frustration free lo-
cal Hamiltonian. For instance, this is the case for semi-
injective PEPS (Molnar et al. (2018b), cf. Secs. III.B.1
and IV.B), where |Ω⟩is a product of entangled states
across plaquettes, and which is a unique ground state of
a 4-body Hamiltonian (acting on each plaquette). An-
other class of PEPS with unique ground states are given
by the family of MPO-injective PEPS that fulﬁll that the
MPO has a single block in the canonical form (Sec. IV.A).
c. Block-injectivity, entanglement symmetries, and degener-
ate ground spaces
The proof for the uniqueness of the
ground state of parent Hamiltonians breaks down once
the correspondence between physical and virtual system
captured by the concept of injectivity is lost – that is, if
there are degrees of freedom in the virtual space which
have no physical correspondence. For instance, this hap-
pens for MPS which have more than one block (r > 1)
in their canonical form Eq. (70): In that case, one can
easily see that any state corresponding to a single block
Ai
k is a ground state, as they are all supported on GL,
Eq. (75). In this scenario, we can deﬁne a generaliza-
tion of injective tensors, where the physical-virtual cor-
respondence holds blockwise (that is, for block-diagonal
boundary conditions X in (75)).
Deﬁnition IV.14. A tensor A is in block injective
canonical form if it is in canonical form, and for each
element X ∈Lg
j=1 MDj×Dj there exists a vector c(X)
such that X = P
i ci(X) ˜Ai, where ˜Ai := Lg
i=1 Ai
j, and
Aj are a basis of normal tensors (cf. Def. IV.2) of A.
Using the quantum version of Wielandt’s theorem (Sanz
et al., 2009a), it was shown by Perez-Garcia et al. (2007)
and Cirac et al. (2017a) that after blocking at most
L0 ≤3D5 spins, any tensor A in canonical form acquires
block injective canonical form.
One can then prove a
generalization of Theorem IV.12.
Theorem IV.15 (Fannes et al. (1992b); Perez-Garcia
et al. (2007)). For any N ≥2L0, the ground space of any
parent Hamiltonian is exactly the vector space generated
by a basis of normal tensors of the initial tensor A.
Following the same steps as following Eq. (80) (invert-
ing and re-growing tensors, where the inverse projects
on the space of block-diagonal matrices, and restricting
to boundary conditions L and R which are themselves
block-diagonal), we can strengthen this result in analogy
to Theorem IV.13:
Theorem IV.16. For any N ≥L0+1, the ground space
of any parent Hamiltonian is exactly the vector space gen-
erated by a basis of normal tensors of the initial tensor A.
The reason for the degenerate ground space can be
understood from the fact that such MPS have decoupled
blocks in the virtual space.
Alternatively, this can be
explained from a symmetry [Ai, Ug] = 0 of the MPS ten-
sor Ai with Ug a unitary representation of an abelian
group (where the blocks are supported on the diﬀerent
irreducible representations): In that case, [Ai, Ug] = 0
implies that projectors Pα = P χk(g)Ug onto irreps
(blocks) k commute with A, and thus cannot be detected
by the parent Hamiltonian; placing them on a link thus
selects diﬀerent ground states. These two perspectives
suggest two diﬀerent generalizations to two dimensions:
First, we can choose a 2D PEPS tensor with a “direct
sum” block structure over all virtual indices as in (70),
such as in the PEPS for the GHZ state (Sec. A.2.a). Such
a PEPS will have a GHZ-type structure; in particular,
if under blocking injectivity of all block is reached, the
parent Hamiltonian with terms acting on two blocks will
have a ground space spanned by the individual blocks.
The second generalization to PEPS is based on gener-
alizing the commutation relation UgAiU †
g = Ai to tensors
which are invariant under the action of some symmetry
on all the indices simultaneously. This in particular en-
compasses the G-injective PEPS and the MPO-injective
PEPS introduced in Sec. III.B. In that case, the pulling
though condition is exacly what allows to create projec-
tions onto diﬀerent sectors which can be commuted (i.e.
moved) through the tensor network and are thus invisi-
ble to the Hamiltonian. In the case of G-injective PEPS,
the condition for a controlled ground space is precisely
that the blocked PEPS tensor in injective on the sub-
space which is invariant under the symmetry action (“G-
injective”). We refer the reader to Schuch et al., 2010 for


---
*Page 57*

57
the formal result, and to Buerschaper, 2014 for the gen-
eralization to twisted G-injective PEPS and to Bultinck
et al., 2017 and S¸ahino˘glu et al., 2014 for the generaliza-
tion to MPO-injective PEPS, respectively. Let us also
note that tricks similar to the “re-growing” used in 1D
to construct parent Hamiltonians on L0 +1 sites can also
be used in the case of topologically ordered PEPS in 2D
to obtain smaller Hamiltonians, this has e.g. been carried
out by Schuch et al. (2012, Appendix D) for the kagome
RVB model to obtain a two-star Hamiltonian (which can
be broken down to a one-star Hamiltonian by direct in-
spection (Zhou et al., 2014), similar to the 2-body Hamil-
tonian for the AKLT model).
d. Converse: MPS ground states for frustration free Hamil-
tonians
As we have seen, every MPS is the ground state
of a frustration free Hamiltonian.
Remarkably, under
certain conditions the converse holds as well: Every frus-
tration free Hamiltonian has an MPS ground state.
The following result is due to Matsui (1998) (general-
izations of this connection have been shown recently by
Ogata (2016a,b, 2017)).
Theorem IV.17. Let h ≥0 be a Hamiltonian acting on
r + 1 sites, and let H[M,N] = PN−r
i=M hi, where hi is h
acting on sites i, . . . , i + r (i.e., the translational invari-
ant open boundary condition Hamiltonian with interac-
tion h).
If there exist C > 0 so that the dimension of the kernel
of H[M,N] is ≤C for all M, N, then any translational
invariant frustration free ground state |φ⟩in the thermo-
dynamic limit can be described by an MPS with a normal
tensor.
We refer the reader to the original works for the precise
mathematical formulation of the result in the thermody-
namic limit.
2. Gaps
Having deﬁned parent Hamiltonians and given condi-
tions which control their ground space structure, let us
now turn towards the question when these Hamiltoni-
ans are gapped. As we have seen, parent Hamitonians of
MPS are frustration free, i.e., the ground state minimizes
each interaction term individually. There are two tech-
niques to make statements about gaps of frustration free
Hamiltonians: The martingale method and Knabe-type
bounds. Both of them relate the gap in the thermody-
namic limit to the gap of a ﬁnite-size problem, which can
subsequently be solved numerically or analytically. Most
importantly, it turns out that the martingale method al-
lows to prove the existence of a gap, and to provide ex-
plicit lower bounds on it, for all MPS parent Hamiltoni-
ans.
Recently, these methods have been used to prove
the gap of a class of decorated AKLT models (Abdul-
Rahman et al., 2019), as well as to numerically show the
gap of a range of models (among others, the honeycomb
AKLT model) by numerically checking the correspond-
ing ﬁnite-size problems (Lemm et al., 2019; Pomata and
Wei, 2019).
a. The
martingale
method
The
martingale
method
(Fannes et al., 1992b; Kastoryano and Lucia, 2018;
Nachtergaele, 1996) relates the minimum non-zero angle
between the ground spaces of overlapping regions with
the gap: The system is gapped in the thermodynamic
limit if and only if by blocking, the overlaps of vectors
in overlapping ground spaces become suﬃciently large
(which intuitively allows to detect excitations locally).
More precisely, consider a frustration-free Hamiltonian
H = P hi with w.l.o.g. projectors hi. (If the hi are not
projectors, they are still lower and upper bounded by
projectors up to a constant.) Having a gap γ is equivalent
to H2 ≥γH, which (using h2
i = hi) is equivalent to
X
hi +
X′
hihj +
X′′
hihj ≥γ
X
hi ,
(81)
where P′ and P′′ denote sums over overlapping and non-
overlapping hi, respectively. P′′ hihj ≥0, and thus, (81)
is satisﬁed as long as
hihj + hjhi ≥−cij(1 −γ)(hi + hj)
(82)
for all overlapping pairs (i, j), where cij has to be chosen
to add up to 1 (e.g., if each hi overlaps with three others,
cij = 1/3). Thus, ﬁnding a blocking for which (82) is thus
suﬃcient to prove a gap. Note that (82) eﬀectively poses
a lower bound on the smallest non-zero angle between
the ground spaces of hi and hj.
Remarkably, the martingale condition (82) is also suﬃ-
cient: As shown by Kastoryano and Lucia (2018), when-
ever a frustration free Hamiltonian is gapped, δ(ℓ) :=
∥hihj −P∥(with P the projector onto the kernel of
hi + hj) goes to zero exponentially with universal con-
stants in the size ℓof the overlap region, which in partic-
ular implies validity of (82) (as both quantities only de-
pend on the principal angles between ker hi and ker hj).
Using the martingale method, one can prove that all
MPS parent Hamiltonians (both for normal and block-
injective MPS) have a gap (Fannes et al., 1992b; Nachter-
gaele, 1996):
Theorem IV.18. All MPS parent Hamiltonians are
gapped; this is, there exists a γ > 0 such that for the par-
ent Hamiltonian HN on N sites, the smallest non-zero
eigenvalue λ(HN) ≥γ uniformly in N.
For the dependence of γ on the MPS tensor, we refer
the reader to Fannes, Nachtergaele, and Werner (1992b)
and Nachtergaele (1996).


---
*Page 58*

58
For two- and higher-dimensional systems, no compara-
bly strong result is known. In particular, injectivity does
not imply a gap, since examples of injective PEPS are
known which exhibit power law correlations (such as the
“Ising PEPS” (Verstraete et al., 2006) on the honeycomb
lattice at the critical point, see Appendix. A) and thus
cannot be ground states of gapped Hamiltonians (Hast-
ings and Koma, 2006; Nachtergaele and Sims, 2006).
One can, however, derive a lower bound on the gap
of the parent Hamiltonian for PEPS whose tensor A
is suﬃciently close to a PEPS B with parent Hamil-
tonian h which satisﬁes the martingale condition (82)
(such as a commuting Hamiltonian), in the sense that
Ai = P ΛijBj with Λ −11 small. This is based on the
fact that following the logic of the previous subsection
around Eq. (79), h′ = (Λ−1†)⊗kh(Λ−1)⊗k is a parent
Hamiltonian for A (with k the locality of the Hamilto-
nian), and the bound γ on the gap in the martingale
condition changes smoothly with Λ. Alternatively, this
can be seen from the fact that (82) lower bounds the an-
gle between the ground spaces Gi,j of hi and hj, which
changes smoothly under deformations Λ⊗kGi,j. This has
been carried out explicitly by Schuch et al. (2011, Ap-
pendix E) for a commuting Hamiltonian h acting on 2×2
blocks, and it has been found that the gap is stable as
long as the ratio of the smallest and largest singular value
of Λ is above ≈0.967.
b. The Knabe bound
The Knabe bound relates the exis-
tence of a gap of a translational invariant and frustration
free Hamiltonian in the thermodynamic limit with the
scaling of the gap of the same Hamiltonian on a ﬁnite
chain. In particular, Knabe (1988) showed that if the
gap of a open boundary 1D chain with a nearest neigh-
bor projector Hamiltonian is larger than 1/(n −1) for
some n > 2, then the system with periodic boundaries
is gapped in the thermodynamic limit; this result was
later improved to 6/n(n + 1) by Gosset and Mozgunov
(2016), and generalized to two dimensions. The method
has also been extended to frustration-free Hamiltonians
with open boundary conditions (stating that for gapless
systems, the gap must close at least as n−3/2, showing the
impossibility of chiral edge modes with frustration free
Hamiltonians whose gap should scale as 1/n) by Lemm
and Mozgunov (2019).
3. Stability
A key question in the deﬁnition of quantum phases
is their stability against arbitrary small perturbations
(or, when considering SPT phases, against arbitrary
symmetry-preserving perturbations). Here, stability can
refer to diﬀerent properties, such as a smooth dependence
of various physical properties on the perturbation. The
most commonly considered property is the stability of
the spectral gap, as it implies stability of local proper-
ties through quasi-adiabatic continuation (Hastings and
Wen, 2005). It is easy to see that parent Hamltonians
of MPS and PEPS do not necessarily have such a sta-
bility property: The parent Hamiltonian of a GHZ state
(which is a PEPS, Section A) is a ferromagnetic Ising
Hamiltonian, whose two-fold degenerate ground space is
susceptible to small perturbations.
In the following, we will discuss conditions under which
the ground space of a MPS/PEPS parent Hamiltonian
can be shown to be stable under perturbations.
a. The LTQO condition
For frustration free Hamiltoni-
ans, stability of the spectral gap is implied by a condi-
tions known as LTQO (local topological quantum order)
condition (Bravyi et al., 2010; Bravyi and Hastings, 2011;
Michalakis and Pytel, 2013). Roughly speaking, it states
that the eﬀect of boundary conditions is exponentially
suppressed in the bulk (as a function of the distance of
the boundary):
Deﬁnition IV.19. Consider a translational invariant
frustration free Hamiltonian on on a 2D square lat-
tice.
We say that a region A satisﬁes LTQO, if there
is a superpolynomially decaying function fA(m) (i.e.,
limm→∞mkfA(m) = 0 for all k > 0), such that for for
any observable Oa supported on A, and all bounded re-
gions B containing A, it holds that for any pair of nor-
malized ground states |Ψ⟩, |Ψ′⟩of the Hamiltonian re-
stricted to region B,
⟨Ψ|Oa|Ψ⟩−⟨Ψ′|Oa|Ψ′⟩
 ≤∥Oa∥fA(m) ,
(83)
where m is the distance between A and ∂B (the boundary
of B).
We say that a particular observable Oa satisﬁes LTQO
if it veriﬁes (83).
We ﬁnally say that a system satisﬁes LTQO if all its
regions A satisfy it and the function f in (83) is inde-
pendent of A.
LTQO implies stability of the gap under local pertur-
bations, under some additional local gap conditions.
Theorem IV.20 (Michalakis and Pytel (2013)). Let
HN = P hi be a local Hamiltonian which satisﬁes LTQO,
and let V = P
k vk, with vk a bounded local term centered
at site k. Moreover, assume there is a γ > 0 such that
HN has a gap ∆N ≥γ with periodic boundaries, and
let the spectral gap of HN restricted to open boundaries
decay at most polynomially with the system size. Then,
there exist N0 and ϵ0 > 0 such that HN + ϵV has a gap
at least γ/2 for any N ≥N0 and ϵ ≤ϵ0.
We refer the reader for a more precise formulation of
the theorem, including several generalizations, to Micha-
lakis and Pytel (2013) and Nachtergaele et al. (2020).


---
*Page 59*

59
In the context of PEPS, the LTQO conditions has two
additional advantages: First, it can be checked numer-
ically for speciﬁc regions (and possibly observables), by
relating it to an eigenvalue problem; and second, it al-
lows for direct conclusions about the stability of physical
observables under the class of natural PEPS perturba-
tions Ai →P Λ(ϵ)ijAj, where Λ(ϵ) →1 smoothly (as
ϵ →0): In that case, the derivative of any observable
Oa(ϵ) changes smoothly in around ϵ = 0 as well (Cirac
et al., 2013).
b. Stability in one dimension
In one dimension, one can
prove for one-dimensional MPS with normal tensors that
the LTQO condition always holds (Cirac et al., 2013).
This implies that
Theorem IV.21. For MPS with normal tensors, the gap
of the parent Hamiltonians is stable under perturbations
VN = P
k vk, with vk a bounded local perturbation cen-
tered around k. This is, there exists an ϵ0 > 0 and γ > 0
such that HN +ϵVN has a unique ground state with a gap
∆N > γ for all ϵ < ϵ0 and all N.
An alternative proof of this stability, which does not
build on the LTQO condition, has been given by Szehr
and Wolf (2015).
c. Stability in two dimensions
In two dimensions, the
LTQO condition is generally hard to prove.
Speciﬁc
cases in which it holds are PEPS with commuting par-
ent Hamiltonians, such as isometric PEPS, G-isometric
PEPS (Schuch et al., 2010), or MPO-isometric PEPS
(S¸ahino˘glu et al., 2014), which are therefore robust
against local perturbations.
d. Perturbations of the tensor
An alternative way to per-
turb MPS and PEPS is to perturb the tensor, rather than
the Hamiltonian. There are two types of these perturba-
tions:
(i) Physical perturbations are perturbations which can
be understood as acting only on the physical index,
Ai →P ΛijAj.
As discussed, these correspond to
perturbations of the parent Hamiltonian of the form
h →(Λ−1†)⊗kh(Λ−1)⊗k.
They are thus “physical” in
the sense that they correspond to a physical perturba-
tion of the Hamiltonian. As discussed in the preceding
subsections, immediately implies that for normal MPS in
1D, and in the presence of LTQO in 2D, these perturba-
tions only give rise to smooth changes in the properties of
the system, and do not close the gap; alternatively, this
also follows from the stability of the martingale condition.
Note that for normal MPS and PEPS, any perturbation
of the tensor is a physical perturbation on injective blocks
– e.g., one can ﬁrst invert the injective tensor by acting
on the physical block, and then put the perturbed tensor
instead.
(ii) Unphysical perturbations are perturbations of the
tensor which cannot be understood as a physical per-
turbation, i.e. one which only acts on the physical index.
Clearly, such perturbations only exist for non-normal ten-
sors. It has been shown that unlike physical perturba-
tions, unphysical perturbations of the tensor can have
a drastic eﬀect: Perturbing a G-injective PEPS imme-
diately breaks topological order (Chen et al., 2010) by
condensing the anyons (cf. Section III), and the same is
true for MPO-injective PEPS (Shukla et al., 2018, though
MPO-injective PEPS are stable against certain unphys-
ical perturbations). This immediately implies that un-
physical perturbations cannot be related to physical per-
turbations of the parent Hamitonian, since e.g. the Toric
Code is stable against any perturbation of the Hamil-
tonian. Within the framework of parent Hamiltonians,
these perturbations are thus generally unphysical and
not of direct interest. It is however possible to introduce
other types of Hamiltonians, such as the uncle Hamil-
tonians discussed below, which are stable under general
perturbations. At the same time, understanding which
perturbations are unphysical is relevant for the numerical
simulation of topological phases, since one needs to pro-
tect against breaking of these symmetries (i.e., enforce
G-symmetry or MPO-symmetry) in order to obtain sys-
tems which exhibit topological order.
4. Alternative Hamiltonians
There are ways to obtain Hamiltonians with properties
diﬀerent from parent Hamiltonians. This can be achieved
in at least two ways: Either by considering tensors which
are not in canonical form, or by considering an alternative
construction for the Hamiltonian.
a. Product Vacua with Boundary States (PVBS)
PVBS
(Bachmann and Nachtergaele, 2012, 2014) are models
which are constructed from MPS which are not in their
canonical form, such as
A0 = (1 + λ)|0)(0| + |1)(1| , A1 = |0)(1| ,
where λ ∈[−1, 1]. The parent Hamitonian of this MPS
will have the MPS on an open boundary condition chain
as its ground space. This model will support two ground
states: Either the all-0 state, or a state with a single 1
state, which “binds” to the left (λ < 0) or right (λ > 1)
edge – the edge states.
On the other hand, the PBC
ground space only supports the all-0 state – the product
vacuum. PVBS models demonstrate that the classiﬁca-
tion of phases is diﬀerent on a system with boundaries, or
alternatively, that one has to consider whether a closing


---
*Page 60*

60
gap aﬀects the bulk behavior (which in the above model
is smooth even when λ changes sign).
Note that these models have been generalized to higher
dimensions outside the framework of tensor networks
(Bachmann et al., 2015).
b. Uncle Hamiltonians
Uncle Hamiltonians (Fern´andez-
Gonz´alez et al., 2012; Fernandez-Gonzalez et al., 2015)
are deﬁned to overcome the non-continuity of the par-
ent Hamiltonian under physical perturbations. They are
deﬁned by ﬁrst applying a (potentially unphysical) per-
turbation to the tensor, constructing the parent Hamilto-
nian, and subsequently taking the limit of the perturba-
tion to zero. The obtained Hamiltonians are termed un-
cle Hamiltonians and are by construction continuous un-
der the perturbation considered. On the other hand, de-
pending on the bond dimension of the MPS/PEPS they
might not be unique, but depend on the path of pertur-
bations considered. Uncle Hamiltonians have very diﬀer-
ent properties, in particular, they are generally gapless
for non-injective MPS/PEPS, such as for the 1D Ising or
the 2D Toric Code model (where momentum eigenstates
of domain walls or anyons, respectively, through which
the perturbation destroys the conventional or topologi-
cal order, have low energy).
V. OUTLOOK
In this review we have covered some of the basic con-
cepts in the ﬁeld of tensor networks and many-body
quantum systems, paying special attention to MPS and
PEPS on regular lattices. While we have revised in cer-
tain depth many results that have been obtained until
recently, we have left out whole areas of research on ten-
sor networks that are rapidly developing and that could
be the subject of one or several review by themselves. In
this outlook we brieﬂy list some of those areas, as well as
some open research directions.
Let us start out with the numerical algorithms built
on tensor networks to describe diﬀerent aspects of many-
body quantum systems.
While the present paper ex-
clusively deals with analytical results, the fact that ten-
sor network sates eﬃciently approximate many-body sys-
tems immediately provides a powerful playground for
addressing complex problems with that technique.
In
one spatial dimension, the success of the density matrix
renormalization group (DMRG) (White, 1992) method
in addressing the physical properties of one-dimensional
spin chains at zero temperature can be traced back to
the fact that it can be viewed as a variational method
over the manifold of MPS. One can naturally extend this
algorithm to higher spatial dimensions through PEPS,
although the scaling of the computational complexity
with the bond dimension is not so friendly as in 1 di-
mension, and one has to use approximate techniques in
order to compute expectation values of physical observ-
ables (Verstraete and Cirac, 2004a). Thus, arguably the
most important subjects of research in tensor networks
is the development of powerful algorithms in more than
one spatial dimensions. One can also extend those meth-
ods to ﬁnite temperatures by using MPDOs or PEPOs
(Czarnik and Dziarmaga, 2015), and to time-dependent
problems (Czarnik et al., 2019). The latter can be carried
out using either a variational method or a Trotterization
of the evolution operator followed by truncations of the
the time evolved states after each time step. Tensor net-
works have also been employed to express many-body
operators, like Hamiltonians, to compute elementary ex-
citations, spectral functions, densitiy of states, etc. (Mc-
Culloch, 2007; Pirvu et al., 2010). Again, the extension
of those methods to higher dimensions remains as one of
the main challenges. Other tensor network states, like
TTN or MERA have also played an important role in
certain many-body problems and are particularly appro-
priate to describe critical systems (Evenbly and Vidal,
2014; Silvi et al., 2010).
Methods based on MPS and
PEPS have also been recently developed that allow one
to compute physical properties of critical systems based
on the scaling as a function of the bond dimension (Cor-
boz et al., 2018; Pirvu et al., 2012; Rader and L¨auchli,
2018; Stojevic et al., 2015; Tagliacozzo et al., 2008; Van-
hecke et al., 2019a).
In a parallel eﬀort, mathemati-
cians have also investigated diﬀerent concepts to apply
tensor trains (which are analogous to MPS) to diverse
problems (Grasedyck, 2010; Hackbusch, 2012; Oseledets,
2011). Here, the idea is also to compress high-rank ten-
sors in terms of smaller ones, thus saving time and mem-
ory in computations.
Another very active area of research is continuous ten-
sor networks. We have reviewed here the theory under-
lying the one-dimensional version, cMPS. Constructing
algorithms that integrate the related Quantum-Gross-
Pitaesvskii equation (Haegeman et al., 2017) is very
challenging, although considerable progress in this di-
rection has very recently been made by Tuybens et al.
(2020).
Many eﬀorts are also devoted nowadays to
construct the higher dimensional versions (Tilloy and
Cirac, 2019), or the continuous MERA (Cotler et al.,
2019; Fernandez-Melgarejo and Molina-Vilaplana, 2020;
Fernandez-Melgarejo et al., 2019; Haegeman et al., 2013c;
Zou et al., 2019), for computations in quantum ﬁeld the-
ories. Here, the main challenge is to make practical al-
gorithms to deal with quantum ﬁeld theories. Another
relatively unexplored direction is the use of tensor net-
works with inﬁnite bond dimension, like iMPS, in order
to describe critical or chiral topological systems (Cirac
and Sierra, 2010; Nielsen et al., 2012, 2013; Tu et al.,
2014).
As for application of the computational techniques,
tensor networks have been used in problems in atomic,


---
*Page 61*

61
condensed
matter
and,
more
recently,
high-energy
physics.
In particular the fact that symmetries (both
global and local) can be easily incorporated into the ten-
sors appears as a very attractive feature to investigate
symmetry protected phases, topological models, and lat-
tice gauge theories numerically. Again, the main chal-
lenge here is to extend current methods to higher spatial
dimensions. MPS and TTN have also been applied to
problems in quantum chemistry, yielding very promising
results, although there are still open questions about the
suitability of diﬀerent tensor networks for diﬀerent chem-
ical structures (Chan and Sharma, 2011; Szalay et al.,
2015; White and Martin, 1999).
More recently, ten-
sor networks have been used to construct toy models of
holographic principles in hyperbolic geometries (Hayden
et al., 2016; Pastawski et al., 2015; Swingle, 2012). This
was triggered by the observation that MERA explicitly
leads to the Ryu-Takayanagi formula for the entangle-
ment entropy of critical states in 1+1 dimensions, where
the renormalization direction can be interpreted as the
radial coordinate in an AdS bulk. The language of ten-
sor networks seems to be appropriate to construct and
analyze simple models displaying some of the expected
features of the AdS/CFT correspondence. Furthermore,
it has also been used to describe some of the physics ex-
pected in black and worm holes.
Tensor networks are also being widely used in machine
learning (Carleo et al., 2019; Glasser et al., 2018, 2019;
Huggins et al., 2019; Stoudenmire and Schwab, 2016).
In fact, some of the most traditional methods in that
ﬁeld are very closely related to those networks. There is
also an intimate connection between tensor networks and
so-called neural network states (and string-bond states,
entangled plaquette states, etc), which in their simplest
incarnation are just MPS. However, those states can be
extended into other set of states which have the property
that physical observables can be computed using Monte-
Carlo methods, and thus they can be employed to study
the ground state of many-body systems with variational
Monte Carlo techniques. All those states are also inti-
mately related to graph models in the ﬁeld of machine
learning. This connection is being successfully exploited
in both directions: on the one hand, the techniques of
deep neural networks can be applied to construct power-
ful computational methods for many-body quantum sys-
tems; on the other, the theory of tensor networks and its
connection with entanglement can help to devise better
methods in machine learning.
Tensor network techniques have also been proposed
and used in quantum optics experiments. For instance,
quantum tomography can become much more eﬃcient
if the states one deals with can be approximated by
MPS or MPDO, as with fewer measurements one can
fully characterize the many-body state (Cramer et al.,
2010). Furthermore, in many physical systems MPS ap-
pear in a very natural way. For instance, in sequential
generation, where a physical system produces or inter-
acts with other subsystems sequentially (Osborne et al.,
2010; Sch¨on et al., 2005). This occurs, for instance, when
atoms cross a cavity where they interact with one or few
optical modes or, when an emitter generates photons one
after each other.
Tensor networks appear naturally in the ﬁeld of quan-
tum computing in diﬀerent incarnations.
First, mea-
surement based quantum computing can be easily ex-
plained in terms of a simple PEPS, the cluster state, and
teleportation-based gates acting on the auxiliary indices
of the tensor whenever one performs a measurement (Ver-
straete and Cirac, 2004b). Quantum circuits have a nat-
ural expression in terms of tensor networks, so that the
analysis of diﬀerent quantum algorithms, and even the ef-
fects of the errors can sometimes be easily traced (Nielsen
and Chuang, 2000). Additionally, quantum error correct-
ing codes have typically simple characterizations as ten-
sor networks (Terhal, 2015). This is the case of surface
codes, for instance, which are the basis of physical im-
plementations where gates occur locally. Tensor network
techniques also seem to be essential to analyse more so-
phisticated quantum error correcting codes bases on e.g.
string nets.
Finally, there are very intriguing connections between
tensor networks and some areas in Mathematics. For in-
stance, MPOs can be used to construct representations
of fusion categories, weak Hopf algebras and subfactors
(Kawahigashi, 2020; Lootens et al., 2021; Molnar et al.,
2021), which in turn are related to topological ﬁeld the-
ories, conformal ﬁeld theories and integrability through
the Yang-Baxter equation.
Appendix A: Examples
This appendix collects the MPS and PEPS descrip-
tions for a variety of widely used tensor network states.
1. One dimension: MPS
We start by giving a range of examples of one-
dimensional MPS.
a. Product states
Any product state |ψ⟩= |φ1⟩⊗|φ2⟩⊗· · · ⊗|φN⟩is
a trivial MPS with D = 1. With the convention that
|φs⟩= P
i ai,[s]|i⟩, we have that
|ψ⟩=
X
i1,...,iN
ai1,[1] · · · aiN,[N]|i1, . . . , iN⟩.
(A1)


---
*Page 62*

62
b. The GHZ state
The GHZ state on a d-level system,
|GHZ⟩=
d−1
X
i=0
|i, i, . . . , i⟩,
is an MPS with Ai
αβ = δi=α=β.
c. The W state
The W state
|W⟩= |100 . . . ⟩+ |010 . . . ⟩+ · · · + |0 . . . 001⟩
is an MPS with open boundary conditions and D = 2,
with
A0 =

1 0
0 1

,
A1 =

0 1
0 0

,
(A2)
and left and right boundary conditions (l| = (0| and |r) =
|1), respectively, i.e.
|W⟩=
X
(l|Ai1Ai2 · · · AiN |r) |i1, . . . , iN⟩.
(A3)
Note that this is not a translationally invariant represen-
tation of the MPS due to the non-periodic boundary con-
dition. This opens the question of which is the optimal
bond dimension to represent the W state as a translation-
ally invariant MPS. Remarkably, in this case the bond di-
mension D must scale polynomially with the system size
N. In particular, combining results of Perez-Garcia et al.
(2007) and Michalek and Shitov (2018), one gets that D
must fulﬁll a bound of the form D3 log D = Ω(N) which
implies in particular that, for each δ > 0, D = Ω(N
1
3+δ ).
d. The cluster state
The 1D cluster state (Raussendorf and Briegel, 2001)
is an MPS with
A0 = |0)(+| ,
A1 = |1)(−|
(Verstraete and Cirac, 2004b). This can be derived, e.g.,
by using the fact that the cluster state can be constructed
by acting with a controlled-Z between nearest neighbors,
starting from a |+⟩⊗N state.
e. The AKLT state
The 1D AKLT state (Aﬄeck, Kennedy, Lieb, and
Tasaki, 1987) is constructed by taking spin- 1
2 singlets as
bonds and projecting the two spin- 1
2 at each site on the
joint spin-1 subspace. The resulting tensor is (labelling
the physical states as Sz = 0, ±1)
A+1 =
1 0
0 0

Y , A0 =
1
√
2
0 1
1 0

Y , A−1 =
0 0
0 1

Y ,
where
Y =

0 −1
1
0

(A4)
encodes the singlet. When expressed in the basis |+⟩=
i(| −1⟩+ | + 1⟩)/
√
2, |−⟩= (| −1⟩−| + 1⟩)/
√
2, and |0⟩,
this becomes
A−=
1
√
2σx , A+ =
1
√
2σy , A0 =
1
√
2σz .
f. The Majumdar-Ghosh model
The Majumdar-Ghosh model is the 1D version of the
RVB state, and appears as the ground state of the spin- 1
2
Hamiltonian H = P Si ·Si+1 + 1
2
P Si ·Si+2 (Majumdar
and Ghosh, 1969). Its ground state is a superposition of
singlet pairs (1, 2), (3, 4), . . . and (2, 3), (4, 5), . . . , (N, 1),
and can be written as an MPS with
A =
h
|0⟩

(02| + (20|

+ |1⟩

(12| + (21|
i
⊗Y
(Verstraete et al., 2006), with Y as in Eq. (A4).
2. Two dimensions: PEPS
Next, we give a range of examples for two-dimensional
PEPS, where we follow the convention to order the
virtual indices top–right–down–left, as introduced in
Sec. II.B.1.
a. The GHZ state
Just as in 1D, the 2D GHZ state
|GHZ⟩=
d−1
X
i=0
|i, i, . . . , i⟩
can be written as a PEPS with D = d and Ai
αβγδ =
δi=α=β=γ=δ.
b. The cluster state
The 2D cluster state (Raussendorf and Briegel, 2001)
on the square lattice can be written as a PEPS with
A = |0⟩(00 + +| + |1⟩(11 −−| ,


---
*Page 63*

63
where (±| =

(0| ± (1|

/
√
2. This can again be under-
stood by rewriting the circuit preparing the cluster state
– controlled-Z’s between nearest neighbors acting on the
|+⟩⊗N state – as a tensor network (Verstraete and Cirac,
2004b). Indeed, this tensor network description straight-
forwardly generalized to arbitrary graphs.
c. The AKLT model
The 2D AKLT model (Aﬄeck, Kennedy, Lieb, and
Tasaki, 1988) is obtained by placing singlets on the links
of the lattice (commonly honeycomb or square) and pro-
jecting onto the symmetric subspace.
This can be di-
rectly translated into a PEPS, by absorbing the singlets
Y =
  0 −1
1
0

into the projectors Πsym onto the symmetric
space. For the square lattice, this yields tensors
A = Πsym(11 ⊗11 ⊗Y ⊗Y ) .
d. The RVB state
The (nearest neighbor) RVB state on a 2D lattice is the
superposition of all ways of covering the lattice with near-
est neighbor singlets. The corresponding D = 3 PEPS
tensor (Verstraete et al., 2006) is given by combining the
projector
P = |0⟩

(0222|+(2022|+. . .

+|1⟩

(1222|+(2122|+. . .

(illustrated here for coordination number 4) with ±Y ten-
sors for each link (with the sign corresponding to the
orientation of the singlet); for the square lattice with a
translational invariant orientation of singlets, the tensor
would e.g. be
A = P(11 ⊗11 ⊗Y ⊗Y ) .
e. The Toric Code and quantum double models
The quantum double model for a ﬁnite group G (Ki-
taev, 2003) on an oriented square lattice has spins with
basis {|g⟩}g∈G assigned to every edge, and is the equal
weight superposition of all basis conﬁgurations which sat-
isfy a Gauss’ law across a vertex, g1g2g−1
3 g−1
4
= 0, where
the inverses relate to the orientation of the edges.
A
PEPS representation can be obtained by blocking ev-
ery other plaquette (containing four edges) into a ten-
sor (aligned diagonally w.r.t. the lattice), and using the
virtual indices (which sit at the vertices of the original
lattice) to enforce the Gauss’ law, i.e., the non-zero con-
ﬁgurations are
(A5)
(where the lines inside the tensor indicate the original
lattice).
Alternatively, a dual PEPS representation can be ob-
tained by assigning dual “color” variables g ∈G to the
plaquettes and deﬁning the physical spins as the diﬀer-
ence of adjacent plaquette colors (Schuch et al., 2010).
The equal weight superposition of all plaquette colors
then corresponds to the equal weight superposition of all
Gauss’ law conﬁgurations. The corresponding tensor is
thus
(A6)
Note that this representation is G-injective (in fact, G-
isometric) with respect to the regular representation, as
shifting all plaquette colors does not aﬀect the physical
state. On the other hand, in the representation (A5), the
four virtual indices in the group basis fuse to the identity
and thus, they possess a symmetry under the action of
any irreducible representation.
From the point of view of bimodule categories (Lootens
et al., 2021), the case (A5) corresponds to D = G, M =
Vec, C = RepG, hence the MPO symmetries are labelled
by the irreps. The case (A6) corresponds to C = M =
D = G up to a blocking, and the MPOs are hence labelled
by the group elements.
f. String-net models
The string net picture provides the most natural de-
scription of topological phases of matter in terms of
MPO-symmetric tensors. As discussed in Sec. III.A.6
and III.B, the PEPS description involves a (C, D)-
bimodule category M with labels {a, b, c, . . .} ∈IC,
{A, B, C, . . .} ∈IM and {α, β, γ . . .} ∈ID. As a special
case, the categories might all be chosen equal to each
other. For the case of a bipartite hexagonal lattice and
a gauge in which all F-symbolds are unitary, one can
choose the A-type PEPS tensors of the bipartite lattice
as
 dαdβ
dγd2
C
1/4 
3F Aαβ
B
γ,km
C,jn =
α
β
γ
A
C
B
j
n
m
k
and the PEPS tensors on the B-type sublattice obtained
by reﬂecting the above tensor around the x-axis and re-
versing all arrows, as the complex conjugate.
The di
are the quantum dimensions of the diﬀerent categorical
objects. Additionally, an extra factor dA has to be intro-
duced for every closed loop of virtual labels M.


---
*Page 64*

64
The quantum double description for a group G as dis-
cussed in the previous section is a special case of this
string net representations.
The two options discussed
above correspond to D = M = C = VecG and to
D = VecG, M = Vec, C = Rep(G). Additionally, one
can deﬁne two more Morita equivalent PEPS with phys-
ical labels in Rep(G) as D = M = C = Rep(G) or as
D = Rep(G), M = Vec, C = VecG. Here, VecG is the
category with the group elements as labels, and Vec is
the trivial category consisting out of only 1 element.
g. PEPS from classical models
To each classical model H and a ﬁnite inverse tem-
perature β there is associated PEPS that reproduces
the the expectation value of any diagonal observable (in
particular, the classical correlation functions) present in
the Gibbs state e−βH
Z
. For simplicity, let us restrict to
the case of nearest neighbor interactions on a square
lattice H(σ1, . . . , σN) = P
(i,j) hi,j.
Deﬁne the matrix
M = P
i,j e−β
2 h(i,j)|i)(j|. Then, the corresponding PEPS
is given by the tensor (Verstraete et al., 2006)
A =
h X
i
|i⟩(i i i i|
i
(11 ⊗11 ⊗M ⊗M) .
It is clear from this that expectation values of the clas-
sical Gibbs state correspond to expectation values of the
associated PEPS for diagonal observables.
In particu-
lar, for the critical temperature βc the associated PEPS
has power law decaying correlations and hence its parent
Hamiltonian must be gapless (Hastings and Koma, 2006;
Nachtergaele and Sims, 2006).
h. The CZX model
The CZX model (Chen et al., 2011c) is a product state
of GHZ states of qubits (d = 2) across plaquettes of a
square lattice, placed on a torus of size 2N × 2M:
N,M
O
i,j=1
|GHZij⟩,
with |GHZij⟩the GHZ state on sites (2i, 2j), (2i +
1, 2j), (2i + 1, 2j + 1), (2i, 2j + 1). The CZX is just the
state resulting from considering blocked sites formed by
(2i −1, 2j −1), (2i, 2j −1), (2i, 2j), (2i −1, 2j),
Using the description of the GHZ given above, the PEPS
tensor, with bond dimension D = d2 = 4 is then given
by
1
X
i,j,k,l=0
|ijkl⟩((i, j), (j, k), (k, l), (l, i)|
As explained in Section III.B.1, the CZX model be-
longs to the non-trivial SPT sector of a global on-site Z2
symmetry.
3. Fermionic MPS and PEPS
a. The Kitaev chain
The Kitaev chain, or Majorana chain (Kitaev, 2001)
consists of a chain of spinless fermions.
Each fermion
consists of two Majorana fermions, which can be paired
up either within a site or across adjacent sites, which
can be changed by tuning the Hamiltonian. Here, we are
interested in the limit where the Majorana modes pair
up solely across sites, as this corresponds to a non-trivial
(topological) phase.
To describe the corresponding ground state as a
fermionic MPS, we start from 2N Majorana modes cj,
{cj, ck} = 2δij. Denote by |Ω⟩the vacuum, deﬁned via
c2nc2n+1|Ω⟩= 0, n = 1, . . . , N. Then, the non-trivial
ﬁxed point of the Kitaev chain is the state of the N com-
plex (Dirac) fermions an = (c2n−1 + ic2n)/2 in the state
|Ψ⟩= |Ω⟩.
The corresponding description in terms of
graded tensor networks is given in Eq. (10) and has ten-
sors (Bultinck et al., 2017a) A0 = ( 1 0
0 1 ) and A1 =
  0
1
−1 0

,
with a twist Y = A1 at the boundary.
b. Free fermionic and chiral PEPS
Free (or non-interacting) fermions are fermionic sys-
tems governed by a Hamiltonian which is quadratic in
the fermionic creation and annihilation operators a†
x and
ax, where x denotes the lattice position (and possibly
other degrees of freedom such as spin). Ground and ther-
mal states ρ of such Hamiltonians (“Gaussian states”)
are fully characterized by their second moments γxy =
i
2tr
 ρ[cx, cy]

due to Wick’s theorem, where we use a Ma-
jorana representation c2x−1 = ax+a†
x, c2x = −i(ax−a†
x).
A special case are PEPS constructed using Gaussian
states as bonds and Gaussian maps as PEPS tensors
(that is, maps which map Gaussian states to Gaussian
states). Due to their compact representation and the pos-
sibility to exactly solve for the ground state of e.g. trans-
lational invariant quadratic Hamiltonians, those Gaus-
sian fermionic PEPS form an important testbed for the
investigation of PEPS and their ability to describe cer-
tain types of systems.


---
*Page 65*

65
A translational invariant Gaussian fermionic PEPS in
D spatial dimensions with n physical Majorana modes
per site and m Majorana modes per bond is speciﬁed by
a (n+2Dm)×(n+2Dm) real antisymmetric matrix with
a block structure
Γ =
 X
Y
−Y T Z

(where X is n × n and Z is 2Dm × 2Dm) which satisﬁes
Γ2 = −11 (Kraus et al., 2010). It describes a Gaussian
state with non-zero correlations
ˆγ(k) = X + Y (Z + ω(k))−1Y T ,
ω(k) =
D
M
α=1

0
eikα11m
e−ikα11m
0

in momentum space, ˆγ(⃗k)
=
i
2tr
 ρ[ˆck, ˆc−k]

, ˆck
=
P ei k·xcx/
√
N. Importantly, since the entries of the in-
verse of a matrix M = Z + ω(k) are the quotient of the
determinant of minors of M and of det(M), any Gaus-
sian fermionic PEPS has the special property that ˆγ(k)
is the ratio of polynomials of degree at most 2Dm in
e±ikα (Schuch et al., 2008b).
One key example is a Gaussian fermionic PEPS which
describes a topological superconductor in D = 2 spatial
dimensions, that is, a system with chiral order (Wahl
et al., 2013, 2014), for which n = 2, m = 1 (i.e. each
bond only consists of a single Majorana mode), and
X =

0
1 −2λ
−1 + 2λ
0

,
Y =
p
λ −λ2
 1
−1
0
−
√
2
−1 −1 −
√
2
0

,
Z =





0
1 −λ
−λ
√
2
−λ
√
2
−1 + λ
0
λ
√
2
−λ
√
2
λ
√
2
−λ
√
2
0
1 −λ
λ
√
2
λ
√
2
−1 + λ
0




.
where 0 < λ < 1.
4. MPOs and MPUs
a. The CZX MPU
As explained in Section III.B.1, the reason behind the
fact that the CZX model is a non-trivial SPT phase is the
existence of a non trivial MPU symmetry in the associ-
ated PEPS determined by a nontrivial 3-cocycle. This
MPU is given by the tensor
|0⟩⟨1| ⊗|0)(+| + |1⟩⟨0| ⊗|1)(−| ,
and can be understood as a product of overlapping
controlled-Z’s CZ = diag(1, 1, 1, −1) between all ad-
jacent sites (as they commute, the ordering does not
matter), followed by a Pauli X on all sites (thus the
name) (Chen et al., 2011c).
This MPO, that we denote O(A), is injective, as can
easily be seen by considering the algebra generated by
the matrices
A01 =
1 1
0 0

and A10 =
0
0
1 −1

.
Let us now square this MPO, thereby getting an MPO
O(B) with bond dimension 4, given by the matrices:
B00 =
1 1
0 0

⊗
0
0
1 −1

=




0
0
0
0
1 −1 1 −1
0
0
0
0
0
0
0
0




B11 =
0
0
1 −1

⊗
1 1
0 0

=




0 0
0
0
0 0
0
0
1 1 −1 −1
0 0
0
0




This MPO is clearly not injective, and it has an invariant
subspace given by the projector
P =




0 0 0 0
0 1 0 0
0 0 1 0
0 0 0 0




By the canonical form construction (Section IV), we can
therefore as well work with the block
B00 =
−1 1
0
0

,
B11 =
0
0
1 −1

But this MPO again has an invariant subspace given by
the projector
Q = 1/2

1
−1
−1
1

.
Applying once more the canonical form construction, we
arrive at the following canonical form for the MPO Bij =
(−1)δij, which globally means O(A)2 = (−1)NI. The
CZX MPO hence provides a very nice example of how
the canonical form construction works.
b. The shift MPU
The shift is the paradigmatic example of an MPU that
cannot be approximated by a short range time evolution,
see Section II.B.2 (Cirac et al., 2017b). Its tensor is given
by
X
i,j
|i⟩⟨j| ⊗|i)(j| .


---
*Page 66*

66
c. The MPO for the Fibonacci model
String nets in the PEPS picture are described by a
(C, D)-bimodule category M with labels {a, b, c, . . .} ∈
IC, {A, B, C, . . .} ∈IM and {α, β, γ . . .} ∈ID.
The MPOs are given by
a
α
m
j
n
k
A
B
D
C
=
1
√dAdD
 2F aCα
B
D,nk
A,jm
with 2F a solution of the 6 coupled pentagon equations
and di the quantum dimensions of the categorical objects.
For the Fibonacci model, we can take C = M = D and
hence 1F =2 F =3 F =4 F =5 F = F. The categorical
objects are IC = {1, τ} with quantum dimensions d1 = 1,
dτ = (1 +
√
5)/2 and the fusion rules are given by
N 1
11 = N τ
τ1 = N τ
1τ = N 1
ττ = N τ
ττ = 1.
The elements of
 F abc
d
f
e are zero unless N c
ab > 0, N e
cd >
0, N f
ad > 0, Nbcf > 0, and the only allowed elements that
can not be chosen equal to 1 by an appropriate gauge
choice are
(F τττ
τ
)a
b =
 
1
dτ
1
√dτ
1
√dτ
−1
dτ
!
ab
ACKNOWLEDGMENTS
This review would not have been possible without
the numerous colleagues – too many to list in person –
with whom we have both collaborated on and extensively
discussed about the various aspects of tensor networks,
ranging all the way from their mathematical structure to
their physical use and numerical utility. We are deeply
grateful to each and every one of them. We also want to
thank all people who kept encouraging us both to start
and to ﬁnish this review.
Finally, we are very grate-
ful to Jos´e Garre Rubio for creating most ﬁgures in the
manuscript.
This work has received support from the European
Research Council (ERC) under the European Union’s
Horizon 2020 program (grant agreements No. 636201
(WASCOSYS), 647905 (QUTE), 648913 (GAPS), 742102
(QENOCOBA), and 863476 (SEQUAM)), from the DFG
(German Research Foundation) under Germany’s Excel-
lence Strategy (EXC2111-390814868), and through the
Severo Ochoa project SEV-2015-0554 (MINECO, Spain).
REFERENCES
Aasen, D., E. Lake, and K. Walker (2019), Journal of Math-
ematical Physics 60 (12), 121901.
Aasen, D., R. S. Mong,
and P. Fendley (2016), Journal of
Physics A: Mathematical and Theoretical 49 (35), 354001.
Abdul-Rahman, H., M. Lemm, A. Lucia, B. Nachtergaele,
and A. Young (2019), arXiv preprint arXiv:1901.09297.
Accardi, L. (1981), Topics in quantum probability (Elsevier
Science Limited).
Aﬄeck, A., T. Kennedy, E. H. Lieb,
and H. Tasaki (1988),
Commun. Math. Phys. 115, 477.
Aﬄeck, I., T. Kennedy, E. H. Lieb,
and H. Tasaki (1987),
Phys. Rev. Lett. 59, 799.
Aguado, M.,
and G. Vidal (2008), Physical review letters
100 (7), 070404.
Albeverio, S., and R. Høegh-Krohn (1978), Communications
in Mathematical Physics 64 (1), 83.
Anderson, P. W. (1973), Mater. Res. Bull. 8, 153.
Anderson, P. W. (2018), Basic notions of condensed matter
physics (CRC Press).
Andrews, G. E., R. J. Baxter,
and P. J. Forrester (1984),
Journal of Statistical Physics 35 (3-4), 193.
Arad, I., A. Kitaev, Z. Landau,
and U. Vazirani (2013),
1301.1162.
Arad, I., Z. Landau, U. Vazirani, and T. Vidick (2017), Com-
mun. Math. Phys. 356, 65, arXiv:1602.08828.
Avella, A.,
and F. Mancini (2011), Strongly correlated sys-
tems: theoretical methods, Vol. 171 (Springer Science &
Business Media).
Bachmann, S., E. Hamza, B. Nachtergaele,
and A. Young
(2015), J. Stat. Phys. 160, 636, arXiv:1410.0398.
Bachmann, S., S. Michalakis, B. Nachtergaele, and R. Sims
(2012), Commun. Math. Phys. 309, 835, arXiv:1102.0842.
Bachmann, S., and B. Nachtergaele (2012), Phys. Rev. B 86,
035149, arXiv:1112.4097.
Bachmann, S., and B. Nachtergaele (2014), Commun. Math.
Phys. 329, 509, arXiv:1212.3718.
Bais, F. A., B. J. Schroers,
and J. K. Slingerland (2002),
Phys.Rev.Lett. 89, 181601, hep-th/0205117.
Bal, M., M. Mari¨en, J. Haegeman, and F. Verstraete (2017),
Physical Review Letters 118 (25), 250602.
Bargmann, V. (1954), Annals of Mathematics 59, 1.
Barkeshli, M., P. Bonderson, M. Cheng, and Z. Wang (2019),
Physical Review B 100 (11), 115147.
Barthel, T., M. Kliesch,
and J. Eisert (2010), Phys. Rev.
Lett. 105, 010502, arXiv:1003.2319.
Barthel, T., C. Pineda, and J. Eisert (2009), Physical Review
A 80 (4), 042333.
Bauer, B., and C. Nayak (2013), Journal of Statistical Me-
chanics: Theory and Experiment 2013 (09), P09005.
Baxter, R. (1968), Journal of Mathematical Physics 9 (4),
650.
Baxter, R. (1981), Physica A: Statistical Mechanics and its
Applications 106 (1-2), 18.
Baxter, R. (2007), Exactly Solved Models in Statistical Me-
chanics, Dover books on physics (Dover Publications).
Becca, F.,
and S. Sorella (2017), Quantum Monte Carlo
Approaches for Correlated Systems (Cambridge University
Press).
Bekenstein, J. D. (1973), Physical Review D 7 (8), 2333.
Bennett, C. H., H. J. Bernstein, S. Popescu,
and B. Schu-
macher (1996), Physical Review A 53 (4), 2046.


---
*Page 67*

67
Bernevig, B.,
and T. Hughes (2013), Topological Insula-
tors and Topological Superconductors (Princeton University
Press).
Beylkin, G., and M. J. Mohlenkamp (2002), Proceedings of
the National Academy of Sciences 99 (16), 10246.
Biamonte, J. (2019), arXiv preprint arXiv:1912.10049.
Brandao, F. G., T. S. Cubitt, A. Lucia, S. Michalakis, and
D. Perez-Garcia (2015), Journal of mathematical physics
56 (10), 102202.
Brandao, F. G., and A. W. Harrow (2016), Communications
in Mathematical Physics 342 (1), 47.
Brandao, F. G.,
and M. Horodecki (2013), Nature Physics
9 (11), 721.
Bravyi, S., M. Hastings, and S. Michalakis (2010), J. Math.
Phys. 51, 093512, arXiv:1001.0344.
Bravyi, S., and M. B. Hastings (2011), Commun. Math. Phys.
307, 609, arXiv:1001.4363.
Bravyi, S., M. B. Hastings, and F. Verstraete (2006), Physical
review letters 97 (5), 050401.
Bravyi, S. B., and A. Y. Kitaev (1998), arXiv preprint quant-
ph/9811052.
Bridgeman, J. C., and C. T. Chubb (2017), Journal of Physics
A: Mathematical and Theoretical 50 (22), 223001.
Bridgeman, J. C.,
and D. J. Williamson (2017), Physical
Review B 96 (12), 125104.
Buerschaper,
O.
(2014),
Ann.
Phys.
351,
447,
arXiv:1307.7763.
Buerschaper, O., and M. Aguado (2009), Physical Review B
80 (15), 155136.
Buerschaper, O., M. Aguado,
and G. Vidal (2009), Phys.
Rev. B 79, 085119, arXiv:0809.2393.
Buican, M.,
and A. Gromov (2017), Communications in
Mathematical Physics 356 (3), 1017.
Bultinck, N., M. Mari¨en, D. J. Williamson, M. B. S¸ahino˘glu,
J. Haegeman, and F. Verstraete (2017), Annals of Physics
378, 183, arXiv:1511.08090.
Bultinck, N., R. Vanhove, J. Haegeman,
and F. Verstraete
(2018), Physical review letters 120 (15), 156601.
Bultinck,
N.,
D.
J.
Williamson,
J.
Haegeman,
and
F.
Verstraete
(2017a),
Phys.
Rev.
B
95,
075108,
arXiv:1610.07849.
Bultinck, N., D. J. Williamson, J. Haegeman,
and F. Ver-
straete (2017b), Journal of Physics A: Mathematical and
Theoretical 51 (2), 025202.
Buyens, B., J. Haegeman, K. Van Acoleyen, H. Verschelde,
and F. Verstraete (2014), Physical review letters 113 (9),
091601.
Cadarso, A., M. Sanz, M. M. Wolf, J. I. Cirac, and D. Perez-
Garcia (2013), Phys. Rev. B 87, 035114, arXiv:1209.3898.
Calabrese, P.,
and A. Lefevre (2008), Phys. Rev. A 78,
032329.
Carleo, G., I. Cirac, K. Cranmer, L. Daudet, M. Schuld,
N. Tishby, L. Vogt-Maranto,
and L. Zdeborov´a (2019),
Reviews of Modern Physics 91 (4), 045002.
Chaikin, P. M., T. C. Lubensky,
and T. A. Witten (1995),
Principles of condensed matter physics, Vol. 10 (Cambridge
university press Cambridge).
Chan, G. K.-L.,
and S. Sharma (2011), Annual review of
physical chemistry 62, 465.
Chen, C.-F., K. Kato,
and F. G. Brand˜ao (2020a), arXiv
preprint arXiv:2010.14682.
Chen, J.-Y., S. Capponi, A. Wietek, M. Mambrini, N. Schuch,
and D. Poilblanc (2020b), Phys. Rev. Lett. 125, 017201,
arXiv:1912.13393.
Chen, J.-Y., L. Vanderstraeten, S. Capponi, and D. Poilblanc
(2018), Phys. Rev. B 98, 184409, arXiv:1807.04385.
Chen, X., Z. Gu,
and X. Wen (2011a), Phys. Rev. B 83,
035107, arXiv:1008.3745.
Chen, X., Z.-C. Gu, Z.-X. Liu, and X.-G. Wen (2013), Phys.
Rev. B 87, 155114, arXiv:1106.4772.
Chen, X., Z.-C. Gu, and X.-G. Wen (2011b), Phys. Rev. B
84 (23), 235128.
Chen, X., Z.-X. Liu, and X.-G. Wen (2011c), Phys. Rev. B
84, 235141, arXiv:1106.4752.
Chen, X., B. Zeng, Z. Gu, I. L. Chuang, and X. Wen (2010),
Phys. Rev. B 82, 165119, arXiv:1003.1774.
Cirac, J., S. Michalakis, D. Perez-Garcia,
and N. Schuch
(2013), Phys. Rev. B 88, 115108, arXiv:1306.4003.
Cirac, J., D. Perez-Garcia, N. Schuch,
and F. Verstraete
(2017a), Ann. Phys. 378, 100, arXiv:1606.00608.
Cirac, J. I., D. Perez-Garcia, N. Schuch,
and F. Verstraete
(2017b), Journal of Statistical Mechanics: Theory and Ex-
periment 2017 (8), 083105.
Cirac, J. I., D. Poilblanc, N. Schuch,
and F. Verstraete
(2011), Phys. Rev. B 83, 245134, arXiv:1103.3427.
Cirac, J. I., and G. Sierra (2010), Physical Review B 81 (10),
104431.
Cirac, J. I., and F. Verstraete (2009), Journal of Physics A:
Mathematical and Theoretical 42 (50), 504004.
Coleman, A. (1972), Journal of Mathematical Physics 13 (2),
214.
Corboz, P. (2016), Physical Review B 94 (3), 035133.
Corboz, P., P. Czarnik, G. Kapteijns,
and L. Tagliacozzo
(2018), Physical Review X 8 (3), 031031.
Corboz, P., G. Evenbly, F. Verstraete, and G. Vidal (2010),
Phys. Rev. A 81, 010303(R), arXiv:0904.4151.
Coser, A.,
and D. Perez-Garcia (2018), arXiv preprint
arXiv:1810.05092.
Cotler, J. S., M. R. M. Mozaﬀar, A. Mollabashi, and A. Naseh
(2019), Physical Review D 99 (8), 085005.
Cramer, M., M. B. Plenio, S. T. Flammia, R. Somma,
D. Gross, S. D. Bartlett, O. Landon-Cardinal, D. Poulin,
and Y.-K. Liu (2010), Nature communications 1 (1), 1.
Crosswhite, G. M., and D. Bacon (2008), Physical Review A
78 (1), 012356.
Czarnik, P.,
and J. Dziarmaga (2015), Physical Review B
92 (3), 035152.
Czarnik, P., J. Dziarmaga,
and P. Corboz (2019), Physical
Review B 99 (3), 035115.
Czech, B., G. Evenbly, L. Lamprou, S. McCandlish, X.-l. Qi,
J. Sully, and G. Vidal (2016), Physical Review B 94 (8),
085101.
Daley, A. J., C. Kollath, U. Schollw¨ock, and G. Vidal (2004),
Journal of Statistical Mechanics: Theory and Experiment
2004 (04), P04005.
Dalzell, A. M.,
and F. G. Brandao (2019), arXiv preprint
arXiv:1903.10241.
De las Cuevas, G., J. I. Cirac, N. Schuch, and D. Perez-Garcia
(2017), J. Math. Phys. 58, 121901, arXiv:1708.00029.
De las Cuevas, G., T. S. Cubitt, J. I. Cirac, M. M. Wolf,
and D. Perez-Garcia (2016), J. Math. Phys. 57, 071902,
arXiv:1512.05709.
De las Cuevas, G., N. Schuch, D. Perez-Garcia,
and J. I.
Cirac (2013), New J. Phys. 15, 123021, arXiv:1308.1914.
De las Cuevas, G., N. Schuch, D. Perez-Garcia,
and J. I.
Cirac (2018), Phys. Rev. B 98, 174303, arXiv:1708.00880.
De Lathauwer, L., B. De Moor,
and J. Vandewalle (2000),
SIAM journal on Matrix Analysis and Applications 21 (4),


---
*Page 68*

68
1253.
Denisov, L. V. (1989), Theory Probab. Appl. 33, 392.
Dennis, E., A. Kitaev, A. Landahl,
and J. Preskill (2002),
Journal of Mathematical Physics 43 (9), 4452.
Dirac, P. A. (1930), in Mathematical Proceedings of the Cam-
bridge Philosophical Society, Vol. 26 (Cambridge University
Press) pp. 376–385.
Draxler, D., J. Haegeman, T. J. Osborne, V. Stojevic, L. Van-
derstraeten, and F. Verstraete (2013), Physical review let-
ters 111 (2), 020402.
Drinfel’d, V. (1987), Amer. Math. Soc., Providence, RI.
Dubail, J.,
and N. Read (2015), Phys. Rev. B 92, 205307,
arXiv:1307.7726.
Dubail, J., N. Read, and E. Rezayi (2012), Physical Review
B 86 (24), 245310.
Duivenvoorden, K., M. Iqbal, J. Haegeman, F. Verstraete,
and N. Schuch (2017), Phys. Rev. B 95 (23), 235119,
arXiv:1702.08469.
Dukelsky, J., M. A. Mart´ın-Delgado, T. Nishino,
and
G. Sierra (1998), EPL (Europhysics Letters) 43 (4), 457.
Eisert, J., M. Cramer, and M. Plenio (2010), Rev. Mod. Phys.
82, 277, arXiv:0808.3773.
Elitzur, S., G. Moore, A. Schwimmer, and N. Seiberg (1989),
Nuclear Physics B 326 (1), 108.
Estienne, B., Z. Papi´c, N. Regnault,
and B. A. Bernevig
(2013), Physical Review B 87 (16), 161112.
Evans, D., and Y. Kawahigashi (1995), International journal
of mathematics 6, 205.
Evenbly, G. (2017), Phys. Rev. B 95, 045117.
Evenbly, G.,
and G. Vidal (2009), Phys. Rev. Lett. 102,
180406, arXiv:0811.0879.
Evenbly, G.,
and G. Vidal (2011), J. Stat. Phys. 145, 891,
arXiv:1106.1082.
Evenbly, G.,
and G. Vidal (2014), Journal of Statistical
Physics 157 (4-5), 931.
Evenbly, G.,
and G. Vidal (2015), Physical review letters
115 (18), 180405.
Evenbly, G.,
and G. Vidal (2016), Physical review letters
116 (4), 040401.
Faddeev, L.,
and L. Takhtajan (1981), Physics Letters A
85 (6-7), 375.
Fannes, M., B. Nachtergaele,
and R. Werner (1989), EPL
(Europhysics Letters) 10 (7), 633.
Fannes, M., B. Nachtergaele, and R. Werner (1991), Journal
of Physics A: Mathematical and General 24 (4), L185.
Fannes, M., B. Nachtergaele, and R. Werner (1992a), letters
in mathematical physics 25 (3), 249.
Fannes, M., B. Nachtergaele, and R. Werner (1994), Journal
of functional analysis 120 (2), 511.
Fannes, M., B. Nachtergaele,
and R. Werner (1996), Com-
munications in mathematical physics 174 (3), 477.
Fannes, M., B. Nachtergaele,
and R. F. Werner (1992b),
Commun. Math. Phys. 144, 443.
Fannes, M., B. Nachtergaele, and R. F. Werner (1992c), Jour-
nal of statistical physics 66 (3-4), 939.
Fendley, P. (2021), Journal of Statistical Physics 182 (2), 1.
Fern´andez-Gonz´alez, C., N. Schuch, M. M. Wolf, J. I. Cirac,
and D. P´erez-Garc´ıa (2012), Phys. Rev. Lett. 109, 260401,
arXiv:1111.5817.
Fernandez-Gonzalez, C., N. Schuch, M. M. Wolf, J. I. Cirac,
and D. Perez-Garcia (2015), Commun. Math. Phys. 333,
299, arXiv:1210.6613.
Fernandez-Melgarejo, J. J., and J. Molina-Vilaplana (2020),
JHEP 2020, 149, arXiv:2003.08438.
Fernandez-Melgarejo,
J.
J.,
J.
Molina-Vilaplana,
and
E. Torrente-Lujan (2019), Physical Review D 100 (6),
065025.
Feynman, R. (1987), R.P. Feynman, Diﬃculties In Applying
The Variational Principle To Quantum Field Theories, Pro-
ceedings Variational Calculations In Quantum Field The-
ory, Wangerooge.
Fidkowski, L.,
and A. Kitaev (2010), Phys. Rev. B 83,
075103, arXiv:1008.4138.
Fradkin, E. (2013), Field Theories of Condensed Matter
Physics, Field Theories of Condensed Matter Physics
(Cambridge University Press).
Freedman, M., A. Kitaev, M. Larsen,
and Z. Wang (2003),
Bulletin of the American Mathematical Society 40 (1), 31.
Fuchs, J., I. Runkel,
and C. Schweigert (2002), Nuclear
Physics B 646 (3), 353.
Garre-Rubio, J.,
and S. Iblisdir (2019), New Journal of
Physics 21 (11), 113016.
Garre-Rubio, J., S. Iblisdir,
and D. P´erez-Garc´ıa (2017),
Physical Review B 96 (15), 155123.
Gils, C., E. Ardonne, S. Trebst, A. W. Ludwig, M. Troyer,
and Z. Wang (2009), Physical review letters 103 (7),
070401.
Gioev, D.,
and I. Klich (2006), Physical review letters
96 (10), 100503.
Giovannetti, V., S. Montangero, and R. Fazio (2008), Physi-
cal review letters 101 (18), 180503.
Girvin, S. M., and K. Yang (2019), Modern condensed matter
physics (Cambridge University Press).
Glasser, I., N. Pancotti, and J. I. Cirac (2018), arXiv preprint
arXiv:1806.05964.
Glasser, I., R. Sweke, N. Pancotti, J. Eisert, and J. I. Cirac
(2019), arXiv preprint arXiv:1907.03741.
Gosset, D.,
and E. Mozgunov (2016), J. Math. Phys. 57,
091901, arXiv:1512.00088.
Gould, M. (1993), Bulletin of the Australian Mathematical
Society 48 (2), 275.
Grasedyck, L. (2010), SIAM Journal on Matrix Analysis and
Applications 31 (4), 2029.
Gross, D., V. Nesme, H. Vogts,
and R. F. Werner (2012),
Commun. Math. Phys. 310, 419, arXiv:0910.3675.
Gu, Z.-C., M. Levin,
and X.-G. Wen (2008), Phys. Rev. B
78, 205116, arXiv:0807.2010; arXiv:0806.3509.
Gu, Z.-C., Z. Wang, and X.-G. Wen (2014), Physical Review
B 90 (8), 085140.
Gu, Z.-C., and X.-G. Wen (2009), Physical Review B 80 (15),
155131.
Hackbusch, W. (2012), Tensor spaces and numerical tensor
calculus, Vol. 42 (Springer).
Hackenbroich, A., A. Sterdyniak,
and N. Schuch (2018),
Phys. Rev. B 98, 085151, arXiv:1805.04531.
Haegeman, J., J. I. Cirac, T. J. Osborne, I. Piˇzorn, H. Ver-
schelde, and F. Verstraete (2011), Phys. Rev. Lett. 107 (7),
070601, arXiv:1103.0936.
Haegeman, J., J. I. Cirac, T. J. Osborne, H. Verschelde,
and F. Verstraete (2010), Physical review letters 105 (25),
251601.
Haegeman, J., J. I. Cirac, T. J. Osborne, and F. Verstraete
(2013a), Physical Review B 88 (8), 085118.
Haegeman, J., D. Draxler, V. Stojevic, J. I. Cirac, T. J. Os-
borne, and F. Verstraete (2017), Scipost Physics 3 (2017),
Nr. 1 3 (1), 6.
Haegeman, J., C. Lubich, I. Oseledets, B. Vandereycken, and
F. Verstraete (2016), Physical Review B 94 (16), 165116.


---
*Page 69*

69
Haegeman, J., M. Mari¨en, T. J. Osborne, and F. Verstraete
(2014), Journal of Mathematical Physics 55 (2), 021902.
Haegeman, J., S. Michalakis, B. Nachtergaele, T. J. Osborne,
N. Schuch, and F. Verstraete (2013b), Physical review let-
ters 111 (8), 080401.
Haegeman, J., T. J. Osborne, H. Verschelde,
and F. Ver-
straete (2013c), Physical review letters 110 (10), 100402.
Haegeman, J., D. Perez-Garcia, I. Cirac,
and N. Schuch
(2012a), Phys. Rev. Lett. 109, 050402, arXiv:1201.4174.
Haegeman, J., B. Pirvu, D. J. Weir, J. I. Cirac, T. J. Osborne,
H. Verschelde, and F. Verstraete (2012b), Phys. Rev. B 85,
100408, arXiv:1103.2286.
Haegeman, J.,
and F. Verstraete (2017), Annual Review of
Condensed Matter Physics 8, 355, arXiv:1611.08519.
Haegeman, J., V. Zauner, N. Schuch,
and F. Verstraete
(2015), Nature Comm. 6, 8284, arXiv:1410.5443.
Haferkamp, J., D. Hangleiter, J. Eisert, and M. Gluza (2020),
Phys. Rev. Research 2, 013010, arXiv:1810.00738.
Hallberg, K. A. (2006), Advances in Physics 55 (5-6), 477.
Hastings,
M.
(2007),
J.
Stat.
Mech.
,
P08024;
arXiv:0705.2024.
Hastings, M. B. (2004a), Phys. Rev. B 69, 104431, cond-
mat/0305505.
Hastings, M. B. (2004b), Physical review letters 93 (14),
140402.
Hastings, M. B. (2006), Phys. Rev. B 73, 085115, cond-
mat/0508554.
Hastings, M. B., and T. Koma (2006), Commun. Math. Phys.
265, 781, math-ph/0507008.
Hastings, M. B.,
and X. Wen (2005), Phys. Rev. B 72 (4),
045141, cond-mat/0503554.
Hayashi, T. (1999), arXiv:math.QA/9904073.
Hayden, P., S. Nezami, X.-L. Qi, N. Thomas, M. Walter, and
Z. Yang (2016), Journal of High Energy Physics 2016 (11),
9, arXiv:1601.01694.
Holzhey, C., F. Larsen,
and F. Wilczek (1994), Nuclear
Physics B 424 (3), 443.
Horodecki, R., P. Horodecki, M. Horodecki, and K. Horodecki
(2009), Rev. Mod. Phys. 81 (2), 865.
Huang, Y. (2014), arXiv:1403.0327.
Huang, Y. (2019), Quantum Views 3, 26.
Huang, Y. (2020), arXiv preprint arXiv:2001.10763.
Huggins, W., P. Patil, B. Mitchell, K. B. Whaley,
and
E. M. Stoudenmire (2019), Quantum Science and technol-
ogy 4 (2), 024001.
Imbrie, J. Z. (2016), Journal of Statistical Physics 163 (5),
998.
Jarkovsky, J. G., A. Molnar, N. Schuch,
and J. I. Cirac
(2020), PRX Quantum 1, 010304, arXiv:2003.12418.
Jennings, D., C. Brockt, J. Haegeman, T. J. Osborne,
and
F. Verstraete (2015), New Journal of Physics 17 (6),
063039.
Jiang, H.-C., Z.-Y. Weng,
and T. Xiang (2008), Physical
review letters 101 (9), 090603.
Jiang, S.,
and Y. Ran (2017), Phys. Rev. B 95, 125107,
arXiv:1611.07652.
Jordan, J., R. Orus, G. Vidal, F. Verstraete, and J. I. Cirac
(2008), Phys. Rev. Lett. 101, 250602, cond-mat/0703788.
Kadanoﬀ, L. P.,
and H. Ceva (1971), Physical Review B
3 (11), 3918.
K´ad´ar, Z., A. Marzuoli, and M. Rasetti (2010), Advances in
Mathematical Physics 2010.
Kastoryano, M. J.,
and A. Lucia (2018), Journal of Statis-
tical Mechanics: Theory and Experiment 2018, 033105,
arXiv:1705.09491.
Kastoryano, M. J., A. Lucia,
and D. Perez-Garcia (2019),
Communications in Mathematical Physics 366 (3), 895.
Kawahigashi, Y. (2020), Letters in Mathematical Physics
110, 1113.
Kennedy, T., and H. Tasaki (1992), Physical review b 45 (1),
304.
Kholevo, A. S. (1987), Theory Probab. Appl. 31, 493.
Kitaev, A. (2001), Phys.-Usp. 44, 131, cond-mat/0010440.
Kitaev, A. (2003), Ann. Phys. 303, 2, quant-ph/9707021.
Kitaev, A. (2006), Ann. Phys. 321, 2, cond-mat/0506438.
Kitaev, A., and L. Kong (2012), Commun. Math. Phys. 313,
351, arXiv:1104.5047.
Kitaev, A.,
and J. Preskill (2006), Phys. Rev. Lett. 96,
110404, hep-th/0510092.
Klich, I. (2010), Annals of Physics 325 (10), 2120.
Knabe, S. (1988), J. Stat. Phys. 52, 627.
Kohler,
T.,
and T. Cubitt (2019), JHEP 2019, 17,
arXiv:1810.08992.
Kohn, W. (1973), Phys. Rev. B 7, 4388.
Kolda, T. G., and B. W. Bader (2009), SIAM review 51 (3),
455.
K¨onig, R., B. W. Reichardt, and G. Vidal (2009), Physical
Review B 79 (19), 195123.
Kramers, H. A. (1930), Proc. Acad. Amst 33, 959.
Kramers, H. A., and G. H. Wannier (1941), Physical Review
60 (3), 263.
Kraus, C. V., N. Schuch, F. Verstraete, and J. I. Cirac (2010),
Phys. Rev. A 81, 052338, arXiv:0904.4667.
Kull, I., A. Molnar, E. Zohar, and J. I. Cirac (2017), Annals
of Physics 386, 199.
Kuwahara, T., ´Alvaro M. Alhambra, and A. Anshu (2021),
Phys. Rev. X 11, 011047, arXiv:2007.11174.
Kuwahara, T., and K. Saito (2020), Nature Comm. 11, 4478,
arXiv:1908.11547.
Lahtinen, V., and E. Ardonne (2015), Physical review letters
115 (23), 237203.
Landau, L. D. (1937), Ukr. J. Phys. 11, 19.
Landau,
Z.,
U.
Vazirani,
and
T.
Vidick
(2013),
arXiv:1307.5143.
Lemm, M.,
and E. Mozgunov (2019), J. Math. Phys. 60,
051901, arXiv:1801.08915.
Lemm, M., A. W. Sandvik,
and L. Wang (2019), arXiv
preprint arXiv:1910.11810.
Levin, M. (2013), Physical Review X 3 (2), 021009.
Levin, M., and C. P. Nave (2007), Physical Review Letters
99 (12), 10.1103/physrevlett.99.120601.
Levin, M.,
and X.-G. Wen (2006), Phys. Rev. Lett. 96,
110405, cond-mat/0510613.
Levin, M. A.,
and X.-G. Wen (2005), Phys. Rev. B 71,
045110, cond-mat/0404617.
Li, H., and F. D. M. Haldane (2008), Phys. Rev. Lett. 101,
010504, arXiv:0805.0332.
Liao, H.-J., J.-G. Liu, L. Wang, and T. Xiang (2019), arXiv
preprint arXiv:1903.09650.
Lieb, E., T. Schultz, and D. Mattis (1961), Annals of Physics
16 (3), 407.
Lieb, E. H.,
and M. B. Ruskai (1973), Les rencontres
physiciens-math´ematiciens de Strasbourg-RCP25 19, 36.
Liu, Y.-K., M. Christandl,
and F. Verstraete (2007), Phys.
Rev. Lett. 98, 110503, quant-ph/0609125.
Lootens, L., J. Fuchs, J. Haegeman, C. Schweigert,
and
F. Verstraete (2021), SciPost Phys. 10, 53.
Lootens, L., R. Vanhove,
and F. Verstraete (2019), arXiv


---
*Page 70*

70
preprint arXiv:1907.02520.
Lou, J., S. Tanaka, H. Katsura, and N. Kawashima (2011),
Physical Review B 84 (24), 245128, arXiv:1107.3888.
Maeshima, N., Y. Hieida, Y. Akutsu, T. Nishino,
and
K. Okunishi (2001), Phys. Rev. E 64, 016705.
Majumdar, C. K., and D. Ghosh (1969), J. Math. Phys. 10,
1388.
Maldacena, J. (1999), International journal of theoretical
physics 38 (4), 1113.
Matsui, T. (1998), Inﬁnite Dimensional Analysis, Quantum
Probability and Related Topics 1, 647.
McCulloch, I. P. (2007), Journal of Statistical Mechanics:
Theory and Experiment 2007 (10), P10014.
McCulloch, I. P., and M. Gul´acsi (2002), EPL (Europhysics
Letters) 57 (6), 852.
Mermin, N. D., and H. Wagner (1966), Physical Review Let-
ters 17 (22), 1133.
Michalakis, S.,
and J. Pytel (2013), Commun. Math. Phys.
322, 277, arXiv:1109.1588.
Micha lek, M., T. Seynnaeve, and F. Verstraete (2019), SIAM
Journal on Matrix Analysis and Applications 40 (3), 1125,
arXiv:1811.05502.
Michalek, M., and Y. Shitov (2018), arXiv:1809.04387.
Milsted, A., and G. Vidal (2017), Physical Review B 96 (24),
245105.
Molnar, A., J. Garre-Rubio, D. Perez-Garcia, N. Schuch, and
I. Cirac (2021), in preparation.
Molnar, A., J. Garre-Rubio, D. P´erez-Garc´ıa, N. Schuch,
and J. I. Cirac (2018a), New J. Phys. 20, 113017,
arXiv:1804.04964.
Molnar, A., Y. Ge, N. Schuch,
and J. I. Cirac (2018b), J.
Math. Phys. 59, 021902, arXiv:1706.07329.
Molnar, A., N. Schuch, F. Verstraete, and J. I. Cirac (2015),
Phys. Rev. B 91, 045138, arXiv:1406.2973.
Moore, G., and N. Seiberg (1989), Communications in Math-
ematical Physics 123 (2), 177.
Movassagh, R.,
and P. W. Shor (2016), Proceedings of the
National Academy of Sciences 113 (47), 13278.
M¨uger, M. (2003a), Journal of Pure and Applied Algebra
180 (1-2), 81.
M¨uger, M. (2003b), Journal of Pure and Applied Algebra
180 (1-2), 159.
Murg, V., F. Verstraete, ¨O. Legeza, and R. M. Noack (2010),
Physical Review B 82 (20), 205105.
Nachtergaele, B. (1996), Commun. Math. Phys. 175, 565.
Nachtergaele, B., and R. Sims (2006), Commun. Math. Phys.
265, 119, math-ph/0506030.
Nachtergaele, B., and R. Sims (2010), Contemp. Math 529,
141.
Nachtergaele, B., R. Sims,
and A. Young (2020), arXiv
preprint arXiv:2010.15337.
Nandkishore, R.,
and D. A. Huse (2015), Annu. Rev. Con-
dens. Matter Phys. 6 (1), 15.
Nielsen, A. E., J. I. Cirac,
and G. Sierra (2012), Physical
review letters 108 (25), 257206.
Nielsen, A. E., G. Sierra,
and J. I. Cirac (2013), Nature
communications 4 (1), 1.
Nielsen, M. A., and I. A. Chuang (2000), Quantum Compu-
tation and Quantum Information (Cambridge University
Press).
Niggemann,
H.,
A. Kl¨umper,
and J. Zittartz (1997),
Zeitschrift f¨ur Physik B Condensed Matter 104 (1), 103.
den Nijs, M.,
and K. Rommelse (1989), Physical Review B
40 (7), 4709.
Nishino,
T.
(2020),
T.
Nishino,
DMRG
homepage,
http://quattro.phys.sci.kobe-
u.ac.jp/dmrg/condmat91.html.
Nishino, T., and K. Okunishi (1996), Journal of the Physical
Society of Japan 65 (4), 891.
Nishino, Y., N. Maeshima, A. Gendiar,
and T. Nishino
(2004), cond-mat/0401115.
Ogata,
Y.
(2016a),
Commun.
Math.
Phys.
348,
847,
arXiv:1510.07753.
Ogata,
Y.
(2016b),
Commun.
Math.
Phys.
348,
897,
arXiv:1510.07751.
Ogata,
Y.
(2017),
Commun.
Math.
Phys.
352,
1205,
arXiv:1606.05508.
Orus, R. (2014), Ann. Phys. 349, 117, arXiv:1306.2164.
Orus, R., J. I. Latorre, J. Eisert,
and M. Cramer (2006),
Physical Review A 73 (6), 060303.
Osborne, T. J. (2007), Phys. Rev. A 75, 042306, quant-
ph/0603137.
Osborne, T. J., J. Eisert, and F. Verstraete (2010), Physical
review letters 105 (26), 260401.
Oseledets, I. V. (2011), SIAM Journal on Scientiﬁc Comput-
ing 33 (5), 2295.
Oshikawa, M., M. Yamanaka, and I. Aﬄeck (1997), Physical
review letters 78 (10), 1984.
¨Ostlund, S., and S. Rommer (1995), Phys. Rev. Lett. 75 (19),
3537.
Pastawski, F., B. Yoshida, D. Harlow,
and J. Preskill
(2015), Journal of High Energy Physics 2015 (6), 149,
arXiv:1503.06237.
P´erez-Garc´ıa,
D.,
and
A.
P´erez-Hern´andez
(2020),
arXiv:2004.10516.
Perez-Garcia, D., M. Sanz, C. E. Gonzalez-Guillen, M. M.
Wolf,
and J. I. Cirac (2010), New J. Phys. 12, 025010,
arXiv:0908.1674.
Perez-Garcia, D., F. Verstraete, J. I. Cirac, and M. M. Wolf
(2008a), Quantum Inf. Comput. 8, 0650, arXiv:0707.2260.
Perez-Garcia, D., F. Verstraete, M. M. Wolf, and J. I. Cirac
(2007), Quant. Inf. Comput. 7, 401, quant-ph/0608197.
Perez-Garcia,
D.,
M.
Wolf,
M.
Sanz,
F.
Verstraete,
and J. Cirac (2008b), Phys. Rev. Lett. 100, 167202,
arXiv:0802.0447.
Peschel, I., M. Kaulke,
and ¨O. Legeza (1999), Annalen der
Physik 8 (2), 153.
Pfeifer, R. N., G. Evenbly,
and G. Vidal (2009), Physical
Review A 79 (4), 040301.
Piroli, L., A. Turzillo, S. Shukla,
and J. I. Cirac (2020),
arXiv:2007.11905.
Pirvu, B., J. Haegeman, and F. Verstraete (2012), Physical
Review B 85 (3), 035130.
Pirvu, B., V. Murg, J. I. Cirac,
and F. Verstraete (2010),
New Journal of Physics 12 (2), 025012.
Plenio, M. B., J. Eisert, J. Dreissig, and M. Cramer (2005),
Physical review letters 94 (6), 060503.
Poilblanc,
D.
(2017),
Phys.
Rev.
B
96,
121118,
arXiv:1707.07844.
Poilblanc, D., J. I. Cirac, and N. Schuch (2015), Phys. Rev.
B 91, 224431, arXiv:1504.05236.
Poilblanc, D., N. Schuch,
and I. Aﬄeck (2016), Phys. Rev.
B 93, 174414, arXiv:1602.05969.
Pollmann, F., E. Berg, A. M. Turner,
and M. Oshikawa
(2012), Phys. Rev. B 85, 075125, arXiv.org:0909.4059.
Pollmann, F.,
and A. M. Turner (2012), Phys. Rev. B 86,


---
*Page 71*

71
125441, arXiv:1204.0704.
Pollmann, F., A. M. Turner, E. Berg,
and M. Oshikawa
(2010), Phys. Rev. B 81 (6), 064439, arXiv:0910.1811.
Pomata,
N.,
and
T.-C.
Wei
(2019),
arXiv
preprint
arXiv:1911.01410.
Porras, D., F. Verstraete,
and J. I. Cirac (2006), Physical
Review B 73 (1), 014410.
Qi, X.-L., H. Katsura, and A. W. W. Ludwig (2012), Phys.
Rev. Lett. 108, arXiv:1103.5437.
Qi, X.-L., and Z. Yang (2018), arXiv:1801.05289.
Qi, X.-L., Z. Yang,
and Y.-Z. You (2017), Journal of High
Energy Physics 2017 (8), 60, arXiv:1703.06533.
Rader, M.,
and A. M. L¨auchli (2018), Physical Review X
8 (3), 031030.
Raggio, G., and R. Werner (1989), Helv. Phys. Acta 62 (8),
980.
Rahaman, M. (2018), arXiv:1807.06872.
Rams, M. M., V. Zauner, M. Bal, J. Haegeman, and F. Ver-
straete (2015), Physical Review B 92 (23), 235150.
Raussendorf, R., and H. J. Briegel (2001), Phys. Rev. Lett.
86, 5188, quant-ph/0010033.
Read, N. (2017), Phys. Rev. B 95, 115309, arXiv:1608.04696.
Richter,
S.
(1994),
Construction
of
States
on
Two-
Dimensional Lattices and Quantum Cellular Automata,
Ph.D. thesis (Universit¨at Osnabr¨uck).
Rispler, M., K. Duivenvoorden, and N. Schuch (2015), Phys.
Rev. B 92, 155133, arXiv:1505.04217.
Rispler, M., K. Duivenvoorden,
and N. Schuch (2017), J.
Phys. A: Math. Theor. 50, 365001, arXiv:1703.04137.
Rommer, S., and S. ¨Ostlund (1997), Physical review b 55 (4),
2164.
S¸ahino˘glu, M. B., S. K. Shukla, F. Bi, and X. Chen (2018),
Physical Review B 98 (24), 245122.
S¸ahino˘glu, M. B., D. Williamson, N. Bultinck, M. Marien,
J. Haegeman, N. Schuch, and F. Verstraete (2014), Ann.
Henri Poincare 22, 563, arXiv:1409.2150.
Sanz,
M.,
D. Perez-Garcia,
M. M. Wolf,
and J. I.
Cirac
(2009a),
IEEE
Trans.
Inf.
Theory
56,
4668,
arXiv:0909.5347.
Sanz, M., M. M. Wolf, D. Perez-Garcia,
and J. I. Cirac
(2009b), Phys. Rev. A 79, 042308, arXiv:0901.2223.
Scarpa, G., A. Molnar, Y. Ge, J. J. Garcia-Ripoll, N. Schuch,
D. Perez-Garcia,
and S. Iblisdir (2020), Phys. Rev. Lett.
125, 210504, arXiv:1802.08214.
Schollw¨ock, U. (2005), Rev. Mod. Phys. 77, 259, cond-
mat/0409292.
Schollw¨ock, U. (2011), Ann. Phys. 326, 96, arXiv:1008.3477.
Sch¨on, C., E. Solano, F. Verstraete, J. I. Cirac,
and
M. M. Wolf (2005), Phys. Rev. Lett. 95, 110503, quant-
ph/0501096.
Schuch, N., I. Cirac, and D. P´erez-Garc´ıa (2010), Ann. Phys.
325, 2153, arXiv:1001.3807.
Schuch, N., I. Cirac, and F. Verstraete (2008a), Phys. Rev.
Lett. 100, 250501, arXiv:0802.3351.
Schuch, N., D. Perez-Garcia, and I. Cirac (2011), Phys. Rev.
B 84, 165139, arXiv:1010.3732.
Schuch, N., D. Poilblanc, J. I. Cirac,
and D. P´erez-Garc´ıa
(2012), Phys. Rev. B 86, 115108, arXiv:1203.4816.
Schuch, N., D. Poilblanc, J. I. Cirac,
and D. Perez-Garcia
(2013), Phys. Rev. Lett. 111, 090501, arXiv:1210.5601.
Schuch,
N.,
and F. Verstraete (2017), arXiv preprint
arXiv:1711.06559.
Schuch, N., M. M. Wolf, and J. I. Cirac (2008b), in Quantum
information and Many Body Quantum Systems, edited by
M. Ericsson and S. Montangero, quant-ph/0509166.
Schuch, N., M. M. Wolf, F. Verstraete, and J. I. Cirac (2007),
Phys. Rev. Lett. 98, 140506, quant-ph/0611050.
Schuch, N., M. M. Wolf, F. Verstraete,
and J. I. Cirac
(2008c), Phys. Rev. Lett. 100, 30504, arXiv:0705.0292.
Shavitt, I., and R. J. Bartlett (2009), Many-Body Methods in
Chemistry and Physics: MBPT and Coupled-Cluster The-
ory, Cambridge Molecular Science (Cambridge University
Press).
Shi, Y.-Y., L.-M. Duan, and G. Vidal (2006), Physical review
a 74 (2), 022320.
Shukla,
S.
K.,
M.
Burak
S¸ahino˘glu,
F.
Pollmann,
and
X.
Chen
(2018),
Phys.
Rev.
B
98,
125112,
arXiv:1610.00608.
Sierra, G.,
and M. Martin-Delgado (1998), arXiv preprint
cond-mat/9811170.
Silvi, P., V. Giovannetti, S. Montangero, M. Rizzi, J. I. Cirac,
and R. Fazio (2010), Physical Review A 81 (6), 062335.
Singh, S., R. N. C. Pfeifer, and G. Vidal (2010), Phys. Rev.
A 82 (5), 050301, arXiv:0907.2994.
Stinespring, W. F. (1955), Proceedings of the American Math-
ematical Society 6 (2), 211.
Stojevic, V., J. Haegeman, I. McCulloch, L. Tagliacozzo, and
F. Verstraete (2015), Physical Review B 91 (3), 035120.
Stoudenmire, E.,
and D. J. Schwab (2016), in Advances in
Neural Information Processing Systems, pp. 4799–4807.
Su, W., J. Schrieﬀer, and A. J. Heeger (1979), Physical review
letters 42 (25), 1698.
Swingle,
B.
(2012),
Phys.
Rev.
D
86,
065007,
arXiv:0905.1317.
Szalay, S., M. Pfeﬀer, V. Murg, G. Barcza, F. Verstraete,
R. Schneider, and ¨O. Legeza (2015), International Journal
of Quantum Chemistry 115 (19), 1342.
Szehr, O., and M. M. Wolf (2015), J. Stat. Phys. 159, 752,
arXiv:1402.4175.
Szehr, O., and M. M. Wolf (2016), Journal of Mathematical
Physics 57 (8), 081901.
Tagliacozzo, L., T. R. De Oliveira, S. Iblisdir, and J. Latorre
(2008), Physical review b 78 (2), 024410.
Terhal, B. M. (2004), IBM Journal of Research and Develop-
ment 48 (1), 71.
Terhal, B. M. (2015), Reviews of Modern Physics 87 (2), 307.
Tilloy, A., and J. I. Cirac (2019), Physical Review X 9 (2),
021040.
Tu, H.-H., A. E. Nielsen, J. I. Cirac,
and G. Sierra (2014),
New Journal of Physics 16 (3), 033025.
Tuybens, B., J. De Nardis, J. Haegeman, and F. Verstraete
(2020), arXiv preprint arXiv:2006.01801.
Van Acoleyen, K., A. Hallam, M. Bal, M. Hauru, J. Haege-
man,
and F. Verstraete (2020), Physical Review B
102 (16), 165131.
Vanderstraeten, L., J. Haegeman, P. Corboz,
and F. Ver-
straete (2016), Physical Review B 94 (15), 155123.
Vanderstraeten, L., J. Haegeman, and F. Verstraete (2018),
arXiv preprint arXiv:1810.07006.
Vanhecke, B., J. Haegeman, K. Van Acoleyen, L. Vander-
straeten, and F. Verstraete (2019a), Physical Review Let-
ters 123 (25), 250604.
Vanhecke, B., M. Van Damme, L. Vanderstraeten,
and
F. Verstraete (2019b), arXiv preprint arXiv:1912.10512.
Vanhove, R., M. Bal, D. J. Williamson, N. Bultinck, J. Haege-
man,
and F. Verstraete (2018), Physical review letters
121 (17), 177203.
Verstraete, F., J. Cirac, J. Latorre, E. Rico,
and M. Wolf


---
*Page 72*

72
(2005), Phys. Rev. Lett. 94, 140601, quant-ph/0410227.
Verstraete, F., and J. I. Cirac (2004a), cond-mat/0407066.
Verstraete, F.,
and J. I. Cirac (2004b), Phys. Rev. A 70,
060302, quant-ph/0311130.
Verstraete, F.,
and J. I. Cirac (2006), Phys. Rev. B 73,
094423, cond-mat/0505140.
Verstraete, F., and J. I. Cirac (2010), Physical review letters
104 (19), 190405.
Verstraete, F., J. J. Garcia-Ripoll,
and J. I. Cirac (2004a),
Phys. Rev. Lett. 93, 207204, cond-mat/0406426.
Verstraete, F., M. A. Martin-Delgado,
and J. I. Cirac
(2004b), Phys. Rev. Lett. 92, 087201, quant-ph/0311087.
Verstraete, F., V. Murg, and J. I. Cirac (2008), Advances in
Physics 57, 143.
Verstraete, F., M. Popp,
and J. I. Cirac (2004c), Physical
review letters 92 (2), 027901.
Verstraete, F., D. Porras, and J. I. Cirac (2004d), Phys. Rev.
Lett. 93, 227205, cond-mat/0404706.
Verstraete, F., M. M. Wolf, D. Perez-Garcia, and J. I. Cirac
(2006), Phys. Rev. Lett. 96, 220601, quant-ph/0601075.
Vidal,
G. (2003), Phys. Rev. Lett. 91, 147902, quant-
ph/0301063.
Vidal,
G. (2007a), Phys. Rev. Lett. 98, 070201, cond-
mat/0605597.
Vidal, G. (2007b), Physical review letters 99 (22), 220405.
Vidal, G. (2008), Phys. Rev. Lett. 101, 110501, quant-
ph/0610099.
Wahl, T., H.-H. Tu, N. Schuch,
and J. Cirac (2013), Phys.
Rev. Lett. 111, 236805, arXiv:1308.0316.
Wahl, T. B., S. T. Haßler, H.-H. Tu, J. I. Cirac, and N. Schuch
(2014), Phys. Rev. B 90, 115133, arXiv:1405.0447.
Wahl, T. B., A. Pal, and S. H. Simon (2017), Physical Review
X 7 (2), 021018.
Weichselbaum, A. (2012), Annals of Physics 327 (12), 2972.
Wen, X.-G. (2004), Quantum Field Theory of Many Body Sys-
tems (Oxford University Press).
Wen, X.-G. (2017), Rev. Mod. Phys. 89 (4), 041004.
White, S. R. (1992), Phys. Rev. Lett. 69, 2863.
White, S. R. (1993), Physical Review B 48 (14), 10345.
White, S. R.,
and A. E. Feiguin (2004), Phys. Rev. Lett.
93 (7), 076401.
White, S. R., and R. L. Martin (1999), The Journal of chem-
ical physics 110 (9), 4127.
Williamson, D. J., N. Bultinck, M. Marien, M. B. Sahinoglu,
J. Haegeman, and F. Verstraete (2016), Phys. Rev. B 94,
205150, arXiv:1412.5604.
Williamson, D. J., N. Bultinck,
and F. Verstraete (2017),
arXiv preprint arXiv:1711.07982.
Wilson, K. G. (1975), Rev. Mod. Phys. 47, 773.
Witten, E. (1989), Comm. in Math. Phys. 121 (3), 351.
Wolf, M. M. (2006), Phys. Rev. Lett. 96, 010404, quant-
ph/0503219.
Wolf,
M.
M.
(2012),
“Quantum
channels
&
op-
erations,”
Lecture
notes.
Available
at
https:
//www-m5.ma.tum.de/foswiki/pub/M5/Allgemeines/
MichaelWolf/QChannelLecture.pdf.
Wolf, M. M.,
and J. I. Cirac (2008), Communications in
Mathematical Physics 279 (1), 147.
Wolf, M. M., F. Verstraete, M. B. Hastings, and J. I. Cirac
(2008), Phys. Rev. Lett. 100, 070502, arXiv.org:0704.3906.
Xie, Z.-Y., J. Chen, M.-P. Qin, J. W. Zhu, L.-P. Yang, and
T. Xiang (2012), Physical Review B 86 (4), 045139.
Xie, Z. Y., J. Chen, J. F. Yu, X. Kong, B. Normand,
and
T. Xiang (2014), Phys. Rev. X 4, 011025, arXiv:1307.5696.
Xie, Z.-Y., H.-C. Jiang, Q. N. Chen, Z.-Y. Weng, and T. Xi-
ang (2009), Physical review letters 103 (16), 160601.
Yang, S., Z.-C. Gu, and X.-G. Wen (2017), Physical review
letters 118 (11), 110504.
Yang, S., L. Lehman, D. Poilblanc, K. V. Acoleyen, F. Ver-
straete, J. Cirac, and N. Schuch (2014), Phys. Rev. Lett.
112, 036402, arXiv:1309.4596.
Yang, S., T. B. Wahl, H.-H. Tu, N. Schuch, and J. I. Cirac
(2015), Phys. Rev. Lett. 114, 106803, arXiv:1411.6618.
Zaletel, M. P.,
and R. S. Mong (2012), Physical Review B
86 (24), 245305.
Zaletel, M. P., R. S. Mong, and F. Pollmann (2013), Physical
review letters 110 (23), 236801.
Zaletel, M. P., R. S. Mong, F. Pollmann, and E. H. Rezayi
(2015), Physical Review B 91 (4), 045115.
Zauner, V., D. Draxler, L. Vanderstraeten, M. Degroote,
J. Haegeman, M. M. Rams, V. Stojevic, N. Schuch,
and F. Verstraete (2015), New J. Phys. 17, 053002,
arXiv:1408.5140.
Zauner, V., D. Draxler, L. Vanderstraeten, J. Haegeman,
and F. Verstraete (2016), New Journal of Physics 18 (11),
113033.
Zauner-Stauber, V., L. Vanderstraeten, J. Haegeman, I. Mc-
Culloch,
and F. Verstraete (2018), Physical Review B
97 (23), 235155.
Zeng, B., X. Chen, D.-L. Zhou, and X.-G. Wen (2019), Quan-
tum Information Meets Quantum Matter: From Quantum
Entanglement to Topological Phases of Many-Body Systems
(Springer).
Zhang, J., Z. Lu, L. Shan, and Z. Deng (2002), scheduled for
Phys. Rev. A, Nov. 2002 quant-ph/0205180.
Zhang, Z., A. Ahmadain, and I. Klich (2017), Proceedings of
the National Academy of Sciences 114 (20), 5142.
Zhao, H.-H., Z.-Y. Xie, Q. N. Chen, Z.-C. Wei, J. W. Cai,
and T. Xiang (2010), Physical Review B 81 (17), 174411.
Zhou, Z., J. Wildeboer, and A. Seidel (2014), Phys. Rev. B
89, 035123, arXiv:1310.8000.
Zou, Y., M. Ganahl,
and G. Vidal (2019), arXiv preprint
arXiv:1906.04218.
Zou, Y., A. Milsted,
and G. Vidal (2018), Physical review
letters 121 (23), 230402.
Zwolak, M.,
and G. Vidal (2004), Phys. Rev. Lett. 93,
207205, cond-mat/0406440.
