---
source: "https://arxiv.org/abs/cond-mat/0403310"
type: "arxiv"
canonical_id: "cond-mat/0403310"
title: "Real-time evolution using the density matrix renormalization group."
authors: "S. White, A. Feiguin"
year: "2004"
venue: "Physical Review Letters"
arxiv_id: "cond-mat/0403310"
doi: "10.1103/PhysRevLett.93.076401"
full_text: yes
---

# Real-time evolution using the density matrix renormalization group.

**Authors:** S. White, A. Feiguin

**Citation:** Physical Review Letters, vol. 93 7, pp. 
          076401
        , 2004

**arXiv:** [cond-mat/0403310](https://arxiv.org/abs/cond-mat/0403310)

**DOI:** [10.1103/PhysRevLett.93.076401](https://doi.org/10.1103/PhysRevLett.93.076401)

## Abstract

We describe an extension to the density matrix renormalization group method incorporating real-time evolution. Its application to transport problems in systems out of equilibrium and frequency dependent correlation functions is discussed and illustrated in several examples. We simulate a scattering process in a spin chain which generates a spatially nonlocal entangled wave function.

## Full Text

Real time evolution using the density matrix renormalization group

                                                                                                 Steven R. White and Adrian E. Feiguin
                                                                                                   Department of Physics and Astronomy
                                                                                                  University of California, Irvine, CA 92697
                                                                                                          (Dated: November 26, 2024)
                                                                       We describe an extension to the density matrix renormalization group method incorporating
arXiv:cond-mat/0403310v2 [cond-mat.str-el] 18 Mar 2004




                                                                     real time evolution into the algorithm. Its application to transport problems in systems out of
                                                                     equilibrium and frequency dependent correlation functions is discussed and illustrated in several
                                                                     examples. We simulate a scattering process in a spin chain which generates a spatially non-local
                                                                     entangled wavefunction.

                                                                     PACS numbers: PACS


                                                            The density matrix renormalization group (DMRG) [1]          terms exp(−iτ Hj ) (coupling sites j and j + 1) within HA
                                                         is perhaps the most powerful method for simulating one          or HB commute. Writing the wave function in matrix
                                                         dimensional quantum lattice systems. DMRG was origi-            product form (which underlies the DMRG block form[8]),
                                                         nally formulated as a ground state method. Later, it was        Vidal showed that one can apply each link-term directly
                                                         generalized to give frequency dependent spectral func-          to the wavefunction, exactly and efficiently. After each
                                                         tions [2, 3]. The best spectral method, Jeckelmann’s dy-        such application, a Schmidt decomposition, equivalent to
                                                         namical DMRG [4], yields extremely accurate spectra.            diagonalizing the DMRG density matrix, is performed to
                                                         However, it is limited to only one momentum and one             return the wavefunction to the matrix product form. One
                                                         narrow frequency range at a time. Constructing an en-           applies all the HA terms, and then all the HB terms, etc.
                                                         tire spectrum for a reasonable grid in momentum and                Although this method seems very efficient, a number
                                                         frequency space can involve hundreds of runs.                   of aspects are novel for DMRG users, stemming from the
                                                            An alternative approach to dynamics with DMRG is             fact that one does not ordinarily deal with the matrix
                                                         via a real time simulation. Cazalilla and Marston intro-        product representation directly. Implementing this idea
                                                         duced a real-time DMRG and used it to calculate the             into a DMRG algorithm may be time consuming and may
                                                         time evolution of one dimensional systems under an ap-          require a very substantial rewriting of one’s program.
                                                         plied bias[5]. In their approach, the DMRG algorithm               In this paper we take the key idea of the Suzuki-Trotter
                                                         is only used to calculate the ground state, and the time        decomposition, but we modify it and apply it in a more
                                                         evolution in obtained by integrating the time-dependent         natural way within the context of DMRG. The result is
                                                         Schrödinger equation in a fixed basis. Consequently, one       a surprisingly simple yet very powerful modification of
                                                         expects it to lose accuracy when the wavefunction starts        the algorithm for real-time dynamics which we believe
                                                         to differ significantly from the ground state. In the sys-      can be incorporated into a typical program in only a day
                                                         tems studied by Cazalilla and Marston, the time evolu-          or two of programming. We illustrate the approach with
                                                         tion could be carried out for a reasonable length of time       real-time simulations which set a new paradigm for the
                                                         before this happened. Luo, Xiang, and Wang[6] showed            size and accuracy obtainable.
                                                         how to construct a basis which applies to a time-evolving          The standard DMRG representation of the wavefunc-
                                                         wavefunction over a whole range of times simultaneously.        tion at a particular step j during a finite system sweep
                                                         This approach was shown to be more accurate than that           is
                                                         of Cazalilla and Marston, but it is not very efficient—the                        X
                                                                                                                                     |ψi =     ψlαj αj+1 r |li|αj i|αj+1 i|ri.   (2)
                                                         basis must be quite large to apply to a long interval of
                                                                                                                                             lαβr
                                                         time, and the whole time evolution is performed at every
                                                         DMRG step.                                                      Here we have a left block containing many sites (with
                                                            Recently, Vidal developed a novel time-dependent sim-        states l), two center sites (with states αj , αj+1 ), and a
                                                         ulation method for near-neighbor one dimensional sys-           right block (states r). The states l and r are formed as
                                                         tems which overlaps strongly with DMRG [7]. The                 eigenvectors of a density matrix, and represent a highly
                                                         crucial new idea of the method is to use the Suzuki-            truncated but extremely efficient basis for representing
                                                         Trotter decomposition for a small time evolution operator       the ground state, plus any other targeted states which
                                                         exp(−iτ H). The second order Suzuki-Trotter break-up            have been included in the density matrix. Now suppose
                                                         is                                                              we have an arbitrary operator A acting only on sites j
                                                                                                                         and j + 1. This operator can be applied to |ψi exactly,
                                                                   e−iτ H ≈ e−iτ HA /2 e−iτ HB e−iτ HA /2 ,      (1)     and reexpressed in terms of the same optimal bases, with
                                                                                                                                             X
                                                         where HA contains the terms of the Hamiltonian for the            [Aψ]lαj αj+1 r =        Aαj αj+1 ;αj ′ αj+1 ′ ψlαj ′ αj+1 ′ r . (3)
                                                         even links, and HB for the odd. The individual link-                                 αj ′ αj+1 ′
                                                                                                                                                                              2

If A included terms for other sites, we could not write                                            2.0
this simple exact relation; new bases would need to be                                                       (a)
                                                                                                   1.5




                                                                                    J(t) (x10-2)
adapted to describe both |ψi and A|ψi, requiring perhaps
                                                                                                   1.0
several finite-system sweeps through the lattice.
   This implies that we can apply the link time evolution                                          0.5
                                                                                                                                                         Quantum dot
operator exp(−iτ Hj ) exactly on DMRG step j, but at                                               0.0                                                   Junction (x2)
any other DMRG step the application is approximate.                                                      0         10        20       30       40        50      60      70
                                                                                                   2.0
Accordingly, we adapt the Suzuki-Trotter decomposition                                                       (b)                                     V=0.5
to match the DMRG finite-system sweeps, so that each                                               1.5                                               V=1.1 (x2)




                                                                                    J(t) (x10-3)
term can be applied exactly. We decompose the time                                                 1.0
propagator as
                                                                                                   0.5
       −iτ H        −iτ H1 /2 −iτ H2 /2          −iτ H2 /2 −iτ H1 /2
   e           ≈e           e             ...e           e             .   (4)                     0.0
                                                                                                         0              10            20            30             40
This decomposition is good to the same order (errors                                                                                       t
of order τ 3 ) as the usual odd/even link decomposition.
When applied 1/τ times to evolve one unit of time, the er-                       FIG. 1: (a) Tunneling current through a non-interacting
rors are τ 2 . The main idea is then to apply exp(−iτ H1 /2)                     quantum dot and a junction as defined in Eqs. (2) and (5)
at DMRG step 1, then exp(−iτ H2 /2) at step 2, etc.,                             in Ref.[5], respectively. The full lines correspond to exact re-
forming the usual left-to-right sweep, then reverse, apply-                      sults. (b) Tunneling current through an interacting junction,
                                                                                 with V = 0.5 and V = 1.1. All the DMRG results where
ing all the reverse order terms in the right-to-left sweep.
                                                                                 obtained with M = 128 and a time step τ = 0.2.
   This procedure requires one to use the step-to-
step wavefunction transformation first developed to
provide a good guess for the Lanczos or Davidson
diagonalization[9], where it can improve run times by an                            In method (2), after finding the ground state |φi, we
order of magnitude. It transforms the wavefunction from                          apply an operator A at t = 0, to obtain |ψ(t = 0)i,
the basis of step j ± 1 to that of step j. Assuming this                         and evolve in time. We first use this approach to calcu-
transformation is present in a ground state DMRG pro-                            late time-dependent correlation functions. In this case,
gram, the real-time algorithm introduces only a very mi-                         we time evolve both |φ(t)i and |ψ(t)i, including both as
nor modification: at step j, instead of using the Davidson                       target states for the DMRG density matrix. Although
method, one evolves the transformed wavefunction by ap-                          the time dependence exp(−iEG t) of |φ(t)i is known (EG
plying exp(−iτ Hj /2). Before the time evolution starts,                         is the ground state energy), by evolving it we keep its
we typically use ordinary DMRG to find the ground state.                         representation in the current basis. In addition, we ex-
Next, we either (1) change the Hamiltonian, or (2) apply                         pect a significant cancelation in the errors due to the
an operator to the ground state to study a new wave-                             Suzuki-Trotter decomposition in constructing the corre-
function which is a combination of excited states.                               lation functions. A typical correlation function is calcu-
   As a first test case, of type (1), we study the models of                     lated as
Eqs.(2) and (5) in Ref. [5] corresponding to a quantum                                                   < φ|B(t)A(0)|φ >=< φ(t)|B|ψ(t) >,                                (5)
dot connected to two non-interacting leads, and a junc-
tion between two Luttinger liquids, respectively, driven                         We use a complete half-sweep to apply A to |φi. In par-
out of equilibrium by a voltage bias. In these cases at                          ticular, if A is a sum of terms Aj over a number of sites,
t = 0 a bias in the chemical potential is turned on as                           then we apply an Aj only when j is one of the two cen-
a smoothed step function, making the new Hamiltonian                             tral, untruncated sites. Thus the basis is automatically
time-dependent. At each time step, the expectation value                         suitable for Aj |φi. During this buildup of A at step j we
                                                                                                                         Pj
of the current operator (defined by Eq.(4) of Ref.[5]) is                        target both the ground state |φi and j ′ =1 Aj ′ |φi.
calculated. In Fig.1 we show the results for a chain of                             As an example we consider the spin-1 Heisenberg
length L = 64 and the same set of parameters used in                             chain, with Hamiltonian
Ref.[5], keeping only m = 128 states and using a time                                                       X
                                                                                                      H=          ~j+1 ,
                                                                                                               ~j S
                                                                                                               S                         (6)
step τ = 0.2. It should be compared to Figs. 1 and 2
                                                                                                                                  j
in Ref. [5] and Figs. 1 and 2 in Ref.[6]. Our results
exceed the accuracy obtained by the previous methods,                            where we have set the exchange coupling J to unity. This
with only a fraction of the states. For the non-interacting                      system has a gap (the “Haldane gap”) of ∆H = 0.4105 to
problem, the agreement with the exact results is excel-                          the lowest excitations, which are spin-1 magnons at mo-
lent up to times t ∼ 70. The main reason for obtaining                           mentum π, and a finite correlation length of ξ = 6.03.[10]
higher accuracy for fixed m compared to Ref.[6] is that at                       The single-magnon dispersion relation has been calcu-
any step we only need to target one state at one instant                         lated with excellent accuracy[3]. However, determina-
of time, not a whole range of times.                                             tion of the full magnon line is quite tedious with existing
                                                                                                                                        3

                                                                                              8
                                                   t=14

                                                                                              6




                                                                                  ω0/∆H, A0
          <S (x)>
                                                                                              4
         z




                                                                                              2
                                                  t=2
                    0.5
                                            t=0
                     0                                                                        0
                                                                                                  0   0.2   0.4         0.6   0.8   1
                                                                                                                  q/π
                      50              100                 150
                                       x
                                                                      FIG. 3: The single magnon line of the spin-1 Heisenberg an-
FIG. 2: Time evolution of the local magnetization hS z (x)i           tiferromagnetic chain. The entire spectrum is obtained from
of a 200 site spin-1 Heisenberg chain after S + (100) is applied.     one DMRG run, by Fourier transforming the time and posi-
                                                                      tion dependent correlation function hSl− (t)S0+ (0)i. The broad
                                                                      solid curve shows the location of the maximum in the spectra
                                                                      for a particular q, in units of the Haldane gap, 0.41050(2), for
DMRG methods. Here we demonstrate how to calculate                    a system of L = 600 sites, using a time step τ = 0.02, running
the entire magnon spectrum with only one time depen-                  for T = 27.3, and keeping m = 200 states. For comparison,
dent DMRG run.                                                        results from two other runs are shown: L = 400, τ = 0.1,
                                                                      T = 60, and m = 150 (dashed curve); and. L = 400, τ = 0.4,
   We take A = S + (j) for a single site j in the center
                                                                      T = 72, and m = 200 (dotted curve). The solid curve peaked
of a long chain. This operator constructs a localized                 at q = π, shown only for the first run, is the weight A0 in this
wavepacket consisting of all wavevectors. This packet                 quasiparticle peak, i.e. S(ω) ≈ A0 δ(ω − ω0 ).
spreads out as time progresses, with different components
moving at different speeds. The speed of a component is
its group velocity, determined as the slope of the disper-
sion curve at k. In Fig.2 we show the local magnetiza-                wavefront hits the ends of the chain, the data no longer
tion hψ(t)|S z |ψ(t)i for a chain of length L = 200, with             describes an infinite chain. On the other hand, before
timestep τ = 0.1. At t = 0, the wavepacket has a fi-                  that point the data does describe an infinite chain with
nite extent, with size given by the spin-spin correlation             boundary effects dying off exponentially from the edges.
length ξ. At later times, the different speeds of the dif-            This allows us to precisely specify the momentum k, for
ferent components give the irregular oscillations in the              times t < T . To perform the time integral we multi-
center of the packet. We kept m = 150 states per block,               ply G(x, t) by a windowing function W (t) which goes
giving a truncation error of about 6 × 10−6 .                         smoothly to zero as t → T . We have chosen a Gaussian,
   ¿From this type of simulation we can construct the                 exp(−4(t/T )2), which has the advantage of having a non-
Green’s function                                                      negative Fourier transform, yielding a nonnegative spec-
                                                                      tral function (except for possible terms of size exp(−4)).
                    G(x, t) = −ihφ|T [Sx−(t)S0+ (0)]|φi         (7)   Note that if the true spectral function has an isolated
                                                                      delta function peak, the windowed spectrum will have a
as G(x, t) = −ihφ(|t|)|Sx− |ψ(|t|)i. Here x is measured
                                                                      Gaussian peak centered precisely at the same frequency.
from the site j where S + is applied. We make one mea-
                                                                      Thus it is possible to locate the single magnon line with
surement of G(x, t) for each left-to-right DMRG step,
                                                                      an accuracy much better than 1/T . If a continuum is
namely for step x. For efficiency we measure as we evolve
                                                                      also present nearby, the peak is less well determined. In
in time, rather than, say, devoting every other sweep to
                                                                      the case of the S = 1 chain, for k near π the peak is iso-
measurements without time evolving. This may worsen
                                                                      lated, but at some point near k = 0.3π the peak enters
the Suzuki-Trotter error somewhat, but we have found
                                                                      the two magnon continuum and develops a finite width.
the results quite satisfactory. Since G(x, t) is even in x
                                                                      Note that from our single simulation we determine the
and t, the Fourier transform is
                                                                      spectral function for a continuum of values of k and ω.
                    Z ∞            X                                     In Fig.3 we summarize the results for the single
        G(k, ω) = 2      dt cos ωt   cos kxG(x, t)     (8)
                             0
                                                                      magnon peak, determined automatically as the maxi-
                                            x
                                                                      mum of the spectrum. To gauge the errors we present
The spectral function of interest is −1/πImG(k, ω). We                results for several runs with various parameters. The re-
inevitably have some cutoff in time T for the available               sults are very close; the most signifcant errors are due
data. The maximum useable value of T depends on                       to a finite τ , with the τ = 0.4 run showing some non-
the length of the chain: when the leading edge of the                 negligible errors. The results agree very well with ac-
                                                                                                                                             4

                    0.4                                                         either with or without a spin flip occuring. If the spin
                    0.2
                                                                                flip occurs, the end spin changes to S z = 1/2 and the
                                                                                wavepacket to S z = 0. We see from the figure that af-
          <S (x)>     0                                                         ter the scattering, the end spin seems to have taken on
                                                                                an intermediate value of S z , in particular hS z i ≈ −0.11.
         z


                    -0.2                    t=0
                                            t=20                 (a)            Meanwhile, the wavepacket seems to have a total spin of
                    -0.4                                                        hS z i ≈ 0.61. Angular momenta of each are still quan-
                                                                                tized. The intermediate values occur because we are ob-
                    0.4                                                         serving a “macroscopic” quantum superposition of the
                    0.2        t=0   t=20   t=40       t=60     t=80   t=100
                                                                                state with and without the spin flip. Specifically, the
                                                                                scattering is described by
          <S (x)>




                      0
         z




                    -0.2                                                                         1          1         1
                                                                 (b)                           |− , 1i → a|− , 1i + b| , 0i                (9)
                    -0.4                                                                         2          2         2

                    0.2                                                         where a2 ≈ 0.61, b2 ≈ 0.39. Note that the scattered
                                                                                S z = 0 magnon does not show up when we measure
                                                   t=0        t=110             Sxz . A local description of the wavefunction, as (α|− 12 i +
          <S (x)>




                                                                                β| 21 i) × (γ|1i + δ|0i), is not possible; it does not conserve
                      0                                                         total S z . Our measurement of Sxz , hψ(t)|Sxz |ψ(t)i, does
         z




                                                                 (c)            not affect the state, but if one performed a real exper-
                                                                                iment and measured the spin of, say, the magnon after
                                                                                scattering one would obtain either S z = 1 or S z = 0.
                    -0.2
                           0         50        100              150       200   We find it quite remarkable that we can simulate a pro-
                                                   x
                                                                                cess in which such a non-local superposition develops!
FIG. 4: A gaussian magnon wavepacket with momentum                              Our results raise the possibility of using such spin chains
k = 0.8π, S z = 1, and halfwidth 16 scattering off the left end                 for experimental studies of quantum measurement and
of a 200 site spin-1 chain. The chain end states initially have                 quantum computation.
S z = −1/2. In all cases we measure hS z (x)i at time t, and
τ = 0.2. In (a) we show t = 0 and t = 20. In (b), we show the
                                                                                 We acknowledge the support of the NSF under grants
left-most 50 sites for a number of times. In (c), we show the                   DMR-0311843.
whole chain for t = 0 and t = 110. After the scattering, the
system is in a non-local superposition of spin-flip and non-
spin-flip states.

                                                                                 [1] S.R. White, Phys. Rev. Lett. 69, 2863 (1992), Phys. Rev.
                                                                                     B 48, 10345 (1993).
curate frequency-based DMRG results[3] and quantum                               [2] K.A. Hallberg, Phys. Rev. B 52, 9827 (1995).
Monte Carlo[11].                                                                 [3] T.D. Kühner and S R. White, Phys. Rev. B 60, 335
                                                                                     (1999).
   With real-time dynamics, we can simulate processes
                                                                                 [4] E. Jeckelmann, Phys. Rev. B 66, 045114 (2002).
which would be very difficult to understand via fre-                             [5] M. A. Cazalilla and J. B. Marston, Phys. Rev. Lett. 88,
quency dynamics. As an example, we consider a magnon                                 256403 (2002); see also 91, 049702 (2003).
wavepacket scattering off the end of a spin-1 chain, shown                       [6] H. G. Luo, T. Xiang, and X. Q. Wang, Phys. Rev. Lett.
in Fig.4. The magnon is a triplet, with S z = 1, and trav-                           91, 049701 (2003).
els to the left with a speed of about 2.0. The open ends                         [7] G. Vidal, Phys. Rev. Lett. 91, 147902(2003); and quant-
of a spin-1 chain have spin-1/2 degrees of freedom, which                            ph/0310089.
have received considerable attention [10, 12]. One can                           [8] S. Östlund and S. Rommer, Phys. Rev. Lett. 75, 3537
                                                                                     (1995).
view this end state as a spinon bound to the end. An an-
                                                                                 [9] S.R. White, Phys. Rev. Lett. 77, 3633 (1996).
tiferromagnetic oscillation accompanies this state, decay-                      [10] S.R. White and D.A. Huse, Phys. Rev. B 48, 3844 (1993).
ing exponentially with the correlation length away from                         [11] M. Takahashi, Phys. Rev. Lett. 62, 2313 (1989); Phys.
the edge. We choose the ground state with total spin                                 Rev. B 48, 311 (1993).
S z = −1, making the end states each have S z = −1/2.                           [12] I. Affleck, T. Kennedy, E. H. Lieb and H. Tasaki, Phys.
When the wavepacket hits the left end, it can scatter                                Rev. Lett. 59, 799 (1987).
