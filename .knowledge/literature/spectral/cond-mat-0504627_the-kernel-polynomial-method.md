---
source: "https://arxiv.org/abs/cond-mat/0504627"
type: "arxiv"
canonical_id: "cond-mat/0504627"
title: "The kernel polynomial method"
authors: "A. Weisse, G. Wellein, Andreas Alvermann, H. Fehske"
year: "2005"
venue: "Reviews of Modern Physics"
arxiv_id: "cond-mat/0504627"
doi: "10.1103/RevModPhys.78.275"
full_text: yes
---

# The kernel polynomial method

**Authors:** A. Weisse, G. Wellein, Andreas Alvermann, H. Fehske

**Citation:** Reviews of Modern Physics, vol. 78, pp. 275-306, 2005

**arXiv:** [cond-mat/0504627](https://arxiv.org/abs/cond-mat/0504627)

**DOI:** [10.1103/RevModPhys.78.275](https://doi.org/10.1103/RevModPhys.78.275)

## Abstract

Efficient and stable algorithms for the calculation of spectral quantities and correlation functions are some of the key tools in computational condensed matter physics. In this article we review basic properties and recent developments of Chebyshev expansion based algorithms and the Kernel Polynomial Method. Characterized by a resource consumption that scales linearly with the problem dimension these methods enjoyed growing popularity over the last decade and found broad application not only in physics. Representative examples from the fields of disordered systems, strongly correlated electrons, electron-phonon interaction, and quantum spin systems we discuss in detail. In addition, we illustrate how the Kernel Polynomial Method is successfully embedded into other numerical techniques, such as Cluster Perturbation Theory or Monte Carlo simulation.

## Full Text

The Kernel Polynomial Method
                                                                Alexander Weiße
                                                                School of Physics, The University of New South Wales, Sydney, NSW 2052, Australia∗

                                                                Gerhard Wellein
                                                                Regionales Rechenzentrum Erlangen, Universität Erlangen, 91058 Erlangen, Germany
arXiv:cond-mat/0504627v2 [cond-mat.other] 3 Apr 2006




                                                                Andreas Alvermann and Holger Fehske
                                                                Institut für Physik, Ernst-Moritz-Arndt-Universität Greifswald, 17487 Greifswald, Germany

                                                                (Dated: April 3, 2006)

                                                                Efficient and stable algorithms for the calculation of spectral quantities and correlation functions
                                                                are some of the key tools in computational condensed matter physics. In this article we review ba-
                                                                sic properties and recent developments of Chebyshev expansion based algorithms and the Kernel
                                                                Polynomial Method. Characterized by a resource consumption that scales linearly with the prob-
                                                                lem dimension these methods enjoyed growing popularity over the last decade and found broad
                                                                application not only in physics. Representative examples from the fields of disordered systems,
                                                                strongly correlated electrons, electron-phonon interaction, and quantum spin systems we discuss
                                                                in detail. In addition, we illustrate how the Kernel Polynomial Method is successfully embedded
                                                                into other numerical techniques, such as Cluster Perturbation Theory or Monte Carlo simulation.



                                                                      PACS numbers: 02.70.Hm, 02.30.Mv, 71.15.-m


                                                       Contents                                                                        2. One-particle spectral function                 17
                                                                                                                                       3. Optical conductivity                           19
                                                         I. Introduction                                                 1             4. Spin structure factor                          20
                                                                                                                                    D. Dynamical correlations at finite temperature      20
                                                        II. Chebyshev expansion and the Kernel Polynomial                              1. General considerations                         20
                                                            Method (KPM)                                                 3             2. Optical conductivity of the Anderson model     21
                                                            A. Basic features of Chebyshev expansion                     3             3. Optical conductivity of the Holstein model     22
                                                               1. Chebyshev polynomials                                  3
                                                               2. Modified moments                                       4     IV. KPM as a component of other methods                   23
                                                            B. Calculation of moments                                    4         A. Monte Carlo simulations                            23
                                                               1. General considerations                                 4         B. Cluster Perturbation Theory (CPT)                  24
                                                               2. Stochastic evaluation of traces                        5            1. General features of CPT                         24
                                                            C. Kernel polynomials and Gibbs oscillations                 6            2. CPT for the Hubbard model                       25
                                                               1. Expansions of finite order & simple kernels            6            3. CPT for the Holstein model                      26
                                                               2. Fejér kernel                                          7
                                                               3. Jackson kernel                                         8      V. KPM versus other numerical approaches                 26
                                                               4. Lorentz kernel                                         9         A. KPM and dedicated many-particle techniques         27
                                                            D. Implementational details and remarks                      10        B. Close relatives of KPM                             27
                                                               1. Discrete cosine & Fourier transforms                   10           1. Chebyshev expansion and Maximum Entropy
                                                               2. Integrals involving expanded functions                 11              Methods                                         27
                                                            E. Generalization to higher dimension                        11           2. Lanczos recursion                               28
                                                               1. Expansion of multivariate functions                    11           3. Projection methods                              28
                                                               2. Kernels for multidimensional expansions                11
                                                               3. Reconstruction with cosine transforms                  12    VI. Conclusions & Outlook                                 30

                                                       III. Applications of KPM                                          12         Acknowledgements                                     30
                                                            A. Densities of states                                       12
                                                               1. General considerations                                 12         References                                           30
                                                               2. Non-interacting systems: Anderson model of
                                                                  disorder                                               13
                                                               3. Interacting systems: Double exchange                   14    I. INTRODUCTION
                                                            B. Static correlations at finite temperature                 15
                                                            C. Dynamical correlations at zero temperature                16
                                                               1. General considerations                                 16       In most areas of physics the fundamental interactions
                                                                                                                               and the equations of motion that govern the behavior of
                                                                                                                               real systems on a microscopic scale are very well known,
                                                                                                                               but when it comes to solving these equations they turn
                                                       ∗ New address: Institut für Physik, Ernst-Moritz-Arndt-Universität    out to be exceedingly complicated. This holds, in par-
                                                       Greifswald, 17487 Greifswald, Germany                                   ticular, if a large and realistic number of particles is in-
                                                                                                                         2

volved. Inventing and developing suitable approxima-           to the boundaries of the spectrum at the expense of poor
tions and analytical tools has therefore always been a         precision for intermediate energies. The observation of
cornerstone of theoretical physics. Recently, however,         this deficiency advanced the development of modified
research continued to focus on systems and materials,          moment approaches (Gautschi, 1970; Sack and Donovan,
whose properties depend on the interplay of many dif-          1972), where E l is replaced by (preferably orthogonal)
ferent degrees of freedom or on interactions that com-         polynomials of E. With studies of the spectral den-
pete on similar energy scales. Analytical and approxi-         sity of harmonic solids (Blumstein and Wheeler, 1973;
mate methods quite often fail to describe the properties       Wheeler and Blumstein, 1972; Wheeler et al., 1974) and
of such systems, so that the use of numerical methods re-      of autocorrelation functions (Wheeler, 1974), which made
mains the only way to proceed. On the other hand, the          use of Chebyshev polynomials of second kind, these ideas
available computer power increased tremendously over           soon found their way into physics application. Later,
the last decades, making direct simulations of the micro-      similar Chebyshev expansion methods became popular
scopic equations for reasonable system sizes or particle       also in quantum chemistry, where the focus was on
numbers more and more feasible. The success of such            the time evolution of quantum states (Chen and Guo,
simulations, though, depends on the development and            1999; Kosloff, 1988; Mandelshtam and Taylor, 1997;
improvement of efficient algorithms. Corresponding re-         Tal-Ezer and Kosloff, 1984) and on Filter Diagonaliza-
search therefore plays an increasingly important role.         tion (Neuhauser, 1990). The modified moment ap-
   On a microscopic level the behavior of most physical        proach noticeably improved when kernel polynomials
systems, like their thermodynamics or response to exter-       were introduced to damp the Gibbs oscillations, which
nal probes, depends on the distribution of the eigenvalues     for truncated polynomial series occur near disconti-
and the properties of the eigenfunctions of a Hamilton op-     nuities of the expanded function (Silver and Röder,
erator or dynamical matrix. In numerical approaches the        1994; Silver et al., 1996; Wang, 1994; Wang and Zunger,
latter correspond to Hermitian matrices of finite dimen-       1994). At this time also the name Kernel Polyno-
sion D, which can become huge already for a moderate           mial Method was coined, and applications then in-
number of particles, lattice sites or grid points. The cal-    cluded high-resolution spectral densities, static thermo-
culation of all eigenvalues and eigenvectors then easily       dynamic quantities as well as zero-temperature dynam-
turns into an intractable task, since for a D-dimensional      ical correlations (Silver and Röder, 1994; Wang, 1994;
matrix in general it requires memory of the order of D2 ,      Wang and Zunger, 1994). Only recently this range was
and the number of operations and the computation time          extended to cover also dynamical correlation functions at
scale as D3 . Of course, this large resource consumption       finite-temperature (Weiße, 2004), and below we present
severely restricts the size of the systems that can be stud-   some new applications to complex-valued quantities, e.g.
ied by such a “naive” approach. For dense matrices the         Green functions. Being such a general tool for studying
limit is currently of the order of D ≈ 105 , and for sparse    large matrix problems, KPM can also be used as a core
matrices the situation is only slightly better.                component of more involved numerical techniques. As re-
   Fortunately, alternatives are at hand: In the present       cent examples we discuss Monte Carlo (MC) simulations
article we review basic properties and recent develop-         and Cluster Perturbation Theory (CPT).
ments of numerical Chebyshev expansion and of the Ker-            In parallel to Chebyshev expansion techniques and
nel Polynomial Method (KPM). As the most time con-             to KPM also the Lanczos Recursion Method was
suming step these iterative approaches require only mul-       developed (Aichhorn et al., 2003; Benoit et al., 1992;
tiplications of the considered matrix with a small set of      Haydock et al., 1972, 1975; Jaklič and Prelovšek, 1994;
vectors, and therefore allow for the calculation of spec-      Lambin and Gaspard, 1982), which is based on a recur-
tral properties and dynamical correlation functions with       sive Lanczos tridiagonalization (Lanczos, 1950) of the
a resource consumption that scales linearly with D for         considered matrix and the expression of the spectral den-
sparse matrices, or like D2 otherwise. If the matrix is        sity or of correlation functions in terms of continued frac-
not stored but constructed on-the-fly dimensions of the        tions. The approach, in general, is applicable to the same
order of D ≈ 109 or more are accessible.                       problems as KPM and found wide application in solid
   The first step to achieve this favorable behavior is        state physics (Dagotto, 1994; Jaklič and Prelovšek, 2000;
setting aside the requirement for a complete and exact         Ordejón, 1998; Pantelides, 1978). It suffers, however,
knowledge of the spectrum. A natural approach, which           from the shortcomings of the Lanczos algorithm, namely
has been considered from the early days of quantum me-         loss of orthogonality and spurious degeneracies if ex-
chanics, is the characterization of theR spectral density      tremal eigenstates start to converge. We will compare the
ρ(E) in terms of its moments µl = ρ(E)E l dE. By               two methods in Sec. V and explain, why we prefer to use
iteration these moments can usually be calculated very         Lanczos for the calculation of extremal eigenstates and
efficiently, but practical implementations in the context      KPM for the calculation of spectral properties and corre-
of Gaussian quadrature showed that the reconstruction          lation functions. In addition, we will comment on more
of ρ(E) from ordinary power moments is plagued by sub-         specialized iterative schemes, such as projection meth-
stantial numerical instabilities (Gautschi, 1968). These       ods (Goedecker, 1999; Goedecker and Colombo, 1994;
occur mainly because the powers E l put too much weight        Iitaka and Ebisuzaki, 2003) and Maximum Entropy ap-
                                                                                                                               3

proaches (Bandyopadhyay et al., 2005; Silver and Röder,           and second kind turn out to be the best choice for most
1997; Skilling, 1988). Drawing more attention to KPM               applications, mainly due to the good convergence prop-
as a potent alternative to all these techniques is one of          erties of the corresponding series and to the close relation
the purposes of the present work.                                  to Fourier transform (Cheney, 1966; Lorentz, 1966). The
   The outline of the article is as follows: In Sec. II we         latter is also an important prerequisite for the derivation
give a detailed introduction to Chebyshev expansion and            of optimal kernels (see Sec. II.C), which are required for
the Kernel Polynomial Method, its mathematical back-               the regularization of finite-order expansions, and which
ground, convergence properties and practical aspects of            so far have not been derived for other sets of orthogonal
its implementation. In Sec. III we apply KPM to a va-              polynomials.
riety of problems from solid state physics. Thereby, we               Both sets of Chebyshev polynomials are defined on the
focus mainly on illustrating the types of quantities that          interval
                                                                      √      [a, b] = [−1, 1], where the weight function w(x) =
can be calculated with KPM, rather than on the physics             (π 1 − x2 )−1 yields the polynomials √     of first kind, Tn ,
of the considered models. In Sec. IV we show how KPM               and the weight function w(x) = π 1 − x2 those of second
can be embedded into other numerical approaches that               kind, Un . Based on the scalar products
require knowledge of spectral properties or correlation
functions, namely Monte Carlo simulation and Cluster                                      Z1
                                                                                               f (x) g(x)
Perturbation Theory. In Sec. V we shortly discuss al-                         hf |gi1 =         √         dx ,               (4)
ternatives to KPM and compare their performance and                                            π 1 − x2
                                                                                          −1
precision, before summarizing in Sec. VI.
                                                                                       Z1 p
                                                                              hf |gi2 = π 1 − x2 f (x) g(x) dx ,             (5)
II. CHEBYSHEV EXPANSION AND THE KERNEL                                                    −1
POLYNOMIAL METHOD (KPM)
                                                                   the orthogonality relations thus read
A. Basic features of Chebyshev expansion
                                                                                                 1+δn,0
                                                                                    hTn |Tm i1 =    2   δn,m ,               (6)
1. Chebyshev polynomials                                                                         π2
                                                                                    hUn |Um i2 = 2 δn,m .                    (7)
  Let us first recall the basic properties of expansions in        By substituting x = cos(ϕ) one can easily verify that they
orthogonal polynomials and of Chebyshev expansion in               correspond to the orthogonality relations of trigonomet-
particular. Given a positive weight function w(x) defined          ric functions, and that in terms of those the Chebyshev
on the interval [a, b] we can introduce a scalar product           polynomials can be expressed in explicit form,
                           Zb
                                                                                Tn (x) = cos(n arccos(x)) ,                  (8)
                hf |gi =        w(x)f (x)g(x) dx             (1)
                                                                                         sin((n + 1) arccos(x))
                           a                                                    Un (x) =                        .            (9)
                                                                                             sin(arccos(x))
between two integrable functions f, g : [a, b] → R. With
respect to each such scalar product there exists a com-            These expressions can then be used to prove the recursion
plete set of polynomials pn (x), which fulfil the orthogo-         relations,
nality relations
                                                                               T0 (x) = 1 , T−1 (x) = T1 (x) = x ,
                                                                                                                            (10)
                      hpn |pm i = δn,m /hn ,                 (2)               Tm+1 (x) = 2 x Tm (x) − Tm−1 (x) ,
where hn = 1/hpn |pn i denotes the inverse of the squared          and
norm of pn (x). These orthogonality relations allow for an
easy expansion of a given function f (x) in terms of the                          U0 (x) = 1 , U−1 (x) = 0 ,
                                                                                                                            (11)
pn (x), since the expansion coefficients are proportional                      Um+1 (x) = 2 x Um (x) − Um−1 (x) ,
to the scalar products of f and pn ,
                                                                   which illustrate that Eqs. (8) and (9) indeed describe
              ∞
              X                                                    polynomials, and which, moreover, are an integral part
    f (x) =         αn pn (x)    with   αn = hpn |f i hn .   (3)
                                                                   of the iterative numerical scheme we develop later on.
              n=0
                                                                   Two other useful relations are
   In general, all types of orthogonal polynomials can
be used for such an expansion and for the Ker-                               2 Tm (x)Tn (x) = Tm+n (x) + Tm−n (x) ,         (12)
nel Polynomial approach we discuss in this article                       2
                                                                     2 (x − 1) Um−1 (x)Un−1 (x) = Tm+n (x) − Tm−n (x) .
(see e.g. Silver and Röder (1994)). However, as we                                                                 (13)
frequently observe whenever we work with polyno-
mial expansions (Boyd, 1989), Chebyshev polynomi-                  When calculating Green functions we also need Hilbert
als (Abramowitz and Stegun, 1970; Rivlin, 1990) of first           transforms of the polynomials (Abramowitz and Stegun,
                                                                                                                                     4

1970),                                                                      with moments
                     Z1
                              Tn (y) dy                                                                 Z1
                 P                p       = π Un−1 (x) ,             (14)
                          (y − x) 1 − y 2                                           µn = hf |φn i2 =         f (x)Tn (x) dx .     (23)
                     −1
                                                                                                        −1
             Z1 p
                 1 − y 2 Un−1 (y) dy
           P                         = −π Tn (x) ,                   (15)      The µn now have the form of modified moments that
                     (y − x)                                                we announced in the introduction, and Eqs. (18) and (19)
            −1
                                                                            represent the elementary basis for the numerical method
where P denotes the principal value. Chebyshev poly-                        which we review in this article. In the remaining sections
nomials have many more interesting properties, for a de-                    we will explain how to translate physical quantities into
tailed discussion we refer the reader to text books such                    polynomial expansions of the form of Eq. (18), how to
as (Rivlin, 1990).                                                          calculate the moments µn in practice, and, most impor-
                                                                            tantly, how to regularize expansions of finite order.
                                                                               Naturally, the moments µn depend on the considered
2. Modified moments
                                                                            quantity f (x) and on the underlying model. We will
                                                                            specify these details when discussing particular applica-
  As sketched above, the standard way of expanding a
                                                                            tions in Sec. III. Nevertheless, there are features which
function f : [−1, 1] → R in terms of Chebyshev polyno-
                                                                            are similar to all types of applications, and we start with
mials of first kind is given by
                                                                            presenting these general aspects in what follows.
           ∞                                         ∞
           X hf |Tn i1                               X
 f (x) =                         Tn (x) = α0 + 2           αn Tn (x) (16)
           n=0
                 hTn |Tn i1                          n=1                    B. Calculation of moments
with coefficients
                                        Z1                                  1. General considerations
                                             f (x)Tn (x)
             αn = hf |Tn i1 =                  √         dx .        (17)
                                             π 1 − x2                          A common feature of basically all Chebyshev expan-
                                        −1                                  sions is the requirement for a rescaling of the underlying
However, the calculation of these coefficients requires in-                 matrix or Hamiltonian H. As we described above, the
tegrations over the weight function w(x), which in prac-                    Chebyshev polynomials of both first and second kind are
tical applications to matrix problems prohibits a simple                    defined on the real interval [−1, 1], whereas the quanti-
iterative scheme. The solution to this problem follows                      ties we are interested in usually depend on the eigenval-
from a slight rearrangement of the expansion, namely                        ues {Ek } of the considered (finite-dimensional) matrix.
                        "         ∞
                                               #                            To fit this spectrum into the interval [−1, 1] we apply a
                   1             X                                          simple linear transformation to the Hamiltonian and all
       f (x) = √          µ0 + 2     µn Tn (x)        (18)
               π 1 − x2                                                     energy scales,
                                 n=1

with coefficients                                                                                 H̃ = (H − b)/a ,                (24)
                                 Z1                                                               Ẽ = (E − b)/a ,                (25)
                          µn =        f (x)Tn (x) dx .               (19)
                                 −1                                         and denote all rescaled quantities with a tilde hereafter.
                                                                            Given the extremal eigenvalues of the Hamiltonian, Emin
More formally this rearrangement of the Chebyshev series                    and Emax , which can be calculated, e.g. with the Lanczos
corresponds to using the second scalar product h.|.i2 and                   algorithm (Lanczos, 1950), or for which bounds may be
expanding in terms of the orthogonal functions                              known analytically, the scaling factors a and b read
                                         Tn (x)
                           φn (x) =      √       ,                   (20)                  a = (Emax − Emin )/(2 − ǫ) ,           (26)
                                        π 1 − x2
                                                                                           b = (Emax + Emin )/2 .                 (27)
which fulfil the orthogonality relations
                                         1+δn,0                             The parameter ǫ is a small cut-off introduced to avoid
                      hφn |φm i2 =         2      δn,m .             (21)
                                                                            stability problems that arise if the spectrum includes or
The expansion in Eq. (18) is thus equivalent to                             exceeds the boundaries of the interval [−1, 1]. It can be
                 ∞
                 X hf |φn i2                                                fixed, e.g. to ǫ = 0.01, or adapted to the resolution of
      f (x) =               φn (x)                                          the calculation, which for an expansion of finite order N
                 hφn |φn i2
                 n=0                                                        is proportional 1/N (see below).
                        "                     #
                 1               X∞                                            The next similarity of most Chebyshev expansions is
             = √          µ0 + 2     µn Tn (x)                       (22)   the form of the moments, namely their dependence on
              π 1 − x2           n=1                                        the matrix or Hamiltonian H̃. In general, we find two
                                                                                                                               5

types of moments: Simple expectation values of Cheby-         2. Stochastic evaluation of traces
shev polynomials in H̃,
                                                                 The second case where the moments depend on a trace
                   µn = hβ|Tn (H̃)|αi ,               (28)    over the whole Hilbert space, at first glance, looks far
                                                              more complicated. Based on the previous considerations
where |αi and |βi are certain states of the system, or        we would estimate the numerical effort to be proportional
traces over such polynomials and a given operator A,          to D2 , because the iteration needs to be repeated for all
                                                              D states of a given basis. It turns out, however, that
                   µn = Tr[A Tn (H̃)] .               (29)    extremely good approximations of the moments can be
                                                              obtained with a much simpler approach: the stochas-
  Handling the first case is rather straightforward. Start-   tic evaluation of the trace (Drabold and Sankey, 1993;
ing from the state |αi we can iteratively construct the       Silver and Röder, 1994; Skilling, 1988), i.e., an estimate
states |αn i = Tn (H̃)|αi by using the recursion relations    of µn based on the average over only a small number
for the Tn , Eq. (10),                                        R ≪ D of randomly chosen states |ri,

                 |α0 i = |αi ,                        (30)                                           R−1
                                                                                                   1 X
                 |α1 i = H̃|α0 i ,                    (31)         µn = Tr[A Tn (H̃)] ≈                  hr|A Tn (H̃)|ri .   (36)
                                                                                                   R r=0
               |αn+1 i = 2H̃|αn i − |αn−1 i .         (32)

Scalar products with |βi then directly yield                  The number of random states, R, does not scale with D.
                                                              It can be kept constant or even reduced with increasing
                      µn = hβ|αn i .                  (33)    D. To understand this, let us consider the convergence
                                                              properties of the above estimate. Given an arbitrary ba-
This iterative calculation of the moments, in particular      sis {|ii} and a set of independent identically distributed
the application of H̃ to the state |αn i, represents the      random variables ξri ∈ C, which in terms of the statisti-
most time consuming part of the whole expansion ap-           cal average . . . fulfil
proach and determines its performance. If H̃ is a sparse
matrix of dimension D the matrix vector multiplication
                                                                                            ξri = 0 ,                        (37)
is an order O(D) process and the calculation of N mo-
ments therefore requires O(N D) operations and time.                                   ξri ξr′ j = 0 ,                       (38)
The memory consumption depends on the implementa-                                       ∗
                                                                                       ξri ξr′ j     = δrr′ δij ,            (39)
tion. For moderate problem dimension we can store the
matrix and, in addition, need memory for two vectors
of dimension D. For very large D the matrix certainly         a random vector is defined through
does not fit into the memory and has to be reconstructed
on-the-fly in each iteration or retrieved from disc. The
                                                                                               D−1
two vectors then determine the memory consumption of                                           X
the calculation. Overall, the resource consumption of                                  |ri =             ξri |ii .           (40)
                                                                                                   i=0
the moment iteration is similar or even slightly better
than that of the Lanczos algorithm, which requires a few
more vector operations (see our comparison in Sec. V).        We can now calculate the statistical expectation value of
In contrast to Lanczos, Chebyshev iteration is completely                              PR−1
                                                              the trace estimate Θ = R1 r=0 hr|B|ri for some Hermi-
stable and can be carried out to arbitrary high order.        tian operator B with matrix elements Bij = hi|B|ji, and
   The moment iteration can be simplified even further,       indeed find,
if |βi = |αi. In this case the product relation (12) allows
for the calculation of two moments from each new |αn i,
                                                                                 R−1                        R−1 D−1
                                                                            1 X             1 X X ∗
                 µ2n = 2hαn |αn i − µ0 ,              (34)         Θ =            hr|B|ri =             ξ ξ Bij
                                                                            R r=0           R r=0 i,j=0 ri rj
               µ2n+1 = 2hαn+1 |αn i − µ1 ,            (35)
                                                                           D−1
                                                                           X
                                                                       =         Bii = Tr(B) .                               (41)
which is equivalent to two moments per matrix vector
                                                                           i=0
multiplication. The numerical effort for N moments is
thus reduced by a factor of two. In addition, like many
other numerical approaches KPM benefits considerably          Of course, this only shows that we obtain the correct
from the use of symmetries that reduce the Hilbert space      result on average. To assess the associated error we also
dimension.                                                    need to study the fluctuation of Θ, which is characterized
                                                                                                                                                      6

                                      2
by (δΘ)2 = Θ2 − Θ                         . Evaluating                                       |ξri |4 . Presumably, the most natural choice are Gaus-
                                                                                           sian distributed ξri , which lead to |ξri |4 = 2 and thus a
                 R−1
               1 X                                                                         basis-independent fluctuation (δΘ)2 . To summarize this
 Θ2 =                hr|B|rihr′ |B|r′ i                                                    section, we think that the actual choice of the distribu-
               R2 ′
                    r,r =0
                                                                                           tion of ξri is not of high practical significance, as long as
                    R−1       D−1                                                          Eqs. (37)–(39) are fulfilled for ξri ∈ C, or
           1        X         X
                                               ∗
       =                                      ξri ξrj ξr∗′ i′ ξr′ j ′ Bij Bi′ j ′
           R2                                                                                                             ξri = 0 ,                (44)
                 r,r ′ =0 i,j,i′ ,j ′ =0

           1     R−1
                  X             D−1
                                X                                                                                  ξri ξr′ j = δrr′ δij ,          (45)
       =                                      δij δi′ j ′ Bij Bi′ j ′
           R2                                                                              hold for ξri ∈ R. Typically, within this article we
                    r,r ′ =0 i,j,i′ ,j ′ =0
                     r6=r ′                                                                will consider Gaussian (Silver and Röder, 1994; Skilling,
               R−1
               X          D−1
                          X                                                               1988) or uniformly distributed variables ξri ∈ R.
                                       ∗       ∗
           +                          ξri ξrj ξri′ ξrj ′ Bij Bi′ j ′

                r    i,j,i′ ,j ′ =0
                                                D−1                                        C. Kernel polynomials and Gibbs oscillations
         R−1           1X
       =     (Tr B)2 +       |ξrj |4 Bjj
                                      2
          R            R j=0                                                               1. Expansions of finite order & simple kernels
               D−1                     D−1                 
               X                       X                                                      In the preceding sections we introduced the basic ideas
           +           Bii Bjj +                 Bij Bji                                   underlying the expansion of a function f (x) in an infinite
               i,j=0                  i,j=0
                i6=j                   i6=j                                                series of Chebyshev polynomials, and gave a few hints for
                                                          D−1                              the numerical calculation of the expansion coefficients µn .
                             1                           X       
                                                                                           As expected for a numerical approach, however, the total
       = (Tr B)2 +              Tr(B 2 ) + ( |ξri |4 − 2)      2
                                                              Bjj
                             R                            j=0
                                                                                           number of these moments will remain finite, and we thus
                                                                                    (42)   arrive at a classical problem of approximation theory.
we get for the fluctuation                                                                 Namely, we are looking for the best (uniform) approxi-
                                                                                           mation to f (x) by a polynomial of given maximal degree,
                1
                                             D−1
                                             X                                            which in our case is equivalent to finding the best approx-
  (δΘ)2 =          Tr(B 2 ) + ( |ξri |4 − 2)      2
                                                 Bjj   .                            (43)   imation to f (x) given a finite number N of moments
                R                            j=0                                           µn . To our advantage, such problems have been stud-
                                                                                           ied for at least 150 years and we can make use of results
The trace of B 2 will usually be of order O(D), and the                                    by many renowned mathematicians, such as Chebyshev,
relative
       √ error of the trace estimate, δΘ/Θ, is thus of order                               Weierstrass, Dirichlet, Fejér, Jackson, to name only a
O(1/ RD). It is this favorable behavior, which ensures                                     few. We will also introduce the concept of kernels, which
the convergence of the stochastic approach, and which                                      facilitates the study of the convergence properties of the
was the basis for our initial statement that the number                                    mapping f (x) → fKPM (x) from the considered function
of random states R ≪ D can be kept small or even be                                        f (x) to our approximation fKPM (x).
reduced with the problem dimension D.                                                         Experience shows that a simple truncation of an infi-
   Note also that the distribution of the elements of                                      nite series,
|ri, p(ξri ), has a slight influence on the precision of
                                                                                                                            N −1
the estimate, since it determines the expectation value                                                       1     h       X             i
  |ξri |4 that enters Eq. (43). For an optimal distribution                                      f (x) ≈    √        µ0 + 2      µn Tn (x) ,       (46)
                                                                                                           π 1 − x2         n=1
  |ξri |4 should be as close as possible to its lower bound
          2
  |ξri |2 = 1, and indeed, we find this result if we fix the                               leads to poor precision and fluctuations — also known
amplitude of the ξri and allow only for a random phase                                     as Gibbs oscillations — near points where the function
φ ∈ [0, 2π], ξri = eiφ . Moreover, if we were working in the                               f (x) is not continuously differentiable. The situation is
eigenbasis of B this would cause δΘ to vanish entirely,                                    even worse for discontinuities or singularities of f (x), as
which led Iitaka and Ebisuzaki (2004) to conclude that                                     we illustrate below in Figure 1. A common procedure to
random phase vectors are the optimal choice for stochas-                                   damp these oscillations relies on an appropriate modifi-
tic trace estimates. However, all these considerations de-                                 cation of the expansion coefficients, µn → gn µn , which
pend on the basis that we are working in, which in prac-                                   depends on the order of the approximation N ,
tice will never be the eigenbasis of B (in particular, if B                                                N −1
corresponds to something like A Tn (H̃), as in Eq. (36)).
                                                                                                           X            hf |φn i2
                                                                                             fKPM (x) =           gn              φn (x)
A random phase vector in one basis does not necessar-                                                      n=0
                                                                                                                       hφn |φn i2
ily correspond to a random phase vector in another ba-                                                                                             (47)
                                                                                                                 h          N −1             i
sis, but the other basis may well lead to smaller value                                                    1                X
    PD−1 2                                                                                             = √        g0 µ0 + 2      gn µn Tn (x) .
of j=0 Bjj     , thus compensating for the larger value of                                              π 1 − x2            n=1
                                                                                                                                                 7

In more abstract terms this truncation of the infinite se-               Owing to the denominator in the expansion (46) con-
ries to order N together with the corresponding modifi-                  vergence is not uniform in the vicinity of the endpoints
cation of the coefficients is equivalent to the convolution              x = ±1, which we accounted for by the choice of a small
of f (x) with a kernel of the form                                       ǫ in the rescaling of the Hamiltonian H → H̃.
                                                                            The more favorable uniform convergence is obtained
                                        N −1
                                        X                                under very general conditions. Specifically, it suffices to
  KN (x, y) = g0 φ0 (x)φ0 (y) + 2               gn φn (x)φn (y) , (48)   demand that:
                                         n=1
                                                                            1. The kernel is positive: KN (x, y) > 0 ∀x, y ∈ [−1, 1].
namely
                                                                                                           R1
                                                                            2. The kernel is normalized, −1 K(x, y) dx = φ0 (y),
                         Z1 p
                                                                               which is equivalent to g0 = 1.
       fKPM (x) =          π 1 − y 2 KN (x, y) f (y) dy
                                                                  (49)      3. The second coefficient g1 approaches 1 as N → ∞.
                         −1
                       = hKN (x, y)|f (y)i2 .                            Then, as a corollary to Korovkin’s theorem (Korovkin,
                                                                         1959), an approximation based on KN (x, y) converges
The problem now translates into finding an optimal ker-                  uniformly in the sense explicated for the Fejér kernel.
nel KN (x, y), i.e., coefficients gn , where the notion of               The coefficients gn , n ≥ 2 are restricted only through
“optimal” partially depends on the considered applica-                   the positivity of the kernel, the latter one being equiv-
tion.                                                                    alent to monotonicity of the mapping f → fKPM , i.e.
   The simplest kernel, which is usually attributed to                   f ≥ f ′ ⇒ fKPM ≥ fKPM   ′
                                                                                                      . Note also that the condi-
Dirichlet, is obtained by setting gnD = 1 and evaluating                 tions 1 and 2 are very useful for practical applications:
the sum with the help of the Christoffel-Darboux iden-                   The first ensures that approximations of positive quan-
tity (Abramowitz and Stegun, 1970),                                      tities become positive, the second conserves the integral
                                        N −1                             of the expanded function,
                                        X
     D
    KN (x, y) = φ0 (x)φ0 (y) + 2               φn (x)φn (y)
                                                                                           Z1                       Z1
                                        n=1                       (50)
                                                                                                fKPM (x) dx =             f (x) dx .        (54)
                       φN (x)φN −1 (y) − φN −1 (x)φN (y)
                   =                                     .                              −1                         −1
                                     x−y
                           D                                             Applying the kernel, for example, to a density of states
Obviously, convolution of KN with an integrable function
                                                                         thus yields an approximation which is strictly positive
f yields the above truncated series, Eq. (46), which for
                                                                         and normalized.
N → ∞ converges to f within the integralp norm defined                     For a proof of the above theorem we refer the reader
by the scalar product Eq. (5), ||f ||2 = hf |f i2 , i.e. we
                                                                         to the literature (Cheney, 1966; Lorentz, 1966). Let us
have
                                                                         here only check that the Fejér kernel indeed fulfils the
                                        N →∞
                        ||f − fKPM ||2 −−−−→ 0 .                  (51)   conditions 1 to 3: The last two are obvious by inspection
                                                                         of Eq. (52). To prove the positivity we start from the
This is, of course, not particularly restrictive and leads               positive 2π-periodic function
to the disadvantages we mentioned earlier.                                                                                       2
                                                                                                            N
                                                                                                            X −1
                                                                                                                          i νϕ
                                                                                                p(ϕ) =             aν e                     (55)
2. Fejér kernel                                                                                            ν=0

                                                                         with arbitrary aν ∈ R. Straight-forward calculation then
  A first improvement is due to Fejér (1904) who showed
                                                                         shows
that for continuous functions an approximation based on
the kernel                                                                           N
                                                                                     X −1                           N
                                                                                                                    X −1

                         N
                                                                           p(ϕ) =            aν aµ ei(ν−µ)ϕ =                aν aµ cos(ν − µ)ϕ
  F                1 X D                                   n                         ν,µ=0                          ν,µ=0
 KN (x, y) =            K (x, y) ,        i.e.,    gnF = 1− ,     (52)
                   N ν=1 ν                                    N                      N
                                                                                     X −1             N
                                                                                                      X −1 N −1−n
                                                                                                             X
                                                                                 =          a2ν + 2                  aν aν+n cos nϕ .
converges uniformly in any restricted interval [−1 + ǫ, 1 −                          ν=0              n=1    ν=0
ǫ]. This means that now the absolute difference between                                                                                     (56)
the function f and the approximation fKPM goes to zero,
                                                                         Hence, with
                                                              N →∞                                      N −1−n
||f − fKPM||ǫ∞ =              max     |f (x) − fKPM (x)| −−−−→ 0 .                                        X
                         −1+ǫ<x<1−ǫ                                                              gn =              aν aν+n                  (57)
                                                                  (53)                                      ν=0
                                                                                                                                 8

the function                                                    and aν , respectively, note that
                                  N −1
                                  X                               (x − y)2 = (T1 (x) − T1 (y))2
                p(ϕ) = g0 + 2            gn cos nϕ      (58)
                                   n=1                                   = 12 (T2 (x) + T0 (x))T0 (y) − 2T1 (x)T1 (y)
                                                                                           + 21 T0 (x)(T2 (y) + T0 (y)) .      (62)
is positive and periodic in ϕ. However, if p(ϕ) is positive,
then the expression 12 [p(arccos x+arccos y)+p(arccos x−        Using the orthogonality of the Chebyshev polynomials
arccos y)] is positive ∀ x, y ∈ [−1, 1]. Using Eq. (8) and      and inserting Eqs. (48) and (62) into (61), we can thus
cos α cos β = 21 [cos(α + β) + cos(α − β)], we immediately      rephrase the condition of optimal resolution as
observe that the general kernel KN (x, y) from Eq. (48) is
positive ∀ x, y ∈ [−1, 1], if the coefficients gn depend on                                !
                                                                            Q = g0 − g1 = minimal w.r.t. aν .                  (63)
arbitrary
   √       coefficients aν ∈ R via Eq. (57). Setting aν =
                                  F
1/ N yields the Fejér kernel KN    (x, y), thus immediately    Hence, compared to the previous section, where we
proving its positivity.                                         merely required g0 = 1 and g1 → 1 for N → ∞, our
   In terms of its analytical properties and of the conver-     new condition tries to optimize the rate at which g1 ap-
gence in the limit N → ∞ the Fejér kernel is a major im-       proaches unity.
provement over the Dirichlet kernel. However, as yet we           Minimizing Q = g0 − g1 under the constraint C =
did not quantify the actual error of an order-N approxi-        g0 − 1 = 0 yields the condition
mation: For continuous functions an appropriate scale is
given by the modulus of continuity,                                                     ∂Q     ∂C
                                                                                            =λ     ,                           (64)
                                                                                        ∂aν    ∂aν
               wf (∆) = max |f (x) − f (y)| ,           (59)
                            |x−y|≤∆
                                                                where λ is a Lagrange multiplier. Using Eq. (57) and
                                                                setting a−1 = aN = 0 we arrive at
in terms of which the Fejér approximation fulfils
                                       √                                           2aν − aν−1 − aν+1 = λaν                     (65)
                ||f − fKPM ||∞ ∼ wf (1/ N ) .           (60)
                                                                which the alert reader recognizes as the eigenvalue prob-
For sufficiently smooth
                     √ functions this is equivalent to an       lem of a harmonic chain with fixed boundary conditions.
error of order O(1/ N ). The latter is also an estimate for     Its solution is given by
the resolution or broadening that we will observe when
expanding less regular functions containing discontinu-                                       πk(ν + 1)
ities or singularities, like the examples in Figure 1.                              aν = ā sin          ,
                                                                                                N +1
                                                                                                                               (66)
                                                                                                  πk
                                                                                     λ = 1 − cos       ,
                                                                                                 N +1
3. Jackson kernel
                                                                where ν = 0, . . . , (N − 1) and k = 1, 2, . . . , N . Given
   With the coefficients gnF of the Fejér kernel we have not   aν and the abbreviation q = πk/(N + 1) we can easily
fully exhausted the freedom offered by the coefficients aν      calculate the gn :
and Eq. (57). We can hope to further improve the kernel
                                                                         NX
                                                                          −1−n                    N −n
by optimizing the aν in some sense, which will lead us to                                         X
recover old results by Jackson (1911, 1912).                      gn =           aν aν+n = ā2           sin qν sin q(ν + n)
                                                                          ν=0                     ν=1
   In particular, let us tighten the third of the previously
                                                                            N −n
defined conditions for uniform convergence by demanding                ā2 X
                                                                     =        [cos qn − cos q(2ν + n)]
that the kernel has optimal resolution in the sense that                2 ν=1
                                                                                                                               (67)
                                                                           "                    N −n
                                                                                                                #
                    Z1 Z1                                              ā2                       X
                                                                     =      (N − n) cos qn − Re      ei q(2ν+n)
            Q :=            (x − y)2 KN (x, y) dx dy    (61)            2                        ν=1
                    −1 −1
                                                                         ā2
                                                                     =       [(N − n + 1) cos qn + sin qn cot q] .
is minimal. Since KN (x, y) will be peaked at x = y, Q is                 2
basically the squared width of this peak. For sufficiently        The normalization g0 = 1 is ensured through ā2 =
smooth functions this more stringent condition will min-        2/(N + 1), and with g1 = cos q we can directly read off
imize the error ||f − fKPM ||∞ , and in all other cases lead    the optimal value for
to optimal resolution and smallest broadening of “sharp”
features.                                                                                                    πk
   To express the variance Q of the kernel in terms of gn                       Q = g0 − g1 = 1 − cos            ,             (68)
                                                                                                            N +1
                                                                                                                                                                 9

                                                                                    20
which is obtained for k = 1,
                                                                                                  Dirichlet kernel
                                                                                                  Jackson kernel                                     1
                                    π         1  π 2                              15            Gaussian (σ=π/64)
               Qmin = 1 − cos          ≃                 .        (69)
                                  N +1   2        N                                               Lorentz kernel (λ=4)                               0.8
                                                                                                  Lorentzian (ε=λ/64)




                                                                                                                                                            step function
                                                                           δ function
                                                                                    10
The latter result shows that for large N the resolution
√                                                                                                                                                    0.6
   Q of the new kernel is proportional to 1/N . Clearly,
                                                 F                                                                                                   0.4
this is an improvement over√ the Fejér kernel KN (x, y)
                                                                                        5
                  √
which gives only Q = 1/ N .                                                                                                                          0.2
   With the above calculation we reproduced results                                     0
                                                                                                                                                     0
by Jackson (1911, 1912), who showed that with a sim-
ilar kernel a continuous function f can be approximated                                 -5                                                           -0.2
                                                                                             -1         -0.5             0   0      0.5          1
by a polynomial of degree N − 1 such that                                                                      x                     x

                     ||f − fKPM ||∞ ∼ wf (1/N ) ,                 (70)      FIG. 1 (Color in online edition) Order N = 64 expansions of
                                                                            δ(x) (left) and a step function (right) based on different ker-
which we may interpret as an error of the order of                          nels. Whereas the truncated series (Dirichlet kernel) strongly
O(1/N ). Hereafter we are thus referring to the new op-                     oscillate, the Jackson results smoothly converge to the ex-
                                    J                                       panded functions. The Lorentz kernel leads to relatively poor
timal kernel as the Jackson kernel KN (x, y), with
                                                                            convergence at the boundaries x = ±1, but otherwise yields
           (N − n + 1) cos Nπn         πn       π
                             +1 + sin N +1 cot N +1
                                                                            perfect Lorentz-broadened approximations.
   gnJ =                                                     .    (71)
                                N +1
  Before proceeding with other kernels let us add a few                     Using the Jackson kernel, an order N expansion of a δ-
more details
         √ on the resolution of the Jackson kernel: The                     function at x = 0 thus results in a broadened peak of
                                                                                       π
quantity Qmin obtained in Eq. (69) is mainly a measure                      width σ = N  , whereas close to the boundaries, a = ±1,
for the spread of the kernel KN   J
                                    (x, y) in the x-y-plane.                we find σ = Nπ3/2 . It turns out that this peak is a good
However, for practical calculations, which may also in-                     approximation to a Gaussian,
volve singular functions, it is often reasonable to ask for
the broadening of a δ-function under convolution with                                                    J           1          x2 
                                                                                                        δKPM (x) ≈ √      exp − 2 ,                   (76)
the kernel,                                                                                                         2πσ 2      2σ

  δKPM (x − a) = hKN (x, y)|δ(y − a)i2                                      which we illustrate in Figure 1.
                                       N
                                       X −1
               = g0 φ0 (x)T0 (a) + 2          gn φn (x)Tn (a) .   (72)      4. Lorentz kernel
                                       n=1

                                                                       2       The Jackson kernel derived in the preceding sections
It can be characterized by the variance σ 2 = x2 − x ,                      is the best choice for most of the applications we discuss
where we use x = T1 (x) and x2 = [T2 (x) + T0 (x)]/2 to                     below. In some situations, however, special analytical
find                                                                        properties of the expanded functions become important,
               Z1                                                           which only other kernels can account for. The Green
     x =            x δKPM (x − a) dx = g1 T1 (a) ,               (73)      functions that appear in the Cluster Perturbation The-
                                                                            ory, Sec. IV.B, are an example. Considering the imagi-
               −1                                                           nary part of the Plemelj-Dirac formula which frequently
               Z1                                                           occurs in connexion with Green functions,
     2                                       g0 T0 (a) + g2 T2 (a)
    x      =        x2 δKPM (x − a) dx =                           .
                                                       2                                                        1        1
               −1                                                                                         lim         =P     − i πδ(x) ,              (77)
                                                                                                          ǫ→0 x + i ǫ     x
                                                                  (74)
            J
                                                                            the δ-function on the right hand side is approached in
Hence, for KN (x, y) the squared width of δKPM (x − a) is                   terms of a Lorentz curve,
given by
                                                                                                            1          1             ǫ
  σ 2 = x2 − x
                           2
                         = a2 (g2J − (g1J )2 ) + (g0J − g2J )/2                              δ(x) = −         lim Im        = lim            ,        (78)
                                                                                                            π ǫ→0    x + i ǫ ǫ→0 π(x2 + ǫ2 )
                                              
          N − a2 (N − 1)                2π
        =                   1 − cos                                         which has a different and broader shape compared to
             2(N + 1)                 N +1
                                                                            the approximations of δ(x) we get with the Jackson
           π 2              2
                            3a − 2
                                     
                                                                            kernel. There are attempts to approximate Lorentzian
        ≃          1 − a2 +             .
           N                    N                                           like behavior in the framework of filter diagonaliza-
                                                              (75)          tion (Vijay et al., 2004), but these solutions do not lead
                                                                                                                                    10

to a positive kernel. Note that positivity of the kernel         do much better, however, remembering the definition of
is essential to guarantee basic properties of Green func-        the Chebyshev polynomials Tn , Eq. (8), and the close
tions, e.g. that poles are located in the lower (upper) half     relation between KPM and Fourier expansion: First, we
complex plane for a retarded (advanced) Green function.          may introduce the short-hand notation
Since we know that the Fourier transform of a Lorentz
peak is given by exp(−ǫ|k|), we can try to construct an                                     µ̃n = µn gn                           (81)
appropriate positive kernel assuming aν = e−λν/N in
Eq. (57), and indeed, after normalization, g0 = 1, this          for the kernel improved moments. Second and more im-
yields what we call the Lorentz kernel KN  L
                                             (x, y) hereafter,   portant, we make a special choice for our data points,


                         sinh[λ(1 − n/N )]                                    π(k + 1/2)
                 gnL =                     .             (79)      xk = cos                     with     k = 0, . . . , (Ñ − 1) , (82)
                              sinh(λ)                                             Ñ

The variable λ is a free parameter of the kernel which           which coincides with the abscissas of Chebyshev numer-
as a compromise between good resolution and sufficient           ical integration (Abramowitz and Stegun, 1970). The
damping of the Gibbs oscillations we empirically choose          number Ñ of points in the set {xk } is not necessarily
to be of the order of 3 . . . 5. It is related to the ǫ-         the same as the number of moments N . Usually we will
parameter of the Lorentz curve, i.e. to its resolution, via      consider Ñ ≥ N and a reasonable choice is, e.g. Ñ = 2N .
ǫ = λ/N . Note also, that in the limit λ → 0 we recover          All values f (xk ) can now be obtained through a discrete
                    F
the Fejér kernel KN  (x, y) with gnF = 1 − n/N , suggesting     cosine transform,
that both kernels share many of their properties.                                  q
   In Figure 1 we compare truncated Chebyshev ex-                          γk = π 1 − x2k f (xk )
pansions — equivalent to using the Dirichlet kernel —
                                                                                          N −1              πn(k + 1/2)         (83)
to the approximations obtained with the Jackson and                                       X
                                                                              = µ̃0 + 2          µ̃n cos
Lorentz kernels, which we will later use almost exclu-                                                             Ñ
                                                                                          n=1
sively. Clearly, both kernels yield much better approx-
imations to the expanded functions and, in particular,           which allows for the use of divide-and-conquer type al-
the oscillations have disappeared almost completely. The         gorithms that require only Ñ log Ñ operations — a clear
comparison with a Gaussian or Lorentzian, respectively,          advantage over the above estimate N Ñ .
illustrates the nature of the broadening of a δ-function           Routines for fast discrete cosine transform are im-
under convolution with the kernels, which later on will fa-      plemented in many mathematical libraries or Fast
cilitate the interpretation of our numerical results. With       Fourier Transform (FFT) packages, for instance, in
Table I we conclude this section on kernels, and, for the        FFTW (Frigo and Johnson, 2005a,b) that ships with
sake of completeness, also list two other kernels that are       most Linux distributions. If no direct implementation is
occasionally used in the literature. Both have certain dis-      at hand we may also use fast discrete Fourier transform.
advantages, in particular, they are not strictly positive.       With
                                                                          (                         
                                                                            (2 − δn,0 ) µ̃n exp i2πn
                                                                                                  Ñ
                                                                                                       0<n<N
D. Implementational details and remarks                              λn =                                             (84)
                                                                            0                          otherwise
1. Discrete cosine & Fourier transforms
                                                                 and the standard definition of discrete Fourier transform,
   Having discussed the theory behind Chebyshev expan-
sion, the calculation of moments, and the various kernel                                Ñ −1                         
approximations, let us now come to the practical issues of
                                                                                        X                    2π i nk
                                                                                λ̃k =           λn exp                     ,      (85)
the implementation of KPM, namely to the reconstruc-                                    n=0
                                                                                                               Ñ
tion of the expanded function f (x) from its moments µn .
Knowing a finite number N of coefficients µn (see Sec. III       after some reordering we find for an even number of data
for examples and details), we usually want to reconstruct        points
f (x) on a finite set of abscissas xk . Naively we could sum
up Eq. (47) separately for each point, thereby making use                               γ2j = Re(λ̃j ) ,                          (86)
of the recursion relations for Tn , i.e.,                                           γ2j+1 = Re(λ̃Ñ −1−j ) ,                      (87)
                         "          N −1
                                                       #
                 1                  X
  f (xk ) = p             g0 µ0 + 2      gn µn Tn (xk ) . (80)   with j = 0, . . . , Ñ/2 − 1. If we need only a discrete cosine
            π 1 − x2k               n=1                          transform this setup is not optimal, as it makes no use
                                                                 of the imaginary part which the complex FFT calculates.
For a set {xk } containing Ñ points these summations            It turns out, however, that the “wasted” imaginary part
would require of the order of N Ñ operations. We can            is exactly what we need when we later calculate Green
                                                                                                                                          11


Name                                        gn                        Parameters positive? Remarks
                        1                    πn        πn      π
Jackson                N+1
                           [(N − n + 1) cos N+1
                                                + sin N+1 cot N+1 ]      none      yes     best for most applications
Lorentz                         sinh[λ(1 − n/N )]/ sinh(λ)               λ∈R               yes        best for Green functions
Fejér                                   1 − n/N                         none              yes        mainly of academic interest
                                               M
                                         sin(πn/N)
Lanczos                                     πn/N
                                                                        M ∈N               no         M = 3 closely matches the Jack-
                                                                                                      son kernel, but not strictly posi-
                                                                                                      tive (Lanczos, 1966)
                                                n β
Wang and Zunger                         exp[−(α N ) ]                  α, β ∈ R            no         found empirically, not optimal (Wang,
                                                                                                      1994; Wang and Zunger, 1994)
Dirichlet                                      1                         none              no         least favorable choice

TABLE I Summary of different integral kernels that can be used to improve the quality of an order N Chebyshev series. The
coefficients gn refer to Eq. (47) or (48), respectively.


functions and other complex quantities, i.e., we can use              the scalar product h.|.i2 to functions f, g : [−1, 1]d → R,
the setup
                                                                                  Z1         Z1               d
                                                                                                             Y  q       
                          γ2j = λ̃j ,                        (88)     hf |gi2 =        ···        f (~x)g(~x)   π 1 − x2j dx1 . . . dxd .
                        γ2j+1 = λ̃∗Ñ −1−j ,                 (89)                 −1       −1                  j=1
                                                                                                                         (91)
to evaluate Eq. (140).                                                Here xj denote the d components of the vector ~x. Natu-
                                                                      rally, this scalar product leads to the expansion
                                                                                                  ∞
2. Integrals involving expanded functions
                                                                                                  X hf |φ~n i2
                                                                                     f (~x) =                       φ~n (~x)
                                                                                                       hφ~n |φ~n i2
                                                                                                  n=~0
                                                                                                  ~
  We have already mentioned that our particular choice                                            P∞                Qd                   (92)
of xk corresponds to the abscissas of numerical Cheby-                                               ~ =~0 µ~
                                                                                                     n       n h~
                                                                                                                n    j=1 Tnj (xj )
                                                                                             =                      q                ,
shev integration. Hence, Gauss-type numerical approx-                                                    Qd
                                                                                                           j=1 π     1 − x2j
imations (Press et al., 1986) to integrals of the form
R1
    f (x)g(x)dx become simple sums,
 −1                                                                   where we introduced a vector notation for indices, ~n =
                                                                      {n1 , . . . , nd }, and the following functions and coefficients
   Z1                  Z1 √
                           1 − x2 f (x)g(x)                                          d
        f (x)g(x) dx =       √              dx                                       Y
                               1 − x2                                   φ~n (~x) =         φnj (xj ) ,                                   (93)
  −1                    −1
                                                                                     j=1
             Ñ −1 q                               Ñ−1
           π X                                  1 X                         µ~n = hf |φ~n i2
       ≃            1 − x2k f (xk )g(xk ) =           γk g(xk ) ,
           Ñ k=0                              Ñ k=0                                Z1         Z1          d
                                                                                                           Y          
                                                              (90)              =         ···        f (~x)   Tnj (xj ) dx1 . . . dxd , (94)
                                                                                     −1      −1            j=1
where γk denotes the raw output of the cosine or Fourier
                                                                                                     d
transforms defined in Eq. (83). We can use this feature,                                  1         Y       2
for instance, to calculate partition functions, where f (x)                 h~n =                 =                .                     (95)
                                                                                     hφ~n |φ~n i2   j=1
                                                                                                        1 + δnj ,0
corresponds to the expansion of the spectral density ρ(E)
and g(x) to the Boltzmann or Fermi weight.
                                                                      2. Kernels for multidimensional expansions
E. Generalization to higher dimension
                                                                        As in the one-dimensional case, a simple truncation of
                                                                      the infinite series will lead to Gibbs oscillations and poor
1. Expansion of multivariate functions
                                                                      convergence. Fortunately, we can easily generalize our
                                                                      previous results for kernel approximations. In particular,
  For the calculation of finite-temperature dynamical
                                                                      we find that the extended kernel
correlation functions we will later need expansions of
functions of two variables. Let us therefore comment                                                          d
                                                                                                              Y
on the generalization of the previous considerations to d-                                 KN (~x, ~y) =            KN (xj , yj )        (96)
dimensional space, which is easily obtained by extending                                                      j=1
                                                                                                                                                                   12

maps an infinite series onto an truncated series,                                          κ~n = µ̃~n h~n = µ~n g~n h~n we find
                                                                                                                                              d
       fKPM(~x) = hKN (~x, ~y)|f (~y )i2                                                                                                      Y
                  PN −1             Q                                                          γ~k = f (cos(ϕk1 ), . . . , cos(ϕkd ))              π sin(ϕkj )
                    n=~0 ~
                    ~
                          µn h~n dj=1 gnj Tnj (xj )                               (97)                                                       j=1
                =         Qd          q             ,
                                         2                                                             N −1         d
                             j=1 π 1 − xj
                                                                                                       X            Y
                                                                                                   =          κ~n         cos(nj ϕkj )                           (104)
                                                                                                       n=~0
                                                                                                       ~            j=1
where we can take the gn of any of the previously dis-
                                                                                                       N −1                         N −1
cussed kernels. If we use the gnJ of the Jackson kernel,                                               X                            X
KNJ
    (~x, ~y ) fulfils generalizations of our conditions for an                                     =           cos(n1 ϕk1 ) . . .           cos(nd ϕkd )κ~n .
optimal kernel, namely                                                                                 n1 =0                        nd =0

         J                                                                                 The last line shows that the multidimensional discrete
     1. KN (~x, ~y) is positive ∀ ~x, ~y ∈ [−1, 1]d .
                                                                                           cosine transform is equivalent to a nesting of one-
         J
     2. KN (~x, ~y) is normalized with                                                     dimensional transforms in every coordinate. With fast
                                                                                           implementations the computational effort is thus pro-
Z1         Z1                                     Z1         Z1                            portional to dÑ d−1 Ñ log Ñ , which equals the expected
     ···        fKPM (~x) dx1 . . . dxd =              ···        f (~x) dx1 . . . dxd .   value for Ñ d data points, Ñ d log Ñ d . If we are not
                                                                                           using libraries like FFTW, which provide ready-to-use
−1     −1                                        −1      −1
                                                                                           multidimensional routines, we may also resort to one-
                                                                                  (98)     dimensional cosine transform or the above translation
         J
     3. KN (~x, ~y) has optimal resolution in the sense that                               into FFT to obtain high-performance implementations
                                                                                           of general d-dimensional transforms.
            Z1         Z1
     Q=          ···        (~x − ~y)2 KN (~x, ~y ) dx1 . . . dxd dy1 . . . dyd            III. APPLICATIONS OF KPM
            −1      −1
       = d(g0 − g1 )                                                                          Having described the mathematical background and
                                                                                  (99)     many details of the implementation of the Kernel Poly-
           is minimal.                                                                     nomial Method, we are now in the position to present
                                                                                           practical applications of the approach. Already in the
Note that for simplicity the order of the expansion, N ,                                   introduction we have mentioned that KPM can be used
was chosen to be the same for all spatial directions. Of                                   whenever we are interested in the spectral properties of
course, we could also define more general kernels,                                         large matrices or in correlation functions that can be ex-
                                                                                           pressed through the eigenstates of such matrices. Appar-
                                          d
                                          Y                                                ently, this leads to a vast range of applications. In what
                       KN~ (~x, ~y ) =          KNj (xj , yj ) ,                 (100)     follows, we try to cover all types of accessible quantities
                                          j=1                                              and for each give at least one example. We thereby focus
                                                                                           on lattice models from solid state physics.
where the vector N ~ denotes the orders of expansion for
the different spatial directions.
                                                                                           A. Densities of states

3. Reconstruction with cosine transforms                                                   1. General considerations

  Similar to the 1D case we may consider the function                                         The first and basic application of Chebyshev expan-
f : [−1, 1]d → R on a discrete grid ~x~k with                                              sion and KPM is the calculation of the spectral density of
                                                                                           Hermitian matrices, which could correspond to the densi-
                              x~k,j = cos(ϕkj ) ,                                (101)     ties of states of both interacting or non-interacting quan-
                                                                                           tum models (Silver and Röder, 1994; Silver et al., 1996;
                                     π(kj + 1/2)                                           Skilling, 1988; Wheeler, 1974). To be specific, let us con-
                              ϕkj =                   ,                          (102)
                                             Ñ                                            sider a D-dimensional matrix M with eigenvalues Ek ,
                                kj = 0, . . . , (Ñ − 1) .                       (103)     whose spectral density is defined as
                                                                                                                                D−1
Note again that we could define individual numbers of                                                                        1 X
                                                   ~ with                                                       ρ(E) =           δ(E − Ek ) .                    (105)
points for each spatial direction, i.e., a vector Ñ                                                                         D
                                                                                                                                k=0
 elements Ñj instead of a single Ñ . For all grid points
~x~k the function f (~x~k ) is obtained through multidimen-                                As described earlier, the expansion of ρ(E) in terms of
 sional discrete cosine transform, i.e., with coefficients                                 Chebyshev polynomials requires a rescaling of M → M̃ ,
                                                                                                                                                                   13

such that the spectrum of M̃ = (M − b)/a lies within                                    0.12                        W=3t                           W=9t     0.12
the interval [−1, 1]. Given the eigenvalues Ẽk of M̃ the




                                                                        ρ(E), ρtyp(E)




                                                                                                                                                                   ρ(E), ρtyp(E)
rescaled density ρ̃(Ẽ) reads                                                           0.08                                                                0.08


                                  D−1                                                   0.04                                                                0.04
                             1 X
                  ρ̃(Ẽ) =       δ(Ẽ − Ẽk ) ,                 (106)
                             D                                                            0                                                                 0
                                  k=0                                                                                                                       20
                                                                                        0.12                    W = 16 t               localized
                                                                                                                                                            16
and according to Eq. (19) the expansion coefficients be-




                                                                        ρ(E), ρtyp(E)
                                                                                        0.08




                                                                                                                                                                 W/t
                                                                                                                                                            12
come                                                                                                                                   extended
                                                                                                                                                            8
           Z1                               D−1
                                                                                        0.04
                                        1   X                                                                                                               4
    µn =        ρ̃(Ẽ) Tn (Ẽ) dẼ =                Tn (Ẽk )
                                        D                                                 0
                                                                                               -10   -5    0    5      10   -10   -5      0        5   10
                                                                                                                                                            0

           −1                               k=0                                                           E/t                            E/t
                                                                (107)
                D−1
          1 X                  1                                         FIG. 2 (Color in online edition) Standard (dashed) and typi-
        =     hk|Tn (M̃ )|ki =   Tr(Tn (M̃ )) .                          cal density of states (solid line), ρ(E) and ρtyp (E) respectively,
          D                    D
                k=0                                                      of the 3D Anderson model on a 503 site cluster with periodic
                                                                         boundary conditions. For ρ(E) we calculated N = 2048 mo-
This is exactly the trace form that we introduced in
                                                                         ments with R = 10 start vectors and S = 240 realizations of
Sec. II.B, and we can immediately calculate the µn using                 disorder, for ρtyp (E) these numbers are N = 8192, R = 32
the stochastic techniques described in Sec. II.B.2. Know-                and S = 200. The lower right panel shows the phase diagram
ing the moments we can use the techniques of Sec. II.D                   of the model we obtained from ρtyp (E)/ρ(E) → 0 (mobility
to reconstruct ρ̃(Ẽ) for the whole range [−1, 1], and a                 edge).
final rescaling yields ρ(E).

                                                                         in the interval [−W/2, W/2]. With increasing strength
2. Non-interacting systems: Anderson model of disorder                   of disorder, W , the single-particle eigenstates of the
                                                                         model tend to become localized in the vicinity of
   Applied to a generalized model of non-interacting                     a particular lattice site, which excludes these states
          (†)
fermions ci ,                                                            from contributing to electronic transport. Disorder
                                                                         can therefore drive a transition from metallic behav-
                              D−1
                              X                                          ior with delocalized fermions to insulating behavior
                       H=            c†i Mij cj ,               (108)    with localized fermions (Kramer and Mac Kinnon, 1993;
                             i,j=0                                       Lee and Ramakrishnan, 1985; Thouless, 1974). The dis-
the matrix of interest M is formed by the coupling con-                  order averaged density of states ρ(E) of the model can
stants Mij . Knowing the spectrum of M , i.e. the single-                be obtained as described, but it contains no information
particle density of states ρ(E), all thermodynamic quan-                 about localization. The KPM method, however, allows
tities of the model can be calculated. For example, the                  also for the calculation of the local density of states,
particle density is given by                                                                                        D−1
                                                                                                              1 X
                       Z                                                                             ρi (E) =     |hi|ki|2 δ(E − Ek ) ,                     (112)
                             ρ(E)                                                                             D
                  n=                   dE          (109)                                                            k=0
                          1 + eβ(E−µ)
                                                                         which is a measure for the contribution of a single lattice
and the free energy per site reads                                       site (denoted by the basis state |ii) to the complete spec-
               1
                 Z                                                       trum. For delocalized states all sites contribute equally,
    f = nµ −       ρ(E) log(1 + e−β(E−µ) ) dE ,                 (110)    whereas localized states reside on just a few sites, or,
              β
                                                                         equivalently, a certain site contributes only to a few eigen-
where µ is the chemical potential and β = 1/T the inverse                states. This property has a pronounced effect on the
temperature.                                                             distribution of ρi (E), which at a fixed energy E char-
  As the first physical example let us consider the An-                  acterizes the variation of ρi over different realizations of
derson model of non-interacting fermions moving in a                     disorder and sites i. For energies that correspond to lo-
random potential (Anderson, 1958),                                       calized eigenstates the distribution is highly asymmet-
                      X †         X †                                    ric and becomes singular in the thermodynamic limit,
               H = −t     ci cj +    ǫ i ci ci .    (111)                whereas in the delocalized case the distribution is regu-
                           hiji             i                            lar and centered near its expectation value ρ(E). There-
                                                                         fore a comparison of the geometric and the arithmetic
Here hopping occurs along nearest neighbor bonds                         average of ρi (E) over a set of realizations of disorder
hiji on a simple cubic lattice and the local poten-                      and over lattice sites reveals the position of the Ander-
tial ǫi is chosen randomly with uniform distribution                     son transition (Dobrosavljević and Kotliar, 1997, 1998;
                                                                                                                                                   14

Schubert et al., 2005a,b). The expansion of ρi (E) is even               and three electrons in the resulting t2g -shell form the lo-
simpler than the expansion of ρ(E), since the moments                    cal spins. The remaining electrons occupy the eg -shell
have the form of expectation values and do not involve a                 and can become itinerant upon doping, causing these
trace,                                                                   materials to show ferromagnetic order (Zener, 1951). If
                                                                         the ferromagnetic (Hund’s rule) coupling is large, at each
        Z1                            D−1                                site only the high-spin states are relevant and we can de-
                                   1 X
 µn =        ρ̃i (E) Tn (E) dE =       |hi|ki|2 Tn (Ẽk )                scribe the total on-site spin in terms of Schwinger bosons
                                   D                                       (†)
        −1                            k=0
                                                                 (113)   aiσ (Auerbach, 1994). From the electrons only the
             D−1                                                         charge degree of freedom remains, which is denoted by
       1 X                       1                                                                 (†)
     =     hi|Tn (M̃ )|kihk|ii =   hi|Tn (M̃ )|ii .                      the spin-less fermions ci (see, e.g. (Weiße et al., 2001)
       D                         D                                       for more details). The full quantum model, Eq. (115),
             k=0
                                                                         is rather complicated for analytical or numerical studies,
In Figure 2 we show the standard density of states ρ(E),                 and we expect major simplification by treating the spin
which coincides with the arithmetic mean of ρi (E), in                   background classically (remember that S is quite large
comparison to the typical density of states ρtyp (E), which              for the systems of interest). The limit of classical spins,
is defined as the geometric mean of ρi (E),                              S → ∞, is obtained by averaging Eq. (115) over spin
                                                                         coherent states,
                ρtyp (E) = exp[ log(ρi (E)) ] .                  (114)
                                                                                                                                            2S
                                                                                          cos( 2θ ) ei φ/2 a†↑ + sin( θ2 ) e− i φ/2 a†↓
With increasing disorder, starting from the boundaries                   |Ω(S, θ, φ)i =                      p                                    |0i ,
of the spectrum, ρtyp (E) is suppressed until it vanishes                                                       (2S)!
completely for W/t & 16.5, which is known as the critical                                                                   (116)
strength of disorder where the states in the band center                 where θ and φ are the classical polar angles and |0i the
become localized (Slevin and Ohtsuki, 1999). The calcu-                  bosonic vacuum. The resulting non-interacting Hamilto-
lation yields the phase diagram shown in the lower right                 nian reads,
corner of Figure 2, which compares well to other numer-                                        X
ical results.                                                                          H =−        tij c†i cj + H.c. ,      (117)
   Since the method requires storage only for the sparse                                             hiji
Hamiltonian matrix and for two vectors of the corre-
sponding dimension, quite large systems can be stud-                     with the matrix element (Kogan and Auslender, 1988)
ied on standard desktop computers (of the order of 1003                                       θ
sites). The recursion is stable for arbitrarily high expan-                tij = t cos θ2i cos 2j e− i(φi −φj )/2
sion order. In the present case we calculated as many                                                             θ               
                                                                                                    + sin θ2i sin 2j ei(φi −φj )/2 , (118)
as 8192 moments to achieve maximum resolution in the
local density of states. The standard density of states is               i.e., spin-less fermions move in a background of random
usually far less demanding.                                              or ordered classical spins which affect their hopping am-
                                                                         plitude.
                                                                            To assess the quality of this classical approximation
3. Interacting systems: Double exchange                                  we considered four electrons moving on a ring of eight
                                                                         sites, and compared the densities of states obtained for
   Coming to interacting quantum systems, as a sec-                      a background of S = 3/2 quantum spins and a back-
ond example we study the evolution of the quantum                        ground of classical spins. For the full quantum Hamil-
double-exchange model (Anderson and Hasegawa, 1955)                      tonian, Eq. (115), the (canonical) density of states was
for large spin amplitude S, which in terms of spin-less                  calculated on the basis of 400 Chebyshev moments. To
           (†)                     (†)
fermions ci and Schwinger bosons aiσ (σ =↑, ↓) is given                  reduce the Hilbert space dimension and to save resources
by the Hamiltonian                                                       we made use of the SU (2) symmetry of the model: With
                                                                         thez stochastic approach we calculated separate moments
                          t   X †
                                                                         µSn for each S z -sector,
                H=−            aiσ ajσ c†i cj                    (115)
                       2S + 1
                               hiji,σ                                                           z           z
                                                                                             µSn = TrS [Tn (H̃)] ,                            (119)
                              P       †
with the local constraint          σ aiσ aiσ   = 2S + c†i ci .
                                                       This                                                 z
                                                                         and used the dimensions DS of the sectors to obtain the
model describes itinerant electrons on a lattice whose
                                                                         total normalized µn from the average
spin is strongly coupled to local spins of amplitude S,
so that the motion of the electrons mediates an effec-                                                              max
                                                                                                                   SP               z
tive ferromagnetic interaction between these localized                                                                        µSn
spins. In the case of colossal magneto-resistant mangan-                               1              S z =−S max
                                                                                µn =     Tr[Tn (H̃)] = S max                            .     (120)
ites (Coey et al., 1999), for instance, cubic site symmetry                            D                   P
                                                                                                                              DS z
leads to a crystal field splitting of the manganese d-shell,                                                    S z =−S max
                                                                                                                                     15

       0.3                                                               erator A reads
                                                  ρqu(E)
              n=8                                 ρqu(E) run. avg.
              nel= 4                              ρcl(E)
                                                                                                                  D−1
                                                                                       1                1 X
              S = 3/2                                                       hAi =        Tr(A e−βH ) =      hk|A|ki e−βEk ,
                                                                                      ZD               ZD
       0.2                                                                                                        k=0
                                                                                                                                   (121)
ρ(E)




                                                                                                           D−1
                                                                                      1             1      X
                                                                              Z=        Tr(e−βH ) =              e−βEk ,           (122)
                                                                                      D             D
                                                                                                           k=0
       0.1

                                                                         where H is the Hamiltonian of the system, Z the par-
                                                                         tition function, and Ek the energy of the eigenstate |ki.
                                                                         Using the function
        0
         -6       -4    -2        0         2         4              6
                                 E/t                                                               D−1
                                                                                                1 X
                                                                                       a(E) =       hk|A|ki δ(E − Ek )             (123)
FIG. 3 (Color in online edition) Density of nonzero eigen-                                      D
                                                                                                   k=0
values of the quantum double-exchange model with S = 3/2
(dashed line) and running average (red dot-dashed), calcu-
lated for 4 electrons on a 8-site ring, compared to the classical        and the (canonical) density of states ρ(E), we can express
result S → ∞ (green solid). Expansion parameters: N = 400                the thermal expectation value in terms of integrals over
moments and R = 100 random vectors per S z sector.                       the Boltzmann weight,

                                                                                                     Z∞
                                                                                               1
                                                                                         hAi =            a(E) e−βE dE ,           (124)
                                                                                               Z
Note, that such a setup can be used whenever the model                                            −∞
under consideration has certain symmetries.                                                     Z∞
   On the other hand, we solved the effective non-                                         Z=        ρ(E) e−βE dE .                (125)
interacting model (117) and calculated the distributions                                        −∞
of non-zero energies for a background of fully disordered
classical spins. As Figure 3 illustrates, the spectrum of                Of course, similar relations hold also for non-interacting
the quantum model with S = 3/2 closely matches that                      fermion systems, where the Boltzmann weight e−βE has
of the system with classical spins, providing good jus-                  to be replaced by the Fermi function f (E) = (1 +
tification, e.g. for studies of colossal magneto-resistive               eβ(E−µ) )−1 and the single-electron wave functions play
manganites that make use of a classical approximation                    the role of |ki.
for the spin background. Since for the finite cluster con-                  Again, the particular form of a(E) suggests an expan-
sidered the spectrum of the quantum model is discrete,                   sion in Chebyshev polynomials, and after rescaling we
at the present expansion order KPM starts to resolve                     find
distinct energy levels (dashed line). Therefore a running
average (dot-dashed line) compares better to the classical                       Z1                          D−1
spin-averaged data (bold line).                                                                            1 X
                                                                          µn =        ã(E) Tn (E) dE =        hk|A|ki Tn (Ẽk )
                                                                                                           D
                                                                                 −1                          k=0                   (126)
                                                                                                           1
                                                                                                      =      Tr(ATn (H̃)) ,
                                                                                                           D

B. Static correlations at finite temperature                             which can be evaluated with the stochastic approach,
                                                                         Sec. II.B.2.
   Densities of states provide only the most basic infor-                   For interacting systems at low temperature the expres-
mation about a given quantum system, and much more                       sion in Eq. (124) is a bit problematic, since the Boltz-
details can usually be learned from the study of corre-                  mann factor puts most of the weight on the lower end
lations and the response of the system to an external                    of the spectrum and heavily amplifies small numerical
probe or perturbation. Starting with static correlation                  errors in ρ(E) and a(E). We can avoid these problems
functions, let us now extend the application range of the                by calculating the ground state and some of the lowest
expansion techniques to such more involved quantities.                   excitations exactly, using standard iterative diagonaliza-
                                                                         tion methods like Lanczos or Jacobi-Davidson. Then we
  Given the eigenstates |ki of an interacting quantum                    split the expectation value of A and the partition func-
system the thermodynamic expectation value of an op-                     tion Z into contributions from the exactly known states
                                                                                                                                                                                           16

                                                                                                                                 Note, that in addition to the two vectors for the Cheby-
                                0.2                                                        open circles = ED results             shev recursion we now need memory also for the eigen-
                                                        ∆=
                                                                                                  lines = KPM results            states |ki. Otherwise the resource consumption is the
                                                             -1.                                                                 same as in the standard scheme.
   Σi ( Si Si+x + Si Si+y ) 〉

                                                                  0
                                 0.1                                                                                               We illustrate the accuracy of this approach in Figure 4
    z




                                                                                                                                 considering the nearest-neighbor S z -S z correlations of
                                                .9
    z




                                              -0


                                                                       ∆ = -0.5                                                  the square-lattice spin-1/2 XXZ model as an example,
                                          =
                                          ∆




                                0.0
    z




                                                            0.0                                                                             X
                                                       ∆=                    ∆ = 0.5                                                                         + Siy Si+δ
                                                                                                                                                                    y
    z




                                                                                                                                       H=          (Six Si+δ
                                                                                                                                                         x
                                                                                                                                                                        + ∆Siz Si+δ
                                                                                                                                                                                z
                                                                                                                                                                                    ).   (134)
                                                                                                                                             i,δ
                                -0.1                                       1.0
                                                                      ∆=
〈−
 N
    1




                                                                                                                                 As a function of temperature and for an anisotropy
                                                                                                         KPM 4x4, C=0
                                                                                                         KPM 4x4, C=2 .. 9
                                                                                                                                 −1 < ∆ < 0 this model shows a quantum to clas-
                                -0.2                                                                     KPM 4x6, C=2 .. 8
                                                                                                         ED 4x4
                                                                                                                                 sical crossover in the sense that the correlations are
                                                                                                                                 anti-ferromagnetic at low temperature (quantum effect)
                                      0                               1                           2                          3   and ferromagnetic at high temperature (as expected
                                                                                       T                                         for the classical model). (Fabricius and McCoy, 1999;
   FIG. 4 (Color in online edition) Nearest-neighbor S z -S z cor-                                                               Fehske et al., 2000; Schindelin et al., 2000) Comparing
   relations of the XXZ model on a square lattice. Lines repre-                                                                  the KPM results with the exact correlations of a 4 × 4
   sent the KPM results with separation of low-lying eigenstates                                                                 system, which were obtained from a complete diagonal-
   (bold solid and bold dashed) and without (thin dashed), open                                                                  ization of the Hamiltonian, the improvement due to the
   symbols denote exact results from a complete diagonalization                                                                  separation of only a few low-lying eigenstates is obvious.
   of a 4 × 4 system.                                                                                                            Whereas for C = 0 the data is more or less random below
                                                                                                                                 T ≈ 1, the agreement with the exact data is perfect, if the
                                                                                                                                 ground state and one or two excitations are considered
   and contributions from the rest of the spectrum,
                                                                                                                                 separately. The numerical effort required for these calcu-
               C−1                     Z∞                                                                                        lations differs largely between complete diagonalization
            1 X                     1
    hAi =          hk|A|ki e−βEk +        as (E) e−βE dE ,                                                                       and the KPM method. For the former, 18 or 20 sites are
          ZD                        Z                                                                                            practically the limit, whereas the latter can easily handle
                                                 k=0                                       −∞
                                                                                                                    (127)        30 sites or more.
                                                                       Z∞                                                           Note that for non-interacting systems the above sepa-
                                              C−1
                                       1      X                                                                                  ration of the spectrum is not required, since for T → 0
                         Z=                          e−βEk +                     ρs (E) e−βE dE                     (128)        the Fermi function converges to a simple step function
                                       D
                                              k=0                     −∞                                                         without causing any numerical problems.
   The functions
                                                                   D−1
                                                             1 X                                                                 C. Dynamical correlations at zero temperature
                                              as (E) =           hk|A|ki δ(E − Ek ) ,                               (129)
                                                             D
                                                                   k=C
                                                                                                                                 1. General considerations
                                                                   D−1
                                                       1 X
                                              ρs (E) =     δ(E − Ek )                                               (130)           Having discussed simple expectation values and static
                                                       D
                                                                   k=C
                                                                                                                                 correlations, the calculation of time dependent quantities
   describe the rest of the spectrum and can be expanded                                                                         is the natural next step in the study of complex quantum
   in Chebyshev polynomials easily. Based on the known                                                                           models. This is motivated also by many experimental se-
   states we can introduce the projection operator                                                                               tups, which probe the response of a physical system to
                                                                                 C−1                                             time dependent external perturbations. Examples are in-
                                                                                 X
                                                        P =1−                          |kihk| ,                     (131)        elastic scattering experiments or measurements of trans-
                                                                                 k=0                                             port coefficients. In the framework of linear response
                                                                                                                                 theory and the Kubo formalism the system’s response
   and find for the expansion coefficients of ãs (E)                                                                            is expressed in terms of dynamical correlation functions,
           1                       1 X
                                      R−1                                                                                        which can also be calculated efficiently with Chebyshev
             Tr(P ATn (H̃)) ≈
                  µn =                   hr|P ATn (H̃)P |ri ,                                                                    expansion and KPM. Technically though, we need to dis-
          D                       RD r=0                                                                                         tinguish between two different situations: For interacting
                                                         (132)                                                                   many-particle systems at zero temperature only matrix
   and similarly for those of ρ̃s (E)                                                                                            elements between the ground state and excited states
                                                        R−1                                                                      contribute to a dynamical correlation function, whereas
                                   1                  1 X                                                                        for interacting systems at finite temperature or for non-
            µn =                     Tr(P Tn (H̃)) ≈        hr|P Tn (H̃)P |ri . (133)
                                   D                 RD r=0                                                                      interacting systems with a finite particle density transi-
                                                                                                                                    17

tions between all eigenstates — many-particle or single-         transform gives
particle, respectively — contribute. We therefore split
the discussion of dynamical correlations into two sections,                           D−1                                    
                                                                                      X                                1
starting here with interacting many-particle systems at             RehA; Bi±
                                                                            ω̃ =            h0|A|kihk|B|0i P
                                                                                                                   ω̃ ∓ Ẽk
T = 0.                                                                                k=0

   Given two operators A and B a general dynamical cor-                          Z1                               ∞
                                                                           1          ImhA; Bi±   ω̃ ′    ′
                                                                                                                 X
relation function can be defined through                              =−     P                         dω   = −2     µn Un−1 (ω̃) ,
                                                                           π            ω̃ − ω̃ ′                n=1
                                                                                 −1
                                                                                                                                  (139)
                              1
  hA; Bi±
        ω = lim h0|A                B|0i
                ǫ→0      ω + iǫ ∓ H                              where we used Eq. (14). The full correlation function
                                D−1
                                X h0|A|kihk|B|0i                                                 ∞     h
                         = lim                   , (135)                          − i µ0        X                    i Tn (ω̃) i
                           ǫ→0      ω + i ǫ ∓ Ek                   hA; Bi±ω̃  =  √          − 2     µn  U n−1 (ω̃) + √
                                  k=0                                              1 − ω̃ 2     n=1
                                                                                                                       1 − ω̃ 2
                                                                                                     ∞
                                                                                    −i h            X                           i
where Ek is the energy of the many-particle eigenstate |ki                    = √           µ0 + 2      µn exp(− i n arccos ω̃)
of the Hamiltonian H, |0i its ground state, and ǫ > 0.                             1 − ω̃ 2         n=1
   If we assume that the product h0|A|kihk|B|0i is real                                                                     (140)
the imaginary part                                               can thus be reconstructed from the same moments µn
                                                                 that we derived for its imaginary part, Eq. (138). In con-
                                                                 trast to the real quantities we considered so far, the re-
                       D−1
                       X                                         construction merely requires complex Fourier transform,
  ImhA; Bi±
          ω = −π             h0|A|kihk|B|0i δ(ω ∓ Ek )   (136)   see Eqs. (88) and (89). If only the imaginary or real part
                       k=0
                                                                 of hA; Bi±  ω is needed, a cosine or sine transform, respec-
                                                                 tively, is sufficient.
has a similar structure as, e.g., the local density of states       Note again, that the calculation of dynamical correla-
in Eq. (112), and in fact, with ρi (E) we already calculated     tion functions for non-interacting electron systems is not
a dynamical correlation function. Hence, after rescaling         possible with the scheme discussed in this section, not
the Hamiltonian H → H̃ and all energies ω → ω̃ we can            even at zero temperature. At finite band filling (finite
proceed as usual and expand ImhA; Bi±       ω in Chebyshev       chemical potential) the ground state consists of a sum
polynomials,                                                     over occupied single-electron states, and dynamical cor-
                                                                 relation functions thus involve a double summation over
                           h        ∞            i               matrix elements between all single-particle eigenstates,
                    1              X
  ImhA; Bi±
          ω̃ = − √          µ0 + 2     µn Tn (ω̃) . (137)        weighted by the Fermi function. Clearly, this is more
                  1 − ω̃ 2         n=1                           complicated than Eq. (135), and we postpone the discus-
                                                                 sion of this case to Sec. III.D, where we describe methods
Again, the moments are obtained from expectation values          for dynamical correlation functions at finite temperature
                                                                 and — for the case of non-interacting electrons — finite
                                                                 density.
           Z1
       1
  µn =          ImhA; Bi±
                        ω̃ Tn (ω̃) dω̃ = h0|ATn (∓H̃)B|0i ,      2. One-particle spectral function
       π
           −1
                                                      (138)         An important example of a dynamical correlation func-
and for A 6= B † we can follow the scheme outlined in            tion is the (retarded) Green function in momentum space,
Eqs. (30) to (33). For A = B † the calculation simplifies
to the one in Eqs. (34) and (35), now with B|0i as the
starting vector.                                                       Gσ (~k, ω) = hc~k,σ ; c~†k,σ i+     †
                                                                                                     ω + hc~  ; ck,σ i−
                                                                                                           k,σ ~      ω ,         (141)
   In many cases, especially for the spectral functions and      and the associated spectral function
optical conductivities studied below, only the imaginary
part of hA; Bi±ω is of interest, and the above setup is all
                                                                                               1
                                                                              Aσ (~k, ω) = −      Im Gσ (~k, ω)
we need. Sometimes however — e.g., within the Clus-                                            π                                  (142)
ter Perturbation Theory discussed in Sec. IV.B — also                                       = A+  ~         − ~
                                                                                               σ (k, ω) + Aσ (k, ω) ,
the real part of a general correlation function hA; Bi±   ω
is required. Fortunately it can be calculated with al-           which characterizes the electron absorption or emission
most no additional effort: The analytical properties of          of an interacting system. For instance, A−
                                                                                                          σ can be mea-
hA; Bi±ω arising from causality imply that its real part is      sured experimentally in angle resolved photo-emission
fully determined by the imaginary part. Indeed a Hilbert         spectroscopy (ARPES).
                                                                                                                                                                18

   As the first application, let us consider the                                         1.0
                                                                                                                                                         k=0
one-dimensional     Holstein  model for   spinless                                       0.5
fermions (Holstein, 1959a,b),
                                                                                           0
                                                                                         1.0
           X                                                                             0.5
  H = −t        (c†i ci+1 + H.c.)                                                                                                                      k=π/5




                                                                      A (k,ω), A (k,ω)
            i                                                                              0
                         X                          X †                                  1.0
                 − gω0         (b†i + bi )ni + ω0    bi bi , (143)
                                                                                                                                                       k=2π/5




                                                                     −
                         i,σ                         i                                   0.5
                                                                                           0
                                                                                         1.0
which is one of the basic models for the study of electron-                                                                                            k=3π/5




                                                                     +
                                                                                         0.5
lattice interaction. A single band of electrons is approx-
                                (†)                                                        0
imated by spinless fermions ci , the density of which
couples to the local lattice distortion described by dis-                                1.0
                        (†)
persionless phonons bi . At low fermion density, with                                    0.5                                                           k=4π/5
increasing electron phonon interaction the charges get                                     0
dressed by a surrounding lattice distortion and form new,                                1.0
heavy quasi-particles known as polarons. Eventually, for                                        (a) n = 0.1
                                                                                         0.5                                                             k=π
strong coupling the width of the corresponding band is
suppressed exponentially, leading to a process called self-                               0
                                                                                           -6          -4            -2          0                 2             4
trapping. For a half-filled band, i.e., 0.5 fermions per site,
                                                                                                                          ω/t
the model allows for the study of quantum effects at the                                  2
transition from a metal to a band (or Peierls) insulator,                                                                                               k=0
marked by the opening of a gap at the Fermi wave vector                                    1
                                                                      A (k,ω), A (k,ω)

                                                                                                                                         x10
and the development of a matching lattice distortion.                                     0
                                                                     −




   Since the Hamiltonian (143) involves bosonic degrees                                                                                            k = ±π/4
of freedom, the Hilbert space of even a finite system has                                  1
                                                                                                                                 x10
infinite dimension. In practice, nevertheless, the con-
                                                                                          0
tribution of highly excited phonon states is found to be
                                                                     +




negligible at low temperature or for the ground-state, and                                                                                         k = ±π/2
                                                                                           1    (b) n = 0.5
the system is well approximated by a truncated phonon
              P †
space with       i bi bi ≤ M (Bäuml et al., 1998). In ad-                                0
                                                                                           -4               -2             0                   2                 4
dition, the translational symmetry of the model can be
used to reduce the Hilbert space dimension, and, more-                                                                    ω/t
over, the symmetric phonon mode with momentum q = 0                  FIG. 5 (Color in online edition) One-particle spectral func-
can be excluded from the numerics: Since it couples to               tion and its integral for the Holstein model (a) on a 10-site ring
the total number of electrons, which is a conserved quan-            with one electron, εp = g 2 ω0 = 2.0t, ω0 = 0.4t, and (b) on a
tity, its contribution can be handled analytically (Robin,           8-site ring, band filling n = 0.5, εp = g 2 ω0 = 1.6t, ω0 = 0.1t.
1997; Sykora et al., 2005). Below we present results for             For comparison, in (a) the blue dashed lines represent Quan-
a cluster size of L = 8 or 10, where a cut-off M = 24                tum Monte Carlo data at βt = 8 (Hohenadler et al., 2005),
or 15, respectively, leads to truncation errors < 10−6               and green stars indicate the position of the polaron band in
                                                                     the infinite system (Bonča et al., 1999). In (b) the blue and
for the ground-state energy. Alternatively, for one or
                                                                     green curves denote results of Dynamical DMRG for the same
two fermionic particles and low temperatures an opti-                lattice size and T = 0 (Jeckelmann and Fehske, 2006).
mized variational basis can be constructed for infinite
systems (Bonča et al., 1999), which would also be suit-
able for our numerical approach.
   In Figure 5 we present KPM data for the spectral func-
tion of the spinless-fermion Holstein model and assess its           tion, which in the spinless case reads
quality by comparing with results from Quantum Monte
Carlo (QMC) and Dynamical Density Matrix Renormal-
ization Group (DDMRG) (Jeckelmann, 2002) calcula-
tions. Starting with the case of a single electron on a                                              X
                                                                              A− (k, ω) =                   |hl, Ne − 1| ck |0, Ne i|2
ten-site ring, Figure 5 (a) illustrates the presence of a
                                                                                                       l
narrow polaron band at the Fermi level and of a broad
range of incoherent contributions to the spectral func-                                                          × δ[ω + (El,Ne −1 − E0,Ne )] (144)
                                                                                                                                                                               19

                                                                                       2.5
and
                                                                                       2.0       (a)                                                    Peierls insulator
                 X                                                                     1.5
      +
  A (k, ω) =          |hl, Ne + 1| c†k |0, Ne i|2                                      1.0
                  l                                                                                                                                                U/2εp= 0




                                                                    (∞)
                                                                                       0.5
                           × δ[ω − (El,Ne +1 − E0,Ne )] . (145)                        0.0




                                                                   reg
                                                                    (ω)/S
                                                                                       2.0
Here |l, Ne i denotes the lth eigenstate with Ne elec-
                                                                                       1.5
trons and energy El,Ne . The photo-emission part A−




                                                                   reg
                                                                                       1.0
reflects the Poisson-like phonon distribution of the po-




                                                                    (ω), S
                                                                                       0.5                                                                       U/2εp= 0.93
laron ground state, whereas A+ has most of its weight in                               0.0
the vicinity of the original free electron band. In terms of




                                                                   reg
                                                                                                                                                             Mott insulator




                                                                   σ
                                                                                       2.0
the overall shape and the integrated weight, both KPM
and QMC agree very well. QMC, however, is not able to                                  1.5                                                                       U/2εp= 2.14
                                                                                       1.0
resolve all the narrow features of the spectral function,
                                                                                       0.5
and the polaron band is hardly observable. Nevertheless,
                                                                                       0.0
QMC has the advantage that larger systems can be stud-                                       0                        2                 4                    6                  8

ied, in particular at finite temperature. As a guide to the                                                                           ω/t
                                                                                       2
eye we also show the position of the polaron band in the                                                                                                                 k=0
                                                                                        1
infinite system, which was calculated with the approach
of Bonča et al. (1999). In Figure 5 (b) we consider the                               0
case of a half-filled band and strong electron-phonon cou-                             2
                                                                                                                                                                       k=±π/4
pling, where the system is in an insulating phase with an                               1


                                                                    A↑(k,ω), A↑(k,ω)
excitation gap at the Fermi momentum k = ±π/2. Be-                                     0
low and above the gap the spectrum is characterized by             −
                                                                                       2
broad multi-phonon absorption. Compared to DDMRG,                                                                                                                      k=±π/2
                                                                                        1
again KPM offers the better resolution and unfolds all
                                                                                       0
the discrete phonon sidebands. Concerning numerical                                    2
                                                                   +




performance DDMRG has the advantage of a small opti-                                                                                                                k=±3π/4
                                                                                        1
mized Hilbert space, which can be handled with standard
workstations. However, the basis optimization is rather                                0
time consuming and, in addition, each frequency value                                  2
                                                                                                 (b) Ne=L, S =0
                                                                                                                  z                                                      k=π
ω requires a new simulation. The KPM calculations, on                                   1
the other hand, involved matrix dimensions between 108                                 0
and 1010 , and we therefore used high-performance com-                                  -6                   -4            -2           0           2              4            6

puters such as Hitachi SR8000-F1 or IBM p690 for the                                                                                  ω/t
moment calculation. For the reconstruction of the spec-            FIG. 6 (Color in online edition) (a) The optical conductiv-
tra, of course, a desktop computer is sufficient.                  ity σ reg (ω) and its integral S reg (ω) for the Holstein Hubbard
                                                                   model at half-filling with different ratios of the Coulomb inter-
                                                                   action U to the electron-lattice coupling εp = g 2 ω0 , ω0 = 0.1t,
3. Optical conductivity                                            and g 2 = 7. Black dotted lines denote excitations of the pure
                                                                   Hubbard model. (b) The one-particle spectral function at the
   The next example of a dynamical correlation function            transition point, i.e., for the same parameters as in the middle
is the optical conductivity. Here the imaginary and real           panel of (a). The system size is L = 8.
parts of our general correlation functions hA; Biω change
their roles due to an additional frequency integration.
                                                                   state for the Chebyshev recursion. Back-scaling and di-
The so-called regular contribution to the real part of the
                                                                   viding by ω then yields the final result.
optical conductivity is thus given by,
                                                                      In Figure 6 we apply this setup to the Holstein Hub-
                1 X                                                bard model, which is the generalization of the Holstein
  σ reg (ω) =       |hk|J|0i|2 δ(ω − (Ek − E0 )) , (146)           model to true, spin-carrying electrons that interact via
                ω
                  Ek >E0                                           a screened Coulomb interaction, modelled by a Hubbard
where the operator                                                 U -term,
                             X                                                X †                         X
                J = − i qt         (c†i,σ ci+1,σ − H.c.)   (147)      H = −t     (ci,σ ci+1,σ + H.c.) + U    ni↑ ni↓
                                                                                                       i,σ                                      i
                             i,σ
                                                                                                                          X                             X †
                                                                                                             − gω0              (b†i + bi )niσ + ω0      bi bi . (148)
describes the current. After rescaling the energy and
                                                                                                                          i,σ                            i
shifting the frequency, ω = ω̃ + Ẽ0 , the sum can be ex-
panded as described earlier, now with J|0i as the initial          For a half-filled band, which now denotes a density of one
                                                                                                                                                                                          20

                                       1                                                                                of two branches of low-lying triplet excitations by neutron
                                                     (0,π)
                                                               T1       T2
                                     0.5             (π,π)                                                              scattering (Garrett et al., 1997), which was inconsistent
                                                                                                                        with the then prevailing picture of (VO)2 P2 O7 being a
S(q,ω) [arb. units], N(q,ω) / N(q)

                                      0                                                                                 spin-ladder or alternating chain compound.
                                      1
                                                     (0,π/2)   T1 S 1 S                                                    Studying the low-energy physics of the model (149)
                                                     (π.π/2)            2
                                     0.5
                                                                         T2
                                                                                                                        the KPM approach can be used to calculate the spin
                                      0
                                                                                                                        structure factor and the integrated spectral weight,
                                      1                                                                                                  X
                                                     (π,0)
                                                               T1                                                           S(~q, ω) =                ~ z (~q)|0i|2 δ(Ek − E0 − ω) ,
                                                                                                                                                  |hk|S                                (150)
                                     0.5
                                                                                                                                              k
                                                                                                                                         Z ω
                                      0
                                      1                                                                                    N (~q, ω) =            dω ′ S(~q, ω ′ ) ,                   (151)
                                                     (π/4,0) (3π/4,0)   T1 S1 T3                                                              0
                                     0.5
                                                                                                                                           P
                                                                                                                        where S ~ z (~q) =         iq ri,j z
                                                                                                                                                    ~·~
                                      0                                                                                                      i,j e        Si,j . Figure 7 shows these
                                      1                                                                                 quantities for a 4 × 8 cluster with periodic boundary con-
                                                     (π/2,0)
                                                                              T1       T3           δ = 0.3             ditions. The dimension of the sector Sz = 0, which con-
                                     0.5                                                            Ja/Jb= 0.4          tains the ground state, is rather moderate here being of
                                                                                                    Jx/Jb= 0.425
                                      0                                                                                 the order of D ≈ 4 · 107 only. The expansion clearly re-
                                           0     0.5            1       1.5        2        2.5   3        3.5     4    solves the lowest (massive) triplet excitations T1 , a num-
                                                                              ω / Jb                                    ber of singlets and, in particular, a second triplet branch
                                                                                                                        T2 . The shaded region marks the two-particle contin-
FIG. 7 Spin structure factor at T = 0 calculated for the                                                                uum obtained by exciting two of the elementary triplets
model (149) which aims at describing the magnetic compound                                                              T1 , and illustrates that T2 is lower in energy. Since the
(VO)2 P2 O7 . For more details see (Weiße et al., 1999).                                                                system is finite in size, of course, the continuum appears
                                                                                                                        only as a set of broad discrete peaks, the density of which
                                                                                                                        increases with the system size.
electron per site, the electronic properties of the model
are governed by a competition of two insulating phases: a
Peierls (or band) insulator caused by the electron-lattice
                                                                                                                        D. Dynamical correlations at finite temperature
interaction and a Mott (or correlated) insulator caused
by the electron-electron interaction. Within the opti-                                                                  1. General considerations
cal conductivity both phases are signalled by an exci-
tation gap, which closes at the transition between the
                                                                                                                           In the preceding section we mentioned briefly that for
two phases. We illustrate this behavior in Figure 6 (a),
                                                                                                                        non-interacting electron systems or for interacting sys-
showing σ reg (ω) at strong electron-phonon coupling and
                                                                                                                        tems at finite temperature the calculation of dynamical
for increasing U . The data for the one-particle spectral
                                                                                                                        correlation functions is more involved, due to the required
function in Figure 6 (b) proves that simultaneously to the
                                                                                                                        double summation over all matrix elements of the mea-
optical gap also the charge gap vanishes at the quantum
                                                                                                                        sured operators. Chebyshev expansion, nevertheless, of-
phase transition point (Fehske et al., 2004, 2002).
                                                                                                                        fers an efficient way for handling these problems. To
                                                                                                                        be specific, let us derive all new ideas on the basis of
                                                                                                                        the optical conductivity σ(ω), which will be our primary
4. Spin structure factor                                                                                                application below. Generalizations to other dynamical
                                                                                                                        correlations can be derived without much effort.
  Apart from electron systems, of course, the KPM ap-                                                                      For an interacting system the extension of Eq. (146) is
proach works also for other quantum problems such as
                                                                                                                        given by
pure spin systems. To describe the excitation spec-
trum and the magnetic properties of the compound                                                                                        X |hk|J|qi|2 (e−βEk − e−βEq )
(VO)2 P2 O7 , some years ago we proposed the 2D spin                                                                      σ reg (ω) =                                         δ(ω − ωqk ) ,
Hamiltonian (Weiße et al., 1999)                                                                                                                              ZD ω
                                                                                                                                        k,q
                                                                                                                                                                         (152)
                                               X                                                  X                     with ωqk = Eq − Ek . Compared to Eq. (146) a straight-
                              H = Jb                             ~i,j · S
                                                     (1 + δ(−1) )S      ~i+1,j + Ja
                                                                         i                              ~i,j · S
                                                                                                        S      ~i,j+1
                                                                                                                        forward expansion of the finite temperature conductiv-
                                               i,j                                                i,j
                                               X                                                                        ity is spoiled by the presence of the Boltzmann weight-
                                     + J×             ~2i,j · S
                                                     (S       ~2i+1,j+1 + S
                                                                          ~2i+1,j · S
                                                                                    ~2i,j+1 ) , (149)                   ing factors. Some authors (Iitaka and Ebisuzaki, 2003)
                                               i,j                                                                      try to handle this problem by expanding these factors
                                                                                                                        in Chebyshev polynomials and performing a numerical
      ~i,j denote spin-1/2 operators on a square lattice.
where S                                                                                                                 time evolution subsequently, which, however, requires a
With this model we aimed at explaining the observation                                                                  new simulation for each temperature. A much simpler
                                                                                                                                             21

approach is based on the function
                   1 X
  j(x, y) =            |hk|J|qi|2 δ(x − Ek ) δ(y − Eq )            (153)
                   D
                       k,q

which we may interpret as a matrix element density. Be-
ing a function of two variables, j(x, y) can be expanded
with two-dimensional KPM,
                       N −1
                       X   µnm hnm gn gm Tn (x)Tm (y)
       j̃(x, y) =               p                                  (154)
                     n,m=0   π 2 (1 − x2 )(1 − y 2 )                       FIG. 8 (Color in online edition) The matrix element density
                                                                           j(x, y) for the 3D Anderson model with disorder W/t = 2 and
where j̃(x, y) refers to the rescaled j(x, y), gn are the                  12.
usual kernel damping factors (see Eq. (71)), and hnm
account for the correct normalization (see Eq. (95)). The
moments µnm are obtained from                                              of j(x, y) and reduced the numerical precision. Only re-
                                                                           cently, one of the authors generalized the Jackson kernel
                   Z1 Z1                                                   and obtained high resolution optical data for the Ander-
        µnm =                j̃(x, y)Tn (x)Tm (y) dx dy                    son model (Weiße, 2004). More results, in particular for
                                                                           interacting quantum systems at finite temperature, we
                   −1 −1
                                                                           present hereafter.
                   1 X
               =       |hk|J|qi|2 Tn (Ẽk ) Tm (Ẽq )
                   D                                               (155)
                         k,q
                                                                           2. Optical conductivity of the Anderson model
                    1 X
               =               hk|Tn (H̃)J|qihq|Tm (H̃)J|ki
                   D                                                          Since the Anderson model describes non-interacting
                         k,q
                   1                                                      fermions, the eigenstates |ki occurring in σ(ω) now de-
               =     Tr Tn (H̃)JTm (H̃)J ,                                 note single-particle wave functions and the Boltzmann
                   D
                                                                           weight has to be replaced by the Fermi function,
and again the trace can be replaced by an average over a
relatively small number R of random vectors |ri. The                                                Z∞
                                                                                 reg         1                                        
numerical effort for an expansion of order n, m < N                          σ         (ω) =             j(y + ω, y) f (y) − f (y + ω) dy
                                                                                             ω
ranges between 2RDN and RDN 2 operations, depend-                                                −∞
ing on whether memory is available for up to N vectors                                        X |hk|J|qi|2 (f (Ek ) − f (Eq ))
of the Hilbert space dimension D or not. Given the op-                                    =                                      δ(ω − ωqk ) .
erator density j(x, y) we find the optical conductivity by                                                        ω
                                                                                              k,q
integrating over Boltzmann factors,                                                                                              (157)
                                                                           Clearly, from a computational point of view this expres-
                           Z∞                                              sion is of the same complexity for both, zero and finite
      reg          1                                       
  σ         (ω) =               j(y + ω, y) e−βy − e−β(y+ω) dy             temperature, and indeed, compared to Sec. III.C, we
                  Zω
                         −∞                                                need the more advanced 2D KPM approach.
                   X |hk|J|qi|2 (e−βEk − e−βEq )                              Figure 8 shows the matrix element density j(x, y) cal-
               =                                          δ(ω − ωqk ) ,    culated for the 3D Anderson model on a D = 503 site
                                       ZDω                                 cluster. The expansion order is N = 64, and the mo-
                   k,q
                                                     (156)                 ment data was averaged over S = 10 disorder samples
and, as above, we get the partition function Z from an                     and R = 10 random start vectors each. Starting from a
integral over the density of states ρ(E). The latter can                   “shark fin” at weak disorder, with increasing W the den-
be expanded in parallel to j(x, y). Note that the cal-                     sity j(x, y) spreads in the entire energy plane, simultane-
culation of the conductivity at different temperatures is                  ously developing a sharp dip along x = y. A comparison
based on the same operator density j(x, y), i.e., it needs                 with Eq. (157) reveals that this dip is responsible for the
to be expanded only once for all temperatures.                             decreasing and finally vanishing DC conductivity of the
   Surprisingly, the basic steps of this approach                          model (Weiße, 2004). In Figure 9 we show the resulting
were suggested already ten years ago (Wang, 1994;                          optical conductivity at W/t = 12 for different chemical
Wang and Zunger, 1994), but — probably overlooking                         potentials µ and temperatures β = 1/T . Note that all
its potential — applied only to the zero-temperature re-                   curves are derived from the same matrix element density
sponse of non-interacting electrons. A reason for the poor                 j(x, y), which is now based on a D = 1003 site cluster,
appreciation of these old ideas may also lie in the use of                 expansion order N = 2048, an average over S = 440
non-optimal kernels, which did not ensure the positivity                   samples and only R = 1 random start vectors each.
                                                                                                                                                                                                                                             22

       0.014                                                                                  0.014                 1
                                                                                W = 12 t                                                                                                   ω0/t = 0.4                                     -1
                                                                                D = 100
                                                                                         3                                                                                                                        εp/t = 0.4




                                                                                                             Em
       0.012                                                                                  0.012




                                                                                                             ~
                                                                                S = 440




                                                                                                                             1D KPM
                                                                                                                                                                                                                  εp/t = 2.0
                                                                                N = 2048                                                                                                                                                  -2
                                                                                                                                                       2D KPM
        0.01                                                                                  0.01




                                                                                                                                                                                                                                               En
                                                                                                                    0                                                                                             εp/t = 3.0
 (ω)




                                                                                                       (ω)
       0.008                                                                                  0.008                                                                                                                                       -3




                                                                      /t
reg




                                                                                                      reg
                                                                                                                                                                                                                  εp/t = 4.0
                              t
                          0 .0




                                                                  00
σ




                                                                                                      σ
       0.006                                                                                  0.006




                                                                . 10
                                                                                                                                                                                                                                          -4
                        ...


                                                                                                                             ED                        1D KPM
                     47




                                                               1 ..
                                                                                                                   -1
                    -8.




       0.004                                                                                  0.004                 -1                             0            ~        1       0          10           20            30               40




                                                            0.0
                                                                                                                                                                En                                       n
                   µ=




                                                          β=
       0.002                                                                                  0.002

          0                                                                                   0              FIG. 10 (Color in online edition) Left: Schematic setup for
               0           5            10       15   0               5         10       15
                                  ω/t                                     ω/t                                the calculation of finite-temperature dynamical correlations
                                                                                                             for interacting quantum systems, which requires a separation
FIG. 9 (Color in online edition) Optical conductivity of the                                                 into parts handled by exact diagonalization (ED), 1D Cheby-
3D Anderson model at disorder W = 12 and for different                                                       shev expansion and 2D Chebyshev expansion. Right: The
chemical potentials µ and temperatures β = 1/T .                                                             lowest eigenvalues of the Holstein model on a six site chain
                                                                                                             for different electron-phonon coupling εp . The shaded region
                                                                                                             marks the lowest polaron band, which was handled separately
                                                                                                             when calculating the spectra in Figure 11.
3. Optical conductivity of the Holstein model

                                                                                                                         1                                                                                                          0.1
   Having discussed dynamical correlations for non-                                                                             T = 0.1 t
                                                                                                                                εp= 0.4 t
                                                                                                                                                                                     T = 0.1 t
                                                                                                                                                                                     εp= 4.0 t
                                                                                                                    0.8                                                                                                             0.08
interacting electrons, let us now come back to the case
                                                                                                              (ω)




                                                                                                                                                                                                                                               (ω)
                                                                                                                    0.6                                                                                                             0.06
of interacting systems. The setup described so far works                                                     reg




                                                                                                                                                                                                                                             reg
                                                                                                                    0.4                                                                                                             0.04
well for high temperatures, but as soon as T gets small we
                                                                                                             σ




                                                                                                                                                                                                                                             σ
                                                                                                                    0.2                                                                                                             0.02
experience the same problems as with thermal expecta-
                                                                                                                        0                                                                                                           0
tion values and static correlations. Again, the Boltzmann
                                                                                                                         1                                                                                                          0.1
factors put most of the weight to the margins of the do-                                                                          T=t
                                                                                                                                  εp= 0.4 t
                                                                                                                                                                                     T=t
                                                                                                                                                                                     εp= 4.0 t
                                                                                                                                                                                                                       C=0
                                                                                                                    0.8                                                                                                C=1          0.08
main of j(x, y), thus amplifying small numerical errors.                                                                                                                                                               C=6
                                                                                                              (ω)




                                                                                                                                                                                                                                               (ω)
                                                                                                                    0.6                                                                                                             0.06
To properly approach the limit T → 0 we therefore have
                                                                                                             reg




                                                                                                                                                                                                                                             reg
                                                                                                                    0.4                                                                                                             0.04
                                                                                                             σ




                                                                                                                                                                                                                                             σ
to separate the ground state and a few lowest excita-
                                                                                                                    0.2                                                                                                             0.02
tions from the rest of the spectrum in a fashion similar
                                                                                                                        0                                                                                                           0
to the static correlations in Sec. III.B. Since we start                                                                              -4      -2          0          2       4       -15   -10   -5      0    5       10       15
from a 2D expansion, the correlation function (optical                                                                                                  ω/t                                             ω/t
conductivity) now splits into three parts: a contribution
from the transitions (or matrix elements) between the                                                        FIG. 11 (Color in online edition) Finite temperature optical
separated eigenstates, a sum of 1D expansions for the                                                        conductivity of a single electron coupled to the lattice via a
transitions between the separated states and the rest of                                                     Holstein type interaction. Different colors illustrate how, in
the spectrum (see Sec. III.C), and a 2D expansion for all                                                    particular, the low-temperature spectra benefit from a sep-
transitions within the rest of the spectrum,                                                                 aration of C = 0, 1 or 6 low-energy states (Schubert et al.,
                                                                                                             2005c). The phonon frequency is ω0 /t = 0.4.
                        C−1
                        X                    C−1
                                             X D−1
                                                 X                                    D−1
                                                                                      X
 σ reg (ω) =                      σk,q +                  (σk,q + σq,k ) +                        σk,q ,
                                                                                                                  reg
                    k,q=0                    k=0 q=C                                 k,q=C                   For σ2D  (ω) we follow the scheme outlined in III.D.1, but
                    |         {z     }       |             {z                   }    |       {z       }      use projected moments
                         reg                           reg                                reg
                        σED  (ω)                      σ1D  (ω)                           σ2D  (ω)
                                                                                                  (158)                                    µnm = Tr(Tn (H̃)P JTm (H̃)P J)/D .                                                       (161)
with
                                                                                                                In Figure 10 we illustrate our setup schematically and
              |hk|J|qi|2 (e−βEk − e−βEq ) δ(ω − ωqk )                                                        show the lowest forty eigenvalues of the Holstein model,
       σk,q =                                         .                                           (159)
                               ZDω                                                                           Eq. (143), with a band filling of one electron. Separating
                                reg
                                                                                                             up to six states from the rest of the spectrum we obtain
The expansions required for σ1D     (ω) are carried out in                                                   the finite-temperature optical conductivity of the system,
analogy to Sec. III.C.3, but the resulting conductivities                                                    Figure 11. For high temperatures (T = t, see lower pan-
are weighted appropriately when all contributions are                                                        els) the separation of low-energy states is not necessary,
combined to σ reg (ω). Using the projection operator de-                                                     the conductivity curves for C = 0, 1 and 6 agree very
fined in Eq. (131), the corresponding moments read                                                           well. For low temperatures (T = 0.1t, see upper panels),
                                                                                                             the separation is crucial. Without any separated states
                                  µkn = hk|JP Tn (H̃)P J|ki .                                     (160)      (C = 0) the conductivity has substantial numerical errors
                                                                                                                                         23

                                                                    1
and can even become negative, if large Boltzmann factors
amplify infinitesimal numerical round-off errors of nega-                                            classical double exchange, n=0.5
tive sign. Splitting off the ground state (C = 1) or the          0.8
entire (narrow) polaron band (C = 6 for the present six-
site cluster), we obtain reliable, high-resolution spectra
down to the lowest temperatures. From a physics point             0.6
of view, at strong electron phonon coupling (right panels)




                                                              M
the conductivity shows an interesting transfer of spectral
                                                                  0.4   Heff , L=6
weight from high to low frequencies, if the temperature is              Heff , L=12
increased (see Schubert et al. (2005c) for more details).               Alonso et al. (2001), L=6
   With this discussion of optical conductivity as a finite       0.2   Alonso et al. (2001), L=12
                                                                        Motome et al. (2000), L→∞
temperature dynamical correlation function we conclude                  Cluster MC, L=6
the section on direct applications of KPM. Of course, the               Cluster MC, L=12
                                                                   0
described techniques can be used for the solution of many           0         0.05           0.1             0.15        0.2            0.25
other interesting and numerically demanding problems,                                                  T/t
but an equally important field of applications emerges,       FIG. 12 (Color in online edition) Magnetization as a func-
when KPM is embedded into other numerical or analyt-          tion of temperature for the classical double-exchange model
ical techniques, which is the subject of the next section.    at doping n = 0.5. We compare data obtained from
                                                              the effective model Heff (see text), from a hybrid Monte
                                                              Carlo approach (Alonso et al., 2001), the Truncated Poly-
IV. KPM AS A COMPONENT OF OTHER METHODS                       nomial Expansion Method (Motome and Furukawa, 2000,
                                                              2001), and from a KPM based Cluster Monte Carlo tech-
                                                              nique (Weiße et al., 2005). L denotes the size of the under-
A. Monte Carlo simulations
                                                              lying three-dimensional cluster, i.e., D = L3 is the dimension
                                                              of the fermionic problem.
   In condensed matter physics some of the most intensely
studied materials are affected by a complex interplay of
many degrees of freedom, and when deriving suitable           tageous to replace the above single-spin updates by up-
approximate descriptions we frequently arrive at mod-         dates of the whole spin background. The first imple-
els, where non-interacting fermions are coupled to classi-    mentation of such ideas was given in terms of an hybrid
cal degrees of freedom. Examples are colossal magneto-        Monte Carlo algorithm (Alonso et al., 2001), which com-
resistant manganites (Dagotto, 2003) or magnetic semi-        bines an approximate time evolution of the spin system
conductors (Schliemann et al., 2001), where the classi-       with a diagonalization of the fermionic problem by Leg-
cal variables correspond to localized spin degrees of free-   endre expansion, and requires a much smaller number of
dom. We already introduced such a model when we dis-          MC accept-reject steps. However, this approach has the
cussed the limit S → ∞ of the double-exchange model,          drawback of involving a molecular dynamics type simu-
Eq. (117). The properties of these systems, e.g. a ferro-     lation of the classical degrees of freedom, which is a bit
magnetic ordering as a function of temperature, can be        complicated and which may bias the system in the direc-
studied by standard MC procedures. However, in con-           tion of the assumed approximate dynamics.
trast to purely classical systems the energy of a given          Focussing on the problem of classical double ex-
spin configuration, which enters the transition probabili-    change, Eq. (117), we therefore proposed a third ap-
ties, cannot be calculated directly, but requires the solu-   proach (Weiße et al., 2005), which combines the advan-
tion of the corresponding non-interacting fermion prob-       tages of KPM with the highly efficient Cluster MC al-
lem. This is usually the most time consuming part, and        gorithms (Janke, 1998; Krauth, 2004; Wolff, 1989). In
an efficient MC algorithm should therefore evaluate the       general, for a classical MC algorithm the transition prob-
fermionic trace as fast and as seldom as possible.            ability from state a to state b can be written as
   The first requirement can be matched by using KPM
                                                                            P (a → b) = A(a → b)P̃ (a → b) ,                       (162)
for calculating the density of states of the fermion sys-
tem, which by integration over the Fermi function yields      where A(a → b) is the probability of considering the move
the energy of the underlying spin configuration. Com-         a → b, and P̃ (a → b) is the probability of accepting the
bined with standard Metropolis single-spin updates this       move a → b. Given the Boltzmann weights of the states
led to the first MC simulations of double-exchange sys-       a and b, W (a) and W (b), detailed balance requires that
tems (Motome and Furukawa, 1999, 2000, 2001) on rea-
sonably large clusters (83 sites), which were later im-                   W (a)P (a → b) = W (b)P (b → a) ,                        (163)
proved by replacing full traces by trace estimates and
                                                              which can be fulfilled with a generalized Metropolis al-
by increasing the efficiency of the matrix vector multi-
                                                              gorithm
plications (Alvarez et al., 2005; Furukawa and Motome,                                                 
2004).                                                                                   W (b)A(b → a)
                                                                    P̃ (a → b) = min 1,                   .     (164)
   To fulfil the second requirement it would be advan-                                   W (a)A(a → b)
                                                                                                                                24

In the standard MC approach for spin systems only a             other classical variables (Alvarez et al., 2005), and as yet
single randomly chosen spin is flipped. Hence, A(a →            the potential of such combined approaches is certainly
b) = A(b → a) and the probability P̃ (a → b) is usually         not fully exhausted.
much smaller than 1, since it depends on temperature              The next application, which makes use of KPM as a
via the weights W (a) and W (b). This disadvantage can          component of a more general numerical approach, brings
be avoided by a clever construction of clusters of spins,       us back to interacting quantum systems, in particular,
which are flipped simultaneously, such that the a priori        correlated electron systems with strong local interactions.
probabilities A(a → b) and A(b → a) soak up any differ-
ence in the weights W (a) and W (b). We then arrive at
the famous rejection-free cluster MC algorithms (Wolff,         B. Cluster Perturbation Theory (CPT)
1989), which are characterized by P̃ (a → b) = 1.
                                                                1. General features of CPT
   For the double-exchange model (117) we cannot expect
to find an algorithm with P̃ (a → b) = 1, but even a
                                                                   Earlier in this review we have demonstrated the ad-
method with P̃ (a → b) = 0.5 would be highly efficient.         vantages of the Chebyshev approach for the calculation
The amplitude of the hopping matrix element (118) is            of spectral functions, optical conductivities and struc-
given by the cosine of half the relative angle between          ture factors of complicated interacting quantum systems.
                                     ~i · S
neighboring spins, or |tij |2 = (1 + S    ~j )/2. Averaging
                                                                However, owing to the finite size of the considered sys-
over the fermionic degrees of freedom, we thus arrive at        tems, quantities like the spectral function A(~k, ω) could
an effective classical spin model                               only be calculated for a finite set of independent mo-
                            Xq                                  menta ~k. The interpretation of this “discrete” data may
               Heff = −Jeff       1+S ~i · S
                                           ~j ,       (165)     sometimes be less convenient,  R e.g.   the ~k-integrated one-
                            hiji                                                                   d    ~
                                                                electron density ρ(ω) = dk A(k, ω) does not show
where the particle density n√approximately defines the          bands but only discrete poles which are grouped to band-
coupling, Jeff ≈ n(1 − n)/ 2. Similar to a classical            like structures. Although this does not substantially bias
Heisenberg model, the Hamiltonian Heff is a sum over            the interpretation it is desirable to restore the transla-
contributions of single bonds, and we can therefore con-        tional symmetry of the lattice and reintroduce an infinite
struct a cluster algorithm with P̃ (a → b) = 1. Surpris-        momentum space.
ingly, the simulation of this pure spin model yields mag-          With       the      Cluster      Perturbation       Theory
netization data, which almost perfectly matches the re-         (CPT) (Gros and Valentí, 1994; Sénéchal et al., 2000;
sults for the full classical double-exchange model at dop-      Sénéchal et al., 2002) a straightforward way to perform
ing n = 0.5, see Figure 12.                                     this task approximatively has recently been devised.
   For simulating the coupled spin fermion model (117)          To describe it in a nutshell, let us consider a model of
we suggested to apply the single cluster algorithm for          interacting fermions on a one-dimensional chain
Heff until approximately every spin in the system has                            X †                       X
                                                                       H = −t       (ci+1,σ ci,σ + H.c.) +      Ui .     (166)
been flipped once, thereby keeping track of all a priori
                                                                                 iσ                           i
probabilities A(a → b) of subsequent cluster flips. Then
for the new spin configuration the energy of the electron       Here Ui denotes a local interaction, e.g. Ui = U ni↑ ni↓
system is evaluated with the help of KPM. Note how-             for the Hubbard model. CPT starts by breaking up the
ever, that for a reliable discrimination of Heff and the full   infinite system into short finite chains of L sites each
fermionic model (117) the energy calculation needs to be        (clusters), which all are equivalent due to translational
very precise. For the moment calculation we therefore           symmetry. From the Green function of a finite chain,
relied on complete trace summations instead of stochas-         Gcij (ω) with i, j = 0, . . . , L − 1, which is calculated ex-
tic estimates. The KPM step is thus no longer linear            actly by a suitable numerical method, the Green function
in D, but still much faster than a full diagonalization         G(k, ω) of the infinite chain is obtained by reintroduc-
of the bilinear fermionic model. Based on the resulting         ing the hopping between the segments. This inter-chain
energy, the new spin configuration is accepted with the         hopping is treated on the level of a random phase ap-
probability (164). Figure 12 shows the magnetization            proximation, which neglects correlations between differ-
of the double-exchange model as a function of tempera-          ent chains. The Green function Gnm         ij (ω) is then given
ture for n = 0.5. Except for small deviations near the          through a Dyson equation
critical temperature the data obtained with the new ap-                                          X                    ′
                                                                                                                        m′ m
proach compares well with the results of the hybrid MC            Gnm               c
                                                                    ij (ω) = δnm Gij (ω) +            Gcii′ (ω)Vinm
                                                                                                                 ′ j ′ Gj ′ j (ω) ,
approach (Alonso et al., 2001), and due to the low nu-                                        i′ ,j ′ ,m′
merical effort rather large systems can be studied.                                                                   (167)
   Of course, the combination of KPM and classical              where Vijnm = −t(δn,m+1 δi0 δj,L−1 + δn,m−1 δi,L−1 δj0 ) de-
Monte Carlo not only works for spin systems. We may             scribes the inter-chain hopping and upper indices num-
also think of models involving the coupling of electronic       ber the different clusters. A partial Fourier transform
degrees of freedom to adiabatic lattice distortions or          of the inter-chain hopping, Vij (Q) = −t(ei Q δi0 δj,L−1 +
                                                                                                                                                   25


                       Lorentz kernel                      Jackson kernel
                                                                                      it turns out, the Jackson kernel is an inadequate choice
                                                                                      here, since already for the non-interacting tight-binding
                                                                                      model it introduces spurious structures into the spectra.
                                                                                      The failure can be attributed to the shape of the Jackson
k=0                                                                             k=0
                                                                                      kernel: Being optimized for high resolution, a pole in the
                                                                                      Green function will give a sharp peak with most of its
                                                                                      weight concentrated at the center, and rapidly decaying
                                                                                      tails. The reconstructed (cluster) Green function there-
                                                                                      fore does not satisfy the correct analytical properties re-
                                                                                      quired in the CPT step. To guarantee these properties,
                                                                                      instead, we use the Lorentz kernel, which we constructed
                                                                                      in Sec. II.C.4 to mimic the effect of a finite imaginary
k=π                                                                             k=π   part in the energy argument of a Green function. Us-
  -4      -2
               ω/t
                   0          2         4   -4   -2    0
                                                      ω/t
                                                                  2         4         ing this kernel for the reconstruction of Gcij (ω) the CPT
                                                                                      works perfectly (cf. Figure 13).
FIG. 13 Spectral function for non-interacting tight-binding                              To provide further examples we present results for two
electrons. Based on the Lorentz kernel CPT exactly repro-                             different interacting models where the cluster Green func-
duces the infinite system result (left), the Jackson kernel does                      tion Gcij (ω) has been calculated through a Chebyshev ex-
not have the correct analytical properties, therefore CPT can-                        pansion as in Eq. (140). Using Gcij (ω) = Gcji (ω) (no mag-
not close the finite size gap at k = π/2 (right).                                     netic field), for a L-site chain L diagonal and L(L − 1)/2
                                                                                      off-diagonal elements of Gcij (ω) have to be calculated.
                                                                                      The latter can be reduced to Chebyshev iterations for
e− i Q δi,L−1 δj0 ), gives the infinite-lattice Green function                                          (†)    (†)
in a mixed representation                                                             the operators ci + cj , which allows application of the
                                                                                    “doubling trick” (see the remark after Eq. (138)). How-
                                    Gc (ω)                                            ever, the numerical effort can be further reduced by a
              Ĝij (Q, ω) =                              (168)                        factor 1/L: If we keep the ground state |0i of the system
                               1 − V (Q)Gc (ω) ij
                                                                                                                                             †
                                                                                      we can calculate the moments µij     n = h0|ci Tn (H̃)cj |0i for
for a momentum vector Q of the super-lattice of finite                                                                c
                                                                                      L elements i = 1, . . . , L of Gij (ω) in a single Chebyshev
chains and cluster indices i, j. Finally, from this mixed                             iteration. To achieve a similar reduction within the Lanc-
representation the infinite lattice Green function in mo-                             zos recursion we had to explicitly construct the eigen-
mentum space is recovered in the CPT approximation as                                 states to the Lanczos eigenvalues. Then the factor 1/L
a simple Fourier transform                                                            is exceeded by at least N D additional operations for the
                                                                                      construction of N eigenstates of a D-dimensional sparse
                   1X                                                                 matrix. Hence using KPM for the CPT cluster diagonal-
       G(k, ω) =         exp(i(i − j)k) Ĝij (Lk, ω) .                  (169)
                   L i,j                                                              ization the numerical effort can be reduced by a factor of
                                                                                      1/L in comparison to the Lanczos recursion.
   The reader should be aware that restoring translational
symmetry in the CPT sense is different from perform-
ing the thermodynamic limit of the interacting system.                                2. CPT for the Hubbard model
The CPT may be understood as a kind of interpolation
scheme from the discrete momentum space of a finite                                      As a first example we consider the 1D Hubbard model
cluster to the continuous ~k-values of the infinite lattice.                          (Eq. (148) with g = ω0 = 0), which is exactly solvable
The amount of information attainable from the solution                                by Bethe ansatz (Essler et al., 2005) and was also exten-
of a finite cluster problem does however not increase. Es-                            sively studied with DDMRG (Jeckelmann et al., 2000).
pecially finite-size effects affecting the interaction prop-                          It thus provides the opportunity to assess the precision
erties are by no means reduced, but still determined                                  of the KPM-based CPT. The top left panel of Figure 14
through the size of the underlying cluster. Nevertheless,                             shows the one-particle spectral function at half-filling,
CPT yields appealing presentations of the finite-cluster                              calculated on the basis of L = 16 site clusters and an
data, which can ease its interpretation.                                              expansion order of N = 2048. The matrix dimension is
   At present, all numerical studies within the CPT con-                              D ≈ 1.7 · 108. Remember that the cluster Green function
text use Lanczos recursion for the cluster diagonaliza-                               is calculated for a chain with open boundary conditions.
tion, thus suffering from the shortcomings we discussed                               The reduced symmetry compared to periodic boundary
earlier. As an alternative, we prefer to use the formalism                            conditions results in a larger dimension of the Hilbert
introduced in Sec. III.C, which is much better suited for                             space that has to be dealt with numerically. In the top
the calculation of spectral properties in a finite energy                             right panel the dots show the Bethe ansatz results for a
interval.                                                                             L = 64 site chain, and the lines denote the L → ∞ spinon
   On applying the CPT crucial attention has to be paid                               and holon excitations each electron separates into (spin-
to the kernel used in the reconstruction of Gcij (ω). As                              charge separation). So far the Bethe ansatz does not
                                                                                                                                                                                                                           26

                                                                               10




                                                                                    E(k) / t = [Eholon(kh) + Espinon(ks)] / t
                                                                                                                                                                                         ground-state dispersion
                                                                               8                                                                                                         tight binding dispersion
                                                                                                                                                                                         phonon excitation threshold
                                                                               6

                                                                               4

                                                                               2
                                                                                                                                k=0                                                                                        k=0
                                                                               0

                                                                               -2




                                                                                                                                A(k,ω)




                                                                                                                                                                                                                           A(k,ω)
                                                                               -4

                                                                               -6
                                         0         1             2        3
                                                       k = kh + ks
                                                                                                                                k=π                                                                                        k=π
                                                                                                                                              (a)    ω0/t=1.0, εp=0.5, Lc=16       (b)          ω0/t=1.0, εp=4, Lc=6
                                                                     DDMRG
                                 1                                   CPT+KPM                                                             -3     -2    -1    0     1     2      3   -4      -2       0        2         4
             1
                                                                                                                                                           ω/t                                    ω/t
                    Gσ(k,ω)




           0.8                0.5
                                                                                                                                                                               +
                                                                -Im G                                                           FIG. 15 Spectral function A (k, ω) of a single electron in the
 Aσ(k,ω)




                                0
                                                                                                                                Holstein model (corresponding to Ne = 0 in Eq. (145)). For
           0.6
                                                                                                                                weak electron-phonon coupling the original band is still very
                                                   Re G                                                                         pronounced (left), for intermediate-to-strong coupling many
           0.4                -0.5                                      k=π                                                     narrow polaron bands develop (right). The cluster size is
                                     2         4                 6              8                                               L = 16 (left) or L = 6 (right) and the expansion order N =
                                                       ω/t
           0.2                                                                                                                  2048. See Hohenadler et al. (2003) for similar data based on
                                                                     k=π/2
                                                                                                                                Lanczos recursion.
            0
             2                  4                       6                           8
                                         ω/t                                                                                    3. CPT for the Holstein model

FIG. 14 (Color in online edition) Spectral function of the                                                                         Our second example is the spectral function of a single
1D Hubbard model for half-filling and U = 4t. Top left:                                                                         electron in the Holstein model, i.e., Eq. (148) with U = 0.
CPT result with cluster size L = 16 and expansion order                                                                         Here, as a function of the electron-phonon interaction,
N = 2048. For similar data based on Lanczos recursion                                                                           polaron formation sets in and the band width of the re-
see Sénéchal et al. (2000). Top right: Within the exact Bethe                                                                 sulting quasi particles becomes extremely narrow at large
ansatz solution each electron separates into the sum of inde-                                                                   coupling strength. Figure 15 illustrates this behavior for
pendent spinon (red dashed) and holon (green) excitations.                                                                      two values of the electron-phonon coupling εp = g 2 ω0 .
The dots mark the energies of a 64-site chain. Bottom: CPT
                                                                                                                                For weak coupling the original one-electron band is still
data compared to selected DDMRG results for a system with
L = 128 sites, open boundary conditions and a broadening of
                                                                                                                                clearly visible (dot-dashed line), but the dispersion-less
ǫ = 0.0625t. Note that in DDMRG the momenta are approx-                                                                         phonon (dashed line) cuts in approximately at an energy
imate.                                                                                                                          ω0 above the band minimum, causing the formation of
                                                                                                                                a polaron band (solid line; calculated with the approach
                                                                                                                                of Bonča et al. (1999)), an avoided-crossing like gap and
                                                                                                                                a number of finite-size features. For strong coupling the
                                                                                                                                spectral weight of the electron is distributed over many
                                                                                                                                narrow polaron bands separated approximately by the
                                                                                                                                bare phonon frequency ω0 .
allow for a direct calculation of the structure factor, the                                                                        In all these cases, KPM works as a reliable high-
data thus represents only the position and density of the                                                                       resolution cluster solver, and using the concepts from
eigenstates, but is not weighted with the matrix elements                                                                       Sec. III.D we could also extend these calculations to finite
                    (†)
of the operators ckσ . Although for an infinite system we                                                                       temperature. Probably, CPT is not the only approximate
would expect a continuous response, the CPT data shows                                                                          technique that profits from the simplicity and stability of
some faint fine-structure. A comparison with the finite-                                                                        KPM, and the range of its applications can certainly be
size Bethe ansatz data suggests that these features are                                                                         extended.
an artifact of the finite-cluster Greens function which the
CPT spectral function is based on. The fine-structure is
also evident in the lower panel of Figure 14, where we                                                                          V. KPM VERSUS OTHER NUMERICAL APPROACHES
compare with DDMRG data for a L = 128 site system.
Otherwise the CPT nicely reproduces all expected fea-                                                                             After we have given a very detailed description of the
tures, like the excitation gap, the two pronounced spinon                                                                       Kernel Polynomial Method and presented a wide range
and holon branches, and the broad continuum. Note also,                                                                         of applications, let us now classify the method in the
that CPT is applicable to all spatial dimensions, whereas                                                                       context of numerical many-particle techniques and com-
DDMRG works well only for 1D models.                                                                                            ment on a number of other numerical approaches that
                                                                                                                                                              27

                                                                            20                                                                            2
are closely related to KPM.
                                                                                                                         KPM (Jackson kernel)
                                                                                                                         MEM (Silver, Röder 1997)

                                                                            15                                       N = 512                              1.5




                                                                                                                                                                step function
                                                             five δ-peaks
                                                                            10                                                                            1



A. KPM and dedicated many-particle techniques                               5                                                                             0.5




   In the previous sections we already compared KPM                          0                                                                            0
                                                                                 -0.1 -0.05    0      0.05   0.1   0.4   0.45    0.5    0.55        0.6
data and results of other numerical many-particle tech-                                        x                                  x
niques. Nevertheless, it seems appropriate to add a
                                                              FIG. 16 (Color in online edition) Comparison of a KPM and a
few comments about the general concept of such cal-
                                                              MEM approximation to a spectrum consisting of five isolated
culations and the role KPM-like methods play in the           δ-peaks, and to a step function. The expansion order is N =
field of many-particle physics and complex quantum sys-       512. Clearly, for the δ-peaks MEM yields a higher resolution,
tems. The numerical study of interacting quantum many-        but for the step function the Gibbs oscillations return.
particle systems is complicated by the huge Hilbert space
dimensions involved, which usually grow exponentially
with the number of particles or the system size. There        B. Close relatives of KPM
are different strategies to cope with this: In Monte
Carlo approaches only part of the Hilbert space is sam-         Having compared KPM to specialized many-particle
pled stochastically, thereby trying to capture the es-        methods, let us now discuss more direct competitors of
sential physics with an appropriate weighting mecha-          KPM, i.e., methods that share the broad application
nism. On the other hand, variational methods, like            range and some of its general concepts.
DMRG (Peschel et al., 1999; Schollwöck, 2005) or the
specialized approach of Bonča et al. (1999), aim at re-
ducing the Hilbert space dimension in an intelligent way      1. Chebyshev expansion and Maximum Entropy Methods
by discarding unimportant states, which, for instance,
contribute only at high temperature. Compared to such           The first of these approaches, the combination of
methods KPM is much more basic: It is designed only for       Chebyshev expansion and Maximum Entropy (MEM), is
the fast and stable calculation of the spectral properties    basically an alternative procedure to transform moment
of a given matrix and of related correlations. Choosing a     data µn into convergent approximations of the considered
suitable Hilbert space or optimizing the basis is the mat-    function f (x). To achieve this, instead of (or in addition
ter of the user or of external programs. It is thus a more    to) applying kernel polynomials, an entropy
general approach, which can be used directly or embed-                                   Z 1
ded into other methods, as we illustrated in the preced-
ing section. Of course, this simplicity and general appli-          S(f, f0 ) =                    (f (x)−f0 (x)−log(f (x)/f0 (x))) dx (170)
                                                                                              −1
cability come at a certain price: For interacting many-
particle models the system sizes that can be studied by       is maximized under the constraint that the moments of
using KPM directly are usually much smaller, compared         the estimated f (x) agree with the given data. The func-
to DMRG and Monte Carlo. Note however, that both of           tion f0 (x) describes our initial knowledge about f (x),
the latter methods have limitations too: For many inter-      and may in the worst case just be a constant. Being
esting models Monte Carlo methods are plagued by the          related to Maximum Entropy approaches to the clas-
infamous sign problem, which is not present in KPM.           sical moment problem (Mead and Papanicolaou, 1984;
When it comes to the calculation of dynamical correla-        Turek, 1988), for the case of Chebyshev moments dif-
tion functions Monte Carlo approaches rely on power mo-       ferent implementations of the method have been sug-
ments. The reconstruction of correlation functions from       gested (Bandyopadhyay et al., 2005; Silver and Röder,
power moments is known to be an ill-conditioned prob-         1997; Skilling, 1988). Since for a given set of N moments
lem, in particular, if the moments are subject to sta-        µn the approximation to the function f (x) is usually not
tistical noise. The resolution of Monte Carlo results is      restricted to a polynomial of degree N − 1, compared
therefore much smaller compared to the data obtained          to the KPM with Jackson kernel the Maximum Entropy
with KPM. The DMRG method develops its full poten-            approach usually yields estimates of higher resolution.
tial only in one spatial dimension and for short ranged       However, this higher resolution results from adding a pri-
interactions. In addition, the calculation of dynamical       ori assumptions and not from a true information gain (see
correlations is limited to zero temperature, with only        also Figure 16). The resource consumption of Maximum
a few exceptions (Sirker and Klümper, 2005). None of         Entropy is generally much higher than the N log N be-
these restrictions apply to KPM.                              havior we found for KPM. In addition, the approach is
                                                                                                                       28

non-linear in the moments and can occasionally become        this loss of orthogonality usually signals the convergence
unstable for large N . Note also that as yet Maximum En-     of extremal eigenstates, and the algorithm then starts to
tropy methods have been derived only for positive quan-      generate artificial copies of the converged states. For the
tities, f (x) > 0, such as densities of states or strictly   calculation of spectral densities or correlation functions
positive correlation functions.                              this means that the information content of the αn and
   Maximum Entropy, nevertheless, is a good alternative      βn does no longer increase proportionally to the num-
to KPM, if the calculation of the µn is particularly time    ber of iterations. Unfortunately, this deficiency can only
consuming. Based on only a moderate number of mo-            be cured with more complex variants of the algorithm,
ments it yields very detailed approximations of f (x), and   which also increase the resource consumption. Cheby-
we obtained very good results for some computationally       shev expansion is free from such defects, as there is a
demanding problems (Bäuml et al., 1998).                    priori no orthogonality between the |φn i.
                                                                The reconstruction of the considered function from its
                                                             moments µn or coefficients αn , βn , respectively, is also
2. Lanczos recursion                                         faster and simpler within the KPM, as it makes use of
                                                             Fast Fourier Transformation. In addition, the KPM is
                                                             a linear transformation of the moments µn , a property
   The Lanczos Recursion Method is certainly the
                                                             we used extensively above when averaging moment data
most capable competitor of the Kernel Polynomial
                                                             instead of the corresponding functions. Continued frac-
Method (Dagotto, 1994). It is based on the Lanczos
                                                             tions, in contrast, are non-linear in the coefficients αn ,
algorithm (Lanczos, 1950), a method which was ini-
                                                             βn . A further advantage of KPM is our good under-
tially developed for the tridiagonalization of Hermitian
                                                             standing of its convergence and resolution as a function
matrices and later evolved to one of the most power-
                                                             of the expansion order N . For the Lanczos algorithm
ful methods for the calculation of extremal eigenstates
                                                             these issues have not been worked out with the same
of sparse matrices (Cullum and Willoughby, 1985). Al-
                                                             rigor.
though ideas like the mapping of the classical moment
problem to tridiagonal matrices and continued fractions         We therefore think that the Lanczos algorithm is an
                                                             excellent tool for the calculation of extremal eigenstates
have been suggested earlier (Gordon, 1968), the use of
the Lanczos algorithm for the characterization of spec-      of large sparse matrices, but for spectral densities and
                                                             correlation functions the Kernel Polynomial Method is
tral densities (Haydock et al., 1972, 1975) was first pro-
posed at about the same time as the Chebyshev expan-         the better choice. Of course, the advantages of both al-
                                                             gorithms can be combined, e.g. when the Chebyshev
sion approaches, and in principle Lanczos recursion is
also a kind of modified moment expansion (Benoit et al.,     expansion starts from an exact eigenstate that was cal-
                                                             culated with the Lanczos algorithm.
1992; Lambin and Gaspard, 1982). Its generalization
from spectral densities to zero temperature dynamical
correlation functions was first given in terms of contin-
                                                             3. Projection methods
ued fractions (Gagliano and Balseiro, 1987), and later
also an approach based on the eigenstates of the tridiago-
nal matrix was introduced and termed Spectral Decoding          Projection methods were developed mainly in the con-
Method (Zhong et al., 1994). This technique was then         text of electronic structure calculations or tight-binding
generalized to finite temperature (Jaklič and Prelovšek,   molecular dynamics, which both require knowledge of
1994, 2000), and, in addition, some variants of the          the total energy of a non-interacting electron system or
approach for low temperature (Aichhorn et al., 2003)         of related expectation values (Goedecker, 1999; Ordejón,
and based on the micro-canonical ensemble (Long et al.,      1998). The starting point of these methods is the den-
2003) have been proposed recently.                           sity matrix F = f (H), where f (E) again represents
                                                             the Fermi function. Thermal expectation values, total
   To give an impression, in Table II we compare the
                                                             energies and other quantities of interest are then ex-
setup for the calculation of a zero temperature dynamical
                                                             pressed in terms of traces over F and corresponding op-
correlation function within the Chebyshev and the Lanc-
                                                             erators (Goedecker and Colombo, 1994). For instance,
zos approach. The most time consuming step for both
                                                             the number of electrons and their energy are given by
methods is the recursive construction of a set of vectors
                                                             Nel = Tr(F ) and E = Tr(F H), respectively. To obtain
|φn i, which in terms of scalar products yield the moments
                                                             a numerical approach that is linear in the dimension D
µn of the Chebyshev series or the elements αn , βn of the
                                                             of H, F is expanded as a series of polynomials or other
Lanczos tridiagonal matrix. In terms of the number of
                                                             suitable functions in the Hamiltonian H,
operations the Chebyshev recursion has a small advan-
tage, but, of course, the application of the Hamiltonian                                        N −1
as the dominant factor is the same for both methods. As                              1          X
                                                                        F =          β(H−µ)
                                                                                            =          αi pi (H) ,   (171)
a drawback, at high expansion order the Lanczos itera-                        1+e               i=0
tion tends to lose the orthogonality between the vectors
|φn i, which it intends to establish by construction. When   and the above traces are replaced by averages over ran-
the Lanczos algorithm is applied to eigenvalue problems      dom vectors |ri. Chebyshev polynomials are a good basis
                                                                                                                                            29


Chebyshev / KPM                                  complexity      Lanczos recursion                                              complexity
Initialization:                                                  Initialization:
                                                                                          p
               H̃ = (H − b)/a                                                        β0 = h0|A† A|0i
        |φ0 i = A|0i, |φ1 i = H̃|φ0 i                                          |φ0 i = A|0i/β0 , |φ−1 i = 0
        µ0 = hφ0 |φ0 i, µ1 = hφ1 |φ0 i


Recursion for 2N moments µn :                      O(N D)        Recursion for N coefficients αn , βn :                              O(N D)

         |φn+1 i = 2H̃|φn i − |φn−1 i                                  |φ′ i = H|φn i − βn |φn−1 i,   αn = hφn |φ′ i
                                                                                                         p
        µ2n+2 = 2hφn+1 |φn+1 i − µ0                                |φ′′ i = |φ′ i − αn |φn i,     βn+1 = hφ′′ |φ′′ i
          µ2n+1 = 2hφn+1 |φn i − µ1                                                |φn+1 i = |φ′′ i/βn+1


→ very stable                                                    → tends to lose orthogonality
Reconstruction in three simple steps:            O(M log M )     Reconstruction via continued fraction                               O(N M )
 Apply kernel: µ̃n = gn µn                                                      1                       β02
                                                                 f (z) = −        Im
 Fourier transform: µ̃n → f˜(ω̃i )                                              π                             β12
                                                                                       z − α0 −
                     f˜[(ωi − b)/a]                                                                                β22
 Rescale: f (ωi ) = p                                                                             z − α1 −
                   π a2 − (ωi − b)2                                                                           z − α2 − . . .
                                                                                    where z = ωi + i ǫ


→ procedure is linear in µn                                      → procedure is non-linear in αn , βn
→ well defined resolution ∝ 1/N                                  → ǫ is somewhat arbitrary

TABLE II Comparison of Chebyshev
                            P          expansion and Lanczos recursion for the calculation of a zero-temperature dynamical
correlation function f (ω) = n |hn|A|0i|2 δ(ω − ωn ). We assume N matrix vector multiplications with a D-dimensional sparse
matrix H, and a reconstruction of f (ω) at M points ωi .


for such an expansion of F (Goedecker and Teter, 1995),                 0.01
and the corresponding approaches are thus closely related
to the KPM setup we described in Sec. III.A. Note how-
ever, that the expansion in Eq. (171) has to be repeated
whenever the temperature 1/β or the chemical poten-
tial µ is modified. This is particularly inconvenient, if µ
                                                                σ(ω)




needs to be adjusted to fix the electron density of the sys-
tem. To compensate for this drawback, at least partially,              0.001
we can make use of the fact that in Eq. (171) the ex-                                        Iitaka, W=14.9, N=256
                                                                                                                      3

panded function and its expansion coefficients are known                                                      3
                                                                                             KPM, W=15, N=50 , M=1024, 240 samples
in advance: Using implicit methods (Niklasson, 2003) the                                                          3
                                                                                             KPM, W=15, N=100 , M=2048, 280 samples
order N approximation of F can be calculated with only                                                            3
                                                                                             KPM, W=15, N=200 , M=2048, 8 samples
O(log N ) matrix vector operations involving the Hamil-
tonian H. The total computation time for one expansion                                 0.1                        1                    10
is thus proportional to D log N , compared to DN if the                                                    ω/t
sum in Eq. (171) is evaluated iteratively, e.g., on the basis   FIG. 17 (Color in online edition) The optical conductivity of
of the recursion relation Eq. (10).                             the Anderson model, Eq. (111), calculated with KPM and a
                                                                projection method (Iitaka, 1998). The disorder is W ≈ 15;
                                                                temperature and chemical potential read T = 0 and µ = 0.

   Projection methods can also be used for the calcula-
tion of dynamical correlation functions. In this case the
expansion of the density matrix, which accounts for the
thermodynamics, is supplemented by a numerical time
evolution. Hence, a general correlation function is writ-
                                                                                                                             30

ten as                                                             numerical techniques will become one of the major future
                    Z∞                                             research directions. Certainly not only classical MC sim-
                                                                   ulations and CPT, but potentially also other cluster ap-
   hA; Biω = lim         ei(ω+i ǫ)t Tr(ei Ht A e− i Ht BF ) dt ,   proaches (Maier et al., 2005) or quantum MC can profit
              ǫ→0
                    0                                              from the concepts outlined in this review.
                                                    (172)
and the e± i Ht terms are handled by standard
methods,      such as Crank-Nicolson (Press et al.,
                                                                   Acknowledgements
1986),       Suzuki-Trotter      (de Vries and De Raedt,
1993), and, very efficiently, Chebyshev expan-
                                                                      We thank A. Basermann, B. Bäuml, G. Hager,
sion (Dobrovitski and De Raedt, 2003).         Of course,
                                                                   M. Hohenadler, E. Jeckelmann, M. Kinateder, G. Schu-
not only the fermionic density matrix F but also its
                                                                   bert, and in particular R.N. Silver for fruitful dis-
interacting counterpart, exp(−βH), can be expanded
                                                                   cussions and technical support. Most of the calcula-
in polynomials, which leads to similar methods for
                                                                   tions could only be performed with the generous grant
interacting quantum systems (Iitaka and Ebisuzaki,
                                                                   of resources by the John von Neumann-Institute for
2003).
                                                                   Computing (NIC Jülich), the Leibniz-Rechenzentrum
   To give an impression, in Figure 17 we compare the
                                                                   München (LRZ), the High Performance Computing Cen-
optical conductivity of the Anderson model calculated
                                                                   ter Stuttgart (HLRS), the Norddeutscher Verbund für
with KPM (see Sec. III.D.2) and with a projection ap-
                                                                   Hoch- und Höchstleistungsrechnen (HLRN), the Aus-
proach (Iitaka, 1998). Over a wide frequency range the
                                                                   tralian Partnership for Advanced Computing (APAC)
data agrees very well, but at low frequency the projec-
                                                                   and the Australian Centre for Advanced Computing and
tion results deviate from both KPM and the analytically
                                                                   Communications (ac3). In addition, we are grateful for
expected power law σ(ω) − σ0 ∼ ω α . Presumably this
                                                                   support by the Australian Research Council, the Gordon
discrepancy is due to an insufficient resolution or a too
                                                                   Godfrey Bequest, and the Deutsche Forschungsgemein-
short time-integration interval. There is no fundamental
                                                                   schaft through SFB 652.
reason for the projection approach to fail here.
   In summary, the projection methods have a similarly
broad application range as KPM, and can also compete
in terms of numerical effort and computation time. For             References
finite-temperature dynamical correlations the projection
                                                                   Abramowitz, M., and I. A. Stegun (eds.), 1970, Handbook of
methods are characterized by a smaller memory con-
                                                                      Mathematical Functions with formulas, graphs, and math-
sumption. However, in contrast to KPM they require a                  ematical tables (Dover, New York).
new simulation for each change in temperature or chemi-            Aichhorn, M., M. Daghofer, H. G. Evertz, and W. von der
cal potential, which represents their major disadvantage.             Linden, 2003, Phys. Rev. B 67, 161103.
                                                                   Alonso, J. L., L. A. Fernández, F. Guinea, V. Laliena, and
                                                                      V. Martín-Mayor, 2001, Nucl. Phys. B 596, 587.
VI. CONCLUSIONS & OUTLOOK                                          Alvarez, G., C. Sen, N. Furukawa, Y. Motome, and
                                                                      E. Dagotto, 2005, Comp. Phys. Comm. 168, 32.
   In this review we gave a detailed introduction to the           Anderson, P. W., 1958, Phys. Rev. 109, 1492.
Kernel Polynomial Method, a numerical approach that                Anderson, P. W., and H. Hasegawa, 1955, Phys. Rev. 100,
on the basis of Chebyshev expansion allows for an effi-               675.
cient calculation of the spectral properties of large matri-       Auerbach, A., 1994, Interacting Electrons and Quantum
                                                                      Magnetism, Graduate Texts in Contemporary Physics
ces and of the static and dynamic correlation functions,
                                                                      (Springer-Verlag, Heidelberg).
which depend on them. The method has a wide range                  Bandyopadhyay, K., A. K. Bhattacharya, P. Biswas, and
of applications in different areas of physics and quan-               D. A. Drabold, 2005, Phys. Rev. E 71, 057701.
tum chemistry, and we illustrated its capability with nu-          Bäuml, B., G. Wellein, and H. Fehske, 1998, Phys. Rev. B
merous examples from solid state physics, which covered               58, 3663.
such diverse topics as non-interacting electrons in dis-           Benoit, C., E. Royer, and G. Poussigue, 1992, J. Phys. Con-
ordered media, quantum spin models, or strongly cor-                  dens. Matter 4, 3125.
related electron-phonon systems. Many of the consid-               Blumstein, C., and J. C. Wheeler, 1973, Phys. Rev. B 8, 1764.
ered quantities are hardly accessible with other meth-             Bonča, J., S. A. Trugman, and I. Batistić, 1999, Phys. Rev.
ods, or could previously be studied only on smaller sys-              B 60, 1633.
tems. Comparing with alternative numerical approaches,             Boyd, J. P., 1989, Chebyshev and Fourier Spectral Meth-
                                                                      ods, number 49 in Lecture Notes in Engineering (Springer-
we demonstrated the advantages of KPM measured in                     Verlag, Berlin).
terms of general applicability, speed, resource consump-           Chen, R., and H. Guo, 1999, Comp. Phys. Comm. 119, 19.
tion, algorithmic simplicity and accuracy of the results.          Cheney, E. W., 1966, Introduction to Approximation Theory
   Apart from further direct applications of the KPM out-             (McGraw-Hill, New York).
side the fields of solid state physics and quantum chem-           Coey, J. M. D., M. Viret, and S. von Molnár, 1999, Adv.
istry, we think that the combination of KPM with other                Phys. 48, 167.
                                                                                                                              31

Cullum, J. K., and R. A. Willoughby, 1985, Lanczos Algo-          Iitaka, T., and T. Ebisuzaki, 2004, Phys. Rev. E 69, 057701.
   rithms for Large Symmetric Eigenvalue Computations, vol-       Jackson, D., 1911, Über die Genauigkeit der Annäherung
   ume I & II (Birkhäuser, Boston).                                 stetiger Funktionen durch ganze rationale Funktionen
Dagotto, E., 1994, Rev. Mod. Phys. 66, 763.                          gegebenen Grades und trigonometrische Summen gegebener
Dagotto, E., 2003, Nanoscale Phase Separation and Colossal           Ordnung,       Ph.D. thesis,       Georg-August-Universität
   Magnetoresistance: The Physics of Manganites and Related          Göttingen.
   Compounds, volume 136 of Springer Series in Solid-State        Jackson, D., 1912, Trans. Amer. Math. Soc. 13, 491.
   Sciences (Springer, Heidelberg).                               Jaklič, J., and P. Prelovšek, 1994, Phys. Rev. B 49, 5065.
Dobrosavljević, V., and G. Kotliar, 1997, Phys. Rev. Lett. 78,   Jaklič, J., and P. Prelovšek, 2000, Adv. Phys. 49, 1.
   3943.                                                          Janke, W., 1998, Math. and Comput. in Simul. 47, 329.
Dobrosavljević, V., and G. Kotliar, 1998, Philos. Trans. Roy.    Jeckelmann, E., 2002, Phys. Rev. B 66, 045114.
   Soc. Lond., Ser. A 356, 57.                                    Jeckelmann, E., and H. Fehske, 2006, in Polarons in
Dobrovitski, V. V., and H. De Raedt, 2003, Phys. Rev. E 67,          Bulk Materials and Systems with Reduced Dimensional-
   056702.                                                           ity, edited by G. Iadonisi, J. Ranninger, and G. D. Filip-
Drabold, D. A., and O. F. Sankey, 1993, Phys. Rev. Lett. 70,         pis (IOS Press, Amsterdam), volume 161 of International
   3631.                                                             School of Phyics Enrico Fermi, p. ?, in press, see also
Essler, F. H. L., H. Frahm, F. Göhmann, A. Klümper, and            http://arXiv.org/abs/cond-mat/0510637.
   V. E. Korepin, 2005, The One-Dimensional Hubbard Model         Jeckelmann, E., F. Gebhard, and F. H. L. Essler, 2000, Phys.
   (Cambridge University Press, Cambridge).                          Rev. Lett. 85, 3910.
Fabricius, K., and B. M. McCoy, 1999, Phys. Rev. B 59, 381.       Kogan, E. M., and M. I. Auslender, 1988, Phys. Status Solidi
Fehske, H., C. Schindelin, A. Weiße, H. Büttner, and D. Ihle,       B 147, 613.
   2000, Brazil. Jour. Phys. 30, 720.                             Korovkin, P. P., 1959, Linejnye Operatory i teorija priblizenij
Fehske, H., G. Wellein, G. Hager, A. Weiße, and A. R. Bishop,        (Gos. Izd. Fiziko-Matematiceskoj Literatury, Moscow).
   2004, Phys. Rev. B 69, 165115.                                 Kosloff, R., 1988, J. Phys. Chem. 92, 2087.
Fehske, H., G. Wellein, A. P. Kampf, M. Sekania, G. Hager,        Kramer, B., and A. Mac Kinnon, 1993, Rep. Prog. Phys. 56,
   A. Weiße, H. Büttner, and A. R. Bishop, 2002, in High            1469.
   Performance Computing in Science and Engineering, Mu-          Krauth, W., 2004, in New Optimization Algorithms in
   nich 2002, edited by S. Wagner, W. Hanke, A. Bode, and            Physics, edited by A. K. Hartmann and H. Rieger (Wiley-
   F. Durst (Springer-Verlag, Heidelberg), pp. 339–350.              VCH, Berlin), chapter 2, pp. 7–22.
Fejér, L., 1904, Math. Ann. 58, 51.                              Lambin, P., and J.-P. Gaspard, 1982, Phys. Rev. B 26, 4356.
Frigo, M., and S. G. Johnson, 2005a, Proceedings of the IEEE      Lanczos, C., 1950, J. Res. Nat. Bur. Stand. 45, 255.
   93(2), 216, special issue on ”Program Generation, Opti-        Lanczos, C., 1966, Discourse on Fourier series (Hafner, New
   mization, and Platform Adaptation”.                               York).
Frigo, M., and S. G. Johnson, 2005b, FFTW fast fourier trans-     Lee, P. A., and T. V. Ramakrishnan, 1985, Rev. Mod. Phys.
   form library, URL http://www.fftw.org/.                           57, 287.
Furukawa, N., and Y. Motome, 2004, J. Phys. Soc. Jpn. 73,         Long, M. W., P. Prelovšek, S. El Shawish, J. Karadamoglou,
   1482.                                                             and X. Zotos, 2003, Phys. Rev. B 68, 235106.
Gagliano, E., and C. Balseiro, 1987, Phys. Rev. Lett. 59,         Lorentz, G. G., 1966, Approximation of Functions (Holt,
   2999.                                                             Rinehart and Winston, New York).
Garrett, A. W., S. E. Nagler, D. Tennant, B. C. Sales, and        Maier, T., M. Jarrell, T. Pruschke, and M. Hettler, 2005, Rev.
   T. Barnes, 1997, Phys. Rev. Lett. 79, 745.                        Mod. Phys. 77, 1027.
Gautschi, W., 1968, Math. Comp. 22, 251.                          Mandelshtam, V. A., and H. S. Taylor, 1997, J. Chem. Phys.
Gautschi, W., 1970, Math. Comp. 24, 245.                             107, 6756.
Goedecker, S., 1999, Rev. Mod. Phys. 71, 1085.                    Mead, L. R., and N. Papanicolaou, 1984, J. Math. Phys. 25,
Goedecker, S., and L. Colombo, 1994, Phys. Rev. Lett. 73,            2404.
   122.                                                           Motome, Y., and N. Furukawa, 1999, J. Phys. Soc. Jpn. 68,
Goedecker, S., and M. Teter, 1995, Phys. Rev. B 51, 9455.            3853.
Gordon, R. G., 1968, J. Math. Phys. 9, 655.                       Motome, Y., and N. Furukawa, 2000, J. Phys. Soc. Jpn. 69,
Gros, C., and R. Valentí, 1994, Ann. Phys. (Leipzig) 3, 460.        3785.
Haydock, R., V. Heine, and M. J. Kelly, 1972, J. Phys. C 5,       Motome, Y., and N. Furukawa, 2001, J. Phys. Soc. Jpn. 70,
   2845.                                                             3186, erratum.
Haydock, R., V. Heine, and M. J. Kelly, 1975, J. Phys. C 8,       Neuhauser, D., 1990, J. Chem. Phys. 93, 2611.
   2591.                                                          Niklasson, A. M. N., 2003, Phys. Rev. B 68, 233104.
Hohenadler, M., M. Aichhorn, and W. von der Linden, 2003,         Ordejón, P., 1998, Comp. Mater. Sci. 12, 157.
   Phys. Rev. B 68, 184304.                                       Pantelides, S. T., 1978, Rev. Mod. Phys. 50, 797.
Hohenadler, M., D. Neuber, W. von der Linden, G. Wellein,         Peschel, I., X. Wang, M. Kaulke, and K. Hallberg (eds.),
   J. Loos, and H. Fehske, 2005, Phys. Rev. B 71, 245111.            1999, Density-Matrix Renormalization. A New Numerical
Holstein, T., 1959a, Ann. Phys. (N.Y.) 8, 325.                       Method in Physics., number 528 in Lecture Notes in Physics
Holstein, T., 1959b, Ann. Phys. (N.Y.) 8, 343.                       (Springer-Verlag, Heidelberg).
Iitaka, T., 1998, in High Performance Computing in RIKEN          Press, W. H., B. P. Flannery, S. A. Teukolsky, and W. T.
   1997 (Inst. Phys. Chem. Res. (RIKEN), Japan), volume 19           Vetterling, 1986, Numerical Recipes (Cambridge University
   of RIKEN Review, pp. 136–143.                                     Press, Cambridge).
Iitaka, T., and T. Ebisuzaki, 2003, Phys. Rev. Lett. 90,          Rivlin, T. J., 1990, Chebyshev polynomials: From Approxi-
   047203.                                                           mation Theory to Algebra and Number Theory, Pure and
                                                                                                                             32

   Applied Mathematics (John Wiley & Sons, New York), 2               ods, edited by J. Skilling (Kluwer, Dordrecht), Fundamen-
   edition.                                                           tal Theories of Physics, pp. 455–466.
Robin, J. M., 1997, Phys. Rev. B 56, 13634.                        Slevin, K., and T. Ohtsuki, 1999, Phys. Rev. Lett. 82, 382.
Sack, R. A., and A. F. Donovan, 1972, Numer. Math. 18, 465.        Sykora, S., A. Hübsch, K. W. Becker, G. Wellein, and
Schindelin, C., H. Fehske, H. Büttner, and D. Ihle, 2000, Phys.      H. Fehske, 2005, Phys. Rev. B 71, 045112.
   Rev. B 62, 12141.                                               Tal-Ezer, H., and R. Kosloff, 1984, J. Chem. Phys. 81, 3967.
Schliemann, J., J. König, and A. H. MacDonald, 2001, Phys.        Thouless, D. J., 1974, Physics Reports 13, 93.
   Rev. B 64, 165201.                                              Turek, I., 1988, J. Phys. C 21, 3251.
Schollwöck, U., 2005, Rev. Mod. Phys. 77, 259.                    Vijay, A., D. J. Kouri, and D. K. Hoffman, 2004, J. Phys.
Schubert, G., A. Weiße, and H. Fehske, 2005a, Phys. Rev. B            Chem. A 108, 8987.
   71, 045126.                                                     de Vries, P., and H. De Raedt, 1993, Phys. Rev. B 47, 7929.
Schubert, G., A. Weiße, G. Wellein, and H. Fehske, 2005b, in       Wang, L.-W., 1994, Phys. Rev. B 49, 10154.
   High Performance Computing in Science and Engineering,          Wang, L.-W., and A. Zunger, 1994, Phys. Rev. Lett. 73, 1039.
   Garching 2004, edited by A. Bode and F. Durst (Springer-        Weiße, A., 2004, Eur. Phys. J. B 40, 125.
   Verlag, Heidelberg), pp. 237–250.                               Weiße, A., G. Bouzerar, and H. Fehske, 1999, Eur. Phys. J.
Schubert, G., G. Wellein, A. Weiße, A. Alvermann, and                 B 7, 5.
   H. Fehske, 2005c, Phys. Rev. B 72, 104304.                      Weiße, A., H. Fehske, and D. Ihle, 2005, Physica B 359–361,
Sénéchal, D., D. Perez, and M. Pioro-Ladrière, 2000, Phys.         702.
   Rev. Lett. 84, 522.                                             Weiße, A., J. Loos, and H. Fehske, 2001, Phys. Rev. B 64,
Sénéchal, D., D. Perez, and D. Plouffe, 2002, Phys. Rev. B          054406.
   66, 075129.                                                     Wheeler, J. C., 1974, Phys. Rev. A 9, 825.
Silver, R. N., and H. Röder, 1994, Int. J. Mod. Phys. C 5,        Wheeler, J. C., and C. Blumstein, 1972, Phys. Rev. B 6, 4380.
   935.                                                            Wheeler, J. C., M. G. Prais, and C. Blumstein, 1974, Phys.
Silver, R. N., and H. Röder, 1997, Phys. Rev. E 56, 4822.            Rev. B 10, 2429.
Silver, R. N., H. Röder, A. F. Voter, and D. J. Kress, 1996,      Wolff, U., 1989, Phys. Rev. Lett. 62, 361.
   J. of Comp. Phys. 124, 115.                                     Zener, C., 1951, Phys. Rev. 82, 403.
Sirker, J., and A. Klümper, 2005, Phys. Rev. B 71,                Zhong, Q., S. Sorella, and A. Parola, 1994, Phys. Rev. B 49,
   241101(R).                                                         6408.
Skilling, J., 1988, in Maximum Entropy and Bayesian Meth-
